# Yoga Healers | Holistic Health & Satvic Wellness Platform

Yoga Healers is a full-stack web application designed to promote natural healing, yoga practice, and holistic wellness. The platform offers workshop registration, organic/satvic product shopping, a cookbook store, and an interactive Health Score Assessment.

---

## 🏗️ Project Architecture & Structure

The codebase is split into a frontend client and a backend API:

```
yoga_healers/
├── backend/                  # Node.js + Express API
│   ├── config/               # Database and server config
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Auth, error, and validation middlewares
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # Express routes matching modules
│   ├── utils/                # Custom utilities (e.g. SMTP emails, custom error)
│   ├── validators/           # express-validator schemas
│   ├── server.js             # API entrypoint
│   └── package.json          # Backend dependencies
│
└── frontend/                 # React SPA
    ├── public/               # Public HTML template, manifest, favicon
    ├── src/                  # React source files
    │   ├── api/              # Axios API clients
    │   ├── assets/           # Curated images, banners, icons, video assets
    │   ├── common/           # Shared UI components (Loader, Preloader, Logo, Notification)
    │   ├── components/       # Layout-specific components (Hero, FAQ, Workshops, HealthScore)
    │   ├── hooks/            # Custom React Hooks (useAuth, useCart, useNotification, useApp)
    │   ├── layout/           # Shared page layouts (Navbar, Footer, Modals, Drawers)
    │   ├── pages/            # Page-view components (BooksPage, ProductsPage, AboutUs, Contact)
    │   ├── redux/            # Redux Toolkit state slice stores & providers
    │   ├── App.js            # Router-like conditional page controller
    │   ├── App.css           # Global layout styling
    │   ├── index.js          # React DOM entrypoint
    │   └── index.css         # Reset & utility styling classes
    └── package.json          # Frontend dependencies & scripts
```

---

## ⚡ Key Features

1. **Holistic Workshops**: Interactive workshop sections (e.g. 7-Day Heal Yourself Challenge, 21-Day Yoga Sadhana, Cooking Masterclass, and 5-Day Lungs Detox) complete with schedules, countdown timers, slot selectors, and registration modals.
2. **Organic/Satvic Shop**: A dedicated shop page featuring silicon Enema kits, terracotta sprouting pots, neem combs, and copper bottles. Includes a full sliding cart drawer, real-time total calculations, and custom item quantity selectors.
3. **Satvic Bookstore**: Comprehensive digital/print recipe books and book combos to encourage a wholesome plant-based diet.
4. **Health Score Assessment**: Interactive multi-step health quiz calculating score bands and delivering immediate natural healing advice based on user inputs.
5. **Dynamic Checkout Flow**: Steps-based modal taking shipping info, displaying items, showing dynamic breakdown (subtotal, shipping, GST), and integrating Razorpay for safe checkouts.
6. **Premium UI/UX**: Seamless infinite brand marquees, animated hero sections with video backgrounds, a customized preloader, custom toast notifications, and full responsiveness across devices.
7. **Robust Authentication**: Email sign-ups, hashed password storage, JWT sessions, profile details updating, and forgot-password flows via SMTP email tokens.

---

## 🛠️ Tech Stack

### Frontend
- **Core Library**: React (v19)
- **State Management**: Redux Toolkit & React-Redux (for UI, Auth, and Cart states)
- **Styling**: Vanilla CSS (Fluid, responsive flexbox/grid layout and dark modes)
- **Effects**: Canvas Confetti (celebration effects)
- **HTTP Client**: Axios (client instances with API routing configuration)

### Backend
- **Runtime Environment**: Node.js
- **Server Framework**: Express.js
- **Database ORM**: MongoDB & Mongoose
- **Validation**: express-validator (strong request body validation schemas)
- **Security**: bcryptjs (password hashing), jsonwebtoken (JWT authentication)
- **Services**: Nodemailer (SMTP email generation), Razorpay SDK (payment orders and signature verification)

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js installed locally.
- MongoDB instance running locally (`mongodb://localhost:27017`) or a remote MongoDB Atlas connection URI.

### 1. Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` folder and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   
   # SMTP Credentials for password recovery
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_EMAIL=your_smtp_username
   SMTP_PASSWORD=your_smtp_password
   FROM_EMAIL=noreply@yogahealers.com
   FROM_NAME="Yoga Healers"
   
   # Razorpay API keys
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   
   FRONTEND_URL=http://localhost:3000
   ```
4. Start the server in development mode (using nodemon):
   ```bash
   npm run dev
   ```

---

### 2. Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The client runs on [http://localhost:3000](http://localhost:3000) by default.*

4. To bundle the frontend for production, run:
   ```bash
   npm run build
   ```

---

## 📡 API Endpoints

### 🔐 Auth Module (`/api/auth`)
- `POST /signup` - Registers a new user.
- `POST /login` - Authenticates user & returns a JWT token.
- `POST /logout` - Clears authenticated user contexts.
- `POST /forgot-password` - Sends a password reset token via SMTP.
- `PUT /reset-password/:resettoken` - Verifies the token & updates password.
- `GET /me` *(Protected)* - Retrieves current user info.
- `PUT /updatedetails` *(Protected)* - Modifies user details (name, email).

### 🛒 Orders Module (`/api/orders`)
- `POST /` - Places a new order details structure.
- `GET /my-orders` *(Protected)* - Retrieves the user's order history.

### 💳 Payments Module (`/api/payment`)
- `POST /create-order` - Creates a Razorpay order ID for the checkout amount.
- `POST /verify-payment` - Cryptographically verifies signature signatures returned from the client payment gateway.

### 📝 Reviews Module (`/api/reviews`)
- `POST /` - Submits a review rating and text for a workshop.
- `GET /:workshopId` - Gathers public review arrays for specific workshops.

---

## 🧪 Verification

### Frontend
- Build validation check:
  ```bash
  npm run build
  ```

### Backend
- Start verify checks:
  ```bash
  npm start
  ```
