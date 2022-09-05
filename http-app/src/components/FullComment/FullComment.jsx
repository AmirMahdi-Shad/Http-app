import IconComment from "../../img/icon.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FullComment = ({ commentId, onDelete, comments }) => {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (commentId)
      axios
        .get(`http://localhost:3001/comments/${commentId}`)
        .then((res) => setComment(res.data))
        .catch((err) => console.log(err));

    if (!commentId) setComment(null);
  }, [commentId, comments]);

  let commentDetail = (
    <div className="full-comment">
      <p> please select a comment</p>
    </div>
  );
  if (commentId) commentDetail = <p> loading ... </p>;

  if (comment)
    commentDetail = (
      <div className="full-comment">
        <div className="full-comment-top">
          <i className="icon-comment">
            <img src={IconComment} alt="" />
          </i>
          <div>
            <p>{comment.name}</p>
            <p>{comment.email}</p>
          </div>
        </div>
        <p className="full-comment-content">{comment.body}</p>
        <button className="full-comment--remove" onClick={onDelete}>
          delete
        </button>
      </div>
    );
  return commentDetail;
};

export default FullComment;
