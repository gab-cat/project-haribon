---
description: This document defines **strict instructions** for using **Cursor** and **VS Code Copilot** when developing and testing the frontend with **Playwright MCP**.
applyTo: '**'
---

# Frontend Development Rules — Playwright MCP with Cursor & VS Code Copilot
This document defines **strict instructions** for using **Cursor** and **VS Code Copilot** when developing and testing the frontend with **Playwright MCP**.

---

## 1. General Workflow Rules

1. **Always prioritize clarity and maintainability** over shortcuts.
2. All code suggestions from Copilot **must** be reviewed before acceptance.
3. Ensure **Playwright MCP** usage follows the latest [Playwright API](https://playwright.dev/docs/api) and [MCP documentation].
4. **Do not** write any logic that hardcodes test values unless specifically marked as `// TODO: replace with dynamic value`.
5. Frontend features must **always be tested** using Playwright MCP before merging.

---

## 2. Cursor AI Rules

When using **Cursor**:

- **Rule 1:** First prompt Cursor with a **clear functional goal**, including:
  - Target framework (React, Next.js, etc.).
  - Expected user interaction flow.
  - Styling constraints (Tailwind, CSS Modules, etc.).
  - Any required Playwright MCP test scaffolding.

- **Rule 2:** Instruct Cursor to:
  - Generate **frontend component code** in `/src/components`.
  - Add **unit tests** in `/tests/unit`.
  - Add **E2E Playwright MCP tests** in `/tests/e2e`.

- **Rule 3:** When modifying code:
  - Ask Cursor to **explain changes** before applying.
  - Verify that imports are **absolute or project-alias based** (no random relative paths unless necessary).

- **Rule 4:** Cursor must **not**:
  - Generate backend logic unless explicitly told.
  - Remove accessibility attributes (`aria-*`, semantic HTML).
  - Skip writing tests for new UI components.

---

## 3. VS Code Copilot Rules

When using **Copilot** in VS Code:

- **Rule 1:** Always **write a comment first** describing the desired code block before triggering Copilot completion.

- **Rule 2:** Validate that:
  - JSX/TSX is properly typed with TypeScript interfaces.
  - All Playwright MCP test scripts are **idempotent** and can run multiple times without side effects.
  - Generated selectors in Playwright use **`data-testid`** attributes where possible, not brittle CSS selectors.

- **Rule 3:** For Playwright MCP tests:
  - Store tests under `/tests/e2e/`.
  - Use `await page.goto(BASE_URL)` with a global `BASE_URL` from config.
  - Include assertions for **both** UI rendering and expected network behavior.

- **Rule 4:** Never accept Copilot completions that:
  - Mix unrelated concerns (e.g., UI rendering + DB queries).
  - Introduce unused variables/imports.
  - Hardcode URLs or tokens.

---

## 4. Playwright MCP Testing Rules

- Use `beforeEach` to set up a fresh page context.
- Prefer `getByTestId()` over text-based selectors.
- Group related tests using `describe()` blocks.
- Always include:
```ts
  expect(await page.screenshot()).toMatchSnapshot();
````

for visual regression when applicable.

* Handle async flows with explicit `await` on **every** Playwright call.

---

## 5. File & Commit Rules

* All code must pass:

  ```bash
  npm run lint
  npm run test
  npm run test:e2e
  ```

  **before committing**.

* Commit messages must follow:

  ```
  feat(frontend): add feature X with Playwright MCP test
  fix(test): correct flaky selector in Playwright MCP
  refactor(ui): improve accessibility in component Y
  ```

---

## 6. Example Prompt for Cursor

```plaintext
Create a responsive "LoginForm" React component in /src/components/LoginForm.tsx using TailwindCSS.
It should have email and password fields, validation, and a submit button.
Add Playwright MCP tests in /tests/e2e/loginForm.spec.ts that:
- Navigate to the login page
- Fill out both fields
- Assert form validation messages
- Assert redirect to dashboard after success
```

---

## 7. Example Comment for Copilot

```ts
// Create a Playwright MCP E2E test that checks if the navigation bar renders correctly on mobile and desktop breakpoints
```

---

## 8. Final Checklist Before Merge

* [ ] Code reviewed and approved.
* [ ] All unit tests pass.
* [ ] All Playwright MCP E2E tests pass.
* [ ] Accessibility attributes verified.
* [ ] No unused code or console logs.
* [ ] Commit message follows convention.


**Version:** 1.0
**Last Updated:** 2025-08-14

