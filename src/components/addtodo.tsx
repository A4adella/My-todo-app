import  { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

function AddTodo() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  type Todo = { title: string; completed: boolean };

  const { mutate, isPending } = useMutation({
    mutationFn: (newTodo: Todo) =>
      axios.post("https://jsonplaceholder.typicode.com/todos", newTodo),
    onSuccess: (data) => {
      // Optimistically add the new todo to the cache
      queryClient.setQueryData(["todos"], (old: Todo[] = []) => [data.data, ...old]);
      setTitle("");
    },
    onError: (err) => {
      console.error("Error adding todo:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, completed: false });
  };

  return (
    <Card className="max-w-3xl mx-auto mb-6 p-4 ml-10px">
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <Input
          type="text"
          placeholder="Enter a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Button variant="" size="" type="submit" disabled={isPending} className="bg-indigo-500 cursor-pointer">
          {isPending ? "Adding..." : "Add Todo"}
        </Button>
      </form>
    </Card>
  );
}

export default AddTodo;


