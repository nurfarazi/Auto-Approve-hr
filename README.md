# Auto-Approve React App

Interactive sandbox for mapping the “Auto-Approve” workflow. The app is built with [Vite](https://vite.dev/) + React + TypeScript and puts every submitter and approver touchpoint on a single screen so you can demo the journey end to end.

## Highlights

- Dual portal layout toggles between Employee (submitter) and Manager (approver) experiences.
- Holiday Request and Expense Claim forms retain the latest submission so you can jump back and edit.
- Submission confirmation view summarizes the payload and enables quick navigation to the final email.
- Approval request email preview lets managers approve/decline and add a note; action confirmation captures the outcome.
- Final notification email preview mirrors what the employee receives once a decision is made.

## Getting Started

### Prerequisites

- Node.js 18 or newer (20 LTS recommended)
- npm 9+ (ships with recent Node versions)

Check your versions:

```bash
node --version
npm --version
```

### Install Dependencies

```bash
npm install
```

### Development Server

Start Vite in dev mode with hot module replacement:

```bash
npm run dev
```

Open the printed URL (defaults to `http://localhost:5173/`) in your browser.

### Workflow Walkthrough

1. Choose **Employee views** in the header and pick either the Holiday or Expense form tab.
2. Submit a form to populate the confirmation page and trigger the manager approval email.
3. Switch to **Manager views**, review the incoming email, and approve or decline with an optional note.
4. Head back to the Employee portal to preview the final notification email that reflects the manager’s decision.
5. Use “Submit another form” to reset the flow or jump straight into the alternate form.

### Production Build

Create an optimized production build and type-check the project:

```bash
npm run build
```

Preview the built assets locally:

```bash
npm run preview
```

## Project Structure

- `src/main.tsx` – App entry point, mounts the React tree.
- `src/App.tsx` - Top-level portal toggles, shared state, and routing across submitter/approver views.
- `src/components/*` - Modular forms, confirmation pages, and email previews for each step in the flow.
- `src/types.ts` - Shared TypeScript models for submissions and manager decisions.
- `src/index.css` / `src/App.css` - Base and component-level styles for the dashboard layout.
- `vite.config.ts` - Vite configuration using `@vitejs/plugin-react-swc`.
- `tsconfig.*.json` - Split TypeScript configs for app and tooling.

Static assets live in `public/` (served as-is) and `src/assets/` (processed by Vite).

## Recommended Next Steps

- Replace the sample counter UI with your application components.
- Add tests (e.g., Vitest + React Testing Library) for critical functionality.
- Configure linting/formatting tools such as ESLint and Prettier for consistent code style.
