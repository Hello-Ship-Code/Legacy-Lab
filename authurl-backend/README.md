# AuthURL-Backend

AuthURL-Backend is a **backend hub** for **user authentication and URL shortening**, built using **Node.js, Express, Prisma, MongoDB, and JWT**. The project follows a modular route-based structure, with `/user` handling URL-related functionalities, `/api` managing authentication, and `/` serving static content.

---

- its a test 🧪

## 🚀 Features

### 1️⃣ User Authentication API (`/api`)

- User registration and login with hashed passwords.
- JWT-based authentication for secure access.
- CRUD operations on user details.

### 2️⃣ URL Shortener API (`/user`)

- Generate short URLs from long URLs.
- Retrieve original URLs using a short code.
- Track visit history and analytics via `/user/:shortId`.

### 3️⃣ Static Content (`/`)

- Serve static pages and content.

---

## 🛠️ Tech Stack

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database management
- **MongoDB** - NoSQL database
- **TypeScript** - Type safety
- **JWT** - Secure authentication

---

## 📂 Project Structure

```
AuthURL-Backend/
│── src/                    # Source code
│   ├── config/             # Configuration files (env, DB connection)
│   ├── controllers/        # Business logic (user & URL controllers)
│   ├── handlers/           # Handler functions
│   ├── middleware/         # Authentication & validation middleware
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── validation/         # User input validation
│   ├── views/              # Static content controllers
│   ├── index.ts            # Main entry point
│── prisma/
│   ├── schema.prisma       # Database schema
│── .env                    # Environment variables
│── package.json            # Dependencies & scripts
│── README.md               # Documentation
```

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/hello-ship-code/AuthURL-Backend.git
cd AuthURL-Backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/your-db-name
JWT_SECRET=your_secret_key
NODE_ENV=development
SALT_ROUNDS=10
```

### 4️⃣ Generate Prisma Client

```sh
npx prisma generate
```

### 5️⃣ Start the Server

#### Development Mode (with Nodemon)

```sh
npm run dev
```

#### Production Mode

```sh
npm start
```

---

## 🛠️ API Endpoints

### 🏷️ User Authentication API (`/api`)

#### ➕ Register User

```http
POST /api/signup
```

**Request Body:**

```json
{
  "userName": "JohnDoe",
  "email": "john@example.com",
  "password": "your-secure-password"
}
```

#### 🔑 Login User

```http
POST /api/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "your-secure-password"
}
```

**Response:**

```json
{
  "token": "your-jwt-token"
}
```

### 🔗 URL Shortener API (`/user`)

#### 🎯 Create Short URL

```http
POST /user
```

**Request Body:**

```json
{
  "redirectUrl": "https://example.com"
}
```

#### 🔗 Retrieve Original URL or Analytics

```http
GET /user/:shortId
```

### 🏷️ Static Content (`/`)

#### 📄 Serve Static Pages

```http
GET /
```

---

## 🛠️ Useful Commands

### Push Database Schema to MongoDB

```sh
npx prisma db push
```

### View Prisma Studio (Database UI)

```sh
npx prisma studio
```

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to use and modify it!

---

## 🚀 Contributing

Want to contribute? Open an issue or submit a PR on **GitHub**! 🔥

---

## 🔗 Author

- **Abhinav Peter**
- GitHub: [Hello-Ship-Code](https://github.com/Hello-Ship-Code)
