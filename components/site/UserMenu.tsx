"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import LogoutForm from "../shared/LogoutForm";

const UserMenu = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Image
          src={session?.user?.image || "/noavatar.png"}
          width={32}
          height={32}
          alt={session?.user?.name || "user avatar"}
          className="w-8 h-8 object-cover rounded-full"
        />
      </div>
      {open && (
        <div className="absolute top-9 -right-8 md:right-0 w-65 p-5 bg-slate-200 dark:bg-slate-800 rounded-xl flex flex-col items-center gap-1">
          <Image
            src={session?.user?.image || "/noavatar.png"}
            width={48}
            height={48}
            alt={session?.user?.name || "user avatar"}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="flex flex-col items-center">
            <h1>{session?.user?.name}</h1>
            <h1>{session?.user?.email}</h1>
          </div>
          <div className="w-full flex items-center gap-3 mt-1 text-white">
            <Link
              href="/update-user"
              className="flex-1 p-1 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 rounded-md font-medium text-center"
              onClick={() => setOpen(false)}
            >
              Update
            </Link>
            <LogoutForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
