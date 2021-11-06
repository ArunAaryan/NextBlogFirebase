import React from "react";
import { signInWithGoogle, auth } from "../lib/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { userContext } from "../lib/authContext";
import UsernameForm from "./UsernameForm";
function LoginCard() {
  const { user, username } = useContext(userContext);
  console.log(username);

  return !user ? (
    <div>
      <button
        className="rounded-md font-extrabold text-white p-3 mx-2 px-4 bg-indigo-500"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </button>
    </div>
  ) : !username ? (
    <>
      <UsernameForm />
    </>
  ) : (
    <p className="font-semibold bg-green-400 text-gray-600 p-3 rounded-full ">
      You are logged in as {"  "}
      <span className="font-extrabold">{user?.displayName}</span>
    </p>
  );
}

export default LoginCard;
