import React, { useState } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utils";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoBlog from "../assets/blog.jpg";
// icons
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcCalendar } from "react-icons/fc";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
  show,
  setShow,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="row pb-4">
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl || NoBlog} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2 text-capitalize">{title}</span>
            <span className="meta-info">
              <p className="author">{author}</p>
              -&nbsp;
              {timestamp.toDate().toDateString()} <FcCalendar />
            </span>
          </div>
          <div className="short-description text-start">
            {excerpt(description, 120)}
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user.uid === userId && (
            <div className="mt-3 position-relative" style={{ float: "right" }}>
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <BsThreeDotsVertical />
              </div>
              {isOpen && (
                <div className="options">
                  <>
                    <div
                      className="d-flex gap-1 mb-2 edit-link"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setShow(true)}
                    >
                      <MdDelete className="trash" />
                      Delete
                    </div>

                    <Modal show={show} onHide={() => setShow(false)}>
                      <Modal.Body className="delete-modal">
                        Are you sure you wanted to delete this blog ?{" "}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShow(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                  <Link
                    className="d-flex gap-1 edit-link"
                    to={`/update/${id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <RiEdit2Fill className="edit" />{" "}
                    <span
                      style={{
                        color: "black",
                      }}
                    >
                      Edit
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
