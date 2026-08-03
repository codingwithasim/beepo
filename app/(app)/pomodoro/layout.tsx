import type {
  ReactNode,
} from "react";

import {
  createPageMetadata,
} from "@/lib/seo";

import { ToolSeo } from "@/components/seo/tool-seo";

export const metadata =
  createPageMetadata("pomodoro");

export default function PomodoroLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ToolSeo page="pomodoro">
      {children}
    </ToolSeo>
  );
}