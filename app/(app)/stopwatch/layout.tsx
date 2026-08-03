import type {
  ReactNode,
} from "react";

import {
  createPageMetadata,
} from "@/lib/seo";

import { ToolSeo } from "@/components/seo/tool-seo";

export const metadata =
  createPageMetadata("stopwatch");

export default function StopwatchLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ToolSeo page="stopwatch">
      {children}
    </ToolSeo>
  );
}