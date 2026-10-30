import type { Content } from "../../../data/content";

interface ContentListProps {
  contents: Content[];
  onEdit: (content: Content) => void;
  onDelete: (content: Content) => void;
}

const imageSource = (image: string) => image.startsWith("blob:") || image.startsWith("http") || image.startsWith("/") || image.startsWith("data:") ? image : `/assets/posters/${image}`;

const ContentList = ({ contents, onEdit, onDelete }: ContentListProps) => (
  <div className="flex flex-col gap-3 lg:hidden">
    {contents.map((content) => (
      <article
        key={content.id}
        className="flex gap-3 rounded-xl border border-text-light/15 bg-body-background p-3"
      >
        <img
          src={imageSource(content.poster)}
          alt={`${content.title} poster`}
          className="h-28 w-20 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <h2 className="wrap-break-word font-bold text-text-light">{content.title}</h2>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-xs leading-relaxed">
            <dt className="text-greyscale-500">Type</dt>
            <dd className="capitalize text-greyscale-300">{content.type}</dd>
            <dt className="text-greyscale-500">Rating</dt>
            <dd className="text-greyscale-300">{content.ageRating}</dd>
            <dt className="text-greyscale-500">Genres</dt>
            <dd className="wrap-break-word text-greyscale-300">{content.genres.join(", ")}</dd>
            <dt className="text-greyscale-500">{content.type === "film" ? "Duration" : "Episodes"}</dt>
            <dd className="text-greyscale-300">
              {content.type === "film" ? content.duration : `${content.episodes ?? 0} episodes`}
            </dd>
          </dl>
        </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => onEdit(content)} className="h-fit rounded-md border border-text-light/20 px-2.5 py-1 text-xs text-text-light hover:bg-extra-background">Edit</button>
            <button type="button" onClick={() => onDelete(content)} className="h-fit rounded-md border border-error/60 px-2.5 py-1 text-xs text-error hover:bg-error/10">Delete</button>
          </div>
      </article>
    ))}
  </div>
);

export default ContentList;
