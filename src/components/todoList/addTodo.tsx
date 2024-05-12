import React, { useContext } from "react";
import { fetchApi } from "../../utils/api";
import { AuthContext } from "../auth/authProvider";
import imageCompression from "browser-image-compression";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>();
  const [date, setDate] = React.useState<Date>();
  const [description, setDescription] = React.useState<string>();
  const [image, setImage] = React.useState<File>();
  const [tags, setTags] = React.useState<string[]>();
  const [imageURL, setImageURL] = React.useState<string>();
  const [compressedImage, setCompressedImage] = React.useState<string>();
  const { user } = useContext(AuthContext);

  async function handleImageUpload(image: File) {
    const imageFile = image;
    const options = {
      maxSizeKB: 1024,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const reader = new FileReader();
      reader.onload = function (event) {
        // @ts-ignore
        const dataUrl = event.target.result;
        // @ts-ignore
        const base64Data = dataUrl.split(",")[1]; // Extract Base64 data from data URL
        setCompressedImage(base64Data);
      };
      reader.readAsDataURL(compressedFile);

      fetchApi("/api/upload", "POST", {
        image: compressedImage,
      }).then(
        ({ success, data }) => {
          if (success) {
            console.log(data);
            // @ts-ignore
            setImageURL(data.url);
          } else {
            console.error("Error:", data);
          }
        },
        (error) => {
          console.error("Error:", error);
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    if (image) {
      handleImageUpload(image).then((r) => console.log(r));
    }

    e.preventDefault();
    fetchApi("/api/todos", "POST", {
      title,
      description,
      status: false,
      due_date: date,
      userId: user?.id,
      image: imageURL,
      tags,
    }).then(
      ({ success, data }) => {
        if (success) {
          // console.log(data);
        } else {
          console.error("Error:", data);
        }
      },
      (error) => {
        console.error("Error:", error);
      },
    );
  };

  return (
    <div className="newTodoFormContainer todoFormInputs">
      <form onSubmit={handleSubmit} className={"addNewTodoForm"}>
        <h2>Create New Todo!</h2>
        <input
          type="text"
          id="title"
          placeholder={"Enter title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <input
          type="date"
          id="date"
          value={date?.toISOString().split("T")[0]}
          onKeyDown={(e) => e.preventDefault()}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <textarea
          placeholder={"Enter description"}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept={"image/*"}
          id="getImage"
          style={{ display: "none" }}
          placeholder={"Upload image"}
          onChange={(e) => setImage(e.target.files![0])}
        />
        <input
          type="text"
          id="tags"
          placeholder={"Enter tags (comma separated)"}
          required={true}
          value={tags?.join(",")}
          onChange={(e) => setTags(e.target.value.split(","))}
        />

        <button
          className={"button"}
          onClick={() => document.getElementById("getImage")?.click()}
        >
          {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
          {image ? "" : "Upload Image"}
        </button>
        <button type="submit" className={"button primary"}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
