import { SidebarTrigger } from "../ui/sidebar";
import { HelpCircle, Bell } from "lucide-react";
import ProfileIcon from "@/assets/profile.png";

export default function Menu() {
  return (
    <div className="w-full flex items-center justify-between px-8 py-5 border-b border-gray-200 dark:border-gray-800">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 p-0 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
          <img
            src={ProfileIcon}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </button>
      </div>
    </div>
  );
}
