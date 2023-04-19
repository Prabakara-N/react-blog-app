import React, { useState } from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utils";
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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="row pb-4">
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{title}</span>
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
                  <div
                    className="d-flex gap-1 mb-2 edit-link"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(id)}
                  >
                    <MdDelete className="trash" />
                    Delete
                  </div>
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
