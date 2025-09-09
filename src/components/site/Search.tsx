"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [q, setQ] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setQ(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimQuery = q.trim();

    if (trimQuery) {
      router.push(`/search?q=${trimQuery}`);
    }
  };

  return (
    <form
      className="border border-borderColor rounded-lg p-1 w-1/4 lg:w-1/3 flex items-center justify-between gap-2 focus-within:ring-focusColor focus-within:ring-1"
      onSubmit={handleSearch}
    >
      <input
        className="w-full ring-0 pl-1"
        type="text"
        placeholder="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="pr-1 cursor-pointer">
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
