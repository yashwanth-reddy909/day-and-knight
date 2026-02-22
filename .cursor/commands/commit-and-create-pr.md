---
description: Stage, commit, and create a concise PR using this repo's commit style.
---

Prepare a clean commit and open a pull request for the current branch, using a consistent commit format.

Instructions:
1. Inspect current state:
   - `git status`
   - full staged + unstaged diff
   - recent commit history (`git log`) for context only (do not copy wording directly)
2. Summarize changes to be committed and propose a commit message using the format below.
3. Stage only relevant files (exclude secrets/noise).
4. Commit with a clear, consistent message focused on intent.
5. Check whether the branch is pushed; push with upstream tracking if needed.
6. Create a PR against the default base branch.

Commit message format (required):
- Subject line: `<type>: <short intent sentence>`
- Blank line
- Bullet list describing key changes
- Keep bullets concise and action-oriented

Commit message example:
```text
feat: initialize vscode-day-and-knight extension with basic functionality

- Add package.json for extension metadata and dependencies
- Implement main extension logic in src/extension.ts
- Create toggle command to switch between light and dark themes
- Add status bar item for quick theme toggling
- Set up TypeScript configuration in tsconfig.json
- Include initial test suite in src/test/extension.test.ts
- Create vsc-extension-quickstart.md for extension documentation
```

PR writing requirements:
- Keep it short, compact, and scannable.
- Use short multi-point bullets.
- Focus on "why" and user impact, not raw file listings.

PR body format:
## Summary
- <point 1>
- <point 2>
- <point 3>

## Test Plan
- [ ] <quick validation step>
- [ ] <quick validation step>

Final response requirements:
- Provide committed files summary.
- Provide final commit message.
- Provide PR URL.
- If blocked (hooks/conflicts/push/permissions), explain exact blocker and the minimal next command to run.
