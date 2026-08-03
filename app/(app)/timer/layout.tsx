import type {
  ReactNode,
} from "react";

import {
  createPageMetadata,
} from "@/lib/seo";

import { ToolSeo } from "@/components/seo/tool-seo";

export const metadata =
  createPageMetadata("timer");

export default function TimerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ToolSeo page="timer">
      {children}
    </ToolSeo>
  );
}