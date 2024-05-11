import React from "react";
import { ToDoInterface } from "./index";

const TodoItem = ({ title, description, completed }: ToDoInterface) => {
  const [todo, setTodo] = React.useState<ToDoInterface>({
    title: title,
    description: description,
    completed: completed,
  });
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [editedTodo, setEditedTodo] = React.useState<ToDoInterface>({
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  });

  const handleDelete = () => {
    console.log("Todo Deleted");
  };

  const handleComplete = () => {
    setTodo({
      ...todo,
      completed: !todo.completed,
    });
    console.log("Todo Completed");
  };

  const handleEdit = () => {
    setTodo(editedTodo);
    console.log("Todo Edited");
    editMode && setEditMode(false);
  };

  return editMode ? (
    <li className="todo-box edit">
      <div className="title">
        <label className="ratio-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleComplete}
          />
          <span className="checkmark"></span>
        </label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleComplete}
        />
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) =>
            setEditedTodo({
              ...editedTodo,
              title: e.target.value,
            })
          }
        />
        <button className={"button primary"} onClick={handleEdit}>
          Save
        </button>
        <button
          className={"button secondary"}
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </div>
      <textarea
        value={editedTodo.description}
        onChange={(e) =>
          setEditedTodo({
            ...editedTodo,
            description: e.target.value,
          })
        }
      ></textarea>
    </li>
  ) : (
    <li className="todo-box">
      <div className="title">
        <label className="ratio-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleComplete}
          />
          <span className="checkmark"></span>
        </label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleComplete}
        />
        <h2>{todo.title}</h2>
        <button
          className={"button secondary"}
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <button className={"button secondary"} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <p className="desciption">{todo.description}</p>
    </li>
  );
};

export default TodoItem;
