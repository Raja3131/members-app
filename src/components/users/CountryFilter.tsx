"use client";

type Props = {
  countries: string[];
  value: string;
  onChange: (v: string) => void;
};

export default function CountryFilter({ countries, value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border px-3 py-2"
    >
      <option value="">All Countries</option>
      {countries.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
