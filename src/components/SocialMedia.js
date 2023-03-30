import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center gap-3 fs-4 ">
        <a href="https://www.instagram.com/swag__55__/">
          <div className="text-white">
            <FaInstagram className="s-icon" />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/prabakaran-m-105289219/">
          <div className="text-white">
            <FaLinkedin className="s-icon" />
          </div>
        </a>
        <a href="https://github.com/Prabakara-N">
          <div className="text-white">
            <FaGithub className="s-icon" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
