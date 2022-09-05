import IconComment from "../../img/icon.png";

const Comment = ({ name, email, onClick }) => {
  return (
    <div className="comment" onClick={onClick}>
      <i className="icon-comment">
        <img src={IconComment} alt="" />
      </i>
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Comment;
