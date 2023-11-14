import NavBar from "src/Layout/NavBar";

import EditProfileForm from "./EditProfileForm";

function EditProfile() {
  return (
    <>
      <NavBar />
      <div className="edit-profile">
        <EditProfileForm />
      </div>
    </>
  );
}

export default EditProfile;
