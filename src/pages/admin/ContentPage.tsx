import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/molecules/Pagination";
import ContentList from "../../components/admin/organisms/ContentList";
import ContentTable from "../../components/admin/organisms/ContentTable";
import ContentToolbar, {
  type ContentFilter,
} from "../../components/admin/organisms/ContentToolbar";
import { useContentStore } from "../../stores/contentStore";
import type { Content } from "../../data/content";
import ContentFormModal from "../../components/admin/organisms/ContentFormModal";

const PAGE_SIZE = 10;

const ContentPage = () => {
  const contents = useContentStore((state) => state.contents);
  const addContent = useContentStore((state) => state.addContent);
  const updateContent = useContentStore((state) => state.updateContent);
  const deleteContent = useContentStore((state) => state.deleteContent);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ContentFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [formContent, setFormContent] = useState<Content | null | undefined>(
    undefined,
  );
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<Content | null>(null);

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

  const firstResult =
    filteredContents.length === 0 ? 0 : (validCurrentPage - 1) * PAGE_SIZE + 1;
  const lastResult = Math.min(
    validCurrentPage * PAGE_SIZE,
    filteredContents.length,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: ContentFilter) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const openCreateModal = () => {
    setFormContent(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (content: Content) => {
    setFormContent(content);
    setIsFormModalOpen(true);
  };

  return (
    <section className="mx-auto w-full max-w-400 px-5 py-8 md:px-8 lg:px-12 lg:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-light md:text-3xl">
          Film &amp; Series
        </h1>
        <p className="mt-2 text-sm text-greyscale-400 md:text-base">
          Manage the film and series catalog.
        </p>
      </div>

      <ContentToolbar
        search={search}
        filter={filter}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onAdd={openCreateModal}
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
          <ContentTable
            contents={paginatedContents}
            onEdit={openEditModal}
            onDelete={setContentToDelete}
          />
          <ContentList
            contents={paginatedContents}
            onEdit={openEditModal}
            onDelete={setContentToDelete}
          />
        </>
      )}

      <Pagination
        currentPage={validCurrentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {isFormModalOpen && formContent !== undefined && (
        <ContentFormModal
          content={formContent}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={(content) =>
            formContent
              ? updateContent(formContent.id, content)
              : addContent(content)
          }
        />
      )}
      {contentToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div className="w-full max-w-md rounded-xl border border-text-light/15 bg-body-background p-6 shadow-2xl">
            <h2 id="delete-title" className="text-xl font-bold">
              Delete Content
            </h2>
            <p className="mt-3 text-greyscale-300">
              Are you sure you want to delete{" "}
              <span className="font-bold text-text-light">
                {contentToDelete.title}
              </span>
              ? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setContentToDelete(null)}
                className="rounded-lg border border-text-light/23 px-4 py-2.5 text-sm font-bold hover:bg-extra-background"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteContent(contentToDelete.id);
                  setContentToDelete(null);
                }}
                className="rounded-lg bg-error px-4 py-2.5 text-sm font-bold text-white hover:bg-error-hover"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContentPage;
