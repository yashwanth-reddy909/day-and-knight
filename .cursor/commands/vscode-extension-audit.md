---
description: Audit this VS Code extension for correctness, docs alignment, and package.json freshness.
---

Run a focused, practical audit for this VS Code extension repository.

Scope:
- Check implementation quality, correctness, and maintainability.
- Check alignment with official VS Code extension docs (activation, commands, configuration, status bar, cleanup/disposal patterns, package manifest conventions).
- Check `package.json` health (manifest correctness, dependency freshness, scripts, engines compatibility).
- Identify mistakes, risks, regressions, and high-value improvements.

Required context to inspect first:
- `src/extension.ts`
- `package.json`
- `.cursor/rules/vscode-extension.mdc`
- `.cursor/rules/vscode-extension-docs.mdc`
- `.cursor/rules/typescript-clean-mini.mdc`
- `AGENTS.md`

Instructions:
1. Use these official VS Code doc checks directly while auditing (cite mismatches against these rules):
   - Activation events: prefer demand-driven activation and avoid `"*"` unless no other event combination fits; since VS Code 1.74+, contributed commands/views/custom editors/auth providers generally do not need explicit matching activation events.  
     Source: https://code.visualstudio.com/api/references/activation-events
   - Commands: each user-facing command should be coherently contributed in `contributes.commands` (title/category/visibility rules) and correctly wired in runtime registration logic.  
     Source: https://code.visualstudio.com/api/references/contribution-points#contributes.commands
   - Configuration: extension settings should be declared in `contributes.configuration.properties` with unique setting IDs and clear schema/description metadata.  
     Source: https://code.visualstudio.com/api/references/contribution-points#contributes.configuration
   - Status bar UX: keep status bar contributions minimal (ideally one concise item), short labels, no custom colors except exceptional warning/error cases.  
     Source: https://code.visualstudio.com/api/ux-guidelines/status-bar
   - Lifecycle/disposal: ensure activation/deactivation contract is respected and cleanup is properly handled; async cleanup should return a Promise.  
     Source: https://code.visualstudio.com/api/references/activation-events#Start-up
   - Manifest baseline: validate extension manifest essentials (for example required `engines.vscode`, which cannot be `"*"`).  
     Source: https://code.visualstudio.com/api/references/extension-manifest
2. Prioritize findings by severity: critical, high, medium, low.
3. For each finding, include:
   - file/path or area
   - what is wrong/risky
   - why it matters
   - smallest practical fix
4. Add a short "improvements" section for non-blocking upgrades.
5. Validate `package.json`:
   - extension manifest fields are complete and coherent
   - activation events and contributed commands/settings make sense
   - `engines.vscode` is reasonable
   - dependencies/devDependencies are not obviously stale or mismatched
6. Call out missing tests or validation steps if relevant.
7. Be concise and actionable. Avoid generic advice.

Output format:
## Findings
- [severity] <path/area>: <issue> -> <why it matters> -> <recommended fix>

## Improvements
- <concise, non-blocking enhancement>

## Package.json Checks
- <check>: <status + note>

## Suggested Next Steps
- <small, concrete next action>
