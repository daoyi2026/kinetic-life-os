# Kinetic Life OS

Kinetic Life OS is a lightweight, local-first personal dashboard for goals, projects, daily tasks, calendar review, health notes, and workout planning.

## Features

- Goals and project progress with history
- Daily tasks, long-term reminders, and dated events
- Calendar-based daily overview
- Local health, hydration, weight, and workout records
- JSON export and import for manual backup
- Responsive desktop and mobile layouts

## Data model

All user-entered data stays in the current browser under the storage key `kinetic-life-os:data:v1`. The application has no account system, backend, analytics, or cloud synchronization.

Browser storage can be cleared by the user, private browsing mode, or browser storage policies. Users should export a JSON backup regularly and import it when moving to another device or browser.

## Local preview

Serve this directory with any static web server and open `index.html` through that server. Direct `file://` usage is not recommended because browser storage behavior can differ.

## Deployment

The included GitHub Actions workflow publishes the repository as a static GitHub Pages site after every push to `main`.

## Security and privacy

- Do not enter passwords, identity documents, payment data, or other highly sensitive information.
- User-generated content is escaped before being inserted into rendered HTML.
- The production page uses a restrictive Content Security Policy and loads no third-party scripts.
- Repository source contains generic demonstration data only.

No license has been selected yet.
