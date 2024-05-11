import React from "react";
import "./list.scss";
import TodoItem from "./todo";
import AddTodoForm from "./addTodo";

export interface ToDoInterface {
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState<ToDoInterface[]>([]);
  const [addMode, setAddMode] = React.useState<boolean>(false);

  return (
    <div>
      <h2>Todo List</h2>
      <div className="todo-buttons">
        <button
          className={"button primary"}
          onClick={() => setAddMode(!addMode)}
        >
          {addMode ? "Close" : "Add"}
        </button>
        <button className={"button secondary"}>Complete All</button>
        <button className={"button secondary"}>Delete All</button>
      </div>

      {addMode && <AddTodoForm />}

      <ul>
        <TodoItem title="Title" description="Todo" completed={false} />
      </ul>
    </div>
  );
};

export default TodoList;
