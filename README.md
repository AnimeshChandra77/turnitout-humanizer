# turnitout-humanizer
Turnitout — writing humanizer and spatial desk UI toolkit

This repository contains a small browser-based tool for highlighting AI-style phrases in text and suggesting more human-sounding replacements. It also contains a visual "desk" UI with panning/zooming and a radial dial (for demonstration purposes).

Important: This project is intended for editing and improving writing quality. It MUST NOT be used to evade plagiarism detection systems or assist academic dishonesty. By using this project you agree to use it ethically and responsibly.

## How to run

1. Clone the repository

```bash
git clone https://github.com/AnimeshChandra77/turnitout-humanizer.git
cd turnitout-humanizer
```

2. Serve the files with a simple HTTP server (recommended)

```bash
python -m http.server 8000
# or
npx http-server .
```

3. Open `index.html` in your browser at http://localhost:8000

## Files included
- `src/turnitout.js` — main script (safe/fixed version)
- `README.md` — this file

## License
MIT
