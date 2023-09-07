import { useState } from "react";
import { uppdateUserAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

function EditProfileModal({ onClose, userInfo }) {
  const { login } = useAuth();
  const [newUserInfo, setNewUserInfo] = useState({
    id: userInfo.id,
    username: userInfo.username,
    email: userInfo.email,
    dp: userInfo.dp || "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append the selected image to the form data (if it's not null)
    const formData = new FormData();
    formData.append("username", newUserInfo.username);
    formData.append("email", newUserInfo.email);
    if (selectedImage) formData.append("dp", selectedImage);
    console.log(formData);
    await uppdateUserAPI(formData)
      .then((res) => {
        // login(res);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={`edit-profile-modal`}>
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={newUserInfo.username}
              onChange={(e) =>
                setNewUserInfo({
                  ...newUserInfo,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
          </label>
          <label>
            Display Image:
            <input
              type="file"
              accept="image/*"
              name="dp"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </label>

          <button type="submit">Save</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EditProfileModal;
