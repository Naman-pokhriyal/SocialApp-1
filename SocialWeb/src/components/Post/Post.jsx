import { deletePostAPI } from "../../utils/api";
import "./post.scss";

export default function Post({ item, owner, reloadChanges }) {
  const { index, id, user_id, username, content, created_at } = item;

  // Time Formatting
  const jsDate = new Date(created_at);
  var formattedDateTime = jsDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  formattedDateTime = formattedDateTime.replace("at", " ");

  const handleDeletePost = (event) => {
    event.preventDefault();
    deletePostAPI(id)
      .then(() => {
        reloadChanges();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="postWrap" key={index}>
      <div className="post-header-content">
        <div className="post-header">
          <a href={`/profile/${user_id}`} className="post-username">
            <img
              className="post-dp"
              src="https://namandev.netlify.app/static/media/DPNaman.40b98135e7da1d116438.png"
            />
            {username}
          </a>
          <div className="post-time">{formattedDateTime}</div>
        </div>
        <div className="post-content">{content}</div>
      </div>
      {owner && (
        <button className="deleteButton" onClick={handleDeletePost}>
          X
        </button>
      )}
    </div>
  );
}
