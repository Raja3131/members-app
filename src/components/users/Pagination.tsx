"use client";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
};

export default function Pagination({
  page, pageSize, total, onPageChange, onPageSizeChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm">
        Page {page} of {totalPages} • {total} items
      </span>
      <button
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>

      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="ml-2 rounded-lg border px-2 py-1"
      >
        {[5, 10, 20, 50].map((s) => (
          <option key={s} value={s}>{s} / page</option>
        ))}
      </select>
    </div>
  );
}
