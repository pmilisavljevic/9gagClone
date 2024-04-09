import { Box, Button, TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { submitPost } from "src/store/postsSlice";
import { AppDispatch } from "src/store/store";

import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { PostDto } from "src/services/types";

export default function PostForm() {
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
      <h2>Create Post</h2>
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
        Choose file
        <VisuallyHiddenInput
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
      {preview && (
        <>
          <div className="post-form__img-wrp">
            <img
              src={preview}
              // style={{ maxWidth: "80%", padding: "10px" }}
              alt="Preview"
            />
            <button
              className="post-form__btn-remove"
              type="button"
              onClick={handleRemoveImage}
            >
              <ClearIcon />
            </button>
          </div>

          <button className="post-form__btn" type="submit">
            Submit Post
          </button>
        </>
      )}
    </Box>
  );
}
