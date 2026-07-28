"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  ExternalLink,
  Loader2,
  Mail,
} from "lucide-react";

import {
  LucideBug,
  LucideCheck,
  LucideLightbulb,
  LucideMessageSquare,
  LucideSend,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";

type FeedbackType =
  | "bug"
  | "improvement"
  | "other";

type SubmissionState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

const feedbackTypes = [
  {
    value: "bug",
    label: "Bug",
    description: "Something is not working",
    icon: LucideBug,
  },
  {
    value: "improvement",
    label: "Improvement",
    description: "Suggest a better experience",
    icon: LucideLightbulb,
  },
  {
    value: "other",
    label: "Other",
    description: "Share another thought",
    icon: LucideMessageSquare,
  },
] satisfies Array<{
  value: FeedbackType;
  label: string;
  description: string;
  icon: typeof LucideBug;
}>;

const socialLinks = [
  {
    label: "GitHub",
    description: "View the project",
    href: "https://github.com/codingwithasim",
    icon: BsGithub,
  },
  {
    label: "LinkedIn",
    description: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/codingwithasim",
    icon: FaLinkedinIn,
  },
  {
    label: "Twitter",
    description: "Follow project updates",
    href: "https://x.com/codingwithasim",
    icon: FaXTwitter,
  },
  {
    label: "Email",
    description: "Contact me directly",
    href: "mailto:asim.dev.pro@gmail.com",
    icon: Mail,
  },
];

export function FeedbackForm() {
  const [type, setType] =
    useState<FeedbackType>("bug");

  const [message, setMessage] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [website, setWebsite] =
    useState("");

  const [
    submissionState,
    setSubmissionState,
  ] = useState<SubmissionState>(
    "idle"
  );

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedMessage =
      message.trim();

    if (
      normalizedMessage.length < 10
    ) {
      setError(
        "Please provide at least 10 characters."
      );

      return;
    }

    setSubmissionState(
      "submitting"
    );

    setError(null);

    try {
      const response = await fetch(
        "/api/feedback",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            type,
            message:
              normalizedMessage,

            email: email.trim(),
            website,

            page:
              window.location
                .pathname,

            userAgent:
              window.navigator
                .userAgent,
          }),
        }
      );

      const result =
        (await response.json()) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Feedback could not be sent."
        );
      }

      setSubmissionState(
        "success"
      );

      setMessage("");
      setEmail("");
      setWebsite("");
    } catch (caughtError) {
      setSubmissionState(
        "error"
      );

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Feedback could not be sent."
      );
    }
  }

  if (
    submissionState === "success"
  ) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-2xl items-center justify-center py-6">
        <Card className="w-full rounded-xl bg-background ring-0 shadow-none">
          <CardContent className="flex min-h-80 flex-col items-center justify-center p-6 text-center sm:p-10">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <LucideCheck className="size-5" />
            </div>

            <h1 className="mt-5 text-lg font-medium">
              Feedback sent
            </h1>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Thank you for helping
              improve Beepo. Your
              feedback has been
              received.
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-6"
              onClick={() =>
                setSubmissionState(
                  "idle"
                )
              }
            >
              Send more feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl py-2 sm:py-6">
      {/* Page heading */}
      <div className="mb-6 px-6">
        <h1 className="text-xl font-medium tracking-tight">
          Feedback
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Found a problem or have an
          idea? Share it here.
        </p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        {/* Feedback form */}
        <Card className="rounded-xl p-0 bg-background ring-0 shadow-none">
          <CardContent className="p-4 sm:p-6">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Feedback type */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium">
                  What kind of feedback
                  do you have?
                </legend>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {feedbackTypes.map(
                    ({
                      value,
                      label,
                      description,
                      icon: Icon,
                    }) => (
                      <Toggle
                        key={value}
                        type="button"
                        pressed={
                          type === value
                        }
                        onPressedChange={(
                          pressed
                        ) => {
                          if (pressed) {
                            setType(
                              value
                            );
                          }
                        }}
                        aria-label={
                          label
                        }
                        className="
                          flex
                          
                          gap-3
                          rounded-lg
                          border
                          text-left
                          data-[state=on]:border-foreground/20
                          data-[state=on]:bg-muted
                        "
                      >
                          <Icon className="size-4" />

                          <span className="block text-sm font-medium">
                            {label}
                          </span>
                      </Toggle>
                    )
                  )}
                </div>
              </fieldset>

              <Separator />

              {/* Message */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="feedback-message"
                    className="text-sm font-medium"
                  >
                    Message
                  </label>

                  <span className="text-xs tabular-nums text-muted-foreground">
                    {message.length}
                    /2000
                  </span>
                </div>

                <Textarea
                  id="feedback-message"
                  value={message}
                  maxLength={2000}
                  rows={8}
                  required
                  placeholder={
                    type === "bug"
                      ? "What happened? Include what you expected and the steps that caused the problem."
                      : type ===
                          "improvement"
                        ? "What would you like Beepo to do differently?"
                        : "Share your feedback..."
                  }
                  onChange={(
                    event
                  ) => {
                    setMessage(
                      event.target
                        .value
                    );

                    if (error) {
                      setError(null);
                    }
                  }}
                  className="resize-none"
                />

                <p className="text-xs leading-5 text-muted-foreground">
                  For bug reports,
                  include the tool you
                  were using and the
                  steps needed to
                  reproduce the issue.
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="feedback-email"
                  className="text-sm font-medium"
                >
                  Email
                  <span className="ml-1 font-normal text-muted-foreground">
                    Optional
                  </span>
                </label>

                <Input
                  id="feedback-email"
                  type="email"
                  value={email}
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@example.com"
                  onChange={(
                    event
                  ) =>
                    setEmail(
                      event.target
                        .value
                    )
                  }
                />

                <p className="text-xs leading-5 text-muted-foreground">
                  Add your email only
                  when you would like a
                  response. It will not
                  be used for marketing.
                </p>
              </div>

              {/* Spam honeypot */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px]"
              >
                <label htmlFor="website">
                  Website
                </label>

                <Input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(
                    event
                  ) =>
                    setWebsite(
                      event.target
                        .value
                    )
                  }
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={
                  submissionState ===
                  "submitting"
                }
              >
                {submissionState ===
                "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <LucideSend />
                    Send Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Side content */}
        <aside className="space-y-5">
          <Card className="rounded-xl bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Connect
              </CardTitle>

              <p className="text-xs leading-5 text-muted-foreground">
                Follow Beepo updates or
                contact the developer
                directly.
              </p>
            </CardHeader>

            <CardContent className="space-y-1 px-3 pb-3">
              {socialLinks.map(
                ({
                  label,
                  description,
                  href,
                  icon: Icon,
                }) => {
                  const isExternal =
                    href.startsWith(
                      "http"
                    );

                  return (
                    <a
                      key={label}
                      href={href}
                      target={
                        isExternal
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        isExternal
                          ? "noreferrer"
                          : undefined
                      }
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-2
                        py-2.5
                        transition-colors
                        hover:bg-muted
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-ring
                      "
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                        <Icon className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {label}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {description}
                        </p>
                      </div>

                      {isExternal && (
                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </a>
                  );
                }
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Helpful feedback
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-xs leading-5 text-muted-foreground">
                <li>
                  Describe what you
                  expected to happen.
                </li>

                <li>
                  Include the Beepo tool
                  where the issue
                  occurred.
                </li>

                <li>
                  Mention whether you
                  were using mobile or
                  desktop.
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}