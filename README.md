Crick Walk Club - Clean Rebuild

This project is a cleaned, non-Replit version of your Replit project.
It includes:

- backend/ : Node.js + better-sqlite3 server providing API endpoints
- frontend/: Static HTML/CSS/JS that uses the API

How to run backend on your PC:

1. Install Node.js (>=14)
2. Open terminal in backend/ and run:
   npm install
   npm start

By default the server listens on port 3000 and serves the frontend as static files.
API endpoints:
GET /api/walks
GET /api/walks/:id
POST /api/walks   (JSON body)
DELETE /api/walks/:id

Hosting frontend:
You can host the frontend on GitHub Pages or Netlify.
Make sure to configure the API base URL in frontend/js/config.js to point to your public IP or DDNS domain with port (e.g. http://my-ddns.example:3000).

If you want the server to be accessible publicly, set up port forwarding on your router and use a Dynamic DNS (DDNS) provider like DuckDNS or no-ip.

Security note: exposing your PC to the internet can be risky. Consider adding authentication.

