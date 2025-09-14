Playwright UAT guide

Quick setup:

# from frontend folder
npm install
npm run uat:install   # installs browsers via playwright
npm run dev           # start frontend (default Vite port 5173)

# in another terminal
npm run uat:run

Notes:
- Playwright needs Node and browsers installed; installing via `npx playwright install` downloads the browsers.
- The sample test uses `http://localhost:5173` as default; set env FRONTEND_BASE to change.
- For CI, add `npx playwright install --with-deps` and run in a suitable runner.
