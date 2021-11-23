import Link from "next/link";
import React, { useState } from "react";
import Loader from "./Loader";
import {
  collection,
  getDocs,
  query as firebaseQuery,
  where,
  orderBy,
  startAfter,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db, postToJson } from "../lib/firebase";
const PostFeed = ({ posts, admin }) => {
  const [lposts, setPosts] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);
    let last = lposts[lposts.length - 1];
    console.log("last post", last.title);
    let cursor = Timestamp.fromMillis(last.createdAt);
    console.log(cursor - 20);
    const query = firebaseQuery(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(1)
    );
    let newPosts = [];
    const querySnapshot = await getDocs(query);
    await querySnapshot.forEach((doc) => {
      newPosts.push(postToJson(doc));
    });
    setPosts(lposts.concat(newPosts));
    console.log("newPosts", lposts);
    setLoading(false);
    if (newPosts.length < 1) {
      setPostsEnd(true);
    }
  };
  return (
    <>
      {lposts &&
        lposts.map((post) => (
          <PostItem post={post} key={post.title} admin={admin} />
        ))}
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}> Load More</button>
      )}
      <Loader show={loading} />
      {postsEnd && <p>You have reached the end</p>}
    </>
  );
};

function PostItem({ post, admin = false }) {
  // console.log("post title", post.title);
  return (
    <div className="border-2  bg-gray-50 rounded-lg  p-2 m-2 flex items-center  ">
      <Link href={`/${post.username}`}>
        <a className="bg-gray-800 text-white p-2 m-2 rounded-lg  ">
          By @ {post.username}
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <a className="flex-1 text-2xl m-2">{post.title}</a>
      </Link>
      <span className="mx-10">{post.likeCount} likes </span>
    </div>
  );
}
export default PostFeed;
