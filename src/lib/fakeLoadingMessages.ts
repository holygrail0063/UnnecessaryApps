export type LoadingFlavor =
  | "corporate"
  | "life"
  | "productivity"
  | "meeting"
  | "software"
  | "existential";

export const loadingTypeLabels: Record<LoadingFlavor, string> = {
  corporate: "Corporate Alignment",
  life: "Life Decisions",
  productivity: "Productivity Optimization",
  meeting: "Meeting Preparation",
  software: "Fake Software Update",
  existential: "Existential Loading",
};

const baseCorporate = [
  "Optimizing unnecessary dependencies…",
  "Checking if Monday is legally required…",
  "Calibrating stakeholder expectations…",
  "Waiting for imaginary approvals…",
  "Reversing productivity damage…",
  "Aligning cross-functional nothingness…",
  "Preparing high-impact inactivity…",
  "Synthesizing fake progress…",
  "Escalating to nobody…",
  "Finalizing unfinished tasks…",
  "Socializing optics without substance…",
  "Normalizing benign delay…",
  "Building narrative runway…",
];

const baseLife = [
  "Analyzing brunch versus therapy…",
  "Consulting astrology as a KPI…",
  "Determining snack ethics…",
  "Auditing bedtime integrity…",
  "Balancing doomscroll with hope…",
  "Checking if vibes are KPI-compliant…",
  "Running a courageous maybe…",
  "Quantifying softness…",
  "Waiting for cosmic sign-off…",
];

const baseProductivity = [
  "Pretending to merge todos…",
  "Defragmenting your motivation…",
  "Turbocharging focus (cosmetically)…",
  "Re-indexing procrastination backlog…",
  "Optimizing the illusion of progress…",
  "Batching brilliance for later…",
  "Applying aggressive calm…",
];

const baseMeeting = [
  "Scheduling a meta-meeting…",
  "Generating agenda gravity…",
  "Bringing clarity to ambiguity… eventually…",
  "Aligning agendas that disagree…",
  "Pre-reading slides nobody wrote…",
  "Simulating quorum…",
  "Muting reality…",
];

const baseSoftware = [
  "Downloading vibes (3 of 982)…",
  "Applying fake security patches…",
  "Indexing unnecessary binaries…",
  "Verifying imaginary checksums…",
  "Teaching progress bar confidence…",
  "Renaming caches heroically…",
  "Rolling back nothing… carefully…",
];

const baseExistential = [
  "Contemplating the void (buffering)…",
  "Indexing your choices… painfully…",
  "Asking whether meaning has Wi‑Fi…",
  "Debating determinism politely…",
  "Running selfhood diagnostics…",
  "Rendering doubt at 720p…",
];

export const PANIC_ALERT_LINES = [
  "Warning: Productivity detected.",
  "Error: Too much clarity.",
  "Critical: Actual work may begin.",
  "Alert: Stakeholder alignment unstable.",
] as const;

export function getMessagesFor(
  flavor: LoadingFlavor,
  panic: boolean,
): string[] {
  const map: Record<LoadingFlavor, readonly string[]> = {
    corporate: baseCorporate,
    life: baseLife,
    productivity: baseProductivity,
    meeting: baseMeeting,
    software: baseSoftware,
    existential: baseExistential,
  };
  const base = [...map[flavor]];
  return panic ? [...base, ...PANIC_ALERT_LINES] : base;
}

export function randomLogLines(count: number, panic: boolean): string[] {
  const pool = [
    "Initialized unnecessary process",
    "Found 0 useful tasks",
    "Optimized nothing successfully",
    "Waiting for alignment",
    "Created additional meetings spiritually",
    "Indexed imaginary dependencies",
    "Escalated to /dev/null leadership",
    "Verified premium optics",
    "Blocked by metaphysical bottleneck",
    "Confirmed stakeholders are vaguely aware",
  ];
  const lines = [...pool];
  if (panic) {
    lines.push(
      "THREAT: coherence spike detected",
      "MITIGATION: injecting buzzwords",
    );
  }
  const picks: string[] = [];
  for (let i = 0; i < count; i++) {
    picks.push(lines[i % lines.length]! + (panic && i % 4 === 0 ? " ⚠️" : ""));
  }
  return picks;
}
