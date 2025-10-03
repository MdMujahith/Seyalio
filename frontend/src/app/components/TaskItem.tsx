// src/components/TaskItem.tsx

// First, we define what a Task looks like using a TypeScript interface.
// This ensures that any data we pass to this component has the correct shape.
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Next, we define the props for our component.
// It will receive a single prop called 'task' which must match the Task interface.
interface TaskItemProps {
  task: Task;
}

// This is our React component. It's a function that returns HTML (JSX).
// It takes the 'task' prop as an argument.
export default function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between shadow-md">
      <div className="flex items-center">
        {/* A simple checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          readOnly // We'll make this interactive later
          className="h-6 w-6 rounded-full accent-pink-500"
        />
        {/* The task title */}
        <span className="ml-4 text-lg text-gray-200">{task.title}</span>
      </div>
      {/* A placeholder for action buttons like delete or edit */}
      <button className="text-gray-400 hover:text-white">...</button>
    </div>
  );
}