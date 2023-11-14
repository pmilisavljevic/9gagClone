import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { submitPost } from "src/store/postsSlice";
import { AppDispatch } from "src/store/store";
import { PostDto } from "src/services/client";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const formData: PostDto = {
    title,
    content,
    image,
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submitPost(formData)).then((resultObject) => {
      if (resultObject.meta.requestStatus === "fulfilled") {
        navigate("/");
      } else {
        throw new Error("Failed to post");
      }
    });
  };

  return (
    <Box onSubmit={handleSubmit} component="form" className="post-form">
      <Typography component="h1" variant="h5">
        Create Post
      </Typography>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        fullWidth
        id="content"
        name="content"
        label="Content"
        value={content}
        onChange={handleContentChange}
      />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
      {preview && (
        <>
          <img
            src={preview}
            style={{ maxWidth: "100%", padding: "10px" }}
            alt="Preview"
          />
          <button type="submit">Submit Post</button>
          <button type="button" onClick={handleRemoveImage}>
            Remove Image
          </button>
        </>
      )}
    </Box>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="title">Title:</label>
    //     <input
    //       type="text"
    //       id="title"
    //       value={title}
    //       onChange={handleTitleChange}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="image">Image:</label>
    //     <input
    //       type="file"
    //       id="image"
    //       accept="image/*"
    //       onChange={handleImageChange}
    //     />
    //     {preview && (
    //       <>
    //         <img
    //           src={preview}
    //           style={{ maxWidth: "100%", padding: "20px" }}
    //           alt="Preview"
    //         />
    //         <button type="button" onClick={handleRemoveImage}>
    //           Remove Image
    //         </button>
    //       </>
    //     )}
    //   </div>
    //   <button type="submit">Submit Post</button>
    // </form>
  );
}

export default PostForm;
