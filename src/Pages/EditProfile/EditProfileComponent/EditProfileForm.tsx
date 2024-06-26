import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import { URL } from "src/helpers/constantsAndEnums";
import { PictureDto, UpdateProfilePayload } from "src/services/types";
import { AppDispatch } from "src/store/store";
import { editProfile, uploadAvatar } from "src/store/userSlice";

export default function EditProfileForm() {
  const localUser = JSON.parse(localStorage.getItem("User") || "");
  const avatar = `${URL}${localUser?.profilePictureUrl}`;
  const [profileUpdate, setProfileUpdate] = useState<UpdateProfilePayload>({
    firstName: localUser?.firstName || "",
    lastName: localUser?.lastName || "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(avatar);
  console.log(preview);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        <h2>Edit Profile</h2>
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
        <button className="edit-profile-form__btn" type="submit">
          Save Profile
        </button>
      </Box>

      <Box
        onSubmit={handleAvatarSubmit}
        component="form"
        className="upload-avatar"
      >
        {preview ? (
          <>
            <div className="edit-profile-form__img-wrp">
              <img
                src={preview}
                // style={{ maxWidth: "80%", padding: "10px" }}
                alt="Preview"
              />
              <button
                className="edit-profile-form__btn-remove"
                type="button"
                onClick={handleRemoveImage}
              >
                <ClearIcon />
              </button>
            </div>

            <button className="edit-profile-form__btn" type="submit">
              Save profile image
            </button>
          </>
        ) : (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            size="small"
          >
            Choose file
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
