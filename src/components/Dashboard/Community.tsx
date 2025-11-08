import { useState } from "react";

interface Post {
  id: number;
  name: string;
  message: string;
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState("");

  const handlePost = () => {
    if (!message.trim()) return;
    setPosts([{ id: Date.now(), name: "You", message }, ...posts]);
    setMessage("");
  };

  return (
    <div className="dashboard-box">
      <h2 className="title">Community Feed</h2>
      <textarea
        placeholder="Share your farm update..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="analyze-btn" onClick={handlePost}>Post</button>

      <div className="result-box">
        {posts.map((p) => (
          <p key={p.id}><b>{p.name}:</b> {p.message}</p>
        ))}
      </div>
    </div>
  );
}
