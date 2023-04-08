import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="c-container bg-img">
      <div className="container padding ">
        <div className="col-md-12 mt-5">
          <div className="row mx-0">
            <p className="fw-medium fs-5 text-white about">
              I finished building a blog website using React, Bootstrap, and
              Sass! I added some cool features to make it more interactive and
              user-friendly. I used Firebase authentication to allow users to
              log in and create their own blog posts. And Firebase database
              helped me store all the blog collections, while the storage
              feature let users save images of their blog posts. I also used
              React Router DOM to make it easy for users to navigate to
              different pages on my website. Plus, I added alert messages that
              show up whenever a user creates, deletes, or updates a blog post.
              One of my favorite features is the ability for users to like and
              comment on blog posts, which makes the website more engaging. And
              I added a trending blogs section and a search feature, so users
              can easily find the content they're looking for. Overall, I'm
              really happy with how my React blog website turned out. It was a
              fun project to work on, and I learned a lot in the process!
            </p>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
