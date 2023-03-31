import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CommentBox = ({ userId, userComment, setUserComment, handleComment }) => {
  const navigate = useNavigate();
  return (
    <>
      <form className="row blog-form">
        <div className="col-12 py-3">
          <textarea
            rows="4"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="form-control description"
          />
        </div>
      </form>
      {!userId ? (
        <>
          <h5>Please login or Create an account to post comment</h5>
          <button
            className="btn btn-success"
            onClick={() => {
              navigate("/auth");
              toast.warning("Please Login to Comment on this post");
            }}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleComment}
          >
            Post Comment
          </button>
        </>
      )}
    </>
  );
};

export default CommentBox;
