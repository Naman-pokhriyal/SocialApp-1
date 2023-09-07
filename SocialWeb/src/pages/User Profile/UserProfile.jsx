import { useAuth } from "../../context/AuthContext";
import { getProfileAPI, logoutAPI } from "../../utils/api";
import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./userProfile.scss";
import EditProfileModal from "../../components/Edit Profile/EditProfileModal";

export default function Profile() {
  const { userInfo, logout } = useAuth();
  const [timeline, setTimeline] = useState();
  const [reload, setReload] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    async function getTimeline() {
      await getProfileAPI()
        .then((res) => {
          setTimeline(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTimeline();
  }, [reload]);

  const HandleLogout = async () => {
    const res = await logoutAPI();
    if (res.status == 200) logout();
  };

  return (
    <main className="user-profile">
      <h2>Profile Page</h2>
      <button onClick={HandleLogout}>Logout</button>
      <button onClick={handleEditModal}>Edit Profile</button>

      <div className="user-data">
        <img src={userInfo.dp} />
        <p>User: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
        <div className="posts-data">
          {timeline &&
            timeline[0].content &&
            timeline.map((item, index) => (
              <Post
                key={index}
                item={item}
                owner
                reloadChanges={() => setReload(!reload)}
              />
            ))}
        </div>
      </div>
      {isEditModalOpen && (
        <EditProfileModal onClose={handleCloseEditModal} userInfo={userInfo} />
      )}
    </main>
  );
}
