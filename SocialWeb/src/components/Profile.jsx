import { useEffect, useState } from "react";
import {
  addFollowingAPI,
  getUserDataAPI,
  removeFollowingAPI,
} from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import Post from "./Post/Post";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user_id } = useParams();
  const [userData, setUserData] = useState();
  const [followed, setFollowed] = useState();
  const { userInfo } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user_id == userInfo.id) navigate("/profile");
    async function getTimeline() {
      await getUserDataAPI(user_id)
        .then((res) => {
          setUserData(res.data.result);
          setFollowed(res.data.result[0].is_following == 1);
        })
        .catch((err) => {
          console.error(err.response.data.message);
        });
    }
    getTimeline();
  }, [navigate, userInfo.id, user_id]);

  const handleRemoveFollowing = async (event) => {
    event.preventDefault();
    await removeFollowingAPI(user_id)
      .then(() => setFollowed(false))
      .catch((err) => console.error(err));
  };
  const handleAddFollowing = async (event) => {
    event.preventDefault();
    await addFollowingAPI(user_id)
      .then(() => setFollowed(true))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {userData && (
        <>
          <p>{userData[0].username}</p>
          <p>{userData[0].email}</p>
          <button
            style={
              followed
                ? { backgroundColor: "#000" }
                : { border: "1px solid #e12ff3" }
            }
            onClick={followed ? handleRemoveFollowing : handleAddFollowing}
          >
            {followed ? "Followed" : "Follow"}
          </button>
          {userData.map((item, index) => (
            <Post key={index} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
