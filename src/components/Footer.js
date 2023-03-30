import React from "react";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <footer className="container-fluid bg-secondary py-3 text-white">
      <div className="container">
        <p className="c-right">
          Copyright &copy; React Blogs 2023. All rights reserved.
        </p>
      </div>
      <div className="social-media">
        <SocialMedia />
      </div>
    </footer>
  );
};

export default Footer;
