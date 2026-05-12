import type { ComponentPropsWithoutRef } from "react";

import { Cite, Reference, References } from "./citation";
import { Callout } from "./callout";
import { Collapsible } from "./collapsible";
import { PdfEmbed, YouTube } from "./embed";
import { Gallery, MdxImage } from "./media";
import { Mermaid } from "./mermaid";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function Heading({
  as: Component,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2"> & {
  as: "h2" | "h3" | "h4";
}) {
  const text = typeof children === "string" ? children : "";
  const id = props.id ?? (text ? slugify(text) : undefined);

  return <Component id={id} {...props}>{children}</Component>;
}

export const mdxComponents = {
  Callout,
  Cite,
  Collapsible,
  Gallery,
  Image: MdxImage,
  Mermaid,
  MdxImage,
  PdfEmbed,
  Reference,
  References,
  YouTube,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <Heading as="h2" {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <Heading as="h3" {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <Heading as="h4" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const isExternal = props.href?.startsWith("http");

    return (
      <a
        {...props}
        rel={isExternal ? "noreferrer" : props.rel}
        target={isExternal ? "_blank" : props.target}
      />
    );
  },
};

export {
  Callout,
  Cite,
  Collapsible,
  Gallery,
  Mermaid,
  MdxImage,
  PdfEmbed,
  Reference,
  References,
  YouTube,
};
