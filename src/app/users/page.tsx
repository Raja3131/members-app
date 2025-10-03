"use client";

import { useEffect, useMemo, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import {UserTable} from "@/components/users/UserTable";
import Pagination from "@/components/users/Pagination";
import {SearchBox} from "@/components/users/SearchBox";
import CountryFilter from "@/components/users/CountryFilter";

type User = {
  id: number;
  name: string;
  company: string;
  username: string;
  email: string;
  address: string;
  zip: string;
  state: string;
  country: string;
  phone: string;
  photo: string;
};

export default function UsersPage() {
  const { data, loading, error } = useFetch<User[]>(
    "https://dummy-json.mock.beeceptor.com/users"
  );

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const countries = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map((u) => u.country))).filter(Boolean) as string[];
  }, [data]);

  const filtered = useMemo<User[]>(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();

    return data.filter((row) => {
      const matchesSearch = !q
        ? true
        : Object.values(row).some((v) =>
            String(v ?? "").toLowerCase().includes(q)
          );
      const matchesCountry = country ? row.country === country : true;
      return matchesSearch && matchesCountry;
    });
  }, [data, query, country]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (page > totalPages) setPage(totalPages);
  }, [filtered.length, pageSize, page]);

  const paginated = useMemo<User[]>(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handlePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  if (loading) return <main className="p-6">Loading…</main>;
  if (error) return <main className="p-6 text-red-500">Error: {String(error)}</main>;
  if (!data) return <main className="p-6">No data</main>;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Members</h1>

      <div className="mb-4 flex flex-wrap gap-4">
        <SearchBox
          value={query}
          onChange={handleSearch}
          placeholder="Search all columns…"
        />
        <CountryFilter
          countries={countries}
          value={country}
          onChange={(val) => {
            setCountry(val);
            setPage(1);
          }}
        />
      </div>

      <UserTable data={paginated} />

      <Pagination
        page={page}
        pageSize={pageSize}
        total={filtered.length}
        onPageChange={setPage}
        onPageSizeChange={handlePageSize}
      />
    </main>
  );
}
