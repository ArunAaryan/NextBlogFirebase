import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { Router, useRouter } from "next/router";
import {
  auth,
  db,
  doc,
  getDoc,
  orderBy,
  limit,
  postToJson,
} from "../../lib/firebase";
import {
  collection,
  getDocs,
  where,
  query as firebaseQuery,
} from "firebase/firestore";
function UserProfilePage({ user, posts }) {
  const router = useRouter();
  return (
    <main>
      <p>{router.query.username}</p>
      <p>hello</p>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const { username } = query;

  const ref = doc(db, "usernames", username);
  const docSnap = await getDoc(ref);
  let user = null;
  let posts = [];
  if (docSnap.data()) {
    user = docSnap.data();
    console.log(username);
    const q = firebaseQuery(
      collection(db, "posts"),
      where("username", "==", username),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });

    await querySnapshot.forEach((doc) => {
      posts.push(postToJson(doc));
    });
    // console.log(posts);
  }
  // console.log(docSnap.data());
  return {
    props: {
      user,
      posts,
    },
  };
}
export default UserProfilePage;
