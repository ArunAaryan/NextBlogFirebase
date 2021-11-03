import Link from "next/link";
function Navbar() {
  const { user, username } = { user: "arun", username: "arun-aaryan" };
  return (
    <nav className="w-full px-2 bg-gray-50 py-2">
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
              <button className="rounded-md  text-white p-3 mx-2 px-4 bg-indigo-500">
                Signout
              </button>
            </li>
            <li>
              <button className="rounded-md  text-white p-3 mx-2 px-4 bg-red-500">
                Write Posts
              </button>
            </li>
            <li>
              <Link className="-my-10" href={`/${username}`}>
                <button className="rounded-full bg-blue-100 p-3 px-5">
                  {username[0]}
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
