import InputField from "../../molecules/InputField";

interface ContentImageUploadFieldProps {
  id: string;
  label: string;
  value: string;
  kind: "posters" | "banners";
  error?: string;
  onChange: (file?: File) => void;
}

const imageSource = (value: string, kind: "posters" | "banners") => {
  if (
    !value ||
    value.startsWith("blob:") ||
    value.startsWith("http") ||
    value.startsWith("/") ||
    value.startsWith("data:")
  )
    return value;
  return `/assets/${kind}/${value}`;
};

const ContentImageUploadField = ({
  id,
  label,
  value,
  kind,
  error,
  onChange,
}: ContentImageUploadFieldProps) => (
  <div className="flex flex-col gap-2">
    <InputField
      id={id}
      type="file"
      label={label}
      accept="image/jpeg,image/png,image/webp"
      onChange={(event) => onChange(event.target.files?.[0])}
      error={error}
    />
    {value ? (
      <img
        src={imageSource(value, kind)}
        alt={`${label} preview`}
        className="h-28 w-full rounded-lg object-cover"
      />
    ) : (
      <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-text-light/23 text-xs text-greyscale-500">
        No {label.toLowerCase()} selected
      </div>
    )}
  </div>
);

export default ContentImageUploadField;

