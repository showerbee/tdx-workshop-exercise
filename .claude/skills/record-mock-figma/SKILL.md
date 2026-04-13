---
name: record-mock-figma
version: "1.0.0"
description: "Record a new mock Figma response from a live Figma file for offline workshop use. Use when you need to capture a new Figma design for the mock-figma-implement-design workflow. Triggers include 'record mock', 'capture figma mock', 'add mock figma data', 'save figma response'."
disable-model-invocation: false
---

# Record Mock Figma Data

## Overview

This skill captures live Figma MCP responses and stores them locally in `mock-figma-data/` so they can be replayed by the `mock-figma-implement-design` skill without a Figma connection.

## Prerequisites

- Figma MCP server must be authenticated and accessible
- User must provide:
  1. A **Figma URL** (e.g. `https://www.figma.com/design/:fileKey/:fileName?node-id=X-Y&m=dev`)
  2. A **keyword** to use as the mock key (e.g. "form", "card", "table")

## Required Workflow

### Step 1: Parse the Figma URL

Extract from the URL:
- **fileKey**: segment after `/design/`
- **nodeId**: value of `node-id` query parameter (convert hyphens to colons: `3-12771` → `3:12771`)

### Step 2: Create the Mock Directory

```bash
mkdir -p mock-figma-data/<keyword>/assets
```

### Step 3: Fetch Design Context

Call the Figma MCP tool:

```
get_design_context(fileKey=":fileKey", nodeId=":nodeId", clientLanguages="html,css,javascript", clientFrameworks="lwc", disableCodeConnect=true)
```

Save the complete response.

### Step 4: Fetch Screenshot

Call the Figma MCP tool:

```
get_screenshot(fileKey=":fileKey", nodeId=":nodeId")
```

The screenshot will be returned as an inline image. Note: the screenshot from `get_design_context` is often included automatically. The screenshot image cannot be programmatically saved from the MCP response — it must be manually saved by the user. Instruct the user:

> "I've captured the design context. Please save the screenshot image above to `mock-figma-data/<keyword>/screenshot.png`."

### Step 5: Download Assets

Extract all asset URLs from the design context code (they look like `https://www.figma.com/api/mcp/asset/<uuid>`). Download each one:

```bash
curl -sL -o mock-figma-data/<keyword>/assets/<descriptive-name>.svg "<asset-url>"
```

### Step 6: Create response.json

Create `mock-figma-data/<keyword>/response.json` with this structure:

```json
{
  "keyword": "<keyword>",
  "figmaUrl": "<original-url>",
  "fileKey": "<fileKey>",
  "nodeId": "<nodeId>",
  "description": "<brief description of what this design shows>",
  "screenshotPath": "mock-figma-data/<keyword>/screenshot.png",
  "designContext": {
    "code": "<the full code string from the MCP response>",
    "conversionNote": "SUPER CRITICAL: The generated React+Tailwind code MUST be converted to match the target project's technology stack and styling system.\n1. Analyze the target codebase to identify: technology stack, styling approach, component patterns, and design tokens\n2. Convert React syntax to the target framework/library\n3. Transform all Tailwind classes to the target styling system while preserving exact visual design\n4. Follow the project's existing patterns and conventions\nDO NOT install any Tailwind as a dependency unless the user instructs you to do so.",
    "styles": "<styles annotation from MCP response>",
    "componentDescriptions": [
      {
        "name": "<component name>",
        "nodeId": "<node id>",
        "description": "<component description>"
      }
    ],
    "assets": {
      "<varName>": {
        "description": "<what this asset is>",
        "localPath": "mock-figma-data/<keyword>/assets/<filename>",
        "originalUrl": "<original figma asset url>"
      }
    }
  }
}
```

In the `code` field, replace all remote Figma asset URLs with local paths (e.g. `mock-figma-data/<keyword>/assets/icon-name.svg`).

### Step 7: Update Registry

Read `mock-figma-data/registry.json` and add:

1. A new entry in `mocks` keyed by the keyword
2. A new entry in `urlToKeyword` mapping the full Figma URL to the keyword

If a placeholder entry exists (e.g. `placeholder-2`), replace it with the new mock.

### Step 8: Verify

Read back the `response.json` and confirm:
- Code is complete and asset URLs point to local files
- Assets directory contains downloaded SVGs/images
- Registry entry is correct
- Screenshot path is noted (remind user to save it manually if needed)
