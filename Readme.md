# 🔐 React Login App with Backend Proxy

This project is a simple **Login page in React.js** that connects to a backend API for authentication. It uses **Axios**, **Tailwind CSS**, and **Render.com** as a proxy to solve CORS and HTTPS issues.

---

## 📦 Tech Stack

- React.js (Vite)
- Tailwind CSS
- Axios
- Express.js (used as proxy server)
- Render.com (for backend deployment)
- Vercel (for frontend deployment)


Problem Faced After Deployment
❌ Mixed Content Error
text
Copy
Edit
Mixed Content: The page at 'https://frotloginapi.vercel.app/' was loaded over HTTPS, but requested an insecure endpoint 'http://82.112.234.104:8001/api/auth/login/'.


🛠 Reason

Vercel deploys frontend over HTTPS

Your backend API is served over HTTP

Browsers block insecure (HTTP) API calls from secure (HTTPS) websites