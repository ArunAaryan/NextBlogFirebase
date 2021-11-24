import Head from "next/head";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { auth, postToJson, db } from "../lib/firebase";
import UsernameForm from "../components/UsernameForm";
import { useContext } from "react";
import { userContext } from "../lib/authContext";
import PostFeed from "../components/PostFeed";
import {
  query as firebaseQuery,
  collectionGroup,
  collection,
  getDocs,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
export default function Home({ posts }) {
  // console.log(posts);
  const { user, username } = useContext(userContext);
  // console.log(username);
  return (
    // <UsernameForm />
    <div className=" flex flex-col  justify-start min-h-screen">
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col  justify-start w-screen flex-1 ">
        <Navbar />
        <div className="p-2">
          <p className="  text-2xl">
            {" "}
            Hello{" "}
            <span className=" text-blue-400 font-extrabold">
              {user?.displayName} {"  "}
            </span>
            {username && `- ${username.username}`}
          </p>
          {/* <p className="text-blue-300">what is happening?</p> */}
          <Loader show={false} />
          <PostFeed posts={posts} />
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  // console.log("context", context);
  const postQuery = firebaseQuery(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    // where("published", "==", true),
    limit(1)
  );
  const querySnapshot = await getDocs(postQuery);
  let posts = [];

  await querySnapshot.forEach((doc) => {
    posts.push(postToJson(doc));
  });
  // console.log(querySnapshot.docs);
  // console.log(querySnapshot.docs[0].data());
  // await querySnapshot.forEach((doc) => {
  //   posts.push(doc.data());
  // });
  // console.log("posts", posts);
  // posts = ["arun"];
  return {
    props: { posts },
  };
}
