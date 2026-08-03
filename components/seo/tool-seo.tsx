import type {
  ReactNode,
} from "react";

import {
  createToolStructuredData,
  type ToolPageKey,
} from "@/lib/seo";

import { JsonLd } from "./json-ld";

type ToolSeoProps = {
  page: ToolPageKey;
  children: ReactNode;
};

export function ToolSeo({
  page,
  children,
}: ToolSeoProps) {
  return (
    <>
      <JsonLd
        id={`${page}-structured-data`}
        data={createToolStructuredData(
          page
        )}
      />

      {children}
    </>
  );
}