import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/posts", { title, content });
      nav(`/post/${data.id}`);
    } catch (err) {
      // If user not logged in, backend will return 401/403
      alert(err.response?.data?.message || "Error creating post. Make sure you're logged in.");
    }
  };

  return (
    <div className="page">
      <div className="card main-card">
        <h2>Write Blog</h2>
        <form className="form" onSubmit={submit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            rows="8"
            required
          />
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
