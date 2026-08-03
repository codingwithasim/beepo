import type {
  ReactNode,
} from "react";

import {
  createPageMetadata,
} from "@/lib/seo";

import { ToolSeo } from "@/components/seo/tool-seo";

export const metadata =
  createPageMetadata("alarms");

export default function AlarmsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ToolSeo page="alarms">
      {children}
    </ToolSeo>
  );
}