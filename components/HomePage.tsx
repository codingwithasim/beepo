"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Globe,
  Timer,
  Clock,
  AlarmClock,
  Activity,
  CalendarDays,
  LucideAlarmClock,
  LucideClockPlus,
} from "lucide-react";

export default function TimeFyiLanding() {
  const tools = [
    {
      title: "Timezones",
      description: "Convert time across different zones",
      icon: Globe,
      href: "/world-clock",
    },
    {
      title: "Pomodoro",
      description: "Focused work sessions with breaks",
      icon: Activity,
      href: "/pomodoro",
    },
    {
      title: "World Clock",
      description: "Track time across the world",
      icon: Clock,
      href: "/world-clock",
    },
    {
      title: "Timer",
      description: "Countdown with optional alarm",
      icon: AlarmClock,
      href: "/timer",
    },
    {
      title: "Stopwatch",
      description: "Measure elapsed time precisely",
      icon: Timer,
      href: "/stopwatch",
    },
    {
      title: "Planner",
      description: "Organize your day simply",
      icon: CalendarDays,
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <h1 className="text-lg font-semibold items-center tracking-tight flex gap-2">
                <LucideClockPlus size={18}/>
                Beepo
            </h1>

        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          All your time tools in one place
        </h2>

        <p className="mt-4 text-muted-foreground">
          Minimal tools for focus, productivity, and time awareness.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button render={
            <Link href="/timer">Open app</Link>
          }>
          </Button>
          
        </div>
      </section>

      <Separator />

      {/* TOOLS */}
      <section id="tools" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link key={tool.title} href={tool.href}>
                <Card className="h-full cursor-pointer transition hover:shadow-md hover:-translate-y-0.5">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <div className="rounded-md border p-2">
                      <Icon className="h-4 w-4" />
                    </div>

                    <CardTitle className="text-base">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription>
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto text-center max-w-6xl px-6 py-10 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {" - "}
          All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}