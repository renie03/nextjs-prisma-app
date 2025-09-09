import { auth } from "@/lib/auth";
import Image from "next/image";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import SidebarLink from "./SidebarLink";
import { handleLogout } from "@/lib/actions/userActions";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Posts",
        path: "/admin/posts",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {
  const session = await auth();

  return (
    <div className="bg-bgSoft p-5 w-max md:w-[300px] h-screen flex flex-col justify-between sticky top-0">
      <div>
        <div className="flex items-center gap-5 mb-5">
          <Image
            className="rounded-full object-cover"
            src={session?.user?.image || "/noavatar.png"}
            alt=""
            width="50"
            height="50"
          />
          <div className="hidden md:flex flex-col">
            <span className="font-medium">{session?.user?.name}</span>
            <span className="text-sm text-textSoft">Administrator</span>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li className="flex flex-col" key={item.title}>
              <span className="text-textSoft font-bold text-sm text-center md:text-start">
                {item.title}
              </span>
              {item.list.map((link) => (
                <SidebarLink key={link.title} link={link} />
              ))}
            </li>
          ))}
        </ul>
        <form action={handleLogout}>
          <button className="p-3 my-2 flex items-center justify-center md:justify-start gap-2 rounded-md w-full cursor-pointer">
            <MdLogout />
            <span className="hidden md:block">Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
