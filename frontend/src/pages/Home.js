import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  // truncate content for preview
  const preview = post.content
    ? post.content.length > 220
      ? post.content.slice(0, 220) + "..."
      : post.content
    : "";

  return (
    <div className="post-card" style={{
      background: 'var(--card)',
      borderRadius: 8,
      padding: 24,
      marginBottom: 20,
      boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
      border: '1px solid rgba(0,0,0,0.25)',
      textAlign: 'center'
    }}>
      <h2 style={{ margin: '6px 0 12px' }}>{post.title}</h2>
      <p className="content" style={{ width: '80%', margin: '0 auto 12px' }}>{preview}</p>
      <div>
        <Link to={`/post/${post.id}`} className="btn">View</Link>
      </div>
      <div style={{ fontSize: 12, marginTop: 10, color: '#333' }}>
        By {post.username} • {new Date(post.created_at).toLocaleString()}
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // pagination / load more
  const PAGE_SIZE = 5;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    API.get("/posts")
      .then((res) => {
        setPosts(res.data || []);
      })
      .catch((err) => {
        console.error("Failed fetching posts", err);
        setError("Failed to fetch posts");
      });
  }, []);

  // show nothing message
  if (error) {
    return (
      <div className="page">
        <div className="card main-card">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="page">
        <div className="card main-card">
          <h2>No Blog is Available</h2>
          <p>.....</p>
        </div>
      </div>
    );
  }

  // posts already sorted latest-first by the backend; but if you want to be sure:
  const sorted = posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const visible = sorted.slice(0, visibleCount);

  return (
    <div className="page" style={{ paddingBottom: 60 }}>
      <div style={{ width: '90%', margin: '0 auto', maxWidth: 1000 }}>
        {/* List of posts */}
        {visible.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

        {/* Load more button when there are more posts */}
        {visibleCount < sorted.length && (
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button
              className="btn"
              onClick={() => setVisibleCount((c) => Math.min(sorted.length, c + PAGE_SIZE))}
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {/* Floating add post button */}
      <Link to="/write" className="add-post-btn">Add New Post ✎</Link>
    </div>
  );
}
