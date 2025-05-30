import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const addTodo = () => {
    if (!title || !description || !category) return;
    const newTodo = {
      id: Date.now(),
      title,
      description,
      category,
      completed: false,
      date: new Date().toLocaleString(), // ✅ Add date here
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
    setCategory("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center py-6 bg-blue-100 px-4">
        <h1 className="text-3xl font-bold">Todo List</h1>

        <div className="mt-4 flex flex-col gap-2 w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto self-center"
          >
            Create Task
          </button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`p-4 rounded shadow border-t-4 relative transition-opacity duration-300 ${
              todo.completed ? "opacity-50" : "opacity-100"
            } ${
              todo.category === "React"
                ? "border-blue-500"
                : todo.category === "Python"
                ? "border-yellow-500"
                : todo.category === "Maths"
                ? "border-green-500"
                : todo.category === "Science"
                ? "border-red-400"
                : todo.category === "JS"
                ? "border-orange-400"
                : todo.category === "Project"
                ? "border-pink-400"
                : "border-purple-400"
            }`}
          >
            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="px-2 py-1 text-sm font-semibold bg-gray-200 rounded">
                {todo.category}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  title="Mark as done"
                />
                {todo.completed && (
                  <span className="text-xs text-green-600 font-semibold">
                    Completed
                  </span>
                )}
              </div>
            </div>
            <h2 className="font-bold text-lg mb-1 break-words">{todo.title}</h2>
            <p className="text-gray-700 mb-1 break-words">{todo.description}</p>
            <p className="text-gray-500 text-sm mb-3">📅 {todo.date}</p> {/* ✅ Date display */}
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:text-red-800"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
