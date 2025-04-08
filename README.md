# 🛒 ShopHere – Front-End Internship Assignment

**ShopHere** is a fully responsive shopping web app built using **React.js** and the **Fake Store API**. It covers all the core requirements of the internship assignment, including login authentication, product listing, cart management, and checkout — along with clean UI and theme toggling (light/dark mode).

---

## 📌 What’s Inside

### ✅ 1. Login Page

- Form with **username** and **password**
- Authenticates using `/auth/login` endpoint from **Fake Store API**
- Stores **JWT token** in `localStorage`
- On success → Redirects to product listing page

### 🛍️ 2. Product Listing Page (Home)

- Fetches and displays all products via `/products`
- Filter products by category via `/products/category/:category`
- Optional search bar included
- Responsive **mobile-first** grid layout

### 🔍 3. Product Detail Page

- Shows full product info:
  - Image, title, description, price
- "Add to Cart" button available

### 🛒 4. Cart Page

- Displays products added to cart
- Allows quantity update and item removal
- Shows **total price**
- **Checkout** button:
  - On click: clears cart and shows a popup message
  - Message: “Order placed successfully!” (auto disappears after 4 seconds)
  - Stays on Cart page after checkout

### 🌐 5. Header / Navigation

- Links to **Home**, **Cart**, **Logout**
- Displays total cart item count
- **Logout** clears JWT token and redirects to Login

---

## 🧱 Tech Stack

- **React.js** (Vite)
- **React Router v6+**
- **React Hooks**
- **Context API** (for cart & theme state)
- **Plain CSS** (mobile-first responsive)
- **Fake Store API** ([Docs](https://fakestoreapi.com/docs))

---

## 💡 Key Concepts & Features

- ✅ `useContext`, `useReducer`, `useEffect`, `useNavigate`
- 🌗 Dark/Light mode toggle using Theme Context
- 📦 Cart management with Context API
- 🔄 Persistent state using `localStorage`
- 📱 Fully responsive UI with hamburger menu
- ⏳ Checkout includes loading spinner and popup message
