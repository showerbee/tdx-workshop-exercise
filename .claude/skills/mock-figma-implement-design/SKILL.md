---
name: mock-figma-implement-design
version: "1.0.0"
description: "Implement a UI component from pre-recorded Figma mock data instead of calling the live Figma MCP. Use this skill instead of figma-implement-design when participants do not have Figma access. Triggers include 'mock figma', 'implement mock design', 'mock-figma-implement-design', or when a user provides a Figma URL or keyword that matches a key in mock-figma-data/registry.json."
disable-model-invocation: false
---

# Mock Figma — Implement Design

## Overview

This skill replaces the live `figma-implement-design` workflow with pre-recorded Figma MCP responses stored locally. It allows workshop participants without Figma access to implement designs from cached design context data, screenshots, and assets.

## When to Use

Use this skill **instead of** `figma-implement-design` when:

- The user says "mock figma" or "mock-figma-implement-design"
- The user provides a Figma URL that matches an entry in the registry
- The user provides a keyword (e.g. "form") that matches a mock entry
- The Figma MCP server is not authenticated or unavailable

## Skill Boundaries

- This skill is for **implementing code from mock Figma data**
- It does NOT call any Figma MCP tools — all data comes from local files
- If the user needs to record new mocks, point them to `mock-figma-data/README.md`

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Resolve the Mock Key

The user provides either a **Figma URL** or a **keyword**. Resolve it to a mock entry:

1. Read `mock-figma-data/registry.json`
2. If the user gave a URL, look it up in `urlToKeyword` to get the keyword
3. If the user gave a keyword directly, use it as-is
4. Look up the keyword in `mocks` to get the mock entry with paths

If no match is found, tell the user the URL/keyword is not in the mock registry and list the available keywords from the registry.

### Step 2: Load the Design Context

Read the mock response file at the path specified by `responsePath` in the registry entry (e.g. `mock-figma-data/form/response.json`).

This JSON file contains:

- **`designContext.code`** — The reference React+Tailwind code from Figma (the primary implementation reference)
- **`designContext.conversionNote`** — Critical instruction to convert to the target project's stack
- **`designContext.styles`** — Typography and design token specifications
- **`designContext.componentDescriptions`** — Figma component metadata with names and descriptions
- **`designContext.assets`** — Map of asset variable names to local SVG/image file paths

### Step 3: View the Screenshot

Read the screenshot image at the path specified by `screenshotPath` (e.g. `mock-figma-data/form/screenshot.png`) using the Read tool. This provides the visual reference for what the implemented component should look like.

If the screenshot file does not exist, proceed without it — the code and component descriptions provide sufficient information.

### Step 4: Load Assets

Read any SVG/image assets referenced in `designContext.assets`. These are locally stored copies of the Figma design assets. Copy them to the appropriate location in the project (e.g. `public/` or alongside the component) as needed.

### Step 5: Translate to Project Conventions

This is identical to the real `figma-implement-design` workflow:

1. **Treat the code as a design reference**, not final code — it is React+Tailwind and must be converted
2. **Convert to the project's framework** (LWC in this project)
3. **Replace Tailwind utility classes** with SLDS styling hooks and utility classes
4. **Use Lightning Base Components** (`lightning-input`, `lightning-combobox`, etc.) where the Figma component descriptions indicate LWC equivalents
5. **Follow project patterns** — check existing components in `src/modules/` for conventions

Key translation rules for this project:

| Figma / React+Tailwind | LWC / SLDS Equivalent |
|---|---|
| `<input>` with "⚡ Input" | `<lightning-input>` |
| `<select>` / combobox with "⚡ Combobox" | `<lightning-combobox>` |
| `--slds-g-*` CSS variables | Same — these are SLDS 2 styling hooks |
| `gap-[var(--slds-g-spacing-*)]` | `slds-var-p-*` utility classes or CSS `gap` with hook |
| `className` | `class` (LWC uses `class` not `className`) |
| JSX `{expression}` | LWC template `{expression}` |

### Step 6: Achieve Visual Parity

Follow the same validation checklist as `figma-implement-design`:

- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches (font, size, weight, line height)
- [ ] Colors match design tokens
- [ ] Interactive states work as designed
- [ ] Assets render correctly
- [ ] Accessibility standards met

### Step 7: Run SLDS Linter

After implementation, run the SLDS linter on changed files:

```bash
npx @salesforce-ux/slds-linter@latest lint <path-to-changed-file>
```

Fix any reported issues.

## Available Mocks

To see all available mock entries, read `mock-figma-data/registry.json` and list the keywords and descriptions from the `mocks` object.

## Adding New Mocks

To record a new mock from a live Figma file, use the `record-mock-figma` skill or follow the instructions in `mock-figma-data/README.md`.
