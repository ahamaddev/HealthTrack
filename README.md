# 🏥 HealthTrack – Web Application for Improving Physical Health Awareness

A modern, full-stack MERN (MongoDB, Express.js, React, Node.js) web application that helps users monitor their BMI, track daily water intake, receive personalized fitness and nutrition recommendations, and improve awareness about common physical health issues.

> **Note:** This is a preventive health and wellness application, NOT a disease prediction system.

---

## ✨ Features

- **🔐 Authentication** – JWT-based registration, login, logout with session persistence
- **📊 BMI Calculator** – Calculate, categorize, and save BMI with visual indicators
- **💧 Water Tracker** – Track daily intake with animated progress (target: 3L/day)
- **🏋️ Fitness Recommendations** – Personalized exercise plans based on BMI category
- **🥗 Nutrition Guidance** – Tailored dietary advice with meal plan suggestions
- **📖 Health Awareness** – Educational articles on obesity, dehydration, heat exhaustion, etc.
- **📈 Dashboard** – Interactive Chart.js charts (weight/BMI history, water intake)
- **👤 Profile Management** – View and edit personal information
- **📱 Responsive Design** – Mobile-first layout with smooth animations

---

## 🛠️ Tech Stack

| Layer          | Technology                                  |
| -------------- | ------------------------------------------- |
| **Frontend**   | React (Vite), React Router, Bootstrap 5     |
| **Backend**    | Node.js, Express.js                         |
| **Database**   | MongoDB, Mongoose ODM                       |
| **Auth**       | JWT, bcryptjs                               |
| **Charts**     | Chart.js, react-chartjs-2                   |
| **HTTP**       | Axios                                       |
| **Icons**      | react-icons                                 |
| **Validation** | express-validator                           |

---

## 📁 Project Structure

```
HealthTrack/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level components
│   │   ├── context/            # React Context (Auth)
│   │   ├── services/           # API service (Axios)
│   │   ├── App.jsx             # Routes
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   └── package.json
├── server/                     # Express backend
│   ├── config/                 # Database config
│   ├── controllers/            # Route handlers
│   ├── middleware/              # Auth middleware
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   ├── app.js                  # Express entry
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd HealthTrack
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file (or copy from `.env.example`):

```env
MONGO_URI=mongodb://localhost:27017/healthtrack
JWT_SECRET=your_strong_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will open at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint                | Description              | Auth     |
| ------ | ----------------------- | ------------------------ | -------- |
| POST   | `/api/auth/register`    | Register new user        | Public   |
| POST   | `/api/auth/login`       | Login user               | Public   |
| GET    | `/api/auth/profile`     | Get user profile         | Private  |
| PUT    | `/api/auth/profile`     | Update user profile      | Private  |
| POST   | `/api/bmi/save`         | Save BMI calculation     | Private  |
| GET    | `/api/bmi/history`      | Get BMI history          | Private  |
| POST   | `/api/water/add`        | Add water intake         | Private  |
| GET    | `/api/water/today`      | Get today's water intake | Private  |
| GET    | `/api/dashboard`        | Get dashboard data       | Private  |
| GET    | `/api/recommendations`  | Get recommendations      | Private  |

---

## 🌐 Deployment

### Frontend (Vercel / Netlify)

1. Build the frontend: `cd client && npm run build`
2. Deploy the `client/dist` folder
3. Set environment variable for API URL

### Backend (Render / Railway)

1. Deploy the `server` directory
2. Set environment variables (MONGO_URI, JWT_SECRET, CLIENT_URL, PORT)
3. Use `npm start` as the start command

### Database (MongoDB Atlas)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get the connection string
3. Update `MONGO_URI` in your backend environment

---

## 📄 License

This project is for educational purposes. Feel free to use and modify.

---

Built with ❤️ for better health awareness.
