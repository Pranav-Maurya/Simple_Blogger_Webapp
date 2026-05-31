import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function PostDetail() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Fetch post + comments
  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => {
        setPostData(res.data.post);
        setComments(res.data.comments);
      })
      .catch(() => {
        setPostData(null);
      });
  }, [id]);

  // Add new comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/comments/${id}`, { content: comment });
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
      setComment("");
    } catch (err) {
      alert("Please login to comment");
      nav("/login");
    }
  };

  // Delete post
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await API.delete(`/posts/${id}`);
      nav("/");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="page">
      <div className="card main-card">
        {!postData ? (
          <h2>No Blog is Available</h2>
        ) : (
          <>
            <h2>{postData.title}</h2>
            <p className="content">{postData.content}</p>

            <div className="meta">
              <span>By {postData.username}</span>

              {/* Only show Edit/Delete if logged user is owner */}
              {user && user.id === postData.user_id && (
                <>
                  <Link className="btn small" to={`/edit/${postData.id}`}>
                    Edit ✏️
                  </Link>

                  <button className="btn small danger" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
            </div>

            <h3>Comments:</h3>
            {comments.length === 0 ? (
              <p>No Comment Available</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="comment">
                  <strong>{c.username || "Anonymous"}</strong>
                  <p>{c.content}</p>
                </div>
              ))
            )}

            <form className="comment-form" onSubmit={addComment}>
              <input
                placeholder="Enter Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button className="btn" type="submit">
                Add Comment
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
