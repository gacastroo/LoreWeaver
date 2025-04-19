import TagCard from "./TagCard";

export default function TagGrid({ tags, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tags.map((tag) => (
        <TagCard key={tag.id_Tag} tag={tag} onDelete={onDelete} />
      ))}
    </div>
  );
}
