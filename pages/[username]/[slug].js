import { useRouter } from "next/router";
import {
  query as firebaseQuery,
  collection,
  orderBy,
  limit,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { postToJson } from "../../lib/firebase";
import { async } from "@firebase/util";
function PostPage() {
  const router = useRouter();
  // console.log(router);
  return (
    <div>
      <p>This is {router.query.username}'s</p>
      <p>{router.query.slug} post</p>
    </div>
  );
}
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const pq = doc(db, "posts", slug);
  const querySnapshot = await getDoc(pq);
  // console.log(querySnapshot);
  let post = postToJson(querySnapshot);
  return {
    props: { post },
    revalidate: 10000,
  };
}
export async function getStaticPaths() {
  // console.log("context", context);
  const postQuery = firebaseQuery(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
    // where("published", "==", true),
  );
  const querySnapshot = await getDocs(postQuery);

  const paths = [];
  await querySnapshot.forEach((doc) => {
    const { slug, username } = doc.data();
    paths.push({
      params: { username, slug },
    });
  });
  console.log("paths", paths);
  return {
    paths,
    fallback: "blocking",
  };
}
export default PostPage;
