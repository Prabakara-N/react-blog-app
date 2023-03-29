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
import BlogSection from "../components/BlogSection";
// import Spinner from "../components/Spinner";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
// import Tags from "../components/Tags";
// import FeatureBlogs from "../components/FeatureBlogs";
// import Trending from "../components/Trending";
// import Search from "../components/Search";
// import Category from "../components/Category";
import { isEmpty, isNull } from "lodash";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  return <div>Home</div>;
};

export default Home;
