import React from "react";
import { ToDoInterface } from "./index";
import { fetchApi } from "../../utils/api";

const TodoItem = ({
  id,
  title,
  description,
  status,
  due_date,
  image,
  tags,
}: ToDoInterface) => {
  const [todo, setTodo] = React.useState<ToDoInterface>({
    id,
    title,
    image,
    tags,
    due_date,
    status,
    description,
  });
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [editedTodo, setEditedTodo] = React.useState<ToDoInterface>({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
    due_date: todo.due_date,
    image: todo.image,
    tags: todo.tags,
  });

  const handleDelete = () => {
    console.log("Todo Deleted");
    fetchApi(`/api/todos/${todo.id}`, "DELETE")
      .then(({ success, data }) => {
        if (success) {
          console.log(data);
          window.location.reload();
        } else {
          console.error("Error:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .then(() => window.location.reload());
  };

  const handleComplete = () => {
    setTodo({
      ...todo,
      status: !todo.status,
    });
    console.log("Todo Completed");
  };

  const handleEdit = () => {
    setTodo(editedTodo);
    console.log("Todo Edited");
    editMode && setEditMode(false);
  };

  return editMode ? (
    <li className="todo-box">
      <div className="title">
        <label className="ratio-container">
          <input
            type="checkbox"
            checked={todo.status}
            onChange={handleComplete}
          />
          <span className="checkmark"></span>
        </label>
        <input
          type="checkbox"
          checked={todo.status}
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
          placeholder={"Enter title"}
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

      <div className={"flex flex-col w-full gap-4 pt-4"}>
        <span className={"grid grid-cols-2 gap-4 w-full"}>
          <input
            type={"date"}
            value={editedTodo.due_date}
            onChange={(e) =>
              setEditedTodo({
                ...editedTodo,
                due_date: e.target.value,
              })
            }
          />
          <input
            type={"file"}
            accept={"image/*"}
            value={editedTodo.image}
            onChange={(e) =>
              setEditedTodo({
                ...editedTodo,
                image: e.target.value,
              })
            }
          />
        </span>
        <textarea
          value={editedTodo.tags?.join(",")}
          onChange={(e) =>
            setEditedTodo({
              ...editedTodo,
              tags: e.target.value.split(","),
            })
          }
          placeholder={"Enter tags (comma separated)"}
        />
        <textarea
          value={editedTodo.description}
          onChange={(e) =>
            setEditedTodo({
              ...editedTodo,
              description: e.target.value,
            })
          }
          placeholder={"Enter description"}
        />
      </div>
    </li>
  ) : (
    <li className="todo-box">
      <div className="title">
        <label className="ratio-container">
          <input
            type="checkbox"
            checked={todo.status}
            onChange={handleComplete}
          />
          <span className="checkmark"></span>
        </label>
        <input
          type="checkbox"
          checked={todo.status}
          onChange={handleComplete}
        />
        <h2>
          {todo.title}{" "}
          {todo.due_date &&
            `- ${todo.due_date?.toString().split("T")[0].split("-").reverse().join(".")}`}
        </h2>

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
      <div
        className="
      mt-2 flex flex-wrap gap-2 w-full
      "
      >
        {todo.tags?.map((tag, index) => (
          <span key={index} className={"tag"}>
            {tag}
          </span>
        ))}
      </div>

      <span className={"grid grid-cols-3 gap-4 w-full"}>
        {todo.image && (
          <img src={todo.image} alt={todo.title} className={"w-full"} />
        )}
        <p className="desciption">{todo.description}</p>
      </span>
    </li>
  );
};

export default TodoItem;
