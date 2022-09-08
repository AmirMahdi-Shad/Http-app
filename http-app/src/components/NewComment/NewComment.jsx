import React, { useState } from "react";

const NewComment = ({ onAddPost }) => {
  const [comment, setComment] = useState({ name: "", email: "", body: "" });

  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="form-newComment"
      onSubmit={(e) => onAddPost(e, comment, setComment)}
    >
      <h1>Add New comment</h1>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={comment.name}
        onChange={(e) => changeHandler(e)}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={comment.email}
        onChange={(e) => changeHandler(e)}
      />
      <textarea
        name="body"
        value={comment.body}
        onChange={(e) => changeHandler(e)}
        type="text"
        placeholder="Your Comment"
        className="comment-form-content"
      />
      <button type="submit" class="btn btn-primary">
        Add New Comment
      </button>
    </form>
  );
};

export default NewComment;
