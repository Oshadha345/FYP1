import { FilterableContent } from "@/components/filterable-content";
import { itemToCard, uniqueCategories, uniqueTags } from "@/lib/format";
import type { ContentItem } from "@/types/content";

export function ContentList({
  items,
  title,
}: {
  items: ContentItem[];
  title: string;
}) {
  return (
    <FilterableContent
      cards={items.map(itemToCard)}
      categories={uniqueCategories(items)}
      tags={uniqueTags(items)}
      title={title}
    />
  );
}
