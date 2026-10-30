import InputField from "./InputField";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchField = ({ value, onChange }: SearchFieldProps) => (
  <InputField
    id="content-search"
    label="Search title"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder="Search film or series"
    containerClassName="sm:max-w-sm"
    labelClassName="text-sm"
    inputClassName="rounded-lg border bg-paper-background px-3 py-2.5 text-sm text-text-light placeholder:text-greyscale-500 focus:border-primary md:px-3 md:py-2.5"
  />
);

export default SearchField;
