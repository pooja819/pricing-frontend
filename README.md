---

📦 Pricing Frontend — Blue/Green Deployment Demo

This project demonstrates a frontend pricing page connected to a mock backend that simulates blue-green deployment with sticky routing.

The frontend is built with React + Vite and the backend uses a simple Express mock server.


---

✨ Features

[x] Responsive Pricing Page — displays pricing plans in a modern card layout.

[x] Dynamic Data — fetches /pricing API and renders exactly what backend returns.

[x] Version Indicator — badge shows which version (blue or green) was served.

[x] Sticky Sessions — uses cookies to keep users on the same version across refreshes.

[x] Routing Rules Supported: Header-based (X-Version), Cookie-based sticky routing, Random split (50/50).

[x] Logging — backend logs metadata and decision for each request.



---

🚀 Getting Started

[x] Clone repo and install dependencies:

git clone <your-repo-url>
cd pricing-frontend
npm install

[x] Run the Mock Backend:

node mock-server.cjs

Backend runs at: http://localhost:8080/pricing

[x] Run the Frontend:

npm run dev

Vite will start at: http://localhost:5173/ (or 5175/5176 depending on system)



---

🔍 How It Works

[x] First request to /pricing is randomly routed to blue or green version.

[x] Backend sets a version cookie so future requests stick to the same version.

[x] Refreshing the frontend shows the same version (sticky session).

[x] Manual override supported with header X-Version: blue or X-Version: green.



---

📸 Screenshots

[x] Desktop View

<p align="center">
  <img src="screenshots/desktop.png" alt="Desktop Screenshot" width="900" />
</p>  
(Shows the Green version with 3 plans: Starter, Growth, and Enterprise.)  [x] Mobile View

No direct mobile screenshot provided.

UI is fully responsive and can be previewed in Chrome DevTools mobile emulator (Ctrl+Shift+M).




---

📂 Project Structure

pricing-frontend/
├── src/                   # React frontend code
│   ├── App.jsx            # Main app with pricing fetch & UI
│   ├── App.css            # Styles
│   ├── index.css          # Global styles
│   ├── main.jsx           # React entry point
├── mock-server.cjs        # Mock backend (blue/green routing)
├── package.json           # Project dependencies & scripts
├── README.md              # Documentation
├── .gitignore             # Ignore node_modules, dist, env, etc.
├── vite.config.js         # Vite config
├── index.html             # Base HTML


---

⚡ Tech Stack

[x] Frontend: React 19 + Vite

[x] Backend: Express + Cookie Parser

[x] Styling: Custom CSS (responsive grid layout)



---

📝 Notes

[x] Project demonstrates blue-green deployment routing in a frontend + backend setup.

[x] No database used — pricing data is JSON-based.

[x] Sticky routing via:

fetch('http://localhost:8080/pricing', { credentials: 'include' })

[x] CORS middleware supports http://localhost:51xx.



---

👩‍💻 Author

[x] Pooja — Assignment project on Blue/Green Pricing API with Configurable Routing and Frontend.



---

✅ Submission Checklist

[x] Responsive frontend pricing page

[x] Fetches data from /pricing (no client-side version toggle)

[x] Shows served version (blue/green)

[x] Sticky sessions with cookies supported

[x] Clean loading & error states in frontend

[x] Modular React + Vite frontend code

[x] Logging implemented in backend

[x] README with setup instructions, screenshots, and project structure

[x] Desktop screenshot included

[x] Mobile responsiveness verified (via DevTools)

[x] .gitignore excludes node_modules

[x] Author section included