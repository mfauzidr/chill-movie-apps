
import { useCallback, useEffect, useRef, useState } from "react";
import type { Content, ContentType } from "../../../data/content";
import InputField from "../../molecules/InputField";
import ContentImageUploadField from "../molecules/ContentImageUploadField";

type FormValues = {
  title: string;
  type: ContentType;
  poster: string;
  banner: string;
  ageRating: string;
  genres: string;
  duration: string;
  episodes: string;
  seasons: string;
  episodeDuration: string;
  isTrending: boolean;
  isContinueWatching: boolean;
  isNew: boolean;
  isTopTen: boolean;
};

type FieldName = Exclude<keyof FormValues, "type" | "isTrending" | "isContinueWatching" | "isNew" | "isTopTen">;
type FormErrors = Partial<Record<FieldName, string>>;

type ValidationRule = (
  value: string,
  values: FormValues,
) => string | undefined;

type InputType = "text" | "number";

const emptyValues: FormValues = {
  title: "",
  type: "film",
  poster: "",
  banner: "",
  ageRating: "",
  genres: "",
  duration: "",
  episodes: "",
  seasons: "",
  episodeDuration: "",
  isTrending: false,
  isContinueWatching: false,
  isNew: false,
  isTopTen: false,
};

const isPositiveNumber = (value: string) =>
  /^\d+$/.test(value) && Number(value) > 0;

const fromContent = (content: Content): FormValues => ({
  title: content.title,
  type: content.type,
  poster: content.poster,
  banner: content.banner,
  ageRating: content.ageRating,
  genres: content.genres.join(", "),
  duration: content.duration ?? "",
  episodes: content.episodes?.toString() ?? "",
  seasons: content.seasons?.toString() ?? "",
  episodeDuration: content.episodeDuration ?? "",
  isTrending: content.isTrending,
  isContinueWatching: content.isContinueWatching,
  isNew: content.isNew ?? false,
  isTopTen: content.isTopTen ?? false,
});

// Validation rules
const commonRules: Partial<Record<FieldName, ValidationRule>> = {
  title: (value) =>
    value.trim() ? undefined : "Title is required.",

  ageRating: (value) =>
    value.trim() ? undefined : "Age rating is required.",

  genres: (value) =>
    value.split(",").some((genre) => genre.trim())
      ? undefined
      : "Enter at least one genre.",

  poster: (value) =>
    value ? undefined : "Poster is required.",

  banner: (value) =>
    value ? undefined : "Banner is required.",
};

const typeRules: Record<
  ContentType,
  Partial<Record<FieldName, ValidationRule>>
> = {
  film: {
    duration: (value) =>
      value.trim() ? undefined : "Duration is required for a film.",
  },

  series: {
    episodes: (value) =>
      isPositiveNumber(value)
        ? undefined
        : "Episodes must be a positive number.",

    seasons: (value) =>
      !value.trim() || isPositiveNumber(value)
        ? undefined
        : "Seasons must be a positive number.",
  },
};

const getFieldError = (field: FieldName, values: FormValues) => {
  const rule = commonRules[field] ?? typeRules[values.type][field];
  return rule?.(values[field], values);
};

interface Props {
  content: Content | null;
  onClose: () => void;
  onSubmit: (content: Omit<Content, "id">) => void;
}

const ContentFormModal = ({ content, onClose, onSubmit }: Props) => {
  const [values, setValues] = useState<FormValues>(() =>
    content ? fromContent(content) : emptyValues,
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const temporaryUrls = useRef(new Set<string>());
  const isSubmitting = useRef(false);

  const isEdit = Boolean(content);

  // Update form when the selected content changes.
  useEffect(() => {
    setValues(content ? fromContent(content) : emptyValues);
    setErrors({});
    isSubmitting.current = false;

    temporaryUrls.current.forEach((url) => URL.revokeObjectURL(url));
    temporaryUrls.current.clear();
  }, [content]);

  // Cleanup temporary image URLs when the modal unmounts.
  useEffect(() => {
    return () => {
      temporaryUrls.current.forEach((url) => URL.revokeObjectURL(url));
      temporaryUrls.current.clear();
    };
  }, []);

  const close = useCallback(() => {
    temporaryUrls.current.forEach((url) => URL.revokeObjectURL(url));
    temporaryUrls.current.clear();
    onClose();
  }, [onClose]);

  // Close modal with Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [close]);

  const set = (field: keyof FormValues, value: string | boolean) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    setErrors((current) => {
      const nextErrors = { ...current };

      if (field === "type") {
        delete nextErrors.duration;
        delete nextErrors.episodes;
        delete nextErrors.seasons;
        delete nextErrors.episodeDuration;
        return nextErrors;
      }

      if (field === "isTrending" || field === "isContinueWatching" || field === "isNew" || field === "isTopTen") {
        return nextErrors;
      }

      const error = getFieldError(field, nextValues);
      if (error) {
        nextErrors[field] = error;
      } else {
        delete nextErrors[field];
      }

      return nextErrors;
    });
  };

  const chooseImage = (field: "poster" | "banner", file?: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors((current) => ({
        ...current,
        [field]: "Use a JPG, PNG, or WebP image.",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        [field]: "Image must be 2 MB or smaller.",
      }));
      return;
    }

    const previousUrl = values[field];

    if (temporaryUrls.current.delete(previousUrl)) {
      URL.revokeObjectURL(previousUrl);
    }

    const newUrl = URL.createObjectURL(file);

    temporaryUrls.current.add(newUrl);
    set(field, newUrl);
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const fields: FieldName[] = values.type === "film"
      ? ["title", "ageRating", "genres", "poster", "banner", "duration"]
      : ["title", "ageRating", "genres", "poster", "banner", "episodes", "seasons"];

    fields.forEach((field) => {
      const error = getFieldError(field, values);

      if (error) {
        nextErrors[field] = error;
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting.current) return;
    if (!validate()) return;

    isSubmitting.current = true;

    const submitted: Omit<Content, "id"> = {
      title: values.title.trim(),
      type: values.type,
      poster: values.poster,
      banner: values.banner,
      ageRating: values.ageRating.trim(),
      isTrending: values.isTrending,
      isContinueWatching: values.isContinueWatching,
      isNew: values.isNew,
      isTopTen: values.isTopTen,
      genres: values.genres
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
    };

    if (values.type === "film") {
      submitted.duration = values.duration.trim();
    } else {
      submitted.episodes = Number(values.episodes);

      if (values.seasons.trim()) {
        submitted.seasons = Number(values.seasons);
      }

      if (values.episodeDuration.trim()) {
        submitted.episodeDuration = values.episodeDuration.trim();
      }
    }

    // Keep submitted image URLs alive after the modal closes.
    temporaryUrls.current.delete(values.poster);
    temporaryUrls.current.delete(values.banner);

    onSubmit(submitted);
    onClose();
  };

  const field = (
    name: FieldName,
    label: string,
    type: InputType = "text",
    placeholder = "",
  ) => (
    <InputField
      id={`content-${name}`}
      label={label}
      type={type}
      value={values[name]}
      onChange={(event) => set(name, event.target.value)}
      placeholder={placeholder}
      error={errors[name]}
      inputClassName="rounded-lg bg-trasnparent py-2.5 text-text-light md:px-3 md:py-2.5"
    />
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="content-form-title"
    >
      <form
        onSubmit={submit}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-xl border border-text-light/15 bg-body-background p-5 shadow-2xl md:p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="content-form-title" className="text-xl font-bold">
            {isEdit ? "Edit Content" : "Add Content"}
          </h2>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-2xl text-greyscale-400 hover:text-text-light"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {field("title", "Title")}

          <label className="flex flex-col gap-1.5 text-sm font-medium text-text-light">
            Type

            <select
              value={values.type}
              onChange={(event) => {
                const type = event.target.value;
                if (type === "film" || type === "series") set("type", type);
              }}
              className="rounded-lg border border-text-light/23 bg-body-background px-3 py-2.5 text-text-light md:px-3.5 md:py-3 md:text-sm lg:px-4 lg:py-4 lg:text-base focus:border-white focus:outline-none"
            >
              <option value="film">Film</option>
              <option value="series">Series</option>
            </select>
          </label>

          {field("ageRating", "Age Rating", "text", "e.g. 13+")}
          {field("genres", "Genres", "text", "Separate with commas")}

          <ContentImageUploadField
            id="content-poster"
            label="Poster"
            value={values.poster}
            kind="posters"
            error={errors.poster}
            onChange={(file) => chooseImage("poster", file)}
          />

          <ContentImageUploadField
            id="content-banner"
            label="Banner"
            value={values.banner}
            kind="banners"
            error={errors.banner}
            onChange={(file) => chooseImage("banner", file)}
          />

          {values.type === "film" ? (
            field("duration", "Duration", "text", "e.g. 2j 10m")
          ) : (
            <>
              {field("episodes", "Episodes", "number")}
              {field("seasons", "Seasons (optional)", "number")}
              {field(
                "episodeDuration",
                "Episode Duration (optional)",
                "text",
                "e.g. 45m",
              )}
            </>
          )}

          <div className="flex flex-col gap-3 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-light">
              <input
                type="checkbox"
                checked={values.isTrending}
                onChange={(event) => set("isTrending", event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Trending
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-text-light">
              <input
                type="checkbox"
                checked={values.isContinueWatching}
                onChange={(event) => set("isContinueWatching", event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Continue Watching
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-text-light">
              <input
                type="checkbox"
                checked={values.isNew}
                onChange={(event) => set("isNew", event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Rilis Baru
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-text-light">
              <input
                type="checkbox"
                checked={values.isTopTen}
                onChange={(event) => set("isTopTen", event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              Top 10
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="rounded-lg border border-text-light/23 px-4 py-2.5 text-sm font-bold hover:bg-extra-background"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-hover"
          >
            {isEdit ? "Save Changes" : "Add Content"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentFormModal;
