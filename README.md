# 👥 KeenKeeper — Keep Your Friendships Alive

KeenKeeper is a friendship management app built with Next.js, React, Tailwind CSS, shadcn/ui, and Recharts. It helps users track friends, view relationship stats, log interactions, and stay on top of important connections.

## ✨ Features

- **Responsive home page** with a hero banner, summary cards, and friend grid
- **Friend detail pages** with profile info, status badges, tags, bio, and quick actions
- **Interaction timeline** that records call, text, and video check-ins
- **Timeline filters** to sort interactions by type
- **Friendship analytics** with charts built using Recharts
- **Toast notifications** for quick interaction feedback
- **404 and loading states** for a smoother user experience
- **Fully responsive UI** for mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Next.js** — App Router and routing structure
- **React** — Component-based UI
- **Tailwind CSS** — Styling and responsive layout
- **shadcn/ui** — Reusable UI components
- **Recharts** — Analytics visualizations
- **Sonner** — Toast notifications
- **Vercel** — Deployment platform

## 📁 Project Structure

```text
src/
├── app/
│   ├── page.js
│   ├── [Friend]/page.jsx
│   ├── timeline/page.jsx
│   ├── stats/page.jsx
│   ├── loading.jsx
│   └── not-found.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Friend.jsx
│   └── ui/
└── lib/
    └── utils.js
    
public/
└── friends.json
```

## Routes

```
┌ ○ /
├ ○ /_not-found
├ ○ /friends
├ ƒ /friends/[friend]
├ ○ /stats
└ ○ /timeline

○  (Static)   pre rendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm start
```

## 📊 Data Format

Friend data is stored in `public/friends.json`. Each friend contains:

- `id`
- `name`
- `picture`
- `email`
- `days_since_contact`
- `status`
- `tags`
- `bio`
- `goal`
- `next_due_date`

## ✅ Assignment Coverage

- Navbar with active navigation states
- Home page banner and summary cards
- Friend cards and detail pages
- Timeline page with filters
- Analytics page with Recharts pie chart
- Footer section
- 404 page
- Loading UI
- Toast notifications
- Responsive design across screen sizes

## 🚢 Deployment

The project is deployed with Vercel.

**Live Link:** https://ph-assignment-07-keen-keeper-react.vercel.app

**GitHub Repository Link:** https://github.com/Shakawat-Sadik/PH-Assignment_07-Keen_Keeper

## 📄 License

This project is for educational purposes.



