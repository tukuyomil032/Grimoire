# ADR 002 — Blockly over Custom Block Implementation

## Status

Accepted

## Context

For the Scratch-style block editor, we considered:
1. **Google Blockly** — Mature, open-source visual programming library
2. **Custom implementation** — Build block editor from scratch using React + drag-and-drop

## Decision

**Use Google Blockly** as the block editor foundation.

## Rationale

### Blockly advantages
- **Battle-tested**: Powers Scratch, Code.org, App Inventor — serves millions of users
- **Extensible**: Custom block definitions, custom fields, custom renderers
- **Code generation**: Built-in framework for generating output from blocks
- **Accessibility**: Keyboard navigation, screen reader support
- **Theming**: Customizable colors, fonts, workspace appearance
- **i18n**: Built-in internationalization for 94+ languages
- **Plugin ecosystem**: Community plugins for additional features
- **Documentation**: Extensive docs and codelabs

### Custom implementation risks
- Significant development time for drag-and-drop, snapping, scrolling, zooming
- Accessibility is extremely difficult to implement correctly from scratch
- Edge cases in block connection logic, undo/redo, serialization
- Ongoing maintenance burden for core editor functionality

### Blockly trade-offs accepted
- Visual style is somewhat "educational" — mitigated by Zelos renderer + custom theme
- Bundle size (~500KB) — acceptable for a desktop app
- Tight coupling to Blockly API — mitigated by wrapping in a React component with clear abstraction boundary

## Consequences

- Blockly is a dependency that must be kept updated
- Custom block definitions require learning Blockly's API
- Dark theme customization requires overriding Blockly's default styles
- Complex custom UIs within blocks (e.g., color pickers) use Blockly's field system
