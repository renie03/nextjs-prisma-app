import Link from "next/link";
import { auth } from "@/lib/auth";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import { links } from "@/lib/constants";
import ThemeToggle from "../shared/ThemeToggle";
import MobileMenu from "./MobileMenu";

const Navbar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="h-20 flex justify-between items-center sticky top-0 bg-bg z-50">
      <Link href="/" className="text-xl font-medium">
        Blog App
      </Link>
      <div className="flex items-center gap-2">
        <div className="mr-3 md:mr-2">
          <ThemeToggle />
        </div>
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink key={link.title} link={link} />
          ))}
        </div>
        {session?.user ? (
          <UserMenu session={session} />
        ) : (
          <div className="hidden md:block">
            <NavLink link={{ title: "Login", path: "/login" }} />
          </div>
        )}
        {/* MOBILE MENU */}
        <MobileMenu session={session} />
      </div>
    </div>
  );
};

export default Navbar;
