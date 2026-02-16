// content/curriculum/month1.ts
export type CurriculumDay = {
  key: string; // "W1D1"
  week: number; // 1..4
  day: number; // 1..6
  title: string; // short
  focus: "Tooling" | "Python" | "Math" | "Data" | "SQL" | "Project";
  timeboxHours: number; // 1.0..2.0
  video: { title: string; url: string; notes?: string }[];
  build: string[]; // coding tasks
  dod: string[]; // definition of done
};

export const MONTH1: CurriculumDay[] = [
  // WEEK 1 - Tooling + Git + LA warmup
  {
    key: "W1D1", week: 1, day: 1, focus: "Tooling", timeboxHours: 1.5,
    title: "Shell basics + toolbox repo",
    video: [
      { title: "Missing Semester - The Shell", url: "https://missing.csail.mit.edu/2020/course-shell/" }
    ],
    build: [
      "Create toolbox/ structure with scripts/ and notes/",
      "Write cli-cheatsheet.md for ls, grep, find, cat, and pipe with one-line purpose + example",
      "Add one script in toolbox/scripts (count_lines.sh or find_todos.sh) with strict bash flags",
      "Make script executable and run once to verify output",
      "Write toolbox/README.md with run commands and cheatsheet link"
    ],
    dod: [
      "1 meaningful commit exists",
      "toolbox/README.md exists and is clear",
      "cli-cheatsheet.md added with 5 commands",
      "script runs successfully"
    ]
  },
  {
    key: "W1D2", week: 1, day: 2, focus: "Tooling", timeboxHours: 1.5,
    title: "Git fundamentals: branch/merge mental model",
    video: [
      { title: "Corey Schafer - Git & GitHub", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTuRUfjRe54Eea17-YfnOOAx" }
    ],
    build: ["Feature branch workflow locally (branch -> commits -> merge)", ".gitignore cleanup"],
    dod: ["2 commits (feat + docs)", "branch merged cleanly"]
  },
  {
    key: "W1D3", week: 1, day: 3, focus: "Tooling", timeboxHours: 1.5,
    title: "Missing Semester: Version Control deepening",
    video: [
      { title: "Missing Semester - Version Control", url: "https://missing.csail.mit.edu/2020/version-control/" }
    ],
    build: ["Add CONTRIBUTING.md (3 rules)", "Adopt commit convention: feat/fix/docs"],
    dod: ["CONTRIBUTING.md merged", "commit convention used"]
  },
  {
    key: "W1D4", week: 1, day: 4, focus: "Math", timeboxHours: 1.5,
    title: "Linear Algebra warmup: vectors + similarity",
    video: [
      { title: "3Blue1Brown - Essence of Linear Algebra (1-2)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" }
    ],
    build: ["Implement dot, norm, cosine similarity (pure python)", "Add 5 asserts / mini-tests"],
    dod: ["vec.py exists", "tests pass (asserts)"]
  },
  {
    key: "W1D5", week: 1, day: 5, focus: "Tooling", timeboxHours: 1.5,
    title: "Debugging + logging habit",
    video: [
      { title: "Missing Semester - Debugging & Profiling", url: "https://missing.csail.mit.edu/2020/debugging-profiling/" }
    ],
    build: ["Add logging to vec functions", "Write short before/after note (2 paragraphs)"],
    dod: ["logging outputs meaningful", "note committed"]
  },
  {
    key: "W1D6", week: 1, day: 6, focus: "Project", timeboxHours: 1.0,
    title: "Ship Week 1 artifact",
    video: [],
    build: ["Polish README", "Add screenshots (optional)", "Create artifact entry in admin (repo link)"],
    dod: ["Week 1 artifact link saved", "repo looks professional"]
  },

  // WEEK 2 - Python engineering (OOP + typing + pytest)
  {
    key: "W2D1", week: 2, day: 1, focus: "Python", timeboxHours: 1.5,
    title: "OOP basics: Milestone + DailyLog domain",
    video: [
      { title: "Corey Schafer - Python OOP", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc" }
    ],
    build: ["Create roadmap_core module", "Add classes Milestone/DailyLog + docstrings"],
    dod: ["Classes implemented", "1 commit"]
  },
  {
    key: "W2D2", week: 2, day: 2, focus: "Python", timeboxHours: 1.5,
    title: "Typing with mypy",
    video: [
      { title: "mypy Getting Started", url: "https://mypy.readthedocs.io/en/stable/getting_started.html" }
    ],
    build: ["Add mypy.ini", "Fix typing in 3 files (Optional/List/Dict)"],
    dod: ["mypy . passes (or tracked TODO list)"]
  },
  {
    key: "W2D3", week: 2, day: 3, focus: "Python", timeboxHours: 1.5,
    title: "pytest: write tests like a grown-up",
    video: [
      { title: "pytest Getting Started", url: "https://docs.pytest.org/en/stable/getting-started.html" }
    ],
    build: ["Add tests/ folder", "Write 6 tests (edge-cases)"],
    dod: ["pytest passes", "tests cover edge cases"]
  },
  {
    key: "W2D4", week: 2, day: 4, focus: "Python", timeboxHours: 1.5,
    title: "Refactor day: clean code pass",
    video: [
      { title: "ArjanCodes - Better Python (selected)", url: "https://github.com/ArjanCodes/betterpython" }
    ],
    build: ["Refactor for small functions + naming", "Write refactor-notes.md"],
    dod: ["Refactor committed", "notes exist"]
  },
  {
    key: "W2D5", week: 2, day: 5, focus: "Math", timeboxHours: 1.5,
    title: "Matrix multiplication: pure python vs numpy",
    video: [
      { title: "3Blue1Brown - Linear transformations", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" }
    ],
    build: ["Implement matmul (pure python)", "Add numpy version + tiny benchmark note"],
    dod: ["matmul works", "benchmark note committed"]
  },
  {
    key: "W2D6", week: 2, day: 6, focus: "Project", timeboxHours: 1.0,
    title: "Ship Week 2 artifact",
    video: [],
    build: ["Polish roadmap_core README", "Attach artifact link in admin"],
    dod: ["Artifact saved", "repo readable"]
  },

  // WEEK 3 - Pandas + SQL + EDA
  {
    key: "W3D1", week: 3, day: 1, focus: "Data", timeboxHours: 1.5,
    title: "Pandas basics: load + inspect + nulls",
    video: [
      { title: "Data School - Pandas", url: "https://www.youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y" }
    ],
    build: ["Create eda_00_basics.ipynb", "read_csv/head/describe/isna().sum()"],
    dod: ["Notebook committed", "basic profiling present"]
  },
  {
    key: "W3D2", week: 3, day: 2, focus: "Data", timeboxHours: 1.5,
    title: "Cleaning pipeline: fillna strategy",
    video: [
      { title: "Data School - Groupby/cleaning videos (selected)", url: "https://www.youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y" }
    ],
    build: ["Write clean_data(df) function", "median/mode fill strategy"],
    dod: ["clean_data used in notebook", "explanation added"]
  },
  {
    key: "W3D3", week: 3, day: 3, focus: "SQL", timeboxHours: 1.5,
    title: "SQL basics: SELECT/WHERE/ORDER/LIMIT",
    video: [
      { title: "Kaggle - Intro to SQL", url: "https://www.kaggle.com/learn/intro-to-sql" }
    ],
    build: ["Solve lessons 1-2", "Write sql.md with 10 queries"],
    dod: ["sql.md committed", "exercises completed"]
  },
  {
    key: "W3D4", week: 3, day: 4, focus: "SQL", timeboxHours: 1.5,
    title: "SQL: JOIN + GROUP BY",
    video: [
      { title: "Kaggle - Intro/Advanced SQL (JOIN/GROUP BY)", url: "https://www.kaggle.com/learn/intro-to-sql" }
    ],
    build: ["Write 5 JOIN/GROUP BY examples with comments"],
    dod: ["5 queries committed", "each has comment"]
  },
  {
    key: "W3D5", week: 3, day: 5, focus: "Data", timeboxHours: 1.5,
    title: "Distributions: hist + insights",
    video: [
      { title: "StatQuest - Statistics playlist (selected)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" }
    ],
    build: ["2 hist + 2 relationship plots", "Write 5 insight sentences"],
    dod: ["eda_01_distributions.ipynb committed", "insights included"]
  },
  {
    key: "W3D6", week: 3, day: 6, focus: "Project", timeboxHours: 1.0,
    title: "Ship Week 3 artifact",
    video: [],
    build: ["Bundle notebooks + sql notes", "Add artifact link"],
    dod: ["Artifact saved", "repo structure clean"]
  },

  // WEEK 4 - Titanic mini-project
  {
    key: "W4D1", week: 4, day: 1, focus: "Project", timeboxHours: 1.5,
    title: "Titanic setup: target + split mindset",
    video: [
      { title: "Kaggle Titanic page + notebooks", url: "https://www.kaggle.com/competitions/titanic" }
    ],
    build: ["titanic_00_setup.ipynb", "Define target, basic preprocessing"],
    dod: ["Notebook committed"]
  },
  {
    key: "W4D2", week: 4, day: 2, focus: "Project", timeboxHours: 1.5,
    title: "Baseline model: logistic regression",
    video: [
      { title: "StatQuest - Train/Test & Overfitting (selected)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" }
    ],
    build: ["Train baseline model", "Log initial score"],
    dod: ["Score recorded", "baseline committed"]
  },
  {
    key: "W4D3", week: 4, day: 3, focus: "Project", timeboxHours: 1.5,
    title: "Feature engineering: 2 features",
    video: [
      { title: "Data School - Feature engineering style videos", url: "https://www.youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y" }
    ],
    build: ["Add family_size, title extraction (or similar)", "Compare vs baseline"],
    dod: ["Comparison table committed"]
  },
  {
    key: "W4D4", week: 4, day: 4, focus: "Project", timeboxHours: 1.5,
    title: "Evaluation: confusion matrix + explain metric",
    video: [
      { title: "StatQuest - metrics (selected)", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" }
    ],
    build: ["Add confusion matrix + brief explanation"],
    dod: ["Evaluation notebook committed"]
  },
  {
    key: "W4D5", week: 4, day: 5, focus: "Project", timeboxHours: 1.5,
    title: "Write report + clean repo structure",
    video: [],
    build: ["reports/titanic_report.md", "repo folders: notebooks/src/reports"],
    dod: ["report readable", "reproduce steps in README"]
  },
  {
    key: "W4D6", week: 4, day: 6, focus: "Project", timeboxHours: 1.0,
    title: "Ship Week 4 artifact: Kaggle submission + links",
    video: [],
    build: ["Make a Kaggle submission", "Add artifact: Kaggle + repo + report links"],
    dod: ["Kaggle link saved as artifact", "final repo polished"]
  },
];
