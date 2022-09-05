import Comment from "../../components/Comment/Comment";
import FullComment from "../../components/FullComment/FullComment";
import NewComment from "../../components/NewComment/NewComment";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/comments");
        setComments(data);
      } catch (error) {
        setError(true);
      }
    };
    getComments();
  }, []);

  const selectCommentHandler = (id) => {
    setSelectedId(id);
  };

  const postHandler = (e, comment) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/comments", { ...comment, postId: 1 })
      .then((res) => axios.get("http://localhost:3001/comments"))
      .then((res) => setComments(res.data))
      .catch((err) => setError(true));
  };

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:3001/comments/${selectedId}`)
      .then(() => axios.get("http://localhost:3001/comments"))
      .then((res) => {
        setComments(res.data);
        setSelectedId(null);
      })
      .catch((err) => setError(true));
  };

  const renderComments = () => {
    let renderValue = <p>loading ...</p>;

    if (error) renderValue = <p className="error">fetching data failed</p>;

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
          onDelete={deleteHandler}
          comments={comments}
        />
      </section>
      <section>
        <NewComment onAddPost={postHandler} />
      </section>
    </main>
  );
};

export default Discussion;
