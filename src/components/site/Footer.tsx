import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-15 my-5 grid grid-cols-2 text-center gap-y-15 md:text-left md:flex md:justify-between">
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <Link href="/" className="text-xl font-medium">
          TRENDBLOG
        </Link>
        <p className="">© 2025 Trendpost.</p>
        <p className="">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <p className="text-base">Links</p>
        <Link href="/">Homepage</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <p className="text-base">Links</p>
        <Link href="/">All Posts</Link>
        <Link href="/">Featured Post</Link>
        <Link href="/">Most Popular Post</Link>
      </div>
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <p className="text-base">Links</p>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Blog</Link>
        <Link href="/">Affiliate Program</Link>
      </div>
    </div>
  );
};

export default Footer;
