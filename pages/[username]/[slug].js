import { useRouter } from "next/router";
function PostPage() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <p>This is {router.query.username}'s</p>
      <p>{router.query.slug} post</p>
    </div>
  );
}

export default PostPage;
