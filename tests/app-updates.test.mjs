import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../app-v2.js", import.meta.url), "utf8");
const names = ["readBackupPreferences", "persistBackupPreferences", "supportsBackupDirectory", "nextBackupAt", "backupPayload", "backupIssueText", "renderAutoBackupSettings", "runAutomaticBackup", "addProjectHistory", "latestProjectLogOn", "projectDayRecord", "updateProjectDayRecord", "projectAreaOptions", "normalizeProjectAreas", "addProjectArea", "renameProjectArea", "deleteProjectArea", "isCompletedProject", "planFor", "collectSearchEntries", "normalizedSearchText", "searchWorkbench", "searchTextMarkup", "resetCalendarPanelDates", "shiftCalendarPanelDate", "calendarDayNavMarkup", "renderDayDashboard"];

function functionSource(name) {
  const start = source.search(new RegExp(`^  (?:async )?function ${name}\\(`, "m"));
  assert.notEqual(start, -1, `Missing function: ${name}`);
  const end = source.slice(start + 1).search(/\n  (?:async )?function /);
  return source.slice(start, end < 0 ? undefined : start + 1 + end);
}

function harness() {
  const stored = new Map();
  const elements = new Map(["autoBackupSettings", "backupNotice", "calendarWorkoutPanel", "calendarWorkPanel", "calendarHealthPanel", "calendarProjectLogPanel", "calendarInspirationPanel", "calendarCompletedPanel"].map((id) => [id, { innerHTML: "", hidden: true }]));
  const clock = { now: Date.parse("2026-10-22T10:00:00Z") };
  class ClockDate extends Date {
    constructor(...args) { super(...(args.length ? args : [clock.now])); }
    static now() { return clock.now; }
  }
  const context = vm.createContext({
    Date: ClockDate,
    crypto: { randomUUID },
    BACKUP_PREFERENCES_STORE: "test:backup",
    BACKUP_INTERVALS: ["daily", "weekly", "monthly"],
    STORE: "test:state",
    localStorage: { getItem: (key) => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) },
    window: { isSecureContext: true, showDirectoryPicker() {}, indexedDB: {} },
    document: { visibilityState: "visible", getElementById: (id) => elements.get(id) },
    state: { projects: [], goals: [], days: {} },
    backupPreferences: { enabled: true, interval: "weekly", lastSuccessfulAt: "", lastFileName: "" },
    backupDirectory: null,
    backupInitialized: true,
    backupInProgress: false,
    backupIssue: "",
    selectedDate: "2026-10-22",
    calendarPanelDates: { workout: "2026-10-22", work: "2026-10-22", projects: "2026-10-22", inspiration: "2026-10-22" },
    editingCalendarHealthDate: null,
    calendarHealthDraft: null,
    currentLanguage: "zh",
    projectAreaFilter: "all",
    workoutPlans: Object.fromEntries(Array.from({ length: 7 }, (_, index) => [index, { title: `Workout ${index}`, items: [["1", "Test exercise", "10 reps"]] }])),
    todayKey: () => "2026-10-22",
    uid: () => randomUUID(),
    flushSave() {},
    notify() {},
    ensureDay: () => ({ water: 0, food: "", notes: "", calories: "", inspiration: "Test inspiration" }),
    completionFor: () => ({ rate: 0, done: 0, total: 0 }),
    weightOn: () => null,
    projectLogsOn: (date) => [{ project: "Test project", text: `Record on ${date}` }],
    dayText: (date) => date,
    localizedPlanTitle: (title) => title,
    localizedInspiration: (day) => day.inspiration,
    workoutMarkup: (date) => `Workout on ${date}`,
    taskRows: (date) => `Tasks on ${date}`,
    uiText: (zh) => zh
  });
  const dateHelpers = source.slice(source.indexOf("  const pad ="), source.indexOf("  const dayText ="));
  const constants = ["SEARCH_TYPES", "addDays", "weekKeys"].map((name) => source.match(new RegExp(`^  const ${name} = [\\s\\S]*?^  };`, "m"))[0]);
  vm.runInContext([dateHelpers, ...constants, ...names.map(functionSource)].join("\n"), context);
  return { context, stored, clock };
}

test("scheduled backups are opt-in, weekly, and normalize invalid preferences", () => {
  const { context: app, stored } = harness();
  assert.equal(app.readBackupPreferences().enabled, false);
  assert.equal(app.readBackupPreferences().interval, "weekly");
  stored.set("test:backup", JSON.stringify({ enabled: "true", interval: "invalid", lastSuccessfulAt: "bad" }));
  const prefs = app.readBackupPreferences();
  assert.equal(prefs.enabled, false);
  assert.equal(prefs.interval, "weekly");
  assert.equal(prefs.lastSuccessfulAt, "");
});

test("daily, weekly, and month-end schedules do not depend on elapsed timers", () => {
  const { context: app } = harness();
  for (const [interval, day] of [["daily", 23], ["weekly", 29]]) {
    const anchor = new app.Date(2026, 9, 22, 10);
    const due = new app.Date(app.nextBackupAt({ interval, lastSuccessfulAt: anchor.toISOString() }, true));
    assert.equal(due.getDate(), day);
    assert.equal(due.getHours(), 10);
  }
  const anchor = new app.Date(2026, 0, 31, 10);
  const due = new app.Date(app.nextBackupAt({ interval: "monthly", lastSuccessfulAt: anchor.toISOString() }, true));
  assert.equal(due.getMonth(), 1);
  assert.equal(due.getDate(), 28);
  assert.equal(app.nextBackupAt({ interval: "weekly", lastSuccessfulAt: "" }, true), 0);
});

test("a saved file is a complete import-compatible snapshot with a unique name", async () => {
  const { context: app, stored } = harness();
  const files = new Map();
  app.state.days["2026-10-22"] = { food: "Test meal", water: 6 };
  app.state.projectAreas = ["Unused area"];
  app.backupDirectory = {
    queryPermission: async () => "granted",
    async getFileHandle(name) {
      return { createWritable: async () => ({ write: async (value) => files.set(name, value), close: async () => {} }) };
    }
  };
  assert.equal(await app.runAutomaticBackup(), true);
  assert.equal(files.size, 1);
  const savedAt = app.backupPreferences.lastSuccessfulAt;
  assert.equal(await app.runAutomaticBackup(), false);
  assert.equal(await app.runAutomaticBackup(true), true);
  assert.equal(files.size, 2);
  const payload = JSON.parse([...files.values()][0]);
  assert.equal(payload.app, "kinetic-life-os");
  assert.equal(payload.data.days["2026-10-22"].food, "Test meal");
  assert.ok(Array.isArray(payload.data.projects));
  assert.deepEqual(payload.data.projectAreas, ["Unused area"]);
  assert.equal(JSON.parse(stored.get("test:backup")).lastSuccessfulAt, savedAt);
});

test("permission and write failures never advance the successful backup time", async () => {
  for (const failure of ["permission", "write", "close"]) {
    const { context: app } = harness();
    const priorSuccess = "2026-10-01T10:00:00Z";
    app.backupPreferences.lastSuccessfulAt = priorSuccess;
    app.backupDirectory = {
      queryPermission: async () => failure === "permission" ? "prompt" : "granted",
      getFileHandle: async () => ({ createWritable: async () => ({
        write: async () => { if (failure === "write") throw new Error("Disk full"); },
        close: async () => { if (failure === "close") throw new Error("Close failed"); },
        abort: async () => {}
      }) })
    };
    assert.equal(await app.runAutomaticBackup(), false);
    assert.equal(app.backupPreferences.lastSuccessfulAt, priorSuccess);
    assert.equal(app.backupIssue, failure === "permission" ? "permission" : "write");
    assert.equal(app.backupInProgress, false);
  }
});

test("disabled, hidden, unsupported, and overlapping checks do not write files", async () => {
  const { context: app } = harness();
  app.backupDirectory = { queryPermission: async () => { throw new Error("Must not query"); } };
  app.backupPreferences.enabled = false;
  assert.equal(await app.runAutomaticBackup(true), false);
  app.backupPreferences.enabled = true;
  app.document.visibilityState = "hidden";
  assert.equal(await app.runAutomaticBackup(), false);
  app.document.visibilityState = "visible";
  app.backupInProgress = true;
  assert.equal(await app.runAutomaticBackup(true), false);
  app.backupInProgress = false;
  app.window.showDirectoryPicker = undefined;
  assert.equal(await app.runAutomaticBackup(true), false);
  assert.equal(app.backupPreferences.lastSuccessfulAt, "");
});

test("backup setup guidance is shown only before enabling, with filenames kept in expandable details", () => {
  const { context: app } = harness();
  const panel = app.document.getElementById("autoBackupSettings");
  app.backupPreferences.enabled = false;
  app.renderAutoBackupSettings();
  assert.ok(panel.innerHTML.includes('class="backup-setup-hint"'));
  app.backupPreferences.enabled = true;
  app.backupPreferences.lastSuccessfulAt = "2026-10-22T09:00:00Z";
  app.backupPreferences.lastFileName = 'backup-<sample>.json';
  app.backupDirectory = { name: "Test & backups" };
  app.renderAutoBackupSettings();
  assert.ok(!panel.innerHTML.includes('class="backup-setup-hint"'));
  assert.ok(panel.innerHTML.includes('<dl class="auto-backup-status">'));
  assert.ok(panel.innerHTML.includes('Test &amp; backups'));
  assert.ok(panel.innerHTML.includes('<details class="backup-file-details">'));
  assert.ok(panel.innerHTML.includes('backup-&lt;sample&gt;.json'));
  assert.ok(panel.innerHTML.includes("不覆盖旧备份"));
});

test("enabled backup errors and reminder-only browser limitations remain explicit", () => {
  const { context: app } = harness();
  const panel = app.document.getElementById("autoBackupSettings");
  app.backupIssue = "permission";
  app.renderAutoBackupSettings();
  assert.ok(!panel.innerHTML.includes('class="backup-setup-hint"'));
  assert.ok(panel.innerHTML.includes('role="alert"'));
  assert.ok(panel.innerHTML.includes('data-action="authorize-backup"'));
  app.window.showDirectoryPicker = undefined;
  app.backupIssue = "";
  app.backupPreferences.lastExportRequestedAt = "2026-10-22T09:00:00Z";
  app.uiText = (zh, en) => en;
  app.renderAutoBackupSettings();
  assert.ok(panel.innerHTML.includes("Reminders only"));
  assert.ok(panel.innerHTML.includes("not automatic folder writes"));
  assert.ok(panel.innerHTML.includes("Last manual download request"));
  assert.ok(!panel.innerHTML.includes('data-action="backup-now"'));
});

test("project descriptions are shared, daily actions and legacy descriptions stay dated", () => {
  const { context: app } = harness();
  const project = {
    description: "Shared description",
    next: "Today's action",
    daily: {
      "2026-10-01": { description: "Legacy dated description", next: "Past action", logId: "past" },
      "2026-10-22": { next: "Today's action", logId: "today" }
    },
    logs: [{ id: "past", date: "2026-10-01", text: "Past action" }, { id: "today", date: "2026-10-22", text: "Today's action" }]
  };
  app.updateProjectDayRecord(project, "2026-10-01", "Updated shared description", "Past action");
  assert.equal(app.projectDayRecord(project, "2026-10-22").description, "Updated shared description");
  assert.equal(project.daily["2026-10-01"].description, "Legacy dated description");
  assert.equal(project.logs.length, 2);
  assert.equal(project.logs[0].text, "Past action");
  app.updateProjectDayRecord(project, "2026-10-22", "Updated shared description", "New action for today");
  assert.equal(app.projectDayRecord(project, "2026-10-01").next, "Past action");
  assert.equal(project.daily["2026-10-22"].next, "New action for today");
  app.updateProjectDayRecord(project, "2026-10-22", "", "New action for today");
  assert.equal(app.projectDayRecord(project, "2026-10-01").description, "");
});

test("existing area choices are unique and new custom areas remain reusable", () => {
  const { context: app } = harness();
  const options = app.projectAreaOptions([{ area: "Research" }, { area: "Research" }, { area: "Photography" }, { area: "New custom area" }]);
  assert.equal(options.length, 3);
  assert.ok(options.includes("New custom area"));
});

test("successive area additions persist independently, including unused areas", () => {
  const { context: app } = harness();
  app.state.projects = [{ id: "p1", area: "Original" }];
  app.state.projectAreas = app.normalizeProjectAreas(undefined, app.state.projects);
  for (const area of ["Research", "Photography", "Tennis"]) assert.equal(app.addProjectArea(area, "p1"), true);
  app.addProjectArea("Unused");
  app.addProjectArea(" Tennis ");
  const restored = JSON.parse(JSON.stringify(app.state));
  const options = app.normalizeProjectAreas(restored.projectAreas, restored.projects);
  for (const area of ["Original", "Research", "Photography", "Tennis", "Unused", "其他"]) assert.ok(options.includes(area));
  assert.equal(options.filter((area) => area === "Tennis").length, 1);
  assert.equal(restored.projects[0].area, "Tennis");
  assert.equal(app.addProjectArea("   "), false);
});

test("area rename, merge, and deletion preserve projects and all history", () => {
  const { context: app } = harness();
  app.state.projects = [
    { id: "p1", area: "Research", logs: [{ text: "Keep history" }] },
    { id: "p2", area: "Research", completed: true, daily: { "2026-01-01": { next: "Keep action" } } },
    { id: "p3", area: "Photography" }
  ];
  app.state.projectAreas = ["Research", "Photography", "Unused", "其他"];
  app.projectAreaFilter = "Research";
  assert.equal(app.renameProjectArea("Research", "Photography"), true);
  assert.equal(app.state.projectAreas.filter((area) => area === "Photography").length, 1);
  assert.ok(!app.state.projectAreas.includes("Research"));
  assert.equal(app.projectAreaFilter, "Photography");
  assert.ok(app.state.projects.every((project) => project.area === "Photography"));
  assert.equal(app.deleteProjectArea("Photography"), true);
  assert.equal(app.state.projects.length, 3);
  assert.ok(app.state.projects.every((project) => project.area === "其他"));
  assert.equal(app.state.projects[0].logs[0].text, "Keep history");
  assert.equal(app.state.projects[1].daily["2026-01-01"].next, "Keep action");
  assert.equal(app.projectAreaFilter, "all");
  assert.equal(app.deleteProjectArea("Unused"), true);
  assert.ok(!app.state.projectAreas.includes("Unused"));
  assert.equal(app.deleteProjectArea("其他"), false);
  assert.equal(app.renameProjectArea("其他", "Renamed"), false);
});

function searchFixture() {
  return {
    projects: [
      { id: "p1", title: "Prism project", description: "Prism shared description", area: "Prism area", daily: { "2026-01-01": { next: "Prism past action", logId: "l1" } }, logs: [{ id: "l1", date: "2026-01-01", text: "Prism past action" }, { id: "l2", date: "2026-01-02", text: "Prism separate history" }] },
      { id: "p2", title: "Prism archive", status: "已完成" }
    ],
    projectAreas: ["Prism area", "Prism unused area"],
    goals: [{ id: "g1", title: "Prism goal", area: "Research" }],
    priorities: [{ id: "a1", text: "Prism priority", detail: "A focused next step" }],
    milestones: [{ id: "m1", title: "Prism milestone", done: true }],
    events: [{ id: "e1", title: "Prism event", date: "2027-01-05", copy: "A future gathering" }],
    days: {
      "2025-04-01": { tasks: [{ id: "t1", text: "Prism task", done: true }], inspiration: "Prism idea", inspirationEn: "Prism idea", food: "Prism meal", calories: 0 },
      "2026-10-22": { fitness: true, routines: { r1: true } }
    },
    weightHistory: [{ date: "2025-02-02", weight: 62 }],
    routineItems: [{ id: "r1", title: "Prism routine", detail: "A daily practice" }],
    supplementaryTraining: [{ id: "s1", title: "Prism training", rows: [{ action: "Prism exercise", frequency: "Weekly" }] }],
    workoutPlanChanges: [{ weekday: 4, effectiveFrom: "2026-10-01", plan: { title: "Prism workout", items: [["1", "Prism movement", "12 reps"]] } }],
    breezeGuide: { entries: [{ id: "b1", zh: "Prism 微风", en: "Prism breeze" }] }
  };
}

test("global search covers every module, old dates, future events, and completed records", () => {
  const { context: app, stored } = harness();
  const data = searchFixture();
  const before = JSON.stringify(data);
  const results = app.searchWorkbench("prism", data);
  const types = new Set(results.map((entry) => entry.type));
  for (const type of ["project", "project-record", "goal", "priority", "task", "milestone", "event", "inspiration", "health", "routine", "training", "workout", "breeze", "area"]) assert.ok(types.has(type), type);
  assert.ok(results.some((entry) => entry.id === "p2"));
  assert.ok(results.some((entry) => entry.type === "task" && entry.date === "2025-04-01"));
  assert.ok(results.some((entry) => entry.type === "event" && entry.date === "2027-01-05"));
  assert.equal(app.searchWorkbench("Prism past action", data).length, 1, "Linked action and log should not duplicate");
  assert.equal(app.searchWorkbench("Prism idea", data).length, 1, "Equivalent language content should not duplicate");
  assert.ok(app.searchWorkbench("weight 62", data).some((entry) => entry.date === "2025-02-02"));
  assert.ok(app.searchWorkbench("calories 0", data).some((entry) => entry.date === "2025-04-01"));
  assert.equal(JSON.stringify(data), before, "Searching must not create days or change user data");
  assert.equal(stored.size, 0, "Searching must not persist anything");
});

test("search supports multiple terms, category names, case, and full-width input", () => {
  const { context: app } = harness();
  const data = searchFixture();
  assert.equal(app.searchWorkbench("  ＰＲＩＳＭ   past ", data).length, 1);
  assert.ok(app.searchWorkbench("Prism 灵感", data).every((entry) => entry.type === "inspiration"));
  assert.ok(app.searchWorkbench("Prism Project", data).some((entry) => entry.id === "p1"));
  assert.equal(app.searchWorkbench("Prism absent-word", data).length, 0);
  assert.equal(app.searchWorkbench("   ", data).length, 0);
  assert.equal(app.searchWorkbench("Prism archive", data)[0].id, "p2");
});

test("search highlighting escapes HTML and keeps matching text in long excerpts", () => {
  const { context: app } = harness();
  const markup = app.searchTextMarkup('<img src=x onerror="bad()">Prism & notes', "prism");
  assert.ok(markup.includes("&lt;img"));
  assert.ok(!markup.includes("<img"));
  assert.ok(markup.includes("<mark>Prism</mark>"));
  assert.ok(markup.includes("&amp;"));
  const excerpt = app.searchTextMarkup(`${"x".repeat(200)} Prism ${"y".repeat(200)}`, "Prism", true);
  assert.ok(excerpt.includes("<mark>Prism</mark>"));
  assert.ok(excerpt.length < 180);
});

test("calendar panel dates navigate independently and reset together only on a main-date change", () => {
  const { context: app } = harness();
  app.resetCalendarPanelDates("2026-01-01");
  assert.equal(app.shiftCalendarPanelDate("projects", -1), true);
  assert.equal(app.calendarPanelDates.projects, "2025-12-31");
  assert.equal(app.calendarPanelDates.workout, "2026-01-01");
  assert.equal(app.calendarPanelDates.work, "2026-01-01");
  assert.equal(app.calendarPanelDates.inspiration, "2026-01-01");
  assert.equal(app.selectedDate, "2026-10-22");
  assert.equal(app.shiftCalendarPanelDate("health", 1), false);
  app.resetCalendarPanelDates("2024-02-28");
  app.shiftCalendarPanelDate("work", 1);
  assert.equal(app.calendarPanelDates.work, "2024-02-29");
  app.resetCalendarPanelDates("2026-10-22");
  assert.ok(Object.values(app.calendarPanelDates).every((date) => date === "2026-10-22"));
});

test("a panel render leaves other panels untouched and binds edits to its displayed date", () => {
  const panels = { workout: "calendarWorkoutPanel", work: "calendarWorkPanel", projects: "calendarProjectLogPanel", inspiration: "calendarInspirationPanel" };
  const ids = [...Object.values(panels), "calendarHealthPanel", "calendarCompletedPanel"];
  for (const [panel, targetId] of Object.entries(panels)) {
    const { context: app } = harness();
    for (const id of ids) app.document.getElementById(id).innerHTML = `Keep ${id}`;
    app.shiftCalendarPanelDate(panel, -1);
    app.renderDayDashboard(panel);
    const markup = app.document.getElementById(targetId).innerHTML;
    assert.ok(markup.includes("2026-10-21"), `${panel} should render its own date`);
    assert.ok(markup.includes(`data-calendar-panel="${panel}"`));
    for (const id of ids.filter((id) => id !== targetId)) assert.equal(app.document.getElementById(id).innerHTML, `Keep ${id}`, `${panel} unexpectedly changed ${id}`);
    if (panel === "work") assert.ok(markup.includes('id="calendarTaskForm" data-task-date="2026-10-21"'));
    if (panel === "inspiration") assert.ok(markup.includes('data-inspiration-date="2026-10-21"'));
  }
});
