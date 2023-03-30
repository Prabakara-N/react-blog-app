import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utils";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

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
  return (
    <div>
      <div className="row pb-4" key={id}>
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
              <p className="author">{author}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start">
            {excerpt(description, 120)}
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user.uid === userId && (
            <div className="mt-3" style={{ float: "right" }}>
              <MdDelete className="trash" onClick={() => handleDelete(id)} />
              <Link to={`/update/${id}`}>
                <RiEdit2Fill className="edit" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
