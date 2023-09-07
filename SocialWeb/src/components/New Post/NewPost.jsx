import { useState } from "react";
import { createPostAPI } from "../../utils/api";
import "./newPost.scss";

export default function NewPost({ reloadChanges }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createPostAPI(content)
      .then(() => {
        setContent("");
        reloadChanges();
        alert("Posted");
      })
      .catch((err) => console.log("Error while Posting Post" + err));
  };

  return (
    <div className="newPost">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="content"
          value={content}
          minLength={1}
          onChange={(event) => setContent(event.target.value)}
          required
          placeholder="New Post..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
