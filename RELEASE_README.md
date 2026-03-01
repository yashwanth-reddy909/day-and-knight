# Release README

Use this checklist to publish a new version successfully to the VS Code Marketplace.

## Prerequisites

- GitHub repository secret `VSCODE_PUBLISHER_TOKEN` exists and is valid.
- You can push commits and tags to the repository.

## Step-by-step release process

1. **Choose the new version**
   - Example: `0.0.5`

2. **Update `package.json`**
   - Set `"version"` to the new version by running: `npm version 0.0.5`

3. **Update `CHANGELOG.md`**
   - Add a section heading exactly like:
   - `## [0.0.5] - 2026-03-02`
   - Add release notes under that section.

4. **Sync and verify dependencies locally**
   - Run:

```bash
npm install
npm run lint
npm run format:check
```

5. **Commit and push changes**
   - Commit at least:
   - `package.json`
   - `CHANGELOG.md`
   - `package-lock.json` (if changed)

6. **Create and push release tag**
   - Tag format must be `vX.Y.Z`.
   - With command `git tag -a v<new-version> -m "Release <new-version>"`

```bash
git tag -a v0.0.5 -m "Release 0.0.5"
git push origin v0.0.5
```

7. **Confirm publish workflow result**
   - Open GitHub Actions and check `Publish VS Code Extension`.
   - Wait for a successful run.

## Required CI checks for publish

The publish workflow will fail if either condition is not met:

- Tag version (`vX.Y.Z`) does not match `package.json` version (`X.Y.Z`).
- `CHANGELOG.md` does not contain a heading starting with `## [X.Y.Z]`.
