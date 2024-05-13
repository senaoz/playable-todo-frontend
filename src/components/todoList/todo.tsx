import React, { useState, useEffect } from "react";
import { ToDoInterface } from "./index";
import { fetchApi } from "../../utils/api";
import imageCompression from "browser-image-compression";

const TodoItem = ({
  id,
  title,
  description,
  status,
  due_date,
  image,
  tags,
}: ToDoInterface) => {
  const [todo, setTodo] = useState<ToDoInterface>({
    id,
    title,
    image,
    tags,
    due_date,
    status,
    description,
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<ToDoInterface>({ ...todo });
  const [updatedImage, setUpdatedImage] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();
  const [base64Image, setBase64Image] = useState<string>();

  useEffect(() => {
    if (updatedImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      imageCompression(updatedImage, options)
        .then((compressedImage) => {
          const reader = new FileReader();
          reader.onload = () => {
            // @ts-ignore
            setBase64Image(reader.result.split(",")[1]);
          };
          reader.readAsDataURL(compressedImage);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      if (base64Image) {
        fetchApi("/api/upload", "POST", {
          image: base64Image,
        })
          .then((data) => {
            // @ts-ignore
            setImageURL(data.data.url);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      setEditedTodo((prevState) => ({
        ...prevState,
        image: imageURL,
      }));
    }
  }, [updatedImage, base64Image]);

  const handleDelete = async () => {
    try {
      const { success, data } = await fetchApi(
        `/api/todos/${todo.id}`,
        "DELETE",
      );
      if (success) {
        console.log(data);
        window.location.reload();
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleComplete = async () => {
    const newStatus = !todo.status;
    setTodo({
      ...todo,
      status: newStatus,
    });

    try {
      const { success, data } = await fetchApi(`/api/todos/${todo.id}`, "PUT", {
        ...todo,
        status: newStatus,
      });
      if (!success) {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const { success, data } = await fetchApi(
        `/api/todos/${todo.id}`,
        "PUT",
        editedTodo,
      );
      if (!success) {
        console.error("Error:", data);
      } else {
        setTodo(editedTodo);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setEditMode(false);
  };

  const handleDownload = (imageURL: string) => {
    fetch(imageURL)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
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
            value={editedTodo.due_date?.split("T")[0]}
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
            onChange={(e) => setUpdatedImage(e.target.files![0])}
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
        <h2>
          {todo.title}{" "}
          {todo.due_date &&
            `- ${todo.due_date
              .toString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join(".")}`}
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
      <div className={"mt-2 flex flex-wrap gap-2 w-full"}>
        {todo.tags?.map((tag, index) => (
          <span key={index} className={"tag"}>
            {tag}
          </span>
        ))}
      </div>

      <span className={"flex w-full"}>
        {todo.image && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_URL || "http://localhost:8080"}${todo.image}`}
              alt={todo.title}
              className={"w-full max-w-48 m-0 pr-4 pt-4"}
            />
            <button
              onClick={() =>
                handleDownload(
                  `${process.env.REACT_APP_API_URL || "http://localhost:8080"}${todo.image}`,
                )
              }
              className={"mt-4 button text-sm"}
            >
              Download 📸
            </button>
          </div>
        )}
        <p className="desciption grow">{todo.description}</p>
      </span>
    </li>
  );
};

export default TodoItem;
