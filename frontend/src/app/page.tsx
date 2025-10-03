// src/app/page.tsx

"use client";

import { useState, useEffect } from "react"; // 1. Import useEffect
import TaskItem, { Task } from "./components/TaskItem";
import AddTaskForm from "./components/AddTaskForm";

export default function Home() {
  // Start with an empty array. The data will be loaded from the API.
  const [tasks, setTasks] = useState<Task[]>([]);

  // 2. useEffect hook to fetch data when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks); // Update state with tasks from the database
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); // The empty array [] means this effect runs only once when the component mounts

  const handleAddTask = async (title: string) => {
    // ... (This function remains unchanged)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title }),
      });
      if (!response.ok) throw new Error("Failed to create task");
      const data = await response.json();
      setTasks([data.task, ...tasks]);
    } catch (error) {
      console.error("There was an error creating the task:", error);
    }
  };

  return (
    // ... (The JSX part of your component remains unchanged)
    <main className="bg-gray-900 min-h-screen">
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Seyalio</h1>
          <p className="text-lg mt-2 text-gray-400">Your smart task manager.</p>
        </div>
        <div className="mt-8">
          <AddTaskForm onAddTask={handleAddTask} />
        </div>
        <div className="mt-8 space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}