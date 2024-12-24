'use client';

interface CategoryFilterProps {
  tags: Array<{ _id: string; name: string }>;
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

export default function CategoryFilter({
  tags,
  selectedTags,
  onTagToggle,
}: CategoryFilterProps) {
  return (
    <div className="w-full mb-8">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Filter by Technology</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => onTagToggle(tag._id)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
              ${
                selectedTags.includes(tag._id)
                  ? 'bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
