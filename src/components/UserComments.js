import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";
import { UserInfo } from "../context/UserInfoContext";
import userProfile from "../assets/avatar.png";

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
  const { imageAsset, userName } = UserInfo();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      delete
    </Tooltip>
  );

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
    toast.success("Comment Deleted successfully");
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
                      src={`${
                        user && userId === user.uid ? imageAsset : userProfile
                      }`}
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
                      <h3 className="text-start media-heading user_name text-capitalize">
                        {`${user && userId === user.uid ? userName : name}`}
                        <small>{createdAt.toDate().toDateString()}</small>
                      </h3>
                      <p className="text-start">{body}</p>
                    </div>
                    <div>
                      {user && user.uid === userId && (
                        <>
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 200, hide: 100 }}
                            overlay={renderTooltip}
                          >
                            <button
                              className="btn-delete"
                              type="button"
                              onClick={() => deleteComment(createdAt)}
                            >
                              <MdDelete />
                            </button>
                          </OverlayTrigger>
                        </>
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
