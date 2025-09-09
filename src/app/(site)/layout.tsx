import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-5">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
