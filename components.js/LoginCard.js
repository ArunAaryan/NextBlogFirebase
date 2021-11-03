import React from "react";
import { signInWithGoogle, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function LoginCard() {
  const [user] = useAuthState(auth);
  console.log("user", user);
  return (
    <div>
      <button
        className="rounded-md font-extrabold text-white p-3 mx-2 px-4 bg-indigo-500"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </button>
    </div>
  );
}

export default LoginCard;
