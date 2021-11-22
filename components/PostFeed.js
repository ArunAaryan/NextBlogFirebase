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
} from "firebase/firestore";
import { db, postToJson } from "../lib/firebase";
const PostFeed = ({ posts, admin }) => {
  const [lposts, setPosts] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    let cursor = last.createdAt;
    const query = firebaseQuery(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(5)
    );
    let newPosts = [];
    const querySnapshot = await getDocs(query);
    await querySnapshot.forEach((doc) => {
      newPosts.push(postToJson(doc));
    });
    setPosts(lposts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < 5) {
      setPostsEnd(true);
    }
  };
  return posts
    ? posts.map((post) => (
        <>
          <PostItem post={post} key={post.slug} admin={admin} />
          {!loading && !postsEnd && (
            <button onClick={getMorePosts}> Load More</button>
          )}
          <Loader show={loading} />
          {postsEnd && <p>You have reached the end</p>}
        </>
      ))
    : null;
};

function PostItem({ post, admin = false }) {
  return (
    <div className="border-2  bg-gray-50 rounded-lg  p-2 flex flex-col items-center md:flex-row">
      <Link href={`/${post.username}`}>
        <a className="bg-gray-800 text-white p-2 m-2 rounded-lg inline-block ">
          By @ {post.username}
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <a className=" text-2xl m-2">{post.title}</a>
      </Link>
      <span>{post.likeCount} likes </span>
    </div>
  );
}
export default PostFeed;
