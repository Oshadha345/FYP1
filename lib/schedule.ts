export type WeekStatus = "completed" | "in-progress" | "proposed";

export type ProjectWeek = {
  week: number;
  code: string;
  title: string;
  shortTitle: string;
  status: WeekStatus;
  summary: string;
  focus: string;
  logHref?: string;
  activityLinks: Array<{
    label: string;
    href: string;
    type: "note" | "paper" | "experiment" | "resource" | "write-up";
  }>;
};

export const projectWeeks: ProjectWeek[] = [
  {
    week: 1,
    code: "W01",
    title: "Literature Review and Problem Understanding",
    shortTitle: "Literature Review",
    status: "completed",
    focus: "Project scope",
    summary:
      "Reviewed the change detection problem, identified early literature clusters, and clarified the direction of my FYP1 contribution.",
    logHref: "/weekly-logs/week-001-literature-map",
    activityLinks: [
      { label: "Week 01 reflection", href: "/weekly-logs/week-001-literature-map", type: "write-up" },
      { label: "ChangeFormer paper", href: "/papers/changeformer-transformer-siamese-change-detection", type: "paper" },
      { label: "LDGuid paper", href: "/papers/ldguid-latent-difference-guidance", type: "paper" },
      { label: "Deep learning core log", href: "/notes/deep-learning-goodfellow", type: "note" },
    ],
  },
  {
    week: 2,
    code: "W02",
    title: "Dataset Study and Disaster Data Planning",
    shortTitle: "Dataset Study",
    status: "completed",
    focus: "Data planning",
    summary:
      "Studied available satellite-image change detection datasets and planned what type of disaster-related data would be useful for evaluation.",
    logHref: "/weekly-logs/week-002-dataset-study",
    activityLinks: [
      { label: "Week 02 reflection", href: "/weekly-logs/week-002-dataset-study", type: "write-up" },
      { label: "Linear algebra log", href: "/notes/linear-algebra-to-the-edge", type: "note" },
      { label: "Computer vision log", href: "/notes/computer-vision-a-to-z", type: "note" },
    ],
  },
  {
    week: 3,
    code: "W03",
    title: "Controlled Benchmark Design",
    shortTitle: "Benchmark Design",
    status: "completed",
    focus: "Benchmark plan",
    summary:
      "Defined the controlled benchmark setup, including the evaluation assumptions and comparison structure needed before model design.",
    logHref: "/weekly-logs/week-003-controlled-benchmark-design",
    activityLinks: [
      { label: "Week 03 reflection", href: "/weekly-logs/week-003-controlled-benchmark-design", type: "write-up" },
      { label: "Literature matrix", href: "/notes/literature-matrix-reviewed-papers", type: "note" },
      { label: "Image encoders track", href: "/notes/image-encoders-research-track", type: "note" },
      { label: "Distance geometry log", href: "/notes/distance-geometry-ml", type: "note" },
    ],
  },
  {
    week: 4,
    code: "W04",
    title: "Benchmark Implementation Setup",
    shortTitle: "Implementation Setup",
    status: "in-progress",
    focus: "Implementation",
    summary:
      "Preparing the implementation environment, experiment notes, and baseline structure for upcoming benchmarking work.",
    logHref: "/weekly-logs/week-004-benchmark-implementation-setup",
    activityLinks: [
      { label: "Week 04 reflection", href: "/weekly-logs/week-004-benchmark-implementation-setup", type: "write-up" },
      { label: "Liquid Siamese paper", href: "/papers/lightweight-liquid-siamese-change-detection", type: "paper" },
      { label: "ChangeFlow paper", href: "/papers/changeflow-latent-rectified-flow", type: "paper" },
    ],
  },
  {
    week: 5,
    code: "W05",
    title: "State-Space Model Benchmarking",
    shortTitle: "SSM Benchmarking",
    status: "proposed",
    focus: "Model benchmark",
    summary:
      "Benchmark selected state-space model ideas against controlled change detection tasks.",
    activityLinks: [],
  },
  {
    week: 6,
    code: "W06",
    title: "Boundary and Domain-Shift Analysis",
    shortTitle: "Boundary Analysis",
    status: "proposed",
    focus: "Error analysis",
    summary:
      "Study boundary errors and domain-shift cases that affect satellite-image change detection quality.",
    activityLinks: [],
  },
  {
    week: 7,
    code: "W07",
    title: "Disaster Dataset Annotation Phase I",
    shortTitle: "Annotation I",
    status: "proposed",
    focus: "Annotation",
    summary:
      "Begin annotation and review of disaster-related satellite-image samples for later project evaluation.",
    activityLinks: [],
  },
  {
    week: 8,
    code: "W08",
    title: "Mid-Project Review and Method Direction",
    shortTitle: "Mid-Review",
    status: "proposed",
    focus: "Review",
    summary:
      "Review progress with supervisors and decide the technical direction for the second half of the project.",
    activityLinks: [],
  },
  {
    week: 9,
    code: "W09",
    title: "Binary Change Detection Model Design",
    shortTitle: "CD Model Design",
    status: "proposed",
    focus: "Model design",
    summary:
      "Design the binary change detection model structure and identify the parts that need implementation.",
    activityLinks: [],
  },
  {
    week: 10,
    code: "W10",
    title: "Region-Boundary Refinement Module",
    shortTitle: "Refinement Module",
    status: "proposed",
    focus: "Refinement",
    summary:
      "Explore a refinement module for improving region boundaries in predicted change maps.",
    activityLinks: [],
  },
  {
    week: 11,
    code: "W11",
    title: "Decoder, Refinement Head, and Loss Design",
    shortTitle: "Decoder and Loss",
    status: "proposed",
    focus: "Loss design",
    summary:
      "Specify decoder structure, refinement head behavior, and loss functions for the proposed model.",
    activityLinks: [],
  },
  {
    week: 12,
    code: "W12",
    title: "Training on Benchmark Change Detection Datasets",
    shortTitle: "Training",
    status: "proposed",
    focus: "Training",
    summary:
      "Train the selected model on benchmark datasets and record training behavior and initial results.",
    activityLinks: [],
  },
  {
    week: 13,
    code: "W13",
    title: "Evaluation, Ablation, and Model Comparison",
    shortTitle: "Evaluation",
    status: "proposed",
    focus: "Evaluation",
    summary:
      "Evaluate results, compare with baselines, and run ablations to understand model contribution.",
    activityLinks: [],
  },
  {
    week: 14,
    code: "W14",
    title: "Final Dataset Review and Project Documentation",
    shortTitle: "Documentation",
    status: "proposed",
    focus: "Documentation",
    summary:
      "Finalize FYP1 documentation, organize evidence, and prepare material for project review.",
    activityLinks: [],
  },
];

export const activeWeek = projectWeeks.find((week) => week.status === "in-progress") ?? projectWeeks[0];

export function statusLabel(status: WeekStatus) {
  if (status === "completed") return "Completed";
  if (status === "in-progress") return "In progress";
  return "Proposed";
}
