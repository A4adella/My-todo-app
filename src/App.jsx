import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import NotFound from "./pages/Notfound";
import { ErrorBoundary } from "./components/Errorboundary";
import ErrorTest from "./pages/ErrorTest";
import { lazy, Suspense } from "react";

// Lazy-loaded components
const TodoList = lazy(() => import("./components/todolist"));
const TodoDetail = lazy(() => import("./pages/TodoDetail"));


function App() {
  return (
    <>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/todos/:id" element={<TodoDetail />} />
              <Route path="/test-error" element={<ErrorTest />} />
              {/*  404 route  */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </>
  );
}
export default App;
