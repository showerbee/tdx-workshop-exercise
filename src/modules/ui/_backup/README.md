# Backup: Non-Compliant Components

This directory contains the original non-compliant components for the SLDS 2 Transition workshop (Demo 2).

## Purpose

After participants fix/uplift the components during the workshop, use these backups to reset to the original broken state.

## Components

- `nonCompliantCard/` - User profile card with SLDS violations
- `nonCompliantAlert/` - Alert system with SLDS violations

## How to Reset

### Option 1: Use the reset script
```bash
npm run reset-demo2
```

### Option 2: Manual reset
```bash
# From project root
cp -r src/modules/ui/_backup/nonCompliantCard src/modules/ui/
cp -r src/modules/ui/_backup/nonCompliantAlert src/modules/ui/
```

## Violations in These Components

### nonCompliantCard
- Hard-coded colors (#0070d2, #ffffff, etc.)
- Hard-coded spacing in px (24px, 16px, 20px)
- Deprecated SLDS 1 class names (slds-text-heading--medium)
- Inline styles
- Custom buttons instead of lightning-button
- Hard-coded font sizes and weights

### nonCompliantAlert
- Inline SVG icons instead of lightning-icon
- Custom toggle switch instead of lightning-input type="toggle"
- Custom select instead of lightning-combobox
- Missing ARIA attributes
- Hard-coded alert colors
- Non-semantic HTML structure
