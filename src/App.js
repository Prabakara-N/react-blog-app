import React, { useEffect, useState } from "react";
import "./style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// routes
import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Blogs from "./pages/Blogs";
import TagBlog from "./pages/TagBlog";
import CategoryBlog from "./pages/CategoryBlog";
import AddProfile from "./pages/AddProfile";
import UserProfile from "./pages/UserInfo";

// components
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
// fire base
import { auth, db } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserInfo } from "./context/UserInfoContext";

const App = () => {
  const [active, setActive] = useState("Home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { setUserName, setImageAsset, setEmail, setBio, setDocId, setUserId } =
    UserInfo();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  // getting user profile
  const fetchUserDetails = async () => {
    if (user && user?.uid) {
      const q = query(
        collection(db, "userInfo"),
        where("userId", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.map((doc) => {
        setDocId(doc.id);
        const userData = doc.data();
        if (userData) {
          setUserId(userData.userId);
          setUserName(
            userData.userName ? userData.userName : user?.displayName
          );
          setImageAsset(userData.image);
          setEmail(userData.email);
          setBio(userData.bio);
        }
        return doc.id;
      });
    }
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ScrollToTop />
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              fetchUserDetails={fetchUserDetails}
              setActive={setActive}
              active={active}
              user={user}
            />
          }
        />
        <Route
          path="/search"
          element={<Home setActive={setActive} user={user} />}
        />
        <Route
          path="/detail/:id"
          element={<Detail setActive={setActive} user={user} />}
        />
        <Route path="/create" element={<AddEditBlog user={user} />} />
        <Route
          path="/update/:id"
          element={<AddEditBlog user={user} setActive={setActive} />}
        />
        <Route path="/blogs" element={<Blogs setActive={setActive} />} />
        <Route path="/tag/:tag" element={<TagBlog setActive={setActive} />} />
        <Route
          path="/category/:category"
          element={<CategoryBlog setActive={setActive} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/userinfo"
          element={
            <UserProfile
              fetchUserDetails={fetchUserDetails}
              user={user}
              setActive={setActive}
            />
          }
        />
        <Route path="/addprofile" element={<AddProfile user={user} />} />
        <Route path="/editprofile/:id" element={<AddProfile user={user} />} />
        <Route
          path="/auth"
          element={<Auth setActive={setActive} setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
