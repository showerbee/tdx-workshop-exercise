# Mock Figma Data

Pre-recorded Figma MCP responses for offline workshop use. Participants who don't have Figma access can use these mocks to implement designs locally.

## Usage

Instead of saying:
> "Implement this Figma design: https://www.figma.com/design/..."

Say:
> "Use `mock-figma-implement-design` to implement the **form** component"

Or simply:
> "mock-figma-implement-design form"

The agent will read the pre-recorded design context, screenshot, and assets from this folder instead of calling the live Figma MCP.

## Available Mocks

| Keyword | Description |
|---------|-------------|
| `form` | Contact form with input fields (Name, Email, Phone) and a Country combobox |
| _more coming_ | Slots reserved for 4 additional mocks |

## Structure

```
mock-figma-data/
├── registry.json          # Maps keywords/URLs → mock entries
├── README.md              # This file
└── <keyword>/
    ├── response.json      # Design context (code, styles, component metadata)
    ├── screenshot.png      # Visual reference screenshot
    └── assets/            # Downloaded SVG/image assets
        └── *.svg
```

## Recording New Mocks

Use the `record-mock-figma` skill to capture a new mock from a live Figma file:

> "Use `record-mock-figma` to capture the card design at https://www.figma.com/design/... with keyword **card**"

This will:
1. Fetch the design context and screenshot from Figma MCP
2. Download referenced assets (SVGs, icons)
3. Store everything in `mock-figma-data/<keyword>/`
4. Update `registry.json`

### Screenshots

Screenshots returned by the Figma MCP are inline images that cannot be programmatically saved. After recording, manually save the screenshot to `mock-figma-data/<keyword>/screenshot.png`.

## File Format

### registry.json

```json
{
  "mocks": {
    "<keyword>": {
      "keyword": "<keyword>",
      "figmaUrl": "<original figma URL>",
      "description": "<what this design shows>",
      "responsePath": "mock-figma-data/<keyword>/response.json",
      "screenshotPath": "mock-figma-data/<keyword>/screenshot.png",
      "assetsDir": "mock-figma-data/<keyword>/assets"
    }
  },
  "urlToKeyword": {
    "<full-figma-url>": "<keyword>"
  }
}
```

### response.json

Contains `designContext` with:
- `code` — React+Tailwind reference code (to be converted to project's stack)
- `conversionNote` — Instruction to convert to target framework
- `styles` — Typography and design token specs
- `componentDescriptions` — Figma component names and descriptions
- `assets` — Map of asset variables to local file paths
