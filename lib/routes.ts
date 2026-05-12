export function routeForCollection(collection: string) {
  const routeMap: Record<string, string> = {
    blogs: "blog",
    weekly_logs: "weekly-logs",
    notes: "notes",
    research_notes: "notes",
    course_notes: "notes",
    books: "notes",
    experiments: "notes",
    papers: "papers",
    resources: "resources",
  };

  return routeMap[collection] ?? collection;
}
