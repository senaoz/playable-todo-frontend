import React, { useContext, useState, useEffect } from "react";
import { fetchApi } from "../../utils/api";
import { AuthContext } from "../auth/authProvider";
import imageCompression from "browser-image-compression";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [tags, setTags] = useState<string[]>([]);
  const [base64Image, setBase64Image] = useState<string>();
  const [imageURL, setImageURL] = useState<string>();
  const { user } = useContext(AuthContext);

  // compress image before uploading (and then convert it to base64 to display it in the form)
  // and then post /api/upload and get the url from the result of this post request, to be saved in the database as a string in the todo object

  useEffect(() => {
    if (image) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      imageCompression(image, options)
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
    }
  }, [image, base64Image]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetchApi("/api/todos", "POST", {
      title,
      date,
      description,
      image: imageURL,
      tags,
      userId: user?.id,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="newTodoFormContainer todoFormInputs">
      <form onSubmit={handleSubmit} className="addNewTodoForm">
        <h2>Create New Todo!</h2>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          id="date"
          value={date?.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <textarea
          placeholder="Enter description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          id="getImage"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files?.[0])}
          required
        />
        <input
          type="text"
          id="tags"
          placeholder="Enter tags (comma separated)"
          value={tags.join(",")}
          onChange={(e) => setTags(e.target.value.split(","))}
          required
        />

        <button
          className="button"
          onClick={() => document.getElementById("getImage")?.click()}
        >
          {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
          {image ? "" : "Upload Image"}
        </button>
        <button type="submit" className="button primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
