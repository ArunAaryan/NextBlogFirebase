import Link from "next/link";
function Navbar() {
  const { user, username } = { user: "arun", username: "arun-aaryan" };
  // const { user, username } = { user: "arun", username: "" };
  return (
    <nav className="w-full px-2 bg-gray-50 my-4">
      <ul className="flex  justify-between ">
        <li className="flex-1">
          <Link href="/">
            <button className="font-extrabold  rounded-md text-white p-3 px-4 bg-black">
              Home
            </button>
          </Link>
        </li>
        {username && (
          <>
            <li>
              <button className="rounded-md font-extrabold text-white p-3 mx-2 px-4 bg-indigo-500">
                Signout
              </button>
            </li>
            <li>
              <Link href="/admin">
                <button className="rounded-md font-extrabold text-white p-3 mx-2 px-4 bg-red-500">
                  Write Posts
                </button>
              </Link>
            </li>
            <li>
              <Link className="-my-10" href={`/${username}`}>
                <button className="rounded-full font-extrabold bg-blue-100 text-indigo-900 p-3 px-5">
                  {username[0].toUpperCase()}
                </button>
              </Link>
            </li>
          </>
        )}
        {!username && (
          <li>
            <Link href="/login">
              <button className="rounded-md font-extrabold text-white p-3 mx-2 px-4 bg-indigo-500">
                Login
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
