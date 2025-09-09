import Link from "next/link";
import { auth } from "@/lib/auth";
import Search from "./Search";
import UserMenu from "./UserMenu";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../shared/ThemeToggle";
import { links } from "@/lib/constants";

const Navbar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="h-20 flex justify-between items-center sticky top-0 bg-bg z-50">
      <Link href="/" className="hidden lg:inline text-lg font-medium">
        Blog App
      </Link>
      <Search />
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink key={link.title} link={link} />
          ))}
          {session?.user?.isAdmin && (
            <NavLink link={{ title: "Dashboard", path: "/admin/dashboard" }} />
          )}
        </div>
        <ThemeToggle />
        {session?.user ? (
          <UserMenu session={session} />
        ) : (
          <Link
            href="/login"
            className="hidden md:inline py-1 px-2 rounded-md font-medium bg-blue-500 dark:bg-white text-white dark:text-black"
          >
            Login
          </Link>
        )}
        {/* MOBILE MENU */}
        <MobileMenu session={session} />
      </div>
    </div>
  );
};

export default Navbar;
