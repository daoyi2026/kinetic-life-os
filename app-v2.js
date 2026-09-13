(() => {
  "use strict";

  const STORE = "serene-personal-workspace-v1";
  const APP_VERSION = "v1.0";
  const LANGUAGE_STORE = "kinetic-life-os:language";
  let currentLanguage = localStorage.getItem(LANGUAGE_STORE) === "en" ? "en" : "zh";
  const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const TRANSLATIONS = {
    "跳到主要内容": "Skip to main content",
    "总览": "Overview",
    "工作计划": "Work planning",
    "健康管理": "Health",
    "健身计划": "Fitness plan",
    "日常提醒": "Daily reminders",
    "日历看板": "Calendar dashboard",
    "设置与备份": "Settings & backup",
    "主导航": "Main navigation",
    "移动端导航": "Mobile navigation",
    "个人工作台": "Personal Workbench",
    "本地版": "Local edition",
    "本地保存": "Local storage",
    "修改会自动保存在当前浏览器": "Changes are saved in this browser automatically",
    "搜索项目": "Search projects",
    "搜索项目…": "Search projects…",
    "项目标题": "Project title",
    "上个月": "Previous month",
    "下个月": "Next month",
    "回到今天": "Today",
    "前一天": "Previous day",
    "后一天": "Next day",
    "切换语言": "Switch language",
    "生活总览": "Life overview",
    "近期重点": "Current focus",
    "当前阶段的行动、目的与下一步": "Current actions, purpose, and next steps",
    "现在": "Now",
    "接下来": "Next",
    "随后": "Later",
    "日历": "Calendar",
    "选择日期查看当天概况": "Select a date to view daily overview",
    "打开日历看板": "Open calendar dashboard",
    "进度概览": "Progress overview",
    "工作推进与年度方向": "Work progress and annual direction",
    "本月工作完成率": "Monthly work completion",
    "工作事项": "Work items",
    "年度目标完成率": "Annual goal completion",
    "平均进度": "Average progress",
    "年度目标": "Annual goals",
    "位于本月工作进度下方": "Shown below monthly work progress",
    "待办、重要事项与日期": "Tasks, important items, and dates",
    "体重、饮食与饮水": "Weight, nutrition, and hydration",
    "查看当天训练安排": "View today's workout",
    "推进记录与历史": "Updates and history",
    "今天要做": "Today's tasks",
    "可直接修改，内容与日常提醒、日历同步。": "Edit directly; synced with daily reminders and calendar.",
    "打开日常提醒": "Open daily reminders",
    "项目推进": "Project progress",
    "管理工作与长期项目，记录每一次推进，并随时回看完整历史。": "Manage work and long-term projects, record every update, and review the full history.",
    "项目总进度": "Project overview",
    "与下方项目状态和进度实时同步": "Synced with project status and progress below",
    "正在推进": "In progress",
    "状态、进度和下一步会自动保存。": "Status, progress, and next action are saved automatically.",
    "＋ 新项目": "＋ New project",
    "当前进度": "Current progress",
    "所属领域": "Area",
    "回顾日期": "Review date",
    "项目描述": "Project description",
    "下一步行动": "Next action",
    "记录日期": "Log date",
    "记录一次推进": "Log an update",
    "推进记录": "Project update",
    "添加记录": "Add update",
    "历史记录": "History",
    "展开更多记录": "Show more history",
    "删除项目": "Delete project",
    "删除这条项目记录": "Delete this project update",
    "健康记录": "Health records",
    "记录体重、饮水、饮食与每日状态，重点观察连续变化。": "Track weight, hydration, nutrition, and daily wellbeing.",
    "体重趋势": "Weight trend",
    "按日期形成折线趋势": "Trend by date",
    "今日体重（kg）": "Today's weight (kg)",
    "今日状态": "Today's status",
    "心情": "Mood",
    "精力": "Energy",
    "尚未记录": "Not recorded",
    "很好": "Great",
    "平稳": "Steady",
    "一般": "Okay",
    "低落": "Low",
    "充足": "Energized",
    "正常": "Normal",
    "偏低": "Low",
    "疲惫": "Tired",
    "饮食热量（可选）": "Calories (optional)",
    "保存状态": "Save status",
    "今日饮水": "Today's hydration",
    "每杯按约 250 毫升估算": "Each cup is estimated at about 250 ml",
    "＋ 记录一杯": "＋ Log one cup",
    "减少一杯": "Remove one cup",
    "饮食简记": "Food notes",
    "记录主要食物和大致份量": "Record main foods and approximate portions",
    "保存饮食记录": "Save food notes",
    "查看数据表": "View data table",
    "日期": "Date",
    "体重": "Weight",
    "删除体重记录": "Delete weight record",
    "训练与恢复": "Training & recovery",
    "每周 3 次力量、2 次有氧；切换日期即可查看当天的完整运动安排。": "Three strength and two cardio sessions per week; switch dates to view the full plan.",
    "训练日历": "Training calendar",
    "完成训练的日期会显示赞扬图标": "Completed dates show a praise icon",
    "每日安排": "Daily plan",
    "切换日期查看当天训练项目": "Switch dates to view that day's workout",
    "日常项目": "Daily routines",
    "早上激活，晚上恢复": "Activate in the morning, recover at night",
    "专项训练": "Focused training",
    "动作和建议频次保持同一行，作为现有计划的灵活补充。": "Keep exercises and suggested frequency on one line as a flexible supplement.",
    "编辑": "Edit",
    "完成": "Done",
    "本周运动概况": "This week's workout summary",
    "本周已完成": "Week completed",
    "进行中": "In progress",
    "已完成运动日": "Completed workout days",
    "本周训练记录": "This week's workout records",
    "完美周": "Perfect weeks",
    "每天完成运动计划": "Workout plan completed every day",
    "本周计划进度": "This week's plan progress",
    "连续完成天数": "Consecutive days",
    "按计划训练日连续计算": "Counted across scheduled workout days",
    "训练已完成": "Workout completed",
    "计划训练日": "Scheduled workout day",
    "添加项目": "Add routine",
    "项目名称": "Routine name",
    "补充说明": "Additional notes",
    "面板名称": "Panel name",
    "动作": "Exercise",
    "频次 / 时长": "Frequency / duration",
    "添加动作": "Add exercise",
    "增加面板": "Add panel",
    "删除日常项目": "Delete routine",
    "删除动作": "Delete exercise",
    "热身与拉伸": "Warm-up & stretching",
    "日常计划": "Daily planning",
    "统一管理每日待办、长期事项和需要按日期跟进的工作与生活事件。": "Manage daily tasks, long-term items, and dated work and life events.",
    "当天记录": "Daily notes",
    "长期待办清单": "Long-term tasks",
    "不限定某一天的重要事项": "Important items without a fixed date",
    "事项": "Item",
    "添加一项待办": "Add a task",
    "重要日期": "Important dates",
    "需要提前准备或按时跟进": "Prepare ahead or follow up on time",
    "日历与复盘": "Calendar & review",
    "每日计划": "Daily plan",
    "选择日期后，集中查看当天计划、运动、状态、饮水、体重和项目推进。": "Select a date to review plans, workouts, wellbeing, hydration, weight, and project updates.",
    "运动安排": "Workout plan",
    "事务工作": "Work tasks",
    "待办事项": "Tasks",
    "当天复盘": "Daily review",
    "保存当天记录": "Save daily record",
    "项目推进记录": "Project updates",
    "已完成项目": "Completed projects",
    "筛选标签": "Filter tags",
    "完成的长期待办和工作项目会归档到这里 · 工作项目显示立项到完成的日期范围": "Completed long-term tasks and work projects are archived here · work projects show the start-to-completion date range",
    "该标签下还没有已完成项目。": "No completed projects under this tag.",
    "还没有已完成项目。": "No completed projects yet.",
    "数据备份": "Data backup",
    "导出备份": "Export backup",
    "导入备份": "Import backup",
    "清除当前设备记录": "Clear this device's records",
    "数据与隐私": "Data & privacy",
    "保存": "Save",
    "取消": "Cancel",
    "删除": "Delete",
    "添加": "Add",
    "关闭": "Close",
    "未开始": "Not started",
    "待选择": "To decide",
    "收尾中": "Wrapping up",
    "等待回复": "Awaiting reply",
    "长期维护": "Long-term",
    "暂缓": "Paused",
    "已完成": "Completed",
    "其他": "Other",
    "全部": "All",
    "生活": "Life",
    "工作": "Work",
    "学习": "Study",
    "健康": "Health",
    "训练": "Workout",
    "健身": "Fitness",
    "未记录": "Not recorded",
    "当天": "Today",
    "暂无动作，可先保存面板后再补充。": "No exercises yet. Save the panel first.",
    "还没有动作。": "No exercises yet.",
    "暂无当天记录": "No records for this day",
    "当天还没有待办事项。": "No tasks for this day.",
    "没有未完成的长期待办，已完成事项会归档到日历看板。": "No unfinished long-term tasks. Completed items are archived in the calendar dashboard.",
    "还没有重要日期。": "No important dates yet.",
    "当天没有项目推进记录。": "No project updates for this day.",
    "当天没有重要日期。": "No important dates for this day.",
    "还没有正在推进的项目。": "No projects in progress yet.",
    "还没有推进记录。": "No project updates yet.",
    "今天没有未完成事项。": "No unfinished tasks today.",
    "一": "Mon",
    "二": "Tue",
    "三": "Wed",
    "四": "Thu",
    "五": "Fri",
    "六": "Sat",
    "日": "Sun",
    "工作项目": "Work project",
    "长期待办": "Long-term task"
  };
  const pad = (value) => String(value).padStart(2, "0");
  const keyOf = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const fromKey = (key) => {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  const isDateKey = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
  const todayKey = () => keyOf(new Date());
  const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
  const dayText = (key) => {
    const date = fromKey(key);
    if (currentLanguage === "en") return `${MONTHS_EN[date.getMonth()]} ${date.getDate()}, ${WEEKDAYS_EN[date.getDay()]}`;
    return `${date.getMonth() + 1}月${date.getDate()}日 周${"日一二三四五六"[date.getDay()]}`;
  };
  const addDays = (key, amount) => {
    const date = fromKey(key);
    date.setDate(date.getDate() + amount);
    return keyOf(date);
  };
  const weekKeys = (anchor = new Date()) => {
    const monday = new Date(anchor);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return keyOf(date);
    });
  };
  const TRAINING_WEEKDAYS = [1, 2, 3, 5, 6];

  function icon(name) {
    const paths = {
      home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/>',
      work: '<path d="M3 7h7l2 2h9v10H3z"/><path d="M3 7V5h7l2 2"/>',
      health: '<path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8z"/>',
      fitness: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
      tasks: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 5-6"/>',
      event: '<path d="M5 21V4"/><path d="M5 5h11l-2 4 2 4H5"/>',
      settings: '<path d="M4 7h10"/><path d="M18 7h2"/><circle cx="16" cy="7" r="2"/><path d="M4 17h2"/><path d="M10 17h10"/><circle cx="8" cy="17" r="2"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'
    };
    return `<svg class="nav-svg" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.home}</svg>`;
  }

  const pages = [
    ["home", "总览", "home"],
    ["work", "工作计划", "work"],
    ["health", "健康管理", "health"],
    ["fitness", "健身计划", "fitness"],
    ["reminders", "日常提醒", "tasks"],
    ["calendar", "日历看板", "event"],
    ["settings", "设置与备份", "settings"]
  ];
  const pageNames = Object.fromEntries(pages.map(([id, label]) => [id, label]));

  document.body.innerHTML = `
    <a class="skip-link" href="#v2Main">跳到主要内容</a>
    <div class="v2-shell">
      <aside class="v2-sidebar">
        <div class="v2-brand"><span class="v2-logo" aria-hidden="true">&gt;_</span><div><strong>个人工作台</strong><span>LIFE OS · 本地版</span></div></div>
        <nav class="v2-nav" aria-label="主导航">
          ${pages.map(([id, label, iconName]) => `<a href="#${id}" data-page="${id}">${icon(iconName)}<span>${label}</span></a>`).join("")}
        </nav>
        <div class="sidebar-spacer"></div>
        <div class="sidebar-save">修改会自动保存在当前浏览器</div>
      </aside>

      <main class="v2-main" id="v2Main">
        <header class="v2-topbar">
          <div class="v2-topbar-brand"><span class="v2-mobile-logo" aria-hidden="true">&gt;_</span><div class="v2-crumb" id="pageCrumb">总览</div></div>
          <div class="v2-top-actions">
            <button class="lang-switch" id="languageToggle" type="button" aria-label="切换语言">EN</button>
            <label class="search-field">
              <span class="sr-only">搜索项目</span>
              ${icon("search")}
              <input class="input" id="globalSearch" type="search" placeholder="搜索项目…" />
            </label>
          </div>
        </header>

        <div class="v2-content">
          <section class="v2-screen" data-screen="home">
            <div class="compact-banner"><h2>生活总览</h2></div>
            <section class="section grid home-top">
              <div class="home-left-stack">
                <article class="card">
                  <div class="card-head"><div><h3>近期重点</h3><small>当前阶段的行动、目的与下一步</small></div><button class="edit-btn" data-action="toggle-priority-edit">编辑</button></div>
                  <div id="homePriorities"></div>
                </article>
                <article class="card calendar-card compact-home-calendar">
                  <div class="card-head"><div><h3>日历</h3><small>选择日期查看当天概况</small></div><button class="text-btn" data-page="calendar">打开日历看板</button></div>
                  <div class="calendar-head"><span class="calendar-month" id="homeCalendarMonth"></span><div class="calendar-controls"><button class="date-nav-btn" data-action="home-prev-month" aria-label="上个月">‹</button><button class="date-nav-btn" data-action="home-next-month" aria-label="下个月">›</button></div></div>
                  <div class="weekdays" aria-hidden="true"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
                  <div class="calendar-grid" id="homeCalendarGrid"></div>
                  <div class="calendar-caption" id="homeCalendarCaption"></div>
                </article>
              </div>
              <article class="card progress-overview-card">
                <div class="card-head"><div><h3>进度概览</h3><small>工作推进与年度方向</small></div><button class="edit-btn" data-action="toggle-goal-edit">编辑</button></div>
                <div class="progress-pair">
                  <div class="progress-ring-block">
                    <div class="muted">本月工作完成率</div>
                    <div class="donut compact-donut" id="monthRing" style="--p:0%"><div class="donut-inner"><strong id="monthProgress">0%</strong><span>工作事项</span></div></div>
                  </div>
                  <div class="progress-ring-block">
                    <div class="muted">年度目标完成率</div>
                    <div class="donut compact-donut" id="overallRing" style="--p:0%"><div class="donut-inner"><strong id="overallProgress">0%</strong><span>平均进度</span></div></div>
                  </div>
                </div>
                <div class="goal-divider"><strong>年度目标</strong><span>位于本月工作进度下方</span></div>
                <div id="homeGoals" tabindex="0" aria-label="年度目标列表"></div>
              </article>
            </section>

            <section class="section grid quick-links">
              <button class="card quick-link" data-page="reminders">${icon("tasks")}<strong>日常提醒</strong><small>待办、重要事项与日期</small></button>
              <button class="card quick-link" data-page="health">${icon("health")}<strong>健康</strong><small>体重、饮食与饮水</small></button>
              <button class="card quick-link" data-page="fitness">${icon("fitness")}<strong>健身</strong><small>查看当天训练安排</small></button>
              <button class="card quick-link" data-page="work">${icon("work")}<strong>项目</strong><small>推进记录与历史</small></button>
            </section>

            <section class="section">
              <div class="section-head"><div><h3>今天要做</h3><p>可直接修改，内容与日常提醒、日历同步。</p></div><button class="btn secondary" data-page="reminders">打开日常提醒</button></div>
              <div class="grid grid-3" id="homeTasks"></div>
            </section>
          </section>

          <section class="v2-screen" data-screen="work">
            <div class="page-heading"><h2>项目推进</h2><p>管理工作与长期项目，记录每一次推进，并随时回看完整历史。</p></div>
            <section class="section"><article class="card"><div class="card-head"><div><h3>项目总进度</h3><small>与下方项目状态和进度实时同步</small></div></div><div class="project-overview" id="projectOverview"></div></article></section>
            <section class="section">
              <div class="section-head"><div><h3>正在推进</h3><p>状态、进度和下一步会自动保存。</p></div><button class="btn green" data-action="add-project">＋ 新项目</button></div>
              <div class="project-list" id="projectList"></div>
            </section>
          </section>

          <section class="v2-screen" data-screen="health">
            <div class="page-heading"><h2>健康记录</h2><p>记录体重、饮水、饮食与每日状态，重点观察连续变化。</p></div>
            <section class="section grid health-layout">
              <article class="card">
                <div class="card-head"><div><h3>体重趋势</h3><small>按日期形成折线趋势</small></div></div>
                <div class="line-chart-wrap" id="weightChart"></div>
                <form class="form-row" id="weightForm">
                  <label class="sr-only" for="weightInput">今日体重，单位千克</label>
                  <input class="input" id="weightInput" type="number" step="0.1" min="0" inputmode="decimal" placeholder="今日体重（kg）" required />
                  <button class="btn green" type="submit">记录</button>
                </form>
              </article>
              <article class="card">
                <div class="card-head"><div><h3>今日状态</h3><small id="healthDateLabel"></small></div></div>
                <div class="field"><label for="moodInput">心情</label><select class="select" id="moodInput"><option value="">尚未记录</option><option>很好</option><option>平稳</option><option>一般</option><option>低落</option></select></div>
                <div class="field" style="margin-top:12px"><label for="energyInput">精力</label><select class="select" id="energyInput"><option value="">尚未记录</option><option>充足</option><option>正常</option><option>偏低</option><option>疲惫</option></select></div>
                <div class="field" style="margin-top:12px"><label for="calorieInput">饮食热量（可选）</label><input class="input" id="calorieInput" type="number" step="100" min="0" inputmode="numeric" placeholder="例如：1800" /></div>
                <button class="btn secondary" data-action="save-health" style="margin-top:14px">保存状态</button>
              </article>
            </section>
            <section class="section grid grid-2">
              <article class="card">
                <div class="card-head"><div><h3>今日饮水</h3><small>每杯按约 250 毫升估算</small></div><span class="tag blue" id="waterLabel">0 / 8 杯</span></div>
                <div class="water-meter" id="waterMeter"></div>
                <div class="form-row"><button class="btn green" data-action="water-plus">＋ 记录一杯</button><button class="btn secondary" data-action="water-minus">减少一杯</button></div>
              </article>
              <article class="card">
                <div class="card-head"><div><h3>饮食简记</h3><small>记录主要食物和大致份量</small></div></div>
                <label class="sr-only" for="foodInput">饮食简记</label>
                <textarea class="textarea" id="foodInput" placeholder="早餐：……&#10;午餐：……&#10;晚餐：……"></textarea>
                <button class="btn secondary" data-action="save-food" style="margin-top:10px">保存饮食记录</button>
              </article>
            </section>
          </section>

          <section class="v2-screen" data-screen="fitness">
            <div class="page-heading"><h2>健身计划</h2><p>每周 3 次力量、2 次有氧；切换日期即可查看当天的完整运动安排。</p></div>
            <section class="section">
              <article class="card fitness-calendar-card">
                <div class="fitness-calendar-layout">
                  <div class="fitness-calendar-pane">
                    <div class="card-head"><div><h3>训练日历</h3><small>完成训练的日期会显示赞扬图标</small></div></div>
                    <div class="calendar-head"><span class="calendar-month" id="fitnessCalendarMonth"></span><div class="calendar-controls"><button class="date-nav-btn" data-action="fitness-prev-month" aria-label="上个月">‹</button><button class="date-nav-btn" data-action="fitness-calendar-today" aria-label="回到今天">今</button><button class="date-nav-btn" data-action="fitness-next-month" aria-label="下个月">›</button></div></div>
                    <div class="weekdays" aria-hidden="true"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
                    <div class="calendar-grid fitness-calendar-grid" id="fitnessCalendarGrid"></div>
                  </div>
                  <div class="fitness-weekly-summary" id="fitnessWeeklySummary"></div>
                </div>
              </article>
            </section>
            <section class="section grid grid-2">
              <article class="card">
                <div class="card-head"><div><h3>每日安排</h3><small>切换日期查看当天训练项目</small></div></div>
                <div class="date-strip"><button class="date-nav-btn" data-action="fitness-prev-day" aria-label="前一天">‹</button><div class="date-strip-label"><strong id="fitnessDateTitle"></strong><small id="fitnessDateHint"></small></div><button class="date-nav-btn" data-action="fitness-next-day" aria-label="后一天">›</button></div>
                <div id="fitnessDayPlan"></div>
              </article>
              <article class="card">
                <div class="card-head"><div><h3>日常项目</h3><small>早上激活，晚上恢复</small></div><button class="text-btn" data-action="toggle-routine-edit">编辑</button></div>
                <div class="routine-list" id="fitnessRoutines"></div>
              </article>
            </section>
            <section class="section">
              <div class="section-head"><div><h3>专项训练</h3><p>动作和建议频次保持同一行，作为现有计划的灵活补充。</p></div><div class="section-actions" id="supplementTrainingSectionActions"></div></div>
              <div class="grid grid-3 training-panels" id="supplementTrainingPanels"></div>
            </section>
          </section>

          <section class="v2-screen" data-screen="reminders">
            <div class="page-heading"><h2>日常提醒</h2><p>统一管理每日待办、长期事项和需要按日期跟进的工作与生活事件。</p></div>
            <section class="section grid grid-2">
              <article class="card">
                <div class="date-strip"><button class="date-nav-btn" data-action="reminder-prev-day" aria-label="前一天">‹</button><div class="date-strip-label"><strong id="reminderDateTitle"></strong><small id="reminderProgress"></small></div><button class="date-nav-btn" data-action="reminder-next-day" aria-label="后一天">›</button></div>
                <div class="todo-list" id="reminderList"></div>
                <form class="form-row" id="reminderForm" style="margin-top:14px"><label class="sr-only" for="reminderInput">添加待办</label><input class="input" id="reminderInput" maxlength="120" placeholder="添加当天待办" required /><button class="btn green" type="submit">添加</button></form>
              </article>
              <article class="card">
                <div class="card-head"><div><h3>当天记录</h3><small id="notesDateLabel"></small></div></div>
                <label class="sr-only" for="dayNotesInput">当天记录</label>
                <textarea class="textarea" id="dayNotesInput" placeholder="今天推进了什么？明天需要继续什么？"></textarea>
                <button class="btn secondary" data-action="save-day-notes" style="margin-top:10px">保存记录</button>
              </article>
            </section>
            <section class="section grid important-layout">
              <article class="card">
                <div class="card-head"><div><h3>长期待办清单</h3><small>不限定某一天的重要事项</small></div><span class="tag" id="masterTodoProgress">0 / 0</span></div>
                <div class="master-todo" id="masterTodoList"></div>
                <form class="form-grid" id="masterTodoForm" style="margin-top:16px">
                  <div class="field"><label for="masterTodoTitle">事项</label><input class="input" id="masterTodoTitle" maxlength="100" placeholder="添加一项待办" required /></div>
                  <div class="field"><label for="masterTodoNote">补充说明</label><input class="input" id="masterTodoNote" maxlength="160" placeholder="可选" /></div>
                  <div class="wide"><button class="btn green" type="submit">添加待办</button></div>
                </form>
              </article>
              <article class="card">
                <div class="card-head"><div><h3>重要日期</h3><small>需要提前准备或按时跟进</small></div><button class="text-btn" data-action="toggle-event-form">＋ 添加</button></div>
                <div class="event-list" id="eventList"></div>
                <form class="form-grid" id="eventForm" hidden style="margin-top:16px">
                  <div class="field"><label for="eventDateInput">日期</label><input class="input" id="eventDateInput" type="date" required /></div>
                  <div class="field"><label for="eventTitleInput">事项名称</label><input class="input" id="eventTitleInput" maxlength="80" required /></div>
                  <div class="field wide"><label for="eventCopyInput">补充说明</label><textarea class="textarea" id="eventCopyInput" maxlength="200"></textarea></div>
                  <div class="wide form-row"><button class="btn green" type="submit">保存日期</button><button class="btn secondary" type="button" data-action="toggle-event-form">取消</button></div>
                </form>
              </article>
            </section>
          </section>

          <section class="v2-screen" data-screen="calendar">
            <div class="page-heading"><h2>日历看板</h2><p>选择日期后，集中查看当天计划、运动、状态、饮水、体重和项目推进。</p></div>
            <section class="section calendar-stack">
              <article class="card calendar-card calendar-overview-card">
                <div class="calendar-overview-grid">
                  <div class="calendar-compact-pane">
                    <div class="calendar-head"><span class="calendar-month" id="calendarMonth"></span><div class="calendar-controls"><button class="date-nav-btn" data-action="prev-month" aria-label="上个月">‹</button><button class="date-nav-btn" data-action="today" aria-label="回到今天">今</button><button class="date-nav-btn" data-action="next-month" aria-label="下个月">›</button></div></div>
                    <div class="weekdays" aria-hidden="true"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
                    <div class="calendar-grid" id="calendarGrid"></div>
                    <div class="calendar-caption" id="calendarCaption"></div>
                  </div>
                  <div class="calendar-health-pane day-dashboard" id="calendarHealthPanel"></div>
                </div>
              </article>
              <div class="calendar-detail-grid">
                <article class="card day-dashboard" id="calendarWorkoutPanel"></article>
                <article class="card day-dashboard" id="calendarWorkPanel"></article>
              </div>
              <div class="calendar-bottom-grid">
                <article class="card day-dashboard" id="calendarProjectLogPanel"></article>
                <article class="card day-dashboard" id="calendarEventPanel"></article>
              </div>
              <article class="card day-dashboard calendar-completed-panel" id="calendarCompletedPanel"></article>
            </section>
          </section>

          <section class="v2-screen" data-screen="settings">
            <div class="page-heading"><h2>设置与备份</h2><p>管理本地记录的备份与恢复。</p></div>
            <section class="section settings-stack">
              <article class="card settings-card"><h3>数据备份</h3><p>导出 JSON 备份后，可以在另一台设备恢复工作台数据。</p><div class="settings-actions"><button class="btn green" data-action="export">导出备份</button><label class="btn secondary file-btn">导入备份<input id="importInput" type="file" accept="application/json,.json" aria-label="选择备份文件" /></label></div></article>
              <article class="card settings-card"><h3>清除当前设备记录</h3><p>此操作会清除当前浏览器中的工作台记录，且无法撤销。</p><div class="settings-actions"><button class="btn danger" data-action="reset">清除全部记录</button></div></article>
            </section>
          </section>

          <p class="v2-footer">KINETIC LIFE OS · 本地保存 · ${APP_VERSION}</p>
        </div>
      </main>
    </div>
    <nav class="mobile-nav-v2" aria-label="移动端导航">
      ${pages.slice(0, 4).concat([pages[5]]).map(([id, label, iconName]) => `<a href="#${id}" data-page="${id}">${icon(iconName)}<span>${label.replace("计划", "")}</span></a>`).join("")}
    </nav>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
  `;

  const languageTextSources = new WeakMap();
  const languageAttributeSources = new WeakMap();

  function translateText(value) {
    if (currentLanguage === "zh") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (TRANSLATIONS[trimmed]) return value.replace(trimmed, TRANSLATIONS[trimmed]);
    const statusMatch = trimmed.match(/^(未开始|待选择|进行中|收尾中|等待回复|长期维护|暂缓|已完成)\s*·\s*(.+)$/);
    if (statusMatch) return value.replace(trimmed, `${TRANSLATIONS[statusMatch[1]]} · ${statusMatch[2]}`);
    const historyMatch = trimmed.match(/^历史记录（(\d+)）$/);
    if (historyMatch) return value.replace(trimmed, `History (${historyMatch[1]})`);
    const moreHistoryMatch = trimmed.match(/^展开更多记录（(\d+)）$/);
    if (moreHistoryMatch) return value.replace(trimmed, `Show more history (${moreHistoryMatch[1]})`);
    const deleteProjectMatch = trimmed.match(/^删除项目\s+(.+)$/);
    if (deleteProjectMatch) return value.replace(trimmed, `Delete project ${deleteProjectMatch[1]}`);
    const patterns = [
      [/^(\d+)\s*\/\s*(\d+)\s*项完成$/, "$1 / $2 complete"],
      [/^(\d+)\s*\/\s*(\d+)\s*项$/, "$1 / $2 items"],
      [/^(\d+)\s*\/\s*(\d+)\s*杯$/, "$1 / $2 cups"],
      [/^(\d+)\s*项$/, "$1 items"],
      [/^(\d+)\s*条$/, "$1 updates"],
      [/^(\d+)\s*天$/, "$1 days"],
      [/^(\d+)\s*周$/, "$1 weeks"],
      [/^(\d+)\s*杯$/, "$1 cups"],
      [/^(\d+)\s*个训练日$/, "$1 training days"],
      [/^(\d+)\s*分钟$/, "$1 minutes"],
      [/^(\d+)月$/, "$1 month"],
      [/^(\d{4})年(\d+)月$/, "$2/$1"]
    ];
    for (const [pattern, replacement] of patterns) {
      if (pattern.test(trimmed)) return value.replace(trimmed, trimmed.replace(pattern, replacement));
    }
    return value;
  }

  function translateAttribute(element, name) {
    if (!element.hasAttribute(name)) return;
    const current = element.getAttribute(name);
    const source = languageAttributeSources.get(element)?.[name] ?? current;
    if (!languageAttributeSources.has(element)) languageAttributeSources.set(element, {});
    languageAttributeSources.get(element)[name] = source;
    if (name === "placeholder" || name === "aria-label" || name === "title") {
      element.setAttribute(name, translateText(source));
    }
  }

  function applyLanguage() {
    document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-CN";
    const languageToggle = document.getElementById("languageToggle");
    if (languageToggle) {
      languageToggle.textContent = currentLanguage === "en" ? "中文" : "EN";
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);
    textNodes.forEach((textNode) => {
      const parent = textNode.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return;
      if (!languageTextSources.has(textNode)) languageTextSources.set(textNode, textNode.nodeValue);
      textNode.nodeValue = translateText(languageTextSources.get(textNode));
    });
    document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
      ["placeholder", "aria-label", "title"].forEach((name) => translateAttribute(element, name));
    });
    if (languageToggle) languageToggle.setAttribute("aria-label", currentLanguage === "en" ? "Switch to Chinese" : "切换到英文");
  }

  const languageObserver = new MutationObserver(() => requestAnimationFrame(applyLanguage));
  languageObserver.observe(document.body, { childList: true, subtree: true });

  const routineData = [
    ["stand", "早上站桩 15 分钟", "以呼吸平稳、身体放松为准。"],
    ["jingang", "早上金刚功", "按现有练习内容完成。"],
    ["longevity", "晚上长寿功", "作为晚间舒缓练习。"],
    ["back", "晚上背部拉伸", "温和拉伸，避免疼痛。"],
    ["face", "晚上面部瑜伽", "轻柔完成，避免用力拉扯。"]
  ];

  function normalizeRoutineItems(items) {
    const source = Array.isArray(items) && items.length ? items : routineData;
    const normalized = source.map((item, index) => {
      const tuple = Array.isArray(item) ? item : [item?.id, item?.title, item?.detail];
      return {
        id: String(tuple[0] || `routine-${index + 1}`),
        title: String(tuple[1] || "").trim(),
        detail: String(tuple[2] || "").trim()
      };
    }).filter((item) => item.title);
    return normalized.length ? normalized : routineData.map(([id, title, detail]) => ({ id, title, detail }));
  }

  const workoutPlans = {
    1: {
      title: "力量 A",
      subtitle: "肩背与手臂 · 全站立 · 不超过 60 分钟",
      items: [
        ["热", "热身 6–8 分钟", "绕肩、肩胛活动、胸椎旋转与手腕活动"],
        ["1", "站姿哑铃肩推", "4 × 8–12"],
        ["2", "站姿哑铃侧平举", "4 × 10–15"],
        ["3", "站姿单臂哑铃划船", "4 × 10–12 / 侧"],
        ["4", "站姿俯身反向飞鸟", "4 × 12–15"],
        ["5", "站姿哑铃弯举", "3 × 10–12"],
        ["6", "保加利亚分腿蹲", "2 × 10–12"],
        ["7", "站姿靠墙滑手", "3 × 8–12"],
        ["伸", "拉伸 5–8 分钟", "胸肌、背阔肌与前臂"]
      ]
    },
    2: {
      title: "有氧 A",
      subtitle: "3 个项目 · 约 43–52 分钟",
      items: [
        ["1", "低冲击有氧", "25–30 分钟"],
        ["2", "肩背与胸椎灵活", "10–12 分钟"],
        ["3", "手腕与小关节", "8–10 分钟"]
      ]
    },
    3: {
      title: "力量 B",
      subtitle: "臀腿、骨盆控制与核心 · 不超过 60 分钟",
      items: [
        ["热", "热身 6–8 分钟", "髋、踝活动与徒手深蹲"],
        ["1", "哑铃深蹲", "4 × 10–12"],
        ["2", "臀桥", "4 × 12–15"],
        ["3", "哑铃罗马尼亚硬拉", "4 × 10–12"],
        ["4", "扶墙辅助静态分腿蹲", "3 × 8–12 / 侧"],
        ["5", "保加利亚分腿蹲", "2 × 10–12"],
        ["6", "平板支撑", "30–60 秒"],
        ["7", "死虫式", "3 × 8–10 / 侧"],
        ["伸", "拉伸 5–8 分钟", "髋屈肌、臀部与大腿后侧"]
      ]
    },
    4: {
      title: "恢复日",
      subtitle: "身体维护或轻松走动",
      items: [["1", "轻松走动", "按当天状态安排 15–30 分钟"], ["2", "日常维护", "完成早晚练习即可"]]
    },
    5: {
      title: "力量 C",
      subtitle: "背部稳定、臀部与后链 · 不超过 60 分钟",
      items: [
        ["热", "热身 6–8 分钟", "走步、绕肩、胸椎旋转与髋铰链"],
        ["1", "单臂哑铃划船", "4 × 10–12 / 侧"],
        ["2", "俯身反向飞鸟", "4 × 12–15"],
        ["3", "哑铃罗马尼亚硬拉", "4 × 10–12"],
        ["4", "单腿臀桥", "4 × 10–12 / 侧"],
        ["5", "超人式", "4 × 12–15"],
        ["6", "站姿单侧提重行走 / 原地抬膝", "3 × 30–45 秒 / 侧"],
        ["7", "站姿靠墙滑手", "3 × 8–12"],
        ["伸", "拉伸 5–8 分钟", "背阔肌、胸、臀部与后链"]
      ]
    },
    6: {
      title: "有氧 B",
      subtitle: "3 个项目 · 约 42–52 分钟",
      items: [
        ["1", "低冲击有氧", "20–25 分钟"],
        ["2", "骨盆与髋踝控制", "12–15 分钟"],
        ["3", "肩背稳定", "10–12 分钟"]
      ]
    },
    0: {
      title: "休息日",
      subtitle: "充分恢复，不安排正式训练",
      items: [["1", "轻松活动", "散步或按状态完成日常维护"]]
    }
  };

  const supplementaryTraining = [
    {
      title: "稳定性及灵活性",
      note: "肩背、手腕、髋踝与身体控制",
      rows: [
        ["肩背与胸椎流动", "每周 2 次 · 10–12 分钟"],
        ["手腕与小关节活动", "每周 2–3 次 · 8–10 分钟"],
        ["骨盆与髋踝控制", "每周 2 次 · 10–15 分钟"]
      ]
    },
    {
      title: "舞蹈训练",
      note: "先从自由律动和基础协调开始",
      rows: [
        ["节奏热身与重心转移", "每周 1 次 · 8–10 分钟"],
        ["低冲击组合练习", "每周 1 次 · 15–20 分钟"],
        ["自由律动与放松", "每周 1 次 · 5–10 分钟"]
      ]
    },
    {
      title: "网球训练",
      note: "以基础步伐、挥拍协调和无痛为准",
      rows: [
        ["分腿垫步与侧向移动", "每周 1 次 · 10 分钟"],
        ["正反手空挥或对墙练习", "每周 1 次 · 15–20 分钟"],
        ["肩腕放松与拉伸", "每次结束 · 5–8 分钟"]
      ]
    }
  ];

  function cloneSupplementaryTraining() {
    return supplementaryTraining.map((panel, panelIndex) => {
      const panelId = panel.id || `supplementary-panel-${panelIndex + 1}`;
      return {
        id: panelId,
        title: panel.title,
        note: panel.note,
        rows: panel.rows.map(([action, frequency], rowIndex) => ({
          id: `${panelId}-row-${rowIndex + 1}`,
          action,
          frequency
        }))
      };
    });
  }

  function normalizeSupplementaryTraining(items) {
    const source = Array.isArray(items) && items.length ? items : cloneSupplementaryTraining();
    const normalized = source.map((panel, panelIndex) => {
      const rows = Array.isArray(panel?.rows) ? panel.rows.map((row, rowIndex) => {
        const tuple = Array.isArray(row) ? row : [row?.action, row?.frequency];
        return {
          id: String(row?.id || `${panel?.id || `supplementary-panel-${panelIndex + 1}`}-row-${rowIndex + 1}`),
          action: String(tuple[0] || "").trim(),
          frequency: String(tuple[1] || "").trim()
        };
      }) : [];
      return {
        id: String(panel?.id || `supplementary-panel-${panelIndex + 1}`),
        title: String(panel?.title || "").trim(),
        note: String(panel?.note || "").trim(),
        rows
      };
    }).filter((panel) => panel.title);
    return normalized.length ? normalized : cloneSupplementaryTraining();
  }

  const emptyDay = () => ({
    tasks: [],
    notes: "",
    mood: "",
    energy: "",
    calories: "",
    food: "",
    water: 0,
    fitness: false,
    workoutPlan: null,
    routines: { stand: false, jingang: false, longevity: false, back: false, face: false }
  });

  function defaultState() {
    const createdAt = todayKey();
    const state = {
      version: 5,
      goals: [
        { id: "g-phd", title: "明确博士方向并开始沟通", area: "博士与研究", progress: 25 },
        { id: "g-health", title: "建立稳定的身体节奏", area: "健康与体态", progress: 20 },
        { id: "g-career", title: "建立求职机会管道", area: "求职与远程", progress: 10 },
        { id: "g-create", title: "保持长期创作与输出", area: "创作与学习", progress: 10 },
        { id: "g-base", title: "完成个人数字空间初版", area: "产品与空间", progress: 20 }
      ],
      priorities: [
        { id: "priority-now", label: "现在", text: "完成一次投递或跟进", detail: "用一个真实行动降低求职焦虑，并记录岗位与后续日期。" },
        { id: "priority-next", label: "接下来", text: "整理博士方向文本并发送第一封邮件", detail: "先说明问题、对象和方法；发送后记录回复与下一步。" },
        { id: "priority-later", label: "随后", text: "完成个人房间的首个可见区块", detail: "先完成空间建模和首屏，不等待职业定位完全确定。" }
      ],
      projects: [
        { id: "p-job", title: "投简历与远程工作", description: "整理岗位、投递材料和跟进节奏，逐步建立稳定的机会管道。", symbol: "↗", area: "求职与远程", status: "进行中", progress: 10, next: "完成一版主简历，开始记录投递与跟进。", logs: [], createdAt, completed: false },
        { id: "p-phd", title: "博士项目与导师沟通", description: "围绕研究方向整理说明、筛选合适的导师，并持续记录沟通结果。", symbol: "✉", area: "博士与研究", status: "进行中", progress: 25, next: "整理研究方向说明、导师名单和第一封邮件。", logs: [], createdAt, completed: false },
        { id: "p-app", title: "入睡时间记录 App", description: "做一个足够轻量的记录工具，帮助观察作息变化并形成可回看的趋势。", symbol: "⌛", area: "产品与空间", status: "收尾中", progress: 80, next: "列出发布前剩余事项并逐件关闭。", logs: [], createdAt, completed: false },
        { id: "p-room", title: "个人房间与网站", description: "把个人空间、作品入口和持续记录整合成一个可以逐步扩展的数字基地。", symbol: "⌂", area: "产品与空间", status: "进行中", progress: 15, next: "先完成一个可用初版，再根据实际使用补充内容。", logs: [], createdAt, completed: false },
        { id: "p-novel", title: "年代文小说", description: "保持低压力、可持续的写作节奏，逐步完善故事设定和章节内容。", symbol: "✎", area: "创作与学习", status: "长期维护", progress: 5, next: "安排本周一次写作时段，先完成一个小片段。", logs: [], createdAt, completed: false },
        { id: "p-media", title: "个人自媒体输出", description: "围绕真实兴趣持续产出完整主题，先保持稳定，再逐步形成自己的表达方式。", symbol: "◎", area: "创作与学习", status: "长期维护", progress: 5, next: "完成一个不完美但完整的主题输出。", logs: [], createdAt, completed: false },
        { id: "p-healing", title: "疗愈网页：森林 / 极光二选一", description: "探索一个节奏舒缓的沉浸式网页，用简单的视觉和声音帮助进入放松状态。", symbol: "◌", area: "产品与空间", status: "待选择", progress: 0, next: "先确定一个主题，再研究循环视频。", logs: [], createdAt, completed: false }
      ],
      milestones: [
        { id: "m1", title: "研究方向说明第一版", note: "先写清楚问题、对象和方法，不追求最终稿。", done: false, createdAt },
        { id: "m2", title: "建立导师候选名单", note: "记录研究重合度、近期发表和招生信息。", done: false, createdAt },
        { id: "m3", title: "发送第一封沟通邮件", note: "整理内容后发送，并记录后续跟进。", done: false, createdAt },
        { id: "m4", title: "建立申请材料清单", note: "研究计划、简历、语言和推荐材料逐项推进。", done: false, createdAt }
      ],
      events: [],
      days: {},
      workoutPlanChanges: [],
      weightHistory: [],
      routineItems: normalizeRoutineItems(),
      supplementaryTraining: cloneSupplementaryTraining(),
      reminders: [],
      focusSeconds: 1500,
      migratedToV2: true
    };
    const day = emptyDay();
    day.tasks = [
      { id: uid("task"), text: "推进一项当前重点", done: false, area: "工作" },
      { id: uid("task"), text: "英语口语 15–30 分钟", done: false, area: "学习" },
      { id: uid("task"), text: "完成训练或身体维护", done: false, area: "健康" }
    ];
    state.days[todayKey()] = day;
    return state;
  }

  function preserveFitnessDays(baseDays, rawDays) {
    const preserved = {};
    const source = rawDays && typeof rawDays === "object" ? rawDays : {};
    const keys = new Set([...Object.keys(baseDays || {}), ...Object.keys(source)]);
    keys.forEach((key) => {
      if (!isDateKey(key)) return;
      const defaultDay = baseDays?.[key];
      const rawDay = source[key];
      const next = defaultDay ? JSON.parse(JSON.stringify(defaultDay)) : emptyDay();
      normalizeDay(next);
      if (rawDay && typeof rawDay === "object") {
        const fitnessDay = JSON.parse(JSON.stringify(rawDay));
        normalizeDay(fitnessDay);
        next.fitness = fitnessDay.fitness === true;
        next.routines = { ...next.routines, ...fitnessDay.routines };
        if (fitnessDay.workoutPlan && Array.isArray(fitnessDay.workoutPlan.items)) next.workoutPlan = fitnessDay.workoutPlan;
      }
      if (defaultDay || next.fitness || Object.values(next.routines).some(Boolean) || next.workoutPlan) preserved[key] = next;
    });
    return preserved;
  }

  function demoTask(id, text, done, area) {
    return { id, text, done, area };
  }

  function demoLog(id, date, text) {
    return { id, date, text };
  }

  function buildDemoState(base, raw) {
    const today = todayKey();
    const fitnessDays = preserveFitnessDays({}, raw?.days);
    const days = {};

    const addDemoDay = (offset, values) => {
      const key = addDays(today, offset);
      const day = emptyDay();
      const fitnessDay = fitnessDays[key];
      if (fitnessDay) {
        day.fitness = fitnessDay.fitness === true;
        day.routines = { ...day.routines, ...fitnessDay.routines };
        day.workoutPlan = fitnessDay.workoutPlan ? JSON.parse(JSON.stringify(fitnessDay.workoutPlan)) : null;
      }
      Object.assign(day, values);
      normalizeDay(day);
      days[key] = day;
    };

    addDemoDay(-10, {
      tasks: [demoTask("demo-task-01", "整理课程调研素材", true, "工作"), demoTask("demo-task-02", "阅读 20 分钟", false, "学习")],
      notes: "完成资料初筛，留下三条可继续验证的线索。",
      mood: "平稳",
      energy: "正常",
      calories: "1780",
      food: "燕麦、鸡蛋、烤蔬菜",
      water: 6
    });
    addDemoDay(-9, {
      tasks: [demoTask("demo-task-03", "整理项目目录", true, "工作"), demoTask("demo-task-04", "散步 25 分钟", true, "生活"), demoTask("demo-task-05", "记录一个灵感", false, "创作")],
      notes: "把零散资料归档到三个主题下。",
      mood: "很好",
      energy: "充足",
      calories: "1860",
      food: "米饭、豆腐、时蔬与水果",
      water: 7
    });
    addDemoDay(-8, {
      tasks: [demoTask("demo-task-06", "完成课程提案目录", true, "工作"), demoTask("demo-task-07", "整理两张参考图", false, "创作")],
      notes: "提案目录已经成形，明天补充示例。",
      mood: "平稳",
      energy: "正常",
      calories: "1810",
      food: "全麦面包、番茄、鱼和绿叶菜",
      water: 5
    });
    addDemoDay(-7, {
      tasks: [demoTask("demo-task-08", "完成一页展示稿", true, "工作"), demoTask("demo-task-09", "给自己留出安静阅读时间", true, "学习"), demoTask("demo-task-10", "整理桌面 10 分钟", false, "生活")],
      notes: "完成展示稿骨架，保留了下一轮修改空间。",
      mood: "很好",
      energy: "充足",
      calories: "1900",
      food: "酸奶、杂粮饭、鸡胸肉和水果",
      water: 8
    });
    addDemoDay(-6, {
      tasks: [demoTask("demo-task-11", "确认提案标题", true, "工作"), demoTask("demo-task-12", "完成一次短复盘", false, "生活")],
      notes: "标题和目标人群已确定，下一步是校对文字。",
      mood: "平稳",
      energy: "正常",
      calories: "1760",
      food: "玉米、豆浆、菌菇和青菜",
      water: 6
    });
    addDemoDay(-5, {
      tasks: [demoTask("demo-task-13", "更新作品集首页文案", true, "工作"), demoTask("demo-task-14", "学习 30 分钟", false, "学习"), demoTask("demo-task-15", "记录当天最重要的一件事", false, "生活")],
      notes: "首页文案从功能描述改成了更清晰的使用场景。",
      mood: "一般",
      energy: "正常",
      calories: "1830",
      food: "面条、鸡蛋、豆类和水果",
      water: 5
    });
    addDemoDay(-4, {
      tasks: [demoTask("demo-task-16", "完成作品集移动端检查", true, "工作"), demoTask("demo-task-17", "散步 20 分钟", true, "生活")],
      notes: "移动端检查完成，发现的两个间距问题已记下。",
      mood: "很好",
      energy: "充足",
      calories: "1880",
      food: "燕麦、牛奶、烤南瓜和蔬菜",
      water: 7
    });
    addDemoDay(-3, {
      tasks: [demoTask("demo-task-18", "整理阅读卡片", true, "学习"), demoTask("demo-task-19", "写下明日三件事", true, "生活"), demoTask("demo-task-20", "清理下载文件夹", false, "工作")],
      notes: "阅读卡片完成第一轮合并，保留五张待补充卡片。",
      mood: "平稳",
      energy: "正常",
      calories: "1800",
      food: "粥、鸡肉、豆腐和青菜",
      water: 6
    });
    addDemoDay(-2, {
      tasks: [demoTask("demo-task-21", "确认周末路线候选", true, "生活"), demoTask("demo-task-22", "补齐课程示例", false, "工作")],
      notes: "路线保留两条，课程示例还需要再压缩一次。",
      mood: "平稳",
      energy: "偏低",
      calories: "1720",
      food: "三明治、汤面和时蔬",
      water: 4
    });
    addDemoDay(-1, {
      tasks: [demoTask("demo-task-23", "完成一轮文字校对", true, "工作"), demoTask("demo-task-24", "整理明日会议材料", true, "工作"), demoTask("demo-task-25", "放松阅读 15 分钟", false, "生活")],
      notes: "完成文字校对和会议材料整理，今天的重点已收尾。",
      mood: "很好",
      energy: "充足",
      calories: "1870",
      food: "鸡蛋、糙米、鱼肉和水果",
      water: 7
    });
    addDemoDay(0, {
      tasks: [
        demoTask("demo-task-today-01", "完成课程提案开场页", true, "工作"),
        demoTask("demo-task-today-02", "整理两条阅读笔记", false, "学习"),
        demoTask("demo-task-today-03", "发送一次项目进度同步", true, "工作"),
        demoTask("demo-task-today-04", "晚间散步 20 分钟", false, "生活"),
        demoTask("demo-task-today-05", "记录当天复盘", false, "生活")
      ],
      notes: "完成课程提案开场页和项目进度同步，明天继续补齐讲义结构。",
      mood: "平稳",
      energy: "充足",
      calories: "1850",
      food: "燕麦、时蔬、豆制品与水果",
      water: 6
    });

    Object.entries(fitnessDays).forEach(([key, fitnessDay]) => {
      if (days[key]) return;
      const day = emptyDay();
      day.fitness = fitnessDay.fitness === true;
      day.routines = { ...day.routines, ...fitnessDay.routines };
      day.workoutPlan = fitnessDay.workoutPlan ? JSON.parse(JSON.stringify(fitnessDay.workoutPlan)) : null;
      days[key] = day;
    });

    const projectDate = (offset) => addDays(today, offset);
    const projects = [
      {
        id: "demo-project-course",
        title: "城市观察课程提案",
        description: "围绕城市观察设计一套可讨论的课程提案，包含结构、案例和练习安排。",
        symbol: "◎",
        area: "学习与创作",
        status: "进行中",
        progress: 55,
        next: "完成课程结构与第一版讲义。",
        createdAt: projectDate(-8),
        updatedAt: today,
        completed: false,
        logs: [
          demoLog("demo-log-course-1", projectDate(-7), "完成资料梳理并确定三个主题。"),
          demoLog("demo-log-course-2", projectDate(-3), "确定课程结构和练习顺序。"),
          demoLog("demo-log-course-3", today, "完成开场页，开始补充讲义。")
        ]
      },
      {
        id: "demo-project-portfolio",
        title: "作品集首页改版",
        description: "重新整理作品集首页的信息层级，让作品入口、项目背景和移动端阅读路径更清晰。",
        symbol: "↗",
        area: "产品与空间",
        status: "收尾中",
        progress: 80,
        next: "补齐移动端排版并完成一次自测。",
        createdAt: projectDate(-18),
        updatedAt: projectDate(-4),
        completed: false,
        logs: [
          demoLog("demo-log-portfolio-1", projectDate(-15), "重排首页信息层级。"),
          demoLog("demo-log-portfolio-2", projectDate(-9), "完成桌面端第一版。"),
          demoLog("demo-log-portfolio-3", projectDate(-4), "完成移动端检查并记录两项微调。")
        ]
      },
      {
        id: "demo-project-route",
        title: "周末城市探索",
        description: "保留一条轻量、可执行的周末路线，记录交通、停留时间和沿途值得回看的地点。",
        symbol: "⌂",
        area: "生活方式",
        status: "待选择",
        progress: 10,
        next: "从候选路线中确定一条轻量方案。",
        createdAt: projectDate(-5),
        updatedAt: projectDate(-2),
        completed: false,
        logs: [demoLog("demo-log-route-1", projectDate(-2), "整理两条候选路线和预计时间。")]
      },
      {
        id: "demo-project-reading",
        title: "阅读资料整理",
        description: "把分散的阅读卡片整理成稳定的主题结构，合并重复内容并留下可复用的摘要。",
        symbol: "✎",
        area: "学习与创作",
        status: "长期维护",
        progress: 35,
        next: "每周整理一批卡片，保持主题标签稳定。",
        createdAt: projectDate(-28),
        updatedAt: projectDate(-3),
        completed: false,
        logs: [
          demoLog("demo-log-reading-1", projectDate(-20), "建立主题标签。"),
          demoLog("demo-log-reading-2", projectDate(-11), "合并重复卡片。"),
          demoLog("demo-log-reading-3", projectDate(-3), "完成第一轮卡片清理。")
        ]
      },
      {
        id: "demo-project-newsletter",
        title: "月度通讯试刊",
        description: "完成一份月度通讯试刊，从选题、版式到反馈归档，验证稳定输出的基本流程。",
        symbol: "✉",
        area: "学习与创作",
        status: "已完成",
        progress: 100,
        next: "",
        createdAt: projectDate(-25),
        updatedAt: projectDate(-12),
        completedAt: projectDate(-12),
        completed: true,
        logs: [
          demoLog("demo-log-newsletter-1", projectDate(-20), "完成选题和版式草稿。"),
          demoLog("demo-log-newsletter-2", projectDate(-12), "完成试刊并归档反馈。")
        ]
      },
      {
        id: "demo-project-workflow",
        title: "桌面工作流整理",
        description: "整理桌面、文件夹和快捷入口，减少寻找资料的阻力，建立更稳定的日常工作环境。",
        symbol: "□",
        area: "效率与成长",
        status: "已完成",
        progress: 100,
        next: "",
        createdAt: projectDate(-20),
        updatedAt: projectDate(-4),
        completedAt: projectDate(-4),
        completed: true,
        logs: [
          demoLog("demo-log-workflow-1", projectDate(-17), "清理旧入口并保留常用模板。"),
          demoLog("demo-log-workflow-2", projectDate(-4), "完成桌面、文件夹和快捷入口整理。")
        ]
      }
    ];

    return {
      ...base,
      version: 5,
      goals: [
        { id: "demo-goal-course", title: "完成春季课程策划", area: "学习与创作", progress: 35 },
        { id: "demo-goal-reading", title: "建立稳定的阅读输出节奏", area: "学习与创作", progress: 60 },
        { id: "demo-goal-portfolio", title: "维护作品集首页", area: "产品与空间", progress: 45 },
        { id: "demo-goal-explore", title: "安排一次城市短途探索", area: "生活方式", progress: 20 },
        { id: "demo-goal-review", title: "形成每周复盘习惯", area: "效率与成长", progress: 70 }
      ],
      priorities: [
        { id: "demo-priority-now", label: "现在", text: "完成课程提案开场页", detail: "先做出可讨论的版本，再根据反馈补齐细节。" },
        { id: "demo-priority-next", label: "接下来", text: "整理阅读笔记并分享", detail: "从已有卡片中选出两条，写成简短的主题摘要。" },
        { id: "demo-priority-later", label: "随后", text: "更新作品集信息架构", detail: "完成移动端检查后，再统一入口和页面层级。" }
      ],
      projects,
      routineItems: normalizeRoutineItems(raw?.routineItems),
      milestones: [
        { id: "demo-milestone-1", title: "准备课程提案框架", note: "整理目标、结构和示例，先形成可以讨论的草稿。", done: false, createdAt: projectDate(-10), completedAt: "" },
        { id: "demo-milestone-2", title: "完成作品集首页改版", note: "确认首页层级、移动端排版和入口说明。", done: false, createdAt: projectDate(-9), completedAt: "" },
        { id: "demo-milestone-3", title: "整理季度阅读主题", note: "从现有卡片中合并重复主题并保留可复用摘要。", done: true, createdAt: projectDate(-14), completedAt: projectDate(-6) },
        { id: "demo-milestone-4", title: "确定周末城市路线", note: "保留一条轻量路线，记录交通和预计停留时间。", done: false, createdAt: projectDate(-5), completedAt: "" },
        { id: "demo-milestone-5", title: "完成资料库标签清理", note: "统一标签命名，避免同义标签重复出现。", done: false, createdAt: projectDate(-7), completedAt: "" }
      ],
      events: [
        { id: "demo-event-1", date: today, title: "课程提案内部评审", copy: "整理开场页和待确认问题。" },
        { id: "demo-event-2", date: projectDate(3), title: "作品集移动端自测", copy: "检查首页间距、入口和长文本换行。" },
        { id: "demo-event-3", date: projectDate(8), title: "阅读主题小结", copy: "从本周卡片中选出两条形成摘要。" }
      ],
      days,
      workoutPlanChanges: Array.isArray(raw?.workoutPlanChanges) ? raw.workoutPlanChanges : base.workoutPlanChanges,
      supplementaryTraining: normalizeSupplementaryTraining(raw?.supplementaryTraining),
      weightHistory: [-28, -24, -20, -16, -12, -9, -6, -3, 0].map((offset, index) => ({
        date: addDays(today, offset),
        weight: [68.4, 68.0, 67.8, 67.5, 67.2, 67.0, 66.8, 66.7, 66.6][index]
      })),
      reminders: [],
      focusSeconds: 1500,
      migratedToV2: true,
      nonPersonalDemoDataApplied: true
    };
  }

  function loadState() {
    const base = defaultState();
    try {
      const raw = JSON.parse(localStorage.getItem(STORE) || "null");
      if (!raw || typeof raw !== "object") return buildDemoState(base, null);
      const resettingNonFitnessData = Number(raw.version) < 5 || raw.nonPersonalDemoDataApplied !== true;
      const input = resettingNonFitnessData
        ? buildDemoState(base, raw)
        : raw;
      const merged = {
        ...base,
        ...input,
        version: 5,
        goals: Array.isArray(input.goals) ? input.goals : base.goals,
        priorities: Array.isArray(input.priorities) ? input.priorities : base.priorities,
        projects: Array.isArray(input.projects) ? input.projects : base.projects,
        milestones: Array.isArray(input.milestones) ? input.milestones : base.milestones,
        events: Array.isArray(input.events) ? input.events : [],
        days: input.days && typeof input.days === "object" ? input.days : {},
        workoutPlanChanges: Array.isArray(input.workoutPlanChanges) ? input.workoutPlanChanges : [],
        supplementaryTraining: normalizeSupplementaryTraining(input.supplementaryTraining),
        weightHistory: Array.isArray(input.weightHistory) ? input.weightHistory : [],
        routineItems: normalizeRoutineItems(input.routineItems)
      };
      const workoutChanges = new Map();
      merged.workoutPlanChanges.forEach((change) => {
        if (!change || !/^\d{4}-\d{2}-\d{2}$/.test(change.effectiveFrom || "") || !Number.isInteger(Number(change.weekday)) || !change.plan || !Array.isArray(change.plan.items)) return;
        const normalized = {
          id: change.id || uid("workout-change"),
          effectiveFrom: change.effectiveFrom,
          weekday: Number(change.weekday),
          plan: {
            title: String(change.plan.title || "运动安排"),
            subtitle: String(change.plan.subtitle || ""),
            items: change.plan.items.map((item, index) => [String(item?.[0] ?? index + 1), String(item?.[1] || "运动项目"), String(item?.[2] || "")])
          }
        };
        workoutChanges.set(`${normalized.weekday}:${normalized.effectiveFrom}`, normalized);
      });
      Object.entries(merged.days).forEach(([key, day]) => {
        normalizeDay(day);
        if (day.workoutPlan && Array.isArray(day.workoutPlan.items)) {
          const weekday = fromKey(key).getDay();
          workoutChanges.set(`${weekday}:${key}`, {
            id: uid("workout-change"),
            effectiveFrom: key,
            weekday,
            plan: {
              title: String(day.workoutPlan.title || "运动安排"),
              subtitle: String(day.workoutPlan.subtitle || ""),
              items: day.workoutPlan.items.map((item, index) => [String(item?.[0] ?? index + 1), String(item?.[1] || "运动项目"), String(item?.[2] || "")])
            }
          });
          day.workoutPlan = null;
        }
      });
      merged.workoutPlanChanges = [...workoutChanges.values()].sort((a, b) => a.effectiveFrom.localeCompare(b.effectiveFrom));
      merged.projects.forEach((project) => {
        project.logs = Array.isArray(project.logs) ? project.logs : [];
        project.description = String(project.description || project.next || "项目描述待补充。").trim();
        project.createdAt = isDateKey(project.createdAt) ? project.createdAt : "";
        project.completedAt = isDateKey(project.completedAt) ? project.completedAt : "";
        project.completed = project.completed === true || project.status === "已完成";
      });
      merged.milestones.forEach((item) => {
        item.createdAt = isDateKey(item.createdAt) ? item.createdAt : "";
        item.completedAt = isDateKey(item.completedAt) ? item.completedAt : "";
        item.done = item.done === true;
      });
      merged.priorities = merged.priorities.map((item, index) => ({
        ...(base.priorities[index] || {}),
        ...item
      }));
      if (!resettingNonFitnessData && !raw.migratedToV2 && Array.isArray(raw.reminders)) {
        const day = merged.days[todayKey()] || emptyDay();
        normalizeDay(day);
        raw.reminders.filter((item) => !item.done && item.text).forEach((item) => {
          if (!day.tasks.some((task) => task.text === item.text)) {
            day.tasks.push({ id: uid("task"), text: item.text, done: false, area: "生活" });
          }
        });
        merged.days[todayKey()] = day;
      }
      merged.migratedToV2 = true;
      if (resettingNonFitnessData) localStorage.setItem(STORE, JSON.stringify(merged));
      return merged;
    } catch {
      return base;
    }
  }

  function normalizeDay(day, routineItems = routineData) {
    if (!Array.isArray(day.tasks)) day.tasks = [];
    if (!day.routines || typeof day.routines !== "object") day.routines = emptyDay().routines;
    routineItems.forEach((item) => {
      const id = Array.isArray(item) ? item[0] : item.id;
      if (typeof day.routines[id] !== "boolean") day.routines[id] = false;
    });
    if (typeof day.water !== "number") day.water = Number(day.water) || 0;
    if (typeof day.fitness !== "boolean") day.fitness = false;
    if (!day.workoutPlan || typeof day.workoutPlan !== "object" || !Array.isArray(day.workoutPlan.items)) day.workoutPlan = null;
    ["notes", "mood", "energy", "calories", "food"].forEach((field) => {
      if (day[field] == null) day[field] = "";
    });
    return day;
  }

  let state = loadState();
  let selectedDate = todayKey();
  let selectedFitnessDate = todayKey();
  let monthCursor = fromKey(todayKey());
  monthCursor.setDate(1);
  let fitnessMonthCursor = fromKey(todayKey());
  fitnessMonthCursor.setDate(1);
  let editingGoals = false;
  let editingPriorities = false;
  let editingWorkoutDate = null;
  let editingRoutines = false;
  let editingSupplementaryTraining = false;
  let completedProjectFilter = "全部";

  function ensureDay(key) {
    if (!state.days[key]) state.days[key] = emptyDay();
    return normalizeDay(state.days[key], currentRoutineItems());
  }

  function currentRoutineItems() {
    if (!Array.isArray(state.routineItems) || !state.routineItems.length) state.routineItems = normalizeRoutineItems();
    return state.routineItems;
  }

  function currentSupplementaryTraining() {
    if (!Array.isArray(state.supplementaryTraining) || !state.supplementaryTraining.length) state.supplementaryTraining = normalizeSupplementaryTraining();
    return state.supplementaryTraining;
  }

  function save() {
    localStorage.setItem(STORE, JSON.stringify(state));
  }

  function notify(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove("show"), 1900);
  }

  const scrollbarTimers = new WeakMap();
  document.addEventListener("scroll", (event) => {
    const target = event.target === document ? document.documentElement : event.target;
    if (!target || !target.classList) return;
    target.classList.add("is-scrolling");
    clearTimeout(scrollbarTimers.get(target));
    scrollbarTimers.set(target, setTimeout(() => {
      target.classList.remove("is-scrolling");
      scrollbarTimers.delete(target);
    }, 650));
  }, true);

  function completionFor(key) {
    const tasks = state.days[key]?.tasks || [];
    const done = tasks.filter((task) => task.done).length;
    return { done, total: tasks.length, rate: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
  }

  function overallProgress() {
    if (!state.goals.length) return 0;
    return Math.round(state.goals.reduce((sum, goal) => sum + Math.max(0, Math.min(100, Number(goal.progress) || 0)), 0) / state.goals.length);
  }

  function projectLogsOn(key) {
    return state.projects.flatMap((project) => (project.logs || [])
      .filter((log) => log.date === key)
      .map((log) => ({ project: project.title, text: log.text })));
  }

  function isCompletedProject(project) {
    return project.completed === true || project.status === "已完成";
  }

  function completionDateRange(startAt, endAt, startLabel = "立项") {
    const start = isDateKey(startAt) ? startAt : "";
    const end = isDateKey(endAt) ? endAt : "";
    if (start && end) return `${start}${startLabel}～${end}完成`;
    if (end) return `${end}完成`;
    return start ? `${start}${startLabel}` : "";
  }

  function completedDescriptionMarkup(description) {
    const text = String(description || "").trim();
    if (!text) return "";
    if (text.length <= 96) return `<p class="completed-project-description">${esc(text)}</p>`;
    return `<details class="completed-project-description"><summary>${esc(text.slice(0, 96))}… <span>展开</span></summary><p>${esc(text)}</p></details>`;
  }

  function completedProjectFilterOptions() {
    const areas = state.projects
      .map((project) => String(project.area || "其他").trim())
      .filter(Boolean);
    return ["全部", "工作项目", "长期待办", ...[...new Set(areas)].filter((area) => !["工作项目", "长期待办"].includes(area))];
  }

  function completedItems() {
    const todos = state.milestones.filter((item) => item.done).map((item) => ({
      id: item.id,
      type: "长期待办",
      tags: ["长期待办"],
      title: item.title,
      description: item.note || "",
      completedAt: item.completedAt || "",
      dateRange: completionDateRange(item.createdAt, item.completedAt, "创建")
    }));
    const projects = state.projects.filter(isCompletedProject).map((project) => ({
      id: project.id,
      type: "工作项目",
      tags: ["工作项目", String(project.area || "其他").trim() || "其他"],
      title: project.title,
      description: project.description || "",
      completedAt: project.completedAt || project.updatedAt || "",
      dateRange: completionDateRange(project.createdAt, project.completedAt || project.updatedAt, "立项")
    }));
    return [...todos, ...projects].sort((a, b) => (b.completedAt || "").localeCompare(a.completedAt || ""));
  }

  function weightOn(key) {
    return [...state.weightHistory].reverse().find((entry) => entry.date === key);
  }

  function eventsOn(key) {
    return state.events.filter((event) => event.date === key);
  }

  function hasDayInformation(key) {
    const day = state.days[key];
    if (!day) return eventsOn(key).length > 0 || projectLogsOn(key).length > 0 || Boolean(weightOn(key));
    return day.tasks.length > 0 || Boolean(day.notes || day.mood || day.energy || day.calories || day.food || day.water || day.fitness || day.workoutPlan) ||
      Object.values(day.routines).some(Boolean) || eventsOn(key).length > 0 || projectLogsOn(key).length > 0 || Boolean(weightOn(key));
  }

  function monthTitle(date) {
    return currentLanguage === "en"
      ? `${MONTHS_EN[date.getMonth()]} ${date.getFullYear()}`
      : `${date.getFullYear()}年${date.getMonth() + 1}月`;
  }

  function monthGrid() {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const last = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let index = 0; index < offset; index += 1) cells.push('<div class="cal-day empty"></div>');
    for (let day = 1; day <= last; day += 1) {
      const key = `${year}-${pad(month + 1)}-${pad(day)}`;
      const stats = completionFor(key);
      const marker = stats.rate >= 60 ? "done" : hasDayInformation(key) ? "has" : "";
      const eventMarker = eventsOn(key).length > 0;
      cells.push(`<button class="cal-day ${key === selectedDate ? "selected" : ""} ${key === todayKey() ? "today" : ""} ${eventMarker ? "has-event" : ""}" data-date="${key}" aria-label="${esc(dayText(key))}${eventMarker ? "，有重要日期" : ""}" ${key === selectedDate ? 'aria-pressed="true"' : ""}><span>${day}</span><i class="cal-dot ${marker}"></i></button>`);
    }
    return { title: monthTitle(first), html: cells.join("") };
  }

  function renderCalendars() {
    const grid = monthGrid();
    ["home", "calendar"].forEach((kind) => {
      const month = document.getElementById(kind === "home" ? "homeCalendarMonth" : "calendarMonth");
      const target = document.getElementById(kind === "home" ? "homeCalendarGrid" : "calendarGrid");
      if (month) month.textContent = grid.title;
      if (target) target.innerHTML = grid.html;
    });
    const stats = completionFor(selectedDate);
    const summary = summaryText(selectedDate);
    const homeCaption = document.getElementById("homeCalendarCaption");
    if (homeCaption) homeCaption.innerHTML = calendarCaptionHtml(selectedDate, stats, summary, true);
    const calendarCaption = document.getElementById("calendarCaption");
    if (calendarCaption) calendarCaption.innerHTML = calendarCaptionHtml(selectedDate, stats, summary, false);
  }

  function calendarCaptionHtml(key, stats = completionFor(key), summary = summaryText(key), showSummary = true) {
    const importantCopy = eventsOn(key).map((event) => event.title).filter(Boolean).join("、");
    const important = importantCopy ? `<span class="calendar-important-copy"> · ${esc(importantCopy)}</span>` : "";
    const summaryCopy = showSummary ? `${stats.done}/${stats.total} 项完成 · ${esc(summary)}` : "";
    return `<strong>${esc(dayText(key))}${important}</strong>${summaryCopy}`;
  }

  function summaryText(key) {
    const day = state.days[key];
    const parts = [];
    if (day?.mood) parts.push(`心情 ${day.mood}`);
    if (day?.water) parts.push(`饮水 ${day.water} 杯`);
    if (day?.fitness) parts.push("训练已完成");
    if (projectLogsOn(key).length) parts.push(`${projectLogsOn(key).length} 条项目记录`);
    return parts.join(" · ") || "暂无当天记录";
  }

  function dashboardSummary(key) {
    const day = ensureDay(key);
    const stats = completionFor(key);
    const logs = projectLogsOn(key);
    const projectNames = [...new Set(logs.map((log) => log.project).filter(Boolean))];
    const projectLabel = projectNames.length > 2 ? `${projectNames.slice(0, 2).join("、")}等项目` : `${projectNames.join("、")}项目`;
    const projectPart = projectLabel ? `推进了${projectLabel}` : "暂无项目推进";
    const taskPart = stats.total ? `完成了${stats.done}项待办（共${stats.total}项）` : "今天没有待办事项";
    const plan = planFor(key);
    const weekday = fromKey(key).getDay();
    const workoutPart = TRAINING_WEEKDAYS.includes(weekday)
      ? (day.fitness ? `完成了${plan.title}训练计划` : `${plan.title}训练计划待完成`)
      : `今天是${plan.title}`;
    const routineDone = currentRoutineItems().filter((item) => day.routines[item.id]).length;
    const routinePart = `完成了${routineDone}项日常项目`;
    const extraParts = [];
    if (day.water) extraParts.push(`饮水${day.water}杯`);
    if (day.mood) extraParts.push(`心情${day.mood}`);
    const events = eventsOn(key);
    if (events.length) extraParts.push(`${events.length}个重要日期`);
    const lead = key === todayKey() ? "今天" : dayText(key);
    return `${lead}${projectPart}，${taskPart}，${workoutPart}，${routinePart}${extraParts.length ? `；${extraParts.join("、")}` : ""}。`;
  }

  function renderHome() {
    const score = overallProgress();
    document.getElementById("overallProgress").textContent = `${score}%`;
    document.getElementById("overallRing").style.setProperty("--p", `${score}%`);

    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-`;
    let monthDone = 0;
    let monthTotal = 0;
    Object.entries(state.days).filter(([key]) => key.startsWith(monthPrefix)).forEach(([, day]) => {
      const tasks = (day.tasks || []).filter((task) => ["work", "工作"].includes(task.area));
      monthDone += tasks.filter((task) => task.done).length;
      monthTotal += tasks.length;
    });
    const monthRate = monthTotal ? Math.round((monthDone / monthTotal) * 100) : 0;
    document.getElementById("monthProgress").textContent = `${monthRate}%`;
    document.getElementById("monthRing").style.setProperty("--p", `${monthRate}%`);

    document.getElementById("homeGoals").innerHTML = editingGoals
      ? `<div class="editable-list">${state.goals.map((goal) => `
          <div class="editable-row">
            <div class="goal-edit-grid">
              <label class="field"><span class="sr-only">目标名称</span><input class="inline-input" data-goal-title="${goal.id}" value="${esc(goal.title)}" /></label>
              <label class="field"><span class="sr-only">目标进度</span><input class="inline-input" data-goal-progress="${goal.id}" type="number" min="0" max="100" value="${Number(goal.progress) || 0}" /></label>
              <button class="mini-btn danger" data-action="delete-goal" data-id="${goal.id}" aria-label="删除年度目标 ${esc(goal.title)}">×</button>
            </div>
            <label class="field"><span class="sr-only">目标领域</span><input class="inline-input" data-goal-area="${goal.id}" value="${esc(goal.area || "")}" /></label>
          </div>
        `).join("")}
        <button class="btn secondary goal-add-btn" data-action="add-goal">＋ 添加年度目标</button></div>`
      : `<div class="editable-list">${state.goals.map((goal) => `
          <div class="editable-row">
            <div class="editable-row-top"><div><strong>${esc(goal.title)}</strong><br><small>${esc(goal.area || "")}</small></div><b>${Number(goal.progress) || 0}%</b></div>
            <div class="progress-track"><span style="width:${Math.max(0, Math.min(100, Number(goal.progress) || 0))}%"></span></div>
          </div>
        `).join("")}</div>`;

    document.getElementById("homePriorities").innerHTML = editingPriorities
      ? `<div class="editable-list">${state.priorities.map((item) => `<div class="field"><span>${esc(item.label)}</span><input class="inline-input" data-priority-text="${item.id}" value="${esc(item.text)}" /><textarea class="textarea compact-textarea" data-priority-detail="${item.id}" placeholder="补充目的、背景或下一步">${esc(item.detail || "")}</textarea></div>`).join("")}</div>`
      : `<div class="priority-view">${state.priorities.map((item) => `<div class="priority-item"><small>${esc(item.label)}</small><span>${esc(item.text)}</span><p>${esc(item.detail || "")}</p></div>`).join("")}</div>`;

    // Keep the overview aligned with the same day's reminder data. The overview
    // intentionally hides completed items, while the reminder page keeps them
    // visible so they can be reviewed or unchecked.
    const todayTasks = ensureDay(todayKey()).tasks.filter((task) => !task.done);
    document.getElementById("homeTasks").innerHTML = todayTasks.length
      ? todayTasks.map((task) => `<article class="card home-task"><div class="home-task-head"><span class="tag">${esc(task.area || "生活")}</span><label><input class="check" type="checkbox" data-task-toggle="${task.id}" data-task-date="${todayKey()}" aria-label="完成 ${esc(task.text)}" /> 完成</label></div><input class="inline-input home-task-input" data-task-text="${task.id}" data-task-date="${todayKey()}" value="${esc(task.text)}" aria-label="修改今日事项" /></article>`).join("")
      : '<div class="empty-state">今天没有未完成事项。</div>';
    renderCalendars();
  }

  function addProjectHistory(project, date, text) {
    project.logs = Array.isArray(project.logs) ? project.logs : [];
    project.logs.push({ id: uid("log"), date, text });
    project.updatedAt = date;
  }

  function confirmProjectCompletion(project, reason) {
    return confirm(`项目「${project.title}」${reason}，确认已完成吗？确认后会归档到日历看板的“已完成项目”。`);
  }

  function markProjectCompleted(project) {
    project.completed = true;
    project.completedAt = todayKey();
    project.status = "已完成";
    project.progress = 100;
  }

  function renderProjects() {
    const query = (document.getElementById("globalSearch").value || "").trim().toLowerCase();
    const activeProjects = state.projects.filter((project) => !isCompletedProject(project));
    const list = activeProjects.filter((project) => !query || `${project.title}${project.area}${project.description}${project.next}`.toLowerCase().includes(query));
    const overview = document.getElementById("projectOverview");
    if (overview) {
      overview.innerHTML = activeProjects.length ? activeProjects.map((project) => `
        <div class="project-overview-row">
          <div class="project-overview-meta"><strong>${esc(project.title)}</strong><span>${esc(project.status)} · ${Number(project.progress) || 0}%</span></div>
          <div class="progress-track" role="progressbar" aria-label="${esc(project.title)}进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Number(project.progress) || 0}"><span style="width:${Number(project.progress) || 0}%"></span></div>
        </div>
      `).join("") : '<div class="empty-state">还没有正在推进的项目。</div>';
    }
    document.getElementById("projectList").innerHTML = list.length ? list.map((project) => {
      const logs = [...(project.logs || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      return `
        <article class="card project-card">
          <button class="mini-btn danger project-delete-btn" data-action="delete-project" data-id="${project.id}" aria-label="删除项目 ${esc(project.title)}">×</button>
          <div class="project-head">
            <div class="project-title"><div class="project-symbol">${esc(project.symbol || "•")}</div><div class="project-title-copy"><div class="project-title-line"><span class="tag neutral">工作项目</span><span class="tag neutral">${esc(project.area || "其他")}</span><input class="project-title-input" data-project-title="${project.id}" value="${esc(project.title)}" maxlength="120" aria-label="项目标题" /></div></div></div>
            <div class="project-status-control">
              <select class="select" data-project-status="${project.id}" aria-label="${esc(project.title)}的状态">
                ${["未开始", "待选择", "进行中", "收尾中", "等待回复", "长期维护", "暂缓", "已完成"].map((status) => `<option ${status === project.status ? "selected" : ""}>${status}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="project-progress"><label><span>当前进度</span><b>${Number(project.progress) || 0}%</b></label><input type="range" min="0" max="100" value="${Number(project.progress) || 0}" data-project-progress="${project.id}" aria-label="${esc(project.title)}的进度" /></div>
          <div class="form-grid project-fields">
            <label class="field"><span>所属领域</span><input class="input" data-project-area="${project.id}" value="${esc(project.area || "")}" /></label>
            <label class="field"><span>回顾日期</span><input class="input" type="date" data-project-review="${project.id}" value="${esc(project.reviewDate || "")}" /></label>
            <label class="field wide"><span>项目描述</span><textarea class="textarea" data-project-description="${project.id}" maxlength="260" placeholder="说明项目要解决的问题、目标和范围">${esc(project.description || "")}</textarea></label>
            <label class="field wide"><span>下一步行动</span><textarea class="textarea" data-project-next="${project.id}">${esc(project.next || "")}</textarea></label>
          </div>
          <form class="log-form" data-project-log="${project.id}">
            <input class="input" type="date" data-log-date value="${todayKey()}" aria-label="记录日期" />
            <input class="input" maxlength="240" placeholder="记录一次推进" aria-label="推进记录" required />
            <button class="btn secondary" type="submit">添加记录</button>
          </form>
          <details class="history" open>
            <summary>历史记录（${logs.length}）</summary>
            ${logs.length ? `<div class="history-scroll">${logs.slice(0, 2).map((log) => `<div class="history-item"><time>${esc(log.date || "")}</time><span>${esc(log.text || "")}</span><button class="mini-btn danger" data-action="delete-project-log" data-project="${project.id}" data-id="${log.id}" aria-label="删除这条项目记录">×</button></div>`).join("")}${logs.length > 2 ? `<details class="history-more"><summary>展开更多记录（${logs.length - 2}）</summary><div class="history-more-list">${logs.slice(2).map((log) => `<div class="history-item"><time>${esc(log.date || "")}</time><span>${esc(log.text || "")}</span><button class="mini-btn danger" data-action="delete-project-log" data-project="${project.id}" data-id="${log.id}" aria-label="删除这条项目记录">×</button></div>`).join("")}</div></details>` : ""}</div>` : '<div class="empty-state">还没有推进记录。</div>'}
          </details>
        </article>
      `;
    }).join("") : query ? '<div class="empty-state">没有找到匹配的未完成项目。</div>' : '<div class="empty-state">目前没有正在推进的项目，已完成项目已归档到日历看板。</div>';
  }

  function chartSummary(data) {
    if (!data.length) return "还没有体重记录。";
    if (data.length === 1) return `当前记录为 ${data[0].weight} kg。`;
    const first = Number(data[0].weight);
    const last = Number(data[data.length - 1].weight);
    const change = Math.round((last - first) * 10) / 10;
    return `最近 ${data.length} 次记录从 ${first} kg 到 ${last} kg，变化 ${change > 0 ? "+" : ""}${change} kg。`;
  }

  function renderWeightChart(targetId, limit = 12) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const data = [...state.weightHistory]
      .filter((entry) => entry && entry.date && Number.isFinite(Number(entry.weight)))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-limit);
    if (!data.length) {
      target.innerHTML = '<div class="empty-state" style="margin-bottom:16px">还没有体重记录，记录后会在这里形成折线。</div>';
      return;
    }
    const width = 640;
    const height = 220;
    const left = 38;
    const right = 18;
    const top = 24;
    const bottom = 38;
    const values = data.map((entry) => Number(entry.weight));
    let min = Math.min(...values);
    let max = Math.max(...values);
    if (min === max) { min -= 1; max += 1; }
    const padding = Math.max(0.5, (max - min) * 0.15);
    min -= padding;
    max += padding;
    const x = (index) => data.length === 1 ? width / 2 : left + (index / (data.length - 1)) * (width - left - right);
    const y = (value) => top + ((max - value) / (max - min)) * (height - top - bottom);
    const points = data.map((entry, index) => `${x(index)},${y(Number(entry.weight))}`).join(" ");
    const gridLines = [0, 1, 2, 3].map((index) => {
      const yy = top + (index / 3) * (height - top - bottom);
      return `<line class="chart-grid" x1="${left}" y1="${yy}" x2="${width - right}" y2="${yy}"/>`;
    }).join("");
    const pointNodes = data.map((entry, index) => `
      <g tabindex="0" aria-label="${esc(entry.date)}，${entry.weight} 千克">
        <circle class="chart-point" cx="${x(index)}" cy="${y(Number(entry.weight))}" r="5"><title>${esc(entry.date)} · ${entry.weight} kg</title></circle>
        <text class="chart-value" x="${x(index)}" y="${y(Number(entry.weight)) - 11}" text-anchor="middle">${entry.weight}</text>
        <text class="chart-label" x="${x(index)}" y="${height - 12}" text-anchor="middle">${esc(entry.date.slice(5))}</text>
      </g>
    `).join("");
    target.innerHTML = `
      <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="体重折线图。${esc(chartSummary(data))}">
        ${gridLines}
        ${data.length > 1 ? `<polyline class="chart-line" points="${points}"/>` : ""}
        ${pointNodes}
      </svg>
      <p class="chart-summary">${esc(chartSummary(data))}</p>
      <details><summary class="text-btn">查看数据表</summary><div class="data-table-scroll"><table class="data-table"><thead><tr><th>日期</th><th>体重</th><th><span class="sr-only">操作</span></th></tr></thead><tbody>${data.map((entry) => `<tr><td>${esc(entry.date)}</td><td>${entry.weight} kg</td><td class="data-table-action"><button class="mini-btn danger" data-action="delete-weight" data-weight-date="${esc(entry.date)}" aria-label="删除体重记录 ${esc(entry.date)}">×</button></td></tr>`).join("")}</tbody></table></div></details>
    `;
  }

  function renderHealth() {
    const day = ensureDay(todayKey());
    document.getElementById("healthDateLabel").textContent = dayText(todayKey());
    document.getElementById("moodInput").value = day.mood;
    document.getElementById("energyInput").value = day.energy;
    document.getElementById("calorieInput").value = day.calories;
    document.getElementById("foodInput").value = day.food;
    const water = Math.max(0, Math.min(8, Number(day.water) || 0));
    document.getElementById("waterLabel").textContent = `${water} / 8 杯`;
    document.getElementById("waterMeter").innerHTML = Array.from({ length: 8 }, (_, index) => `<span class="water-cup ${index < water ? "full" : ""}" aria-hidden="true"></span>`).join("");
    renderWeightChart("weightChart");
  }

  function planFor(key) {
    const weekday = fromKey(key).getDay();
    const change = (state.workoutPlanChanges || [])
      .filter((item) => item.weekday === weekday && item.effectiveFrom <= key)
      .sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom))[0];
    return change?.plan || workoutPlans[weekday];
  }

  function workoutEditorMarkup(key, plan) {
    return `
      <form class="workout-editor" data-workout-editor="${key}">
        <div class="workout-edit-meta">
          <label class="field"><span>安排名称</span><input class="inline-input" name="workout-title" maxlength="40" value="${esc(plan.title)}" required /></label>
          <label class="field"><span>简要说明</span><input class="inline-input" name="workout-subtitle" maxlength="80" value="${esc(plan.subtitle)}" /></label>
        </div>
        <div class="workout-edit-list">
          ${plan.items.map(([number, title, detail], index) => `
            <div class="workout-edit-row">
              <span class="workout-edit-index">${esc(number)}</span>
              <label class="field"><span class="sr-only">运动名称</span><input class="inline-input" data-workout-name="${index}" maxlength="60" value="${esc(title)}" placeholder="运动名称" required /></label>
              <label class="field"><span class="sr-only">运动时间或次数</span><input class="inline-input" data-workout-detail="${index}" maxlength="100" value="${esc(detail)}" placeholder="时间或次数" /></label>
            </div>
          `).join("")}
        </div>
        <div class="workout-edit-actions"><button class="btn green" type="submit">保存安排</button><button class="btn secondary" type="button" data-action="cancel-workout-edit">取消</button></div>
        <p class="helper">修改将从 ${esc(dayText(key))} 起，应用于当天及以后所有周${"日一二三四五六"[fromKey(key).getDay()]}；过去日期保持原样。</p>
      </form>
    `;
  }

  function workoutMarkup(key, context) {
    const plan = planFor(key);
    const day = ensureDay(key);
    const editing = editingWorkoutDate === key;
    return `
      <div class="workout-overview${day.fitness ? " is-completed" : ""}">
        ${editing ? workoutEditorMarkup(key, plan) : `
          <div class="subhead"><div><strong>${esc(plan.title)}</strong><p>${esc(plan.subtitle)}</p></div><div class="workout-actions"><button class="edit-btn" data-action="edit-workout" data-workout-date="${key}">编辑</button><button class="btn ${day.fitness ? "green" : "secondary"}" data-action="toggle-workout" data-workout-date="${key}">${day.fitness ? "已完成" : "完成"}</button></div></div>
          <div class="workout-items">${plan.items.map(([number, title, detail]) => `<div class="workout-item"><b>${esc(number)}</b><span>${esc(title)}</span><small>${esc(detail)}</small></div>`).join("")}</div>
        `}
      </div>
    `;
  }

  function routineMarkup(key, context = "fitness") {
    const day = ensureDay(key);
    const items = currentRoutineItems();
    const scrollClass = items.length > 6 ? " routine-list-scroll" : "";
    if (!editingRoutines) {
      return `<div class="routine-list${scrollClass}">${items.map((item) => `
        <label class="routine-row"><input class="check" type="checkbox" data-routine="${esc(item.id)}" data-routine-date="${key}" ${day.routines[item.id] ? "checked" : ""} /><span><strong>${esc(item.title)}</strong><small>${esc(item.detail)}</small></span></label>
      `).join("")}</div>`;
    }
    return `
      <div class="routine-list routine-edit-list${scrollClass}">
        ${items.map((item) => `
          <div class="routine-edit-row">
            <input class="check" type="checkbox" data-routine="${esc(item.id)}" data-routine-date="${key}" ${day.routines[item.id] ? "checked" : ""} aria-label="${esc(`完成${item.title}`)}" />
            <div class="routine-edit-fields">
              <label class="field"><span>项目名称</span><input class="input" data-routine-title="${esc(item.id)}" value="${esc(item.title)}" maxlength="60" required /></label>
              <label class="field"><span>补充说明</span><input class="input" data-routine-detail="${esc(item.id)}" value="${esc(item.detail)}" maxlength="120" /></label>
            </div>
            <button class="mini-btn danger" data-action="delete-routine" data-id="${esc(item.id)}" aria-label="删除日常项目">×</button>
          </div>
        `).join("")}
      </div>
      <form class="form-grid routine-add-form" data-routine-add-form>
        <label class="field"><span>项目名称</span><input class="input" name="routine-title" maxlength="60" placeholder="例如：午间散步" required /></label>
        <label class="field"><span>补充说明</span><input class="input" name="routine-detail" maxlength="120" placeholder="例如：按状态完成 15 分钟" /></label>
        <div class="wide form-row"><button class="btn green" type="submit">添加项目</button></div>
      </form>
    `;
  }

  function supplementaryTrainingPanelMarkup(panel) {
    return `
      <article class="card training-panel">
        <div class="card-head"><div><h3>${esc(panel.title)}</h3><small>${esc(panel.note || "")}</small></div></div>
        <div class="training-row-list">
          ${panel.rows.length ? panel.rows.map((row) => `<div class="training-row"><strong>${esc(row.action || "未命名动作")}</strong><span>${esc(row.frequency || "未设置频次")}</span></div>`).join("") : '<div class="empty-state">还没有动作。</div>'}
        </div>
      </article>
    `;
  }

  function supplementaryTrainingEditorMarkup(panel) {
    return `
      <article class="card training-panel training-panel-editor" data-supplementary-panel="${esc(panel.id)}">
        <div class="card-head"><div><span class="tag neutral">专项训练</span></div></div>
        <div class="form-grid training-panel-editor-fields">
          <label class="field"><span>面板名称</span><input class="input" data-supplementary-title="${esc(panel.id)}" maxlength="50" value="${esc(panel.title)}" required /></label>
          <label class="field"><span>补充说明</span><input class="input" data-supplementary-note="${esc(panel.id)}" maxlength="100" value="${esc(panel.note)}" /></label>
        </div>
        <div class="supplementary-row-editor-list">
          ${panel.rows.length ? panel.rows.map((row) => `
            <div class="supplementary-row-editor">
              <label class="field"><span>动作</span><input class="input" data-supplementary-action="${esc(row.id)}" data-supplementary-panel-id="${esc(panel.id)}" maxlength="80" value="${esc(row.action)}" placeholder="动作名称" /></label>
              <label class="field"><span>频次 / 时长</span><input class="input" data-supplementary-frequency="${esc(row.id)}" data-supplementary-panel-id="${esc(panel.id)}" maxlength="100" value="${esc(row.frequency)}" placeholder="例如：每周 2 次 · 10 分钟" /></label>
              <button class="mini-btn danger supplementary-row-remove" data-action="delete-supplementary-row" data-panel-id="${esc(panel.id)}" data-row-id="${esc(row.id)}" aria-label="删除动作 ${esc(row.action || "未命名动作")}">×</button>
            </div>
          `).join("") : '<div class="empty-state">暂无动作，可先保存面板后再补充。</div>'}
        </div>
        <button class="btn secondary supplementary-add-row" data-action="add-supplementary-row" data-panel-id="${esc(panel.id)}">＋ 添加动作</button>
      </article>
    `;
  }

  function renderFitness() {
    const week = weekKeys(fromKey(selectedFitnessDate));
    const trainingDays = week.filter((key) => TRAINING_WEEKDAYS.includes(fromKey(key).getDay()));
    const completed = trainingDays.filter((key) => state.days[key]?.fitness).length;
    const weekProgress = trainingDays.length ? Math.round((completed / trainingDays.length) * 100) : 0;
    const perfectWeeks = perfectWeekCount();
    const streak = trainingStreak();
    document.getElementById("fitnessWeeklySummary").innerHTML = `
      <div class="fitness-summary-head"><div><h3>本周运动概况</h3><small>${esc(dayText(week[0]))} — ${esc(dayText(week[week.length - 1]))}</small></div><span class="tag ${completed === trainingDays.length ? "green" : ""}">${completed === trainingDays.length ? "本周已完成" : "进行中"}</span></div>
      <div class="fitness-summary-stats">
        <div class="fitness-summary-stat"><span>已完成运动日</span><strong>${completed} 天</strong><small>本周训练记录</small></div>
        <div class="fitness-summary-stat"><span>完美周</span><strong>${perfectWeeks} 周</strong><small>每天完成运动计划</small></div>
        <div class="fitness-summary-stat"><span>本周计划进度</span><strong>${weekProgress}%</strong><small>${completed} / ${trainingDays.length} 个训练日</small></div>
        <div class="fitness-summary-stat"><span>连续完成天数</span><strong>${streak} 天</strong><small>按计划训练日连续计算</small></div>
      </div>
    `;
    renderFitnessCalendar();
    document.getElementById("fitnessDateTitle").textContent = dayText(selectedFitnessDate);
    document.getElementById("fitnessDateHint").textContent = selectedFitnessDate === todayKey() ? "今天" : planFor(selectedFitnessDate).title;
    document.getElementById("fitnessDayPlan").innerHTML = workoutMarkup(selectedFitnessDate, "fitness");
    document.getElementById("fitnessRoutines").innerHTML = routineMarkup(selectedFitnessDate);
    const panels = currentSupplementaryTraining();
    const panelActions = document.getElementById("supplementTrainingSectionActions");
    if (panelActions) {
      panelActions.innerHTML = `${editingSupplementaryTraining ? '<button class="btn green" data-action="add-supplementary-panel">＋ 增加面板</button>' : ""}<button class="text-btn" data-action="toggle-supplementary-edit">${editingSupplementaryTraining ? "完成" : "编辑"}</button>`;
    }
    document.getElementById("supplementTrainingPanels").innerHTML = panels.map((panel) => editingSupplementaryTraining ? supplementaryTrainingEditorMarkup(panel) : supplementaryTrainingPanelMarkup(panel)).join("");
  }

  function renderFitnessCalendar() {
    const year = fitnessMonthCursor.getFullYear();
    const month = fitnessMonthCursor.getMonth();
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const last = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let index = 0; index < offset; index += 1) cells.push('<div class="fitness-cal-day empty"></div>');
    for (let day = 1; day <= last; day += 1) {
      const key = `${year}-${pad(month + 1)}-${pad(day)}`;
      const date = fromKey(key);
      const completed = Boolean(state.days[key]?.fitness);
      const scheduled = TRAINING_WEEKDAYS.includes(date.getDay());
      const eventMarker = eventsOn(key).length > 0;
      cells.push(`<button class="fitness-cal-day ${key === selectedFitnessDate ? "selected" : ""} ${key === todayKey() ? "today" : ""} ${completed ? "completed" : ""} ${eventMarker ? "has-event" : ""}" data-action="select-fitness-date" data-fitness-date="${key}" aria-label="${esc(dayText(key))}${completed ? "，训练已完成" : scheduled ? "，计划训练日" : ""}${eventMarker ? "，有重要日期" : ""}" ${key === selectedFitnessDate ? 'aria-pressed="true"' : ""}><span>${day}</span><i class="fitness-cal-marker" aria-hidden="true">${completed ? "👏" : scheduled ? "·" : ""}</i></button>`);
    }
    document.getElementById("fitnessCalendarMonth").textContent = monthTitle(new Date(year, month, 1));
    document.getElementById("fitnessCalendarGrid").innerHTML = cells.join("");
  }

  function perfectWeekCount() {
    const weekStarts = new Set(
      Object.entries(state.days)
        .filter(([, day]) => day?.fitness)
        .map(([key]) => weekKeys(fromKey(key))[0])
    );
    return [...weekStarts].filter((start) => weekKeys(fromKey(start))
      .filter((key) => TRAINING_WEEKDAYS.includes(fromKey(key).getDay()))
      .every((key) => state.days[key]?.fitness)
    ).length;
  }

  function trainingStreak() {
    let cursor = fromKey(todayKey());
    if (TRAINING_WEEKDAYS.includes(cursor.getDay()) && !state.days[todayKey()]?.fitness) return 0;
    while (!TRAINING_WEEKDAYS.includes(cursor.getDay())) cursor.setDate(cursor.getDate() - 1);
    let count = 0;
    while (TRAINING_WEEKDAYS.includes(cursor.getDay())) {
      const key = keyOf(cursor);
      if (!state.days[key]?.fitness) break;
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
      while (!TRAINING_WEEKDAYS.includes(cursor.getDay())) cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }

  function taskRows(key, context) {
    const day = ensureDay(key);
    if (!day.tasks.length) return '<div class="empty-state">当天还没有待办事项。</div>';
    return day.tasks.map((task) => `
      <div class="todo-row ${task.done ? "done" : ""}">
        <input class="check" type="checkbox" data-task-toggle="${task.id}" data-task-date="${key}" ${task.done ? "checked" : ""} aria-label="切换待办完成状态" />
        <input class="inline-input" data-task-text="${task.id}" data-task-date="${key}" value="${esc(task.text)}" aria-label="修改待办内容" />
        <button class="mini-btn danger" data-action="delete-task" data-id="${task.id}" data-task-date="${key}" aria-label="删除待办">×</button>
      </div>
    `).join("");
  }

  function renderReminders() {
    const stats = completionFor(selectedDate);
    document.getElementById("reminderDateTitle").textContent = dayText(selectedDate);
    document.getElementById("reminderProgress").textContent = `${stats.done} / ${stats.total} 项完成`;
    document.getElementById("reminderList").innerHTML = taskRows(selectedDate, "reminders");
    document.getElementById("notesDateLabel").textContent = dayText(selectedDate);
    document.getElementById("dayNotesInput").value = ensureDay(selectedDate).notes;
  }

  function renderMilestones() {
    const done = state.milestones.filter((item) => item.done).length;
    const pending = state.milestones.filter((item) => !item.done);
    document.getElementById("masterTodoProgress").textContent = `${done} / ${state.milestones.length}`;
    document.getElementById("masterTodoList").innerHTML = pending.length ? pending.map((item) => `
      <div class="master-todo-row">
        <input class="check" type="checkbox" data-master-done="${item.id}" ${item.done ? "checked" : ""} aria-label="切换待办完成状态" />
        <div class="fields">
          <div class="master-todo-title-line"><span class="tag neutral">长期待办</span><input class="inline-input" data-master-title="${item.id}" value="${esc(item.title)}" aria-label="修改待办内容" /></div>
          <input class="inline-input" data-master-note="${item.id}" value="${esc(item.note || "")}" placeholder="补充说明" aria-label="修改补充说明" />
        </div>
        <button class="mini-btn danger" data-action="delete-master-todo" data-id="${item.id}" aria-label="删除待办">×</button>
      </div>
    `).join("") : '<div class="empty-state">没有未完成的长期待办，已完成事项会归档到日历看板。</div>';

    document.getElementById("eventList").innerHTML = state.events.length ? [...state.events].sort((a, b) => a.date.localeCompare(b.date)).map((event) => {
      const date = fromKey(event.date);
      return `<div class="event-row"><div class="event-date"><span><small>${date.getMonth() + 1}月</small>${date.getDate()}</span></div><div><strong>${esc(event.title)}</strong><p>${esc(event.copy || "")}</p></div><button class="mini-btn danger" data-action="delete-event" data-id="${event.id}" aria-label="删除重要日期">×</button></div>`;
    }).join("") : '<div class="empty-state">还没有重要日期。</div>';
  }

  function renderDayDashboard() {
    const day = ensureDay(selectedDate);
    const stats = completionFor(selectedDate);
    const weight = weightOn(selectedDate);
    const logs = projectLogsOn(selectedDate);
    const events = eventsOn(selectedDate);
    const dateHint = selectedDate === todayKey() ? "今天 · 修改会自动保存" : selectedDate < todayKey() ? "历史记录 · 可以补记" : "未来计划 · 可以提前安排";
    document.getElementById("calendarWorkoutPanel").innerHTML = `
      <div class="card-head"><div><h3>运动安排</h3><small>${esc(dayText(selectedDate))} · ${esc(planFor(selectedDate).title)}</small></div></div>
      ${workoutMarkup(selectedDate, "calendar")}
    `;
    document.getElementById("calendarWorkPanel").innerHTML = `
      <div class="card-head"><div><h3>事务工作</h3><small>${esc(dayText(selectedDate))} · ${esc(dateHint)}</small></div><span class="tag">${stats.rate}% 完成</span></div>
      <section class="day-section">
        <div class="subhead"><h4>待办事项</h4><span class="tag neutral">${stats.done} / ${stats.total}</span></div>
        <div class="todo-list">${taskRows(selectedDate, "calendar")}</div>
        <form class="form-row" id="calendarTaskForm" style="margin-top:10px"><label class="sr-only" for="calendarTaskInput">添加当天待办</label><input class="input" id="calendarTaskInput" maxlength="120" placeholder="添加当天待办" required /><button class="btn green" type="submit">添加</button></form>
      </section>
    `;

    document.getElementById("calendarHealthPanel").innerHTML = `
      <div class="card-head"><div><h3>生活健康</h3><small class="calendar-summary-copy">${esc(dashboardSummary(selectedDate))}</small></div></div>
      <section class="day-section health-summary-section">
        <div class="day-summary calendar-health-summary">
          <div class="summary-item"><small>心情</small><strong>${esc(day.mood || "未记录")}</strong></div>
          <div class="summary-item"><small>精力</small><strong>${esc(day.energy || "未记录")}</strong></div>
          <div class="summary-item"><small>饮水</small><strong>${Number(day.water) || 0} 杯</strong></div>
          <div class="summary-item"><small>体重</small><strong>${weight ? `${weight.weight} kg` : "未记录"}</strong></div>
        </div>
      </section>

      <section class="day-section">
        <div class="form-grid health-notes-grid">
          <label class="field wide"><span>饮食简记</span><textarea class="textarea" id="calendarFoodInput" placeholder="记录主要食物和大致份量">${esc(day.food)}</textarea></label>
          <label class="field wide"><span>当天复盘</span><textarea class="textarea" id="calendarNotesInput" placeholder="记录推进情况和明天需要继续的事项">${esc(day.notes)}</textarea></label>
        </div>
        <button class="btn secondary" data-action="save-calendar-notes" style="margin-top:10px">保存当天记录</button>
      </section>
    `;

    document.getElementById("calendarProjectLogPanel").innerHTML = `
      <div class="card-head"><div><h3>项目推进记录</h3><small>${esc(dayText(selectedDate))} · 当天的项目更新</small></div><span class="tag neutral">${logs.length} 条</span></div>
      ${logs.length ? `<div class="calendar-project-log-list">${logs.map((log) => `<div class="history-item"><time>${esc(log.project)}</time><span>${esc(log.text)}</span><span></span></div>`).join("")}</div>` : '<div class="empty-state">当天没有项目推进记录。</div>'}
    `;

    document.getElementById("calendarEventPanel").innerHTML = `
      <div class="card-head"><div><h3>重要日期</h3><small>${esc(dayText(selectedDate))} · 需要提前准备或按时跟进</small></div><span class="tag neutral">${events.length} 项</span></div>
      ${events.length ? events.map((event) => `<div class="event-row"><div class="event-date"><span><small>当天</small>${fromKey(event.date).getDate()}</span></div><div><strong>${esc(event.title)}</strong><p>${esc(event.copy || "")}</p></div></div>`).join("") : '<div class="empty-state">当天没有重要日期。</div>'}
    `;

    const completed = completedItems();
    const filterOptions = completedProjectFilterOptions();
    if (!filterOptions.includes(completedProjectFilter)) completedProjectFilter = "全部";
    const filteredCompleted = completedProjectFilter === "全部"
      ? completed
      : completed.filter((item) => item.tags.includes(completedProjectFilter));
    document.getElementById("calendarCompletedPanel").innerHTML = `
      <div class="card-head completed-project-card-head"><div><h3>已完成项目</h3><small>完成的长期待办和工作项目会归档到这里 · 工作项目显示立项到完成的日期范围</small></div><div class="completed-project-tools"><label class="completed-project-filter"><span>筛选标签</span><select class="select" id="completedProjectFilter">${filterOptions.map((option) => `<option value="${esc(option)}" ${option === completedProjectFilter ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></label><span class="tag neutral">${completedProjectFilter === "全部" ? completed.length : `${filteredCompleted.length} / ${completed.length}`} 项</span></div></div>
      ${filteredCompleted.length ? `<div class="completed-project-list">${filteredCompleted.map((item) => `<div class="completed-project-row"><div><div class="completed-project-title">${item.tags.map((tag) => `<span class="tag neutral">${esc(tag)}</span>`).join("")}<strong>${esc(item.title)}</strong></div>${completedDescriptionMarkup(item.description)}</div>${item.dateRange ? `<time class="completed-project-range">${esc(item.dateRange)}</time>` : ""}</div>`).join("")}</div>` : `<div class="empty-state">${completed.length ? "该标签下还没有已完成项目。" : "还没有已完成项目。"}</div>`}
    `;
  }

  function renderCalendar() {
    renderCalendars();
    renderDayDashboard();
  }

  function renderAll() {
    renderHome();
    renderProjects();
    renderHealth();
    renderFitness();
    renderReminders();
    renderMilestones();
    renderCalendar();
  }

  function switchPage(page, updateHash = true) {
    const requested = page === "milestones" ? "reminders" : page;
    const valid = pageNames[requested] ? requested : "home";
    document.querySelectorAll("[data-screen]").forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === valid));
    document.querySelectorAll("[data-page]").forEach((link) => {
      const active = link.dataset.page === valid;
      link.classList.toggle("active", active);
      if (link.matches("a")) {
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      }
    });
    document.getElementById("pageCrumb").textContent = pageNames[valid];
    if (updateHash && location.hash !== `#${valid}`) history.pushState(null, "", `#${valid}`);
    if (valid === "home") renderHome();
    if (valid === "calendar") renderCalendar();
    if (valid === "work") renderProjects();
    if (valid === "fitness") renderFitness();
    window.scrollTo(0, 0);
  }

  function updateSelectedDate(key) {
    selectedDate = key;
    const date = fromKey(key);
    monthCursor = new Date(date.getFullYear(), date.getMonth(), 1);
    renderHome();
    renderReminders();
    renderCalendar();
  }

  function setWeight(date, value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric <= 0) return false;
    const existing = state.weightHistory.find((entry) => entry.date === date);
    if (existing) existing.weight = numeric;
    else state.weightHistory.push({ date, weight: numeric });
    state.weightHistory = state.weightHistory.sort((a, b) => a.date.localeCompare(b.date)).slice(-90);
    return true;
  }

  document.addEventListener("click", (event) => {
    const pageLink = event.target.closest("[data-page]");
    if (pageLink) {
      event.preventDefault();
      switchPage(pageLink.dataset.page);
      return;
    }

    const dateButton = event.target.closest("[data-date]");
    if (dateButton) {
      updateSelectedDate(dateButton.dataset.date);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    const id = actionButton.dataset.id;

    if (action === "toggle-goal-edit") {
      editingGoals = !editingGoals;
      actionButton.textContent = editingGoals ? "完成" : "编辑";
      renderHome();
    }
    if (action === "add-goal") {
      const goal = { id: uid("goal"), title: "新年度目标", area: "未分类", progress: 0 };
      state.goals.push(goal);
      save();
      renderHome();
      requestAnimationFrame(() => {
        const input = document.querySelector(`[data-goal-title="${goal.id}"]`);
        input?.focus();
        input?.select();
      });
      return;
    }
    if (action === "delete-goal") {
      const goal = state.goals.find((item) => item.id === id);
      if (!goal || !window.confirm(`删除年度目标“${goal.title}”吗？`)) return;
      state.goals = state.goals.filter((item) => item.id !== id);
      save();
      renderHome();
      return;
    }
    if (action === "toggle-priority-edit") {
      editingPriorities = !editingPriorities;
      actionButton.textContent = editingPriorities ? "完成" : "编辑";
      renderHome();
    }
    if (action === "home-prev-month" || action === "prev-month") {
      monthCursor.setMonth(monthCursor.getMonth() - 1);
      renderCalendars();
    }
    if (action === "home-next-month" || action === "next-month") {
      monthCursor.setMonth(monthCursor.getMonth() + 1);
      renderCalendars();
    }
    if (action === "today") updateSelectedDate(todayKey());
    if (action === "fitness-prev-day") {
      selectedFitnessDate = addDays(selectedFitnessDate, -1);
      const date = fromKey(selectedFitnessDate);
      fitnessMonthCursor = new Date(date.getFullYear(), date.getMonth(), 1);
      renderFitness();
    }
    if (action === "fitness-next-day") {
      selectedFitnessDate = addDays(selectedFitnessDate, 1);
      const date = fromKey(selectedFitnessDate);
      fitnessMonthCursor = new Date(date.getFullYear(), date.getMonth(), 1);
      renderFitness();
    }
    if (action === "fitness-prev-month") {
      fitnessMonthCursor.setMonth(fitnessMonthCursor.getMonth() - 1);
      renderFitnessCalendar();
      return;
    }
    if (action === "fitness-next-month") {
      fitnessMonthCursor.setMonth(fitnessMonthCursor.getMonth() + 1);
      renderFitnessCalendar();
      return;
    }
    if (action === "fitness-calendar-today") {
      selectedFitnessDate = todayKey();
      fitnessMonthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      renderFitness();
      return;
    }
    if (action === "select-fitness-date") {
      selectedFitnessDate = actionButton.dataset.fitnessDate;
      const date = fromKey(selectedFitnessDate);
      fitnessMonthCursor = new Date(date.getFullYear(), date.getMonth(), 1);
      renderFitness();
      return;
    }
    if (action === "edit-workout") {
      editingWorkoutDate = actionButton.dataset.workoutDate;
      renderFitness();
      renderCalendar();
      requestAnimationFrame(() => document.querySelector('.v2-screen.active [data-workout-editor] input')?.focus());
      return;
    }
    if (action === "cancel-workout-edit") {
      editingWorkoutDate = null;
      renderFitness();
      renderCalendar();
      return;
    }
    if (action === "toggle-routine-edit") {
      editingRoutines = !editingRoutines;
      renderFitness();
      return;
    }
    if (action === "toggle-supplementary-edit") {
      editingSupplementaryTraining = !editingSupplementaryTraining;
      renderFitness();
      return;
    }
    if (action === "add-supplementary-panel") {
      const panel = {
        id: uid("supplementary-panel"),
        title: "新专项训练",
        note: "",
        rows: [{ id: uid("supplementary-row"), action: "", frequency: "" }]
      };
      currentSupplementaryTraining().push(panel);
      editingSupplementaryTraining = true;
      save();
      renderFitness();
      requestAnimationFrame(() => {
        const input = document.querySelector(`[data-supplementary-title="${panel.id}"]`);
        input?.focus();
        input?.select();
      });
      return;
    }
    if (action === "add-supplementary-row") {
      const panel = currentSupplementaryTraining().find((item) => item.id === actionButton.dataset.panelId);
      if (!panel) return;
      const row = { id: uid("supplementary-row"), action: "", frequency: "" };
      panel.rows.push(row);
      editingSupplementaryTraining = true;
      save();
      renderFitness();
      requestAnimationFrame(() => document.querySelector(`[data-supplementary-action="${row.id}"]`)?.focus());
      return;
    }
    if (action === "delete-supplementary-row") {
      const panels = currentSupplementaryTraining();
      const panel = panels.find((item) => item.id === actionButton.dataset.panelId);
      const row = panel?.rows.find((item) => item.id === actionButton.dataset.rowId);
      if (!panel || !row || !confirm(`删除动作“${row.action || "未命名动作"}”吗？`)) return;
      panel.rows = panel.rows.filter((item) => item.id !== row.id);
      save();
      renderFitness();
      notify("已删除专项训练动作");
      return;
    }
    if (action === "delete-routine") {
      const items = currentRoutineItems();
      if (items.length <= 1) {
        notify("至少保留一个日常项目");
        return;
      }
      const item = items.find((routine) => routine.id === id);
      if (!item || !confirm(`删除日常项目“${item.title}”吗？`)) return;
      state.routineItems = items.filter((routine) => routine.id !== id);
      save();
      renderFitness();
      renderHome();
      renderCalendar();
      notify("已删除日常项目");
      return;
    }
    if (action === "reminder-prev-day") {
      updateSelectedDate(addDays(selectedDate, -1));
    }
    if (action === "reminder-next-day") {
      updateSelectedDate(addDays(selectedDate, 1));
    }
    if (action === "toggle-workout") {
      const key = actionButton.dataset.workoutDate;
      const day = ensureDay(key);
      day.fitness = !day.fitness;
      save();
      renderFitness();
      renderCalendar();
      renderHome();
      notify(day.fitness ? "已记录训练完成" : "已取消训练完成");
    }
    if (action === "complete-home-task") {
      const task = ensureDay(todayKey()).tasks.find((item) => item.id === id);
      if (task) {
        task.done = true;
        save();
        renderHome();
        renderReminders();
        renderCalendar();
        notify("已完成一项待办");
      }
    }
    if (action === "delete-task") {
      if (!confirm("删除这条待办吗？")) return;
      const key = actionButton.dataset.taskDate;
      ensureDay(key).tasks = ensureDay(key).tasks.filter((task) => task.id !== id);
      save();
      renderHome();
      renderReminders();
      renderCalendar();
    }
    if (action === "add-project") {
      const title = prompt("项目名称");
      if (title?.trim()) {
        state.projects.unshift({ id: uid("project"), title: title.trim(), description: "", symbol: "•", area: "其他", status: "未开始", progress: 0, next: "", logs: [], createdAt: todayKey(), completed: false });
        save();
        renderProjects();
        renderHome();
      }
    }
    if (action === "delete-project") {
      if (!confirm("删除这个项目及其历史记录吗？")) return;
      state.projects = state.projects.filter((project) => project.id !== id);
      save();
      renderProjects();
      renderHome();
      renderCalendar();
    }
    if (action === "delete-project-log") {
      if (!confirm("删除这条推进记录吗？")) return;
      const project = state.projects.find((item) => item.id === actionButton.dataset.project);
      if (project) {
        project.logs = project.logs.filter((log) => log.id !== id);
        save();
        renderProjects();
        renderCalendar();
      }
    }
    if (action === "delete-weight") {
      const date = actionButton.dataset.weightDate;
      const entry = state.weightHistory.find((item) => item.date === date);
      if (!entry || !confirm(`删除 ${date} 的体重记录吗？`)) return;
      state.weightHistory = state.weightHistory.filter((item) => item.date !== date);
      save();
      renderHealth();
      renderCalendar();
      renderHome();
      notify("已删除体重记录");
      return;
    }
    if (action === "delete-master-todo") {
      if (!confirm("删除这条待办事项吗？")) return;
      state.milestones = state.milestones.filter((item) => item.id !== id);
      save();
      renderMilestones();
      renderCalendar();
      renderHome();
    }
    if (action === "toggle-event-form") {
      const form = document.getElementById("eventForm");
      form.hidden = !form.hidden;
      if (!form.hidden) {
        document.getElementById("eventDateInput").value = selectedDate;
        document.getElementById("eventTitleInput").focus();
      }
    }
    if (action === "delete-event") {
      if (!confirm("删除这个重要日期吗？")) return;
      state.events = state.events.filter((item) => item.id !== id);
      save();
      renderMilestones();
      renderCalendar();
      renderHome();
    }
    if (action === "water-plus" || action === "water-minus") {
      const day = ensureDay(todayKey());
      day.water = Math.max(0, Math.min(8, day.water + (action === "water-plus" ? 1 : -1)));
      save();
      renderHealth();
      renderCalendar();
      renderHome();
    }
    if (action === "save-health") {
      const day = ensureDay(todayKey());
      day.mood = document.getElementById("moodInput").value;
      day.energy = document.getElementById("energyInput").value;
      day.calories = document.getElementById("calorieInput").value;
      save();
      renderCalendar();
      renderHome();
      notify("今日状态已保存");
    }
    if (action === "save-food") {
      ensureDay(todayKey()).food = document.getElementById("foodInput").value;
      save();
      renderCalendar();
      renderHome();
      notify("饮食记录已保存");
    }
    if (action === "save-day-notes") {
      ensureDay(selectedDate).notes = document.getElementById("dayNotesInput").value;
      save();
      renderHome();
      renderCalendar();
      notify("当天记录已保存");
    }
    if (action === "save-calendar-notes") {
      const day = ensureDay(selectedDate);
      day.food = document.getElementById("calendarFoodInput").value;
      day.notes = document.getElementById("calendarNotesInput").value;
      save();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("当天记录已保存");
    }
    if (action === "export") {
      const blob = new Blob([JSON.stringify({ app: "kinetic-life-os", exportedAt: new Date().toISOString(), data: state }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `life-workbench-backup-${todayKey()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      notify("备份已导出");
    }
    if (action === "reset") {
      if (!confirm("确定清除当前设备的全部工作台记录吗？此操作无法撤销。")) return;
      localStorage.removeItem(STORE);
      location.reload();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("[data-task-toggle]")) {
      const task = ensureDay(target.dataset.taskDate).tasks.find((item) => item.id === target.dataset.taskToggle);
      if (task) task.done = target.checked;
      save();
      renderHome();
      renderReminders();
      renderCalendar();
    }
    if (target.matches("[data-routine]")) {
      ensureDay(target.dataset.routineDate).routines[target.dataset.routine] = target.checked;
      save();
      renderFitness();
      renderCalendar();
      renderHome();
    }
    if (target.matches("[data-master-done]")) {
      const item = state.milestones.find((todo) => todo.id === target.dataset.masterDone);
      if (item) {
        item.done = target.checked;
        item.completedAt = target.checked ? todayKey() : "";
      }
      save();
      renderMilestones();
      renderCalendar();
      renderHome();
    }
    if (target.matches("[data-project-status]")) {
      const project = state.projects.find((item) => item.id === target.dataset.projectStatus);
      if (project && project.status !== target.value) {
        const nextStatus = target.value;
        if (nextStatus === "已完成" && !isCompletedProject(project)) {
          if (!confirmProjectCompletion(project, "的状态已改为“已完成”")) {
            renderProjects();
            return;
          }
          markProjectCompleted(project);
        } else if (nextStatus !== "已完成") {
          project.completed = false;
          project.completedAt = "";
        }
        project.status = nextStatus;
        addProjectHistory(project, todayKey(), `状态更新为「${nextStatus}」`);
        save();
        renderProjects();
        renderHome();
        renderCalendar();
      }
    }
    if (target.matches("[data-project-progress]")) {
      const project = state.projects.find((item) => item.id === target.dataset.projectProgress);
      const progress = Number(target.value) || 0;
      if (project && Number(project.progress) !== progress) {
        if (progress === 100 && !isCompletedProject(project)) {
          if (!confirmProjectCompletion(project, "的完成度已达到 100%")) {
            renderProjects();
            return;
          }
          markProjectCompleted(project);
        } else if (progress < 100 && project.completed) {
          project.completed = false;
          project.completedAt = "";
          if (project.status === "已完成") project.status = "进行中";
        }
        project.progress = progress;
        addProjectHistory(project, todayKey(), `进度更新为 ${progress}%`);
        save();
        renderProjects();
        renderHome();
        renderCalendar();
      }
    }
    if (target.matches("[data-project-review]")) {
      const project = state.projects.find((item) => item.id === target.dataset.projectReview);
      if (project) project.reviewDate = target.value;
      save();
    }
    if (target.matches("[data-project-area]")) {
      renderProjects();
      renderHome();
      renderCalendar();
    }
    if (target.matches("[data-master-title], [data-master-note]")) {
      renderMilestones();
      renderCalendar();
    }
    if (target.matches("[data-project-description]")) {
      renderCalendar();
    }
    if (target.matches("#completedProjectFilter")) {
      completedProjectFilter = target.value;
      renderCalendar();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("[data-goal-title], [data-goal-progress], [data-goal-area]")) {
      const id = target.dataset.goalTitle || target.dataset.goalProgress || target.dataset.goalArea;
      const goal = state.goals.find((item) => item.id === id);
      if (goal) {
        if (target.dataset.goalTitle) goal.title = target.value;
        if (target.dataset.goalProgress) goal.progress = Math.max(0, Math.min(100, Number(target.value) || 0));
        if (target.dataset.goalArea) goal.area = target.value;
        save();
        const score = overallProgress();
        document.getElementById("overallProgress").textContent = `${score}%`;
        document.getElementById("overallRing").style.setProperty("--p", `${score}%`);
      }
    }
    if (target.matches("[data-priority-text], [data-priority-detail]")) {
      const id = target.dataset.priorityText || target.dataset.priorityDetail;
      const item = state.priorities.find((priority) => priority.id === id);
      if (item) {
        if (target.dataset.priorityText) item.text = target.value;
        if (target.dataset.priorityDetail) item.detail = target.value;
      }
      save();
    }
    if (target.matches("[data-task-text]")) {
      const task = ensureDay(target.dataset.taskDate).tasks.find((item) => item.id === target.dataset.taskText);
      if (task) task.text = target.value;
      save();
    }
    if (target.matches("[data-master-title], [data-master-note]")) {
      const id = target.dataset.masterTitle || target.dataset.masterNote;
      const item = state.milestones.find((todo) => todo.id === id);
      if (item) {
        if (target.dataset.masterTitle) item.title = target.value;
        if (target.dataset.masterNote) item.note = target.value;
      }
      save();
    }
    if (target.matches("[data-routine-title], [data-routine-detail]")) {
      const id = target.dataset.routineTitle || target.dataset.routineDetail;
      const item = currentRoutineItems().find((routine) => routine.id === id);
      if (item) {
        if (target.dataset.routineTitle) item.title = target.value;
        if (target.dataset.routineDetail) item.detail = target.value;
        state.routineItems = currentRoutineItems();
      }
      save();
    }
    if (target.matches("[data-supplementary-title], [data-supplementary-note], [data-supplementary-action], [data-supplementary-frequency]")) {
      const panels = currentSupplementaryTraining();
      const panelId = target.dataset.supplementaryTitle || target.dataset.supplementaryNote || target.dataset.supplementaryPanelId;
      const panel = panels.find((item) => item.id === panelId);
      if (panel) {
        if (target.dataset.supplementaryTitle) panel.title = target.value.trim() || "新专项训练";
        if (target.dataset.supplementaryNote) panel.note = target.value;
        if (target.dataset.supplementaryAction || target.dataset.supplementaryFrequency) {
          const rowId = target.dataset.supplementaryAction || target.dataset.supplementaryFrequency;
          const row = panel.rows.find((item) => item.id === rowId);
          if (row) {
            if (target.dataset.supplementaryAction) row.action = target.value;
            if (target.dataset.supplementaryFrequency) row.frequency = target.value;
          }
        }
      }
      save();
    }
    if (target.matches("[data-project-area], [data-project-description], [data-project-next]")) {
      const id = target.dataset.projectArea || target.dataset.projectDescription || target.dataset.projectNext;
      const project = state.projects.find((item) => item.id === id);
      if (project) {
        if (target.dataset.projectArea) project.area = target.value;
        if (target.dataset.projectDescription) project.description = target.value;
        if (target.dataset.projectNext) project.next = target.value;
      }
      save();
    }
    if (target.matches("[data-project-title]")) {
      const project = state.projects.find((item) => item.id === target.dataset.projectTitle);
      if (project) {
        project.title = target.value;
        save();
        renderHome();
        renderCalendar();
      }
    }
  });

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.matches("[data-workout-editor]")) {
      const key = form.dataset.workoutEditor;
      const current = planFor(key);
      const title = form.elements["workout-title"].value.trim();
      const subtitle = form.elements["workout-subtitle"].value.trim();
      const items = current.items.map((item, index) => [
        item[0],
        form.querySelector(`[data-workout-name="${index}"]`).value.trim(),
        form.querySelector(`[data-workout-detail="${index}"]`).value.trim()
      ]);
      const weekday = fromKey(key).getDay();
      state.workoutPlanChanges = (state.workoutPlanChanges || []).filter((change) => change.weekday !== weekday || change.effectiveFrom < key);
      state.workoutPlanChanges.push({ id: uid("workout-change"), effectiveFrom: key, weekday, plan: { title, subtitle, items } });
      ensureDay(key).workoutPlan = null;
      editingWorkoutDate = null;
      save();
      renderFitness();
      renderCalendar();
      renderHome();
      notify("已更新当天及未来同星期的运动安排");
      return;
    }
    if (form.matches("[data-routine-add-form]")) {
      const title = form.elements["routine-title"].value.trim();
      const detail = form.elements["routine-detail"].value.trim();
      if (title) state.routineItems = [...currentRoutineItems(), { id: uid("routine"), title, detail }];
      form.reset();
      save();
      renderFitness();
      renderHome();
      renderCalendar();
      notify("已添加日常项目");
      return;
    }
    if (form.id === "reminderForm") {
      const input = document.getElementById("reminderInput");
      if (input.value.trim()) ensureDay(selectedDate).tasks.push({ id: uid("task"), text: input.value.trim(), done: false, area: "生活" });
      input.value = "";
      save();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("已添加待办");
    }
    if (form.id === "calendarTaskForm") {
      const input = document.getElementById("calendarTaskInput");
      if (input.value.trim()) ensureDay(selectedDate).tasks.push({ id: uid("task"), text: input.value.trim(), done: false, area: "生活" });
      save();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("已添加当天待办");
    }
    if (form.matches("[data-project-log]")) {
      const project = state.projects.find((item) => item.id === form.dataset.projectLog);
      const date = form.querySelector("[data-log-date]").value || todayKey();
      const input = form.querySelector('input:not([type="date"])');
      if (project && input.value.trim()) {
        addProjectHistory(project, date, input.value.trim());
        input.value = "";
        save();
        renderProjects();
        renderHome();
        renderCalendar();
        notify("项目记录已保存");
      }
    }
    if (form.id === "weightForm") {
      const input = document.getElementById("weightInput");
      if (setWeight(todayKey(), input.value)) {
        input.value = "";
        save();
        renderHealth();
        renderCalendar();
        renderHome();
        notify("今日体重已记录");
      }
    }
    if (form.id === "masterTodoForm") {
      const title = document.getElementById("masterTodoTitle");
      const note = document.getElementById("masterTodoNote");
      if (title.value.trim()) state.milestones.push({ id: uid("todo"), title: title.value.trim(), note: note.value.trim(), done: false, createdAt: todayKey(), completedAt: "" });
      form.reset();
      save();
      renderMilestones();
      notify("已添加待办事项");
    }
    if (form.id === "eventForm") {
      const date = document.getElementById("eventDateInput").value;
      const title = document.getElementById("eventTitleInput").value.trim();
      const copy = document.getElementById("eventCopyInput").value.trim();
      if (date && title) state.events.push({ id: uid("event"), date, title, copy });
      form.reset();
      form.hidden = true;
      save();
      renderMilestones();
      renderCalendar();
      renderHome();
      notify("重要日期已保存");
    }
  });

  document.getElementById("globalSearch").addEventListener("input", () => {
    if (location.hash !== "#work") switchPage("work");
    renderProjects();
  });

  document.getElementById("languageToggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    localStorage.setItem(LANGUAGE_STORE, currentLanguage);
    renderAll();
    switchPage(location.hash.slice(1) || "home", false);
    applyLanguage();
  });

  document.getElementById("importInput").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 2e6) {
      alert("备份文件过大，无法导入。");
      return;
    }
    try {
      const parsed = JSON.parse(await file.text());
      const data = parsed.data || parsed;
      if (!data || typeof data !== "object" || !Array.isArray(data.projects) || !Array.isArray(data.goals) || !data.days) throw new Error("bad");
      if (!confirm("导入会替换当前设备的工作台记录，是否继续？")) return;
      localStorage.setItem(STORE, JSON.stringify(data));
      state = loadState();
      save();
      renderAll();
      notify("备份已恢复");
    } catch {
      alert("无法识别这个备份文件，请选择由本工作台导出的 JSON 文件。");
    }
  });

  window.addEventListener("popstate", () => switchPage(location.hash.slice(1), false));
  save();
  renderAll();
  switchPage(location.hash.slice(1) || "home", false);
  applyLanguage();
})();
