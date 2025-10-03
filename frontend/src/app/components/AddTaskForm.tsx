// src/components/AddTaskForm.tsx

import { useState } from "react";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  // 'useState' is a React Hook. It lets us add a "state variable" to a component.
  // 'newTastTitle' will hold the text the user types into the input.
  // 'setNewTaskTitle' is the function we use to update that text.
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the browser from reloading the page on form submission
    if (newTaskTitle.trim()) { // Check if the input is not just empty spaces
      onAddTask(newTaskTitle.trim());
      setNewTaskTitle(""); // Clear the input field after submitting
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Add a new task..."
        className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
      />
    </form>
  );
}