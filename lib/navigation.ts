import {
  BookOpen,
  FileText,
  Home,
  Library,
  NotebookText,
  ScrollText,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
};

export const navigation: NavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Overview of my EE405 Undergraduate Project I contribution.",
    icon: Home,
    keywords: ["overview", "graph", "research os"],
  },
  {
    title: "Weekly Logs",
    href: "/weekly-logs",
    description: "Weekly progress, completed work, blockers, and next steps.",
    icon: BookOpen,
    keywords: ["timeline", "diary", "progress"],
  },
  {
    title: "Notes",
    href: "/notes",
    description: "Research, theory, implementation, and course notes for the project.",
    icon: NotebookText,
    keywords: ["notes", "knowledge base", "math", "deep learning"],
  },
  {
    title: "Papers",
    href: "/papers",
    description: "Literature review records, summaries, PDFs, and key takeaways.",
    icon: ScrollText,
    keywords: ["literature", "zotero", "papers", "citations"],
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Longer explanations and project write-ups.",
    icon: FileText,
    keywords: ["essays", "writing", "explainers"],
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Datasets, tools, references, templates, and useful links.",
    icon: Library,
    keywords: ["datasets", "tools", "templates"],
  },
  {
    title: "FYP",
    href: "/fyp",
    description: "Project roadmap, milestones, literature progress, and experiment status.",
    icon: Target,
    keywords: ["final year project", "roadmap", "milestones"],
  },
];

export const searchableNavigation = [
  ...navigation,
  {
    title: "Search all content",
    href: "/notes",
    description: "Find notes, papers, resources, logs, and write-ups.",
    icon: Search,
    keywords: ["global search", "find"],
  },
];
