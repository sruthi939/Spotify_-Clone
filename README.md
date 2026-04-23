# 🎉 Spotify Clone - Full Stack Music Platform

A premium, modern web application designed for high-fidelity music streaming, album exploration, and professional platform administration. This project features a cinematic dark UI, real-time audio playback, and a production-grade admin command center with Role-Based Access Control (RBAC).

---

## 🚀 Features

### 🎧 User Portal
- **Premium Discovery:** Browse a vast library of tracks and albums with a cinematic "Spotify Dark" aesthetic.
- **Dynamic Playback:** High-fidelity audio player with real-time progress tracking and volume control.
- **Album Exploration:** Interactive album galleries with dynamic background color synchronization.
- **Responsive Design:** Optimized for seamless performance across all device types.

### 🛡️ Admin Command Center
- **Secure Authentication:** Master administrative login with AES-256 encrypted session handshakes.
- **Content Management:** Create, list, search, and remove songs and albums with instant Cloudinary synchronization.
- **Live Platform Analytics:** Real-time monitoring of play counts, user volume, and content metrics.
- **User Role Management:** Granular control over platform identity (Admin, Artist, Listener) with RBAC enforcement.
- **Financial Intelligence:** Comprehensive tracking of payment histories, premium VIP accounts, and revenue reports.

### ⚙️ System Infrastructure
- **Asset Cloud Sync:** Automatic synchronization with Cloudinary for image and audio asset hosting.
- **Backend Monitoring:** Persistent monitoring of server health, database connectivity, and disk usage.
- **Interactive Global Search:** Real-time filtering engine across all administrative and user modules.

---

## 💳 Payment & Subscription System

Integrated financial monitoring for platform monetization.

- **Transaction Audit:** Track secure online payments with mobile ID verification.
- **VIP Accounts:** Dedicated management suite for premium subscription tracking.
- **Revenue Summaries:** Automated calculation of Total Revenue and Average Ticket Size.

---

## 📧 Notification System

Automated system alerts for administrative and user events:

- **System Health Alerts:** Real-time notifications for server and asset synchronization status.
- **Identity Notifications:** Push alerts for user login, signup, and role updates.
- **Security Logs:** Audit trails for administrative actions and session handshakes.

---

## 🛠 Tech Stack

**Frontend**
- React 19 / Vite
- Tailwind CSS 4
- Lucide React (Iconography)

**Backend**
- Node.js
- Express.js
- JWT Authentication

**Database & Cloud**
- MongoDB Atlas
- Cloudinary (Media Hosting)

---

## 📂 Configuration & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sruthi939/Spotify_-Clone.git
   ```

2. **Backend Setup (.env)**
   Create an `.env` file in the `backend` directory with the following variables:
   ```env
   MONGODB_URL="Your MongoDB Connection String"
   CLOUDINARY_API_KEY="Your Cloudinary API Key"
   CLOUDINARY_SECRET_KEY="Your Cloudinary Secret"
   CLOUDINARY_NAME="Your Cloudinary Cloud Name"
   JWT_SECRET="Your JWT Secret"
   NODE_ENV='development'
   ADMIN_EMAIL="admin@spotify.com"
   ADMIN_PASSWORD="Your Admin Password"
   # Optional for Payment Integration
   RAZORPAY_TEST_API_KEY="Your Razorpay Key"
   RAZORPAY_TEST_API_SECRET="Your Razorpay Secret"
   ```

3. **Install Dependencies**
   ```bash
   # In root, backend, and admin directories
   npm install
   ```

4. **Run the Platform**
   ```bash
   # Backend
   npm start
   # Admin & Frontend
   npm run dev
   ```

---

## 👨‍💻 Author
**Sruthi Alex**  
[Connect on LinkedIn](https://https://www.linkedin.com/in/sruthi-alex-b7784b37a/)

