import { useEffect, useState } from "react";
import { getAllFeedAPI } from "../../utils/api";
import Post from "../../components/Post/Post";
import NewPost from "../../components/New Post/NewPost";
import "./feed.scss";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const getAllFeed = async () => {
      await getAllFeedAPI()
        .then((res) => {
          setFeed(res.data.result);
        })
        .catch((err) => console.log(err.response));
    };
    getAllFeed();
  }, [reload]);
  return (
    <main>
      <NewPost reloadChanges={() => setReload(!reload)} />
      <div>
        <h1>Feed Page</h1>
        <div className="feedWrap">
          {feed &&
            feed.length != 0 &&
            feed[0].content &&
            feed.map((item, index) => <Post key={index} item={item} />)}
        </div>
      </div>
    </main>
  );
}
