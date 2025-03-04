import Link from "next/link";
import { Settings, LogOut } from "lucide-react";
import { useUser } from "@/utils/context/userContext";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      router.push("/");
    }
  }
  return (
    <div className="absolute right-8 shadow-lg mt-2 border-2 border-jetBlack/40 rounded-xl text-left p-2">
      <div className="border-b-2 border-jetBlack/40 p-2">
        <div className="text-xl font-bold">{user?.username}</div>
        <div className="text-jetBlack/80 text-lg">{user?.email}</div>
      </div>
      <ul className="text-xl mt-2">
        <Link
          href="/settings"
          className="flex gap-2 pl-2 pr-16 py-2 hover:bg-jetBlack/10 rounded-t-lg"
        >
          <Settings size="24" />
          Settings
        </Link>
        <li className="flex gap-2 pl-2 py-2 hover:bg-jetBlack/10 cursor-pointer rounded-b-lg text-red-600" onClick={handleLogout}>
          <LogOut size="24" />
          Log Out
        </li>
      </ul>
    </div>
  );
}
