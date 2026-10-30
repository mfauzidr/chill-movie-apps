import SearchField from "../../molecules/SearchField";
import type { ContentType } from "../../../data/content";

export type ContentFilter = "all" | ContentType;

interface ContentToolbarProps {
  search: string;
  filter: ContentFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ContentFilter) => void;
  onAdd: () => void;
}

const ContentToolbar = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
  onAdd,
}: ContentToolbarProps) => (
  <div className="flex flex-col gap-4 rounded-xl border border-text-light/15 bg-body-background p-4 sm:flex-row sm:items-end sm:justify-between">
    <SearchField value={search} onChange={onSearchChange} />
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-text-light sm:w-40">
        Type
        <select
          value={filter}
          onChange={(event) =>
            onFilterChange(event.target.value as ContentFilter)
          }
          className="rounded-lg border border-text-light/23 bg-paper-background px-3 py-2.5 text-sm text-text-light focus:border-primary focus:outline-none"
        >
          <option value="all">All</option>
          <option value="film">Film</option>
          <option value="series">Series</option>
        </select>
      </label>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-hover"
      >
        Add Content
      </button>
    </div>
  </div>
);

export default ContentToolbar;
