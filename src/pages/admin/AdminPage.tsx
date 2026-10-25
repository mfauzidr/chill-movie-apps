import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/molecules/Pagination";
import ContentList from "../../components/admin/organisms/ContentList";
import ContentTable from "../../components/admin/organisms/ContentTable";
import ContentToolbar, {
  type ContentFilter,
} from "../../components/admin/organisms/ContentToolbar";
import { useContentStore } from "../../stores/contentStore";

const PAGE_SIZE = 10;

const AdminPage = () => {
  const contents = useContentStore((state) => state.contents);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ContentFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredContents = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return contents.filter((content) => {
      const matchesSearch = content.title.toLocaleLowerCase().includes(query);
      const matchesType = filter === "all" || content.type === filter;

      return matchesSearch && matchesType;
    });
  }, [contents, filter, search]);

  const totalPages = Math.ceil(filteredContents.length / PAGE_SIZE);
  const validCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  useEffect(() => {
    setCurrentPage(validCurrentPage);
  }, [validCurrentPage]);

  const paginatedContents = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * PAGE_SIZE;
    return filteredContents.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredContents, validCurrentPage]);

  const firstResult = filteredContents.length === 0 ? 0 : (validCurrentPage - 1) * PAGE_SIZE + 1;
  const lastResult = Math.min(validCurrentPage * PAGE_SIZE, filteredContents.length);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: ContentFilter) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <section className="mx-auto w-full max-w-400 px-5 py-8 md:px-8 lg:px-12 lg:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-light md:text-3xl">Film &amp; Series</h1>
        <p className="mt-2 text-sm text-greyscale-400 md:text-base">
          Manage the film and series catalog.
        </p>
      </div>

      <ContentToolbar
        search={search}
        filter={filter}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <p className="my-4 text-sm text-greyscale-400" aria-live="polite">
        {filteredContents.length === 0
          ? "Showing 0 results"
          : `Showing ${firstResult}–${lastResult} of ${filteredContents.length} results`}
      </p>

      {filteredContents.length === 0 ? (
        <div className="rounded-xl border border-dashed border-text-light/23 bg-body-background px-6 py-16 text-center text-greyscale-400">
          No content matches the current search and filter.
        </div>
      ) : (
        <>
          <ContentTable contents={paginatedContents} />
          <ContentList contents={paginatedContents} />
        </>
      )}

      <Pagination
        currentPage={validCurrentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default AdminPage;
