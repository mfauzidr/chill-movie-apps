import type { Content } from "../../../data/content";

interface ContentTableProps {
  contents: Content[];
}

const ContentTable = ({ contents }: ContentTableProps) => {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-text-light/15 bg-body-background lg:block">
      <table className="w-full min-w-230 text-left text-sm">
        <thead className="border-b border-text-light/15 bg-paper-background text-xs uppercase tracking-wide text-greyscale-400">
          <tr>
            <th className="px-4 py-3 font-medium">Poster</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Age Rating</th>
            <th className="px-4 py-3 font-medium">Genres</th>
            <th className="px-4 py-3 font-medium">Duration / Episodes</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-text-light/10">
          {contents.map((content) => (
            <tr key={content.id} className="text-greyscale-300">
              <td className="px-4 py-3">
                <img
                  src={`/assets/posters/${content.poster}`}
                  alt={`${content.title} poster`}
                  className="h-14 w-10 rounded object-cover"
                />
              </td>
              <td className="px-4 py-3 font-bold text-text-light">{content.title}</td>
              <td className="px-4 py-3 capitalize">{content.type}</td>
              <td className="px-4 py-3">{content.ageRating}</td>
              <td className="px-4 py-3">{content.genres.join(", ")}</td>
              <td className="px-4 py-3">
                {content.type === "film"
                  ? content.duration
                  : `${content.episodes ?? 0} episodes`}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button type="button" disabled className="cursor-not-allowed rounded-md border border-text-light/20 px-2.5 py-1 text-xs text-greyscale-500">Edit</button>
                  <button type="button" disabled className="cursor-not-allowed rounded-md border border-text-light/20 px-2.5 py-1 text-xs text-greyscale-500">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
