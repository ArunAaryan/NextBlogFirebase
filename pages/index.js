import Head from "next/head";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { auth } from "../lib/firebase";
import UsernameForm from "../components/UsernameForm";
import { useContext } from "react";
import { userContext } from "../lib/authContext";
export default function Home() {
  const { user, username } = useContext(userContext);
  console.log(username);
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
        </div>
      </main>
    </div>
  );
}
