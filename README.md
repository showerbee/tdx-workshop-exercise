# TDX Design System Workshop

A local dev environment for building Salesforce-aligned UIs with **LWC**, **SLDS**, and **Lightning Base Components** — with hot reload and no org required.

## Quick start

```bash
npm install
npm run dev
```

App runs at **http://localhost:3000**.

## Project structure

```
src/modules/
├── shell/     # App shell (header, nav, layout) — don't add feature code here
├── page/      # Route-level views  →  tag: page-*
├── ui/        # Reusable components  →  tag: ui-*
└── data/      # Shared data/fixtures (not LWC tags)
```

## Adding a page

1. Create `src/modules/page/<name>/<name>.html|js|css`
2. Add a route in `src/routes.config.js`
3. Import and register the component in `src/modules/shell/app/app.js` (`ROUTE_COMPONENTS`)

## Adding a reusable component

Create `src/modules/ui/<name>/` and use it as `<ui-<name>>` inside any page or other component.

## Design system

This project uses the [Lightning Design System (SLDS)](https://lightningdesignsystem.com). When building UI:

1. **Use Lightning Base Components first** (`<lightning-button>`, `<lightning-card>`, etc.)
2. **Use SLDS utility classes** for spacing and layout (`slds-m-around_small`, `slds-grid`, etc.)
3. **Use SLDS styling hooks** for custom CSS (`var(--slds-g-color-surface-1, #fff)`)
4. **Hard-code values** only as a last resort

## Useful links

- [Lightning Design System](https://lightningdesignsystem.com)
- [Lightning Base Components](https://developer.salesforce.com/docs/component-library/overview/components)
