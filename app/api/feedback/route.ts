import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const validTypes = new Set([
  "bug",
  "improvement",
  "other",
]);

type FeedbackPayload = {
  type?: unknown;
  message?: unknown;
  email?: unknown;
  website?: unknown;
  page?: unknown;
  userAgent?: unknown;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(
  value: string
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

export async function POST(
  request: Request
) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.FEEDBACK_TO_EMAIL ||
    !process.env.RESEND_FROM_EMAIL
  ) {
    console.error(
      "Feedback email environment variables are missing."
    );

    return Response.json(
      {
        error:
          "Feedback is temporarily unavailable.",
      },
      {
        status: 500,
      }
    );
  }

  let payload: FeedbackPayload;

  try {
    payload =
      (await request.json()) as FeedbackPayload;
  } catch {
    return Response.json(
      {
        error: "Invalid request.",
      },
      {
        status: 400,
      }
    );
  }

  const type =
    typeof payload.type === "string"
      ? payload.type
      : "";

  const message =
    typeof payload.message ===
    "string"
      ? payload.message.trim()
      : "";

  const email =
    typeof payload.email === "string"
      ? payload.email.trim()
      : "";

  const website =
    typeof payload.website ===
    "string"
      ? payload.website.trim()
      : "";

  const page =
    typeof payload.page === "string"
      ? payload.page.slice(0, 200)
      : "Unknown";

  const userAgent =
    typeof payload.userAgent ===
    "string"
      ? payload.userAgent.slice(
          0,
          500
        )
      : "Unknown";

  // Honeypot field
  if (website) {
    return Response.json({
      success: true,
    });
  }

  if (!validTypes.has(type)) {
    return Response.json(
      {
        error:
          "Select a valid feedback type.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    message.length < 10 ||
    message.length > 2000
  ) {
    return Response.json(
      {
        error:
          "The message must contain between 10 and 2,000 characters.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    email &&
    (!isValidEmail(email) ||
      email.length > 254)
  ) {
    return Response.json(
      {
        error:
          "Enter a valid email address.",
      },
      {
        status: 400,
      }
    );
  }

  const typeLabel =
    type === "bug"
      ? "Bug Report"
      : type === "improvement"
        ? "Improvement"
        : "Other Feedback";

  try {
    const { error } =
      await resend.emails.send({
        from:
          process.env
            .RESEND_FROM_EMAIL,

        to: [
          process.env
            .FEEDBACK_TO_EMAIL,
        ],

        replyTo:
          email || undefined,

        subject: `[Chrona] ${typeLabel}`,

        text: [
          `Type: ${typeLabel}`,
          `Reply email: ${
            email || "Not provided"
          }`,
          `Page: ${page}`,
          "",
          "Message:",
          message,
          "",
          `Browser: ${userAgent}`,
        ].join("\n"),

        html: `
          <h2>${escapeHtml(typeLabel)}</h2>

          <p>
            <strong>Reply email:</strong>
            ${escapeHtml(email || "Not provided")}
          </p>

          <p>
            <strong>Page:</strong>
            ${escapeHtml(page)}
          </p>

          <hr />

          <p style="white-space: pre-wrap">
            ${escapeHtml(message)}
          </p>

          <hr />

          <p>
            <strong>Browser:</strong>
            ${escapeHtml(userAgent)}
          </p>
        `,
      });

    if (error) {
      console.error(
        "Resend feedback error:",
        error
      );

      return Response.json(
        {
          error:
            "Feedback could not be sent.",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Feedback endpoint error:",
      error
    );

    return Response.json(
      {
        error:
          "Feedback could not be sent.",
      },
      {
        status: 500,
      }
    );
  }
}