# ADR 003 — Tauri over Electron

## Status

Accepted

## Context

Grimoire is a desktop application. The three main options for web-based desktop app frameworks are:
1. **Electron** — Chromium + Node.js, most popular
2. **Tauri** — System webview + Rust backend
3. **ElectroBun** — Bun runtime + native bindings (newer, less mature)

## Decision

**Use Tauri v2** as the desktop application framework.

## Rationale

### Bundle size
| Framework | Typical bundle size |
|-----------|-------------------|
| Electron | 150-300MB |
| Tauri | 2-10MB |
| ElectroBun | ~14MB |

Tauri uses the system's native webview instead of bundling Chromium. This is critical for an open-source tool — users shouldn't need to download hundreds of MB.

### Memory usage
Tauri apps use significantly less RAM than Electron (~50-100MB vs 200-500MB). Important when users may be running Grimoire alongside a Minecraft server.

### Rust backend
- File I/O performance (reading/writing YAML files) is excellent in Rust
- Potential for YAML parsing/validation in Rust for performance
- Memory-safe by default
- Cross-compilation to macOS/Windows/Linux

### Security
- Tauri v2 has passed security audits
- Permission-based system for file access and commands
- No full Node.js API exposed to the renderer

### Tauri v2 specifically
- Multi-window support (WebviewWindow API — needed for detachable panels)
- Plugin system for file access, dialogs, storage
- iOS/Android support (future potential)

### Why not Electron?
- Bundle size is unacceptable for a focused tool
- Memory overhead is significant
- Chromium updates are a maintenance burden

### Why not ElectroBun?
- Too new (less mature, smaller community)
- Documentation is still evolving
- Fewer plugins and ecosystem support
- Risk of breaking changes

## Consequences

- Rust knowledge needed for backend commands (file I/O primarily)
- Platform-specific webview quirks must be tested (Safari/WebKit on macOS, WebView2 on Windows)
- Some web APIs may not be available in system webview (mitigated by Tauri plugins)
- Build process requires Rust toolchain installation
