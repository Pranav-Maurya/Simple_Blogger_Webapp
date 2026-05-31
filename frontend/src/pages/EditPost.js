import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    // fetch post data to prefill the form
    API.get(`/posts/${id}`)
      .then((res) => {
        if (res.data && res.data.post) {
          setTitle(res.data.post.title || "");
          setContent(res.data.post.content || "");
        } else {
          setTitle("");
          setContent("");
        }
      })
      .catch(() => {
        alert("Could not load post data.");
      });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, { title, content });
      nav(`/post/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating post");
    }
  };

  return (
    <div className="page">
      <div className="card main-card">
        <h2>Edit Post</h2>
        <form onSubmit={submit} className="form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            placeholder="Write your post..."
            required
          />
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
