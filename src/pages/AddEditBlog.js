import React, { useState, useEffect } from "react";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useNavigate, useParams } from "react-router-dom";
// firebase
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
  "Movies",
  "Traveling",
  "Others",
];

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { title, tags, trending, category, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image Uploaded to Firebase Successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlockDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlockDetails = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog Created Successfully");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog Updated Successfully");
        } catch (error) {
          console.log(error);
        }
      }
      navigate("/");
    } else {
      toast.error("All fields are mendatory to fill");
    }
  };

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12">
            <div className="text-center heading py-2">
              {id ? "Update Blog" : "Create Blog"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <p className="text-start fs-6 text-muted fw-bold">
                    Note :Please type and press enter for tags
                  </p>
                  <ReactTagInput
                    tags={tags}
                    placeholder="Tags"
                    onChange={handleTags}
                  />
                </div>
                <div className="col-12 py-3">
                  <p className="trending">Is it trending blog ?</p>
                  <div className="form-check-inline mx-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="radioOptionYes"
                      value="yes"
                      name="radioOption"
                      checked={trending === "yes"}
                      onChange={handleTrending}
                      style={{ cursor: "pointer" }}
                    />
                    <label
                      htmlFor="radioOptionYes"
                      className="form-check-label"
                      style={{ cursor: "pointer" }}
                    >
                      Yes&nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input"
                      value="no"
                      name="radioOption"
                      id="radioOptionNo"
                      checked={trending === "no"}
                      onChange={handleTrending}
                      style={{ cursor: "pointer" }}
                    />
                    <label
                      htmlFor="radioOptionNo"
                      className="form-check-label"
                      style={{ cursor: "pointer" }}
                    >
                      No
                    </label>
                  </div>
                </div>
                <div className="col-12 py-3">
                  <select
                    value={category}
                    onChange={onCategoryChange}
                    className="catg-dropdown"
                  >
                    <option>Please select category</option>
                    {categoryOption.map((option, index) => (
                      <option value={option || ""} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 py-3">
                  <textarea
                    className="form-control description-box"
                    placeholder="Description"
                    value={description}
                    name="description"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
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
      <Footer />
    </>
  );
};

export default AddEditBlog;
