import IconComment from "../../img/icon.png";
import React, { useEffect, useState } from "react";
import { getAllComments } from "../../services/getAllCommentService";
import { deleteComment } from "../../services/deleteComment";
import { getCommentById } from "../../services/getCommentByID";
import { toast } from "react-toastify";

const FullComment = ({
  commentId,
  comments,
  setComments,
  setError,
  setSelectedId,
}) => {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (commentId)
      getCommentById(commentId)
        .then((res) => setComment(res.data))
        .catch((err) => console.log(err));

    if (!commentId) setComment(null);
  }, [commentId, comments]);

  const deleteHandler = async () => {
    try {
      await deleteComment(commentId);
      const { data } = await getAllComments();
      setComments(data);
      setComment(null);
      setSelectedId(null);
      toast.warning("Comment Deleted!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError(true);
    }
  };

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
        <button className="full-comment--remove" onClick={deleteHandler}>
          delete
        </button>
      </div>
    );
  return commentDetail;
};

export default FullComment;
