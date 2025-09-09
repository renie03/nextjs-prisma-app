"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

type SidebarLinkType = {
  title: string;
  path: string;
  icon: JSX.Element;
};

const SidebarLink = ({ link }: { link: SidebarLinkType }) => {
  const pathname = usePathname();

  return (
    <Link
      className={`p-3 flex items-center justify-center md:justify-start gap-2 rounded-md text-lg font-medium my-2 hover:bg-blue-500 hover:text-white dark:hover:bg-white dark:hover:text-black
       ${
         pathname === link.path &&
         "bg-blue-500 dark:bg-white text-white dark:text-black"
       }`}
      href={link.path}
    >
      {link.icon}
      <span className="hidden md:block">{link.title}</span>
    </Link>
  );
};

export default SidebarLink;
