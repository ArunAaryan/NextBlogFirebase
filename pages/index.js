import Head from "next/head";
import Loader from "../components.js/Loader";
import Navbar from "../components.js/Navbar";
import LoginCard from "../components.js/LoginCard";
import { auth } from "../lib/firebase";
export default function Home() {
  return (
    <div className="flex flex-col  justify-start min-h-screen  bg-gray-50">
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col  justify-start w-screen flex-1 ">
        <Navbar />
        <p className="text-blue-300">what is happening?</p>
        <Loader show={false} />
      </main>
    </div>
  );
}
