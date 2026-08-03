# Chrona ⏰

Chrona is a free, modern productivity toolkit built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

It combines essential time-management tools—including a countdown timer, stopwatch, Pomodoro timer, world clock, and browser alarms—inside a clean, responsive interface designed for desktop and mobile devices.

> **Status:** Chrona is actively under development. Core time-management tools are available, with additional productivity utilities planned.

---

## Features

### Productivity Tools

* ⏱️ **Timer** — Create countdown timers for studying, cooking, workouts, and everyday tasks.
* 🕒 **Stopwatch** — Measure elapsed time with lap support.
* 🍅 **Pomodoro Timer** — Alternate between focus sessions, short breaks, and long breaks.
* 🌍 **World Clock** — Track the current time across multiple cities and time zones.
* ⏰ **Alarms** — Create multiple browser alarms with custom times and labels.

### Application Features

* 💾 **Local persistence** — Alarms and supported preferences are stored in the browser.
* 🌙 **Light and dark mode**
* 📱 **Responsive interface** for desktop, tablet, and mobile
* 🧭 **Sidebar navigation** with a mobile-friendly tool panel
* 💬 **Feedback form** for suggestions and bug reports
* 📊 **Privacy-conscious analytics consent**
* ⚡ **Fast client-side interactions**
* 🎨 **Reusable and composable UI components**
* 🔒 **No account required - for now**

---

## Available Routes

| Route          | Tool            |
| -------------- | --------------- |
| `/`            | Landing page    |
| `/timer`       | Countdown timer |
| `/stopwatch`   | Stopwatch       |
| `/pomodoro`    | Pomodoro timer  |
| `/world-clock` | World clock     |
| `/alarms`      | Browser alarms  |
| `/feedback`    | Feedback form   |

---

## Tech Stack

* **Framework:** Next.js App Router
* **Language:** TypeScript
* **UI:** React
* **Styling:** Tailwind CSS
* **Components:** shadcn/ui
* **Icons:** Lucide React
* **State Management:** Zustand
* **Persistence:** Zustand persist middleware and browser storage
* **Analytics:** Microsoft Clarity
* **Email:** Resend
* **Deployment:** Vercel

---

## Architecture

Chrona uses the Next.js App Router and separates application-shell concerns from individual productivity tools.

Each tool is organized into focused components that may include:

* Main tool interface
* Display components
* Control components
* Dialogs and supporting UI
* Custom hooks for tool logic
* Zustand stores for shared or persistent state
* Server-rendered route metadata

Shared application components handle:

* Sidebar navigation
* Top navigation
* Responsive mobile panels
* Theme support
* Analytics consent
* SEO utilities
* Reusable shadcn/ui primitives

This structure keeps the application modular and makes it easier to introduce new tools without duplicating infrastructure.

---

## Getting Started

### Prerequisites

Install:

* Node.js 20 or newer
* npm

### Clone the repository

```sh
git clone https://github.com/codingwithasim/chrona.git
cd chrona
```

### Install dependencies

```sh
npm install
```

### Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_CLARITY_ENABLED=false
NEXT_PUBLIC_CLARITY_PROJECT_ID=
```

Additional environment variables may be required to enable the production feedback email integration.

Analytics can remain disabled during local development:

```env
NEXT_PUBLIC_CLARITY_ENABLED=false
```

### Start the development server

```sh
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

Create and run an optimized production build locally:

```sh
npm run build
npm run start
```

Before deploying, set the canonical production URL:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

The production URL is used for canonical links, sitemap entries, structured data, and social previews.

---

## Design Goals

Chrona aims to be:

* Minimal and distraction-free
* Fast and lightweight
* Accessible on desktop and mobile
* Useful without requiring an account
* Modular and maintainable
* Privacy-conscious
* Easy to extend with additional productivity tools

---

## Privacy

Chrona stores supported application data locally in the browser.

Microsoft Clarity analytics are loaded only according to the application's analytics-consent configuration. Some browsers, privacy extensions, and network-level blockers may prevent analytics from loading.

Chrona does not use Clarity for advertising.

---

## Roadmap

### Completed

* [x] Countdown timer
* [x] Stopwatch with laps
* [x] Pomodoro timer
* [x] World clock
* [x] Multiple browser alarms
* [x] Alarm labels
* [x] Local alarm persistence
* [x] Light and dark mode
* [x] Responsive desktop and mobile layouts
* [x] Feedback form
* [x] Analytics consent
* [x] Route-specific SEO metadata
* [x] Sitemap and robots configuration
* [x] Open Graph and social previews
* [x] Structured data
* [x] Web app manifest and application icons

### Planned

* [ ] Planner
* [ ] Calendar utilities
* [ ] Expanded keyboard shortcuts
* [ ] Additional notification options
* [ ] More user preferences
* [ ] Additional productivity tools
* [ ] Progressive Web App improvements

---

## Contributing

Contributions, suggestions, and bug reports are welcome.

To contribute:

1. Fork the repository.

2. Create a feature branch.

   ```sh
   git checkout -b feature/your-feature
   ```

3. Commit your changes.

   ```sh
   git commit -m "Add your feature"
   ```

4. Push the branch.

   ```sh
   git push origin feature/your-feature
   ```

5. Open a pull request.

Please keep changes focused, strongly typed, and consistent with the existing application architecture.

---

## License

Chrona is licensed under the [MIT License](LICENSE).
