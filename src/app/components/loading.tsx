import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex bg-lightBlue  justify-center items-center">
      <Loader className="w-10 h-10 text-darkBlue motion-safe:animate-spin" />
    </div>
  );
}