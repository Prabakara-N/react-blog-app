import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utils";
import NoBlog from "../assets/blog.jpg";
import { BiLike, BiComment } from "react-icons/bi";

const Card = ({ title, description, imgUrl, id, likes, comments }) => {
  return (
    <div className="col-sm-6 col-lg-4 mb-5" key={id}>
      <div className="related-content card text-decoration-none overflow-hidden h-100">
        <img
          className="related-img card-img-top"
          src={imgUrl || NoBlog}
          alt={title}
        />
        <div className="related-body card-body p-4">
          <h5 className="title text-start py-2">{title}</h5>
          <p className="short-description text-start">
            {excerpt(description, 25)}
          </p>
          <div className="d-flex justify-content-between">
            <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
              <span className="text-primary">Read More</span>
            </Link>
            <div className="d-flex gap-2 align-items-center">
              <div>
                <BiLike />
                {likes?.length}
              </div>
              <div>
                <BiComment />
                {comments?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
