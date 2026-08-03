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
    title: "State-Space Model Benchmarking",
    shortTitle: "SSM Benchmarking",
    status: "completed",
    focus: "Benchmark setup",
    summary:
      "Designed the benchmark framework, smoke-tested selected models, and reviewed CVQ and JEPA theory at paper level.",
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
      "Completed controlled benchmark and boundary/domain-shift diagnostics on LoveDA and ISPRS Potsdam.",
    logHref: "/weekly-logs/week-006-boundary-and-domain-shift-analysis",
    activityLinks: [
      { label: "Week 06 reflection", href: "/weekly-logs/week-006-boundary-and-domain-shift-analysis", type: "write-up" },
      { label: "Baseline error analysis", href: "/notes/baseline-error-analysis-week-06", type: "experiment" },
      { label: "VMamba paper", href: "/papers/vmamba-visual-state-space-model", type: "paper" },
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
      "Annotated 200 representative bi-temporal scenes and prepared five public sample triplets with before, after, and mask views.",
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
      "Presented mid-project progress, reviewed annotations and benchmark results, and collected additional dataset samples.",
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
      "Studied state-of-the-art results and started the binary change detection design around benchmark datasets.",
    logHref: "/weekly-logs/week-009-binary-change-detection-model-design",
    activityLinks: [
      { label: "Week 09 reflection", href: "/weekly-logs/week-009-binary-change-detection-model-design", type: "write-up" },
      { label: "Binary model design note", href: "/notes/binary-change-model-design-week-09", type: "note" },
      { label: "ChangeMamba paper", href: "/papers/changemamba-spatiotemporal-state-space-change-detection", type: "paper" },
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
      "Completed dataset tests for the simple encoder-decoder baseline and recorded DSIFN-CD split results.",
    logHref: "/weekly-logs/week-010-region-boundary-refinement-module",
    activityLinks: [
      { label: "Week 10 reflection", href: "/weekly-logs/week-010-region-boundary-refinement-module", type: "write-up" },
      { label: "Region-boundary refinement design", href: "/notes/region-boundary-refinement-week-10", type: "experiment" },
      { label: "DSIFN paper", href: "/papers/deeply-supervised-image-fusion-network-dsifn", type: "paper" },
    ],
  },
  {
    week: 11,
    code: "W11",
    title: "Decoder, Refinement Head, and Loss Design",
    shortTitle: "Decoder and Loss",
    status: "completed",
    focus: "Loss design",
    summary:
      "Completed decoder, refinement-head, and joint-loss design; recorded exact A3-A5 ablation results.",
    logHref: "/weekly-logs/week-011-decoder-refinement-head-and-loss-design",
    activityLinks: [
      { label: "Week 11 reflection", href: "/weekly-logs/week-011-decoder-refinement-head-and-loss-design", type: "write-up" },
    ],
  },
  {
    week: 12,
    code: "W12",
    title: "Training on Benchmark Change Detection Datasets",
    shortTitle: "Training",
    status: "completed",
    focus: "Training",
    summary:
      "Completed training and benchmark evaluation on DSIFN-CD and WHU-CD with exact F1, mIoU, OA, Recall, Precision, and BF1 tables.",
    logHref: "/weekly-logs/week-012-training-on-benchmark-change-detection-datasets",
    activityLinks: [
      { label: "Week 12 reflection", href: "/weekly-logs/week-012-training-on-benchmark-change-detection-datasets", type: "write-up" },
      { label: "BIT-CD paper", href: "/papers/bit-remote-sensing-change-detection-transformers", type: "paper" },
      { label: "CGNet paper", href: "/papers/cgnet-change-guiding-network", type: "paper" },
    ],
  },
  {
    week: 13,
    code: "W13",
    title: "Evaluation, Ablation, and Model Comparison",
    shortTitle: "Evaluation",
    status: "completed",
    focus: "Evaluation",
    summary:
      "Completed backbone comparison, qualitative visual evaluation, and efficiency-versus-accuracy analysis.",
    logHref: "/weekly-logs/week-013-evaluation-ablation-and-model-comparison",
    activityLinks: [
      { label: "Week 13 reflection", href: "/weekly-logs/week-013-evaluation-ablation-and-model-comparison", type: "write-up" },
    ],
  },
  {
    week: 14,
    code: "W14",
    title: "Final Dataset Review and Project Documentation",
    shortTitle: "Documentation",
    status: "in-progress",
    focus: "Documentation",
    summary:
      "Finalize FYP1 documentation, organize evidence, and prepare material for project review.",
    logHref: "/weekly-logs/week-014-final-dataset-review-and-project-documentation",
    activityLinks: [
      { label: "Week 14 reflection", href: "/weekly-logs/week-014-final-dataset-review-and-project-documentation", type: "write-up" },
    ],
  },
];

export const activeWeek = projectWeeks.find((week) => week.status === "in-progress") ?? projectWeeks[0];

export function statusLabel(status: WeekStatus) {
  if (status === "completed") return "Completed";
  if (status === "in-progress") return "In progress";
  return "Proposed";
}
