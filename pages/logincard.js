import React from "react";
import { signInWithGoogle, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function LoginCard() {
  const [user] = useAuthState(auth);
  console.log("user", user);
  return (
    <div>
      <button
        className="bg-gray-200 p-5 font-extrabold"
        onClick={signInWithGoogle}
      >
        SignIn
      </button>
    </div>
  );
}

export default LoginCard;
