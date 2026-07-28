"use client";

import { LucideSlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useRightPanelConfig } from "./right-panel";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function MobileRightPanel() {
  const config = useRightPanelConfig();

  if (!config) {
    return null;
  }

  return (
    <Sheet>
       <Tooltip>
        <TooltipTrigger
          render={
            <SheetTrigger
              className={"lg:hidden"}
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Open ${config.title}`}
                >
                  <LucideSlidersHorizontal className="size-5" />
                </Button>
              }
            />
          }
        />

        <TooltipContent>
          Open {config.title}
        </TooltipContent>
      </Tooltip>

      <SheetContent
        side="bottom"
        className="
          flex
          h-[min(80dvh,42rem)]
          flex-col
          overflow-hidden
          p-0
        "
      >
        <SheetHeader className="shrink-0 border-b px-5 py-4 text-left">
          <SheetTitle className="text-base">
            {config.title}
          </SheetTitle>
        </SheetHeader>

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
            p-4
            pb-[max(1rem,env(safe-area-inset-bottom))]
          "
        >
          {config.content}
        </div>
      </SheetContent>
    </Sheet>
  );
}