import "server-only";

import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { mdxComponents } from "../components/mdx";
import type { ContentItem, ContentMeta, MdxComponentMap } from "../types/content";

type MdastNode = {
  type: string;
  value?: string;
  lang?: string;
  url?: string;
  title?: string | null;
  children?: MdastNode[];
  name?: string;
  attributes?: Array<{
    type: string;
    name: string;
    value: string;
  }>;
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
};

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
};

function remarkCitations() {
  return function transformer(tree: MdastNode) {
    transformCitationChildren(tree);
  };
}

function transformCitationChildren(node: MdastNode) {
  if (!node.children) {
    return;
  }

  node.children = node.children.flatMap((child) => {
    if (child.type !== "text" || !child.value) {
      transformCitationChildren(child);
      return [child];
    }

    const parts: MdastNode[] = [];
    const citationPattern = /\[@([\w:.-]+)\]/g;
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = citationPattern.exec(child.value)) !== null) {
      if (match.index > cursor) {
        parts.push({
          type: "text",
          value: child.value.slice(cursor, match.index),
        });
      }

      parts.push({
        type: "link",
        url: `#ref-${match[1]}`,
        title: null,
        children: [{ type: "text", value: `[${match[1]}]` }],
        data: {
          hProperties: {
            className: "citation",
          },
        },
      });

      cursor = match.index + match[0].length;
    }

    if (cursor < child.value.length) {
      parts.push({ type: "text", value: child.value.slice(cursor) });
    }

    return parts.length > 0 ? parts : [child];
  });
}

function remarkBlockquoteCallouts() {
  return function transformer(tree: MdastNode) {
    transformCallouts(tree);
  };
}

function remarkMermaid() {
  return function transformer(tree: MdastNode) {
    transformMermaidCodeBlocks(tree);
  };
}

function transformMermaidCodeBlocks(node: MdastNode) {
  if (!node.children) {
    return;
  }

  node.children = node.children.map((child) => {
    if (child.type === "code" && child.lang?.toLowerCase() === "mermaid") {
      return {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "chart",
            value: child.value ?? "",
          },
        ],
        children: [],
      };
    }

    transformMermaidCodeBlocks(child);
    return child;
  });
}

function transformCallouts(node: MdastNode) {
  if (!node.children) {
    return;
  }

  for (const child of node.children) {
    if (child.type === "blockquote") {
      const paragraph = child.children?.[0];
      const marker = paragraph?.children?.[0];
      const match = marker?.value?.match(/^\[!(NOTE|TIP|WARNING|DANGER|IMPORTANT)\]\s*/i);

      if (paragraph?.type === "paragraph" && marker?.type === "text" && match) {
        const type = match[1].toLowerCase();
        marker.value = marker.value?.replace(match[0], "");
        child.data = {
          ...child.data,
          hName: "aside",
          hProperties: {
            className: `mdx-callout mdx-callout-${type}`,
          },
        };
      }
    }

    transformCallouts(child);
  }
}

export async function renderMdx(
  item: ContentItem,
  components: MdxComponentMap = {},
) {
  const { content } = await compileMDX<ContentMeta>({
    source: item.body,
    components: {
      ...mdxComponents,
      ...components,
    },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [
          remarkMermaid,
          remarkBlockquoteCallouts,
          remarkCitations,
          remarkGfm,
          remarkMath,
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-heading"],
              },
            },
          ],
          rehypeKatex,
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });

  return {
    content,
    frontmatter: item.meta,
  };
}
