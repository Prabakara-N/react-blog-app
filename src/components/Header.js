import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { transitions } from "bootstrap";
import { MdOutlineLogout } from "react-icons/md";
import { HiLogin } from "react-icons/hi";
import { UserInfo } from "../context/UserInfoContext";
import userProfile from "../assets/avatar.png";
import { toast } from "react-toastify";

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  const { userName, imageAsset } = UserInfo();
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-expand-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link fw-semibold ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/blogs" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link fw-semibold ${
                      active === "blogs" ? "active" : ""
                    }`}
                    onClick={() => setActive("blogs")}
                  >
                    Blogs
                  </li>
                </Link>

                {user ? (
                  <Link to="/create" style={{ textDecoration: "none" }}>
                    <li
                      className={`nav-item nav-link fw-semibold ${
                        active === "create" ? "active" : ""
                      }`}
                      onClick={() => setActive("create")}
                    >
                      Create
                    </li>
                  </Link>
                ) : (
                  <li
                    className={`nav-item nav-link fw-semibold ${
                      active === "create" ? "active" : ""
                    }`}
                    onClick={() => {
                      toast.error("Please log-in to create your blog");
                      navigate("/auth");
                      setActive("login");
                    }}
                  >
                    Create
                  </li>
                )}

                <Link to="/about" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link fw-semibold ${
                      active === "about" ? "active" : ""
                    }`}
                    onClick={() => setActive("about")}
                  >
                    About
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <Link to={"/userinfo"}>
                        <div className="profile-logo">
                          <img
                            src={`${imageAsset ? imageAsset : userProfile}`}
                            alt="logo"
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              marginTop: "12px",
                            }}
                          />
                        </div>
                      </Link>
                      <Link
                        to={"/userinfo"}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <p
                          className="text-capitalize"
                          style={{
                            marginTop: "12px",
                            marginLeft: "5px",
                          }}
                        >
                          {userName ? userName : user.displayName}
                        </p>
                      </Link>
                      <li
                        className="nav-item nav-link fw-bold"
                        onClick={handleLogout}
                      >
                        Logout
                        <MdOutlineLogout
                          style={{
                            marginLeft: "5px",
                          }}
                        />
                      </li>
                    </>
                  ) : (
                    <Link to="/auth" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "login" ? "active" : ""
                        } fw-bold`}
                        onClick={() => setActive("login")}
                      >
                        Login <HiLogin />
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
