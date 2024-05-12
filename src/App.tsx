import React from "react";
import TodoList from "./components/todoList";
import { useProtectedRoute } from "./components/auth";

const ProtectedToDos: React.FC = () => {
  useProtectedRoute();

  return (
    <div>
      <TodoList />
    </div>
  );
};

export default ProtectedToDos;
