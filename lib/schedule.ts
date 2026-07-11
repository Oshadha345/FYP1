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
    status: "completed",
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
    title: "Baseline Training and Boundary Evaluation",
    shortTitle: "Baseline Evaluation",
    status: "completed",
    focus: "Evaluation scripts",
    summary:
      "Ran initial baseline training checks, wrote region and boundary evaluation scripts, and reviewed CVQ and JEPA theory at paper level.",
    logHref: "/weekly-logs/week-005-baseline-evaluation-and-cvq",
    activityLinks: [
      { label: "Week 05 reflection", href: "/weekly-logs/week-005-baseline-evaluation-and-cvq", type: "write-up" },
      { label: "Boundary evaluation record", href: "/notes/baseline-boundary-evaluation-week-05", type: "experiment" },
      { label: "CVQ paper", href: "/papers/channel-wise-vector-quantization", type: "paper" },
      { label: "JEPA loss objectives", href: "/notes/jepa-training-paradigm-loss-objectives", type: "note" },
      { label: "Week 05 BibTeX index", href: "/resources/week-05-paper-bibtex-index", type: "resource" },
      { label: "Angular distance measures", href: "/notes/angular-correlation-distance-measures", type: "note" },
    ],
  },
  {
    week: 6,
    code: "W06",
    title: "Boundary and Domain-Shift Analysis",
    shortTitle: "Boundary Analysis",
    status: "completed",
    focus: "Error analysis",
    summary:
      "Analysed baseline behaviour and documented the main region, boundary, and dataset-specific failure modes.",
    logHref: "/weekly-logs/week-006-boundary-and-domain-shift-analysis",
    activityLinks: [
      { label: "Week 06 reflection", href: "/weekly-logs/week-006-boundary-and-domain-shift-analysis", type: "write-up" },
      { label: "Baseline error analysis", href: "/notes/baseline-error-analysis-week-06", type: "experiment" },
    ],
  },
  {
    week: 7,
    code: "W07",
    title: "Disaster Dataset Annotation Phase I",
    shortTitle: "Annotation I",
    status: "completed",
    focus: "Annotation",
    summary:
      "Completed the first disaster-data preparation phase with sample-selection rules, binary mask conventions, and quality checks.",
    logHref: "/weekly-logs/week-007-disaster-dataset-annotation-phase-i",
    activityLinks: [
      { label: "Week 07 reflection", href: "/weekly-logs/week-007-disaster-dataset-annotation-phase-i", type: "write-up" },
      { label: "Disaster annotation protocol", href: "/notes/disaster-annotation-protocol-week-07", type: "note" },
    ],
  },
  {
    week: 8,
    code: "W08",
    title: "Mid-Project Review and Method Direction",
    shortTitle: "Mid-Review",
    status: "completed",
    focus: "Review",
    summary:
      "Reviewed first-half progress and selected boundary-aware binary change detection as the second-half direction.",
    logHref: "/weekly-logs/week-008-mid-project-review-and-method-direction",
    activityLinks: [
      { label: "Week 08 reflection", href: "/weekly-logs/week-008-mid-project-review-and-method-direction", type: "write-up" },
      { label: "Method direction note", href: "/notes/mid-project-method-direction-week-08", type: "note" },
    ],
  },
  {
    week: 9,
    code: "W09",
    title: "Binary Change Detection Model Design",
    shortTitle: "CD Model Design",
    status: "completed",
    focus: "Model design",
    summary:
      "Designed the bitemporal binary change detection model structure, including shared encoding, temporal comparison, and binary decoding.",
    logHref: "/weekly-logs/week-009-binary-change-detection-model-design",
    activityLinks: [
      { label: "Week 09 reflection", href: "/weekly-logs/week-009-binary-change-detection-model-design", type: "write-up" },
      { label: "Binary model design note", href: "/notes/binary-change-model-design-week-09", type: "note" },
    ],
  },
  {
    week: 10,
    code: "W10",
    title: "Region-Boundary Refinement Module",
    shortTitle: "Refinement Module",
    status: "completed",
    focus: "Refinement",
    summary:
      "Designed a region-boundary refinement stage for improving the spatial quality of binary change maps.",
    logHref: "/weekly-logs/week-010-region-boundary-refinement-module",
    activityLinks: [
      { label: "Week 10 reflection", href: "/weekly-logs/week-010-region-boundary-refinement-module", type: "write-up" },
      { label: "Region-boundary refinement design", href: "/notes/region-boundary-refinement-week-10", type: "experiment" },
    ],
  },
  {
    week: 11,
    code: "W11",
    title: "Decoder, Refinement Head, and Loss Design",
    shortTitle: "Decoder and Loss",
    status: "in-progress",
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
