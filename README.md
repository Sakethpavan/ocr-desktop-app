# 🔍 OCR Desktop App
[![Release Build](https://github.com/YOUR_USERNAME/ocr-desktop-app/actions/workflows/release.yml/badge.svg)](https://github.com/YOUR_USERNAME/ocr-desktop-app/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A lightweight, local-first OCR tool built with **Tauri 2.0**, **React**, and **Rust**. Convert images to text instantly without uploading your data to the cloud.



---

## 🌍 Cross-Platform Support & Requirements

This app runs natively on Windows, macOS, and Linux. Because we use the high-performance Tesseract engine, you must ensure the engine is installed on your OS.

| Platform | Runtime Requirement (For Users) | Dev Requirement (For Builders) |
| :--- | :--- | :--- |
| **Ubuntu/Linux** | `sudo apt install tesseract-ocr` | `libtesseract-dev`, `clang` |
| **macOS** | `brew install tesseract` | `brew install tesseract` |
| **Windows** | [Tesseract Installer](https://github.com/UB-Mannheim/tesseract/wiki) | `vcpkg install tesseract` |

---

## 📦 Download & Install

1. Go to the [Releases Page](https://github.com/Sakethpavan/ocr-desktop-app/releases).
2. Download the installer for your system:
   - **Windows:** `.msi` or `.exe`
   - **Linux:** `.deb` (Ubuntu/Debian) or `.AppImage`
   - **macOS:** `.dmg`
3. Ensure Tesseract is installed (see table above) before launching.

---

## 🛠 For Developers

### Prerequisites
- [Rust & Cargo](https://rustup.rs/)
- [Node.js & pnpm](https://pnpm.io/)
- System dependencies listed in the table above.

### Setup
```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm tauri dev

# Build for your current OS
pnpm tauri build