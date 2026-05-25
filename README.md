# CineBlend Studios – Creative Digital Services Platform

CineBlend Studios is a premium, high-performance creative agency platform built for the modern digital era. It seamlessly blends cinematic artistry with advanced engineering to provide a unified portal for video production, brand identity, and modern web development.

## 🚀 Tech Stack

- **Frontend**: React 18 (Vite), TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Backend/Auth**: Firebase v9 (Modular SDK)
- **Database**: Firestore (NoSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 💎 Key Features

- **Service Request Portal**: Custom "CineBit" request system with real-time Firestore tracking.
- **Project Lifecycle**: Dynamic dashboard for monitoring project status (Pending, In Progress, Completed).
- **Cinematic UI**: Premium "Mocha Mousse" design system with glassmorphism and smooth curved edges.
- **Performance Optimized**: 60 FPS goal achieved through lazy loading, code splitting, and memoization.
- **Secure Auth**: Full Email/Password and Social authentication system.

## 🛠️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kabeermemon03/cineblend-frontend.git
   cd cineblend-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Firebase credentials (see `.env.example` for reference):
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components`: Reusable UI primitives (Buttons, Cards, Modals).
- `src/pages`: Main application routes (Home, About, Dashboard, Settings).
- `src/sections`: Page-specific high-fidelity UI blocks.
- `src/lib`: Core service logic (Firebase, Team Service, Auth).
- `src/store`: Global state management with Zustand.
- `src/styles`: Global Tailwind and custom CSS configurations.

## 📄 License

This project is licensed under the MIT License.
