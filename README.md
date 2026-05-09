# KindSync 🌿
### Impact Synchronized.

**KindSync** is a high-performance logistics protocol designed to eliminate friction in charitable giving. It bridges the gap between surplus resources and human need, connecting verified donors directly with NGO nodes through a transparent and decentralized synchronization network.

---

## ✨ Key Features

- **🎯 Precision Synchronization**: Direct connection between individual donors and local NGO distribution nodes.
- **🛡️ Protocol Verification**: A 24-point audit system for participating NGOs to ensure maximum social throughput.
- **📦 Zero-Friction Logistics**: Automated doorstep collection architecture for clothes and household essentials.
- **💎 Premium UI/UX**: A state-of-the-art **"Indigo & Mint"** design system engineered for clarity and professional trust.
- **🔒 Secure Architecture**: End-to-end TypeScript reliability with HttpOnly JWT authentication.
- **📂 Local-First Persistence**: Powered by SQLite for zero-installation, portable database management.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Database**: [SQLite](https://sqlite.org/) (Zero-setup local database)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/EricNicP/KindSync.git
cd KindSync
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database
KindSync uses SQLite, so there is no database server to install. Simply run:
```bash
npx prisma migrate dev --name init
```

### 4. Configure Environment
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secure-secret-key"
NODE_ENV="development"
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the KindSync Node.

---

## 📁 Architecture

- `/src/app`: Application routes and Server Components.
- `/src/components`: High-fidelity UI components and forms.
- `/src/lib`: Core utility functions (Auth, DB Client).
- `/prisma`: Schema definitions and SQLite database migrations.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
**KindSync Logistics Group** // MMXXVI
