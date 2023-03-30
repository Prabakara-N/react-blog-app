import React, { useState, useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import Tags from "../components/Tags";
import FeatureBlogs from "../components/FeatureBlogs";
import Trending from "../components/Trending";
import Search from "../components/Search";
import Category from "../components/Category";
import { isEmpty, isNull } from "lodash";
import { useLocation } from "react-router-dom";

const Home = ({ setActive, user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [trendBlogs, setTrendBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setTotalBlogs(list);
        // setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this blog?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog Deleted Successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <div>Home</div>;
};

export default Home;
