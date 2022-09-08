import Comment from "../../components/Comment/Comment";
import FullComment from "../../components/FullComment/FullComment";
import NewComment from "../../components/NewComment/NewComment";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllComments } from "../../services/getAllCommentService";
import { postComment } from "../../services/postComment";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await getAllComments();
        setComments(data);
      } catch (error) {
        setError(true);
      }
    };
    getComments();
  }, [comments]);

  const selectCommentHandler = (id) => {
    setSelectedId(id);
  };

  const postHandler = async (e, comment, setComment) => {
    e.preventDefault();
    try {
      await postComment({
        ...comment,
        postId: 1,
      });
      const { data } = await getAllComments();
      setComments(data);
      setComment({ name: "", email: "", body: "" });
      toast.success("Comment added successfully", {
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

  const renderComments = () => {
    let renderValue = <p>loading ...</p>;

    if (error) {
      renderValue = <p className="error">fetching data failed</p>;
      toast.error("fetching Error", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }

    if (comments && !error)
      renderValue = comments.map((c) => (
        <Comment
          key={c.id}
          name={c.name}
          email={c.email}
          body={c.body}
          onClick={() => selectCommentHandler(c.id)}
        />
      ));
    return renderValue;
  };

  return (
    <main className="discussion">
      <section className="comment-container">{renderComments()}</section>
      <section>
        <FullComment
          commentId={selectedId}
          comments={comments}
          setComments={setComments}
          setError={setError}
          setSelectedId={setSelectedId}
        />
      </section>
      <section>
        <NewComment onAddPost={postHandler} />
      </section>
    </main>
  );
};

export default Discussion;
