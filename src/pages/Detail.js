import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FcCalendar } from "react-icons/fc";
import NoBlog from "../assets/blog.jpg";
// firebase
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// components
import CommentBox from "../components/CommentBox";
import Like from "../components/Like";
import FeatureBlogs from "../components/FeatureBlogs";
import RelatedBlog from "../components/RelatedBlog";
import Tags from "../components/Tags";
import UserComments from "../components/UserComments";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { MdModeComment } from "react-icons/md";

const Detail = ({ setActive, user }) => {
  const userId = user?.uid;
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(
        blogRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const docSnapshot = await getDocs(recentBlogs);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getRecentBlogs();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const getBlogDetail = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
    let tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);
    setBlog(blogDetail.data());
    const myTags =
      Array.isArray(blogDetail.data().tags) && blogDetail.data().tags.length > 0
        ? blogDetail.data().tags
        : ["default"];
    const relatedBlogsQuery = query(
      blogRef,
      where("tags", "array-contains-any", myTags, limit(3))
    );
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });
    setRelatedBlogs(relatedBlogs);
    setActive(null);
    setLoading(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (userComment) {
      comments.push({
        createdAt: Timestamp.fromDate(new Date()),
        userId,
        name: user?.displayName,
        body: userComment,
      });
      toast.success("Comment posted successfully");
      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        comments,
        timestamp: serverTimestamp(),
      });
      setComments(comments);
      setUserComment("");
    } else {
      toast.error("Type Your Comment");
    }
  };

  const handleLike = async () => {
    if (userId) {
      let newLikes = [...likes];
      const index = newLikes.findIndex((id) => id === userId);
      if (index === -1) {
        newLikes.push(userId);
      } else {
        newLikes = newLikes.filter((id) => id !== userId);
      }
      setLikes(newLikes);
      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        likes: newLikes,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <>
      <div className="single">
        <div
          className="blog-title-box"
          style={{
            backgroundImage: `url(${blog?.imgUrl || NoBlog})`,
          }}
        >
          <div className="overlay"></div>
          <div className="blog-title">
            <span>{blog?.timestamp.toDate().toDateString()}</span>
            <h2 className="text-capitalize">{blog?.title}</h2>
          </div>
        </div>
        <div className="container-fluid pb-4 pt-4 padding blog-single-content">
          <div className="container padding">
            <div className="row mx-0">
              <div className="col-md-8">
                <span className="meta-info detail-name text-start d-flex like-span align-item-center justify-content-between">
                  <div>
                    By <p className="author">{blog?.author}</p> -&nbsp;
                    {blog?.timestamp.toDate().toDateString()} <FcCalendar />
                  </div>
                  <div className="likes-com">
                    <Like
                      handleLike={handleLike}
                      likes={likes}
                      userId={userId}
                    />
                  </div>
                </span>
                <p className="text-start">{blog?.description}</p>
                <div className="text-start">
                  <Tags tags={blog?.tags} />
                </div>
                <br />
                <div className="custombox">
                  <div className="scroll">
                    <h4 className="small-title bg-success">
                      {comments?.length} Comment <MdModeComment />
                    </h4>
                    {isEmpty(comments) ? (
                      <UserComments
                        msg={
                          "No Comment yet posted on this blog. Be the first to comment"
                        }
                      />
                    ) : (
                      <>
                        {comments?.map((comment) => (
                          <UserComments
                            blog={blog}
                            comments={comments}
                            setComments={setComments}
                            userId={userId}
                            user={user}
                            key={uuidv4()}
                            {...comment}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <CommentBox
                  userId={userId}
                  userComment={userComment}
                  setUserComment={setUserComment}
                  handleComment={handleComment}
                />
              </div>
              <div className="col-md-3">
                <div className="blog-heading text-start py-2 mb-4">Tags</div>
                <Tags tags={tags} />
                <FeatureBlogs title={"Recent Blogs"} blogs={blogs} />
              </div>
            </div>
            <RelatedBlog key={uuidv4()} id={id} blogs={relatedBlogs} />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Detail;
