import Image from "next/image";
function Loader({ show }) {
  return show ? (
    <div
      className="animate-spin"
      style={{ position: "relative", height: 50, width: 50 }}
    >
      <Image src="/loader.png" layout="fill" objectFit="contain" />{" "}
    </div>
  ) : null;
}

export default Loader;
