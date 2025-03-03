"use client";
export default function Navbar({ type }: { type: string }) {
  return (
    <div>
      {type == "guest" ? (
        <div className="bg-darkBlue w-100vw text-lightBlue flex justify-between font-extrabold py-4 px-8">
          <div className="text-gold text-4xl">MeetSync</div>
          <ul className="flex gap-4 text-2xl flex-row items-center">
            <li>About</li>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        </div>
      ) : (
        <div className="bg-darkBlue w-100vw text-lightBlue flex justify-between font-extrabold py-4 px-8">
          <div className="text-gold text-4xl">MeetSync</div>
          <ul className="flex gap-4 text-2xl flex-row items-center">
            <li>Home</li>
            <li>Friends</li>
            <li>Hangouts</li>
            <li>Settings</li>
          </ul>
        </div>
      )}
    </div>
  );
}
