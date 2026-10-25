interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchField = ({ value, onChange }: SearchFieldProps) => (
  <label className="flex w-full flex-col gap-1.5 text-sm font-medium text-text-light sm:max-w-sm">
    Search title
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search film or series"
      className="w-full rounded-lg border border-text-light/23 bg-paper-background px-3 py-2.5 text-sm text-text-light placeholder:text-greyscale-500 focus:border-primary focus:outline-none"
    />
  </label>
);

export default SearchField;
