import { useEffect, useState } from "react";
import { db, doc, getDoc, setDoc } from "../lib/firebase";
import { userContext } from "../lib/authContext";
import { useContext } from "react";
function UsernameForm() {
  const { user } = useContext(userContext);
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [valid, setValid] = useState(false);
  const [userName, setUserName] = useState("");
  const checkUserName = async (username) => {
    if (username.length > 3) {
      setLoading(true);
      //   const ref = db.doc(`usernames/${userName}`);
      const ref = doc(db, "usernames", userName);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setValid(false);
      } else {
        setValid(true);
      }
      setLoading(false);
    } else {
      setValid(false);
    }
  };
  useEffect(() => {
    checkUserName(userName);
  }, [userName]);
  const handleChange = (e) => {
    setUserName(e.target.value.toLowerCase());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docData = {
      uid: user.uid,
    };
    try {
      await setDoc(doc(db, "usernames", userName), docData);
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <input
          className="bg-purple-50 p-3 rounded-full"
          name="username"
          placeholder="username"
          value={userName}
          onChange={handleChange}
        />
        <button onSubmit={handleSubmit}> submit </button>
      </form>
      <p>valid username ? {valid.toString()}</p>
      <p>loading...{loading.toString()}</p>
      {success && <p>username set successfully</p>}
    </div>
  );
}

export default UsernameForm;
