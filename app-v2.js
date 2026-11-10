(() => {
  "use strict";

  const STORE = "serene-personal-workspace-v1";
  const RESET_MARKER = `${STORE}:cleared`;
  const DEVICE_STORE = "kinetic-life-os:device";
  const RECOVERY_STORE = "kinetic-life-os:before-import";
  const APP_VERSION = "v1.6.0";
  const BACKUP_PREFERENCES_STORE = "kinetic-life-os:auto-backup";
  const BACKUP_DATABASE = "kinetic-life-os-backup-handles";
  const BACKUP_INTERVALS = ["daily", "weekly", "monthly"];
  const LANGUAGE_STORE = "kinetic-life-os:language";
  const SIDEBAR_COLLAPSED_STORE = "kinetic-life-os:sidebar-collapsed";
  let currentLanguage = localStorage.getItem(LANGUAGE_STORE) === "en" ? "en" : "zh";
  let sidebarCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_STORE) === "true";
  const pageScrollPositions = new Map();
  let activePage = "home";
  let internalHistoryDepth = 0;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const MONTHS_SHORT_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const PROJECT_STATUSES = [
    ["未开始", "Not started"],
    ["进行中", "In progress"],
    ["收尾中", "Wrapping up"],
    ["等待回复", "Awaiting reply"],
    ["长期维护", "Long-term"],
    ["暂缓", "Paused"],
    ["已完成", "Completed"]
  ];
  const PROJECT_STATUS_ALIASES = {
    ...Object.fromEntries(PROJECT_STATUSES.flatMap(([zh, en]) => [[zh, zh], [en, zh]])),
    "待选择": "未开始",
    "To decide": "未开始"
  };
  const SEARCH_TYPES = {
    project: ["项目", "Project"],
    "project-record": ["项目历史", "Project history"],
    goal: ["年度目标", "Annual goal"],
    priority: ["近期重点", "Current priority"],
    task: ["每日待办", "Daily task"],
    milestone: ["长期待办", "Long-term task"],
    event: ["重要日期", "Important date"],
    inspiration: ["灵感记录", "Inspiration"],
    health: ["健康与日常记录", "Health & daily records"],
    routine: ["日常项目", "Daily routine"],
    workout: ["运动安排", "Workout plan"],
    training: ["专项训练", "Supplementary training"],
    breeze: ["微风指南", "Breeze guide"],
    area: ["领域标签", "Project area"]
  };
  const TRANSLATIONS = {
    "跳到主要内容": "Skip to main content",
    "总览": "Overview",
    "工作计划": "Work planning",
    "本月已完成待办": "Tasks completed this month",
    "本年已完成项目": "Projects completed this year",
    "完成概览": "Completion overview",
    "工作、待办和年度目标的当前状态": "Current status of work, tasks, and annual goals",
    "由关联项目综合计算": "Calculated from linked projects",
    "未关联年度目标": "No annual goal",
    "年度目标": "Annual goal",
    "年度目标列表": "Annual goals list",
    "目标名称": "Goal title",
    "目标进度": "Goal progress",
    "目标领域": "Goal area",
    "查看今日灵感": "View today's inspiration",
    "返回近期重点": "Return to current focus",
    "修改今日事项": "Edit today's task",
    "修改补充说明": "Edit additional notes",
    "删除重要日期": "Delete important date",
    "重复": "Repeat",
    "不重复": "Does not repeat",
    "每周": "Weekly",
    "每月": "Monthly",
    "每年": "Yearly",
    "上一个记录日": "Previous recorded day",
    "下一个记录日": "Next recorded day",
    "删除项目全部记录": "Delete all records for this project",
    "编辑重要日期": "Edit important date",
    "更新重要日期": "Update important date",
    "点击日期编辑": "Click the date to edit",
    "健康管理": "Health",
    "健身计划": "Fitness plan",
    "日常提醒": "Daily reminders",
    "日历看板": "Dashboard",
    "行则将至": "Footprints",
    "微风指南": "Breeze guide",
    "新增微风指南": "Add breeze guide",
    "微风指南，可用鼠标滚轮切换": "Breeze guide; use the mouse wheel to switch entries",
    "微风指南内容": "Breeze guide entry",
    "写下一句想留给自己的话": "Write a line to keep with you",
    "灵感轨迹": "Inspiration trail",
    "设置与备份": "Settings & backup",
    "主导航": "Main navigation",
    "移动端导航": "Mobile navigation",
    "个人工作台": "Personal Workbench",
    "本地版": "Local edition",
    "本地保存": "Local storage",
    "修改会自动保存在当前浏览器": "Changes are saved in this browser automatically",
    "搜索项目": "Search projects",
    "搜索项目…": "Search projects…",
    "选择备份文件": "Choose a backup file",
    "切换待办完成状态": "Toggle task completion",
    "修改待办内容": "Edit task",
    "删除待办": "Delete task",
    "项目": "Projects",
    "项目标题": "Project title",
    "上个月": "Previous month",
    "下个月": "Next month",
    "回到今天": "Today",
    "今": "Today",
    "前一天": "Previous day",
    "后一天": "Next day",
    "顺延到明天": "Move to tomorrow",
    "切换语言": "Switch language",
    "返回": "Back",
    "返回上一页": "Go back",
    "生活总览": "Life overview",
    "近期重点": "Current focus",
    "当前阶段的行动、目的与下一步": "Current actions, purpose, and next steps",
    "灵感": "Inspiration",
    "记录灵感": "Log inspiration",
    "重点": "Focus",
    "今日灵感": "Today's inspiration",
    "与日常提醒同步，可记录今天捕捉到的片段": "Synced with daily reminders; capture today's fragments",
    "记录今天捕捉到的灵感、片段或想继续观察的方向": "Capture an idea, fragment, or direction to keep exploring today",
    "保存今日灵感": "Save today's inspiration",
    "今日灵感已保存": "Today's inspiration saved",
    "已删除灵感记录": "Inspiration record deleted",
    "现在": "Now",
    "接下来": "Next",
    "随后": "Later",
    "日历": "Calendar",
    "选择日期查看当天概况": "Select a date to view daily overview",
    "打开日历看板": "Open dashboard",
    "进度概览": "Progress overview",
    "工作推进与年度方向": "Work progress and annual direction",
    "本月事件完成率": "Monthly event completion",
    "事件": "Events",
    "年度目标完成率": "Annual goal completion",
    "平均进度": "Average progress",
    "年度目标": "Annual goals",
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
    "状态": "Status",
    "领域": "Area",
    "筛选": "Filter",
    "全部状态": "All statuses",
    "全部领域": "All areas",
    "按状态筛选项目": "Filter projects by status",
    "按领域筛选项目": "Filter projects by area",
    "把每天留下的灵感、行动和变化，慢慢看成一条自己的轨迹。": "See the inspirations, actions, and changes you leave each day as your own trail.",
    "道虽迩，不行不至；事虽小，不为不成。": "Even the shortest path requires a step; even the simplest task requires action.",
    "灵感记录": "Inspiration record",
    "关闭": "Close",
    "筛选": "Filter",
    "全部状态与领域": "All statuses and areas",
    "＋ 新项目": "＋ New project",
    "当前进度": "Current progress",
    "所属领域": "Area",
    "回顾日期": "Review date",
    "项目描述": "Project description",
    "项目共用，不随回顾日期切换": "Shared across all project dates",
    "新增领域": "New area",
    "管理领域": "Manage areas",
    "全局搜索": "Global search",
    "搜索所有记录…": "Search all records…",
    "联系作者的小红书主页": "Contact the author on Xiaohongshu",
    "发送邮件给作者": "Email the author",
    "下一步行动": "Next action",
    "说明项目要解决的问题、目标和范围": "Describe the problem, goals, and scope of the project",
    "填写这个日期的下一步行动": "Enter the next action for this date",
    "当前日期": "Current date",
    "记录日期": "Log date",
    "记录": "Log",
    "记录一次推进": "Log an update",
    "推进记录": "Project update",
    "添加记录": "Add update",
    "更新记录": "Update record",
    "项目日期记录已更新": "Project date record updated",
    "历史记录": "History",
    "推进历史": "Update history",
    "项目历史记录": "Project history",
    "查看项目历史记录": "View project history",
    "暂无历史记录": "No history yet.",
    "未标注日期": "Undated",
    "已完成并归档": "Completed and archived",
    "关闭": "Close",
    "展开更多记录": "Show more history",
    "删除项目": "Delete project",
    "删除这条项目记录": "Delete this project update",
    "切换项目图标": "Change project icon",
    "今天": "Today",
    "健康记录": "Health records",
    "记录体重、饮水、饮食与每日状态，重点观察连续变化。": "Track weight, hydration, nutrition, and daily wellbeing.",
    "体重趋势": "Weight trend",
    "按日期形成折线趋势": "Trend by date",
    "情绪趋势": "Mood trend",
    "饮水趋势": "Hydration trend",
    "饮食热量": "Calorie trend",
    "过去180天的情绪记录": "Mood records from the past 180 days",
    "过去180天的每日饮水量": "Daily hydration from the past 180 days",
    "过去365天的情绪记录": "Mood records from the past 365 days",
    "过去365天的每日饮水量": "Daily hydration from the past 365 days",
    "过去365天情绪记录": "Mood records from the past 365 days",
    "过去365天饮水记录": "Hydration records from the past 365 days",
    "按日期形成热量折线": "Calories by date",
    "记录心情后会在这里显示": "Log mood to see it here",
    "记录饮水量后会在这里显示": "Log hydration to see it here",
    "记录热量后会在这里形成折线": "Log calories to build this line",
    "过去180天日均摄入热量": "Average daily calories · past 180 days",
    "过去90天日均摄入热量": "Average daily calories · past 90 days",
    "过去60天日均摄入热量": "Average daily calories · past 60 days",
    "过去30天日均摄入热量": "Average daily calories · past 30 days",
    "过去15天日均摄入热量": "Average daily calories · past 15 days",
    "无热量记录": "No calorie records",
    "已删除热量记录": "Calorie record deleted",
    "删除这条记录": "Delete this record",
    "基于已记录天数": "Based on recorded days",
    "无记录": "No record",
    "切换健康趋势": "Switch health trend",
    "上一个趋势面板": "Previous trend panel",
    "下一个趋势面板": "Next trend panel",
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
    "今日体重，单位千克": "Today's weight in kilograms",
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
    "按训练计划完成记录连续计算": "Counted from workout-plan completion records",
    "当天健康记录已更新": "Daily health record updated",
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
    "安排名称": "Plan name",
    "简要说明": "Short description",
    "运动名称": "Exercise name",
    "运动时间或次数": "Time or reps",
    "时间或次数": "Time or reps",
    "保存安排": "Save plan",
    "热身与拉伸": "Warm-up & stretching",
    "日常计划": "Daily planning",
    "统一管理每日待办、长期事项和需要按日期跟进的工作与生活事件。": "Manage daily tasks, long-term items, and dated work and life events.",
    "当天记录": "Daily notes",
    "长期待办清单": "Long-term tasks",
    "不限定某一天的重要事项": "Important items without a fixed date",
    "事项": "Item",
    "添加一项待办": "Add a task",
    "添加待办": "Add task",
    "添加当天待办": "Add today's task",
    "今天推进了什么？明天需要继续什么？": "What did you move forward today? What needs to continue tomorrow?",
    "重要日期": "Important dates",
    "需要提前准备或按时跟进": "Prepare ahead or follow up on time",
    "日历与复盘": "Calendar & review",
    "每日计划": "Daily plan",
    "按日期查看全年行动热度，点选任意一天回看详情。": "See activity across the year and select any day to review its details.",
    "运动安排": "Workout plan",
    "事务工作": "Work tasks",
    "待办事项": "Tasks",
    "当天复盘": "Daily review",
    "保存当天记录": "Save daily record",
    "保存记录": "Save notes",
    "项目推进记录": "Project updates",
    "当天的项目更新": "Project updates for this day",
    "生活健康": "Life & health",
    "已完成项目": "Completed projects",
    "筛选标签": "Filter tags",
    "完成的长期待办和工作项目会归档到这里 · 工作项目显示立项到完成的日期范围": "Completed long-term tasks and work projects are archived here · work projects show the start-to-completion date range",
    "该标签下还没有已完成项目。": "No completed projects under this tag.",
    "还没有已完成项目。": "No completed projects yet.",
    "没有找到匹配的未完成项目。": "No matching unfinished projects found.",
    "目前没有正在推进的项目，已完成项目已归档到日历看板。": "No projects are in progress. Completed projects are archived in the calendar dashboard.",
    "数据备份": "Data backup",
    "导出备份": "Export backup",
    "导入备份": "Import backup",
    "清除当前设备记录": "Clear this device's records",
    "管理本地记录的备份与恢复。": "Manage backups and restore local records.",
    "导出 JSON 备份后，可以在另一台设备恢复工作台数据。": "Export a JSON backup to restore your workbench data on another device.",
    "此操作会清除当前浏览器中的工作台记录，且无法撤销。": "This clears workbench records in the current browser and cannot be undone.",
    "清除全部记录": "Clear all records",
    "隐私与开源许可": "Privacy & open-source license",
    "了解本地数据如何保存，以及本项目采用的开源许可。": "Learn how local data is stored and which open-source license applies.",
    "查看隐私政策": "View privacy policy",
    "查看 GPL-3.0 许可": "View GPL-3.0 license",
    "保存日期": "Save date",
    "数据与隐私": "Data & privacy",
    "保存": "Save",
    "取消": "Cancel",
    "删除": "Delete",
    "添加": "Add",
    "添加年度目标": "Add annual goal",
    "关闭": "Close",
    "未开始": "Not started",
    "待选择": "To decide",
    "进行中": "In progress",
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
    "未命名动作": "Unnamed exercise",
    "未设置频次": "Frequency not set",
    "动作名称": "Exercise name",
    "例如：每周 2 次 · 10 分钟": "e.g. twice a week · 10 minutes",
    "例如：午间散步": "e.g. midday walk",
    "例如：按状态完成 15 分钟": "e.g. 15 minutes based on how you feel",
    "一": "Mon",
    "二": "Tue",
    "三": "Wed",
    "四": "Thu",
    "五": "Fri",
    "六": "Sat",
    "日": "Sun",
    "工作项目": "Work project",
    "长期待办": "Long-term task",
    "已删除专项训练动作": "Focused training exercise deleted",
    "至少保留一个日常项目": "Keep at least one daily routine",
    "已删除日常项目": "Daily routine deleted",
    "已记录训练完成": "Workout marked complete",
    "已取消训练完成": "Workout marked incomplete",
    "已完成一项待办": "Task completed",
    "已删除体重记录": "Weight record deleted",
    "今日状态已保存": "Today's status saved",
    "饮食记录已保存": "Food notes saved",
    "当天记录已保存": "Daily record saved",
    "备份已导出": "Backup exported",
    "已更新当天及未来同星期的运动安排": "Today's and future same-weekday workouts updated",
    "已添加日常项目": "Daily routine added",
    "已添加待办": "Task added",
    "已添加当天待办": "Today's task added",
    "今日体重已记录": "Today's weight logged",
    "已添加待办事项": "Task added",
    "重要日期已保存": "Important date saved",
    "备份已恢复": "Backup restored"
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
  const uiText = (zh, en) => currentLanguage === "en" ? en : zh;
  const ENGLISH_DEMO_INSPIRATIONS = [
    "A quiet interface needs room to breathe.",
    "The best ideas arrive after the plan leaves some space.",
    "A small step can turn a distant direction into a real path.",
    "Good experiences let people enter slowly and stay curious.",
    "Keep the useful signal; let the noise fall away.",
    "A walk, a page, and a friend can reshape the whole day."
  ];
  function localizedInspiration(day) {
    return String(day?.inspiration || "").trim();
  }
  function inspirationInitial(value) {
    const text = String(value || "").trim();
    return text.match(/[\u3400-\u9fff]/)?.[0] || text.match(/[A-Za-z]/)?.[0]?.toUpperCase() || Array.from(text)[0] || "";
  }
  const addDays = (key, amount) => {
    const date = fromKey(key);
    date.setDate(date.getDate() + amount);
    return keyOf(date);
  };
  const BREEZE_PERIODS = [
    { id: "morning", zh: "早上好", en: "Good morning", start: 5, end: 11 },
    { id: "noon", zh: "中午好", en: "Good noon", start: 11, end: 14 },
    { id: "afternoon", zh: "下午好", en: "Good afternoon", start: 14, end: 18 },
    { id: "evening", zh: "晚上好", en: "Good evening", start: 18, end: 23 },
    { id: "late", zh: "夜深了", en: "It is late", start: 23, end: 29 }
  ];
  const LATE_NIGHT_LINES = [
    { zh: "今天已经够努力了，先去休息吧。", en: "You have done enough for today. Let yourself rest." },
    { zh: "把屏幕放下，早点睡，明天再继续。", en: "Put the screen down, sleep a little earlier, and continue tomorrow." },
    { zh: "不用把今天的所有事都做完，睡好也是在推进。", en: "You do not have to finish everything today; good sleep is progress too." },
    { zh: "夜深了，给身体一个收尾的时间。", en: "It is late; give your body time to wind down." },
    { zh: "先照顾好自己，明天会更有力气。", en: "Take care of yourself first; tomorrow will have more energy." }
  ];
  const BREEZE_SEEDS = [
    ["morning", "去表达，去输出", "Express, then share"],
    ["noon", "留一点空白，再继续推进", "Leave a little space, then keep moving"],
    ["afternoon", "把好奇心做成作品", "Turn curiosity into work"],
    ["evening", "温柔地做难而重要的事", "Do the difficult, meaningful things gently"]
  ];
  function createDefaultBreezeGuide() {
    return {
      entries: BREEZE_SEEDS.map(([period, zh, en], index) => ({
        id: `breeze-seed-${index + 1}`,
        period,
        zh,
        en,
        source: "system",
        createdAt: todayKey(),
        updatedAt: todayKey()
      }))
    };
  }
  function normalizeBreezeGuide(value, fallback = createDefaultBreezeGuide()) {
    const source = Array.isArray(value?.entries) ? value.entries : [];
    const entries = source.map((entry, index) => {
      const id = String(entry?.id || `breeze-${index + 1}`);
      const seedIndex = id.match(/^breeze-seed-(\d+)$/)?.[1];
      const seed = seedIndex ? BREEZE_SEEDS[Number(seedIndex) - 1] : null;
      const period = seed?.[0] || (BREEZE_PERIODS.some((item) => item.id === entry?.period) ? entry.period : "morning");
      const rawText = String(entry?.text || "").trim();
      const zh = String(seed?.[1] || entry?.zh || rawText || "").trim();
      const en = String(seed?.[2] || entry?.en || rawText || zh).trim();
      const entrySource = seed || entry?.source === "system" ? "system" : "user";
      return {
        id,
        period,
        zh,
        en,
        source: entrySource,
        text: entrySource === "user" ? (rawText || zh || en) : "",
        language: entrySource === "user" && entry?.language === "en" ? "en" : entrySource === "user" && entry?.language === "zh" ? "zh" : "",
        createdAt: isDateKey(entry?.createdAt) ? entry.createdAt : todayKey(),
        updatedAt: isDateKey(entry?.updatedAt) ? entry.updatedAt : todayKey()
      };
    }).filter((entry) => entry.id !== "breeze-seed-5" && (entry.zh || entry.en));
    return { entries: entries.length ? entries : fallback.entries.map((entry) => ({ ...entry })) };
  }
  function breezePeriodForNow() {
    const hour = new Date().getHours();
    return BREEZE_PERIODS.find((period) => hour >= period.start && hour < period.end) || BREEZE_PERIODS[4];
  }
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
  const PROJECT_ICONS = [
    { id: "hourglass", legacy: ["⌛"], paths: '<path d="M7 3h10M7 21h10M8 4c0 3 2 4 4 5-2 1-4 2-4 5v3h8v-3c0-3-2-4-4-5 2-1 4-2 4-5V4Z"/>' },
    { id: "arrow", legacy: ["↗"], paths: '<path d="M5 19 19 5M10 5h9v9"/>' },
    { id: "home", legacy: ["⌂"], paths: '<path d="m4 10 8-6 8 6v10H4zM9 20v-6h6v6"/>' },
    { id: "pencil", legacy: ["✎"], paths: '<path d="m5 16-1 4 4-1L19 8a2.1 2.1 0 0 0-3-3L5 16Z"/><path d="m14.5 6.5 3 3"/>' },
    { id: "mail", legacy: ["✉"], paths: '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="m5 8 7 5 7-5"/>' },
    { id: "clock", legacy: ["◎"], paths: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>' },
    { id: "book", legacy: [], paths: '<path d="M12 5v15M12 5C9 3 5 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-2-1-6-1-9 1Z"/>' },
    { id: "leaf", legacy: [], paths: '<path d="M5 19c-5-8 3-14 15-15 0 12-6 20-15 15ZM5 19 16 8"/>' },
    { id: "camera", legacy: [], paths: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="m8 6 1-3h6l1 3"/><circle cx="12" cy="13" r="4"/>' },
    { id: "compass", legacy: [], paths: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>' },
    { id: "heart", legacy: [], paths: '<path d="M12 20 4 12C-2 5 7-1 12 6c5-7 14-1 8 6l-8 8Z"/>' },
    { id: "spark", legacy: [], paths: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"/>' }
  ];

  function projectIcon(project) {
    return PROJECT_ICONS.find((item) => item.id === project?.symbol || item.legacy.includes(project?.symbol)) || PROJECT_ICONS[0];
  }

  function projectIconMarkup(project) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${projectIcon(project).paths}</svg>`;
  }

  function projectIconPickerMarkup(project) {
    const names = { hourglass: ["沙漏", "Hourglass"], arrow: ["箭头", "Arrow"], home: ["房屋", "Home"], pencil: ["铅笔", "Pencil"], mail: ["信封", "Mail"], clock: ["时钟", "Clock"], book: ["书本", "Book"], leaf: ["叶子", "Leaf"], camera: ["相机", "Camera"], compass: ["指南针", "Compass"], heart: ["爱心", "Heart"], spark: ["星光", "Spark"] };
    return `<details class="project-icon-picker"><summary class="project-reading-icon" aria-label="${esc(uiText("选择项目图标", "Choose project icon"))}" title="${esc(uiText("选择项目图标", "Choose project icon"))}">${projectIconMarkup(project)}</summary><div class="project-icon-options" role="group" aria-label="${esc(uiText("默认图标", "Default icons"))}">${PROJECT_ICONS.map((item) => `<button type="button" class="project-icon-option" data-action="select-project-symbol" data-id="${esc(project.id)}" data-symbol="${item.id}" aria-label="${esc(uiText(...names[item.id]))}" aria-pressed="${projectIcon(project).id === item.id}" title="${esc(uiText(...names[item.id]))}">${projectIconMarkup({ symbol: item.id })}</button>`).join("")}</div></details>`;
  }

  function icon(name) {
    const paths = {
      home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/>',
      work: '<path d="M3 7h7l2 2h9v10H3z"/><path d="M3 7V5h7l2 2"/>',
      health: '<path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8z"/>',
      fitness: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
      tasks: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 5-6"/>',
      event: '<path d="M5 21V4"/><path d="M5 5h11l-2 4 2 4H5"/>',
      footprints: '<circle cx="7" cy="7" r="2"/><circle cx="16" cy="9" r="2"/><circle cx="8" cy="16" r="2"/><circle cx="17" cy="18" r="2"/>',
      settings: '<path d="M4 7h10"/><path d="M18 7h2"/><circle cx="16" cy="7" r="2"/><path d="M4 17h2"/><path d="M10 17h10"/><circle cx="8" cy="17" r="2"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'
    };
    return `<svg class="nav-svg" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.home}</svg>`;
  }

  function smileyLogoMarkup() {
    return '<svg class="logo-face" viewBox="0 0 64 64" aria-hidden="true"><path d="M10 20l9 7-9 7M54 20l-9 7 9 7M25 39c3 6 11 6 14 0"/></svg>';
  }

  const pages = [
    ["home", "总览", "home"],
    ["work", "项目推进", "work"],
    ["health", "健康管理", "health"],
    ["fitness", "健身计划", "fitness"],
    ["reminders", "日常提醒", "tasks"],
    ["calendar", "日历看板", "event"],
    ["footprints", "行则将至", "footprints"],
    ["settings", "设置与备份", "settings"]
  ];
  const pageNames = Object.fromEntries(pages.map(([id, label]) => [id, label]));

  document.body.innerHTML = `
    <a class="skip-link" href="#v2Main">跳到主要内容</a>
    <div class="v2-shell">
      <aside class="v2-sidebar${sidebarCollapsed ? " is-collapsed" : ""}">
        <div class="v2-brand"><span class="v2-logo" aria-hidden="true">${smileyLogoMarkup()}</span><div><strong>个人工作台</strong><span>${uiText("LIFE OS · 本地版", "LIFE OS · Local edition")}</span></div></div>
        <nav class="v2-nav" aria-label="主导航">
          ${pages.map(([id, label, iconName]) => `<a href="#${id}" data-page="${id}" aria-label="${label}">${icon(iconName)}<span>${label}</span></a>`).join("")}
        </nav>
        <div class="sidebar-spacer"></div>
        <div class="sidebar-save">修改会自动保存在当前浏览器</div>
      </aside>

      <main class="v2-main${sidebarCollapsed ? " is-sidebar-collapsed" : ""}" id="v2Main">
        <header class="v2-topbar">
          <button class="sidebar-toggle" type="button" data-action="toggle-sidebar" aria-expanded="${sidebarCollapsed ? "false" : "true"}" aria-label="${sidebarCollapsed ? uiText("展开侧栏", "Expand sidebar") : uiText("折叠侧栏", "Collapse sidebar")}"><span aria-hidden="true">${sidebarCollapsed ? "›" : "‹"}</span></button>
          <div class="v2-topbar-brand"><span class="v2-mobile-logo" aria-hidden="true">${smileyLogoMarkup()}</span></div>
          <div class="v2-top-actions">
            <button class="back-button" id="backButton" type="button" data-action="go-back" aria-label="返回上一页" title="返回上一页" disabled><span class="back-button-icon" aria-hidden="true">←</span><span class="back-button-label">返回</span></button>
            <button class="lang-switch" id="languageToggle" type="button" aria-label="切换语言">EN</button>
            <div class="search-field" id="globalSearchField">
              <label class="sr-only" for="globalSearch">全局搜索</label>
              ${icon("search")}
              <input class="input" id="globalSearch" type="search" placeholder="搜索所有记录…" maxlength="180" autocomplete="off" role="combobox" aria-autocomplete="list" aria-controls="globalSearchResults" aria-expanded="false" />
              <div class="global-search-panel" id="globalSearchPanel" data-no-translate="true" hidden><div class="global-search-summary" id="globalSearchSummary" role="status"></div><div class="global-search-results" id="globalSearchResults" role="listbox" aria-label="${uiText("搜索结果", "Search results")}"></div><div id="globalSearchMore"></div></div>
            </div>
          </div>
        </header>

        <div class="v2-content">
          <aside class="backup-notice" id="backupNotice" role="status" data-no-translate="true" hidden></aside>
          <aside class="backup-notice" id="backupSyncNotice" role="status" data-no-translate="true" hidden></aside>
          <section class="v2-screen" data-screen="home">
            <div class="compact-banner"><h2 id="homeOverviewTitle" class="home-breeze-title"><span id="homeBreezePeriod"></span><span id="homeBreezeCopy"></span></h2></div>
            <section class="section home-overview-section">
              <article class="card home-stats-card">
                <div class="card-head"><div><h3>完成概览</h3><small>工作、待办和年度目标的当前状态</small></div></div>
                <div class="home-stats-grid" id="homeStats"></div>
              </article>
            </section>
            <section class="section">
              <div class="section-head"><div><h3>今天要做</h3><p>可直接修改，内容与日常提醒、日历同步。</p></div><button class="btn secondary" data-page="reminders">打开日常提醒</button></div>
              <div class="grid grid-3" id="homeTasks"></div>
            </section>
            <section class="section grid home-top">
              <div class="home-left-stack">
                <article class="card home-priority-card" id="homePriorityCard">
                  <div class="card-head"><div><h3 id="homePriorityTitle">近期重点</h3><small id="homePrioritySubtitle">当前阶段的行动、目的与下一步</small></div><div class="card-head-actions"><button class="text-btn" id="homePriorityToggle" data-action="toggle-home-inspiration">记录灵感</button><button class="edit-btn" data-action="toggle-priority-edit">编辑</button></div></div>
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
                <div class="goal-divider"><strong>年度目标</strong></div>
                <div id="homeGoals" tabindex="0" aria-label="年度目标列表"></div>
              </article>
            </section>
          </section>

          <section class="v2-screen" data-screen="work">
            <div class="page-heading"><h2 data-i18n-key="项目推进">项目推进</h2><p data-i18n-key="管理工作与长期项目，记录每一次推进，并随时回看完整历史。">管理工作与长期项目，记录每一次推进，并随时回看完整历史。</p></div>
            <section class="section"><article class="card"><div class="card-head"><div><h3>项目总进度</h3><small>${uiText("与下方项目状态和进度实时同步", "Synced with project status and progress below")}</small></div></div><div class="project-overview" id="projectOverview"></div></article></section>
            <section class="section project-list-section">
              <div class="section-head project-section-head"><div><h3>正在推进</h3><p>状态、进度和下一步会自动保存。</p></div><div class="project-section-actions"><label class="project-filter"><span>状态</span><select class="select" id="projectStatusFilter" aria-label="按状态筛选项目"><option value="all">全部状态</option></select></label><label class="project-filter"><span>领域</span><select class="select" id="projectAreaFilter" aria-label="按领域筛选项目"><option value="all">全部领域</option></select></label><button class="btn green" data-action="add-project">＋ 新项目</button></div></div>
              <div class="project-area-tools"><button class="text-btn" type="button" data-action="manage-project-areas">管理领域</button></div>
              <div class="project-list" id="projectList"></div>
            </section>
          </section>

          <section class="v2-screen" data-screen="health">
            <div class="page-heading"><h2 data-i18n-key="健康记录">健康记录</h2><p data-i18n-key="记录体重、饮水、饮食与每日状态，重点观察连续变化。">记录体重、饮水、饮食与每日状态，重点观察连续变化。</p></div>
            <section class="section grid health-layout">
              <article class="card health-trend-card">
                <div class="card-head"><div><h3 id="healthTrendTitle">体重趋势</h3><small id="healthTrendSubtitle">按日期形成折线趋势</small></div><div class="trend-switcher" role="group" aria-label="切换健康趋势"><button class="trend-arrow" type="button" data-action="health-trend-prev" aria-label="上一个趋势面板">‹</button><button class="trend-arrow" type="button" data-action="health-trend-next" aria-label="下一个趋势面板">›</button></div></div>
                <div id="healthTrendPanel"></div>
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
            <div class="page-heading"><h2 data-i18n-key="健身计划">健身计划</h2><p data-i18n-key="每周 3 次力量、2 次有氧；切换日期即可查看当天的完整运动安排。">每周 3 次力量、2 次有氧；切换日期即可查看当天的完整运动安排。</p></div>
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
            <section class="section grid grid-2 fitness-plan-grid">
              <article class="card fitness-plan-card">
                <div class="card-head"><div><h3>每日安排</h3><small>切换日期查看当天训练项目</small></div></div>
                <div class="date-strip"><button class="date-nav-btn" data-action="fitness-prev-day" aria-label="前一天">‹</button><div class="date-strip-label"><strong id="fitnessDateTitle"></strong><small id="fitnessDateHint"></small></div><button class="date-nav-btn" data-action="fitness-next-day" aria-label="后一天">›</button></div>
                <div id="fitnessDayPlan"></div>
              </article>
              <article class="card fitness-routines-card">
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
            <div class="page-heading"><h2 data-i18n-key="日常提醒">日常提醒</h2><p data-i18n-key="统一管理每日待办、长期事项和需要按日期跟进的工作与生活事件。">统一管理每日待办、长期事项和需要按日期跟进的工作与生活事件。</p></div>
            <section class="section north-star-section"><article class="card north-star-card" id="northStarPanel"><div class="breeze-head"><div class="breeze-title-line"><h3 class="breeze-title">${uiText("微风指南", "Breeze guide")}</h3><small id="breezePeriodLabel"></small></div><div class="breeze-actions"><button class="icon-btn breeze-add-btn" type="button" data-action="breeze-add" aria-label="${uiText("新增微风指南", "Add breeze guide")}" title="${uiText("新增微风指南", "Add breeze guide")}">＋</button><button class="text-btn" type="button" data-action="breeze-toggle-history" id="breezeHistoryToggle">展开</button></div></div><div class="breeze-viewport" id="breezeViewport" tabindex="0" aria-label="${uiText("微风指南，可用鼠标滚轮切换", "Breeze guide; use the mouse wheel to switch entries")}"><h3 id="northStarQuote"></h3></div><div class="breeze-editor" id="breezeEditor" hidden></div><div class="breeze-history" id="breezeHistory" hidden></div></article></section>
            <section class="section grid grid-2">
              <article class="card">
                <div class="date-strip"><button class="date-nav-btn" data-action="reminder-prev-day" aria-label="前一天">‹</button><div class="date-strip-label"><strong id="reminderDateTitle"></strong><small id="reminderProgress"></small></div><button class="date-nav-btn" data-action="reminder-next-day" aria-label="后一天">›</button></div>
                <div class="todo-list" id="reminderList"></div>
                <form class="form-row" id="reminderForm" style="margin-top:14px"><label class="sr-only" for="reminderInput">添加待办</label><input class="input" id="reminderInput" maxlength="120" placeholder="添加当天待办" required /><button class="btn green" type="submit">添加</button></form>
              </article>
              <article class="card">
                <div class="card-head"><div><h3>今日灵感</h3><small id="inspirationDateLabel"></small></div></div>
                <label class="sr-only" for="dayInspirationInput">今日灵感</label>
                <textarea class="textarea inspiration-textarea" id="dayInspirationInput" data-inspiration-input="reminders" placeholder="记录今天捕捉到的灵感、片段或想继续观察的方向"></textarea>
                <button class="btn secondary" data-action="save-inspiration" data-inspiration-source="reminders" style="margin-top:10px">保存今日灵感</button>
              </article>
            </section>
            <section class="section grid grid-2 important-layout">
              <article class="card">
                <div class="card-head"><div><h3>长期待办清单</h3><small>不限定某一天的重要事项</small></div><div class="card-head-actions"><span class="tag neutral" id="masterTodoProgress" aria-live="polite"></span><button class="edit-btn" data-action="toggle-master-todo-edit">编辑</button></div></div>
                <div class="master-todo" id="masterTodoList"></div>
                <button class="text-btn master-todo-expand" id="masterTodoExpand" type="button" data-action="toggle-master-todo-expand" aria-controls="masterTodoList" aria-expanded="false">展开查看</button>
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
                  <div class="field"><label for="eventRepeatInput">重复</label><select class="select" id="eventRepeatInput"><option value="none">不重复</option><option value="weekly">每周</option><option value="monthly">每月</option><option value="yearly">每年</option></select></div>
                  <div class="field wide"><label for="eventCopyInput">补充说明</label><textarea class="textarea" id="eventCopyInput" maxlength="200"></textarea></div>
                  <div class="wide form-row"><button class="btn green" id="eventFormSubmit" type="submit">保存日期</button><button class="btn secondary" type="button" data-action="toggle-event-form">取消</button></div>
                </form>
              </article>
            </section>
          </section>

          <section class="v2-screen" data-screen="calendar">
            <div class="page-heading"><h2 data-i18n-key="日历看板">日历看板</h2><p data-i18n-key="按日期查看全年行动热度，点选任意一天回看详情。">按日期查看全年行动热度，点选任意一天回看详情。</p></div>
            <section class="section calendar-stack">
              <article class="card calendar-card calendar-overview-card">
                <div class="calendar-overview-grid">
                  <div class="calendar-annual-pane">
                    <div class="calendar-head annual-calendar-head"><span class="calendar-month" id="calendarYearTitle"></span><div class="calendar-controls" role="group" aria-label="切换日历年份"><button class="date-nav-btn" data-action="calendar-prev-year" aria-label="上一年">‹</button><button class="date-nav-btn" data-action="calendar-year-today" aria-label="回到今年">今</button><button class="date-nav-btn" data-action="calendar-next-year" aria-label="下一年">›</button></div></div>
                    <div class="annual-calendar-meta"><span id="calendarHeatmapMeta"></span><div class="annual-calendar-legend" id="calendarHeatmapLegend"></div></div>
                    <div class="annual-calendar-plot">
                      <div class="annual-calendar-months" id="calendarMonthLabels" aria-hidden="true"></div>
                      <div class="annual-calendar-body">
                        <div class="annual-weekday-labels" aria-hidden="true"><span>一</span><span></span><span>三</span><span></span><span>五</span><span></span><span>日</span></div>
                        <div class="annual-week-grid" id="calendarYearGrid"></div>
                      </div>
                    </div>
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
                <article class="card day-dashboard calendar-inspiration-panel" id="calendarInspirationPanel"></article>
              </div>
            </section>
          </section>

          <section class="v2-screen" data-screen="footprints">
            <div class="page-heading"><h2 data-i18n-key="行则将至">行则将至</h2><p data-i18n-key="道虽迩，不行不至；事虽小，不为不成。">${uiText("道虽迩，不行不至；事虽小，不为不成。", "Even the shortest path requires a step; even the simplest task requires action.")}</p></div>
            <section class="section footprints-stack">
              <article class="card footprints-card" id="footprintsPanel"></article>
              <article class="card footprints-metrics-card" id="footprintsMetricsPanel"></article>
              <article class="card monthly-activity-card" id="monthlyActivityPanel" data-no-translate="true"></article>
              <article class="card day-dashboard calendar-completed-panel" id="calendarCompletedPanel"></article>
            </section>
          </section>

          <section class="v2-screen" data-screen="settings">
            <div class="page-heading"><h2 data-i18n-key="设置与备份">设置与备份</h2><p data-i18n-key="管理本地记录的备份与恢复。">管理本地记录的备份与恢复。</p></div>
            <section class="section settings-stack">
              <article class="card settings-card"><h3>数据备份</h3><p>导出 JSON 备份后，可以在另一台设备恢复工作台数据。</p><div class="settings-actions"><button class="btn green" data-action="export">导出备份</button><label class="btn secondary file-btn">导入备份<input id="importInput" type="file" accept="application/json,.json" aria-label="选择备份文件" /></label></div></article>
              <article class="card settings-card" id="autoBackupSettings" data-no-translate="true"></article>
              <article class="card settings-card" id="backupSyncSettings" data-no-translate="true"></article>
              <article class="card settings-card"><h3>清除当前设备记录</h3><p>此操作会清除当前浏览器中的工作台记录，且无法撤销。</p><div class="settings-actions"><button class="btn danger" data-action="reset">清除全部记录</button></div></article>
              <article class="card settings-card"><h3 data-i18n-key="隐私与开源许可">隐私与开源许可</h3><p data-i18n-key="了解本地数据如何保存，以及本项目采用的开源许可。">了解本地数据如何保存，以及本项目采用的开源许可。</p><div class="settings-actions"><a class="btn secondary" href="https://github.com/daoyi2026/kinetic-life-os/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer" data-i18n-key="查看隐私政策">查看隐私政策</a><a class="btn secondary" href="https://github.com/daoyi2026/kinetic-life-os/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" data-i18n-key="查看 GPL-3.0 许可">查看 GPL-3.0 许可</a></div></article>
            </section>
          </section>

          <footer class="v2-footer"><span class="footer-version" data-no-translate="true">${uiText(`KINETIC LIFE OS · 本地保存 · ${APP_VERSION}`, `KINETIC LIFE OS · Local storage · ${APP_VERSION}`)}</span><span class="footer-contacts"><a class="footer-contact-link" href="https://xhslink.cn/o/3tsw6s41VuJ" target="_blank" rel="noopener noreferrer" aria-label="联系作者的小红书主页" title="联系作者的小红书主页"><img src="assets/xiaohongshu.svg?v=1" width="28" height="14" alt="" /></a><a class="footer-contact-link" href="mailto:daoyi.career@gmail.com" aria-label="发送邮件给作者" title="daoyi.career@gmail.com"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg></a></span></footer>
        </div>
      </main>
    </div>
    <nav class="mobile-nav-v2" aria-label="移动端导航">
      ${pages.slice(0, 4).concat([pages[5], pages[6]]).map(([id, label, iconName]) => `<a href="#${id}" data-page="${id}">${icon(iconName)}<span>${label.replace("计划", "")}</span></a>`).join("")}
    </nav>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
    <dialog class="backup-import-dialog" id="backupImportDialog" aria-labelledby="backupImportTitle" data-no-translate="true">
      <h2 id="backupImportTitle">${uiText("确认导入备份", "Review backup import")}</h2>
      <p id="backupImportSummary"></p><details><summary>${uiText("备份文件", "Backup file")}</summary><p class="backup-file-name" id="backupImportFile"></p></details>
      <p>${uiText("导入将替换本机全部记录，不会合并。操作前会先保存一份本机快照；你可以在设置中下载它。", "Import replaces all local records without merging. A local recovery snapshot must be saved first and can be downloaded from Settings.")}</p>
      <div class="settings-actions"><button class="btn secondary" id="backupImportCancel" type="button" data-action="close-backup-review">${uiText("稍后处理", "Later")}</button><button class="text-btn" type="button" data-action="keep-local-backup">${uiText("保留本机，忽略此版本", "Keep local; ignore this version")}</button><button class="btn green" type="button" data-action="apply-backup-import">${uiText("保存快照并替换导入", "Save snapshot & replace")}</button></div>
    </dialog>
    <div class="modal-backdrop" id="projectAreasModal" hidden>
      <section class="modal-card project-areas-modal" role="dialog" aria-modal="true" aria-labelledby="projectAreasTitle" data-no-translate="true">
        <div class="modal-card-head"><h2 id="projectAreasTitle"></h2><button class="icon-button" type="button" data-action="close-project-areas" aria-label="${uiText("关闭", "Close")}">×</button></div>
        <div class="project-area-manager" id="projectAreasManager"></div>
      </section>
    </div>
    <div class="modal-backdrop" id="projectHistoryModal" hidden>
      <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="projectHistoryTitle">
        <div class="modal-card-head">
          <div><div class="eyebrow">推进历史</div><h2 id="projectHistoryTitle">项目历史记录</h2></div>
          <button class="icon-button" type="button" data-action="close-project-history" aria-label="关闭">×</button>
        </div>
        <div class="modal-history-scroll" id="projectHistoryList"></div>
      </section>
    </div>
    <div class="modal-backdrop" id="inspirationModal" hidden>
      <section class="modal-card inspiration-modal-card" role="dialog" aria-modal="true" aria-labelledby="inspirationModalTitle">
        <div class="modal-card-head">
          <div><div class="eyebrow">今日灵感</div><h2 id="inspirationModalTitle">灵感记录</h2><p class="modal-date" id="inspirationModalDate"></p></div>
          <button class="icon-button" type="button" data-action="close-inspiration-modal" aria-label="关闭">×</button>
        </div>
        <div class="inspiration-modal-text" id="inspirationModalText"></div>
        <div class="inspiration-modal-actions"><button class="btn danger" type="button" id="deleteInspirationButton" data-action="delete-inspiration">${uiText("删除这条记录", "Delete this record")}</button></div>
      </section>
    </div>
  `;

  const languageTextSources = new WeakMap();
  const languageAttributeSources = new WeakMap();
  let languageObserver = null;
  let languageSyncFrame = null;
  let languageApplying = false;

  function translateText(value) {
    if (currentLanguage === "zh") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (TRANSLATIONS[trimmed]) return value.replace(trimmed, TRANSLATIONS[trimmed]);
    const prefixedActionMatch = trimmed.match(/^＋\s*(.+)$/);
    if (prefixedActionMatch && TRANSLATIONS[prefixedActionMatch[1]]) {
      return value.replace(trimmed, `＋ ${TRANSLATIONS[prefixedActionMatch[1]]}`);
    }
    const statusMatch = trimmed.match(/^(未开始|待选择|进行中|收尾中|等待回复|长期维护|暂缓|已完成)\s*·\s*(.+)$/);
    if (statusMatch) return value.replace(trimmed, `${TRANSLATIONS[statusMatch[1]]} · ${statusMatch[2]}`);
    const historyMatch = trimmed.match(/^历史记录（(\d+)）$/);
    if (historyMatch) return value.replace(trimmed, `History (${historyMatch[1]})`);
    const moreHistoryMatch = trimmed.match(/^展开更多记录（(\d+)）$/);
    if (moreHistoryMatch) return value.replace(trimmed, `Show more history (${moreHistoryMatch[1]})`);
    const deleteProjectMatch = trimmed.match(/^删除项目\s+(.+)$/);
    if (deleteProjectMatch) return value.replace(trimmed, `Delete project ${deleteProjectMatch[1]}`);
    const deleteGoalMatch = trimmed.match(/^删除年度目标\s+(.+)$/);
    if (deleteGoalMatch) return value.replace(trimmed, `Delete annual goal ${deleteGoalMatch[1]}`);
    const patterns = [
      [/^(\d+)%\s*完成$/, "$1% complete"],
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
      [/^(\d+)月$/, (match, month) => MONTHS_SHORT_EN[Number(month) - 1] || match],
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
      const translated = translateText(source);
      if (current !== translated) element.setAttribute(name, translated);
    }
  }

  function applyLanguage() {
    if (languageApplying) return;
    languageApplying = true;
    languageObserver?.disconnect();
    try {
      document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-CN";
      document.title = currentLanguage === "en" ? "Personal Workbench · Kinetic Life OS" : "个人工作台 · Kinetic Life OS";
      const brandEdition = document.querySelector(".v2-brand > div > span");
      const brandEditionText = currentLanguage === "en" ? "LIFE OS · Local edition" : "LIFE OS · 本地版";
      if (brandEdition && brandEdition.textContent !== brandEditionText) brandEdition.textContent = brandEditionText;
      const footer = document.querySelector(".footer-version");
      const footerText = currentLanguage === "en" ? `KINETIC LIFE OS · Local storage · ${APP_VERSION}` : `KINETIC LIFE OS · 本地保存 · ${APP_VERSION}`;
      if (footer && footer.textContent !== footerText) footer.textContent = footerText;
      const languageToggle = document.getElementById("languageToggle");
      const languageToggleText = currentLanguage === "en" ? "中文" : "EN";
      if (languageToggle && languageToggle.textContent !== languageToggleText) languageToggle.textContent = languageToggleText;
      const breezeTitle = document.querySelector(".breeze-title");
      const breezeTitleText = uiText("微风指南", "Breeze guide");
      if (breezeTitle && breezeTitle.textContent !== breezeTitleText) breezeTitle.textContent = breezeTitleText;
      document.querySelectorAll("[data-i18n-key]").forEach((element) => {
        const key = element.dataset.i18nKey;
        const translated = TRANSLATIONS[key] ? uiText(key, TRANSLATIONS[key]) : null;
        if (translated !== null && element.textContent !== translated) element.textContent = translated;
      });
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) textNodes.push(node);
      textNodes.forEach((textNode) => {
        const parent = textNode.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return;
        if (parent.closest("[data-no-translate]")) return;
        if (!languageTextSources.has(textNode)) languageTextSources.set(textNode, textNode.nodeValue);
        const translated = translateText(languageTextSources.get(textNode));
        if (textNode.nodeValue !== translated) textNode.nodeValue = translated;
      });
      document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
        ["placeholder", "aria-label", "title"].forEach((name) => translateAttribute(element, name));
      });
      if (languageToggle) {
        const languageLabel = currentLanguage === "en" ? "Switch to Chinese" : "切换到英文";
        if (languageToggle.getAttribute("aria-label") !== languageLabel) languageToggle.setAttribute("aria-label", languageLabel);
      }
      syncSidebarToggle();
    } finally {
      languageApplying = false;
      languageObserver?.observe(document.body, { childList: true, subtree: true });
    }
  }

  function scheduleLanguageSync() {
    if (languageApplying || languageSyncFrame !== null) return;
    languageSyncFrame = requestAnimationFrame(() => {
      languageSyncFrame = null;
      applyLanguage();
    });
  }

  languageObserver = new MutationObserver(scheduleLanguageSync);
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
        ["1", "热身 6–8 分钟", "绕肩、肩胛活动、胸椎旋转与手腕活动"],
        ["2", "站姿哑铃肩推", "4 × 8–12"],
        ["3", "站姿哑铃侧平举", "4 × 10–15"],
        ["4", "站姿单臂哑铃划船", "4 × 10–12 / 侧"],
        ["5", "站姿俯身反向飞鸟", "4 × 12–15"],
        ["6", "站姿哑铃弯举", "3 × 10–12"],
        ["7", "保加利亚分腿蹲", "2 × 10–12"],
        ["8", "站姿靠墙滑手", "3 × 8–12"],
        ["9", "拉伸 5–8 分钟", "胸肌、背阔肌与前臂"]
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
        ["1", "热身 6–8 分钟", "髋、踝活动与徒手深蹲"],
        ["2", "哑铃深蹲", "4 × 10–12"],
        ["3", "臀桥", "4 × 12–15"],
        ["4", "哑铃罗马尼亚硬拉", "4 × 10–12"],
        ["5", "扶墙辅助静态分腿蹲", "3 × 8–12 / 侧"],
        ["6", "保加利亚分腿蹲", "2 × 10–12"],
        ["7", "平板支撑", "30–60 秒"],
        ["8", "死虫式", "3 × 8–10 / 侧"],
        ["9", "拉伸 5–8 分钟", "髋屈肌、臀部与大腿后侧"]
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
        ["1", "热身 6–8 分钟", "走步、绕肩、胸椎旋转与髋铰链"],
        ["2", "单臂哑铃划船", "4 × 10–12 / 侧"],
        ["3", "俯身反向飞鸟", "4 × 12–15"],
        ["4", "哑铃罗马尼亚硬拉", "4 × 10–12"],
        ["5", "单腿臀桥", "4 × 10–12 / 侧"],
        ["6", "超人式", "4 × 12–15"],
        ["7", "站姿单侧提重行走 / 原地抬膝", "3 × 30–45 秒 / 侧"],
        ["8", "站姿靠墙滑手", "3 × 8–12"],
        ["9", "拉伸 5–8 分钟", "背阔肌、胸、臀部与后链"]
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

  function normalizeWorkoutPlanItems(items) {
    return (Array.isArray(items) ? items : []).map((item, index) => {
      const tuple = Array.isArray(item) ? item : [item?.number, item?.title || item?.name, item?.detail];
      return [String(index + 1), String(tuple[1] || "").trim(), String(tuple[2] || "").trim()];
    });
  }

  const WORKOUT_TEXT_EN = {
    "热身 6–8 分钟": "Warm-up · 6–8 minutes",
    "绕肩、肩胛活动、胸椎旋转与手腕活动": "Shoulder circles, scapular mobility, thoracic rotation, and wrist mobility",
    "站姿哑铃肩推": "Standing dumbbell shoulder press",
    "站姿哑铃侧平举": "Standing dumbbell lateral raise",
    "站姿单臂哑铃划船": "Standing single-arm dumbbell row",
    "站姿俯身反向飞鸟": "Standing bent-over reverse fly",
    "站姿哑铃弯举": "Standing dumbbell curl",
    "保加利亚分腿蹲": "Bulgarian split squat",
    "站姿靠墙滑手": "Standing wall slides",
    "拉伸 5–8 分钟": "Stretch · 5–8 minutes",
    "胸肌、背阔肌与前臂": "Chest, lats, and forearms",
    "低冲击有氧": "Low-impact cardio",
    "肩背与胸椎灵活": "Shoulder, back, and thoracic mobility",
    "手腕与小关节": "Wrist and small-joint mobility",
    "髋、踝活动与徒手深蹲": "Hip and ankle mobility with bodyweight squats",
    "哑铃深蹲": "Dumbbell squat",
    "臀桥": "Glute bridge",
    "哑铃罗马尼亚硬拉": "Dumbbell Romanian deadlift",
    "扶墙辅助静态分腿蹲": "Wall-assisted static split squat",
    "平板支撑": "Plank",
    "死虫式": "Dead bug",
    "髋屈肌、臀部与大腿后侧": "Hip flexors, glutes, and hamstrings",
    "走步、绕肩、胸椎旋转与髋铰链": "Walking, shoulder circles, thoracic rotation, and hip hinges",
    "单臂哑铃划船": "Single-arm dumbbell row",
    "俯身反向飞鸟": "Bent-over reverse fly",
    "单腿臀桥": "Single-leg glute bridge",
    "超人式": "Superman",
    "站姿单侧提重行走 / 原地抬膝": "Single-sided carry / standing knee raises",
    "背阔肌、胸、臀部与后链": "Lats, chest, glutes, and posterior chain",
    "身体维护或轻松走动": "Body maintenance or an easy walk",
    "轻松走动": "Easy walk",
    "轻松活动": "Easy movement",
    "按当天状态安排 15–30 分钟": "15–30 minutes based on how you feel",
    "日常维护": "Daily maintenance",
    "完成早晚练习即可": "Complete the morning and evening routines",
    "散步或按状态完成日常维护": "Walk or follow your usual maintenance routine",
    "充分恢复，不安排正式训练": "Full recovery; no formal workout",
    "骨盆与髋踝控制": "Pelvic and hip-ankle control",
    "肩背稳定": "Shoulder and back stability",
    "肩背、手腕、髋踝与身体控制": "Shoulders, wrists, hips, ankles, and body control",
    "背部稳定、臀部与后链 · 不超过 60 分钟": "Back stability, glutes, and posterior chain · under 60 minutes",
    "肩背与手臂 · 全站立 · 不超过 60 分钟": "Shoulders, back, and arms · standing only · under 60 minutes",
    "臀腿、骨盆控制与核心 · 不超过 60 分钟": "Glutes, legs, pelvic control, and core · under 60 minutes"
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
    inspiration: "",
    inspirationEn: "",
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
        { id: "g-focus", title: "推进一个重要项目", area: "工作与成长", progress: 25 },
        { id: "g-health", title: "建立稳定的身体节奏", area: "健康与体态", progress: 20 },
        { id: "g-learning", title: "建立稳定的学习节奏", area: "学习与兴趣", progress: 15 },
        { id: "g-create", title: "保持长期创作与输出", area: "创作与学习", progress: 10 },
        { id: "g-base", title: "完成工作台体验优化", area: "产品与空间", progress: 20 }
      ],
      priorities: [
        { id: "priority-now", label: "现在", text: "完成一项当前重点", detail: "把任务拆成一个可以立即开始的小行动。" },
        { id: "priority-next", label: "接下来", text: "整理下一阶段计划", detail: "确认目标、截止日期和下一步。" },
        { id: "priority-later", label: "随后", text: "完成项目的第一个可见版本", detail: "先做出可用初版，再根据实际反馈继续优化。" }
      ],
      projectAreas: [],
      projects: [
        { id: "p-work", title: "季度项目推进", description: "整理项目目标、行动节奏和阶段成果，持续记录每一次推进。", symbol: "↗", area: "工作与成长", status: "进行中", progress: 25, next: "确定本周需要交付的最小成果。", logs: [], createdAt, completed: false },
        { id: "p-research", title: "专题研究整理", description: "围绕一个感兴趣的主题整理资料、问题和阶段性结论。", symbol: "✉", area: "学习与兴趣", status: "进行中", progress: 25, next: "整理研究框架并完成第一轮资料归档。", logs: [], createdAt, completed: false },
        { id: "p-app", title: "作息记录原型", description: "做一个足够轻量的记录工具，帮助观察作息变化并形成可回看的趋势。", symbol: "⌛", area: "产品与空间", status: "收尾中", progress: 80, next: "列出发布前剩余事项并逐件关闭。", logs: [], createdAt, completed: false },
        { id: "p-room", title: "工作台体验优化", description: "持续优化信息结构、页面入口和记录流程，让工作台更容易使用。", symbol: "⌂", area: "产品与空间", status: "进行中", progress: 15, next: "先完成一个可用初版，再根据实际使用补充内容。", logs: [], createdAt, completed: false },
        { id: "p-writing", title: "写作与阅读练习", description: "保持低压力、可持续的表达节奏，逐步整理主题和素材。", symbol: "✎", area: "创作与学习", status: "长期维护", progress: 5, next: "安排本周一次写作或阅读时段，先完成一个小片段。", logs: [], createdAt, completed: false },
        { id: "p-media", title: "创作主题练习", description: "围绕感兴趣的主题持续产出完整内容，先保持稳定，再逐步形成表达方式。", symbol: "◎", area: "创作与学习", status: "长期维护", progress: 5, next: "完成一个不完美但完整的主题输出。", logs: [], createdAt, completed: false },
        { id: "p-healing", title: "疗愈网页：森林 / 极光二选一", description: "探索一个节奏舒缓的沉浸式网页，用简单的视觉和声音帮助进入放松状态。", symbol: "◌", area: "产品与空间", status: "未开始", progress: 0, next: "先确定一个主题，再研究循环视频。", logs: [], createdAt, completed: false }
      ],
      milestones: [
        { id: "m1", title: "完成项目目标拆解", note: "把目标拆分为季度、月度和本周行动。", done: false, createdAt },
        { id: "m2", title: "整理第一轮资料", note: "保留可以支持下一步判断的关键信息。", done: false, createdAt },
        { id: "m3", title: "完成一次阶段复盘", note: "记录进展、阻碍和下一步调整。", done: false, createdAt },
        { id: "m4", title: "建立阶段事项清单", note: "把需要按日期跟进的事项逐项记录。", done: false, createdAt }
      ],
      events: [],
      days: {},
      workoutPlanChanges: [],
      weightHistory: [],
      routineItems: normalizeRoutineItems(),
      supplementaryTraining: cloneSupplementaryTraining(),
      breezeGuide: createDefaultBreezeGuide(),
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

  function clearedState(base) {
    return {
      ...base,
      goals: [],
      priorities: [],
      projects: [],
      projectAreas: ["其他"],
      milestones: [],
      events: [],
      days: {},
      workoutPlanChanges: [],
      weightHistory: [],
      reminders: [],
      focusSeconds: 1500,
      routineItems: normalizeRoutineItems(),
      supplementaryTraining: cloneSupplementaryTraining(),
      breezeGuide: createDefaultBreezeGuide(),
      migratedToV2: true,
      nonPersonalDemoDataApplied: true,
      demoLanguageRecordsApplied: true,
      demoInspirationTrailApplied: true,
      demoInspirationTrailVersion: 3
    };
  }

  function removeLegacyPersonalDemoContent(state) {
    let changed = false;
    const removeSeed = (items, ids, matches) => items.filter((item) => {
      const isSeed = ids.has(item?.id) && matches(item);
      if (isSeed) changed = true;
      return !isSeed;
    });
    const legacyGoalIds = new Set(["g-phd", "g-career"]);
    const legacyProjectIds = new Set(["p-job", "p-phd", "p-novel", "p-media", "p-room", "demo-project-healing", "demo-project-doctoral", "demo-project-product", "demo-project-life"]);
    const legacyReminderIds = new Set(["r1", "r2", "r3"]);
    const legacyMilestoneIds = new Set(["m1", "m2", "m3", "m4"]);
    state.goals = removeSeed(state.goals || [], legacyGoalIds, () => true);
    state.projects = removeSeed(state.projects || [], legacyProjectIds, () => true);
    state.reminders = removeSeed(state.reminders || [], legacyReminderIds, () => true);
    state.milestones = removeSeed(state.milestones || [], legacyMilestoneIds, () => true);
    const priorityReplacements = new Map([
      ["priority-now", { text: "完成一项当前重点", detail: "把任务拆成一个可以立即开始的小行动。" }],
      ["priority-next", { text: "整理下一阶段计划", detail: "确认目标、截止日期和下一步。" }],
      ["priority-later", { text: "完成项目的第一个可见版本", detail: "先做出可用初版，再根据实际反馈继续优化。" }]
    ]);
    state.priorities = (state.priorities || []).map((item) => {
      const replacement = priorityReplacements.get(item?.id);
      if (!replacement) return item;
      changed = true;
      return { ...item, ...replacement };
    });
    return changed;
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

  function addDemoEnglishInspirationRecords(days, today = todayKey()) {
    const candidates = [];
    for (let offset = 0; offset <= 109; offset += 1) {
      const key = addDays(today, -offset);
      const day = days[key] || emptyDay();
      normalizeDay(day);
      days[key] = day;
      if (!String(day.inspiration || "").trim()) candidates.push(key);
    }
    ENGLISH_DEMO_INSPIRATIONS.forEach((text, index) => {
      const key = candidates[index];
      if (!key) return;
      days[key].inspiration = text;
      days[key].inspirationEn = "";
    });
  }

  const DEMO_INSPIRATIONS = [
    "把今天看到的光线记下来，先保留感觉，不急着解释。",
    "疗愈产品要留出安静的空白，不必每一步都有反馈。",
    "旅行和摄影都需要慢一点，观察本身就是收获。",
    "一段古诗和一张胶片，可能会成为同一个视觉线索。",
    "一个小问题被写清楚之后，行动会变得更轻。",
    "好的节奏不是塞满日程，而是知道什么时候停下来。",
    "先完成一个小的真实版本，再让它慢慢长出来。",
    "把注意力放回手边，复杂的事也会逐渐变得清楚。",
    "朋友的一次回应，有时会打开新的观察角度。",
    "身体的反馈值得被记录，也值得被认真对待。",
    "写下一个不完整的想法，它也许会成为明天的起点。",
    "留一点时间给散步，很多念头会在路上整理好。"
  ];

  const DEMO_INSPIRATION_SUBJECTS = [
    "今天的光线",
    "一段阅读",
    "街角的树影",
    "朋友的回应",
    "一次散步",
    "网球练习后的呼吸",
    "胶片里的留白",
    "公益活动的准备",
    "一个产品问题",
    "研究笔记里的疑问",
    "海边的风",
    "晚间安静下来时"
  ];
  const DEMO_INSPIRATION_ACTIONS = [
    "让我想到要把观察写得更具体",
    "提醒我给计划留一点余地",
    "让我重新看见熟悉事物里的变化",
    "适合先记下来，再慢慢理解",
    "让我意识到节奏比速度更重要",
    "可以成为下一次尝试的起点",
    "让我愿意把注意力放回当下",
    "像是在告诉我不必一次完成全部",
    "也许能和另一个想法连成线索",
    "让一个模糊的方向开始变得清楚",
    "值得留在今天的记录里",
    "让我想给接下来的行动留出空间"
  ];
  const DEMO_INSPIRATION_ENDINGS = [
    "先保留感觉，不急着下结论。",
    "明天再回来看，也许会有新的答案。",
    "把它变成一个轻一点的行动。",
    "允许自己用更慢的方式继续。",
    "记录本身就是一种推进。",
    "不追求完整，先留下真实的一小段。",
    "让好奇心带着我往前走。",
    "给这个念头一个继续生长的机会。",
    "先做最容易开始的那一步。",
    "也给没有结果的过程留一点位置。",
    "把注意力放在下一次观察上。",
    "慢慢来，清楚比热闹更有用。"
  ];

  function demoInspirationForAge(age) {
    const subjectCount = DEMO_INSPIRATION_SUBJECTS.length;
    const actionCount = DEMO_INSPIRATION_ACTIONS.length;
    const subject = DEMO_INSPIRATION_SUBJECTS[age % subjectCount];
    const action = DEMO_INSPIRATION_ACTIONS[Math.floor(age / subjectCount) % actionCount];
    const ending = DEMO_INSPIRATION_ENDINGS[Math.floor(age / (subjectCount * actionCount)) % DEMO_INSPIRATION_ENDINGS.length];
    return `${subject}${action}，${ending}`;
  }

  function pickDemoAges(count, seed) {
    const ages = Array.from({ length: 365 }, (_, age) => age);
    let value = seed;
    for (let index = ages.length - 1; index > 0; index -= 1) {
      value = (value * 1664525 + 1013904223) % 4294967296;
      const swapIndex = Math.floor((value / 4294967296) * (index + 1));
      [ages[index], ages[swapIndex]] = [ages[swapIndex], ages[index]];
    }
    return new Set(ages.slice(0, count));
  }

  function addDemoInspirationTrail(days, today = todayKey()) {
    const inspirationAges = pickDemoAges(140, 20260921);
    inspirationAges.forEach((age) => {
      const key = addDays(today, -age);
      const day = days[key] || emptyDay();
      normalizeDay(day);
      if (!String(day.inspiration || "").trim() && !String(day.inspirationEn || "").trim()) {
        day.inspiration = demoInspirationForAge(age);
      }
      days[key] = day;
    });
  }

  function refreshLegacyDemoInspirationTrail(days, today = todayKey()) {
    const legacyTexts = new Set(DEMO_INSPIRATIONS);
    let changed = false;
    for (let age = 0; age < 365; age += 1) {
      const day = days[addDays(today, -age)];
      if (!day || !legacyTexts.has(String(day.inspiration || "").trim())) continue;
      day.inspiration = demoInspirationForAge(age);
      day.inspirationEn = "";
      changed = true;
    }
    return changed;
  }

  function dedupeDemoInspirationRecords(days) {
    const knownDemoTexts = new Set([...DEMO_INSPIRATIONS, ...ENGLISH_DEMO_INSPIRATIONS]);
    const candidateTexts = [];
    for (let age = 0; age < 1728; age += 1) {
      const candidate = demoInspirationForAge(age);
      knownDemoTexts.add(candidate);
      candidateTexts.push(candidate);
    }
    const used = new Set();
    let candidateIndex = 0;
    let changed = false;
    Object.keys(days).filter(isDateKey).sort().forEach((date) => {
      const day = days[date];
      const inspiration = String(day?.inspiration || "").trim();
      if (!inspiration) return;
      if (!used.has(inspiration)) {
        used.add(inspiration);
        return;
      }
      if (!knownDemoTexts.has(inspiration)) return;
      while (candidateIndex < candidateTexts.length && used.has(candidateTexts[candidateIndex])) candidateIndex += 1;
      if (candidateIndex >= candidateTexts.length) return;
      day.inspiration = candidateTexts[candidateIndex];
      day.inspirationEn = "";
      used.add(day.inspiration);
      candidateIndex += 1;
      changed = true;
    });
    return changed;
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
      tasks: [demoTask("demo-task-01", "整理三篇心理学论文", true, "研究"), demoTask("demo-task-02", "冥想 10 分钟", true, "疗愈"), demoTask("demo-task-03", "备份胶片相册", false, "摄影")],
      notes: "完成心理学与疗愈资料初筛，留下三条可以继续观察的线索。",
      inspiration: "疗愈产品的第一步不是增加功能，而是给人一段可以安静下来的时间。",
      mood: "平稳",
      energy: "正常",
      calories: "1780",
      food: "燕麦、鸡蛋、烤蔬菜和水果",
      water: 6
    });
    addDemoDay(-9, {
      tasks: [demoTask("demo-task-04", "完成用户访谈提纲", true, "研究"), demoTask("demo-task-05", "读书 30 分钟", true, "学习"), demoTask("demo-task-06", "给朋友发聚会邀请", false, "朋友")],
      notes: "把产品研究问题归档到三个主题下，和朋友约好下次一起看展。",
      inspiration: "朋友之间的陪伴感，也许可以成为产品研究里很重要的真实场景。",
      mood: "很好",
      energy: "充足",
      calories: "1860",
      food: "米饭、豆腐、时蔬与水果",
      water: 7
    });
    addDemoDay(-8, {
      tasks: [demoTask("demo-task-07", "记录一个疗愈产品灵感", true, "产品"), demoTask("demo-task-08", "画一张数字艺术草图", false, "创作")],
      notes: "疗愈产品的使用场景已经成形，明天补充心理安全感和反馈机制。",
      inspiration: "把一个疗愈场景画成数字草图，先保留模糊的感觉，不急着定义。",
      mood: "平稳",
      energy: "正常",
      calories: "1810",
      food: "全麦面包、番茄、鱼和绿叶菜",
      water: 5
    });
    addDemoDay(-7, {
      tasks: [demoTask("demo-task-09", "分析访谈笔记", true, "研究"), demoTask("demo-task-10", "练习 Ukulele 20 分钟", true, "音乐"), demoTask("demo-task-11", "整理工作台", false, "生活")],
      notes: "访谈笔记出现了关于陪伴感的共同需求，练琴让晚上慢了下来。",
      inspiration: "Ukulele 的节奏提醒我：好的体验不一定复杂，但要允许人慢慢进入。",
      mood: "很好",
      energy: "充足",
      calories: "1900",
      food: "酸奶、杂粮饭、鸡胸肉和水果",
      water: 8
    });
    addDemoDay(-6, {
      tasks: [demoTask("demo-task-12", "整理产品研究框架", true, "产品"), demoTask("demo-task-13", "读古诗五首", false, "阅读")],
      notes: "研究框架和目标人群已确定，留出时间读几首古诗，让语言重新变得有呼吸。",
      inspiration: "古诗的留白和界面的留白，都在提醒人把注意力放回当下。",
      mood: "平稳",
      energy: "正常",
      calories: "1760",
      food: "玉米、豆浆、菌菇和青菜",
      water: 6
    });
    addDemoDay(-5, {
      tasks: [demoTask("demo-task-14", "扫描两张胶片", true, "摄影"), demoTask("demo-task-15", "写作 30 分钟", false, "写作"), demoTask("demo-task-16", "看一组小鸟观察影像", false, "自然")],
      notes: "胶片里的光线比预想更安静，写作暂时不追求完整，只保留今天真正想说的部分。",
      inspiration: "胶片、写作和散步都需要一点等待，等待会让观察更准确。",
      mood: "一般",
      energy: "正常",
      calories: "1830",
      food: "面条、鸡蛋、豆类和水果",
      water: 5
    });
    addDemoDay(-4, {
      tasks: [demoTask("demo-task-17", "完成作品集研究页检查", true, "产品"), demoTask("demo-task-18", "整理博士申请研究方向（示例）", false, "研究"), demoTask("demo-task-19", "冥想 15 分钟", true, "疗愈")],
      notes: "研究页的逻辑已经更清楚，顺手把虚构的研究申请时间线整理成了几个阶段。",
      inspiration: "冥想之后更容易看见哪些内容只是噪音，删掉也是一种设计。",
      mood: "很好",
      energy: "充足",
      calories: "1880",
      food: "燕麦、牛奶、烤南瓜和蔬菜",
      water: 7
    });
    addDemoDay(-3, {
      tasks: [demoTask("demo-task-20", "整理星空参考图", true, "数字艺术"), demoTask("demo-task-21", "给公益活动留言", true, "公益"), demoTask("demo-task-22", "阅读 20 分钟", false, "学习")],
      notes: "完成星空和雪豹的视觉参考整理，也找到一个适合周末参加的公益活动。",
      inspiration: "星星、雪豹和小鸟都在提醒我，喜欢的事物可以组成自己的视觉语言。",
      mood: "平稳",
      energy: "正常",
      calories: "1800",
      food: "粥、鸡肉、豆腐和青菜",
      water: 6
    });
    addDemoDay(-2, {
      tasks: [demoTask("demo-task-23", "确认旅行路线候选", true, "旅行"), demoTask("demo-task-24", "画一张雪豹速写", false, "绘画")],
      notes: "路线保留两条，先选择可以慢慢走、可以拍胶片的那一条。",
      inspiration: "旅行不必塞满景点，留一段没有安排的路，可能会遇见真正想记住的画面。",
      mood: "平稳",
      energy: "偏低",
      calories: "1720",
      food: "三明治、汤面和时蔬",
      water: 4
    });
    addDemoDay(-1, {
      tasks: [demoTask("demo-task-25", "完成一轮研究文字校对", true, "研究"), demoTask("demo-task-26", "预约网球场", true, "运动"), demoTask("demo-task-27", "联系一位朋友", false, "朋友")],
      notes: "完成研究文字校对和网球安排，和朋友约好下周一起吃饭。",
      inspiration: "运动、朋友和写作放在同一天里，生活会比计划表更有弹性。",
      mood: "很好",
      energy: "充足",
      calories: "1870",
      food: "鸡蛋、糙米、鱼肉和水果",
      water: 7
    });
    addDemoDay(0, {
      tasks: [
        demoTask("demo-task-today-01", "完成用户研究框架", true, "研究"),
        demoTask("demo-task-today-02", "阅读心理学章节", false, "学习"),
        demoTask("demo-task-today-03", "上传一张胶片照片", false, "摄影"),
        demoTask("demo-task-today-04", "晚间冥想 15 分钟", false, "疗愈"),
        demoTask("demo-task-today-05", "给朋友发送周末邀请", true, "朋友"),
        demoTask("demo-task-today-06", "核对研究申请时间线（示例）", false, "研究")
      ],
      notes: "完成用户研究框架和朋友邀请，明天继续补齐访谈问题与数字艺术草图。",
      inspiration: "今天看到一束很像胶片颗粒的光，想把它和星空、呼吸感一起做成一个小作品。",
      mood: "平稳",
      energy: "充足",
      calories: "1850",
      food: "燕麦、时蔬、豆制品与水果",
      water: 6
    });

    [-10, -7, -4, -1].forEach((offset) => {
      const key = addDays(today, offset);
      const day = days[key] || emptyDay();
      if (!fitnessDays[key]) day.fitness = true;
      days[key] = day;
    });

    const demoMoodAges = pickDemoAges(250, 20260914);
    const demoWaterAges = pickDemoAges(250, 20261003);
    const demoMoodForAge = (age) => {
      let value = (Math.imul(age + 17, 2654435761) + 2246822519) >>> 0;
      value ^= value >>> 15;
      value = Math.imul(value, 2246822519) >>> 0;
      const roll = value % 100;
      if (roll < 36) return "很好";
      if (roll < 64) return "平稳";
      if (roll < 86) return "一般";
      return "低落";
    };
    const demoRecordAges = new Set();
    let demoSeed = 20260914;
    let consecutiveDemoRecords = 0;
    for (let age = 109; age >= 0; age -= 1) {
      demoSeed = (demoSeed * 1664525 + 1013904223) % 4294967296;
      const randomValue = demoSeed / 4294967296;
      const shouldRecord = consecutiveDemoRecords < 3 && (age === 0 || randomValue > 0.42);
      if (shouldRecord) {
        demoRecordAges.add(age);
        consecutiveDemoRecords += 1;
      } else {
        consecutiveDemoRecords = 0;
      }
    }
    for (let age = 364; age >= 0; age -= 1) {
      const key = addDays(today, -age);
      const day = days[key] || emptyDay();
      if (demoMoodAges.has(age)) {
        if (!day.mood) day.mood = demoMoodForAge(age);
      } else {
        day.mood = "";
      }
      if (demoWaterAges.has(age)) {
        if (!day.water) day.water = 1 + ((age * 2) % 8);
      } else {
        day.water = 0;
      }
      if (age <= 109 && demoRecordAges.has(age)) {
        if (!day.calories) day.calories = String(1650 + ((age * 37) % 420));
      } else {
        day.calories = "";
      }
      if (age <= 109 && !day.inspiration && age % 9 === 0) day.inspiration = demoInspirationForAge(age);
      days[key] = day;
    }
    addDemoInspirationTrail(days, today);
    addDemoEnglishInspirationRecords(days, today);

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
        id: "demo-project-research-direction",
        title: "数字疗愈与行为设计研究方向",
        description: "虚构示例：把心理学阅读、行为观察和产品设计连接起来，整理一个可以长期探索的研究方向。",
        symbol: "✦",
        area: "研究与学习",
        status: "进行中",
        progress: 40,
        next: "完成一页方向说明，并选出两篇入门论文。",
        createdAt: projectDate(-21),
        updatedAt: projectDate(-2),
        completed: false,
        logs: [
          demoLog("demo-log-research-direction-1", projectDate(-18), "把研究兴趣拆成行为、情绪和产品体验三个关键词。"),
          demoLog("demo-log-research-direction-2", projectDate(-9), "整理出一页问题地图，保留几个待验证的假设。"),
          demoLog("demo-log-research-direction-3", projectDate(-2), "选择两篇入门论文，准备写第一版方向说明。")
        ]
      },
      {
        id: "demo-project-film",
        title: "胶片摄影与城市观察",
        description: "用胶片记录街道、光线和人与城市的关系，也为旅行保留一份慢速的视觉档案。",
        symbol: "⌂",
        area: "摄影与旅行",
        status: "未开始",
        progress: 30,
        next: "确定一个街区主题，完成一次轻量外拍。",
        createdAt: projectDate(-5),
        updatedAt: projectDate(-2),
        completed: false,
        logs: [
          demoLog("demo-log-film-1", projectDate(-5), "整理喜欢的胶片色调和街道观察主题。"),
          demoLog("demo-log-film-2", projectDate(-2), "选出两个适合周末慢走的街区。")
        ]
      },
      {
        id: "demo-project-trip",
        title: "海边慢旅行计划",
        description: "设计一次不赶行程的短途旅行，留出散步、拍照和临时改变路线的空间。",
        symbol: "⌂",
        area: "旅行与朋友",
        status: "进行中",
        progress: 35,
        next: "在两条虚构路线中选出一条，并列出轻量行李清单。",
        createdAt: projectDate(-11),
        updatedAt: projectDate(-1),
        completed: false,
        logs: [
          demoLog("demo-log-trip-1", projectDate(-11), "整理慢旅行的三个关键词：散步、光线和留白。"),
          demoLog("demo-log-trip-2", projectDate(-6), "列出两条不对应真实预订的路线草案。"),
          demoLog("demo-log-trip-3", projectDate(-1), "和朋友讨论周末出发时间，保留一段自由活动。")
        ]
      },
      {
        id: "demo-project-community",
        title: "社区公益与旧物交换",
        description: "参加一场虚构的社区公益活动，把闲置物品、邻里交流和可持续生活放到同一个小计划里。",
        symbol: "♡",
        area: "公益与生活",
        status: "待选择",
        progress: 20,
        next: "确认活动形式，并准备一份不涉及真实个人信息的物品清单。",
        createdAt: projectDate(-9),
        updatedAt: projectDate(-3),
        completed: false,
        logs: [
          demoLog("demo-log-community-1", projectDate(-9), "记录三个适合小规模参与的公益主题。"),
          demoLog("demo-log-community-2", projectDate(-3), "整理旧物分类和活动流程草案。")
        ]
      },
      {
        id: "demo-project-tennis",
        title: "网球入门与周末运动",
        description: "把网球练习、基础体能和朋友约球安排成一套轻松可持续的运动节奏。",
        symbol: "◎",
        area: "运动与健康",
        status: "长期维护",
        progress: 45,
        next: "完成一次发球练习，并记录当天身体感受。",
        createdAt: projectDate(-13),
        updatedAt: projectDate(-1),
        completed: false,
        logs: [
          demoLog("demo-log-tennis-1", projectDate(-13), "安排每周一次轻量网球练习。"),
          demoLog("demo-log-tennis-2", projectDate(-7), "完成正手和脚步练习，记录需要放慢的动作。"),
          demoLog("demo-log-tennis-3", projectDate(-1), "和朋友约好周末打一场不计分的练习赛。")
        ]
      },
      {
        id: "demo-project-writing",
        title: "写作与阅读练习",
        description: "在写作、随笔和阅读之间保持稳定的表达练习，让记录成为理解生活和整理思绪的方式。",
        symbol: "✎",
        area: "学习与创作",
        status: "长期维护",
        progress: 35,
        next: "完成一段短写作，并摘录五句喜欢的句子。",
        createdAt: projectDate(-28),
        updatedAt: projectDate(-3),
        completed: false,
        logs: [
          demoLog("demo-log-writing-1", projectDate(-20), "建立写作、古诗和阅读的主题标签。"),
          demoLog("demo-log-writing-2", projectDate(-11), "合并重复卡片，留下可复用的句子。"),
          demoLog("demo-log-writing-3", projectDate(-3), "完成第一轮素材清理。")
        ]
      },
      {
        id: "demo-project-digital",
        title: "数字艺术与星空档案",
        description: "把宇宙、星星、雪豹和小鸟等喜欢的意象整理成一组数字艺术练习，慢慢形成自己的视觉语言。",
        symbol: "✦",
        area: "数字艺术",
        status: "进行中",
        progress: 25,
        next: "完成一张以星空和小鸟为主题的数字草图。",
        createdAt: projectDate(-16),
        updatedAt: projectDate(-3),
        completed: false,
        logs: [
          demoLog("demo-log-digital-1", projectDate(-12), "收集星空、雪豹和小鸟的视觉参考。"),
          demoLog("demo-log-digital-2", projectDate(-3), "完成第一张数字艺术构图草稿。")
        ]
      },
      {
        id: "demo-project-ukulele",
        title: "Ukulele 练习小节奏",
        description: "完成一组简单和弦练习，让音乐成为日常生活里轻松、可持续的陪伴。",
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
          demoLog("demo-log-ukulele-1", projectDate(-20), "完成基础和弦和节奏练习。"),
          demoLog("demo-log-ukulele-2", projectDate(-12), "录下第一段完整的小节奏。")
        ]
      },
      {
        id: "demo-project-nature",
        title: "雪豹与小鸟观察卡片",
        description: "把自然观察、动物影像和喜欢的片段整理成一组轻量卡片，保留对世界的好奇心。",
        symbol: "□",
        area: "自然与观察",
        status: "已完成",
        progress: 100,
        next: "",
        createdAt: projectDate(-20),
        updatedAt: projectDate(-4),
        completedAt: projectDate(-4),
        completed: true,
        logs: [
          demoLog("demo-log-nature-1", projectDate(-17), "整理雪豹、小鸟和自然影像的观察主题。"),
          demoLog("demo-log-nature-2", projectDate(-4), "完成第一组观察卡片并归档。")
        ]
      }
    ];

    const demoGoalLinks = {
      "demo-project-research-direction": "demo-goal-research",
      "demo-project-writing": "demo-goal-creative",
      "demo-project-digital": "demo-goal-creative",
      "demo-project-film": "demo-goal-creative",
      "demo-project-trip": "demo-goal-life",
      "demo-project-community": "demo-goal-community",
      "demo-project-tennis": "demo-goal-health"
    };
    projects.forEach((project) => { project.goalId = demoGoalLinks[project.id] || ""; });

    return {
      ...base,
      version: 5,
      goals: [
        { id: "demo-goal-research", title: "探索一个长期研究方向", area: "研究与学习", progress: 30 },
        { id: "demo-goal-doctoral", title: "完成博士申请准备（示例）", area: "研究与学习", progress: 20 },
        { id: "demo-goal-product", title: "建立产品设计与研究作品集", area: "产品与研究", progress: 55 },
        { id: "demo-goal-healing", title: "把心理学与疗愈转化为可体验的产品", area: "心理学与疗愈", progress: 35 },
        { id: "demo-goal-health", title: "从 60 kg 开始建立稳定的身体节奏", area: "健康与体态", progress: 45 },
        { id: "demo-goal-creative", title: "维持摄影、写作与数字艺术的长期输出", area: "创作与学习", progress: 40 },
        { id: "demo-goal-life", title: "让旅行和朋友成为生活的一部分", area: "生活方式", progress: 30 },
        { id: "demo-goal-community", title: "保持对公益与社区的参与", area: "公益与生活", progress: 25 }
      ],
      priorities: [
        { id: "demo-priority-now", label: "现在", text: "完成疗愈产品用户研究框架", detail: "先写清楚对象、问题和观察方式，再开始安排访谈。" },
        { id: "demo-priority-next", label: "接下来", text: "整理研究方向与申请时间线（示例）", detail: "把研究兴趣、材料清单和下一步沟通整理成一页。" },
        { id: "demo-priority-later", label: "随后", text: "策划一次公益活动与周末旅行", detail: "邀请朋友一起参与，保留轻量、真实、可以完成的方案。" }
      ],
      projects,
      routineItems: normalizeRoutineItems(raw?.routineItems),
      milestones: [
        { id: "demo-milestone-1", title: "完成心理学阅读卡片整理", note: "从现有书目中选出可以支持产品研究的主题摘要。", done: false, createdAt: projectDate(-10), completedAt: "" },
        { id: "demo-milestone-2", title: "访谈三位潜在使用者", note: "围绕疗愈、陪伴感和日常使用场景记录真实反馈。", done: false, createdAt: projectDate(-9), completedAt: "" },
        { id: "demo-milestone-3", title: "完成第一组 Ukulele 练习", note: "保留轻松的练习节奏，不追求一次学会整首歌。", done: true, createdAt: projectDate(-14), completedAt: projectDate(-6) },
        { id: "demo-milestone-4", title: "整理胶片摄影主题", note: "确定一个街区和一组可以慢慢观察的画面。", done: false, createdAt: projectDate(-5), completedAt: "" },
        { id: "demo-milestone-5", title: "报名一次公益活动", note: "邀请朋友一起参加，让关心的事情真正发生。", done: false, createdAt: projectDate(-7), completedAt: "" },
        { id: "demo-milestone-6", title: "完成研究方向一页说明", note: "用虚构示例整理问题、方法和下一步阅读。", done: false, createdAt: projectDate(-9), completedAt: "" },
        { id: "demo-milestone-7", title: "整理博士申请材料清单（示例）", note: "只保留通用材料类别，不填写学校、导师或联系方式。", done: false, createdAt: projectDate(-8), completedAt: "" },
        { id: "demo-milestone-8", title: "完成一次网球练习", note: "记录发球、脚步和身体恢复感受。", done: true, createdAt: projectDate(-6), completedAt: projectDate(-1) },
        { id: "demo-milestone-9", title: "确定短途旅行路线草案", note: "保留一段自由时间，不填真实预订或地点信息。", done: false, createdAt: projectDate(-6), completedAt: "" },
        { id: "demo-milestone-10", title: "参加一次社区公益活动", note: "从一次轻量、可完成的活动开始。", done: false, createdAt: projectDate(-4), completedAt: "" }
      ],
      events: [
        { id: "demo-event-1", date: today, title: "疗愈产品研究讨论", copy: "整理用户研究框架和待确认问题。" },
        { id: "demo-event-2", date: projectDate(2), title: "研究方向整理（示例）", copy: "把研究兴趣和申请准备拆成几个可以推进的小步骤。" },
        { id: "demo-event-3", date: projectDate(3), title: "周末网球与朋友见面", copy: "记录身体感受，也留出轻松聊天的时间。" },
        { id: "demo-event-4", date: projectDate(8), title: "公益活动报名截止", copy: "确认参加方式，并邀请朋友一起行动。" },
        { id: "demo-event-5", date: projectDate(12), title: "胶片摄影小旅行", copy: "带上相机，拍一组街道、天空和沿途的小鸟。" },
        { id: "demo-event-6", date: projectDate(17), title: "朋友聚会主题讨论", copy: "选一个不需要复杂准备的主题，一起吃饭或散步。" }
      ],
      days,
      workoutPlanChanges: Array.isArray(raw?.workoutPlanChanges) ? raw.workoutPlanChanges : base.workoutPlanChanges,
      supplementaryTraining: normalizeSupplementaryTraining(raw?.supplementaryTraining),
      weightHistory: [-28, -24, -20, -16, -12, -9, -6, -3, 0].map((offset, index) => ({
        date: addDays(today, offset),
        weight: [60.0, 59.8, 59.6, 59.3, 59.1, 58.9, 58.6, 58.4, 58.2][index]
      })),
      reminders: [],
      focusSeconds: 1500,
      migratedToV2: true,
      nonPersonalDemoDataApplied: true,
      demoLanguageRecordsApplied: true,
      demoInspirationTrailApplied: true,
      demoInspirationTrailVersion: 3
    };
  }

  function loadState(strict = false) {
    const base = defaultState();
    try {
      if (localStorage.getItem(RESET_MARKER) === "true") return clearedState(base);
      const raw = JSON.parse(localStorage.getItem(STORE) || "null");
      if (!raw || typeof raw !== "object") return buildDemoState(base, null);
      const resettingNonFitnessData = Number(raw.version) < 5 || raw.nonPersonalDemoDataApplied !== true;
      const input = resettingNonFitnessData
        ? buildDemoState(base, raw)
        : raw;
      const normalizedBreezeGuide = normalizeBreezeGuide(input.breezeGuide, base.breezeGuide);
      const breezeGuideChanged = JSON.stringify(normalizedBreezeGuide) !== JSON.stringify(input.breezeGuide || null);
      const inspirationTrailNeedsExpansion = input.nonPersonalDemoDataApplied === true && input.demoInspirationTrailApplied !== true;
      const inspirationTrailNeedsRefresh = input.nonPersonalDemoDataApplied === true && Number(input.demoInspirationTrailVersion) !== 3;
      const merged = {
        ...base,
        ...input,
        version: 5,
        goals: Array.isArray(input.goals) ? input.goals : base.goals,
        priorities: Array.isArray(input.priorities) ? input.priorities : base.priorities,
        projects: Array.isArray(input.projects) ? input.projects : base.projects,
        projectAreas: normalizeProjectAreas(input.projectAreas, Array.isArray(input.projects) ? input.projects : base.projects),
        milestones: Array.isArray(input.milestones) ? input.milestones : base.milestones,
        events: Array.isArray(input.events) ? input.events.map((event) => ({ ...event, repeat: ["weekly", "monthly", "yearly"].includes(event?.repeat) ? event.repeat : "none" })) : [],
        days: input.days && typeof input.days === "object" ? input.days : {},
        workoutPlanChanges: Array.isArray(input.workoutPlanChanges) ? input.workoutPlanChanges : [],
        supplementaryTraining: normalizeSupplementaryTraining(input.supplementaryTraining),
        weightHistory: Array.isArray(input.weightHistory) ? input.weightHistory : [],
        routineItems: normalizeRoutineItems(input.routineItems),
        breezeGuide: normalizedBreezeGuide,
        demoInspirationTrailApplied: input.demoInspirationTrailApplied === true,
        demoInspirationTrailVersion: Number(input.demoInspirationTrailVersion) || 0
      };
      let appliedDemoLanguageRecords = false;
      let appliedDemoInspirationTrail = false;
      let refreshedDemoInspirationTrail = false;
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
            items: normalizeWorkoutPlanItems(change.plan.items)
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
              items: normalizeWorkoutPlanItems(day.workoutPlan.items)
            }
          });
          day.workoutPlan = null;
        }
      });
      if (merged.nonPersonalDemoDataApplied === true && merged.demoLanguageRecordsApplied !== true) {
        addDemoEnglishInspirationRecords(merged.days);
        merged.demoLanguageRecordsApplied = true;
        appliedDemoLanguageRecords = true;
      }
      if (inspirationTrailNeedsExpansion) {
        addDemoInspirationTrail(merged.days);
        merged.demoInspirationTrailApplied = true;
        appliedDemoInspirationTrail = true;
      }
      if (inspirationTrailNeedsRefresh) {
        refreshedDemoInspirationTrail = refreshLegacyDemoInspirationTrail(merged.days);
        refreshedDemoInspirationTrail = dedupeDemoInspirationRecords(merged.days) || refreshedDemoInspirationTrail;
        merged.demoInspirationTrailVersion = 3;
      }
      merged.workoutPlanChanges = [...workoutChanges.values()].sort((a, b) => a.effectiveFrom.localeCompare(b.effectiveFrom));
      merged.projects.forEach((project) => {
        project.status = PROJECT_STATUS_ALIASES[project.status] || "未开始";
        project.logs = Array.isArray(project.logs) ? project.logs : [];
        project.description = String(project.description ?? project.next ?? "").trim();
        project.next = String(project.next || "").trim();
        project.daily = project.daily && typeof project.daily === "object" && !Array.isArray(project.daily) ? project.daily : {};
        Object.entries(project.daily).forEach(([date, record]) => {
          if (!isDateKey(date) || !record || typeof record !== "object") {
            delete project.daily[date];
            return;
          }
          project.daily[date] = {
            description: String(record.description || "").trim(),
            next: String(record.next || "").trim(),
            logId: String(record.logId || "")
          };
        });
        project.createdAt = isDateKey(project.createdAt) ? project.createdAt : "";
        project.completedAt = isDateKey(project.completedAt) ? project.completedAt : "";
        project.completed = project.completed === true || project.status === "已完成";
        project.goalId = merged.goals.some((goal) => goal.id === project.goalId) ? String(project.goalId) : "";
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
        raw.reminders.filter((item) => !["r1", "r2", "r3"].includes(item?.id) && !item.done && item.text).forEach((item) => {
          if (!day.tasks.some((task) => task.text === item.text)) {
            day.tasks.push({ id: uid("task"), text: item.text, done: false, area: "生活" });
          }
        });
        merged.days[todayKey()] = day;
      }
      const removedLegacyPersonalDemoContent = removeLegacyPersonalDemoContent(merged);
      merged.migratedToV2 = true;
      if (resettingNonFitnessData || appliedDemoLanguageRecords || appliedDemoInspirationTrail || refreshedDemoInspirationTrail || inspirationTrailNeedsRefresh || breezeGuideChanged || removedLegacyPersonalDemoContent) localStorage.setItem(STORE, JSON.stringify(merged));
      return merged;
    } catch (error) {
      if (strict) throw error;
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
    ["notes", "inspiration", "inspirationEn", "mood", "energy", "calories", "food"].forEach((field) => {
      if (day[field] == null) day[field] = "";
    });
    if (!String(day.inspiration || "").trim() && String(day.inspirationEn || "").trim()) {
      day.inspiration = day.inspirationEn;
    }
    return day;
  }

  let state = loadState();
  let lastSavedContent = backupDataContent(state);
  let deviceId = localStorage.getItem(DEVICE_STORE) || crypto.randomUUID();
  localStorage.setItem(DEVICE_STORE, deviceId);
  state.projectAreas = normalizeProjectAreas(state.projectAreas, state.projects);
  let backupPreferences = readBackupPreferences();
  let backupDirectory = null;
  let backupInitialized = false;
  let backupInProgress = false;
  let backupIssue = "";
  let externalBackup = null;
  let externalCheckAt = 0;
  let externalCheckFailed = false;
  let externalChecking = false;
  let ignoredBackupVersions = new Set(backupPreferences.ignoredVersions || []);
  let backupReviewButton = null;
  let selectedDate = todayKey();
  let selectedFitnessDate = todayKey();
  const projectReviewDates = new Map();
  const calendarPanelDates = { workout: selectedDate, work: selectedDate, projects: selectedDate, inspiration: selectedDate };
  let monthCursor = fromKey(todayKey());
  monthCursor.setDate(1);
  let calendarYear = fromKey(todayKey()).getFullYear();
  let fitnessMonthCursor = fromKey(todayKey());
  fitnessMonthCursor.setDate(1);
  function resetDateContextToToday() {
    const today = todayKey();
    const date = fromKey(today);
    selectedDate = today;
    selectedFitnessDate = today;
    resetCalendarPanelDates(today);
    projectReviewDates.clear();
    monthlyActivityMonth = today.slice(0, 7);
    calendarYear = date.getFullYear();
    monthCursor = new Date(date.getFullYear(), date.getMonth(), 1);
    fitnessMonthCursor = new Date(date.getFullYear(), date.getMonth(), 1);
  }
  let editingGoals = false;
  let editingPriorities = false;
  const editingProjectIds = new Set();
  const projectTextDrafts = new Map();
  let projectDragState = null;
  let editingMasterTodos = false;
  let masterTodosExpanded = false;
  let masterTodoDragState = null;
  let editingEventId = null;
  let editingWorkoutDate = null;
  let workoutDraft = null;
  let workoutDragState = null;
  let editingCalendarHealthDate = null;
  const expandedCalendarPanels = new Set();
  let calendarHealthDraft = null;
  let calendarHealthInitialDraft = null;
  let calendarHealthDraftDirty = false;
  let editingRoutines = false;
  let routineDragState = null;
  let monthlyActivityMonth = todayKey().slice(0, 7);
  let monthlyActivityExpanded = false;
  let editingSupplementaryTraining = false;
  let completedProjectFilter = "全部";
  let projectStatusFilter = "all";
  let projectAreaFilter = "all";
  let footprintsYearFilter = "all";
  let footprintsMonthFilter = "all";
  let footprintsZoom = 3;
  let footprintsExpanded = false;
  const HEALTH_TREND_PANELS = ["weight", "mood", "water", "calories"];
  let healthTrendPanel = "weight";
  let calorieTableExpanded = false;
  let viewingHomeInspiration = false;
  let breezeEntryIndex = 0;
  let homeBreezeEntryIndex = 0;
  let homeLateLineIndex = 0;
  let homeBreezeRotationTimer = null;
  let breezeEditorId = null;
  let breezeHistoryOpen = false;
  let projectAreasReturnFocus = null;
  let globalSearchTimer = null;
  let globalSearchMatches = [];
  let globalSearchQuery = "";
  let globalSearchVisibleCount = 30;
  let globalSearchActiveIndex = -1;

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

  function currentBreezePeriod() {
    return breezePeriodForNow();
  }

  function currentBreezeEntries() {
    const entries = Array.isArray(state.breezeGuide?.entries) ? state.breezeGuide.entries : [];
    return entries.length ? entries : normalizeBreezeGuide().entries;
  }

  function breezeEntryText(entry) {
    if (!entry) return "";
    if (entry.source === "user") return String(entry.text || entry.zh || entry.en || "").trim();
    return String(currentLanguage === "en" ? (entry.en || entry.zh) : (entry.zh || entry.en) || "").trim();
  }

  function breezeQuoteText(entry, period = currentBreezePeriod()) {
    const text = breezeEntryText(entry);
    return text || uiText("留下一句给自己的话", "Leave a line for yourself");
  }

  function syncHomeBreezeTitle() {
    const homeOverviewTitle = document.getElementById("homeOverviewTitle");
    const periodNode = document.getElementById("homeBreezePeriod");
    const copyNode = document.getElementById("homeBreezeCopy");
    if (!homeOverviewTitle || !periodNode || !copyNode) return;
    const period = currentBreezePeriod();
    periodNode.textContent = `${uiText(period.zh, period.en)}!`;
    if (period.id === "late") {
      const line = LATE_NIGHT_LINES[homeLateLineIndex % LATE_NIGHT_LINES.length];
      copyNode.textContent = uiText(line.zh, line.en);
      return;
    }
    const entries = currentBreezeEntries();
    homeBreezeEntryIndex = Math.min(homeBreezeEntryIndex, Math.max(0, entries.length - 1));
    copyNode.textContent = breezeQuoteText(entries[homeBreezeEntryIndex], period);
  }

  function rotateHomeBreezeTitle() {
    if (currentBreezePeriod().id === "late") {
      if (LATE_NIGHT_LINES.length > 1) {
        let nextIndex = Math.floor(Math.random() * LATE_NIGHT_LINES.length);
        if (nextIndex === homeLateLineIndex) nextIndex = (nextIndex + 1) % LATE_NIGHT_LINES.length;
        homeLateLineIndex = nextIndex;
      } else {
        homeLateLineIndex = 0;
      }
      syncHomeBreezeTitle();
      return;
    }
    const entries = currentBreezeEntries();
    if (entries.length > 1) {
      let nextIndex = Math.floor(Math.random() * entries.length);
      if (nextIndex === homeBreezeEntryIndex) nextIndex = (nextIndex + 1) % entries.length;
      homeBreezeEntryIndex = nextIndex;
    } else {
      homeBreezeEntryIndex = 0;
    }
    syncHomeBreezeTitle();
  }

  function scheduleHomeBreezeRotation() {
    if (homeBreezeRotationTimer) window.clearInterval(homeBreezeRotationTimer);
    homeBreezeRotationTimer = window.setInterval(rotateHomeBreezeTitle, 60 * 60 * 1000);
  }

  function renderBreezeGuide(animate = false) {
    const panel = document.getElementById("northStarPanel");
    const quote = document.getElementById("northStarQuote");
    const periodLabel = document.getElementById("breezePeriodLabel");
    const editor = document.getElementById("breezeEditor");
    const history = document.getElementById("breezeHistory");
    const historyToggle = document.getElementById("breezeHistoryToggle");
    if (!panel || !quote || !periodLabel || !editor || !history || !historyToggle) return;
    const period = currentBreezePeriod();
    const entries = currentBreezeEntries();
    if (breezeEntryIndex >= entries.length) breezeEntryIndex = Math.max(0, entries.length - 1);
    const entry = entries[breezeEntryIndex];
    periodLabel.textContent = `${breezeEntryIndex + 1}/${entries.length}`;
    quote.textContent = breezeEntryText(entry) || uiText("留下一句给自己的话", "Leave a line for yourself");
    if (animate) {
      panel.classList.remove("is-switching");
      requestAnimationFrame(() => {
        panel.classList.add("is-switching");
        window.setTimeout(() => panel.classList.remove("is-switching"), 760);
      });
    }
    editor.hidden = breezeEditorId === null;
    if (!editor.hidden) {
      const editing = breezeEditorId !== "new" ? state.breezeGuide.entries.find((item) => item.id === breezeEditorId) : null;
      const value = editing ? breezeEntryText(editing) : "";
      editor.innerHTML = `<label class="sr-only" for="breezeEditorInput">${uiText("微风指南内容", "Breeze guide entry")}</label><textarea class="textarea" id="breezeEditorInput" maxlength="160" placeholder="${uiText("写下一句想留给自己的话", "Write a line to keep with you")}">${esc(value)}</textarea><div class="breeze-editor-actions"><button class="btn green" type="button" data-action="breeze-save">${uiText("保存", "Save")}</button><button class="btn secondary" type="button" data-action="breeze-cancel">${uiText("取消", "Cancel")}</button></div>`;
    }
    history.hidden = !breezeHistoryOpen;
    historyToggle.textContent = breezeHistoryOpen ? uiText("收起", "Collapse") : uiText("展开", "Expand");
    if (breezeHistoryOpen) {
      history.innerHTML = entries.length ? entries.map((item, index) => `<div class="breeze-history-row ${index === breezeEntryIndex ? "is-current" : ""}" data-breeze-entry="${esc(item.id)}"><div class="breeze-history-copy"><small>${esc(item.updatedAt || item.createdAt || "")}</small><p>${esc(breezeEntryText(item))}</p></div><div class="breeze-history-actions"><button class="text-btn" type="button" data-action="breeze-edit" data-breeze-id="${esc(item.id)}">${uiText("修改", "Edit")}</button><button class="text-btn danger-text-btn" type="button" data-action="breeze-delete" data-breeze-id="${esc(item.id)}">${uiText("删除", "Delete")}</button></div></div>`).join("") : `<div class="empty-state">${uiText("还没有记录。", "No entries yet.")}</div>`;
    } else {
      history.innerHTML = "";
    }
  }

  function saveBreezeEntry() {
    const input = document.getElementById("breezeEditorInput");
    const text = String(input?.value || "").trim();
    if (!text) {
      notify(uiText("先写下一句话", "Write something first"));
      return;
    }
    const period = currentBreezePeriod().id;
    if (!state.breezeGuide || !Array.isArray(state.breezeGuide.entries)) state.breezeGuide = createDefaultBreezeGuide();
    if (breezeEditorId === "new") {
      const entry = {
        id: uid("breeze"),
        period,
        zh: currentLanguage === "zh" ? text : "",
        en: currentLanguage === "en" ? text : "",
        source: "user",
        text,
        language: currentLanguage,
        createdAt: todayKey(),
        updatedAt: todayKey()
      };
      state.breezeGuide.entries.push(entry);
      breezeEntryIndex = currentBreezeEntries().length - 1;
    } else {
      const entry = state.breezeGuide.entries.find((item) => item.id === breezeEditorId);
      if (entry) {
        if (entry.source === "user") {
          entry.text = text;
          entry.language = currentLanguage;
          entry[currentLanguage === "en" ? "en" : "zh"] = text;
        } else {
          entry[currentLanguage === "en" ? "en" : "zh"] = text;
          if (!entry.zh) entry.zh = text;
          if (!entry.en) entry.en = text;
        }
        entry.updatedAt = todayKey();
      }
    }
    breezeEditorId = null;
    save();
    renderBreezeGuide();
    renderHome();
    notify(uiText("微风指南已保存", "Breeze guide saved"));
  }

  function save() {
    if (saveTimer !== null) {
      clearTimeout(saveTimer);
      saveTimer = null;
    }
    const content = backupDataContent(state);
    if (!state._sync?.revision || content !== lastSavedContent) {
      const previous = state._sync || {};
      state._sync = { revision: crypto.randomUUID(), ancestors: [...new Set([previous.revision, ...(previous.ancestors || [])].filter(Boolean))].slice(0, 128), modifiedAt: new Date().toISOString(), deviceId };
    }
    localStorage.removeItem(RESET_MARKER);
    localStorage.setItem(STORE, JSON.stringify(state));
    lastSavedContent = content;
  }

  const SAVE_DEBOUNCE_MS = 300;
  let saveTimer = null;

  function scheduleSave() {
    if (saveTimer !== null) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      save();
    }, SAVE_DEBOUNCE_MS);
  }

  function flushSave() {
    if (saveTimer !== null) save();
  }

  function readBackupPreferences() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(BACKUP_PREFERENCES_STORE) || "{}") || {}; } catch { /* Use opt-in defaults. */ }
    const timestamp = (value) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? value : "";
    return {
      enabled: saved.enabled === true,
      interval: BACKUP_INTERVALS.includes(saved.interval) ? saved.interval : "weekly",
      enabledAt: timestamp(saved.enabledAt),
      lastSuccessfulAt: timestamp(saved.lastSuccessfulAt),
      lastExportRequestedAt: timestamp(saved.lastExportRequestedAt),
      ignoredVersions: Array.isArray(saved.ignoredVersions) ? saved.ignoredVersions.filter((id) => typeof id === "string").slice(-10000) : [],
      lastFileName: typeof saved.lastFileName === "string" ? saved.lastFileName : ""
    };
  }

  function persistBackupPreferences() {
    localStorage.setItem(BACKUP_PREFERENCES_STORE, JSON.stringify(backupPreferences));
  }

  function supportsBackupDirectory() {
    return window.isSecureContext && typeof window.showDirectoryPicker === "function" && Boolean(window.indexedDB);
  }

  function backupDirectoryStorage(write = false, directory = null) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(BACKUP_DATABASE, 1);
      request.onupgradeneeded = () => request.result.createObjectStore("handles");
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const database = request.result;
        database.onversionchange = () => database.close();
        const transaction = database.transaction("handles", write ? "readwrite" : "readonly");
        const store = transaction.objectStore("handles");
        const operation = write ? (directory ? store.put(directory, "directory") : store.delete("directory")) : store.get("directory");
        let result = null;
        operation.onsuccess = () => { result = operation.result; };
        transaction.oncomplete = () => { database.close(); resolve(result); };
        transaction.onabort = () => { database.close(); reject(transaction.error); };
        transaction.onerror = () => { database.close(); reject(transaction.error); };
      };
    });
  }

  function nextBackupAt(preferences = backupPreferences, directoryMode = supportsBackupDirectory()) {
    // A first directory backup is due immediately; reminder-only mode starts its clock on opt-in.
    const anchor = directoryMode ? preferences.lastSuccessfulAt : (preferences.lastExportRequestedAt || preferences.lastSuccessfulAt || preferences.enabledAt);
    if (!anchor) return 0;
    const next = new Date(anchor);
    if (preferences.interval === "monthly") {
      const day = next.getDate();
      next.setDate(1);
      next.setMonth(next.getMonth() + 1);
      const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
      next.setDate(Math.min(day, lastDay));
    } else {
      next.setDate(next.getDate() + (preferences.interval === "daily" ? 1 : 7));
    }
    return next.getTime();
  }

  function backupPayload(exportedAt = new Date().toISOString()) {
    return JSON.stringify({ app: "kinetic-life-os", exportedAt, sync: state._sync || null, data: state }, null, 2);
  }

  function backupDataContent(data) {
    const { _sync, ...content } = data;
    return JSON.stringify(content);
  }

  function parseBackupText(text) {
    const parsed = JSON.parse(text);
    const data = parsed.data || parsed;
    if (parsed.app && parsed.app !== "kinetic-life-os") throw new Error("foreign-backup");
    if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.projects) || !Array.isArray(data.goals) || !data.days || typeof data.days !== "object" || Array.isArray(data.days)) throw new Error("invalid-backup");
    if (data.version !== 5 || data.nonPersonalDemoDataApplied !== true) throw new Error("unsupported-backup-version");
    const sync = parsed.sync || data._sync || null;
    if (sync && (typeof sync.revision !== "string" || !Array.isArray(sync.ancestors) || !sync.ancestors.every((id) => typeof id === "string") || !Number.isFinite(Date.parse(sync.modifiedAt)))) throw new Error("invalid-backup-version");
    return { app: "kinetic-life-os", data, sync, exportedAt: typeof parsed.exportedAt === "string" ? parsed.exportedAt : "" };
  }

  function backupRelation(backup, local = state) {
    if (backupDataContent(backup.data) === backupDataContent(local)) return "same";
    const remote = backup.sync;
    const current = local._sync;
    if (!remote?.revision || !current?.revision) return "unverified";
    if (remote.revision === current.revision) return "conflict";
    if (current.ancestors?.includes(remote.revision)) return "older";
    if (remote.ancestors?.includes(current.revision)) return "newer";
    return "conflict";
  }

  function backupVersionKey(backup) {
    return backup.sync?.revision || `legacy:${backup.exportedAt}:${backup.name || ""}`;
  }

  async function checkExternalBackups(force = false) {
    if (!backupDirectory || typeof backupDirectory.values !== "function") return false;
    if (externalBackup || externalChecking) return true;
    if (!force && Date.now() - externalCheckAt < 60_000) return Boolean(externalBackup || externalCheckFailed);
    externalCheckAt = Date.now();
    externalCheckFailed = false;
    externalChecking = true;
    const candidates = [];
    let acknowledged = false;
    try {
      if (await backupDirectory.queryPermission({ mode: "read" }) !== "granted") throw new Error("permission");
      for await (const handle of backupDirectory.values()) {
        if (handle.kind !== "file" || !handle.name.endsWith(".json")) continue;
        const file = await handle.getFile();
        if (file.size > 2e6) continue;
        let candidate;
        try { candidate = { ...parseBackupText(await file.text()), name: handle.name }; } catch { continue; }
        const relation = backupRelation(candidate);
        if (["same", "older"].includes(relation)) {
          // Remember observed ancestors before the bounded lineage ages out.
          if (candidate.sync?.revision && !ignoredBackupVersions.has(candidate.sync.revision)) {
            ignoredBackupVersions.add(candidate.sync.revision);
            acknowledged = true;
          }
          continue;
        }
        if (ignoredBackupVersions.has(backupVersionKey(candidate))) continue;
        candidates.push({ ...candidate, name: handle.name, relation });
      }
      candidates.sort((a, b) => (Date.parse(b.sync?.modifiedAt || b.exportedAt) || 0) - (Date.parse(a.sync?.modifiedAt || a.exportedAt) || 0));
      if (acknowledged) {
        backupPreferences.ignoredVersions = [...ignoredBackupVersions].slice(-10000);
        persistBackupPreferences();
      }
      externalBackup ||= candidates[0] || null;
      renderBackupSync();
      return Boolean(externalBackup);
    } catch {
      externalCheckFailed = true;
      renderBackupSync();
      return true;
    } finally {
      externalChecking = false;
    }
  }

  function renderBackupSync() {
    const panel = document.getElementById("backupSyncSettings");
    const notice = document.getElementById("backupSyncNotice");
    if (!panel || !notice) return;
    panel.innerHTML = `<h3>${uiText("云盘文件接力", "Cloud-folder handoff")}</h3><p>${uiText("电脑端随已开启的自动备份检查文件夹更新；手机请从“文件”选择 iCloud 备份。导入会替换本机记录，不会自动合并两端修改。", "Desktop checks the authorized folder with scheduled backups. On mobile, choose an iCloud file. Import replaces local records; edits are not automatically merged.")}</p><div class="settings-actions">${supportsBackupDirectory() ? `<button class="btn secondary" type="button" data-action="check-backup-updates">${uiText("检查文件夹更新", "Check folder updates")}</button>` : ""}<label class="btn secondary file-btn">${uiText("从 iCloud / 文件选择备份", "Choose backup from Files / iCloud")}<input id="cloudImportInput" type="file" accept="application/json,.json" aria-label="${uiText("选择云盘备份", "Choose cloud backup")}" /></label>${localStorage.getItem(RECOVERY_STORE) ? `<button class="text-btn" type="button" data-action="download-import-recovery">${uiText("下载导入前快照", "Download pre-import snapshot")}</button>` : ""}</div>${externalCheckFailed ? `<p class="backup-error" role="status">${uiText("暂时无法检查文件夹，自动写入已暂停。请确认云盘文件已下载、文件夹授权有效，再点击检查。", "Folder check failed. Automatic writes are paused. Download cloud files, confirm folder access, and retry.")}</p>` : ""}`;
    notice.hidden = !externalBackup;
    notice.innerHTML = externalBackup ? `<span>${uiText("备份文件夹有不同版本，请确认是否导入。自动备份已暂停。", "A different backup version is available. Automatic backups are paused pending your choice.")}</span><button class="text-btn" type="button" data-action="review-external-backup">${uiText("查看备份", "Review backup")}</button>` : "";
  }

  function reviewBackup(backup, name = "") {
    flushSave();
    externalBackup = { ...backup, name, relation: backupRelation(backup) };
    const dialog = document.getElementById("backupImportDialog");
    const date = backup.sync?.modifiedAt || backup.exportedAt;
    const status = { same: uiText("内容与本机相同", "Same data as this device"), older: uiText("这是较旧的数据版本", "This is an older data version"), newer: uiText("包含本机版本之后的更新", "Contains updates after this device's version"), conflict: uiText("两端存在不同修改，导入将覆盖本机版本", "Different edits exist. Import will replace this device's version."), unverified: uiText("旧格式备份，无法核实版本先后", "Legacy backup: version order cannot be verified") }[externalBackup.relation];
    document.getElementById("backupImportSummary").textContent = `${status}。 ${date ? new Date(date).toLocaleString() : uiText("时间未知", "Unknown date")} · ${backup.data.projects.length} ${uiText("个项目", "projects")} · ${Object.keys(backup.data.days).length} ${uiText("天记录", "recorded days")}`;
    document.getElementById("backupImportFile").textContent = name;
    backupReviewButton = document.activeElement;
    if (!dialog.open) dialog.showModal();
    document.getElementById("backupImportCancel").focus();
    renderBackupSync();
  }

  function closeBackupReview() {
    document.getElementById("backupImportDialog").close();
    backupReviewButton?.focus?.({ preventScroll: true });
  }

  function applyReviewedBackup() {
    if (!externalBackup || backupInProgress) return false;
    flushSave();
    const candidate = externalBackup;
    const before = { data: localStorage.getItem(STORE), reset: localStorage.getItem(RESET_MARKER), state, content: lastSavedContent };
    // Persist a complete recovery copy before replacing any user data.
    try {
      localStorage.setItem(RECOVERY_STORE, backupPayload());
      const incoming = { ...candidate.data };
      if (candidate.sync) incoming._sync = candidate.sync;
      localStorage.removeItem(RESET_MARKER);
      localStorage.setItem(STORE, JSON.stringify(incoming));
      state = loadState(true);
      lastSavedContent = backupDataContent(incoming);
      save();
    } catch {
      state = before.state;
      lastSavedContent = before.content;
      try {
        if (before.data === null) localStorage.removeItem(STORE); else localStorage.setItem(STORE, before.data);
        if (before.reset === null) localStorage.removeItem(RESET_MARKER); else localStorage.setItem(RESET_MARKER, before.reset);
      } catch { /* The in-memory data remains intact if storage is unavailable. */ }
      const message = uiText("无法安全保存导入前快照或新数据，未完成导入。请先手动导出并检查存储空间。", "Import could not be saved safely. Export your data and check storage space.");
      const summary = document.getElementById("backupImportSummary");
      if (summary) summary.textContent = message;
      notify(message);
      return false;
    }
    editingProjectIds.clear();
    projectTextDrafts.clear();
    externalBackup = null;
    externalCheckAt = 0;
    closeBackupReview();
    renderAll();
    renderBackupSync();
    notify(uiText("备份已导入，导入前快照已保留", "Backup imported. The previous snapshot was retained."));
    return true;
  }

  function backupIssueText() {
    if (backupIssue === "permission") return uiText("文件夹授权已失效，请重新授权后继续备份。", "Folder access has expired. Authorize it again to resume backups.");
    if (backupIssue === "folder") return uiText("找不到已授权的备份文件夹，请重新选择。", "The backup folder is unavailable. Please choose it again.");
    if (backupIssue === "settings") return uiText("无法保存备份设置，请检查浏览器存储空间。", "Backup settings could not be saved. Check browser storage space.");
    if (backupIssue === "write") return uiText("备份写入失败，未更新成功时间。请检查文件夹权限和磁盘空间后重试。", "The backup could not be written. The success time was not advanced. Check folder access and disk space, then retry.");
    return "";
  }

  function renderAutoBackupSettings() {
    const panel = document.getElementById("autoBackupSettings");
    const notice = document.getElementById("backupNotice");
    if (!panel || !notice) return;
    const directoryMode = supportsBackupDirectory();
    const enabled = backupPreferences.enabled;
    const disabled = backupInProgress || !backupInitialized ? "disabled" : "";
    const dateText = (value) => value ? new Date(value).toLocaleString(currentLanguage === "en" ? "en-US" : "zh-CN") : uiText("尚无", "None yet");
    const issue = backupIssueText();
    const markup = `
      <div class="auto-backup-heading"><h3>${uiText("定期自动备份", "Scheduled local backups")}</h3><span class="tag ${enabled ? "green" : "neutral"}">${enabled ? (directoryMode ? uiText("已开启", "Enabled") : uiText("仅提醒", "Reminders only")) : uiText("未开启", "Off")}</span></div>
      <p class="backup-description">${uiText("按所选周期备份；仅在打开或前台使用时检查，关闭期间到期的备份会在下次打开时补做。", "Back up at your selected interval while the app is open or in the foreground. Overdue backups are handled on the next visit.")}</p>
      <div class="auto-backup-controls"><label class="field" for="autoBackupInterval"><span>${uiText("备份频率", "Backup frequency")}</span><select class="select" id="autoBackupInterval" ${disabled}>${[["daily", "每天", "Daily"], ["weekly", "每周", "Weekly"], ["monthly", "每月", "Monthly"]].map(([value, zh, en]) => `<option value="${value}" ${value === backupPreferences.interval ? "selected" : ""}>${uiText(zh, en)}</option>`).join("")}</select></label><dl class="auto-backup-status">
        <div><dt>${uiText("最近成功自动备份", "Last automatic backup")}</dt><dd>${esc(dateText(backupPreferences.lastSuccessfulAt))}</dd></div>
        ${backupDirectory ? `<div><dt>${uiText("备份文件夹", "Backup folder")}</dt><dd>${esc(backupDirectory.name)}</dd></div>` : ""}
        ${!directoryMode && backupPreferences.lastExportRequestedAt ? `<div><dt>${uiText("最近手动下载请求", "Last manual download request")}</dt><dd>${esc(dateText(backupPreferences.lastExportRequestedAt))}</dd></div>` : ""}
      </dl></div>
      ${backupPreferences.lastFileName ? `<details class="backup-file-details"><summary>${uiText("查看最近备份文件名", "View latest backup filename")}</summary><code class="backup-file-name">${esc(backupPreferences.lastFileName)}</code></details>` : ""}
      ${directoryMode && !enabled ? `<p class="backup-setup-hint">${uiText("首次开启请选择并授权一个备份文件夹。", "Choose and authorize a backup folder when enabling for the first time.")}</p>` : ""}
      <p class="backup-storage-note">${directoryMode ? uiText("JSON 写入你选择的文件夹；若选择 iCloud 等云盘目录，将由云盘服务同步。每次生成新文件，不覆盖旧备份。", "JSON files are written to your selected folder. Your cloud service syncs cloud folders such as iCloud. Each backup is a new file; earlier backups are not overwritten.") : uiText("当前浏览器仅支持到期提醒，不能自动写入文件夹。请手动导出，并在下载目录确认文件已保存。", "This browser supports reminders only, not automatic folder writes. Export manually and confirm the file in your downloads.")}</p>
      ${issue ? `<p class="backup-error" role="alert">${esc(issue)}</p>` : ""}
      ${backupInProgress ? `<p role="status">${uiText("正在保存备份，请保持此页面打开…", "Saving a backup. Keep this page open…")}</p>` : ""}
      <div class="settings-actions">${!enabled
        ? `<button class="btn green" type="button" data-action="enable-auto-backup" ${disabled}>${directoryMode ? uiText("开启并选择文件夹", "Enable and choose folder") : uiText("开启备份提醒", "Enable reminders")}</button>`
        : `${directoryMode ? `<button class="btn green" type="button" data-action="${backupIssue === "permission" ? "authorize-backup" : backupDirectory ? "backup-now" : "choose-backup-folder"}" ${disabled}>${backupIssue === "permission" ? uiText("重新授权并备份", "Authorize and back up") : uiText("立即备份", "Back up now")}</button><button class="btn secondary" type="button" data-action="choose-backup-folder" ${disabled}>${uiText("更换文件夹", "Change folder")}</button>` : `<button class="btn green" type="button" data-action="export">${uiText("导出备份", "Export backup")}</button>`}<button class="btn secondary" type="button" data-action="disable-auto-backup" ${disabled}>${uiText("关闭自动备份", "Turn off scheduled backups")}</button>`}
      </div>`;
    if (panel.innerHTML !== markup) panel.innerHTML = markup;
    const overdueReminder = enabled && !directoryMode && Date.now() >= nextBackupAt();
    const noticeText = enabled ? (issue || (overdueReminder ? uiText("备份已到期：请导出一份 JSON，并确认文件已保存。", "Backup due: export a JSON file and confirm it was saved.") : "")) : "";
    notice.hidden = !noticeText;
    const noticeMarkup = noticeText ? `<span>${esc(noticeText)}</span><button class="text-btn" type="button" data-page="settings">${uiText("设置与备份", "Settings & backup")} →</button>` : "";
    if (notice.innerHTML !== noticeMarkup) notice.innerHTML = noticeMarkup;
    renderBackupSync();
  }

  async function runAutomaticBackup(force = false) {
    if (!backupInitialized || !backupPreferences.enabled || backupInProgress || (!force && document.visibilityState === "hidden")) return false;
    if (!supportsBackupDirectory()) { renderAutoBackupSettings(); return false; }
    if (!backupDirectory) { backupIssue = "folder"; renderAutoBackupSettings(); return false; }
    backupInProgress = true;
    backupIssue = "";
    renderAutoBackupSettings();
    let writer;
    try {
      flushSave();
      if (await checkExternalBackups(force)) return false;
      if (!force && (backupIssue || Date.now() < nextBackupAt())) return false;
      if (await backupDirectory.queryPermission({ mode: "readwrite" }) !== "granted") {
        backupIssue = "permission";
        return false;
      }
      save();
      const exportedAt = new Date().toISOString();
      const payload = backupPayload(exportedAt);
      const fileName = `life-workbench-backup-${exportedAt.replace(/[:.]/g, "-")}-${crypto.randomUUID()}.json`;
      const file = await backupDirectory.getFileHandle(fileName, { create: true });
      writer = await file.createWritable();
      await writer.write(payload);
      await writer.close();
      writer = null;
      backupPreferences.lastSuccessfulAt = new Date().toISOString();
      backupPreferences.lastFileName = fileName;
      try { persistBackupPreferences(); } catch { backupIssue = "settings"; }
      if (force) notify(uiText("备份文件已保存", "Backup file saved"));
      return true;
    } catch (error) {
      if (writer) { try { await writer.abort(); } catch { /* The failed stream may already be closed. */ } }
      backupIssue = error?.name === "NotAllowedError" || error?.name === "SecurityError" ? "permission" : "write";
      return false;
    } finally {
      backupInProgress = false;
      renderAutoBackupSettings();
    }
  }

  async function chooseBackupFolder() {
    try {
      const directory = await window.showDirectoryPicker({ mode: "readwrite", id: "kinetic-life-os-backups" });
      await backupDirectoryStorage(true, directory);
      backupDirectory = directory;
      backupPreferences.enabled = true;
      backupPreferences.enabledAt = new Date().toISOString();
      persistBackupPreferences();
      backupIssue = "";
      await runAutomaticBackup(true);
    } catch (error) {
      if (error?.name !== "AbortError") backupIssue = "settings";
      renderAutoBackupSettings();
    }
  }

  async function initializeAutoBackup() {
    try {
      if (backupPreferences.enabled && supportsBackupDirectory()) backupDirectory = await backupDirectoryStorage();
    } catch { backupIssue = "folder"; }
    backupInitialized = true;
    renderAutoBackupSettings();
    await runAutomaticBackup();
  }

  function exportBackup() {
    flushSave();
    save();
    const blob = new Blob([backupPayload()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `life-workbench-backup-${todayKey()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    backupPreferences.lastExportRequestedAt = new Date().toISOString();
    try { persistBackupPreferences(); } catch { backupIssue = "settings"; }
    renderAutoBackupSettings();
    notify(uiText("已发起备份下载，请在下载目录确认文件。", "Backup download started. Confirm the file in your downloads."));
  }

  function notify(message) {
    const toast = document.getElementById("toast");
    toast.textContent = currentLanguage === "en" ? translateText(message) : message;
    toast.classList.add("show");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove("show"), 1900);
  }

  function syncSidebarToggle() {
    const sidebar = document.querySelector(".v2-sidebar");
    const toggle = document.querySelector('[data-action="toggle-sidebar"]');
    const main = document.querySelector(".v2-main");
    if (!sidebar || !toggle) return;
    const label = sidebarCollapsed ? uiText("展开侧栏", "Expand sidebar") : uiText("折叠侧栏", "Collapse sidebar");
    sidebar.classList.toggle("is-collapsed", sidebarCollapsed);
    main?.classList.toggle("is-sidebar-collapsed", sidebarCollapsed);
    toggle.setAttribute("aria-expanded", String(!sidebarCollapsed));
    toggle.setAttribute("aria-label", label);
    const iconMarkup = `<span aria-hidden="true">${sidebarCollapsed ? "›" : "‹"}</span>`;
    if (toggle.innerHTML !== iconMarkup) toggle.innerHTML = iconMarkup;
  }

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    localStorage.setItem(SIDEBAR_COLLAPSED_STORE, String(sidebarCollapsed));
    syncSidebarToggle();
  }

  function completedHistoryEntries(item) {
    if (item.type === "工作项目") {
      const project = state.projects.find((candidate) => candidate.id === item.id);
      return [...(project?.logs || [])]
        .filter((log) => log && (log.date || log.text))
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }
    if (item.completedAt || item.description) {
      return [{ date: item.completedAt || "", text: item.description || "已完成并归档" }];
    }
    return [];
  }

  function openProjectHistory(item) {
    const modal = document.getElementById("projectHistoryModal");
    const title = document.getElementById("projectHistoryTitle");
    const list = document.getElementById("projectHistoryList");
    if (!modal || !title || !list) return;
    const entries = completedHistoryEntries(item);
    title.textContent = item.title;
    list.innerHTML = entries.length
      ? entries.map((entry) => `<div class="modal-history-item"><time>${esc(entry.date || "未标注日期")}</time><p>${esc(entry.text || "")}</p></div>`).join("")
      : '<div class="empty-state">暂无历史记录。</div>';
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.querySelector("[data-action=close-project-history]")?.focus());
  }

  function closeProjectHistory() {
    const modal = document.getElementById("projectHistoryModal");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function openInspirationRecord(date) {
    const inspiration = localizedInspiration(state.days[date]);
    const modal = document.getElementById("inspirationModal");
    const title = document.getElementById("inspirationModalTitle");
    const dateLabel = document.getElementById("inspirationModalDate");
    const text = document.getElementById("inspirationModalText");
    const deleteButton = document.getElementById("deleteInspirationButton");
    if (!inspiration || !modal || !title || !dateLabel || !text) return;
    title.textContent = uiText("灵感记录", "Inspiration record");
    dateLabel.textContent = dayText(date);
    text.textContent = inspiration;
    if (deleteButton) deleteButton.dataset.inspirationDate = date;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.querySelector("[data-action=close-inspiration-modal]")?.focus());
  }

  function closeInspirationRecord() {
    const modal = document.getElementById("inspirationModal");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
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

  function addDayTask(key, text) {
    const value = String(text || "").trim();
    if (!value) return false;
    ensureDay(key).tasks.push({ id: uid("task"), text: value, done: false, area: "生活" });
    return true;
  }

  function linkedProjectsForGoal(goal) {
    return state.projects.filter((project) => project.goalId === goal.id);
  }

  function goalProgress(goal) {
    const linked = linkedProjectsForGoal(goal);
    if (!linked.length) return Math.max(0, Math.min(100, Number(goal.progress) || 0));
    return Math.round(linked.reduce((sum, project) => sum + Math.max(0, Math.min(100, Number(project.progress) || 0)), 0) / linked.length);
  }

  function overallProgress() {
    if (!state.goals.length) return 0;
    return Math.round(state.goals.reduce((sum, goal) => sum + goalProgress(goal), 0) / state.goals.length);
  }

  function monthlyEventStats(date = todayKey()) {
    const prefix = `${date.slice(0, 7)}-`;
    let allDone = 0;
    let allTotal = 0;
    Object.entries(state.days).filter(([key]) => key.startsWith(prefix)).forEach(([, day]) => {
      const tasks = day.tasks || [];
      allDone += tasks.filter((task) => task.done).length;
      allTotal += tasks.length;
    });
    return { allDone, allTotal, eventRate: allTotal ? Math.round((allDone / allTotal) * 100) : 0 };
  }

  function completedProjectsThisYear(date = todayKey()) {
    const year = date.slice(0, 4);
    return state.projects.filter((project) => isCompletedProject(project) && String(project.completedAt || project.updatedAt || "").startsWith(year)).length;
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
    if (currentLanguage === "en") {
      const startVerb = startLabel === "创建" ? "created" : "started";
      if (start && end) return `${start} ${startVerb} → ${end} completed`;
      if (end) return `${end} completed`;
      return start ? `${start} ${startVerb}` : "";
    }
    if (start && end) return `${start}${startLabel}～${end}完成`;
    if (end) return `${end}完成`;
    return start ? `${start}${startLabel}` : "";
  }

  function completedDescriptionMarkup(description) {
    const text = String(description || "").trim();
    if (!text) return "";
    if (text.length <= 96) return `<p class="completed-project-description">${esc(text)}</p>`;
    return `<details class="completed-project-description"><summary>${esc(text.slice(0, 96))}… <span>${uiText("展开", "Show more")}</span></summary><p>${esc(text)}</p></details>`;
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

  function eventOccursOn(event, key) {
    if (!isDateKey(event.date) || !isDateKey(key) || key < event.date) return false;
    if (event.date === key || event.repeat === "none" || !event.repeat) return event.date === key;
    const base = fromKey(event.date);
    const target = fromKey(key);
    if (event.repeat === "weekly") return base.getDay() === target.getDay();
    if (event.repeat === "monthly") return base.getDate() === target.getDate();
    if (event.repeat === "yearly") return base.getMonth() === target.getMonth() && base.getDate() === target.getDate();
    return false;
  }

  function eventRepeatLabel(repeat) {
    return ({ weekly: uiText("每周", "Weekly"), monthly: uiText("每月", "Monthly"), yearly: uiText("每年", "Yearly") })[repeat] || uiText("不重复", "Does not repeat");
  }

  function eventsOn(key) {
    return state.events.filter((event) => eventOccursOn(event, key));
  }

  function hasDayInformation(key) {
    const day = state.days[key];
    if (!day) return eventsOn(key).length > 0 || projectLogsOn(key).length > 0 || Boolean(weightOn(key));
    return day.tasks.length > 0 || Boolean(day.notes || day.inspiration || day.inspirationEn || day.mood || day.energy || day.calories || day.food || day.water || day.fitness || day.workoutPlan) ||
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
      const eventLabel = eventMarker ? uiText("，有重要日期", ", important date") : "";
      cells.push(`<button class="cal-day ${key === selectedDate ? "selected" : ""} ${key === todayKey() ? "today" : ""} ${eventMarker ? "has-event" : ""}" data-date="${key}" aria-label="${esc(dayText(key))}${eventLabel}" ${key === selectedDate ? 'aria-pressed="true"' : ""}><span>${day}</span><i class="cal-dot ${marker}"></i></button>`);
    }
    return { title: monthTitle(first), html: cells.join("") };
  }

  function renderCalendars() {
    const grid = monthGrid();
    const homeMonth = document.getElementById("homeCalendarMonth");
    const homeGrid = document.getElementById("homeCalendarGrid");
    if (homeMonth) homeMonth.textContent = grid.title;
    if (homeGrid) homeGrid.innerHTML = grid.html;
    const stats = completionFor(selectedDate);
    const summary = summaryText(selectedDate);
    const homeCaption = document.getElementById("homeCalendarCaption");
    if (homeCaption) homeCaption.innerHTML = calendarCaptionHtml(selectedDate, stats, summary, true);
  }

  function dailyActivityFor(key) {
    const day = state.days[key] || {};
    const tasks = Array.isArray(day.tasks) ? day.tasks : [];
    const tasksDone = tasks.filter((task) => task.done).length;
    const weekday = fromKey(key).getDay();
    const plan = planFor(key);
    const workoutRequired = TRAINING_WEEKDAYS.includes(weekday) && plan.items.length > 0;
    const workoutDone = day.fitness === true;
    const healthRecords = [
      Boolean(weightOn(key)),
      Number(day.water) > 0,
      String(day.calories ?? "").trim() !== "" || String(day.food ?? "").trim() !== ""
    ];
    const healthCompleteCount = healthRecords.filter(Boolean).length;
    const projectUpdateCount = projectLogsOn(key).length;
    const routines = currentRoutineItems();
    const routineDoneCount = routines.filter((item) => day.routines?.[item.id]).length;
    const hasDailyReflection = Boolean(String(day.notes || "").trim() || localizedInspiration(day));
    let score = 0;

    if (tasks.length) score += (tasksDone / tasks.length) * 30;
    if (workoutRequired && workoutDone) score += 25;
    else if (!workoutRequired && workoutDone) score += 8;
    score += healthCompleteCount * 10;
    score += Math.min(10, projectUpdateCount * 5);
    if (routines.length) score += (routineDoneCount / routines.length) * 5;
    if (day.mood || day.energy) score += 2;
    if (hasDailyReflection) score += 3;

    const coreComplete = tasks.length > 0 && tasksDone === tasks.length &&
      (!workoutRequired || workoutDone) && healthCompleteCount === healthRecords.length;
    score = coreComplete ? 100 : Math.min(89, Math.round(score));
    const level = score === 0 ? 0 : score < 20 ? 1 : score < 40 ? 2 : score < 60 ? 3 : score < 90 ? 4 : 5;
    return { score, level, coreComplete };
  }

  function renderAnnualCalendar() {
    const grid = document.getElementById("calendarYearGrid");
    if (!grid) return;

    const title = document.getElementById("calendarYearTitle");
    const monthLabels = document.getElementById("calendarMonthLabels");
    const meta = document.getElementById("calendarHeatmapMeta");
    const legend = document.getElementById("calendarHeatmapLegend");
    const caption = document.getElementById("calendarCaption");
    const year = calendarYear;
    const firstDate = new Date(year, 0, 1);
    const daysInYear = new Date(year, 1, 29).getMonth() === 1 ? 366 : 365;
    const startOffset = (firstDate.getDay() + 6) % 7;
    const weekCount = Math.ceil((startOffset + daysInYear) / 7);
    const firstGridDate = new Date(year, 0, 1 - startOffset);
    const today = todayKey();
    let activeDays = 0;
    const cells = [];

    if (title) title.textContent = currentLanguage === "en" ? `${year} activity heatmap` : `${year} 年度活动热力图`;
    if (monthLabels) {
      monthLabels.style.setProperty("--week-count", String(weekCount));
      monthLabels.innerHTML = Array.from({ length: 12 }, (_, month) => {
        const dayOffset = (Date.UTC(year, month, 1) - Date.UTC(year, 0, 1)) / 86400000;
        const firstWeek = Math.floor((startOffset + dayOffset) / 7) + 1;
        const label = currentLanguage === "en" ? MONTHS_SHORT_EN[month] : `${month + 1}月`;
        const offset = ((firstWeek - 1) / weekCount) * 100;
        return `<span style="left:${offset}%">${label}</span>`;
      }).join("");
    }

    for (let index = 0; index < weekCount * 7; index += 1) {
      const date = new Date(firstGridDate);
      date.setDate(firstGridDate.getDate() + index);
      const week = Math.floor(index / 7) + 1;
      const weekday = (index % 7) + 1;
      if (date.getFullYear() !== year) {
        cells.push(`<span class="annual-day-cell is-outside-year" style="grid-column:${week};grid-row:${weekday}" aria-hidden="true"></span>`);
        continue;
      }

      const key = keyOf(date);
      const activity = dailyActivityFor(key);
      if (activity.score > 0) activeDays += 1;
      const selectedClass = key === selectedDate ? "is-selected" : "";
      const todayClass = key === today ? "is-today" : "";
      const completeLabel = activity.coreComplete ? uiText("关键记录已齐", "Key records complete") : "";
      const label = `${dayText(key)} · ${uiText("活动热度", "Activity level")} ${activity.score}%${completeLabel ? ` · ${completeLabel}` : ""}`;
      cells.push(`<button class="annual-day-cell heat-level-${activity.level} ${selectedClass} ${todayClass}" type="button" data-date="${key}" tabindex="${key === selectedDate ? "0" : "-1"}" style="grid-column:${week};grid-row:${weekday}" title="${esc(label)}" aria-label="${esc(label)}" aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight" ${key === selectedDate ? 'aria-pressed="true"' : ""}></button>`);
    }

    grid.style.setProperty("--week-count", String(weekCount));
    grid.innerHTML = cells.join("");
    if (window.matchMedia("(max-width: 760px)").matches) {
      requestAnimationFrame(() => {
        const plot = grid.closest(".annual-calendar-plot");
        const cell = grid.querySelector(".is-selected");
        if (!plot || !cell || !plot.clientWidth) return;
        const bounds = plot.getBoundingClientRect();
        const selected = cell.getBoundingClientRect();
        if (selected.left < bounds.left || selected.right > bounds.right) {
          plot.scrollLeft += selected.left - bounds.left - (plot.clientWidth - selected.width) / 2;
        }
      });
    }
    if (meta) meta.textContent = currentLanguage === "en" ? `${activeDays} active days · ${daysInYear} days` : `${activeDays} 天有记录 · 全年 ${daysInYear} 天`;
    if (legend) {
      legend.innerHTML = `<span>${uiText("少", "Less")}</span>${Array.from({ length: 6 }, (_, level) => `<i class="annual-legend-swatch heat-level-${level}" aria-hidden="true"></i>`).join("")}<span>${uiText("多", "More")}</span>`;
    }
    if (caption) caption.innerHTML = calendarCaptionHtml(selectedDate, completionFor(selectedDate), summaryText(selectedDate), false);
  }

  function focusAnnualCalendarDate(key) {
    const grid = document.getElementById("calendarYearGrid");
    const nextCell = Array.from(grid?.querySelectorAll(".annual-day-cell[data-date]") || [])
      .find((cell) => cell.dataset.date === key);
    nextCell?.focus({ preventScroll: true });
  }

  function calendarCaptionHtml(key, stats = completionFor(key), summary = summaryText(key), showSummary = true) {
    const importantCopy = eventsOn(key).map((event) => event.title).filter(Boolean).join(currentLanguage === "en" ? ", " : "、");
    const important = importantCopy ? `<span class="calendar-important-copy"> · ${esc(importantCopy)}</span>` : "";
    const completionCopy = currentLanguage === "en" ? `${stats.done}/${stats.total} complete` : `${stats.done}/${stats.total} 项完成`;
    const activity = dailyActivityFor(key);
    const summaryCopy = showSummary
      ? `${completionCopy} · ${esc(summary)}`
      : `<span class="calendar-activity-copy">${uiText("活动热度", "Activity level")} ${activity.score}%｜${esc(dailyActivitySummary(key))}</span>`;
    const dateTitle = `<strong>${esc(dayText(key))}${important}</strong>`;
    const editButton = editingCalendarHealthDate === key && calendarHealthDraft ? "" : `<button class="text-btn" type="button" data-action="edit-calendar-health">${uiText("编辑", "Edit")}</button>`;
    return showSummary ? `${dateTitle}${summaryCopy}` : `<div class="calendar-caption-head">${dateTitle}${editButton}</div>${summaryCopy}`;
  }

  function dailyActivitySummary(key) {
    const day = state.days[key] || {};
    const tasks = Array.isArray(day.tasks) ? day.tasks : [];
    const done = tasks.filter((task) => task.done).length;
    const workoutTotal = planFor(key).items.length;
    const workoutDone = day.fitness ? workoutTotal : 0;
    const projects = state.projects.filter((project) => (project.logs || []).some((log) => log.date === key && String(log.text || "").trim())).length;
    return [
      uiText(`完成待办${done}/${tasks.length}项`, `Tasks ${done}/${tasks.length}`),
      uiText(`完成运动${workoutDone}/${workoutTotal}项`, `Exercises ${workoutDone}/${workoutTotal}`),
      uiText(`项目推进${projects}项`, `Projects advanced ${projects}`),
      localizedInspiration(day) ? uiText("今日灵感已记录", "Inspiration recorded") : uiText("今日灵感未记录", "No inspiration recorded")
    ].join("｜");
  }

  function summaryText(key) {
    const day = state.days[key];
    const parts = [];
    if (day?.mood) parts.push(currentLanguage === "en" ? `Mood ${day.mood}` : `心情 ${day.mood}`);
    if (day?.water) parts.push(currentLanguage === "en" ? `Hydration ${day.water} cups` : `饮水 ${day.water} 杯`);
    if (day?.fitness) parts.push(uiText("训练已完成", "Workout completed"));
    if (projectLogsOn(key).length) parts.push(currentLanguage === "en" ? `${projectLogsOn(key).length} project updates` : `${projectLogsOn(key).length} 条项目记录`);
    return parts.join(" · ") || uiText("暂无当天记录", "No records for this day");
  }

  function renderHome() {
    const homeOverviewTitle = document.getElementById("homeOverviewTitle");
    syncHomeBreezeTitle();
    const score = overallProgress();
    const monthStats = monthlyEventStats();
    const homeStats = document.getElementById("homeStats");
    if (homeStats) {
      homeStats.innerHTML = [
        [uiText("本月事件完成率", "Monthly event completion"), `${monthStats.eventRate}%`, uiText("事件", "Events")],
        [uiText("年度目标完成率", "Annual goal completion"), `${score}%`, uiText("关联项目实时计算", "Linked projects update this live")],
        [uiText("本月已完成待办", "Tasks completed this month"), `${monthStats.allDone}`, uiText("已完成待办", "Completed tasks")],
        [uiText("本年已完成项目", "Projects completed this year"), `${completedProjectsThisYear()}`, uiText("已归档项目", "Archived projects")]
      ].map(([label, value, note]) => `<div class="home-stat"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></div>`).join("");
    }

    const homeGoals = document.getElementById("homeGoals");
    homeGoals.setAttribute("aria-label", uiText("年度目标列表", "Annual goals list"));
    homeGoals.innerHTML = editingGoals
      ? `<div class="editable-list">${state.goals.map((goal) => `
          <div class="editable-row" data-search-goal="${esc(goal.id)}">
            <div class="goal-edit-grid">
              <label class="field"><span class="sr-only">目标名称</span><input class="inline-input" data-goal-title="${goal.id}" value="${esc(goal.title)}" /></label>
              <label class="goal-progress-control"><span class="sr-only">目标进度</span><input class="goal-progress-input" data-goal-progress="${goal.id}" type="range" min="0" max="100" value="${goalProgress(goal)}" ${linkedProjectsForGoal(goal).length ? "disabled" : ""} /><output data-goal-progress-value="${goal.id}">${goalProgress(goal)}%</output></label>
              <button class="mini-btn danger" data-action="delete-goal" data-id="${goal.id}" aria-label="删除年度目标 ${esc(goal.title)}">×</button>
            </div>
            <label class="field"><span class="sr-only">目标领域</span><input class="inline-input" data-goal-area="${goal.id}" value="${esc(goal.area || "")}" /></label>
            ${linkedProjectsForGoal(goal).length ? `<small class="goal-linked-note">${uiText("由关联项目综合计算", "Calculated from linked projects")}</small>` : ""}
          </div>
        `).join("")}
        <button class="btn secondary goal-add-btn" data-action="add-goal">＋ 添加年度目标</button></div>`
      : `<div class="editable-list">${state.goals.map((goal) => `
          <div class="editable-row" data-search-goal="${esc(goal.id)}">
            <div class="editable-row-top"><div><strong>${esc(goal.title)}</strong><br><small>${esc(goal.area || "")}</small></div><b>${goalProgress(goal)}%</b></div>
            <div class="progress-track"><span style="width:${goalProgress(goal)}%"></span></div>
          </div>
        `).join("")}</div>`;

    const priorityCard = document.getElementById("homePriorityCard");
    const priorityTitle = document.getElementById("homePriorityTitle");
    const prioritySubtitle = document.getElementById("homePrioritySubtitle");
    const priorityToggle = document.getElementById("homePriorityToggle");
    const priorityEdit = document.querySelector('[data-action="toggle-priority-edit"]');
    priorityCard?.classList.toggle("is-inspiration", viewingHomeInspiration);
    if (viewingHomeInspiration) {
      const inspiration = localizedInspiration(ensureDay(todayKey()));
      if (priorityTitle) priorityTitle.textContent = uiText("今日灵感", "Today's inspiration");
      if (prioritySubtitle) prioritySubtitle.textContent = uiText("与日常提醒同步，可记录今天捕捉到的片段", "Synced with daily reminders; capture today's fragments");
      if (priorityToggle) {
        priorityToggle.textContent = uiText("重点", "Focus");
        priorityToggle.setAttribute("aria-label", uiText("返回近期重点", "Return to current focus"));
      }
      if (priorityEdit) priorityEdit.hidden = true;
      document.getElementById("homePriorities").innerHTML = `
        <div class="home-inspiration-view">
          <small class="home-inspiration-date">${esc(dayText(todayKey()))}</small>
          <textarea class="textarea inspiration-textarea" data-inspiration-input="home" placeholder="${esc(uiText("记录今天捕捉到的灵感、片段或想继续观察的方向", "Capture an idea, fragment, or direction to keep exploring today"))}">${esc(inspiration)}</textarea>
          <button class="btn secondary" data-action="save-inspiration" data-inspiration-source="home">${uiText("保存今日灵感", "Save today's inspiration")}</button>
        </div>`;
    } else {
      if (priorityTitle) priorityTitle.textContent = uiText("近期重点", "Current focus");
      if (prioritySubtitle) prioritySubtitle.textContent = uiText("当前阶段的行动、目的与下一步", "Current actions, purpose, and next steps");
      if (priorityToggle) {
        priorityToggle.textContent = uiText("记录灵感", "Log inspiration");
        priorityToggle.setAttribute("aria-label", uiText("查看今日灵感", "View today's inspiration"));
      }
      if (priorityEdit) priorityEdit.hidden = false;
      document.getElementById("homePriorities").innerHTML = editingPriorities
        ? `<div class="editable-list">${state.priorities.map((item) => `<div class="field" data-search-priority="${esc(item.id)}"><span>${esc(item.label)}</span><input class="inline-input" data-priority-text="${item.id}" value="${esc(item.text)}" /><textarea class="textarea compact-textarea" data-priority-detail="${item.id}" placeholder="补充目的、背景或下一步">${esc(item.detail || "")}</textarea></div>`).join("")}</div>`
        : `<div class="priority-view">${state.priorities.map((item) => `<div class="priority-item" data-search-priority="${esc(item.id)}"><small>${esc(item.label)}</small><span>${esc(item.text)}</span><p>${esc(item.detail || "")}</p></div>`).join("")}</div>`;
    }

    // Keep the overview aligned with the same day's reminder data. The overview
    // intentionally hides completed items, while the reminder page keeps them
    // visible so they can be reviewed or unchecked.
    const todayTasks = ensureDay(todayKey()).tasks.filter((task) => !task.done);
    document.getElementById("homeTasks").innerHTML = todayTasks.length
      ? todayTasks.map((task) => `<article class="card home-task"><div class="home-task-row"><input class="check" type="checkbox" data-task-toggle="${task.id}" data-task-date="${todayKey()}" aria-label="完成 ${esc(task.text)}" /><input class="inline-input home-task-input" data-task-text="${task.id}" data-task-date="${todayKey()}" value="${esc(task.text)}" aria-label="修改今日事项" /></div></article>`).join("")
      : '<div class="empty-state">今天没有未完成事项。</div>';
    renderCalendars();
  }

  function addProjectHistory(project, date, text) {
    project.logs = Array.isArray(project.logs) ? project.logs : [];
    project.logs.push({ id: uid("log"), date, text });
    project.updatedAt = date;
  }

  function latestProjectLogOn(project, date) {
    return [...(project.logs || [])].reverse().find((log) => log.date === date) || null;
  }

  function projectRecordDates(project) {
    const dates = new Set(
      (project.logs || []).map((log) => log.date).filter(isDateKey)
    );
    Object.entries(project.daily || {}).forEach(([date, record]) => {
      if (isDateKey(date) && record && (record.description || record.next || record.logId)) dates.add(date);
    });
    return [...dates].sort();
  }

  function projectRecordDate(project) {
    const date = projectReviewDates.get(project.id);
    return isDateKey(date) ? date : selectedDate;
  }

  function shiftProjectRecordDate(project, direction) {
    const dates = projectRecordDates(project);
    if (!dates.length) return false;
    const current = projectRecordDate(project);
    const next = direction < 0 ? dates.filter((date) => date < current).pop() : dates.find((date) => date > current);
    if (!next) return false;
    projectReviewDates.set(project.id, next);
    return true;
  }

  function projectAreaOptions(projects, registeredAreas = []) {
    return [...new Set([...registeredAreas, ...projects.map((project) => String(project.area || "其他"))].map((area) => String(area).trim()).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "zh-CN"));
  }

  function normalizeProjectAreas(areas, projects) {
    const registered = Array.isArray(areas) ? areas.filter((area) => typeof area === "string") : [];
    return projectAreaOptions(projects, [...registered, "其他"]);
  }

  function addProjectArea(name, projectId = "") {
    const area = String(name || "").trim();
    if (!area) return false;
    state.projectAreas = normalizeProjectAreas([...(state.projectAreas || []), area], state.projects);
    const project = state.projects.find((item) => item.id === projectId);
    if (project) project.area = area;
    return true;
  }

  function renameProjectArea(previous, name) {
    const area = String(name || "").trim();
    if (!area || previous === "其他") return false;
    state.projects.forEach((project) => {
      if (String(project.area || "其他").trim() === previous) project.area = area;
    });
    state.projectAreas = normalizeProjectAreas((state.projectAreas || []).map((item) => item === previous ? area : item), state.projects);
    if (projectAreaFilter === previous) projectAreaFilter = area;
    return true;
  }

  function deleteProjectArea(area) {
    if (area === "其他") return false;
    state.projects.forEach((project) => {
      if (String(project.area || "其他").trim() === area) project.area = "其他";
    });
    state.projectAreas = normalizeProjectAreas((state.projectAreas || []).filter((item) => item !== area), state.projects);
    if (projectAreaFilter === area) projectAreaFilter = "all";
    return true;
  }

  function renderProjectAreasManager() {
    const panel = document.getElementById("projectAreasManager");
    document.getElementById("projectAreasTitle").textContent = uiText("管理领域标签", "Manage project areas");
    panel.innerHTML = `<p class="muted">${uiText("标签独立保存，暂时没有项目使用也会保留。重命名会同步所有关联项目。", "Areas are saved independently, even when unused. Renaming updates every linked project.")}</p><form class="form-row project-area-add-form" id="projectAreaAddForm"><label class="sr-only" for="projectAreaName">${uiText("新领域名称", "New area name")}</label><input class="input" id="projectAreaName" maxlength="60" placeholder="${uiText("输入新领域名称", "Enter a new area name")}" required /><button class="btn green" type="submit">${uiText("新增", "Add")}</button></form><div class="project-area-manager-list">${normalizeProjectAreas(state.projectAreas, state.projects).map((area, index) => {
      const count = state.projects.filter((project) => String(project.area || "其他").trim() === area).length;
      return `<form class="project-area-manager-row" data-area-rename="${esc(area)}"><label class="sr-only" for="project-area-name-${index}">${esc(uiText("标签名称", "Area name"))}</label><input class="input" id="project-area-name-${index}" value="${esc(area)}" maxlength="60" ${area === "其他" ? "readonly" : ""} required /><span>${count} ${uiText("个项目", "projects")}</span>${area === "其他" ? `<small>${uiText("默认标签", "Default area")}</small>` : `<button class="text-btn" type="submit">${uiText("重命名", "Rename")}</button><button class="text-btn danger-text-btn" type="button" data-action="delete-project-area" data-area="${esc(area)}">${uiText("删除", "Delete")}</button>`}</form>`;
    }).join("")}</div>`;
  }

  function openProjectAreasManager() {
    projectAreasReturnFocus = document.activeElement;
    renderProjectAreasManager();
    document.getElementById("projectAreasModal").hidden = false;
    document.body.classList.add("modal-open");
    document.getElementById("projectAreaName").focus();
  }

  function closeProjectAreasManager() {
    const modal = document.getElementById("projectAreasModal");
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (projectAreasReturnFocus?.isConnected) projectAreasReturnFocus.focus();
  }

  function refreshProjectAreas() {
    save();
    renderProjects();
    renderHome();
    renderCalendar();
    if (!document.getElementById("projectAreasModal").hidden) renderProjectAreasManager();
  }

  function collectSearchEntries(data = state) {
    const entries = [];
    const add = (type, id, title, text, date = "", extra = {}) => entries.push({ type, id, title: String(title || ""), text: String(text || ""), date, ...extra });
    (data.projects || []).forEach((project) => {
      add("project", project.id, project.title, [project.description, project.next, project.area, project.status, isCompletedProject(project) ? "已完成 Completed" : ""].filter(Boolean).join(" · "));
      const daily = Object.entries(project.daily || {}).filter(([date]) => isDateKey(date));
      daily.forEach(([date, record]) => {
        const text = [record.next, record.description].filter(Boolean).join(" · ");
        if (text.trim()) add("project-record", project.id, project.title, text, date);
      });
      (project.logs || []).forEach((log) => {
        if (!daily.some(([date, record]) => date === log.date && record.logId === log.id && record.next === log.text)) {
          add("project-record", project.id, project.title, log.text, log.date || "", { logId: log.id });
        }
      });
    });
    (data.goals || []).forEach((goal) => add("goal", goal.id, goal.title, goal.area));
    (data.priorities || []).forEach((item) => add("priority", item.id, item.text, [item.label, item.detail].filter(Boolean).join(" · ")));
    (data.milestones || []).forEach((item) => add("milestone", item.id, item.title, [item.note, item.done ? "已完成 Completed" : ""].filter(Boolean).join(" · ")));
    (data.events || []).forEach((event) => add("event", event.id, event.title, event.copy, event.date));
    const weights = new Map((data.weightHistory || []).map((item) => [item.date, item.weight]));
    const routineNames = new Map((data.routineItems || []).map((item) => [item.id, item.title]));
    const dates = new Set([...Object.keys(data.days || {}), ...weights.keys()]);
    dates.forEach((date) => {
      if (!isDateKey(date)) return;
      const day = data.days?.[date] || {};
      (day.tasks || []).forEach((task) => add("task", task.id, task.text, [task.area, task.done ? "已完成 Completed" : "待完成 Pending"].filter(Boolean).join(" · "), date));
      const inspiration = [...new Set([day.inspiration, day.inspirationEn].filter(Boolean))].join("\n");
      if (inspiration.trim()) add("inspiration", date, "", inspiration, date);
      const health = [];
      if (day.mood) health.push(`心情 Mood: ${day.mood}`);
      if (day.energy) health.push(`精力 Energy: ${day.energy}`);
      if (Number(day.water) > 0) health.push(`饮水 Hydration: ${day.water} 杯 cups`);
      if (weights.has(date)) health.push(`体重 Weight: ${weights.get(date)} kg`);
      if (String(day.calories ?? "").trim()) health.push(`热量 Calories: ${day.calories} kcal`);
      if (day.food) health.push(`饮食 Food: ${day.food}`);
      if (day.notes) health.push(`复盘 Review: ${day.notes}`);
      if (day.fitness) health.push(`运动已完成 Workout completed: ${planFor(date, data).title}`);
      Object.entries(day.routines || {}).forEach(([id, done]) => {
        if (done && routineNames.has(id)) health.push(`日常项目已完成 Routine completed: ${routineNames.get(id)}`);
      });
      if (health.length) add("health", date, "", health.join(" · "), date);
    });
    (data.routineItems || []).forEach((item) => add("routine", item.id, item.title, item.detail));
    (data.supplementaryTraining || []).forEach((panel) => add("training", panel.id, panel.title, [panel.note, ...(panel.rows || []).map((row) => `${row.action || ""} ${row.frequency || ""}`)].filter(Boolean).join(" · ")));
    const workouts = new Map();
    const addWorkout = (date, plan) => {
      if (!plan) return;
      const text = [plan.subtitle, ...(plan.items || []).map((item) => item.slice(1).join(" "))].filter(Boolean).join(" · ");
      workouts.set(`${date}:${plan.title}:${text}`, { date, plan, text });
    };
    weekKeys(fromKey(todayKey())).forEach((date) => addWorkout(date, planFor(date, data)));
    Object.entries(data.days || {}).forEach(([date, day]) => {
      if (isDateKey(date) && day?.workoutPlan) addWorkout(date, day.workoutPlan);
    });
    (data.workoutPlanChanges || []).forEach((change) => {
      if (isDateKey(change.effectiveFrom)) {
        const offset = (Number(change.weekday) - fromKey(change.effectiveFrom).getDay() + 7) % 7;
        addWorkout(addDays(change.effectiveFrom, offset), change.plan);
      }
    });
    workouts.forEach(({ date, plan, text }) => add("workout", date, plan.title, text, date));
    (data.breezeGuide?.entries || []).forEach((entry) => {
      const title = entry.text || (currentLanguage === "en" ? entry.en || entry.zh : entry.zh || entry.en);
      add("breeze", entry.id, title, [...new Set([entry.text, entry.zh, entry.en].filter(Boolean))].join(" · "));
    });
    (data.projectAreas || []).forEach((area) => add("area", area, area, ""));
    return entries;
  }

  function normalizedSearchText(value) {
    return String(value || "").normalize("NFKC").toLocaleLowerCase().trim();
  }

  function searchWorkbench(query, data = state) {
    const normalized = normalizedSearchText(query);
    const terms = normalized.split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return collectSearchEntries(data).filter((entry) => {
      const content = normalizedSearchText([entry.title, entry.text, entry.date, ...(SEARCH_TYPES[entry.type] || [])].join(" "));
      return terms.every((term) => content.includes(term));
    }).map((entry) => {
      const title = normalizedSearchText(entry.title);
      return { ...entry, rank: title === normalized ? 0 : title.startsWith(normalized) ? 1 : title.includes(normalized) ? 2 : 3 };
    }).sort((a, b) => a.rank - b.rank || String(b.date).localeCompare(String(a.date)));
  }

  function searchTextMarkup(value, query, excerpt = false) {
    let text = String(value || "");
    const terms = normalizedSearchText(query).split(/\s+/).filter(Boolean);
    const indices = terms.map((term) => text.toLocaleLowerCase().indexOf(term)).filter((index) => index >= 0);
    if (excerpt && text.length > 140) {
      const start = Math.max(0, (indices.length ? Math.min(...indices) : 0) - 36);
      text = `${start ? "…" : ""}${text.slice(start, start + 140)}${start + 140 < text.length ? "…" : ""}`;
    }
    const term = terms.find((item) => text.toLocaleLowerCase().includes(item));
    if (!term) return esc(text);
    const index = text.toLocaleLowerCase().indexOf(term);
    return `${esc(text.slice(0, index))}<mark>${esc(text.slice(index, index + term.length))}</mark>${esc(text.slice(index + term.length))}`;
  }

  function closeGlobalSearch() {
    clearTimeout(globalSearchTimer);
    globalSearchTimer = null;
    document.getElementById("globalSearchPanel").hidden = true;
    const input = document.getElementById("globalSearch");
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }

  function renderGlobalSearch(reset = true) {
    const input = document.getElementById("globalSearch");
    if (reset) {
      globalSearchQuery = input.value.trim();
      globalSearchMatches = searchWorkbench(globalSearchQuery);
      globalSearchVisibleCount = 30;
      globalSearchActiveIndex = -1;
    }
    if (!globalSearchQuery) { closeGlobalSearch(); return; }
    document.getElementById("globalSearchPanel").hidden = false;
    input.setAttribute("aria-expanded", "true");
    document.getElementById("globalSearchSummary").textContent = uiText(`找到 ${globalSearchMatches.length} 条结果 · 搜索全部日期与已完成记录`, `${globalSearchMatches.length} results · All dates and completed records`);
    document.getElementById("globalSearchResults").setAttribute("aria-label", uiText("搜索结果", "Search results"));
    document.getElementById("globalSearchResults").innerHTML = globalSearchMatches.length ? globalSearchMatches.slice(0, globalSearchVisibleCount).map((entry, index) => {
      const category = uiText(...SEARCH_TYPES[entry.type]);
      return `<button class="global-search-result ${index === globalSearchActiveIndex ? "is-active" : ""}" id="global-search-result-${index}" type="button" role="option" aria-selected="${index === globalSearchActiveIndex}" tabindex="-1" data-action="open-search-result" data-search-index="${index}"><span class="search-result-meta"><span>${esc(category)}</span><time>${esc(entry.date)}</time></span><strong>${searchTextMarkup(entry.title || category, globalSearchQuery)}</strong>${entry.text ? `<span class="search-result-excerpt">${searchTextMarkup(entry.text, globalSearchQuery, true)}</span>` : ""}</button>`;
    }).join("") : `<div class="empty-state">${uiText("没有找到匹配的记录。试试更短的关键词。", "No matching records. Try a shorter keyword.")}</div>`;
    document.getElementById("globalSearchMore").innerHTML = globalSearchMatches.length > globalSearchVisibleCount ? `<button class="text-btn search-more-btn" type="button" data-action="more-search-results">${uiText(`显示更多（还有 ${globalSearchMatches.length - globalSearchVisibleCount} 条）`, `Show more (${globalSearchMatches.length - globalSearchVisibleCount} remaining)`)}</button>` : "";
    if (globalSearchActiveIndex >= 0) input.setAttribute("aria-activedescendant", `global-search-result-${globalSearchActiveIndex}`);
    else input.removeAttribute("aria-activedescendant");
  }

  function highlightSearchTarget(element) {
    if (!element) return;
    element.closest("details")?.setAttribute("open", "");
    element.scrollIntoView({ block: "center" });
    element.classList.add("search-target");
    setTimeout(() => element.classList.remove("search-target"), 1800);
  }

  function openGlobalSearchResult(index) {
    const entry = globalSearchMatches[index];
    if (!entry) return;
    if (entry.date && isDateKey(entry.date) && !updateSelectedDate(entry.date)) return;
    closeGlobalSearch();
    let target;
    const find = (selector, key, value, root = document) => [...(root?.querySelectorAll(selector) || [])].find((element) => element.dataset[key] === value);
    if (entry.type === "project" || entry.type === "project-record") {
      const project = state.projects.find((item) => item.id === entry.id);
      if (!project) return;
      if (isCompletedProject(project)) {
        completedProjectFilter = "全部";
        switchPage("footprints");
        const completed = completedItems().find((item) => item.id === project.id && item.type === "工作项目");
        if (completed) openProjectHistory(completed);
        target = document.getElementById("projectHistoryModal");
      } else {
        if (entry.type === "project-record" && isDateKey(entry.date)) projectReviewDates.set(project.id, entry.date);
        projectStatusFilter = "all";
        projectAreaFilter = "all";
        switchPage("work");
        const card = document.getElementById(`project-card-${entry.id}`);
        target = entry.logId ? find("[data-project-log]", "projectLog", entry.logId, card) : card;
        if (target) {
          let ancestor = target.parentElement;
          while (ancestor && ancestor !== card) { if (ancestor.matches("details")) ancestor.open = true; ancestor = ancestor.parentElement; }
        }
      }
    } else if (entry.type === "task" || entry.type === "event" || entry.type === "milestone" || entry.type === "breeze") {
      const milestone = entry.type === "milestone" && state.milestones.find((item) => item.id === entry.id);
      if (milestone?.done) {
        completedProjectFilter = "全部";
        switchPage("footprints");
        target = find(".completed-project-row", "historyId", entry.id);
      } else {
        if (entry.type === "breeze") {
          breezeHistoryOpen = true;
          breezeEntryIndex = currentBreezeEntries().findIndex((item) => item.id === entry.id);
          if (breezeEntryIndex < 0) breezeEntryIndex = 0;
        }
        switchPage("reminders");
        renderReminders();
        renderMilestones();
        if (entry.type === "task") target = find("#reminderList [data-task-text]", "taskText", entry.id)?.closest(".todo-row");
        if (entry.type === "milestone") target = find("[data-master-todo-row]", "masterTodoRow", entry.id);
        if (entry.type === "event") target = find(".event-row", "id", entry.id);
        if (entry.type === "breeze") target = find(".breeze-history-row", "breezeEntry", entry.id);
      }
    } else if (entry.type === "inspiration") {
      switchPage("calendar");
      openInspirationRecord(entry.date);
      target = document.getElementById("inspirationModalText");
    } else if (entry.type === "health") {
      switchPage("calendar");
      target = document.getElementById("calendarHealthPanel");
    } else if (entry.type === "goal" || entry.type === "priority") {
      if (entry.type === "priority") viewingHomeInspiration = false;
      switchPage("home");
      target = find(entry.type === "goal" ? "[data-search-goal]" : "[data-search-priority]", entry.type === "goal" ? "searchGoal" : "searchPriority", entry.id);
    } else if (["routine", "training", "workout"].includes(entry.type)) {
      if (entry.type === "workout") {
        selectedFitnessDate = entry.date;
        fitnessMonthCursor = fromKey(entry.date);
        fitnessMonthCursor.setDate(1);
      }
      switchPage("fitness");
      target = entry.type === "workout" ? document.querySelector(".fitness-plan-card") : entry.type === "training" ? find("[data-search-training]", "searchTraining", entry.id) : find("#fitnessRoutines [data-routine]", "routine", entry.id)?.closest(".routine-row, .routine-edit-row");
    } else if (entry.type === "area") {
      switchPage("work");
      openProjectAreasManager();
      target = find("[data-area-rename]", "areaRename", entry.id);
    }
    requestAnimationFrame(() => highlightSearchTarget(target));
  }

  function projectMatchesFilter(project) {
    const matchesStatus = projectStatusFilter === "all" || project.status === projectStatusFilter;
    const matchesArea = projectAreaFilter === "all" || String(project.area || "其他").trim() === projectAreaFilter;
    return matchesStatus && matchesArea;
  }

  function projectDayRecord(project, date = selectedDate) {
    project.daily = project.daily && typeof project.daily === "object" && !Array.isArray(project.daily) ? project.daily : {};
    const saved = project.daily[date];
    const fallbackLog = latestProjectLogOn(project, date);
    if (saved) {
      return {
        description: String(project.description || ""),
        next: String(saved.next || ""),
        logId: saved.logId || fallbackLog?.id || ""
      };
    }
    return {
      description: String(project.description || ""),
      next: String(fallbackLog?.text || ""),
      logId: fallbackLog?.id || ""
    };
  }

  function updateProjectDayRecord(project, date, description, next) {
    const cleanDescription = String(description || "").trim();
    const cleanNext = String(next || "").trim();
    project.daily = project.daily && typeof project.daily === "object" && !Array.isArray(project.daily) ? project.daily : {};
    const previous = projectDayRecord(project, date);
    const currentLog = latestProjectLogOn(project, date);
    const actionChanged = cleanNext !== previous.next.trim();
    if (actionChanged && cleanNext) {
      if (currentLog) {
        currentLog.text = cleanNext;
      } else {
        addProjectHistory(project, date, cleanNext);
      }
    } else if (actionChanged && currentLog) {
      project.logs = project.logs.filter((log) => log.id !== currentLog.id);
    }
    const linkedLog = cleanNext ? latestProjectLogOn(project, date) : null;
    // Keep legacy dated descriptions intact; new descriptions belong to the project.
    project.daily[date] = { ...project.daily[date], next: cleanNext, logId: linkedLog?.id || "" };
    project.description = cleanDescription;
    if (date === todayKey()) project.next = cleanNext;
    project.updatedAt = date;
  }

  function confirmProjectCompletion(project, reason) {
    return confirm(currentLanguage === "en"
      ? `Project “${project.title}” ${reason}. Mark it as completed? It will be archived under Completed projects.`
      : `项目「${project.title}」${reason}，确认已完成吗？确认后会归档到日历看板的“已完成项目”。`);
  }

  function markProjectCompleted(project) {
    project.completed = true;
    project.completedAt = todayKey();
    project.status = "已完成";
    project.progress = 100;
  }

  function projectDragHandleMarkup(id) {
    const label = uiText("拖动调整项目顺序，也可使用方向键", "Drag to reorder projects, or use the arrow keys");
    return `<button class="project-drag-handle" type="button" draggable="true" data-project-drag="${esc(id)}" aria-label="${esc(label)}" title="${esc(label)}">⠿</button>`;
  }

  function reorderProject(sourceId, targetId) {
    const active = state.projects.filter((project) => !isCompletedProject(project));
    const from = active.findIndex((project) => project.id === sourceId);
    const to = active.findIndex((project) => project.id === targetId);
    if (from < 0 || to < 0 || from === to) return false;
    const [project] = active.splice(from, 1);
    active.splice(to, 0, project);
    let index = 0;
    state.projects = state.projects.map((item) => isCompletedProject(item) ? item : active[index++]);
    save();
    renderProjects();
    renderHome();
    return true;
  }

  function projectReadingMarkup(project, recordDate, dayRecord, logs) {
    const status = `<select class="select project-reading-status" data-project-status="${esc(project.id)}" aria-label="${esc(project.title)}${uiText("的状态", " status")}">${PROJECT_STATUSES.map(([value, label]) => `<option value="${esc(value)}" ${value === project.status ? "selected" : ""}>${esc(uiText(value, label))}</option>`).join("")}</select>`;
    const goal = state.goals.find((item) => item.id === project.goalId);
    const dates = projectRecordDates(project);
    const hasPrevious = dates.some((date) => date < recordDate);
    const hasNext = dates.some((date) => date > recordDate);
    const visible = state.projects.filter((item) => !isCompletedProject(item) && projectMatchesFilter(item));
    const position = visible.findIndex((item) => item.id === project.id);
    return `<article class="card project-card project-reading-card" id="project-card-${esc(project.id)}" data-project-row="${esc(project.id)}">
      <div class="project-reading-meta">${projectDragHandleMarkup(project.id)}${projectIconPickerMarkup(project)}<span class="tag neutral">${esc(project.area || "其他")}</span>${status}<details class="project-actions-menu"><summary aria-label="${esc(uiText("项目操作", "Project actions"))}">⋯</summary><div><button class="text-btn" type="button" data-action="move-project-up" data-id="${esc(project.id)}" ${position <= 0 ? "disabled" : ""}>↑ ${uiText("上移", "Move up")}</button><button class="text-btn" type="button" data-action="move-project-down" data-id="${esc(project.id)}" ${position >= visible.length - 1 ? "disabled" : ""}>↓ ${uiText("下移", "Move down")}</button><button class="text-btn danger-text-btn" type="button" data-action="delete-project" data-id="${esc(project.id)}">${uiText("删除项目", "Delete project")}</button></div></details></div>
      <h3 class="project-reading-title">${esc(project.title)}</h3>
      <div class="project-reading-progress"><span>${uiText("当前进度", "Progress")}</span><strong>${Number(project.progress) || 0}%</strong><div class="progress-track" role="progressbar" aria-label="${esc(project.title)}" aria-valuenow="${Number(project.progress) || 0}" aria-valuemin="0" aria-valuemax="100"><span style="width:${Number(project.progress) || 0}%"></span></div></div>
      ${goal ? `<p class="project-reading-goal">${uiText("年度目标", "Annual goal")} · ${esc(goal.title)}</p>` : ""}
      <div class="project-reading-description"><small>${uiText("项目描述", "Description")}</small><p>${esc(project.description || uiText("尚未填写项目描述", "No description yet"))}</p></div>
      <div class="project-reading-next"><small>${uiText("下一步行动", "Next action")}</small><p>${esc(dayRecord.next || uiText("为这个日期留下一步行动", "Add a next action for this date"))}</p></div>
      <div class="project-reading-footer"><div class="project-review-bottom"><button class="mini-btn project-date-nav" type="button" data-action="project-prev-record" data-id="${esc(project.id)}" aria-label="${uiText("上一个记录日", "Previous record")}" ${hasPrevious ? "" : "disabled"}>‹</button><label class="field project-review-field"><span class="sr-only">${uiText("回顾日期", "Record date")}</span><input class="input project-review-input" type="date" data-project-review="${esc(project.id)}" value="${esc(recordDate)}" aria-label="${uiText("回顾日期", "Record date")}" /></label><button class="mini-btn project-date-nav" type="button" data-action="project-next-record" data-id="${esc(project.id)}" aria-label="${uiText("下一个记录日", "Next record")}" ${hasNext ? "" : "disabled"}>›</button></div><button class="edit-btn" type="button" data-action="edit-project" data-id="${esc(project.id)}">${uiText("编辑", "Edit")}</button></div>
      <details class="history"><summary>${uiText("历史记录", "History")} · ${logs.length}</summary><div class="history-scroll">${logs.length ? logs.map((log) => `<div class="history-item" data-project-log="${esc(log.id)}"><time>${esc(log.date || "")}</time><span>${esc(log.text || "")}</span></div>`).join("") : `<p class="muted">${uiText("还没有推进记录。", "No updates yet.")}</p>`}</div></details>
    </article>`;
  }

  function renderProjects() {
    const activeProjects = state.projects.filter((project) => !isCompletedProject(project));
    const areas = projectAreaOptions(activeProjects);
    const editableAreas = normalizeProjectAreas(state.projectAreas, state.projects);
    if (projectStatusFilter !== "all" && !PROJECT_STATUSES.some(([status]) => status === projectStatusFilter)) projectStatusFilter = "all";
    if (projectAreaFilter !== "all" && !areas.includes(projectAreaFilter)) projectAreaFilter = "all";
    const statusFilter = document.getElementById("projectStatusFilter");
    if (statusFilter) {
      statusFilter.innerHTML = `<option value="all">${uiText("全部状态", "All statuses")}</option>${PROJECT_STATUSES.map(([status, label]) => `<option value="${esc(status)}" ${status === projectStatusFilter ? "selected" : ""}>${esc(uiText(status, label))}</option>`).join("")}`;
    }
    const areaFilter = document.getElementById("projectAreaFilter");
    if (areaFilter) {
      areaFilter.innerHTML = `<option value="all">${uiText("全部领域", "All areas")}</option>${areas.map((area) => `<option value="${esc(area)}" ${area === projectAreaFilter ? "selected" : ""}>${esc(area)}</option>`).join("")}`;
    }
    const list = activeProjects.filter(projectMatchesFilter);
    const overview = document.getElementById("projectOverview");
    if (overview) {
      overview.innerHTML = activeProjects.length ? activeProjects.map((project) => `
        <div class="project-overview-row">
            <div class="project-overview-meta"><button class="project-overview-name" type="button" data-action="jump-project" data-id="${esc(project.id)}">${esc(project.title)}</button><span>${esc(uiText(project.status, PROJECT_STATUSES.find(([status]) => status === project.status)?.[1] || project.status))} · ${Number(project.progress) || 0}%</span></div>
          <div class="progress-track" role="progressbar" aria-label="${esc(project.title)}进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Number(project.progress) || 0}"><span style="width:${Number(project.progress) || 0}%"></span></div>
        </div>
      `).join("") : '<div class="empty-state">还没有正在推进的项目。</div>';
    }
    document.getElementById("projectList").innerHTML = list.length ? list.map((project) => {
      const logs = [...(project.logs || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      const recordDate = projectRecordDate(project);
      const dayRecord = projectDayRecord(project, recordDate);
      if (!editingProjectIds.has(project.id)) return projectReadingMarkup(project, recordDate, dayRecord, logs);
      const draft = projectTextDrafts.get(project.id);
      return `
        <article class="card project-card is-editing" id="project-card-${esc(project.id)}" data-project-row="${esc(project.id)}">
          <div class="project-edit-toolbar">${projectDragHandleMarkup(project.id)}<span>${uiText("编辑项目", "Edit project")}</span><button class="btn green" type="submit" form="project-update-${esc(project.id)}">${uiText("保存并收起", "Save & close")}</button></div>
          <div class="project-head">
            <div class="project-title"><div class="project-title-top">${projectIconPickerMarkup(project)}<span class="tag neutral project-area-tag">${esc(project.area || "其他")}</span>
            <div class="project-status-control">
              <select class="select" data-project-status="${project.id}" aria-label="${esc(project.title)}的状态">
                ${PROJECT_STATUSES.map(([status, label]) => `<option value="${esc(status)}" ${status === project.status ? "selected" : ""}>${esc(uiText(status, label))}</option>`).join("")}
              </select>
            </div>
            </div><textarea class="project-title-input" data-project-title="${project.id}" maxlength="120" rows="2" aria-label="项目标题">${esc(project.title)}</textarea></div>
          </div>
          <div class="project-progress"><label><span>当前进度</span><b>${Number(project.progress) || 0}%</b></label><input type="range" min="0" max="100" value="${Number(project.progress) || 0}" data-project-progress="${project.id}" aria-label="${esc(project.title)}的进度" /></div>
          <div class="form-grid project-fields project-meta-fields">
            <div class="field"><label for="project-area-${esc(project.id)}">所属领域</label><div class="project-area-control"><select class="select" id="project-area-${esc(project.id)}" data-project-area="${esc(project.id)}">${editableAreas.map((area) => `<option value="${esc(area)}" ${area === (String(project.area || "其他").trim() || "其他") ? "selected" : ""}>${esc(area)}</option>`).join("")}</select><button class="text-btn" type="button" data-action="add-project-area" data-id="${esc(project.id)}">新增领域</button></div></div>
            <label class="field"><span>年度目标</span><select class="select" data-project-goal="${project.id}"><option value="">未关联年度目标</option>${state.goals.map((goal) => `<option value="${esc(goal.id)}" ${goal.id === project.goalId ? "selected" : ""}>${esc(goal.title)}</option>`).join("")}</select></label>
          </div>
          <form class="project-day-form" id="project-update-${esc(project.id)}" data-project-update="${project.id}" data-project-update-date="${recordDate}">
            <div class="form-grid project-fields project-day-fields">
              <label class="field wide"><span>项目描述 <small class="field-hint">项目共用，不随回顾日期切换</small></span><textarea class="textarea" data-project-description="${project.id}" maxlength="260" placeholder="说明项目要解决的问题、目标和范围">${esc(draft?.description ?? project.description ?? "")}</textarea></label>
              <label class="field wide"><span>下一步行动</span><textarea class="textarea" data-project-next="${project.id}" maxlength="260" placeholder="填写这个日期的下一步行动">${esc(draft?.actions?.get(recordDate) ?? dayRecord.next)}</textarea></label>
            </div>
            <div class="project-update-actions">
              <div class="project-review-bottom">
                <button class="mini-btn project-date-nav" type="button" data-action="project-prev-record" data-id="${project.id}" aria-label="上一个记录日" title="上一个记录日" ${projectRecordDates(project).some((date) => date < recordDate) ? "" : "disabled"}>‹</button>
                <label class="field project-review-field"><span class="sr-only">回顾日期</span><input class="input project-review-input" type="date" data-project-review="${project.id}" value="${esc(recordDate)}" aria-label="回顾日期" /></label>
                <button class="mini-btn project-date-nav" type="button" data-action="project-next-record" data-id="${project.id}" aria-label="下一个记录日" title="下一个记录日" ${projectRecordDates(project).some((date) => date > recordDate) ? "" : "disabled"}>›</button>
              </div>
              <button class="btn green" type="submit">${uiText("保存并收起", "Save & close")}</button>
            </div>
          </form>
          <details class="history" open>
            <summary>历史记录（${logs.length}）</summary>
            ${logs.length ? `<div class="history-scroll">${logs.slice(0, 2).map((log) => `<div class="history-item" data-project-log="${esc(log.id)}"><time>${esc(log.date || "")}</time><span>${esc(log.text || "")}</span><button class="mini-btn danger" data-action="delete-project-log" data-project="${project.id}" data-id="${log.id}" aria-label="删除这条项目记录">×</button></div>`).join("")}${logs.length > 2 ? `<details class="history-more"><summary>展开更多记录（${logs.length - 2}）</summary><div class="history-more-list">${logs.slice(2).map((log) => `<div class="history-item" data-project-log="${esc(log.id)}"><time>${esc(log.date || "")}</time><span>${esc(log.text || "")}</span><button class="mini-btn danger" data-action="delete-project-log" data-project="${project.id}" data-id="${log.id}" aria-label="删除这条项目记录">×</button></div>`).join("")}</div></details>` : ""}</div>` : '<div class="empty-state">还没有推进记录。</div>'}
          </details>
        </article>
      `;
    }).join("") : (projectStatusFilter !== "all" || projectAreaFilter !== "all") ? '<div class="empty-state">没有找到匹配的未完成项目。</div>' : '<div class="empty-state">目前没有正在推进的项目，已完成项目已归档到日历看板。</div>';
  }

  function chartSummary(data) {
    if (!data.length) return uiText("还没有体重记录。", "No weight records yet.");
    if (data.length === 1) return currentLanguage === "en" ? `Current record: ${data[0].weight} kg.` : `当前记录为 ${data[0].weight} kg。`;
    const first = Number(data[0].weight);
    const last = Number(data[data.length - 1].weight);
    const change = Math.round((last - first) * 10) / 10;
    return currentLanguage === "en"
      ? `Last ${data.length} records: ${first} kg to ${last} kg, a change of ${change > 0 ? "+" : ""}${change} kg.`
      : `最近 ${data.length} 次记录从 ${first} kg 到 ${last} kg，变化 ${change > 0 ? "+" : ""}${change} kg。`;
  }

  function renderWeightChart(targetId, limit = 15) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const data = [...state.weightHistory]
      .filter((entry) => entry && entry.date && Number.isFinite(Number(entry.weight)))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-limit);
    if (!data.length) {
      target.innerHTML = `<div class="empty-state" style="margin-bottom:16px">${uiText("还没有体重记录，记录后会在这里形成折线。", "No weight records yet. Log one to start the trend.")}</div>`;
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
    const labelStep = Math.max(1, Math.ceil((data.length - 1) / 4));
    const pointNodes = data.map((entry, index) => {
      const anchor = index === 0 ? "start" : index === data.length - 1 ? "end" : "middle";
      const labelX = index === 0 ? x(index) + 5 : index === data.length - 1 ? x(index) - 5 : x(index);
      const labelY = Math.max(16, y(Number(entry.weight)) - 16);
      return `
      <g class="chart-record-point" tabindex="0" aria-label="${esc(entry.date)}, ${entry.weight} kg">
        <circle class="chart-point" cx="${x(index)}" cy="${y(Number(entry.weight))}" r="5"></circle>
        <text class="chart-hover-label" x="${labelX}" y="${labelY}" text-anchor="${anchor}" aria-hidden="true">${esc(`${entry.date.slice(5)} · ${entry.weight} kg`)}</text>
        ${index % labelStep === 0 || index === data.length - 1 ? `<text class="chart-label" x="${x(index)}" y="${height - 12}" text-anchor="middle">${esc(entry.date.slice(5))}</text>` : ""}
      </g>
    `;
    }).join("");
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    const difference = previous ? Math.round((Number(latest.weight) - Number(previous.weight)) * 10) / 10 : null;
    const differenceLabel = difference == null ? uiText("第一条记录", "First record") : uiText(`较上次 ${difference > 0 ? "+" : ""}${difference.toFixed(1)} kg`, `${difference > 0 ? "+" : ""}${difference.toFixed(1)} kg since previous record`);
    target.innerHTML = `
      <div class="trend-insight"><div><small>${uiText("最近一次体重", "Latest weight")}</small><strong>${esc(latest.weight)} <span>kg</span></strong></div><div><span>${esc(differenceLabel)}</span><time datetime="${esc(latest.date)}">${esc(latest.date)}</time></div></div>
      <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${uiText("体重折线图。", "Weight trend chart. ")}${esc(chartSummary(data))}">
        ${gridLines}
        ${data.length > 1 ? `<polyline class="chart-line" points="${points}"/>` : ""}
        ${pointNodes}
      </svg>
      <p class="chart-summary">${esc(chartSummary(data))}</p>
      <details><summary class="text-btn">${uiText("查看数据表", "View data table")}</summary><div class="data-table-scroll"><table class="data-table"><thead><tr><th>${uiText("日期", "Date")}</th><th>${uiText("体重", "Weight")}</th><th><span class="sr-only">${uiText("操作", "Actions")}</span></th></tr></thead><tbody>${data.map((entry) => `<tr><td>${esc(entry.date)}</td><td>${entry.weight} kg</td><td class="data-table-action"><button class="mini-btn danger" data-action="delete-weight" data-weight-date="${esc(entry.date)}" aria-label="${uiText("删除体重记录", "Delete weight record")} ${esc(entry.date)}">×</button></td></tr>`).join("")}</tbody></table></div></details>
    `;
  }

  function healthTrendDayKeys(limit = 365) {
    return Array.from({ length: limit }, (_, index) => addDays(todayKey(), -(limit - 1 - index)));
  }

  function renderMoodTrend() {
    const keys = healthTrendDayKeys();
    const moodClass = { "很好": "mood-great", "平稳": "mood-steady", "一般": "mood-okay", "低落": "mood-low" };
    const cells = keys.map((key) => {
      const mood = ensureDay(key).mood || "";
      const label = `${dayText(key)} · ${mood ? uiText(mood, { "很好": "Great", "平稳": "Steady", "一般": "Okay", "低落": "Low" }[mood] || mood) : uiText("无记录", "No record")}`;
      return `<span class="trend-cell mood-cell ${moodClass[mood] || ""}" title="${esc(label)}" aria-label="${esc(label)}"></span>`;
    }).join("");
    return `<div class="trend-grid mood-trend-grid" role="img" aria-label="${esc(uiText("过去365天情绪记录", "Mood records from the past 365 days"))}">${cells}</div>
      <div class="trend-range"><span>${esc(dayText(keys[0]))}</span><span>${esc(dayText(keys[keys.length - 1]))}</span></div>
      <div class="trend-legend"><span class="trend-legend-item"><i class="trend-legend-dot mood-great"></i>${uiText("很好", "Great")}</span><span class="trend-legend-item"><i class="trend-legend-dot mood-steady"></i>${uiText("平稳", "Steady")}</span><span class="trend-legend-item"><i class="trend-legend-dot mood-okay"></i>${uiText("一般", "Okay")}</span><span class="trend-legend-item"><i class="trend-legend-dot mood-low"></i>${uiText("低落", "Low")}</span></div>`;
  }

  function renderWaterTrend() {
    const keys = healthTrendDayKeys();
    const cells = keys.map((key) => {
      const water = Number(ensureDay(key).water) || 0;
      const level = Math.max(0, Math.min(8, Math.round(water)));
      const bucket = level ? Math.ceil(level / 2) : 0;
      const label = `${dayText(key)} · ${level ? `${level} ${uiText("杯", "cups")}` : uiText("无记录", "No record")}`;
      return `<span class="trend-cell water-cell ${bucket ? `water-level-${bucket}` : ""}" title="${esc(label)}" aria-label="${esc(label)}"></span>`;
    }).join("");
    return `<div class="trend-grid water-trend-grid" role="img" aria-label="${esc(uiText("过去365天饮水记录", "Hydration records from the past 365 days"))}">${cells}</div>
      <div class="trend-range"><span>${esc(dayText(keys[0]))}</span><span>${esc(dayText(keys[keys.length - 1]))}</span></div>
      <div class="trend-legend water-legend"><span class="trend-legend-item"><i class="trend-legend-dot water-level-1"></i>1–2 ${uiText("杯", "cups")}</span><span class="trend-legend-item"><i class="trend-legend-dot water-level-2"></i>3–4 ${uiText("杯", "cups")}</span><span class="trend-legend-item"><i class="trend-legend-dot water-level-3"></i>5–6 ${uiText("杯", "cups")}</span><span class="trend-legend-item"><i class="trend-legend-dot water-level-4"></i>7–8 ${uiText("杯", "cups")}</span></div>`;
  }

  function calorieRecordsForWindow(dayLimit) {
    const firstKey = addDays(todayKey(), -(dayLimit - 1));
    const lastKey = todayKey();
    return Object.entries(state.days)
      .filter(([key, day]) => isDateKey(key) && key >= firstKey && key <= lastKey && Number(day?.calories) > 0)
      .map(([date, day]) => ({ date, calories: Number(day.calories) }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  function calorieAverageMarkup(dayLimit) {
    const records = calorieRecordsForWindow(dayLimit);
    const average = records.length ? Math.round(records.reduce((sum, entry) => sum + entry.calories, 0) / records.length) : null;
    const label = uiText(`${dayLimit}天日均`, `${dayLimit}-day average`);
    const value = average == null ? uiText("无记录", "No record") : `${average} kcal`;
    return `<div class="calorie-average-item"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;
  }

  function renderCaloriesTrend() {
    const allRecords = Object.entries(state.days)
      .filter(([key, day]) => isDateKey(key) && Number(day?.calories) > 0)
      .map(([date, day]) => ({ date, calories: Number(day.calories) }))
      .sort((a, b) => a.date.localeCompare(b.date));
    const data = allRecords.slice(-15);
    const averageSummary = `<div class="calorie-average-grid">${[180, 90, 60, 30, 15].map(calorieAverageMarkup).join("")}</div>`;
    const dataTable = allRecords.length ? `<details data-calorie-table${calorieTableExpanded ? " open" : ""}><summary class="text-btn">${uiText("查看数据表", "View data table")}</summary><div class="data-table-scroll"><table class="data-table"><thead><tr><th>${uiText("日期", "Date")}</th><th>${uiText("热量", "Calories")}</th><th><span class="sr-only">${uiText("操作", "Actions")}</span></th></tr></thead><tbody>${allRecords.slice().reverse().map((entry) => `<tr><td>${esc(entry.date)}</td><td>${entry.calories} kcal</td><td class="data-table-action"><button class="mini-btn danger" data-action="delete-calorie" data-calorie-date="${esc(entry.date)}" aria-label="${uiText("删除热量记录", "Delete calorie record")} ${esc(entry.date)}">×</button></td></tr>`).join("")}</tbody></table></div></details>` : "";
    if (!data.length) return `<div class="empty-state">${uiText("记录热量后会在这里形成折线。", "Log calories to build this line.")}</div>${averageSummary}${dataTable}`;
    const width = 640;
    const height = 220;
    const left = 38;
    const right = 18;
    const top = 24;
    const bottom = 38;
    const values = data.map((entry) => entry.calories);
    let min = Math.min(...values);
    let max = Math.max(...values);
    if (min === max) { min -= 100; max += 100; }
    const padding = Math.max(80, (max - min) * 0.15);
    min -= padding;
    max += padding;
    const x = (index) => data.length === 1 ? width / 2 : left + (index / (data.length - 1)) * (width - left - right);
    const y = (value) => top + ((max - value) / (max - min)) * (height - top - bottom);
    const points = data.map((entry, index) => `${x(index)},${y(entry.calories)}`).join(" ");
    const gridLines = [0, 1, 2, 3].map((index) => {
      const yy = top + (index / 3) * (height - top - bottom);
      return `<line class="chart-grid" x1="${left}" y1="${yy}" x2="${width - right}" y2="${yy}"/>`;
    }).join("");
    const labelStep = Math.max(1, Math.ceil((data.length - 1) / 5));
    const pointNodes = data.map((entry, index) => {
      const showLabel = index === 0 || index === data.length - 1 || index % labelStep === 0;
      const anchor = index === 0 ? "start" : index === data.length - 1 ? "end" : "middle";
      const labelX = index === 0 ? x(index) + 5 : index === data.length - 1 ? x(index) - 5 : x(index);
      const labelY = Math.max(16, y(entry.calories) - 16);
      return `<g class="chart-record-point" tabindex="0" aria-label="${esc(entry.date)}, ${entry.calories} kcal"><circle class="chart-point calorie-point" cx="${x(index)}" cy="${y(entry.calories)}" r="${data.length > 24 ? 3.5 : 5}"></circle><text class="chart-hover-label" x="${labelX}" y="${labelY}" text-anchor="${anchor}" aria-hidden="true">${esc(`${entry.date.slice(5)} · ${entry.calories} kcal`)}</text>${showLabel ? `<text class="chart-label" x="${x(index)}" y="${height - 12}" text-anchor="middle">${esc(entry.date.slice(5))}</text>` : ""}</g>`;
    }).join("");
    const summary = currentLanguage === "en" ? `Latest ${data.length} calorie records.` : `最近 ${data.length} 次热量记录。`;
    return `<svg class="line-chart calorie-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(uiText("饮食热量折线图", "Calorie trend chart"))}">${gridLines}${data.length > 1 ? `<polyline class="chart-line calorie-line" points="${points}"/>` : ""}${pointNodes}</svg><p class="chart-summary">${esc(summary)}</p>${averageSummary}${dataTable}`;
  }

  function renderHealthTrendPanel() {
    const target = document.getElementById("healthTrendPanel");
    if (!target) return;
    const configs = {
      weight: ["体重趋势", "按日期形成折线趋势"],
      mood: ["情绪趋势", "过去365天的情绪记录"],
      water: ["饮水趋势", "过去365天的每日饮水量"],
      calories: ["饮食热量", "按日期形成热量折线"]
    };
    const [title, subtitle] = configs[healthTrendPanel] || configs.weight;
    document.getElementById("healthTrendTitle").textContent = uiText(title, { "体重趋势": "Weight trend", "情绪趋势": "Mood trend", "饮水趋势": "Hydration trend", "饮食热量": "Calorie trend" }[title]);
    document.getElementById("healthTrendSubtitle").textContent = uiText(subtitle, { "按日期形成折线趋势": "Trend by date", "过去365天的情绪记录": "Mood records from the past 365 days", "过去365天的每日饮水量": "Daily hydration from the past 365 days", "按日期形成热量折线": "Calories by date" }[subtitle]);
    if (healthTrendPanel === "weight") {
      target.innerHTML = `<div class="line-chart-wrap" id="weightChart"></div><form class="form-row" id="weightForm"><label class="sr-only" for="weightInput">今日体重，单位千克</label><input class="input" id="weightInput" type="number" step="0.1" min="0" inputmode="decimal" placeholder="今日体重（kg）" required /><button class="btn green" type="submit">记录</button></form>`;
      renderWeightChart("weightChart");
      return;
    }
    target.innerHTML = healthTrendPanel === "mood" ? renderMoodTrend() : healthTrendPanel === "water" ? renderWaterTrend() : renderCaloriesTrend();
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
    document.getElementById("waterMeter").innerHTML = Array.from({ length: 8 }, (_, index) => `<span class="water-cup ${index < water ? "full" : ""}" aria-hidden="true"><svg viewBox="0 0 28 34"><path d="M14 1C12 6 3 15 3 22a11 11 0 0 0 22 0C25 15 16 6 14 1Z"/></svg></span>`).join("");
    renderHealthTrendPanel();
  }

  function planFor(key, data = state) {
    const weekday = fromKey(key).getDay();
    const change = (data.workoutPlanChanges || [])
      .filter((item) => item.weekday === weekday && item.effectiveFrom <= key)
      .sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom))[0];
    return change?.plan || workoutPlans[weekday];
  }

  function localizedPlanTitle(title) {
    if (currentLanguage !== "en") return title;
    return {
      "力量 A": "Strength A",
      "力量 B": "Strength B",
      "力量 C": "Strength C",
      "有氧 A": "Cardio A",
      "有氧 B": "Cardio B",
      "恢复日": "Recovery day",
      "休息日": "Rest day"
    }[title] || title;
  }

  function localizedWorkoutText(value) {
    if (currentLanguage !== "en") return value;
    return WORKOUT_TEXT_EN[String(value || "").trim()] || value;
  }

  function workoutSummaryFromItems(items) {
    const count = items.length;
    if (!count) return uiText("暂无训练项目", "No exercises yet");
    let min = 0;
    let max = 0;
    items.forEach((item) => {
      const matches = [...String(item?.[2] || "").matchAll(/(\d+)\s*(?:[–-]\s*(\d+)\s*)?分钟/g)];
      matches.forEach((match) => {
        min += Number(match[1]) || 0;
        max += Number(match[2] || match[1]) || 0;
      });
    });
    if (min > 0) return currentLanguage === "en" ? `${count} exercises · about ${min}–${max} minutes` : `${count} 个项目 · 约 ${min}–${max} 分钟`;
    return uiText(`${count} 个项目 · 按计划完成`, `${count} exercises · follow the plan`);
  }

  function workoutDraftFor(key, plan = planFor(key)) {
    if (!workoutDraft || workoutDraft.key !== key) {
      workoutDraft = {
        key,
        title: String(plan.title || ""),
        items: normalizeWorkoutPlanItems(plan.items)
      };
    }
    return workoutDraft;
  }

  function syncWorkoutDraftFromForm(form) {
    const key = form?.dataset.workoutEditor;
    if (!key) return null;
    const draft = workoutDraftFor(key);
    draft.title = form.elements["workout-title"]?.value.trim() || "";
    draft.items = [...form.querySelectorAll(".workout-edit-row")].map((row, index) => [
      String(index + 1),
      row.querySelector("[data-workout-name]")?.value.trim() || "",
      row.querySelector("[data-workout-detail]")?.value.trim() || ""
    ]);
    return draft;
  }

  function workoutEditorMarkup(key, plan) {
    const draft = workoutDraftFor(key, plan);
    const weekday = fromKey(key).getDay();
    const weekdayLabel = currentLanguage === "en" ? WEEKDAYS_EN[weekday] : `周${"日一二三四五六"[weekday]}`;
    const helper = currentLanguage === "en"
      ? `Drag a row to reorder it. Changes apply from ${dayText(key)} to this day and all future ${weekdayLabel} sessions; past dates stay unchanged.`
      : `拖动项目行可调整顺序。修改将从 ${dayText(key)} 起，应用于当天及以后所有${weekdayLabel}；过去日期保持原样。`;
    return `
      <form class="workout-editor" data-workout-editor="${key}">
        <div class="workout-edit-meta">
          <label class="field"><span>安排名称</span><input class="inline-input" name="workout-title" maxlength="40" value="${esc(draft.title)}" required /></label>
          <label class="field"><span>简要说明</span><output class="inline-input workout-subtitle-output" data-workout-summary>${esc(workoutSummaryFromItems(draft.items))}</output></label>
        </div>
        <div class="workout-edit-list">
          ${draft.items.length ? draft.items.map(([number, title, detail], index) => `
            <div class="workout-edit-row" draggable="true" data-workout-row-index="${index}">
              <span class="workout-edit-index" title="拖动调整顺序" aria-label="拖动调整顺序">${esc(number)}</span>
              <label class="field"><span class="sr-only">运动名称</span><input class="inline-input" data-workout-name="${index}" maxlength="60" value="${esc(title)}" placeholder="运动名称" required /></label>
              <label class="field"><span class="sr-only">运动时间或次数</span><input class="inline-input" data-workout-detail="${index}" maxlength="100" value="${esc(detail)}" placeholder="时间或次数" /></label>
              <button class="mini-btn danger workout-row-remove" type="button" data-action="delete-workout-item" data-workout-date="${key}" data-workout-index="${index}" aria-label="删除运动项目">×</button>
            </div>
          `).join("") : '<div class="empty-state">还没有运动项目。</div>'}
        </div>
        <button class="btn secondary workout-add-item" type="button" data-action="add-workout-item" data-workout-date="${key}">＋ 添加运动项目</button>
        <div class="workout-edit-actions"><button class="btn green" type="submit">保存安排</button><button class="btn secondary" type="button" data-action="cancel-workout-edit">取消</button></div>
        <p class="helper">${esc(helper)}</p>
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
          <div class="subhead"><div><strong>${esc(localizedPlanTitle(plan.title))}</strong><p>${esc(workoutSummaryFromItems(plan.items))}</p></div><div class="workout-actions"><button class="edit-btn" data-action="edit-workout" data-workout-date="${key}">${uiText("编辑", "Edit")}</button><button class="btn ${day.fitness ? "green" : "secondary"}" data-action="toggle-workout" data-workout-date="${key}">${day.fitness ? uiText("已完成", "Completed") : uiText("完成", "Done")}</button></div></div>
          <div class="workout-items">${plan.items.map(([number, title, detail]) => `<div class="workout-item"><b>${esc(number)}</b><span data-no-translate="true">${esc(title)}</span><small data-no-translate="true">${esc(detail)}</small></div>`).join("")}</div>
        `}
      </div>
    `;
  }

  function routineDragHandleMarkup(id) {
    const label = uiText("拖动调整顺序，也可使用上下方向键", "Drag to reorder, or use the arrow keys");
    return `<button class="routine-drag-handle" type="button" draggable="true" data-routine-drag="${esc(id)}" aria-label="${esc(label)}" title="${esc(label)}">⠿</button>`;
  }

  function reorderRoutine(sourceId, targetId, insertAfter = false) {
    const items = currentRoutineItems();
    const from = items.findIndex((item) => item.id === sourceId);
    const target = items.findIndex((item) => item.id === targetId);
    if (from < 0 || target < 0 || from === target) return false;
    let destination = target + (insertAfter ? 1 : 0);
    const [item] = items.splice(from, 1);
    if (from < destination) destination -= 1;
    items.splice(destination, 0, item);
    save();
    renderFitness();
    return true;
  }

  function routineMarkup(key, context = "fitness") {
    const day = ensureDay(key);
    const items = currentRoutineItems();
    if (!editingRoutines) {
      return `<div class="routine-list">${items.map((item) => `
        <div class="routine-row" data-routine-row="${esc(item.id)}">${routineDragHandleMarkup(item.id)}<label class="routine-row-content"><input class="check" type="checkbox" data-routine="${esc(item.id)}" data-routine-date="${key}" ${day.routines[item.id] ? "checked" : ""} /><span><strong data-no-translate="true">${esc(item.title)}</strong><small data-no-translate="true">${esc(item.detail)}</small></span></label></div>
      `).join("")}</div>`;
    }
    return `
      <div class="routine-list routine-edit-list">
        ${items.map((item) => `
          <div class="routine-edit-row" data-routine-row="${esc(item.id)}">
            ${routineDragHandleMarkup(item.id)}
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
        <div class="wide form-row"><button class="btn green" type="submit">添加项目</button><button class="btn secondary" type="button" data-action="save-routine-edit">${uiText("保存安排", "Save plan")}</button></div>
      </form>
    `;
  }

  function supplementaryTrainingPanelMarkup(panel) {
    return `
      <article class="card training-panel" data-search-training="${esc(panel.id)}">
        <div class="card-head"><div><h3>${esc(panel.title)}</h3><small>${esc(panel.note || "")}</small></div></div>
        <div class="training-row-list">
          ${panel.rows.length ? panel.rows.map((row) => `<div class="training-row"><strong data-no-translate="true">${esc(row.action || "未命名动作")}</strong><span data-no-translate="true">${esc(row.frequency || "未设置频次")}</span></div>`).join("") : '<div class="empty-state">还没有动作。</div>'}
        </div>
      </article>
    `;
  }

  function supplementaryTrainingEditorMarkup(panel) {
    return `
      <article class="card training-panel training-panel-editor" data-supplementary-panel="${esc(panel.id)}" data-search-training="${esc(panel.id)}">
        <div class="card-head"><div><span class="tag neutral">专项训练</span></div></div>
        <div class="form-grid training-panel-editor-fields">
          <label class="field"><span>面板名称</span><input class="input" data-supplementary-title="${esc(panel.id)}" maxlength="50" value="${esc(panel.title)}" required /></label>
          <label class="field"><span>补充说明</span><textarea class="textarea" data-supplementary-note="${esc(panel.id)}" maxlength="100" rows="2">${esc(panel.note)}</textarea></label>
        </div>
        <div class="supplementary-row-editor-list">
          ${panel.rows.length ? panel.rows.map((row) => `
            <div class="supplementary-row-editor">
              <label class="field"><span>动作</span><textarea class="textarea" data-supplementary-action="${esc(row.id)}" data-supplementary-panel-id="${esc(panel.id)}" maxlength="80" rows="2" placeholder="动作名称">${esc(row.action)}</textarea></label>
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
      <div class="fitness-summary-head"><div><h3>${uiText("本周运动概况", "This week's workout summary")}</h3><small>${esc(dayText(week[0]))} — ${esc(dayText(week[week.length - 1]))}</small></div><span class="tag ${completed === trainingDays.length ? "green" : ""}">${completed === trainingDays.length ? uiText("本周已完成", "Week completed") : uiText("进行中", "In progress")}</span></div>
      <div class="fitness-summary-stats">
        <div class="fitness-summary-stat"><span>${uiText("已完成运动日", "Completed workout days")}</span><strong>${completed} ${uiText("天", "days")}</strong><small>${uiText("本周训练记录", "This week's workout records")}</small></div>
        <div class="fitness-summary-stat"><span>${uiText("完美周", "Perfect weeks")}</span><strong>${perfectWeeks} ${uiText("周", "weeks")}</strong><small>${uiText("每天完成运动计划", "Workout plan completed every day")}</small></div>
        <div class="fitness-summary-stat"><span>${uiText("本周计划进度", "This week's plan progress")}</span><strong>${weekProgress}%</strong><small>${completed} / ${trainingDays.length} ${uiText("个训练日", "training days")}</small></div>
        <div class="fitness-summary-stat"><span>${uiText("连续完成天数", "Consecutive days")}</span><strong>${streak} ${uiText("天", "days")}</strong><small>${uiText("按训练计划完成记录连续计算", "Counted from workout-plan completion records")}</small></div>
      </div>
    `;
    renderFitnessCalendar();
    document.getElementById("fitnessDateTitle").textContent = dayText(selectedFitnessDate);
    document.getElementById("fitnessDateHint").textContent = selectedFitnessDate === todayKey() ? uiText("今天", "Today") : localizedPlanTitle(planFor(selectedFitnessDate).title);
    document.getElementById("fitnessDayPlan").innerHTML = workoutMarkup(selectedFitnessDate, "fitness");
    document.getElementById("fitnessRoutines").innerHTML = routineMarkup(selectedFitnessDate);
    const panels = currentSupplementaryTraining();
    const panelActions = document.getElementById("supplementTrainingSectionActions");
    if (panelActions) {
      panelActions.innerHTML = `${editingSupplementaryTraining ? '<button class="btn green" data-action="add-supplementary-panel">＋ 增加面板</button>' : ""}<button class="text-btn" data-action="toggle-supplementary-edit">${editingSupplementaryTraining ? uiText("完成", "Done") : uiText("编辑", "Edit")}</button>`;
    }
    document.getElementById("supplementTrainingPanels").classList.toggle("is-editing", editingSupplementaryTraining);
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
      const status = completed ? uiText("，训练已完成", "; workout completed") : scheduled ? uiText("，计划训练日", "; scheduled workout day") : "";
      const event = eventMarker ? uiText("，有重要日期", "; important date") : "";
      cells.push(`<button class="fitness-cal-day ${key === selectedFitnessDate ? "selected" : ""} ${key === todayKey() ? "today" : ""} ${completed ? "completed" : ""} ${eventMarker ? "has-event" : ""}" data-action="select-fitness-date" data-fitness-date="${key}" aria-label="${esc(dayText(key))}${status}${event}" ${key === selectedFitnessDate ? 'aria-pressed="true"' : ""}><span>${day}</span><i class="fitness-cal-marker" aria-hidden="true">${completed ? "👏" : scheduled ? "·" : ""}</i></button>`);
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

  function trainingStreak(startKey = selectedFitnessDate) {
    let cursor = fromKey(startKey);
    const cursorKey = keyOf(cursor);
    if (TRAINING_WEEKDAYS.includes(cursor.getDay()) && !state.days[cursorKey]?.fitness) return 0;
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
        <div class="todo-row-actions"><button class="mini-btn" type="button" data-action="move-task-to-master" data-id="${task.id}" data-task-date="${key}" aria-label="${uiText("移到长期待办", "Move to long-term tasks")}" title="${uiText("移到长期待办", "Move to long-term tasks")}">⇧</button>
        ${task.done ? "" : `<button class="mini-btn task-defer-btn" data-action="defer-task" data-id="${task.id}" data-task-date="${key}" aria-label="顺延到明天" title="顺延到明天">→</button>`}
        <button class="mini-btn danger" data-action="delete-task" data-id="${task.id}" data-task-date="${key}" aria-label="删除待办">×</button>
        </div>
      </div>
    `).join("");
  }

  function renderReminders() {
    const stats = completionFor(selectedDate);
    document.getElementById("reminderDateTitle").textContent = dayText(selectedDate);
    document.getElementById("reminderProgress").textContent = currentLanguage === "en" ? `${stats.done} / ${stats.total} complete` : `${stats.done} / ${stats.total} 项完成`;
    document.getElementById("reminderList").innerHTML = taskRows(selectedDate, "reminders");
    document.getElementById("inspirationDateLabel").textContent = dayText(selectedDate);
    document.getElementById("dayInspirationInput").value = localizedInspiration(ensureDay(selectedDate));
    renderBreezeGuide();
  }

  function moveTodoBetweenLists(direction, id, date = todayKey()) {
    if (direction === "today") {
      const index = state.milestones.findIndex((item) => item.id === id);
      if (index < 0) return false;
      const item = state.milestones[index];
      const tasks = ensureDay(todayKey()).tasks;
      tasks.push({ ...item, id: tasks.some((task) => task.id === id) ? uid("task") : id, text: item.title, area: item.area || "生活" });
      state.milestones.splice(index, 1);
      return true;
    }
    if (direction !== "master") return false;
    const tasks = state.days[date]?.tasks;
    const index = tasks?.findIndex((item) => item.id === id) ?? -1;
    if (index < 0) return false;
    const task = tasks[index];
    state.milestones.push({ ...task, id: state.milestones.some((item) => item.id === id) ? uid("todo") : id, title: task.text, note: task.note || "", createdAt: task.createdAt || date, completedAt: task.done ? (task.completedAt || date) : "" });
    tasks.splice(index, 1);
    return true;
  }

  function renderMilestones() {
    const done = state.milestones.filter((item) => item.done).length;
    const pending = state.milestones.filter((item) => !item.done);
    document.getElementById("masterTodoProgress").textContent = currentLanguage === "en"
      ? `${done} / ${state.milestones.length} done`
      : `已完成 ${done} / 共 ${state.milestones.length}`;
    document.getElementById("masterTodoList").innerHTML = pending.length ? pending.map((item) => `
      <div class="master-todo-row" data-master-todo-row="${item.id}">
        <button class="master-todo-drag-handle" type="button" draggable="true" data-master-todo-drag="${item.id}" aria-label="${esc(uiText("拖动调整顺序，也可使用上下方向键", "Drag to reorder, or use the arrow keys"))}" title="${esc(uiText("拖动调整顺序，也可使用上下方向键", "Drag to reorder, or use the arrow keys"))}">⠿</button>
        <input class="check" type="checkbox" data-master-done="${item.id}" ${item.done ? "checked" : ""} aria-label="切换待办完成状态" />
        <div class="fields">
          <div class="master-todo-title-line">${editingMasterTodos ? `<input class="inline-input" data-master-title="${item.id}" value="${esc(item.title)}" aria-label="修改待办内容" />` : `<strong>${esc(item.title)}</strong>`}</div>
          ${editingMasterTodos ? `<input class="inline-input" data-master-note="${item.id}" value="${esc(item.note || "")}" placeholder="补充说明" aria-label="修改补充说明" />` : (item.note ? `<p class="master-todo-note">${esc(item.note)}</p>` : "")}
        </div>
        <div class="todo-row-actions"><button class="mini-btn" type="button" data-action="move-master-to-today" data-id="${item.id}" aria-label="${uiText("移到今日待办", "Move to today's tasks")}" title="${uiText("移到今日待办", "Move to today's tasks")}">↘</button><button class="mini-btn danger" data-action="delete-master-todo" data-id="${item.id}" aria-label="删除待办">×</button></div>
      </div>
    `).join("") : '<div class="empty-state">没有未完成的长期待办，已完成事项会归档到日历看板。</div>';
    const list = document.getElementById("masterTodoList");
    const toggle = document.getElementById("masterTodoExpand");
    list.classList.toggle("is-expanded", masterTodosExpanded);
    toggle.textContent = masterTodosExpanded ? uiText("收起", "Show less") : uiText("展开查看", "Show all");
    toggle.setAttribute("aria-expanded", String(masterTodosExpanded));
    requestAnimationFrame(() => { toggle.hidden = !masterTodosExpanded && list.scrollHeight <= list.clientHeight + 1; });

    document.getElementById("eventList").innerHTML = state.events.length ? [...state.events].sort((a, b) => a.date.localeCompare(b.date)).map((event) => {
      const date = fromKey(event.date);
      const monthLabel = currentLanguage === "en" ? MONTHS_SHORT_EN[date.getMonth()] : `${date.getMonth() + 1}月`;
      return `<div class="event-row" data-action="edit-event" data-id="${event.id}" role="button" tabindex="0" title="${esc(uiText("点击日期编辑", "Click the date to edit"))}"><div class="event-date"><span><small>${monthLabel}</small>${date.getDate()}</span></div><div><strong>${esc(event.title)}</strong><p>${esc(event.copy || "")}</p><small class="event-repeat">${eventRepeatLabel(event.repeat)}</small></div><button class="mini-btn danger" data-action="delete-event" data-id="${event.id}" aria-label="删除重要日期">×</button></div>`;
    }).join("") : '<div class="empty-state">还没有重要日期。</div>';
  }

  function reorderMasterTodo(sourceId, targetId, insertAfter = false) {
    const pending = state.milestones.filter((item) => !item.done);
    const sourceIndex = pending.findIndex((item) => item.id === sourceId);
    const targetIndex = pending.findIndex((item) => item.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return false;

    let insertIndex = targetIndex + (insertAfter ? 1 : 0);
    const [moved] = pending.splice(sourceIndex, 1);
    if (sourceIndex < insertIndex) insertIndex -= 1;
    pending.splice(Math.max(0, Math.min(insertIndex, pending.length)), 0, moved);

    let pendingIndex = 0;
    state.milestones = state.milestones.map((item) => item.done ? item : pending[pendingIndex++]);
    save();
    renderMilestones();
    return true;
  }

  function resetCalendarPanelDates(date) {
    Object.keys(calendarPanelDates).forEach((panel) => { calendarPanelDates[panel] = date; });
  }

  function shiftCalendarPanelDate(panel, offset) {
    if (!Object.hasOwn(calendarPanelDates, panel)) return false;
    calendarPanelDates[panel] = addDays(calendarPanelDates[panel], offset);
    return true;
  }

  function calendarDayNavMarkup(panel) {
    return `<div class="day-panel-nav" role="group" aria-label="${uiText("切换当前面板日期", "Change this panel's date")}"><button class="mini-btn" type="button" data-action="calendar-prev-day" data-calendar-panel="${panel}" aria-label="${uiText("前一天", "Previous day")}" title="${uiText("前一天", "Previous day")}">‹</button><button class="mini-btn" type="button" data-action="calendar-next-day" data-calendar-panel="${panel}" aria-label="${uiText("后一天", "Next day")}" title="${uiText("后一天", "Next day")}">›</button></div>`;
  }

  function updateCalendarPanelPreviews(panel = "") {
    const ids = { workout: "calendarWorkoutPanel", work: "calendarWorkPanel", projects: "calendarProjectLogPanel" };
    Object.entries(ids).forEach(([key, id]) => {
      if (panel && panel !== key) return;
      const card = document.getElementById(id);
      if (!card?.classList) return;
      card.classList.add("calendar-preview-panel");
      const expanded = expandedCalendarPanels.has(key) || (key === "workout" && editingWorkoutDate === calendarPanelDates.workout);
      card.classList.toggle("is-expanded", expanded);
      const button = card.querySelector(".calendar-panel-toggle");
      if (button) {
        button.textContent = expanded ? uiText("收起", "Show less") : uiText("展开查看", "Show all");
        button.setAttribute("aria-expanded", String(expanded));
        const content = card.querySelector(".calendar-panel-content");
        content.id = `${id}Content`;
        button.setAttribute("aria-controls", content.id);
        button.hidden = false;
        requestAnimationFrame(() => {
          if (!expanded && content.clientHeight > 0) button.hidden = content.scrollHeight <= content.clientHeight + 1;
        });
      }
    });
  }

  function renderDayDashboard(panel = "") {
    const workoutDate = calendarPanelDates.workout;
    const workDate = calendarPanelDates.work;
    const projectDate = calendarPanelDates.projects;
    const inspirationDate = calendarPanelDates.inspiration;
    const day = ensureDay(selectedDate);
    const healthEditing = editingCalendarHealthDate === selectedDate && calendarHealthDraft;
    const stats = completionFor(workDate);
    const weight = weightOn(selectedDate);
    const logs = projectLogsOn(projectDate);
    const unrecorded = uiText("未记录", "Not recorded");
    const cupUnit = uiText("杯", "cups");
    const itemUnit = uiText("项", "items");
    const moodOptions = [
      ["", unrecorded],
      ["很好", uiText("很好", "Great")],
      ["平稳", uiText("平稳", "Steady")],
      ["一般", uiText("一般", "Okay")],
      ["低落", uiText("低落", "Low")]
    ];
    const energyOptions = [
      ["", unrecorded],
      ["充足", uiText("充足", "Energized")],
      ["正常", uiText("正常", "Normal")],
      ["偏低", uiText("偏低", "Low")],
      ["疲惫", uiText("疲惫", "Tired")]
    ];
    const healthSelect = (field, label, options, value) => `
      <select class="summary-control" data-calendar-health-draft="${field}" aria-label="${esc(label)}">
        ${options.map(([optionValue, optionLabel]) => `<option value="${esc(optionValue)}" ${optionValue === value ? "selected" : ""}>${esc(optionLabel)}</option>`).join("")}
      </select>
    `;
    const waterValue = Math.max(0, Math.min(8, Number(day.water) || 0));
    const weightValue = weight ? String(weight.weight) : "";
    const caloriesValue = String(day.calories ?? "");
    const moodLabel = (value) => moodOptions.find(([optionValue]) => optionValue === value)?.[1] || value || unrecorded;
    const energyLabel = (value) => energyOptions.find(([optionValue]) => optionValue === value)?.[1] || value || unrecorded;
    if (!panel || panel === "workout") document.getElementById("calendarWorkoutPanel").innerHTML = `
      <div class="card-head"><div><h3>${uiText("运动安排", "Workout plan")}</h3><small>${esc(dayText(workoutDate))} · ${esc(localizedPlanTitle(planFor(workoutDate).title))}</small></div>${calendarDayNavMarkup("workout")}</div>
      <div class="calendar-panel-content">${workoutMarkup(workoutDate, "calendar")}</div>
      <button class="text-btn calendar-panel-toggle" type="button" data-action="toggle-calendar-panel" data-calendar-panel="workout">${uiText("展开查看", "Show all")}</button>
    `;
    if (!panel || panel === "work") document.getElementById("calendarWorkPanel").innerHTML = `
      <div class="card-head"><div><h3>${uiText("待办事项", "Tasks")}</h3><small>${esc(dayText(workDate))}</small></div><div class="day-panel-head-actions"><span class="tag neutral">${stats.done} / ${stats.total}</span>${calendarDayNavMarkup("work")}</div></div>
      <div class="calendar-panel-content">
        <div class="todo-list">${taskRows(workDate, "calendar")}</div>
      </div>
        <form class="form-row" id="calendarTaskForm" data-task-date="${workDate}" style="margin-top:10px"><label class="sr-only" for="calendarTaskInput">添加当天待办</label><input class="input" id="calendarTaskInput" maxlength="120" placeholder="添加当天待办" required /><button class="btn green" type="submit">添加</button></form>
      <button class="text-btn calendar-panel-toggle" type="button" data-action="toggle-calendar-panel" data-calendar-panel="work">${uiText("展开查看", "Show all")}</button>
    `;

    if (!panel) document.getElementById("calendarHealthPanel").innerHTML = `
      ${healthEditing ? `
        <section class="day-section health-summary-section">
          <div class="day-summary calendar-health-summary">
            <div class="summary-item editable-summary-item"><small>${uiText("心情", "Mood")}</small>${healthSelect("mood", uiText("编辑心情", "Edit mood"), moodOptions, calendarHealthDraft.mood)}</div>
            <div class="summary-item editable-summary-item"><small>${uiText("精力", "Energy")}</small>${healthSelect("energy", uiText("编辑精力", "Edit energy"), energyOptions, calendarHealthDraft.energy)}</div>
            <div class="summary-item editable-summary-item"><small>${uiText("饮水", "Hydration")}</small><div class="summary-control-row"><input class="summary-control summary-number" type="number" min="0" max="8" step="1" inputmode="numeric" data-calendar-health-draft="water" value="${esc(calendarHealthDraft.water)}" aria-label="${esc(uiText("编辑饮水杯数", "Edit hydration cups"))}" /><span>${cupUnit}</span></div></div>
            <div class="summary-item editable-summary-item"><small>${uiText("体重", "Weight")}</small><div class="summary-control-row"><input class="summary-control summary-number" type="number" min="0" step="0.1" inputmode="decimal" data-calendar-health-draft="weight" value="${esc(calendarHealthDraft.weight)}" placeholder="${esc(unrecorded)}" aria-label="${esc(uiText("编辑体重", "Edit weight"))}" /><span>kg</span></div></div>
            <div class="summary-item editable-summary-item"><small>${uiText("热量", "Calories")}</small><div class="summary-control-row"><input class="summary-control summary-number" type="number" min="0" step="1" inputmode="numeric" data-calendar-health-draft="calories" value="${esc(calendarHealthDraft.calories)}" placeholder="${esc(unrecorded)}" aria-label="${esc(uiText("编辑摄入热量", "Edit calorie intake"))}" /><span>kcal</span></div></div>
          </div>
        </section>
        <section class="day-section">
          <div class="form-grid health-notes-grid">
            <label class="field wide"><span>${uiText("饮食简记", "Food notes")}</span><textarea class="textarea" data-calendar-health-draft="food" placeholder="${uiText("记录主要食物和大致份量", "Record main foods and approximate portions")}">${esc(calendarHealthDraft.food)}</textarea></label>
            <label class="field wide"><span>${uiText("当天复盘", "Daily review")}</span><textarea class="textarea" data-calendar-health-draft="notes" placeholder="${uiText("记录推进情况和明天需要继续的事项", "Record progress and what should continue tomorrow")}">${esc(calendarHealthDraft.notes)}</textarea></label>
          </div>
          <div class="calendar-health-edit-actions"><button class="btn green" type="button" data-action="save-calendar-health">${uiText("保存记录", "Save records")}</button><button class="btn secondary" type="button" data-action="cancel-calendar-health-edit">${uiText("取消", "Cancel")}</button></div>
        </section>
      ` : `
        <div class="calendar-health-readonly-layout">
        <section class="day-section health-summary-section">
          <div class="day-summary calendar-health-summary calendar-health-readonly-summary">
            <div class="summary-item"><small>${uiText("心情", "Mood")}</small><strong>${esc(moodLabel(day.mood))}</strong></div>
            <div class="summary-item"><small>${uiText("精力", "Energy")}</small><strong>${esc(energyLabel(day.energy))}</strong></div>
            <div class="summary-item"><small>${uiText("饮水", "Hydration")}</small><strong>${waterValue} ${esc(cupUnit)}</strong></div>
            <div class="summary-item"><small>${uiText("体重", "Weight")}</small><strong>${weight ? `${esc(weightValue)} kg` : esc(unrecorded)}</strong></div>
            <div class="summary-item"><small>${uiText("热量", "Calories")}</small><strong>${caloriesValue.trim() ? `${esc(caloriesValue)} kcal` : esc(unrecorded)}</strong></div>
          </div>
        </section>
        <section class="day-section calendar-health-readonly-notes">
          <div class="health-readonly-note ${day.food.trim() ? "has-record" : ""}"><small>${uiText("饮食简记", "Food notes")}</small><p title="${esc(day.food || "")}">${day.food.trim() ? esc(day.food) : esc(unrecorded)}</p></div>
          <div class="health-readonly-note ${day.notes.trim() ? "has-record" : ""}"><small>${uiText("当天复盘", "Daily review")}</small><p title="${esc(day.notes || "")}">${day.notes.trim() ? esc(day.notes) : esc(unrecorded)}</p></div>
        </section>
        </div>
      `}
    `;

    if (!panel || panel === "projects") document.getElementById("calendarProjectLogPanel").innerHTML = `
      <div class="card-head"><div><h3>${uiText("项目推进记录", "Project updates")}</h3><small>${esc(dayText(projectDate))} · ${uiText("当天的项目更新", "Project updates for this day")}</small></div><div class="day-panel-head-actions"><span class="tag neutral">${logs.length} ${currentLanguage === "en" ? "updates" : "条"}</span>${calendarDayNavMarkup("projects")}</div></div>
      <div class="calendar-panel-content">${logs.length ? `<div class="calendar-project-log-list">${logs.map((log) => `<div class="history-item"><time>${esc(log.project)}</time><span>${esc(log.text)}</span><span></span></div>`).join("")}</div>` : '<div class="empty-state">当天没有项目推进记录。</div>'}</div>
      <button class="text-btn calendar-panel-toggle" type="button" data-action="toggle-calendar-panel" data-calendar-panel="projects">${uiText("展开查看", "Show all")}</button>
    `;

    if (!panel || panel === "inspiration") document.getElementById("calendarInspirationPanel").innerHTML = `
      <div class="card-head"><div><h3>${uiText("今日灵感", "Today's inspiration")}</h3><small>${esc(dayText(inspirationDate))} · ${uiText("与日常提醒同步", "Synced with daily reminders")}</small></div>${calendarDayNavMarkup("inspiration")}</div>
      <textarea class="textarea inspiration-textarea" data-inspiration-input="calendar" data-inspiration-date="${inspirationDate}" placeholder="${esc(uiText("记录今天捕捉到的灵感、片段或想继续观察的方向", "Capture an idea, fragment, or direction to keep exploring today"))}">${esc(localizedInspiration(ensureDay(inspirationDate)))}</textarea>
      <button class="btn secondary" data-action="save-inspiration" data-inspiration-source="calendar" style="margin-top:10px">${uiText("保存今日灵感", "Save today's inspiration")}</button>
    `;

    updateCalendarPanelPreviews(panel);
    if (panel) return;
    const completed = completedItems();
    const filterOptions = completedProjectFilterOptions();
    if (!filterOptions.includes(completedProjectFilter)) completedProjectFilter = "全部";
    const filteredCompleted = completedProjectFilter === "全部"
      ? completed
      : completed.filter((item) => item.tags.includes(completedProjectFilter));
    document.getElementById("calendarCompletedPanel").innerHTML = `
      <div class="card-head completed-project-card-head"><div><h3>已完成项目</h3><small>完成的长期待办和工作项目会归档到这里 · 工作项目显示立项到完成的日期范围</small></div><div class="completed-project-tools"><label class="completed-project-filter"><span>筛选标签</span><select class="select" id="completedProjectFilter">${filterOptions.map((option) => `<option value="${esc(option)}" ${option === completedProjectFilter ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></label><span class="tag neutral">${completedProjectFilter === "全部" ? completed.length : `${filteredCompleted.length} / ${completed.length}`} 项</span></div></div>
      ${filteredCompleted.length ? `<div class="completed-project-list">${filteredCompleted.map((item) => `<div class="completed-project-row" data-history-id="${esc(item.id)}" data-history-type="${esc(item.type)}"><div><div class="completed-project-title">${item.tags.map((tag) => `<span class="tag neutral">${esc(tag)}</span>`).join("")}<button class="completed-project-name" type="button" data-action="open-project-history" data-history-id="${esc(item.id)}" data-history-type="${esc(item.type)}" aria-label="${esc(uiText("查看项目历史记录：", "View project history: "))}${esc(item.title)}">${esc(item.title)}</button></div>${completedDescriptionMarkup(item.description)}</div>${item.dateRange ? `<time class="completed-project-range">${esc(item.dateRange)}</time>` : ""}</div>`).join("")}</div>` : `<div class="empty-state">${completed.length ? "该标签下还没有已完成项目。" : "还没有已完成项目。"}</div>`}
    `;
  }

  function footprintDateKeys() {
    const dates = Object.keys(state.days).filter(isDateKey).sort();
    const today = todayKey();
    const start = dates.length && dates[0] < today ? dates[0] : addDays(today, -364);
    const keys = [];
    for (let key = start; key <= today; key = addDays(key, 1)) keys.push(key);
    return keys.length ? keys : [today];
  }

  function footprintMetricMarkup(label, value, note) {
    return `<div class="footprint-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></div>`;
  }

  function monthlyActivityFor(month, data = state) {
    const inMonth = (date) => isDateKey(date) && date.slice(0, 7) === month;
    const tasks = [];
    const workouts = [];
    const health = [];
    const reviews = [];
    const routines = new Map();
    const names = new Map((data.routineItems || []).map((item) => [item.id, item.title]));
    const weights = new Map((data.weightHistory || []).filter((item) => inMonth(item.date) && Number(item.weight) > 0).map((item) => [item.date, item.weight]));
    const dates = [...new Set([...Object.keys(data.days || {}), ...weights.keys()])].filter(inMonth).sort();
    let inspirationCount = 0;
    dates.forEach((date) => {
      const day = data.days?.[date] || {};
      (day.tasks || []).filter((task) => task.done).forEach((task) => tasks.push({ date, text: task.text }));
      if (day.fitness) workouts.push(date);
      Object.entries(day.routines || {}).forEach(([id, done]) => {
        if (!done) return;
        if (!routines.has(id)) routines.set(id, { id, title: names.get(id) || "", dates: [] });
        routines.get(id).dates.push(date);
      });
      if (String(day.inspiration || day.inspirationEn || "").trim()) inspirationCount += 1;
      if (String(day.notes || "").trim()) reviews.push({ date, text: day.notes });
      if (Number(day.water) > 0 || weights.has(date) || [day.mood, day.energy, day.food, day.calories].some((value) => String(value ?? "").trim())) {
        health.push({ ...day, date, weight: weights.get(date) });
      }
    });
    (data.milestones || []).filter((item) => item.done && inMonth(item.completedAt)).forEach((item) => {
      tasks.push({ date: item.completedAt, text: item.title, source: "long-term" });
    });
    tasks.sort((a, b) => a.date.localeCompare(b.date));
    const projects = (data.projects || []).map((project) => ({
      id: project.id,
      title: project.title,
      updates: (project.logs || []).filter((log) => inMonth(log.date) && String(log.text || "").trim()).slice().sort((a, b) => a.date.localeCompare(b.date))
    })).filter((project) => project.updates.length);
    return { tasks, routines: [...routines.values()], workouts, health, reviews, projects, inspirationCount };
  }

  function renderMonthlyActivity() {
    const target = document.getElementById("monthlyActivityPanel");
    if (!target) return;
    const monthNumber = Number(monthlyActivityMonth.slice(5, 7));
    const title = uiText(`${monthNumber}月行动回顾`, `${MONTHS_EN[monthNumber - 1]} in review`);
    const report = monthlyActivityFor(monthlyActivityMonth);
    const routineCount = report.routines.reduce((sum, item) => sum + item.dates.length, 0);
    const updateCount = report.projects.reduce((sum, project) => sum + project.updates.length, 0);
    const highlights = [
      report.tasks.length ? uiText(`完成 ${report.tasks.length} 项待办`, `${report.tasks.length} tasks completed`) : "",
      report.workouts.length ? uiText(`完成 ${report.workouts.length} 天运动`, `${report.workouts.length} workout days`) : "",
      report.projects.length ? uiText(`推进 ${report.projects.length} 个项目`, `${report.projects.length} projects advanced`) : "",
      routineCount ? uiText(`完成 ${routineCount} 次日常安排`, `${routineCount} routines kept`) : "",
      report.health.length ? uiText(`留下 ${report.health.length} 天健康记录`, `${report.health.length} days with health records`) : "",
      report.reviews.length ? uiText(`写下 ${report.reviews.length} 篇复盘`, `${report.reviews.length} daily reviews`) : "",
      report.inspirationCount ? uiText(`捕捉 ${report.inspirationCount} 天灵感`, `${report.inspirationCount} days with inspiration`) : ""
    ].filter(Boolean);
    const narrative = highlights.length
      ? uiText(`这个月，${highlights.slice(0, 3).join("，")}。`, `This month: ${highlights.slice(0, 3).join("; ")}.`)
      : uiText("这个月还没有活动记录，下一次小小的行动会从这里开始。", "No activity recorded this month yet. Your next small step starts here.");
    const empty = `<p class="monthly-empty">${uiText("本月暂无记录", "No records this month")}</p>`;
    const shortDate = (date) => `${Number(date.slice(5, 7))}/${Number(date.slice(8, 10))}`;
    const row = (date, text, source = "") => `<li><time datetime="${esc(date)}">${shortDate(date)}</time><span>${source === "long-term" ? `<small class="monthly-task-source">${uiText("长期待办", "Long-term")}</small>` : ""}${esc(text)}</span></li>`;
    const group = (title, content) => `<section class="monthly-detail-group"><h4>${title}</h4><div class="monthly-detail-body">${content || empty}</div></section>`;
    const healthText = (day) => [
      Number(day.water) > 0 ? uiText(`饮水 ${day.water} 杯`, `Water ${day.water} cups`) : "",
      day.weight != null ? `${uiText("体重", "Weight")} ${day.weight} kg` : "",
      String(day.calories ?? "").trim() ? `${day.calories} kcal` : "",
      day.mood ? `${uiText("心情", "Mood")} ${uiText(day.mood, TRANSLATIONS[day.mood] || day.mood)}` : "",
      day.energy ? `${uiText("精力", "Energy")} ${uiText(day.energy, TRANSLATIONS[day.energy] || day.energy)}` : "",
      day.food ? `${uiText("饮食", "Food")}: ${day.food}` : ""
    ].filter(Boolean).join(" · ");
    target.innerHTML = `
      <div class="card-head monthly-activity-head"><div><h3>${title}</h3><small>${uiText("把完成的小事，串成一个月的进展。", "See how your everyday actions add up.")}</small></div><div class="monthly-navigation"><button class="date-nav-btn" type="button" data-action="monthly-prev" aria-label="${uiText("上个月", "Previous month")}">‹</button><label><span class="sr-only">${uiText("统计月份", "Report month")}</span><input class="input" type="month" id="monthlyActivityMonth" value="${monthlyActivityMonth}" /></label><button class="date-nav-btn" type="button" data-action="monthly-next" aria-label="${uiText("下个月", "Next month")}">›</button></div></div>
      <p class="monthly-narrative">${esc(narrative)}</p>
      <div class="monthly-metrics">
        ${footprintMetricMarkup(uiText("完成待办", "Tasks completed"), report.tasks.length, uiText("项已完成事项", "completed tasks"))}
        ${footprintMetricMarkup(uiText("日常安排", "Daily routines"), routineCount, uiText("次日常练习", "routine completions"))}
        ${footprintMetricMarkup(uiText("完成运动", "Workout days"), report.workouts.length, uiText("天运动记录", "completed workout days"))}
        ${footprintMetricMarkup(uiText("推进项目", "Projects advanced"), report.projects.length, uiText(`个项目 · ${updateCount} 条推进`, `projects · ${updateCount} updates`))}
        ${footprintMetricMarkup(uiText("健康记录", "Health records"), report.health.length, uiText("天有健康记录", "days with health records"))}
      </div>
      <div class="monthly-footer"><span>${uiText(`另有 ${report.inspirationCount} 天留下了灵感`, `Inspiration captured on ${report.inspirationCount} days`)}</span><button class="text-btn" type="button" data-action="toggle-monthly-details" aria-expanded="${monthlyActivityExpanded}" aria-controls="monthlyActivityDetails">${monthlyActivityExpanded ? uiText("收起明细 ↑", "Hide details ↑") : uiText("展开本月明细 ↓", "Explore this month ↓")}</button></div>
      <div class="monthly-details" id="monthlyActivityDetails" ${monthlyActivityExpanded ? "" : "hidden"}>
        ${group(uiText("完成了哪些待办", "Tasks you completed"), report.tasks.length ? `<ul>${report.tasks.map((item) => row(item.date, item.text, item.source)).join("")}</ul>` : "")}
        ${group(uiText("项目向前走了这些步", "Steps your projects took"), report.projects.length ? report.projects.map((project) => `<div class="monthly-project-record"><strong>${esc(project.title)}</strong><ul>${project.updates.map((log) => row(log.date, log.text)).join("")}</ul></div>`).join("") : "")}
        ${group(uiText("这些日子动了起来", "Days you worked out"), report.workouts.length ? `<ul>${report.workouts.map((date) => row(date, localizedPlanTitle(planFor(date).title))).join("")}</ul>` : "")}
        ${group(uiText("坚持了哪些日常", "Routines you kept"), report.routines.length ? `<ul>${report.routines.map((item) => `<li class="monthly-routine-record"><strong>${esc(item.title || uiText("已移除的日常项目", "Removed routine"))}</strong><span>${item.dates.length} ${uiText("次", "times")} · ${item.dates.map(shortDate).join("、")}</span></li>`).join("")}</ul>` : "")}
        ${group(uiText("照顾自己的记录", "How you cared for yourself"), report.health.length ? `<ul>${report.health.map((day) => row(day.date, healthText(day))).join("")}</ul>` : "")}
        ${group(uiText("当天复盘", "Daily reviews"), report.reviews.length ? `<ul>${report.reviews.map((review) => row(review.date, review.text)).join("")}</ul>` : "")}
      </div>`;
  }

  function renderFootprints() {
    const target = document.getElementById("footprintsPanel");
    const metricsTarget = document.getElementById("footprintsMetricsPanel");
    if (!target || !metricsTarget) return;
    renderMonthlyActivity();
    const keys = footprintDateKeys();
    const years = [...new Set(keys.map((key) => key.slice(0, 4)))].sort().reverse();
    const filteredKeys = keys.filter((key) => {
      const yearMatches = footprintsYearFilter === "all" || key.slice(0, 4) === footprintsYearFilter;
      const monthMatches = footprintsMonthFilter === "all" || key.slice(5, 7) === footprintsMonthFilter;
      return yearMatches && monthMatches;
    });
    const monthOptions = Array.from({ length: 12 }, (_, index) => pad(index + 1));
    const selectedYear = years.includes(footprintsYearFilter) ? footprintsYearFilter : "all";
    const selectedMonth = monthOptions.includes(footprintsMonthFilter) ? footprintsMonthFilter : "all";
    footprintsYearFilter = selectedYear;
    footprintsMonthFilter = selectedMonth;
    const rangeLabel = selectedYear === "all" && selectedMonth === "all"
      ? uiText("全部历史", "All history")
      : `${selectedYear === "all" ? uiText("全部年份", "All years") : selectedYear}${selectedMonth === "all" ? "" : currentLanguage === "en" ? ` · ${MONTHS_SHORT_EN[Number(selectedMonth) - 1]}` : ` · ${Number(selectedMonth)}月`}`;
    const hasInspiration = (key) => Boolean(String(state.days[key]?.inspiration || "").trim() || String(state.days[key]?.inspirationEn || "").trim());
    const records = filteredKeys
      .filter(hasInspiration)
      .sort((a, b) => b.localeCompare(a))
      .map((date) => ({ date, inspiration: localizedInspiration(state.days[date]) }));
    const cells = filteredKeys.map((key) => {
      const inspiration = localizedInspiration(state.days[key]);
      const firstCharacter = inspirationInitial(inspiration);
      const label = `${dayText(key)} · ${inspiration || uiText("无灵感记录", "No inspiration record")}`;
      if (!hasInspiration(key)) return `<span class="footprint-cell" title="${esc(label)}" aria-label="${esc(label)}"></span>`;
      return `<button class="footprint-cell has-inspiration" type="button" data-action="open-inspiration" data-inspiration-date="${key}" title="${esc(label)}" aria-label="${esc(label)}"><span data-no-translate="true">${esc(firstCharacter)}</span></button>`;
    }).join("");
    target.classList.toggle("is-expanded", footprintsExpanded);
    target.innerHTML = `
      <div class="card-head footprints-head"><div><h3>${uiText("灵感轨迹", "Inspiration trail")}</h3><small>${uiText("把每天留下的灵感看成一条慢慢形成的轨迹。", "A quiet trail made from the ideas you leave behind each day.")}</small></div><div class="footprints-filters"><label><span>${uiText("年份", "Year")}</span><select class="select" id="footprintsYearFilter"><option value="all">${uiText("全部年份", "All years")}</option>${years.map((year) => `<option value="${year}" ${year === selectedYear ? "selected" : ""}>${year}</option>`).join("")}</select></label><label><span>${uiText("月份", "Month")}</span><select class="select" id="footprintsMonthFilter"><option value="all">${uiText("全部月份", "All months")}</option>${monthOptions.map((month) => `<option value="${month}" ${month === selectedMonth ? "selected" : ""}>${currentLanguage === "en" ? MONTHS_SHORT_EN[Number(month) - 1] : `${Number(month)}月`}</option>`).join("")}</select></label></div></div>
      <div class="footprints-meta"><span>${esc(rangeLabel)}</span><span>${filteredKeys.filter(hasInspiration).length} ${uiText("条灵感", "inspirations")}</span></div>
      <div class="footprints-grid zoom-${footprintsZoom}" aria-label="${esc(uiText("灵感历史轨迹", "Historical inspiration footprints"))}">${cells}</div>
      ${footprintsExpanded ? `<div class="footprints-record-list" aria-label="${esc(uiText("当前范围内的灵感记录", "Inspiration records in the current range"))}">${records.length ? records.map(({ date, inspiration }) => `<button class="footprints-record" type="button" data-action="open-inspiration" data-inspiration-date="${date}"><time>${esc(dayText(date))}</time><span>${esc(inspiration)}</span></button>`).join("") : `<div class="empty-state">${uiText("当前范围内还没有灵感记录。", "No inspiration records in this range yet.")}</div>`}</div>` : ""}
      <div class="footprints-footer"><div class="footprints-hint">${uiText("滚动鼠标滚轮可在两种方格尺寸间切换；点击绿色格子查看当天灵感。", "Scroll to switch between two cell sizes; click a green cell to view that day's inspiration.")}</div><button class="text-btn" type="button" data-action="toggle-footprints-expand">${footprintsExpanded ? uiText("收起记录", "Collapse records") : uiText("展开记录", "Expand records")}</button></div>
    `;

    const hydrationDays = Object.values(state.days).filter((day) => Number(day?.water) >= 6).length;
    const weights = [...state.weightHistory].filter((entry) => isDateKey(entry.date) && Number.isFinite(Number(entry.weight))).sort((a, b) => a.date.localeCompare(b.date));
    const firstWeight = weights[0]?.weight;
    const latestWeight = weights[weights.length - 1]?.weight;
    const totalWeightLoss = firstWeight == null || latestWeight == null ? null : Math.max(0, Math.round((Number(firstWeight) - Number(latestWeight)) * 10) / 10);
    const goodMoodDays = Object.values(state.days).filter((day) => day?.mood === "很好").length;
    const workoutDays = Object.values(state.days).filter((day) => day?.fitness).length;
    const inspirationDays = Object.values(state.days).filter((day) => String(day?.inspiration || "").trim() || String(day?.inspirationEn || "").trim()).length;
    metricsTarget.innerHTML = `
      <div class="card-head"><div><h3>${uiText("正在变好的证据", "Signs of progress")}</h3><small>${uiText("从真实记录里看见已经发生的变化。", "Small positive signals from your real records.")}</small></div></div>
      <div class="footprint-metrics-grid">
        ${footprintMetricMarkup(uiText("饮水达标日", "Hydration goal days"), `${hydrationDays}${uiText("天", " days")}`, uiText("按每天至少 6 杯统计", "At least 6 cups per day"))}
        ${footprintMetricMarkup(uiText("总计减重", "Total weight loss"), totalWeightLoss == null ? uiText("继续记录中", "Keep recording") : `${totalWeightLoss.toFixed(1)} kg`, uiText("从最早到最新体重记录", "From earliest to latest weight record"))}
        ${footprintMetricMarkup(uiText("心情很好的日子", "Good-mood days"), `${goodMoodDays}${uiText("天", " days")}`, uiText("已记录为“很好”的日期", "Days marked Great"))}
        ${footprintMetricMarkup(uiText("累计训练日", "Workout days"), `${workoutDays}${uiText("天", " days")}`, uiText("已完成的训练记录", "Completed workout records"))}
        ${footprintMetricMarkup(uiText("灵感记录", "Inspiration records"), `${inspirationDays}${uiText("条", " records")}`, uiText("已保存的灵感内容", "Saved inspiration entries"))}
      </div>
    `;
    if (!records.length && !filteredKeys.length) target.querySelector(".footprints-grid").innerHTML = `<div class="empty-state">${uiText("还没有灵感记录。", "No inspiration records yet.")}</div>`;
  }

  function renderCalendar() {
    renderCalendars();
    renderAnnualCalendar();
    renderDayDashboard();
    renderFootprints();
  }

  function renderAll() {
    renderHome();
    renderProjects();
    renderHealth();
    renderFitness();
    renderReminders();
    renderMilestones();
    renderCalendar();
    renderAutoBackupSettings();
  }

  function setScrollPosition(top) {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, top);
    root.style.scrollBehavior = previousBehavior;
  }

  function restorePageScroll(page) {
    const top = pageScrollPositions.get(page) || 0;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setScrollPosition(top));
    });
  }

  function updateBackButton() {
    const button = document.getElementById("backButton");
    if (!button) return;
    const canGoBack = internalHistoryDepth > 0;
    button.disabled = !canGoBack;
    button.setAttribute("aria-label", uiText("返回上一页", "Go back"));
    button.title = uiText("返回上一页", "Go back");
    const label = button.querySelector(".back-button-label");
    if (label) label.textContent = uiText("返回", "Back");
  }

  function goBack() {
    if (internalHistoryDepth > 0) history.back();
  }

  function switchPage(page, updateHash = true, restoreScroll = false) {
    const requested = page === "milestones" ? "reminders" : page;
    const valid = pageNames[requested] ? requested : "home";
    const pageChanged = valid !== activePage;
    if (updateHash && pageChanged) {
      pageScrollPositions.set(activePage, window.scrollY);
      internalHistoryDepth += 1;
      const nextState = { ...(history.state || {}), kineticRoute: valid, kineticDepth: internalHistoryDepth };
      if (location.hash === `#${valid}` && !history.state?.kineticRoute) {
        history.replaceState(nextState, "", `#${valid}`);
      } else {
        history.pushState(nextState, "", `#${valid}`);
      }
    }
    activePage = valid;
    document.querySelectorAll("[data-screen]").forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === valid));
    document.querySelectorAll("[data-page]").forEach((link) => {
      const active = link.dataset.page === valid;
      link.classList.toggle("active", active);
      if (link.matches("a")) {
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      }
    });
    if (updateHash && location.hash !== `#${valid}`) history.pushState(null, "", `#${valid}`);
    if (valid === "home") renderHome();
    if (valid === "calendar") renderCalendar();
    if (valid === "footprints") {
      renderDayDashboard();
      renderFootprints();
    }
    if (valid === "work") renderProjects();
    if (valid === "fitness") renderFitness();
    if (valid === "settings") renderAutoBackupSettings();
    updateBackButton();
    if (restoreScroll) restorePageScroll(valid);
    else if (pageChanged) setScrollPosition(0);
  }

  function updateSelectedDate(key) {
    if (key !== selectedDate && editingCalendarHealthDate === selectedDate) {
      if (calendarHealthDraftDirty && !window.confirm(uiText("健康记录有未保存的修改，确定放弃并切换日期吗？", "Discard unsaved health changes and switch dates?"))) return false;
      editingCalendarHealthDate = null;
      calendarHealthDraft = null;
      calendarHealthInitialDraft = null;
      calendarHealthDraftDirty = false;
    }
    selectedDate = key;
    resetCalendarPanelDates(key);
    const date = fromKey(key);
    calendarYear = date.getFullYear();
    monthCursor = new Date(date.getFullYear(), date.getMonth(), 1);
    renderHome();
    renderReminders();
    renderProjects();
    renderCalendar();
    return true;
  }

  function beginCalendarHealthEdit() {
    const day = ensureDay(selectedDate);
    const weight = weightOn(selectedDate);
    editingCalendarHealthDate = selectedDate;
    calendarHealthDraft = {
      mood: day.mood || "",
      energy: day.energy || "",
      water: String(Math.max(0, Math.min(8, Number(day.water) || 0))),
      weight: weight ? String(weight.weight) : "",
      calories: String(day.calories ?? ""),
      food: String(day.food || ""),
      notes: String(day.notes || "")
    };
    calendarHealthInitialDraft = { ...calendarHealthDraft };
    calendarHealthDraftDirty = false;
    renderCalendar();
    requestAnimationFrame(() => document.querySelector('[data-calendar-health-draft="mood"]')?.focus());
  }

  function syncCalendarHealthDraft(target) {
    if (!target.matches?.("[data-calendar-health-draft]") || !calendarHealthDraft || editingCalendarHealthDate !== selectedDate) return false;
    const field = target.dataset.calendarHealthDraft;
    if (!(field in calendarHealthDraft)) return false;
    calendarHealthDraft[field] = target.value;
    calendarHealthDraftDirty = Object.keys(calendarHealthDraft).some((key) => calendarHealthDraft[key] !== calendarHealthInitialDraft?.[key]);
    return true;
  }

  function cancelCalendarHealthEdit() {
    editingCalendarHealthDate = null;
    calendarHealthDraft = null;
    calendarHealthInitialDraft = null;
    calendarHealthDraftDirty = false;
    renderCalendar();
  }

  function saveCalendarHealthDraft() {
    if (!calendarHealthDraft || editingCalendarHealthDate !== selectedDate) return;
    const draft = calendarHealthDraft;
    const waterInput = draft.water.trim();
    const weightInput = draft.weight.trim();
    const caloriesInput = draft.calories.trim();
    const waterNumber = waterInput === "" ? 0 : Number(waterInput);
    const weightNumber = weightInput === "" ? null : Number(weightInput);
    const caloriesNumber = caloriesInput === "" ? null : Number(caloriesInput);
    if (!Number.isFinite(waterNumber) || waterNumber < 0 || waterNumber > 8) {
      notify(uiText("饮水量需为 0–8 杯。", "Hydration must be between 0 and 8 cups."));
      return;
    }
    if (weightNumber !== null && (!Number.isFinite(weightNumber) || weightNumber <= 0)) {
      notify(uiText("请输入大于 0 的有效体重，或留空删除记录。", "Enter a weight above 0, or leave it blank to remove the record."));
      return;
    }
    if (caloriesNumber !== null && (!Number.isFinite(caloriesNumber) || caloriesNumber < 0)) {
      notify(uiText("热量需为 0 或正数，也可以留空。", "Calories must be zero or greater, or left blank."));
      return;
    }

    const day = ensureDay(selectedDate);
    day.mood = draft.mood;
    day.energy = draft.energy;
    day.water = Math.max(0, Math.min(8, Math.round(waterNumber)));
    day.calories = caloriesNumber === null ? "" : String(Math.round(caloriesNumber));
    day.food = draft.food;
    day.notes = draft.notes;
    if (weightNumber === null) {
      state.weightHistory = state.weightHistory.filter((entry) => entry.date !== selectedDate);
    } else {
      setWeight(selectedDate, Math.round(weightNumber * 10) / 10);
    }
    editingCalendarHealthDate = null;
    calendarHealthDraft = null;
    calendarHealthInitialDraft = null;
    calendarHealthDraftDirty = false;
    save();
    renderHealth();
    renderHome();
    renderReminders();
    renderCalendar();
    notify(uiText("当天健康记录已保存", "Daily health records saved."));
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

  document.addEventListener("click", async (event) => {
    if (!event.target.closest("#globalSearchField")) closeGlobalSearch();
    if (!event.target.closest(".project-actions-menu")) document.querySelectorAll(".project-actions-menu[open]").forEach((menu) => { menu.open = false; });
    if (!event.target.closest(".project-icon-picker")) document.querySelectorAll(".project-icon-picker[open]").forEach((menu) => { menu.open = false; });
    if (event.target.id === "projectAreasModal") {
      closeProjectAreasManager();
      return;
    }
    if (event.target.id === "projectHistoryModal") {
      closeProjectHistory();
      return;
    }
    if (event.target.id === "inspirationModal") {
      closeInspirationRecord();
      return;
    }
    const calorieSummary = event.target.closest?.("#healthTrendPanel details[data-calorie-table] > summary");
    if (calorieSummary) {
      window.setTimeout(() => {
        calorieTableExpanded = Boolean(calorieSummary.parentElement?.open);
      }, 0);
      return;
    }
    const pageLink = event.target.closest("[data-page]");
    if (pageLink) {
      event.preventDefault();
      switchPage(pageLink.dataset.page);
      return;
    }

    const dateButton = event.target.closest("[data-date]");
    if (dateButton) {
      const isAnnualCalendarDate = dateButton.matches("#calendarYearGrid .annual-day-cell[data-date]");
      const updated = updateSelectedDate(dateButton.dataset.date);
      if (updated && isAnnualCalendarDate) focusAnnualCalendarDate(dateButton.dataset.date);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    if (action === "toggle-calendar-panel") {
      const panel = actionButton.dataset.calendarPanel;
      if (expandedCalendarPanels.has(panel)) expandedCalendarPanels.delete(panel); else expandedCalendarPanels.add(panel);
      updateCalendarPanelPreviews(panel);
      return;
    }
    if (action === "check-backup-updates") {
      if (!backupDirectory) { notify(uiText("请先开启自动备份并选择文件夹", "Enable scheduled backups and choose a folder first.")); return; }
      try {
        if (await backupDirectory.queryPermission({ mode: "readwrite" }) !== "granted" && await backupDirectory.requestPermission({ mode: "readwrite" }) !== "granted") {
          externalCheckFailed = true; renderBackupSync(); return;
        }
      } catch { externalCheckFailed = true; renderBackupSync(); return; }
      flushSave();
      if (await checkExternalBackups(true)) {
        if (externalBackup) reviewBackup(externalBackup, externalBackup.name);
      } else notify(uiText("没有发现需要导入的新版本", "No different backup version found."));
      return;
    }
    if (action === "review-external-backup") { if (externalBackup) reviewBackup(externalBackup, externalBackup.name); return; }
    if (action === "close-backup-review") { closeBackupReview(); return; }
    if (action === "apply-backup-import") { applyReviewedBackup(); return; }
    if (action === "keep-local-backup") {
      if (!externalBackup) return;
      ignoredBackupVersions.add(backupVersionKey(externalBackup));
      (externalBackup.sync?.ancestors || []).forEach((revision) => ignoredBackupVersions.add(revision));
      backupPreferences.ignoredVersions = [...ignoredBackupVersions].slice(-10000);
      try { persistBackupPreferences(); } catch { notify(uiText("无法保存忽略设置，未继续备份", "Could not save this choice; backups remain paused.")); return; }
      externalBackup = null;
      externalCheckAt = 0;
      closeBackupReview();
      renderBackupSync();
      void runAutomaticBackup();
      return;
    }
    if (action === "download-import-recovery") {
      const snapshot = localStorage.getItem(RECOVERY_STORE);
      if (!snapshot) return;
      const url = URL.createObjectURL(new Blob([snapshot], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url; link.download = `kinetic-before-import-${todayKey()}.json`; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }
    if (action === "monthly-prev" || action === "monthly-next") {
      const date = fromKey(`${monthlyActivityMonth}-01`);
      date.setMonth(date.getMonth() + (action === "monthly-prev" ? -1 : 1));
      monthlyActivityMonth = keyOf(date).slice(0, 7);
      renderMonthlyActivity();
      return;
    }
    if (action === "toggle-monthly-details") {
      monthlyActivityExpanded = !monthlyActivityExpanded;
      renderMonthlyActivity();
      return;
    }
    const id = actionButton.dataset.id;
    if (action === "move-project-up" || action === "move-project-down") {
      const cards = [...document.querySelectorAll("#projectList [data-project-row]")];
      const index = cards.findIndex((card) => card.dataset.projectRow === id);
      const neighbor = cards[index + (action === "move-project-up" ? -1 : 1)];
      if (neighbor) reorderProject(id, neighbor.dataset.projectRow);
      return;
    }
    if (action === "edit-project") {
      editingProjectIds.add(id);
      renderProjects();
      document.querySelectorAll("[data-project-title]").forEach((input) => { if (input.dataset.projectTitle === id) input.focus({ preventScroll: true }); });
      return;
    }

    if (action === "open-search-result") {
      openGlobalSearchResult(Number(actionButton.dataset.searchIndex));
      return;
    }
    if (action === "more-search-results") {
      globalSearchVisibleCount += 30;
      renderGlobalSearch(false);
      return;
    }
    if (action === "manage-project-areas") {
      openProjectAreasManager();
      return;
    }
    if (action === "close-project-areas") {
      closeProjectAreasManager();
      return;
    }
    if (action === "delete-project-area") {
      const area = actionButton.dataset.area;
      const count = state.projects.filter((project) => String(project.area || "其他").trim() === area).length;
      const message = count
        ? uiText(`删除标签「${area}」后，${count} 个项目会改归“其他”。项目和历史记录不会删除。是否继续？`, `Delete area “${area}” and move ${count} projects to Other? Projects and history will not be deleted.`)
        : uiText(`删除领域标签「${area}」吗？`, `Delete project area “${area}”?`);
      if (confirm(message) && deleteProjectArea(area)) refreshProjectAreas();
      return;
    }
    if (action === "enable-auto-backup" || action === "choose-backup-folder") {
      if (backupInProgress) return;
      if (supportsBackupDirectory()) {
        await chooseBackupFolder();
      } else {
        backupPreferences.enabled = true;
        backupPreferences.enabledAt = new Date().toISOString();
        try { persistBackupPreferences(); backupIssue = ""; } catch { backupIssue = "settings"; }
        renderAutoBackupSettings();
      }
      return;
    }
    if (action === "authorize-backup") {
      if (backupInProgress || !backupDirectory) return;
      try {
        const permission = await backupDirectory.requestPermission({ mode: "readwrite" });
        if (permission === "granted") await runAutomaticBackup(true);
        else { backupIssue = "permission"; renderAutoBackupSettings(); }
      } catch { backupIssue = "permission"; renderAutoBackupSettings(); }
      return;
    }
    if (action === "backup-now") {
      await runAutomaticBackup(true);
      return;
    }
    if (action === "disable-auto-backup") {
      if (backupInProgress) return;
      backupPreferences.enabled = false;
      try { persistBackupPreferences(); backupIssue = ""; } catch { backupIssue = "settings"; }
      renderAutoBackupSettings();
      return;
    }
    if (action === "add-project-area") {
      const project = state.projects.find((item) => item.id === id);
      if (!project) return;
      const area = prompt(uiText("输入新的项目领域", "Enter a new project area"));
      if (addProjectArea(area, project.id)) refreshProjectAreas();
      return;
    }
    if (action === "go-back") {
      goBack();
      return;
    }
    if (action === "toggle-sidebar") {
      toggleSidebar();
      return;
    }
    if (action === "open-project-history") {
      const item = completedItems().find((candidate) => candidate.id === actionButton.dataset.historyId && candidate.type === actionButton.dataset.historyType);
      if (item) openProjectHistory(item);
      return;
    }
    if (action === "jump-project") {
      const projectId = actionButton.dataset.id;
      projectStatusFilter = "all";
      projectAreaFilter = "all";
      const search = document.getElementById("globalSearch");
      if (search) search.value = "";
      if (activePage !== "work") switchPage("work");
      else renderProjects();
      requestAnimationFrame(() => {
        const card = document.getElementById(`project-card-${projectId}`);
        if (!card) return;
        card.scrollIntoView({ behavior: "smooth", block: "start" });
        card.classList.add("project-card-target");
        window.setTimeout(() => card.classList.remove("project-card-target"), 1400);
      });
      return;
    }
    if (action === "close-project-history") {
      closeProjectHistory();
      return;
    }
    if (action === "open-inspiration") {
      openInspirationRecord(actionButton.dataset.inspirationDate);
      return;
    }
    if (action === "edit-calendar-health") {
      beginCalendarHealthEdit();
      return;
    }
    if (action === "cancel-calendar-health-edit") {
      cancelCalendarHealthEdit();
      return;
    }
    if (action === "save-calendar-health") {
      saveCalendarHealthDraft();
      return;
    }
    if (action === "delete-inspiration") {
      const date = actionButton.dataset.inspirationDate;
      const day = state.days[date];
      if (!day || !localizedInspiration(day) || !confirm(uiText(`删除 ${date} 的灵感记录吗？`, `Delete the inspiration record from ${date}?`))) return;
      day.inspiration = "";
      day.inspirationEn = "";
      save();
      closeInspirationRecord();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("已删除灵感记录");
      return;
    }
    if (action === "breeze-add") {
      breezeEditorId = "new";
      breezeHistoryOpen = false;
      renderBreezeGuide();
      requestAnimationFrame(() => document.getElementById("breezeEditorInput")?.focus());
      return;
    }
    if (action === "breeze-toggle-history") {
      breezeHistoryOpen = !breezeHistoryOpen;
      renderBreezeGuide();
      return;
    }
    if (action === "breeze-edit") {
      breezeEditorId = actionButton.dataset.breezeId || null;
      breezeHistoryOpen = true;
      renderBreezeGuide();
      requestAnimationFrame(() => {
        const input = document.getElementById("breezeEditorInput");
        input?.focus();
        input?.select();
      });
      return;
    }
    if (action === "breeze-delete") {
      const breezeId = actionButton.dataset.breezeId;
      const entry = state.breezeGuide?.entries?.find((item) => item.id === breezeId);
      if (!entry || !window.confirm(uiText("删除这条微风指南吗？", "Delete this breeze guide entry?"))) return;
      state.breezeGuide.entries = state.breezeGuide.entries.filter((item) => item.id !== breezeId);
      const entries = currentBreezeEntries();
      breezeEntryIndex = Math.min(breezeEntryIndex, Math.max(0, entries.length - 1));
      if (breezeEditorId === breezeId) breezeEditorId = null;
      save();
      renderBreezeGuide();
      renderHome();
      notify(uiText("微风指南已删除", "Breeze guide deleted"));
      return;
    }
    if (action === "breeze-save") {
      saveBreezeEntry();
      return;
    }
    if (action === "breeze-cancel") {
      breezeEditorId = null;
      renderBreezeGuide();
      return;
    }
    if (action === "close-inspiration-modal") {
      closeInspirationRecord();
      return;
    }
    if (action === "toggle-footprints-expand") {
      footprintsExpanded = !footprintsExpanded;
      renderFootprints();
      return;
    }
    if (action === "project-prev-record" || action === "project-next-record") {
      const project = state.projects.find((item) => item.id === id);
      if (!project) return;
      const moved = shiftProjectRecordDate(project, action === "project-prev-record" ? -1 : 1);
      if (moved) {
        renderProjects();
      }
      return;
    }

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
      state.projects.forEach((project) => {
        if (project.goalId === id) project.goalId = "";
      });
      save();
      renderHome();
      return;
    }
    if (action === "toggle-priority-edit") {
      editingPriorities = !editingPriorities;
      actionButton.textContent = editingPriorities ? "完成" : "编辑";
      renderHome();
    }
    if (action === "toggle-home-inspiration") {
      viewingHomeInspiration = !viewingHomeInspiration;
      editingPriorities = false;
      renderHome();
      return;
    }
    if (action === "health-trend-prev" || action === "health-trend-next") {
      const currentIndex = HEALTH_TREND_PANELS.indexOf(healthTrendPanel);
      const direction = action === "health-trend-prev" ? -1 : 1;
      healthTrendPanel = HEALTH_TREND_PANELS[(currentIndex + direction + HEALTH_TREND_PANELS.length) % HEALTH_TREND_PANELS.length];
      renderHealthTrendPanel();
      return;
    }
    if (action === "home-prev-month") {
      monthCursor.setMonth(monthCursor.getMonth() - 1);
      renderCalendars();
    }
    if (action === "home-next-month") {
      monthCursor.setMonth(monthCursor.getMonth() + 1);
      renderCalendars();
    }
    if (action === "today") updateSelectedDate(todayKey());
    if (action === "calendar-prev-year" || action === "calendar-next-year") {
      const direction = action === "calendar-prev-year" ? -1 : 1;
      const date = fromKey(selectedDate);
      const year = calendarYear + direction;
      const day = Math.min(date.getDate(), new Date(year, date.getMonth() + 1, 0).getDate());
      updateSelectedDate(`${year}-${pad(date.getMonth() + 1)}-${pad(day)}`);
      return;
    }
    if (action === "calendar-year-today") {
      updateSelectedDate(todayKey());
      return;
    }
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
      workoutDraft = null;
      workoutDraftFor(editingWorkoutDate);
      renderFitness();
      renderCalendar();
      requestAnimationFrame(() => document.querySelector('.v2-screen.active [data-workout-editor] input')?.focus());
      return;
    }
    if (action === "cancel-workout-edit") {
      editingWorkoutDate = null;
      workoutDraft = null;
      renderFitness();
      renderCalendar();
      return;
    }
    if (action === "add-workout-item" || action === "delete-workout-item") {
      const key = actionButton.dataset.workoutDate;
      const form = document.querySelector(`[data-workout-editor="${key}"]`);
      const draft = syncWorkoutDraftFromForm(form) || workoutDraftFor(key);
      if (action === "add-workout-item") {
        draft.items.push([String(draft.items.length + 1), "", ""]);
      } else {
        const index = Number(actionButton.dataset.workoutIndex);
        if (Number.isInteger(index) && index >= 0) draft.items.splice(index, 1);
      }
      draft.items = normalizeWorkoutPlanItems(draft.items);
      renderFitness();
      renderCalendar();
      requestAnimationFrame(() => document.querySelector(`[data-workout-editor="${key}"] [data-workout-name="${action === "add-workout-item" ? draft.items.length - 1 : Math.max(0, Number(actionButton.dataset.workoutIndex) - 1)}"]`)?.focus());
      return;
    }
    if (action === "toggle-routine-edit") {
      editingRoutines = !editingRoutines;
      renderFitness();
      return;
    }
    if (action === "save-routine-edit") {
      save();
      editingRoutines = false;
      renderFitness();
      renderHome();
      renderCalendar();
      notify(uiText("日常安排已保存", "Daily routines saved"));
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
    if (action === "calendar-prev-day" || action === "calendar-next-day") {
      const panel = actionButton.dataset.calendarPanel;
      if (shiftCalendarPanelDate(panel, action === "calendar-prev-day" ? -1 : 1)) renderDayDashboard(panel);
      return;
    }
    if (action === "defer-task") {
      const fromKeyValue = actionButton.dataset.taskDate;
      const fromDay = ensureDay(fromKeyValue);
      const task = fromDay.tasks.find((item) => item.id === id);
      if (!task) return;
      fromDay.tasks = fromDay.tasks.filter((item) => item.id !== id);
      const nextDay = ensureDay(addDays(fromKeyValue, 1));
      nextDay.tasks.push({ ...task, done: false });
      save();
      updateSelectedDate(addDays(fromKeyValue, 1));
      notify("顺延到明天");
      return;
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
        state.projects.unshift({ id: uid("project"), title: title.trim(), description: "", symbol: PROJECT_ICONS[Math.floor(Math.random() * PROJECT_ICONS.length)].id, area: "其他", status: "未开始", progress: 0, next: "", daily: {}, logs: [], createdAt: todayKey(), completed: false });
        editingProjectIds.add(state.projects[0].id);
        save();
        renderProjects();
        renderHome();
      }
      return;
    }
    if (action === "select-project-symbol") {
      const project = state.projects.find((item) => item.id === id);
      if (!project) return;
      if (!PROJECT_ICONS.some((item) => item.id === actionButton.dataset.symbol)) return;
      project.symbol = actionButton.dataset.symbol;
      save();
      renderProjects();
      document.querySelector(`#project-card-${CSS.escape(project.id)} .project-icon-picker summary`)?.focus({ preventScroll: true });
      renderHome();
      renderCalendar();
      return;
    }
    if (action === "delete-project") {
      if (!confirm("删除这个项目及其历史记录吗？")) return;
      state.projects = state.projects.filter((project) => project.id !== id);
      editingProjectIds.delete(id);
      projectTextDrafts.delete(id);
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
        Object.values(project.daily || {}).forEach((record) => {
          if (record?.logId === id) record.logId = "";
        });
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
    if (action === "delete-calorie") {
      const date = actionButton.dataset.calorieDate;
      const day = state.days[date];
      if (!day || Number(day.calories) <= 0 || !confirm(uiText(`删除 ${date} 的热量记录吗？`, `Delete the calorie record from ${date}?`))) return;
      calorieTableExpanded = Boolean(actionButton.closest("details")?.open) || calorieTableExpanded;
      day.calories = "";
      save();
      renderHealth();
      renderCalendar();
      renderHome();
      notify("已删除热量记录");
      return;
    }
    if (action === "move-master-to-today" || action === "move-task-to-master") {
      flushSave();
      if (moveTodoBetweenLists(action === "move-master-to-today" ? "today" : "master", id, actionButton.dataset.taskDate)) {
        save();
        renderMilestones();
        renderReminders();
        renderCalendar();
        renderHome();
        notify(action === "move-master-to-today" ? uiText("已移到今日待办", "Moved to today's tasks") : uiText("已移到长期待办", "Moved to long-term tasks"));
      }
      return;
    }
    if (action === "toggle-master-todo-expand") {
      masterTodosExpanded = !masterTodosExpanded;
      renderMilestones();
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
    if (action === "toggle-master-todo-edit") {
      editingMasterTodos = !editingMasterTodos;
      actionButton.textContent = editingMasterTodos ? "完成" : "编辑";
      renderMilestones();
    }
    if (action === "toggle-event-form") {
      const form = document.getElementById("eventForm");
      form.hidden = !form.hidden;
      if (!form.hidden) {
        editingEventId = null;
        form.reset();
        document.getElementById("eventDateInput").value = selectedDate;
        document.getElementById("eventFormSubmit").textContent = uiText("保存日期", "Save date");
        document.getElementById("eventTitleInput").focus();
      } else {
        editingEventId = null;
      }
    }
    if (action === "edit-event") {
      const eventItem = state.events.find((item) => item.id === id);
      const form = document.getElementById("eventForm");
      if (!eventItem || !form) return;
      editingEventId = id;
      form.hidden = false;
      document.getElementById("eventDateInput").value = eventItem.date || selectedDate;
      document.getElementById("eventTitleInput").value = eventItem.title || "";
      document.getElementById("eventRepeatInput").value = eventItem.repeat || "none";
      document.getElementById("eventCopyInput").value = eventItem.copy || "";
      document.getElementById("eventFormSubmit").textContent = uiText("更新重要日期", "Update important date");
      document.getElementById("eventTitleInput").focus();
      return;
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
    if (action === "save-inspiration") {
      const source = actionButton.dataset.inspirationSource || "reminders";
      const input = document.querySelector(`[data-inspiration-input="${source}"]`);
      if (!input) return;
      const day = ensureDay(source === "home" ? todayKey() : source === "calendar" ? input.dataset.inspirationDate : selectedDate);
      day.inspiration = input.value;
      day.inspirationEn = "";
      save();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("今日灵感已保存");
      return;
    }
    if (action === "save-calendar-notes") {
      const day = ensureDay(selectedDate);
      day.food = document.getElementById("calendarFoodInput").value;
      day.notes = document.getElementById("calendarNotesInput").value;
      save();
      renderHealth();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("当天记录已保存");
    }
    if (action === "export") {
      exportBackup();
    }
    if (action === "reset") {
      if (backupInProgress) {
        notify(uiText("正在备份，请完成后再清除记录。", "A backup is being saved. Wait for it to finish before clearing records."));
        return;
      }
      if (!confirm("确定清除当前设备的全部工作台记录吗？此操作无法撤销。")) return;
      backupPreferences.enabled = false;
      localStorage.removeItem(BACKUP_PREFERENCES_STORE);
      if (window.indexedDB) {
        try { await backupDirectoryStorage(true, null); } catch { /* Disabled preferences prevent further writes. */ }
      }
      localStorage.removeItem(STORE);
      localStorage.removeItem(RECOVERY_STORE);
      localStorage.setItem(RESET_MARKER, "true");
      location.reload();
    }
  });

  document.addEventListener("keydown", (event) => {
    const areasModal = document.getElementById("projectAreasModal");
    if (!areasModal.hidden && event.key === "Tab") {
      const controls = [...areasModal.querySelectorAll("button:not([disabled]), input:not([disabled])")].filter((element) => element.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    if (event.target.id === "globalSearch" && !event.isComposing) {
      if (["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
        event.preventDefault();
        clearTimeout(globalSearchTimer);
        globalSearchTimer = null;
        if (globalSearchQuery !== event.target.value.trim() || document.getElementById("globalSearchPanel").hidden) renderGlobalSearch();
        if (!globalSearchMatches.length || !event.target.value.trim()) return;
        if (event.key === "Enter") { openGlobalSearchResult(Math.max(0, globalSearchActiveIndex)); return; }
        const direction = event.key === "ArrowDown" ? 1 : -1;
        globalSearchActiveIndex = globalSearchActiveIndex < 0 ? (direction > 0 ? 0 : globalSearchMatches.length - 1) : (globalSearchActiveIndex + direction + globalSearchMatches.length) % globalSearchMatches.length;
        globalSearchVisibleCount = Math.max(globalSearchVisibleCount, globalSearchActiveIndex + 1);
        renderGlobalSearch(false);
        document.getElementById(`global-search-result-${globalSearchActiveIndex}`)?.scrollIntoView({ block: "nearest" });
        return;
      }
      if (event.key === "Escape") { event.preventDefault(); closeGlobalSearch(); return; }
    }
    const annualCell = event.target.closest?.("#calendarYearGrid .annual-day-cell[data-date]");
    const dayOffset = {
      ArrowUp: -1,
      ArrowDown: 1,
      ArrowLeft: -7,
      ArrowRight: 7
    }[event.key];
    if (annualCell && dayOffset !== undefined) {
      event.preventDefault();
      const nextDate = addDays(annualCell.dataset.date, dayOffset);
      if (updateSelectedDate(nextDate)) focusAnnualCalendarDate(nextDate);
      return;
    }
    if (event.key === "Escape") {
      closeGlobalSearch();
      closeProjectAreasManager();
      closeProjectHistory();
      closeInspirationRecord();
    }
    const eventRow = event.target.closest?.('.event-row[data-action="edit-event"]');
    if (eventRow && (event.key === "Enter" || event.key === " ") && !event.target.closest("button")) {
      event.preventDefault();
      eventRow.click();
    }
  });

  document.addEventListener("contextmenu", (event) => {
    const row = event.target.closest(".completed-project-row[data-history-id]");
    if (!row) return;
    event.preventDefault();
    const historyId = row.dataset.historyId;
    const historyType = row.dataset.historyType;
    const project = historyType === "工作项目" ? state.projects.find((item) => item.id === historyId) : null;
    const milestone = historyType === "长期待办" ? state.milestones.find((item) => item.id === historyId) : null;
    const title = project?.title || milestone?.title || "this item";
    const confirmation = currentLanguage === "en"
      ? `Delete all records for "${title}"? This cannot be undone.`
      : `删除「${title}」的全部记录吗？此操作无法撤销。`;
    if ((!project && !milestone) || !confirm(confirmation)) return;
    if (project) state.projects = state.projects.filter((item) => item.id !== project.id);
    if (milestone) state.milestones = state.milestones.filter((item) => item.id !== milestone.id);
    save();
    renderHome();
    renderProjects();
    renderMilestones();
    renderCalendar();
    notify(uiText("已删除归档记录", "Archived record deleted"));
  });

  document.addEventListener("wheel", (event) => {
    const breezePanel = event.target.closest?.("#northStarPanel");
    if (breezePanel && Math.abs(event.deltaY) >= 4) {
      if (event.target.closest?.("#breezeEditor, #breezeHistory, textarea, input, select, button")) return;
      const entries = currentBreezeEntries();
      if (entries.length > 1) {
        event.preventDefault();
        breezeEntryIndex = (breezeEntryIndex + (event.deltaY > 0 ? 1 : -1) + entries.length) % entries.length;
        renderBreezeGuide(true);
        renderHome();
      }
      return;
    }
    const grid = event.target.closest?.("#footprintsPanel .footprints-grid");
    if (!grid || Math.abs(event.deltaY) < 4) return;
    const nextZoom = event.deltaY < 0 ? 3 : 1;
    if (nextZoom === footprintsZoom) return;
    event.preventDefault();
    footprintsZoom = nextZoom;
    renderFootprints();
  }, { passive: false });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (syncCalendarHealthDraft(target)) return;
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
        const nextStatus = PROJECT_STATUS_ALIASES[target.value] || "未开始";
        if (nextStatus === "已完成" && !isCompletedProject(project)) {
          if (!confirmProjectCompletion(project, currentLanguage === "en" ? "is now marked Completed" : "的状态已改为“已完成”")) {
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
      if (project) projectReviewDates.set(project.id, target.value);
      renderProjects();
    }
    if (target.matches("[data-project-goal]")) {
      const project = state.projects.find((item) => item.id === target.dataset.projectGoal);
      if (project) project.goalId = target.value;
      save();
      renderProjects();
      renderHome();
    }
    if (target.matches("[data-project-area]")) {
      const project = state.projects.find((item) => item.id === target.dataset.projectArea);
      if (project) project.area = target.value;
      save();
      renderProjects();
      renderHome();
      renderCalendar();
    }
    if (target.matches("[data-master-title], [data-master-note]")) {
      renderMilestones();
      renderCalendar();
    }
    if (target.matches("#completedProjectFilter")) {
      completedProjectFilter = target.value;
      renderCalendar();
    }
    if (target.matches("#projectStatusFilter")) {
      projectStatusFilter = target.value;
      renderProjects();
    }
    if (target.matches("#projectAreaFilter")) {
      projectAreaFilter = target.value;
      renderProjects();
    }
    if (target.matches("#footprintsYearFilter, #footprintsMonthFilter")) {
      if (target.matches("#footprintsYearFilter")) footprintsYearFilter = target.value;
      if (target.matches("#footprintsMonthFilter")) footprintsMonthFilter = target.value;
      footprintsZoom = 3;
      renderFootprints();
    }
    if (target.matches("#monthlyActivityMonth") && /^\d{4}-(0[1-9]|1[0-2])$/.test(target.value)) {
      monthlyActivityMonth = target.value;
      renderMonthlyActivity();
    }
  });

  document.addEventListener("dragstart", (event) => {
    const projectHandle = event.target.closest?.("[data-project-drag]");
    if (projectHandle) {
      projectDragState = projectHandle.dataset.projectDrag;
      projectHandle.closest("[data-project-row]").classList.add("is-dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", projectDragState);
      }
      return;
    }
    const routineHandle = event.target.closest?.("[data-routine-drag]");
    if (routineHandle) {
      routineDragState = routineHandle.dataset.routineDrag;
      routineHandle.closest("[data-routine-row]").classList.add("is-dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", routineDragState);
      }
      return;
    }
    const masterTodoHandle = event.target.closest?.("[data-master-todo-drag]");
    const masterTodoRow = masterTodoHandle?.closest("[data-master-todo-row]");
    if (masterTodoHandle && masterTodoRow) {
      masterTodoDragState = { id: masterTodoHandle.dataset.masterTodoDrag };
      masterTodoRow.classList.add("is-dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", masterTodoDragState.id);
      }
      return;
    }
    const row = event.target.closest?.("[data-workout-row-index]");
    const form = row?.closest("[data-workout-editor]");
    if (!row || !form) return;
    const index = Number(row.dataset.workoutRowIndex);
    if (!Number.isInteger(index)) return;
    syncWorkoutDraftFromForm(form);
    workoutDragState = { key: form.dataset.workoutEditor, index };
    row.classList.add("is-dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", `${form.dataset.workoutEditor}:${index}`);
    }
  });

  document.addEventListener("dragover", (event) => {
    const projectCard = event.target.closest?.("[data-project-row]");
    if (projectCard && projectDragState) {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      document.querySelectorAll("[data-project-row].is-drag-over").forEach((card) => card.classList.remove("is-drag-over"));
      projectCard.classList.add("is-drag-over");
      return;
    }
    const routineRow = event.target.closest?.("[data-routine-row]");
    if (routineRow && routineDragState) {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      document.querySelectorAll("[data-routine-row].is-drag-over").forEach((row) => row.classList.remove("is-drag-over"));
      routineRow.classList.add("is-drag-over");
      return;
    }
    const masterTodoRow = event.target.closest?.("[data-master-todo-row]");
    if (masterTodoRow && masterTodoDragState) {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      document.querySelectorAll(".master-todo-row.is-drag-over").forEach((item) => item.classList.remove("is-drag-over"));
      masterTodoRow.classList.add("is-drag-over");
      return;
    }
    const row = event.target.closest?.("[data-workout-row-index]");
    const form = row?.closest("[data-workout-editor]");
    if (!row || !form || !workoutDragState || form.dataset.workoutEditor !== workoutDragState.key) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    document.querySelectorAll(".workout-edit-row.is-drag-over").forEach((item) => item.classList.remove("is-drag-over"));
    row.classList.add("is-drag-over");
  });

  document.addEventListener("drop", (event) => {
    const projectCard = event.target.closest?.("[data-project-row]");
    if (projectCard && projectDragState) {
      event.preventDefault();
      const sourceId = projectDragState;
      projectDragState = null;
      document.querySelectorAll("[data-project-row].is-drag-over, [data-project-row].is-dragging").forEach((card) => card.classList.remove("is-drag-over", "is-dragging"));
      reorderProject(sourceId, projectCard.dataset.projectRow);
      return;
    }
    const routineRow = event.target.closest?.("[data-routine-row]");
    if (routineRow && routineDragState) {
      event.preventDefault();
      const sourceId = routineDragState;
      const rect = routineRow.getBoundingClientRect();
      routineDragState = null;
      document.querySelectorAll("[data-routine-row].is-drag-over, [data-routine-row].is-dragging").forEach((row) => row.classList.remove("is-drag-over", "is-dragging"));
      reorderRoutine(sourceId, routineRow.dataset.routineRow, event.clientY > rect.top + rect.height / 2);
      return;
    }
    const masterTodoRow = event.target.closest?.("[data-master-todo-row]");
    if (masterTodoRow && masterTodoDragState) {
      event.preventDefault();
      const sourceId = masterTodoDragState.id;
      const targetId = masterTodoRow.dataset.masterTodoRow;
      const rect = masterTodoRow.getBoundingClientRect();
      const insertAfter = event.clientY > rect.top + rect.height / 2;
      masterTodoDragState = null;
      document.querySelectorAll(".master-todo-row.is-drag-over, .master-todo-row.is-dragging").forEach((item) => item.classList.remove("is-drag-over", "is-dragging"));
      reorderMasterTodo(sourceId, targetId, insertAfter);
      return;
    }
    const row = event.target.closest?.("[data-workout-row-index]");
    const form = row?.closest("[data-workout-editor]");
    if (!row || !form || !workoutDragState || form.dataset.workoutEditor !== workoutDragState.key) return;
    event.preventDefault();
    const fromIndex = workoutDragState.index;
    const targetIndex = Number(row.dataset.workoutRowIndex);
    const draft = syncWorkoutDraftFromForm(form);
    workoutDragState = null;
    document.querySelectorAll(".workout-edit-row.is-drag-over, .workout-edit-row.is-dragging").forEach((item) => item.classList.remove("is-drag-over", "is-dragging"));
    if (!draft || !Number.isInteger(targetIndex) || fromIndex === targetIndex || !draft.items[fromIndex]) return;
    const rect = row.getBoundingClientRect();
    let insertIndex = targetIndex + (event.clientY > rect.top + rect.height / 2 ? 1 : 0);
    const [moved] = draft.items.splice(fromIndex, 1);
    if (fromIndex < insertIndex) insertIndex -= 1;
    draft.items.splice(Math.max(0, Math.min(insertIndex, draft.items.length)), 0, moved);
    draft.items = normalizeWorkoutPlanItems(draft.items);
    renderFitness();
    renderCalendar();
  });

  document.addEventListener("dragend", () => {
    projectDragState = null;
    document.querySelectorAll("[data-project-row].is-drag-over, [data-project-row].is-dragging").forEach((card) => card.classList.remove("is-drag-over", "is-dragging"));
    routineDragState = null;
    document.querySelectorAll("[data-routine-row].is-drag-over, [data-routine-row].is-dragging").forEach((row) => row.classList.remove("is-drag-over", "is-dragging"));
    masterTodoDragState = null;
    document.querySelectorAll(".master-todo-row.is-drag-over, .master-todo-row.is-dragging").forEach((item) => item.classList.remove("is-drag-over", "is-dragging"));
    workoutDragState = null;
    document.querySelectorAll(".workout-edit-row.is-drag-over, .workout-edit-row.is-dragging").forEach((item) => item.classList.remove("is-drag-over", "is-dragging"));
  });

  document.addEventListener("keydown", (event) => {
    const projectHandle = event.target.closest?.("[data-project-drag]");
    if (projectHandle && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      const cards = [...document.querySelectorAll("#projectList [data-project-row]")];
      const index = cards.findIndex((card) => card.dataset.projectRow === projectHandle.dataset.projectDrag);
      const columns = getComputedStyle(document.getElementById("projectList")).gridTemplateColumns.split(" ").length;
      const offset = { ArrowUp: -columns, ArrowDown: columns, ArrowLeft: -1, ArrowRight: 1 }[event.key];
      const neighbor = cards[index + offset];
      const id = projectHandle.dataset.projectDrag;
      if (neighbor && reorderProject(id, neighbor.dataset.projectRow)) [...document.querySelectorAll("[data-project-drag]")].find((handle) => handle.dataset.projectDrag === id)?.focus({ preventScroll: true });
      return;
    }
    if (event.key === "Escape") {
      const picker = document.querySelector(".project-icon-picker[open]");
      if (picker) { picker.open = false; picker.querySelector("summary").focus(); }
      const menu = document.querySelector(".project-actions-menu[open]");
      if (menu) { menu.open = false; menu.querySelector("summary").focus(); }
    }
    const routineHandle = event.target.closest?.("[data-routine-drag]");
    if (routineHandle && ["ArrowUp", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      const id = routineHandle.dataset.routineDrag;
      const items = currentRoutineItems();
      const index = items.findIndex((item) => item.id === id);
      const neighbor = items[index + (event.key === "ArrowUp" ? -1 : 1)];
      if (neighbor && reorderRoutine(id, neighbor.id, event.key === "ArrowDown")) {
        [...document.querySelectorAll("[data-routine-drag]")].find((handle) => handle.dataset.routineDrag === id)?.focus();
      }
      return;
    }
    const handle = event.target.closest?.("[data-master-todo-drag]");
    if (!handle || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
    const pending = state.milestones.filter((item) => !item.done);
    const index = pending.findIndex((item) => item.id === handle.dataset.masterTodoDrag);
    const neighbor = pending[index + (event.key === "ArrowUp" ? -1 : 1)];
    if (!neighbor) return;
    event.preventDefault();
    const id = handle.dataset.masterTodoDrag;
    if (!reorderMasterTodo(id, neighbor.id, event.key === "ArrowDown")) return;
    document.querySelectorAll("[data-master-todo-drag]").forEach((nextHandle) => {
      if (nextHandle.dataset.masterTodoDrag === id) nextHandle.focus();
    });
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("[data-project-progress]")) {
      const value = target.closest(".project-progress")?.querySelector("label b");
      if (value) value.textContent = `${Number(target.value) || 0}%`;
      return;
    }
    if (syncCalendarHealthDraft(target)) return;
    const workoutForm = target.closest?.("[data-workout-editor]");
    if (workoutForm && (target.matches('[name="workout-title"], [data-workout-name], [data-workout-detail]'))) {
      const draft = syncWorkoutDraftFromForm(workoutForm);
      const summary = workoutForm.querySelector("[data-workout-summary]");
      if (summary) summary.textContent = workoutSummaryFromItems(draft.items);
      return;
    }
    if (target.matches("[data-goal-title], [data-goal-progress], [data-goal-area]")) {
      const id = target.dataset.goalTitle || target.dataset.goalProgress || target.dataset.goalArea;
      const goal = state.goals.find((item) => item.id === id);
      if (goal) {
        if (target.dataset.goalTitle) goal.title = target.value;
        if (target.dataset.goalProgress) goal.progress = Math.max(0, Math.min(100, Number(target.value) || 0));
        if (target.dataset.goalArea) goal.area = target.value;
        scheduleSave();
        if (target.dataset.goalProgress) {
          const score = overallProgress();
          const stat = document.querySelector(".home-stat:nth-child(2) strong");
          if (stat) stat.textContent = `${score}%`;
          const value = document.querySelector(`[data-goal-progress-value="${id}"]`);
          if (value) value.textContent = `${goal.progress}%`;
        }
      }
    }
    if (target.matches("[data-priority-text], [data-priority-detail]")) {
      const id = target.dataset.priorityText || target.dataset.priorityDetail;
      const item = state.priorities.find((priority) => priority.id === id);
      if (item) {
        if (target.dataset.priorityText) item.text = target.value;
        if (target.dataset.priorityDetail) item.detail = target.value;
      }
      scheduleSave();
    }
    if (target.matches("[data-task-text]")) {
      const task = ensureDay(target.dataset.taskDate).tasks.find((item) => item.id === target.dataset.taskText);
      if (task) task.text = target.value;
      scheduleSave();
    }
    if (target.matches("[data-master-title], [data-master-note]")) {
      const id = target.dataset.masterTitle || target.dataset.masterNote;
      const item = state.milestones.find((todo) => todo.id === id);
      if (item) {
        if (target.dataset.masterTitle) item.title = target.value;
        if (target.dataset.masterNote) item.note = target.value;
      }
      scheduleSave();
    }
    if (target.matches("[data-routine-title], [data-routine-detail]")) {
      const id = target.dataset.routineTitle || target.dataset.routineDetail;
      const item = currentRoutineItems().find((routine) => routine.id === id);
      if (item) {
        if (target.dataset.routineTitle) item.title = target.value;
        if (target.dataset.routineDetail) item.detail = target.value;
        state.routineItems = currentRoutineItems();
      }
      scheduleSave();
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
      scheduleSave();
    }
    if (target.matches("[data-project-area]")) {
      const id = target.dataset.projectArea;
      const project = state.projects.find((item) => item.id === id);
      if (project) {
        project.area = target.value;
      }
      scheduleSave();
    }
    if (target.matches("[data-project-description], [data-project-next]")) {
      const id = target.dataset.projectDescription || target.dataset.projectNext;
      const project = state.projects.find((item) => item.id === id);
      if (project) {
        const draft = projectTextDrafts.get(id) || { description: project.description || "", actions: new Map() };
        if (target.matches("[data-project-description]")) draft.description = target.value;
        else draft.actions.set(target.closest("[data-project-update]").dataset.projectUpdateDate, target.value);
        projectTextDrafts.set(id, draft);
      }
    }
    if (target.matches("[data-project-title]")) {
      const project = state.projects.find((item) => item.id === target.dataset.projectTitle);
      if (project) {
        project.title = target.value;
        scheduleSave();
        renderHome();
        renderCalendar();
      }
    }
  });

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.id === "projectAreaAddForm") {
      if (addProjectArea(document.getElementById("projectAreaName").value)) refreshProjectAreas();
      document.getElementById("projectAreaName").focus();
      return;
    }
    if (form.matches("[data-area-rename]")) {
      const previous = form.dataset.areaRename;
      const name = form.querySelector("input").value.trim();
      if (name === previous) return;
      if ((state.projectAreas || []).includes(name) && !confirm(uiText(`「${name}」已经存在，是否将两个标签合并？`, `“${name}” already exists. Merge these areas?`))) return;
      if (renameProjectArea(previous, name)) refreshProjectAreas();
      return;
    }
    if (form.matches("[data-workout-editor]")) {
      const key = form.dataset.workoutEditor;
      const draft = syncWorkoutDraftFromForm(form) || workoutDraftFor(key);
      const title = draft.title || uiText("运动安排", "Workout plan");
      const items = normalizeWorkoutPlanItems(draft.items)
        .filter((item) => item[1]);
      const subtitle = workoutSummaryFromItems(items);
      const weekday = fromKey(key).getDay();
      state.workoutPlanChanges = (state.workoutPlanChanges || []).filter((change) => change.weekday !== weekday || change.effectiveFrom < key);
      state.workoutPlanChanges.push({ id: uid("workout-change"), effectiveFrom: key, weekday, plan: { title, subtitle, items } });
      ensureDay(key).workoutPlan = null;
      editingWorkoutDate = null;
      workoutDraft = null;
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
      addDayTask(selectedDate, input.value);
      input.value = "";
      save();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("已添加待办");
    }
    if (form.id === "calendarTaskForm") {
      const input = document.getElementById("calendarTaskInput");
      addDayTask(form.dataset.taskDate, input.value);
      save();
      renderHome();
      renderReminders();
      renderCalendar();
      notify("已添加当天待办");
    }
    if (form.matches("[data-project-update]")) {
      const project = state.projects.find((item) => item.id === form.dataset.projectUpdate);
      const description = form.querySelector("[data-project-description]")?.value || "";
      const next = form.querySelector("[data-project-next]")?.value || "";
      if (project) {
        const recordDate = isDateKey(form.dataset.projectUpdateDate) ? form.dataset.projectUpdateDate : projectRecordDate(project);
        updateProjectDayRecord(project, recordDate, description, next);
        editingProjectIds.delete(project.id);
        projectTextDrafts.delete(project.id);
        save();
        renderProjects();
        document.querySelectorAll('[data-action="edit-project"]').forEach((button) => { if (button.dataset.id === project.id) button.focus({ preventScroll: true }); });
        renderHome();
        renderCalendar();
        notify("项目日期记录已更新");
      }
      return;
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
      const repeat = document.getElementById("eventRepeatInput").value;
      const normalizedRepeat = ["weekly", "monthly", "yearly"].includes(repeat) ? repeat : "none";
      if (date && title) {
        const existing = state.events.find((item) => item.id === editingEventId);
        if (existing) {
          existing.date = date;
          existing.title = title;
          existing.copy = copy;
          existing.repeat = normalizedRepeat;
        } else {
          state.events.push({ id: uid("event"), date, title, copy, repeat: normalizedRepeat });
        }
      }
      editingEventId = null;
      form.reset();
      form.hidden = true;
      document.getElementById("eventFormSubmit").textContent = uiText("保存日期", "Save date");
      save();
      renderMilestones();
      renderCalendar();
      renderHome();
      notify("重要日期已保存");
    }
  });

  document.getElementById("globalSearch").addEventListener("input", (event) => {
    clearTimeout(globalSearchTimer);
    if (!event.target.value.trim()) { closeGlobalSearch(); return; }
    if (event.isComposing) return;
    globalSearchTimer = setTimeout(() => { globalSearchTimer = null; renderGlobalSearch(); }, 150);
  });
  document.getElementById("globalSearch").addEventListener("focus", () => {
    if (document.getElementById("globalSearch").value.trim()) renderGlobalSearch();
  });
  document.getElementById("globalSearch").addEventListener("compositionend", () => {
    clearTimeout(globalSearchTimer);
    globalSearchTimer = setTimeout(() => { globalSearchTimer = null; renderGlobalSearch(); }, 150);
  });
  document.getElementById("globalSearchField").addEventListener("focusout", (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeGlobalSearch();
  });

  document.getElementById("languageToggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    localStorage.setItem(LANGUAGE_STORE, currentLanguage);
    renderAll();
    switchPage(location.hash.slice(1) || "home", false);
    applyLanguage();
    if (!document.getElementById("projectAreasModal").hidden) renderProjectAreasManager();
  });

  document.addEventListener("change", (event) => {
    if (event.target.id !== "autoBackupInterval" || backupInProgress) return;
    backupPreferences.interval = BACKUP_INTERVALS.includes(event.target.value) ? event.target.value : "weekly";
    try { persistBackupPreferences(); } catch { backupIssue = "settings"; }
    renderAutoBackupSettings();
    void runAutomaticBackup();
  });

  document.addEventListener("change", async (event) => {
    if (!event.target.matches("#importInput, #cloudImportInput")) return;
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 2e6) { alert(uiText("备份文件过大，无法导入。", "Backup file is too large.")); return; }
    try {
      reviewBackup(parseBackupText(await file.text()), file.name);
    } catch {
      alert(uiText("无法识别或不兼容的备份文件，请选择本工作台当前格式的 JSON 备份。", "Invalid or incompatible backup. Choose a current-format workbench JSON backup."));
    }
  });

  window.addEventListener("pagehide", flushSave);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushSave();
    else void runAutomaticBackup();
  });
  window.addEventListener("focus", () => { void runAutomaticBackup(); });

  window.addEventListener("popstate", (event) => {
    internalHistoryDepth = Number.isInteger(event.state?.kineticDepth) ? event.state.kineticDepth : 0;
    switchPage(location.hash.slice(1), false, true);
  });
  window.addEventListener("pageshow", () => {
    resetDateContextToToday();
    renderAll();
    switchPage(location.hash.slice(1) || "home", false);
    applyLanguage();
    void runAutomaticBackup();
  });
  resetDateContextToToday();
  save();
  renderAll();
  const initialPage = pageNames[location.hash.slice(1)] ? location.hash.slice(1) : "home";
  internalHistoryDepth = 0;
  history.replaceState({ ...(history.state || {}), kineticRoute: initialPage, kineticDepth: 0 }, "", `#${initialPage}`);
  switchPage(initialPage, false);
  applyLanguage();
  scheduleHomeBreezeRotation();
  void initializeAutoBackup();
  setInterval(() => { void runAutomaticBackup(); }, 60_000);
})();
