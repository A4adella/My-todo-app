import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Todo ={
  id: number,
  title: string,
  completed: boolean,
  userId: number
}

function EditTodoModal({ editingTodo, onClose }: { editingTodo: Todo | null; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setCompleted(editingTodo.completed);
      setError(""); // Reset any previous error
    }
  }, [editingTodo]);

  const updateTodo = useMutation({
    mutationFn: (updatedTodo: Todo) =>
      axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    },
  });

  const handleUpdate = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (editingTodo) {
      updateTodo.mutate({
        ...editingTodo,
        title,
        completed,
      });
    }
  };

  return (
    <Dialog open={!!editingTodo} onOpenChange={onClose}>
      <DialogContent className="content">
        <DialogHeader className="header">
          <DialogTitle className="title">Edit Todo</DialogTitle>
          <DialogDescription className="description">Change Todo details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Edit title"
              aria-invalid={!!error}
            />
            {error && (
              <p className="text-sm text-red-500 mt-1" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
            className="checkbox"
              checked={completed}
              onCheckedChange={(val) => setCompleted(Boolean(val))}
              id="completed"
            />
            <label htmlFor="completed" className="text-sm">
              Mark as completed
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button className="button" size="normal" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button  variant="outline" size="normal" onClick={handleUpdate} disabled={updateTodo.isPending} className="bg-indigo-500 cursor-pointer">
              {updateTodo.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditTodoModal;

