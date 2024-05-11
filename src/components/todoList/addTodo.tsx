import React from "react";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [image, setImage] = React.useState<File>();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image as Blob);

    fetch("/api/todos", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="newTodoFormContainer edit">
      <form onSubmit={handleSubmit} className={"addNewTodoForm"}>
        <h2>Create New Todo!</h2>
        <input
          type="text"
          id="title"
          placeholder={"Enter title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder={"Enter description"}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files![0])}
        />
        <button type="submit" className={"button primary"}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
