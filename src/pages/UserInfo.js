import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import profile from "../assets/avatar.png";
import { UserInfo } from "../context/UserInfoContext";

const UserProfile = ({ user, fetchUserDetails }) => {
  const { userName, email, number, bio, imageAsset, docId, userId } =
    UserInfo();

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.uid]);

  return (
    <>
      <div className="bg-slate-800 w-full h-full flex flex-col min-h-screen justify-center items-center text-white">
        <div className="bg-slate-900/50 rounded-lg p-6 w-[95%] sm:w-[450px] flex flex-col gap-y-8 mt-16">
          {user && user?.uid === userId ? (
            <>
              <div className="-mt-16">
                <img
                  src={`${imageAsset ? imageAsset : profile}`}
                  alt="profile"
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                />
              </div>
              <div className="text-center">
                <p className="mb-2">Name :</p>
                <h2 className="text-center text-lg font-medium bg-black/25 px-2 py-1 rounded-md capitalize inline">
                  {userName}
                </h2>
              </div>
              <div className="flex flex-col gap-y-5 sm:flex-row sm:justify-between lg:items-center">
                <div>
                  <p className="mb-4 pl-2">Email :</p>
                  <p className="text-center bg-black/25 px-2 py-2 rounded-md inline">
                    {email}
                  </p>
                </div>
                <div>
                  <p className="mb-4 pl-2">Number :</p>
                  <p className="text-center bg-black/25 px-2 py-2 rounded-md inline">
                    {number}
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-2 pl-2">Address :</p>
                <p className="bg-black/25 px-3 py-2 rounded-md">{bio}</p>
              </div>
              <div className="flex justify-between items-center">
                <Link to={`/editprofile/${docId}`}>
                  <button
                    type="button"
                    className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                  >
                    Edit <AiFillEdit />
                  </button>
                </Link>
                <Link to={"/home"}>
                  <button
                    className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                    type="button"
                  >
                    Done <MdDone />
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="-mt-16">
                <img
                  src={`${imageAsset ? imageAsset : profile}`}
                  alt="profile"
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                />
              </div>
              <div className="text-center">
                <p className="mb-2">Name :</p>
                <h2 className="text-center text-lg font-medium bg-black/25 px-2 py-1 rounded-md w-[65%] mx-auto text-gray-500">
                  nill
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-4 pl-2">Email :</p>
                  <p className="text-center bg-black/25 px-2 py-2 pr-32 rounded-md inline text-gray-500">
                    nill
                  </p>
                </div>
                <div>
                  <p className="mb-4 pl-2">Number :</p>
                  <p className="text-center bg-black/25 px-2 pr-32 py-2 rounded-md inline text-gray-500">
                    nill
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-2 pl-2">Address :</p>
                <p className="bg-black/25 px-3 py-2 pb-16 rounded-md text-gray-500">
                  nill
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Link to={`/addprofile`}>
                  <button
                    className="bg-blue-700 inline-flex py-2 px-3 gap-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
                    type="button"
                  >
                    Add Profile <AiFillEdit />
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
