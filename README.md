# 🌌 SpaceScope | Advanced Space Intelligence

> **Explore the universe in real-time.** SpaceScope is a cinematic, full-stack intelligence dashboard for tracking celestial events, satellite impacts, and deep-space missions.

---

## 🔗 Live Links
| Service | URL |
| :--- | :--- |
| **Frontend** | [https://earth-nova.vercel.app](https://earth-nova.vercel.app) |
| **Backend API** | [https://earthnova.onrender.com](https://earthnova.onrender.com) |

---

## ✨ Features at a Glance

### 📡 Intelligence Monitoring
*   **Cosmic Weather**: Live solar indices and radiation level tracking.
*   **Satellite Impact**: Orbiter data visualization with 3D Earth support.
*   **Global Search**: Unified search across all intelligence data.

### 📊 Data Visuals
*   **Analytics Hub**: Professional charts for mission distribution and solar trends.
*   **Mission Timeline**: Interactive horizontal scroll of NASA & SpaceX missions.
*   **UI/UX**: Ultra-premium Glassmorphism design with Dark/Light mode support.

---

## 🛠️ The Tech Stack

### 💻 Frontend
- **Framework**: `React + Vite`
- **Visuals**: `Three.js` (React Three Fiber)
- **Charts**: `Recharts`
- **Animation**: `Framer Motion`

### ⚙️ Backend
- **Server**: `Node.js + Express`
- **Database**: `Supabase` (PostgreSQL)
- **Deployment**: `Render`

---

## 📦 How to Run Locally

1.  **Clone the Mission**
    ```bash
    git clone https://github.com/ved1006/EarthNova.git
    cd EarthNova
    ```

2.  **Start the Engine (Backend)**
    ```bash
    cd backend
    npm install
    # Set your .env (SUPABASE_URL, SUPABASE_ANON_KEY)
    npm start
    ```

3.  **Launch the UI (Frontend)**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

---

## 📑 Database Schema
SpaceScope runs on 4 core intelligence tables:
1.  `events` - Celestial Event Registry.
2.  `weather` - Solar/Radiation Monitoring.
3.  `missions` - Deep Space Timeline.
4.  `impact` - Orbital Impact Analytics.

---

> [!IMPORTANT]
> **Note on Cold Starts**: Since the backend is on Render's Free Tier, it may take ~50 seconds to "wake up" on the first request.

**Mission Complete. ☄️**
