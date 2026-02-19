"use client";

import { LinkType } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  link,
  isMobile,
  onClick,
}: {
  link: LinkType;
  isMobile?: boolean;
  onClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <Link
      className={`${
        isMobile
          ? "w-full p-3 text-center text-xl font-bold rounded-md"
          : "py-1 px-3 rounded-full text-lg font-medium"
      }
       ${
         pathname === link.path
           ? "bg-gray-800 dark:bg-white text-white dark:text-black"
           : "hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black"
       }`}
      href={link.path}
      onClick={onClick}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
