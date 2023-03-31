import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "bootstrap";

const UserComments = ({
  blog,
  userId,
  user,
  comments,
  setComments,
  name,
  body,
  createdAt,
  msg,
}) => {
  const { id } = useParams();

  useEffect(() => {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const deleteComment = async (createdAt) => {
    const filteredComments = comments.filter((comment) => {
      return comment.createdAt !== createdAt;
    });
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments: filteredComments,
      timestamp: serverTimestamp(),
    });
    setComments(filteredComments);
    toast.success("Comment Delete successfully");
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="comments-list">
            <div className="media">
              {msg ? (
                <h4 className="mt-5">{msg}</h4>
              ) : (
                <>
                  <div className="media-left">
                    <img
                      src="https://res.cloudinary.com/daxmjqsy2/image/upload/v1680174784/avatar_pbxti9.png"
                      alt="user"
                      className="rounded-circle"
                      style={{
                        width: "45px",
                        height: "45px",
                      }}
                    />
                  </div>
                  <div className="d-flex gap-4">
                    <div className="media-body">
                      <h3 className="text-start media-heading user_name">
                        {name}{" "}
                        <small>{createdAt.toDate().toDateString()}</small>
                      </h3>
                      <p className="text-start">{body}</p>
                    </div>
                    <div>
                      {user && user.uid === userId && (
                        <button
                          className="btn-delete"
                          type="button"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete"
                          onClick={() => deleteComment(createdAt)}
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComments;
