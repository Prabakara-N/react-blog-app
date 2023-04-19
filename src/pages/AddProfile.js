import React, { useState } from "react";
import Loader from "../components/Spinner";

import { FcAddImage } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
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
  const [progress, setProgress] = useState(null);

  const {
    userName,
    setUserName,
    email,
    setEmail,
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
          setProgress(uploadProgress);
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
    if ((userName || user?.displayName) && email && bio && user?.uid) {
      if (!id) {
        try {
          await addDoc(collection(db, "userInfo"), {
            userName: userName,
            image: imageAsset,
            email: email,
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
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Profile" : "Add Profile"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
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
                        <div className="dp w-[100px] h-[100px] mx-auto d-flex align-items-center justify-content-center cursor-pointer">
                          <FcAddImage className="add-pic" />
                        </div>
                      </OverlayTrigger>
                      <input
                        type="file"
                        id="profile"
                        onChange={uploadProfile}
                        accept="image/*"
                        className="d-none"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="position-relative ">
                      <img src={imageAsset} alt="profile-pic" className="dp" />
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 200, hide: 100 }}
                        overlay={renderTooltip}
                      >
                        <button
                          type="button"
                          className="position-absolute del"
                          onClick={deleteImage}
                        >
                          <MdDelete className="text-dark " />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </>
                )}
              </>
            )}
            <form className="row blog-form" onSubmit={saveDetails}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box text-capitalize"
                  placeholder="UserName"
                  name="title"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="About Me"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
