# ArkLab AI Agents Catalog

A responsive, server-side rendered AI Agent Catalog built with **Next.js**, **TypeScript**, **Redux**, **Shadcn UI**, and **Framer Motion**. Users can browse, search, and filter a list of AI agents by category, pricing, and status.

---

## 🌐 Live Demo

> https://arklab-ai-agent.vercel.app/

---

## ⚙️ Tech Stack

- **Next.js 14 (App Router)** – React framework with built-in SSR and routing.
- **TypeScript** – Type safety across the codebase.
- **Redux Toolkit** – Application-wide state management (search, filters, session, etc.).
- **Shadcn UI** – Component library for clean and accessible UI elements.
- **Framer Motion** – Smooth and subtle animations.
- **Git & GitHub** – Version control and project management.

---

##  Features

###  Core Functionalities

- **SSR Data Fetching**
  - Agents are fetched server-side from a mock `mock-agents.json` file.
  - Simulates real network delay using async functions.
  - Ensures SEO benefits and fast initial page load.

- **AI Agent Listing**
  - Displays agents in a responsive grid layout.
  - Each agent card includes:
    - Name
    - Short description
    - Status (Active, Beta, Archived)
    - Category (Customer Service, Marketing, Development)
    - Pricing model (Free Tier, Subscription, Per-Use)
    - Optional: icon or initials

- **Client-Side Filtering**
  - **Search Bar:** Filter agents by name or description.
  - **Status Filter:** Multi-select checkboxes.
  - **Category Filter:** Multi-select checkboxes.
  - **Pricing Filter:** Single-select radio buttons (toggleable).
  - **Clear All Filters:** Resets all filters and search input.

- **UX & Design**
  - Fully responsive on all screen sizes.
  - Clean, accessible UI via Shadcn components.
  - Subtle animations using **Framer Motion** (e.g., card transitions).

- **SEO Optimized**
  - Dynamic `<title>` and `<meta>` tags using `<Head>` from Next.js.

---

## Google Authentication

- **Login with Google** via `Firebase` 
- **Logout functionality**

## Tools Used
- **Firebase Authentication (Google Sign-In)**

- **Firebase SDK for client-side auth handling**

## Mock Google credentials set via .env.local:
<pre lang="env"><code>```env NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id ```</code></pre>


## Challenges Faced
- Handling Firebase initialization safely inside useEffect with SSR (Next.js App Router).

- Ensuring Redux updates on onAuthStateChanged after refresh or hot reload.

- Firebase’s auth/unauthorized-domain issue required adding the local domain to Firebase Console > Authentication > Sign-in Method > Authorized domains.


---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Bristyakter25/arklab-ai-agents
cd arklab-ai-agents

# Install dependencies
npm install

# Run the dev server
npm run dev

# Firebase Setup
# 1. Go to https://console.firebase.google.com/
# 2. Create a project (or use existing)
# 3. Enable Google Sign-In under Authentication > Sign-in method
# 4. Add your localhost or domain to "Authorized domains"
# 5. Get your config values (apiKey, authDomain, etc.)
# 6. Store them in a `.env.local` file:
