#  📘 TODO MASTER

>This is a responsive, full-featured Todo application built with React, React Query, and Tailwind CSS. It allows users to create, read, update, and delete todos, with support for optimistic updates and caching using localStorage.


---


## Features

- Basic Todo App that displays 10 todos per page.
- Client side pagination to navigate across pages.
- Real-time UI updates using React Query
- Search and Filtering
- Optimistic updates for smoother UI

---

## ⚙ Installation & Setup

```bash

# Clone the repo
git clone https://github.com/A4adella/My-todo-app.git
cd My-todo-app

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

```
---


## 📜 Available Scripts

| Script            | Description                          |
|-------------------|--------------------------------------|
| npm run dev     | Start local development server       |
| npm run build   | Bundle the app for production        |
| npm run preview | Preview the built app locally        |

---



## 🧰 Technology Stack & Architecture Decisions

### 🛠 Tech Stack

- *React* – Frontend UI library  
- *React Query* – Data fetching, caching, and state management  
- *Tailwind CSS* – Utility-first CSS framework  
- *ShadCN/UI* – Accessible, modern UI components  
- *Axios* – HTTP client for API requests  
- *React Router DOM* – Client-side routing  
- *React Hook Form* – Form state management  
- *TanStack Query Persistor* – Caches React Query data in localStorage

### 🧱 Architecture Decisions

- Chose *React Query* over Redux for simplified data fetching and automatic caching  
- Implemented *optimistic updates* to improve user experience and responsiveness  
- Integrated a *mock REST API (JSONPlaceholder)* for demonstration purposes  
- Modularized UI components (e.g., AddTodo, TodoList, TodoDetail ) for maintainability and reusability  


---

## 🔌 API Documentation & Usage

The app uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com) mock REST API for demo purposes.

### 📋 Endpoints

| Endpoint        | Method | Description           |
|-----------------|--------|-----------------------|
| /todos        | GET    | Fetch all todos       |
| /todos        | POST   | Create a new todo     |
| /todos/:id    | GET    | Fetch a single todo   |
| /todos/:id    | PUT    | Update an existing todo |
| /todos/:id    | DELETE | Delete a todo         |

> ⚠ *Note:* JSONPlaceholder is a mock API and does *not persist* changes on the server.  
> CRUD operations may appear to succeed but will not survive a page reload or reflect actual state changes.

---

## 📸 Screenshots

### 🔍 Todo List Page

![Todo List](./screenshots/Todolist%20Page(1).png)
![Todo list continuation](./screenshots/Todolist%20Page(2).png)

### Todo Detail Page

![Todo Detail](./screenshots/Todo%20Detail%20Page.png)

### Not found Page

![Not found](./screenshots/404%20page.png)

### Error Boundary Page
![Error Boundary](./screenshots/Error%20boundary%20page.png)

---


## 🐞 Known Issues / Limitations

- ⚠ *Read-only API*: JSONPlaceholder does not persist data — changes are lost on reload.
-  *Accessibility*: Comprehensive accessibility (ARIA attributes, keyboard navigation) has not been fully tested or implemented.

---



## 🚀 Future Improvements

-  Replace mock API with a real backend.
-  Add user authentication and authorization.
-  Implement dark mode support.
-  Improve accessibility (ARIA tags, keyboard navigation, screen reader support).

---







