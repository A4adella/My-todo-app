import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, Trash2, CheckCircle } from "lucide-react";
import { Pen } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EditTodoModal from "./EditTodoModal";
import AddTodo from "./addtodo";


const TODOS_PER_PAGE = 10;

const fetchTodos = async () => {
  const cachedTodos = localStorage.getItem("cachedTodos");

  // Return cached todos if they exist
  if (cachedTodos) {
    console.log("Loaded from localStorage");
    return JSON.parse(cachedTodos);
  }

  // Fetch from API if not cached
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
  const todos = response.data;

  // Cache in localStorage
  localStorage.setItem("cachedTodos", JSON.stringify(todos));

  console.log("Fetched from API and cached");
  return todos;
};


function TodoList() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTodo, setEditingTodo] = useState(null);
  const closeEditModal = () => setEditingTodo(null);
  const [hasCache, setHasCache] = useState(() =>
  Boolean(localStorage.getItem("cachedTodos"))
);


  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const deleteTodo = useMutation({
    mutationFn: (id) =>
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo.mutate(id);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "complete"
        ? todo.completed
        : !todo.completed;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTodos.length / TODOS_PER_PAGE);
  const startIndex = (currentPage - 1) * TODOS_PER_PAGE;
  const currentTodos = filteredTodos.slice(
    startIndex,
    startIndex + TODOS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) {
    return (
      <Card className="p-6 max-w-3xl mx-auto">
        <Skeleton className="h-6 w-1/2 mb-4" />
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full mb-2" />
        ))}
      </Card>
    );
  }

  if (error)
    return <p className="text-red-500 text-center mt-50 text-bold">Failed to fetch todos.</p>;

  return (
    <>
      <header className="mb-8 text-center mt-10">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">TodoMaster</h1>
        <p className="text-gray-600">Create Todos, Create balance.</p>
      </header>

  <AddTodo />



      <Card className="p-6 max-w-3xl mx-auto bg-white shadow ml-10px">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Todo List
        </h1>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search todos..."
              className="border rounded  py-2 pl-10 pr-3  s border-gray-300  w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            name="filter-status"
            id="filter-status"
            value={filterStatus}
            onValueChange={setFilterStatus}
            className="border rounded w-full md:w-[180px] lg:w-[200px] px-3 py-2  border-gray-300"
          >
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="complete">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {currentTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-4 border rounded-xl group hover:shadow"
            >
              <Link
                to={`/todos/${todo.id}`}
                className="flex items-center space-x-2"
              >
                <CheckCircle
                  className={`h-5 w-5 ${
                    todo.completed ? "text-green-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={todo.completed ? "line-through text-gray-500" : ""}
                >
                  {todo.title}
                </span>
              </Link>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingTodo(todo)}
                  aria-label="Edit todo"
                  className="hover: bg-grey-800 cursor-pointer"
                >
                  <Pen />
                </Button>

                <Badge
                  className={`${
                    todo.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {todo.completed ? "Complete" : "Incomplete"}
                </Badge>

                <Button
                  variant="destructive"
                  size="icon"
                  aria-label="Delete Todo"
                  className="ml-2 hover: cursor-pointer bg-indigo-500"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {/* No match message */}
        {currentTodos.length === 0 && (
          <div className="text-center mt-6">
            <Search className="mx-auto h-10 w-10 text-gray-400" />
            <p className="text-gray-500">
              No todos found matching your criteria.
            </p>
          </div>
        )}

        <EditTodoModal editingTodo={editingTodo} onClose={closeEditModal} />

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            variant="outline"
            className="hover:text-gray-500 cursor-pointer bg-indigo-600 text-white"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            variant="outline"
            className="hover:text-gray-500 cursor-pointer bg-indigo-600 text-white"
          >
            Next
          </Button>
        </div>
      </Card>
      <footer>{hasCache && (
    <div className="flex justify-center mb-4">
    <Button
      onClick={() => {
          setHasCache(false); 
        localStorage.removeItem("cachedTodos");
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      }}
      variant="outline"
      className="text-sm"
      aria-label= "Refresh Todos"
    >
    Refresh Todos 
    </Button>
  </div>
)} 
</footer>
    </>
  );
}

export default TodoList;
