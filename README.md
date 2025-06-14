Here’s a polished **README** for your recipe app project—including a clear overview, real project structure, setup instructions, and feature list:

---

# 🍳 Sizzle – Recipe & Cooking App

**Live Demo:** [https://sizzle-86fy.onrender.com](https://sizzle-86fy.onrender.com)

A full‑stack recipe‑sharing web application with user authentication, personalized recipes, saved favorites, and intuitive UI.

---

## 🔍 Features

* **User Authentication**: Sign up, login, logout, secure sessions.
* **Recipe Management**: Add, edit, delete, and browse recipes.
* **Favorites**: Users can bookmark recipes.
* **Search & Filter**: Find recipes by title, ingredients, or tags.
* **Responsive Design**: Works smoothly on desktop and mobile.
* **Image Upload**: Add recipe pictures with upload functionality.
* **Live Demo**: Hosted on Render.

---

## 🏗️ Project Structure

```
sizzle/
├── backend/
│   ├── config/
│   │   └── db.js                      # DB connection setup
│   ├── controllers/
│   │   ├── authController.js         # Login/logout logic
│   │   └── recipeController.js       # CRUD & search operations
│   ├── middleware/
│   │   └── authMiddleware.js         # Protect private routes
│   ├── models/
│   │   ├── User.js                   # User schema (bcrypt, JWT)
│   │   └── Recipe.js                 # Recipe schema
│   ├── routes/
│   │   ├── authRoutes.js             # /api/auth endpoints
│   │   └── recipeRoutes.js           # /api/recipes endpoints
│   ├── uploads/                      # Uploaded image storage
│   ├── .env                          # Environment variables (e.g. DB_URI, JWT_SECRET)
│   ├── server.js                     # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html                # Main HTML page
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js            # Login/signup requests
│   │   │   └── recipeApi.js          # Fetch/edit/save recipes
│   │   ├── components/
│   │   │   ├── AuthForm.jsx          # Login/register component
│   │   │   ├── RecipeCard.jsx        # Recipe list item view
│   │   │   ├── RecipeForm.jsx        # Create/edit form
│   │   │   └── Navbar.jsx            # Navigation + logout
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Keeps user state
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Public recipe listing
│   │   │   ├── Login.jsx             # Login route
│   │   │   ├── Register.jsx          # Sign‑up route
│   │   │   ├── MyRecipes.jsx         # User’s recipes
│   │   │   └── RecipeDetail.jsx      # View recipe with favorite toggle
│   │   ├── App.jsx                   # Root React component + router
│   │   ├── index.js                  # React entry point
│   │   ├── styles/                   # Optional CSS or styled-components
│   ├── package.json
│
├── .gitignore
├── README.md                         # (This file)
└── docker-compose.yml (optional)
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** & **npm**
* **MongoDB** (local or cloud, e.g., Atlas)
* (Optional) Docker & Docker Compose

---

### Backend Setup

```bash
cd backend
cp .env.sample .env
# Set DB_URI (Mongo), JWT_SECRET, PORT
npm install
npm run dev        # nodemon-dev mode
```

### Frontend Setup

```bash
cd frontend
npm install
npm start          # Opens at http://localhost:3000
```

### Production Build & Deploy

* Build frontend: `npm run build`
* Serve `frontend/build/` with static server (e.g., from Express)
* Use Docker Compose if `docker-compose.yml` is provided.

---

## ⚙️ API Endpoints

| Endpoint                    | Method | Access  | Description                      |
| --------------------------- | ------ | ------- | -------------------------------- |
| `/api/auth/register`        | POST   | Public  | Register new user                |
| `/api/auth/login`           | POST   | Public  | Authenticate and get token       |
| `/api/auth/logout`          | POST   | Private | Logout and clear session         |
| `/api/recipes`              | GET    | Public  | List all recipes                 |
| `/api/recipes/:id`          | GET    | Public  | View recipe details              |
| `/api/recipes`              | POST   | Private | Create a new recipe              |
| `/api/recipes/:id`          | PUT    | Private | Update recipe (owner only)       |
| `/api/recipes/:id`          | DELETE | Private | Delete recipe (owner only)       |
| `/api/recipes/search?q=...` | GET    | Public  | Query by title/ingredient/tag    |
| `/api/recipes/:id/favorite` | POST   | Private | Toggle favorite for current user |

---

## 🧬 Authentication

* JWTs are issued on login & stored in HTTP-only cookies.
* Protected routes verify tokens via `authMiddleware.js`.

---

## 👩‍💻 Contributing 👨‍💻

1. Fork the repo
2. `git clone` your fork
3. Create a feature branch
4. `npm install && npm run dev` (backend & frontend servers)
5. Submit a Pull Request 😊

---

## 📝 License

This project is open-source under the **MIT License**.

---

## 📞 Contact

For questions, features, or bug reports, contact **Naveen Agrawal** or open an issue/pull request on GitHub.

---

Feel free to tweak the structure, headings, or styling to match your style—this gives a solid foundation with all essentials.
