import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import profile from "../assets/avatar.png";
import { UserInfo } from "../context/UserInfoContext";

const UserProfile = ({ user, fetchUserDetails, setActive }) => {
  const { userName, email, bio, imageAsset, docId, userId } = UserInfo();

  useEffect(() => {
    fetchUserDetails();
    setActive(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.uid]);

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="user-card bg-light">
          {user && user?.uid === userId ? (
            <>
              <div className="my-2 dp mx-auto">
                <img
                  src={`${imageAsset ? imageAsset : profile}`}
                  alt="profile"
                  className="dp"
                />
              </div>
              <div className="text-center">
                <p className="mb-2 fw-bold">Name :</p>
                <h4 className="text-capitalize">
                  {userName ? userName : user?.displayName}
                </h4>
              </div>
              <div className="mt-2">
                <p className="mb-1 pl-2 fw-bold">Email :</p>
                <p className="text-center px-2 py-2 email bg-white">{email}</p>
              </div>
              <div className="mt-2">
                <p className="mb-2 pl-2 fw-bold">Bio :</p>
                <p className="px-3 py-2 bg-white bio">{bio}</p>
              </div>
              <div className="d-flex justify-content-around align-items-center">
                <Link to={`/editprofile/${docId}`}>
                  <button type="button" className="btn btn-dark">
                    Edit <AiFillEdit />
                  </button>
                </Link>
                <Link to={"/"}>
                  <button className="btn btn-success" type="button">
                    Done <MdDone />
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-2 dp mx-auto">
                <img
                  src={`${imageAsset ? imageAsset : profile}`}
                  alt="profile"
                  className="dp"
                />
              </div>
              <div className="text-center mt-2">
                <p className="mb-2 fw-bold">Name :</p>
                <h4 className="text-center text-capitalize">
                  {userName ? userName : user?.displayName}
                </h4>
              </div>
              <div>
                <p className="mb-2 pl-2 fw-bold">Email :</p>
                <p className="text-center px-2 py-2 pr-32 bg-white email">
                  nill
                </p>
              </div>
              <div>
                <p className="mb-2 pl-2 fw-bold">Bio :</p>
                <p className="text-center bio px-2 pr-32 py-2 bg-white">nill</p>
              </div>
              <div>
                <Link to={`/addprofile`}>
                  <button className="btn btn-primary" type="button">
                    Add Profile <AiFillEdit />
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
