import { NextResponse } from "next/server";

import { buildSearchIndex } from "@/lib/content";
import { routeForCollection } from "@/lib/routes";

export const dynamic = "force-static";

export async function GET() {
  const index = await buildSearchIndex();

  return NextResponse.json(
    index.map((item) => ({
      ...item,
      href: `/${routeForCollection(item.collection)}/${item.slug}`,
    })),
  );
}
