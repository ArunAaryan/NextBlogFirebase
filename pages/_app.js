import "tailwindcss/tailwind.css";
import { userContext } from "../lib/authContext";
import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { query, getDocs, collection, where } from "firebase/firestore";
function MyApp({ Component, pageProps }) {
  const logout = (e) => {
    e.preventDefault();
    auth.signOut();
  };
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState(null);
  const setUserNameHandler = async () => {
    const q = query(collection(db, "usernames"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    // console.log("query");
    querySnapshot.docs.length &&
      setUserName({ user: user, username: querySnapshot.docs[0].id });
  };
  useEffect(() => {
    user && setUserNameHandler();
  }, [user]);
  // const [username] =

  return (
    <userContext.Provider
      value={{ user: user, username: userName, logout: logout }}
    >
      <Component {...pageProps} />
    </userContext.Provider>
  );
}

export default MyApp;
