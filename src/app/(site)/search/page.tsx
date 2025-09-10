import PaginatedPostList from "@/components/site/PaginatedPostList";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    sort?: string;
  }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const q = (await searchParams).q || "";
  const category = (await searchParams).category || "";
  const sort = (await searchParams).sort || "newest";

  return (
    <div>
      <h1 className="text-lg text-center mb-2">
        Search result for <b>{q}</b>
      </h1>
      <PaginatedPostList page={page} q={q} category={category} sort={sort} />
    </div>
  );
};

export default SearchPage;
