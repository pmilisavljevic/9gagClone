import { useState, ChangeEvent, FormEvent } from "react";
import { PictureDto, UpdateProfilePayload } from "src/services/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";
import { editProfile, uploadAvatar } from "src/store/userSlice";

function EditProfileForm() {
  const localUser = JSON.parse(localStorage.getItem("User") || "");
  const [profileUpdate, setProfileUpdate] = useState<UpdateProfilePayload>({
    firstName: localUser?.firstName || "",
    lastName: localUser?.lastName || "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  //   console.log(image);

  const dispatch = useDispatch<AppDispatch>();

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

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setProfileUpdate({
      ...profileUpdate,
      [name]: e.target.value,
    });
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleEditProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(editProfile(profileUpdate));
  };

  const file = image;
  const formData: PictureDto = {
    file,
  };

  const handleAvatarSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(uploadAvatar(formData));
  };

  return (
    <>
      <Box
        onSubmit={handleEditProfileSubmit}
        component="form"
        className="edit-profile-form"
      >
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={profileUpdate.firstName}
          onChange={handleOnChange}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={profileUpdate.lastName}
          onChange={handleOnChange}
        />
        <button type="submit">Save Profile</button>
      </Box>

      <Box onSubmit={handleAvatarSubmit} component="form">
        {preview ? (
          <>
            <img
              src={preview}
              style={{ maxWidth: "100%", padding: "10px" }}
              alt="Preview"
            />
            <button type="button" onClick={handleRemoveImage}>
              Remove Image
            </button>
            <button type="submit">Save profile image</button>
          </>
        ) : (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            size="small"
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        )}
      </Box>
    </>
  );
}

export default EditProfileForm;
