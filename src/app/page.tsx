import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-lightBlue h-screen flex justify-center items-center">
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-darkBlue rounded-lg px-4 py-2 text-lightBlue hover:bg-gold hover:text-jetBlack cursor-pointer"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-darkBlue rounded-lg px-4 py-2 text-lightBlue hover:bg-gold hover:text-jetBlack cursor-pointer"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
