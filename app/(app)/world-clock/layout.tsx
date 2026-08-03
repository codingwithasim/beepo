import type {
  ReactNode,
} from "react";

import {
  createPageMetadata,
} from "@/lib/seo";

import { ToolSeo } from "@/components/seo/tool-seo";

export const metadata =
  createPageMetadata("worldClock");

export default function WorldClockLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ToolSeo page="worldClock">
      {children}
    </ToolSeo>
  );
}