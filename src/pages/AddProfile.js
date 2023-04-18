import React, { useState } from "react";
import Loader from "../components/Spinner";

import { FcAddImage } from "react-icons/fc";
import { MdDelete, MdSaveAlt } from "react-icons/md";
import { toast } from "react-toastify";

import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import { db, storage } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { UserInfo } from "../context/UserInfoContext";

const AddProfile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    userName,
    setUserName,
    email,
    setEmail,
    number,
    setNumber,
    bio,
    setBio,
    imageAsset,
    setImageAsset,
  } = UserInfo();

  const { id } = useParams();

  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip
      className="text-white bg-black/20 ml-2 px-3 py-1 rounded-lg text-xs"
      id="button-tooltip"
      {...props}
    >
      remove
    </Tooltip>
  );

  const tooltipRender = (props) => (
    <Tooltip
      className="text-white bg-black/20 ml-2 px-3 py-1 rounded-lg text-xs"
      id="button-tooltip"
      {...props}
    >
      Add Profile Picture
    </Tooltip>
  );

  // upload profile picture
  const uploadProfile = (e) => {
    setIsLoading(true);
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(uploadProgress);
          toast.promise("uploading...Please wait...");
        },
        (error) => {
          toast.error(`Error while uploading : Try Again...`);
          console.log(error);
          setTimeout(() => {
            setIsLoading(false);
          }, 4000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset(downloadURL);
            setIsLoading(false);
            toast.success("Image uploaded successfully...!");
          });
        }
      );
    }
  };

  // delete image
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
    });
  };

  // saving user details
  const saveDetails = async (e) => {
    e.preventDefault();
    if (userName && email && number && bio && user?.uid) {
      if (!id) {
        try {
          await addDoc(collection(db, "userInfo"), {
            userName: userName,
            image: imageAsset,
            email: email,
            number: number,
            bio: bio,
            userId: user.uid,
          });
          toast.success("Profile Added Successfully");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "userInfo", id), {
            userName: userName,
            image: imageAsset,
            email: email,
            number: number,
            bio: bio,
            userId: user.uid,
          });
          toast.success("Profile Updated Successfully");
        } catch (error) {
          console.log(error);
        }
      }
      navigate(`/userinfo`);
    } else {
      toast.error("All fields are mandatory to fill");
    }
  };

  return (
    <div className="bg-slate-800 w-full h-full flex flex-col min-h-screen justify-center items-center text-white">
      <div className="p-6 rounded-lg bg-slate-900/30 w-[95%] sm:w-[450px]">
        <form onSubmit={saveDetails} className="flex flex-col gap-y-8">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label htmlFor="profile">
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 200, hide: 100 }}
                      overlay={tooltipRender}
                    >
                      <div className="w-[100px] h-[100px] mx-auto bg-black/60 rounded-full flex items-center justify-center -mt-20 cursor-pointer">
                        <FcAddImage className="w-[45px] h-[45px]  " />
                      </div>
                    </OverlayTrigger>
                    <input
                      type="file"
                      id="profile"
                      onChange={uploadProfile}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="w-[100px] h-[100px] mx-auto bg-black/60 rounded-full flex items-center justify-center -mt-20 relative">
                    <img
                      src={imageAsset}
                      alt="profile-pic"
                      className="w-[100px] h-[100px] rounded-full"
                    />
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 200, hide: 100 }}
                      overlay={renderTooltip}
                    >
                      <button
                        type="button"
                        className="absolute bottom-1 right-1 p-1 rounded-full bg-black/70 text-xl cursor-pointer outline-none hover:shadow-md hover:bg-red-600 duration-500 transition-all ease-in-out"
                        onClick={deleteImage}
                      >
                        <MdDelete className="text-white" />
                      </button>
                    </OverlayTrigger>
                  </div>
                </>
              )}
            </>
          )}

          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="py-3 capitalize rounded pl-3 bg-slate-700"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 rounded pl-3 bg-slate-700"
            required
          />
          <input
            type="number"
            placeholder="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="py-3 rounded pl-3 bg-slate-700"
          />
          <textarea
            type="text"
            placeholder="Address"
            value={bio}
            rows={3}
            onChange={(e) => setBio(e.target.value)}
            className="py-3 rounded pl-3 bg-slate-700"
          />
          <div>
            <button
              type="submit"
              className="bg-blue-700 py-2 px-3 rounded-lg font-medium inline-flex gap-x-2 items-center"
            >
              Save <MdSaveAlt />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;
