import { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import { getFollowFeedAPI } from "../../utils/api";

export default function FollowFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const getFollowFeed = async () => {
      await getFollowFeedAPI()
        .then((res) => {
          setFeed(res.data.result);
        })
        .catch((err) => console.log(err.response));
    };
    getFollowFeed();
  }, []);

  return (
    <main>
      <h1>Follow Feed</h1>
      <div className="feedWrap">
        {feed &&
          feed.length != 0 &&
          feed[0].content &&
          feed.map((item, index) => <Post key={index} item={item} />)}
      </div>
    </main>
  );
}
