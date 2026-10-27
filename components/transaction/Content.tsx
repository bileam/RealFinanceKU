
// from ai

"use client";

import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// const USER_ID = "de2ce9d4-a628-46a2-9784-48710c51f46f";
const LIMIT = 5;

type Transaction = {
  id: string;
  category: {
    id: string;
    name: string;
    type: string;
  };
  type: string;
  amount: number | string;
  description: string | null;
  transactionDate: string;
  status: string;
};

type Category = {
  id: string;
  name: string;
  type: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  count: number;
  data: Transaction[];
  pagination: {
    currentpage: number;
    limit: number;
    totalData: number;
    totalPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

type CategoriesResponse = {
  success: boolean;
  message?: string;
  data: Category[];
};

type Filters = {
  type: string;
  categoryId: string;
  startDate: string;
  endDate: string;
};

const initialFilters: Filters = {
  type: "",
  categoryId: "",
  startDate: "",
  endDate: "",
};

const formatRupiah = (amount: number) =>
  `Rp ${new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(amount)}`;

const formatTanggal = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function Content() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);

  // Filter yang sedang dipilih pengguna.
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Filter yang sudah diterapkan ke API.
  const [appliedFilters, setAppliedFilters] =
    useState<Filters>(initialFilters);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const response = await fetch(`http://localhost:3000/api/categories?type=all`, {
          signal: controller.signal,
        });
        const result: CategoriesResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil kategori");
        }

        setCategories(result.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setCategoryError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mengambil kategori"
          );
        }
      }
    }

    void fetchCategories();

    return () => controller.abort();
  }, []);

  // Ambil transaksi setiap halaman atau filter berubah.
  const fetchTransactions = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        // idUser: USER_ID,
        page: String(currentPage),
        limit: String(LIMIT),
      });

      if (appliedFilters.type) {
        params.set("type", appliedFilters.type);
      }

      if (appliedFilters.categoryId) {
        params.set("categoryId", appliedFilters.categoryId);
      }

      if (appliedFilters.startDate) {
        params.set("startDate", appliedFilters.startDate);
      }

      if (appliedFilters.endDate) {
        params.set("endDate", appliedFilters.endDate);
      }

      const response = await fetch(
        `/api/transaksi?${params.toString()}`,
        { signal }
      );

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal mengambil data transaksi"
        );
      }

      setTransactions(result.data);
      setTotalData(result.pagination.totalData);
      setTotalPages(result.pagination.totalPage);
    } catch (err) {
      if (signal.aborted) {
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data"
      );
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [currentPage, appliedFilters]);

  useEffect(() => {
    const controller = new AbortController();

    void Promise.resolve().then(() => fetchTransactions(controller.signal));

    return () => controller.abort();
  }, [fetchTransactions]);

  // Terapkan filter dan kembali ke halaman pertama.
  function applyFilters() {
    setCurrentPage(1);
    setAppliedFilters({ ...filters });
  }

  function resetFilters() {
    setFilters(initialFilters);
    setCurrentPage(1);
    setAppliedFilters({ ...initialFilters });
  }

  const firstData =
    totalData === 0 ? 0 : (currentPage - 1) * LIMIT + 1;

  const lastData = Math.min(currentPage * LIMIT, totalData);

  return (
    <div className="flex flex-col gap-2">
      {/* FILTER */}
      <div className="flex w-full flex-col gap-3 py-3 sm:flex-row sm:flex-wrap">
        {/* Filter tipe */}
        <select
          aria-label="Filter tipe transaksi"
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:border-slate-600 sm:w-48"
        >
          <option value="">Semua Tipe</option>
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>

        {/* Filter kategori */}
        <select
          aria-label="Filter kategori transaksi"
          value={filters.categoryId}
          onChange={(e) =>
            setFilters({
              ...filters,
              categoryId: e.target.value,
            })
          }
          className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-surface dark:text-slate-200 dark:hover:border-slate-600 sm:w-48"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Filter tanggal awal */}
        <input
          aria-label="Tanggal mulai"
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              startDate: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-surface dark:text-slate-200 sm:w-44"
        />
        {/* Filter tanggal akhir */}
        <input
          aria-label="Tanggal akhir"
          type="date"
          value={filters.endDate}
          min={filters.startDate || undefined}
          onChange={(e) =>
            setFilters({
              ...filters,
              endDate: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-surface dark:text-slate-200 sm:w-44"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={applyFilters}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <Filter size={16} />
            Filter
          </button>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-surface dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>
      {/* {categoryError && (
        <p role="alert" className="text-sm text-rose-600">
          {categoryError}
        </p>
      )} */}

      {/* DAFTAR TRANSAKSI */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-surface">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Daftar Transaksi
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Total {totalData} transaksi
            </p>
          </div>
        </div>

        <div
          aria-busy={loading}
          className="relative min-h-[360px] overflow-x-auto"
        >
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <th className="rounded-l-xl px-4 py-4">Tanggal</th>
                <th className="px-4 py-4">Deskripsi</th>
                <th className="px-4 py-4">Kategori</th>
                <th className="px-4 py-4">Tipe</th>
                <th className="px-4 py-4 text-right">Jumlah</th>
                <th className="rounded-r-xl px-4 py-4 text-center">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                Array.from({ length: LIMIT }, (_, rowIndex) => (
                  <tr
                    key={`loading-${rowIndex}`}
                    aria-hidden="true"
                    className="transaction-skeleton-row"
                  >
                    {[28, 36, 24, 20, 28, 18].map((width, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={`px-4 py-5 ${columnIndex === 4 ? "text-right" : ""
                          } ${columnIndex === 5 ? "text-center" : ""}`}
                      >
                        <div
                          className="transaction-skeleton-bar h-2 rounded-full"
                          style={{
                            width: `${width * (rowIndex % 2 === 0 ? 1 : 0.85)}%`,
                            animationDelay: `${rowIndex * 80 + columnIndex * 35}ms`,
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-rose-600"
                  >
                    {error}
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    Tidak ada transaksi yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                transactions.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/60"
                  >
                    <td className="whitespace-nowrap px-4 py-5 text-slate-500 dark:text-slate-400">
                      {formatTanggal(item.transactionDate)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-5 font-semibold text-slate-700 dark:text-slate-200">
                      {item.description || "Tanpa deskripsi"}
                    </td>

                    <td className="px-4 py-5 text-slate-600 dark:text-slate-300">
                      {item.category?.name || "—"}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.type === "income"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                          }`}
                      >
                        {item.type === "income"
                          ? "Pemasukan"
                          : "Pengeluaran"}
                      </span>
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-5 text-right font-semibold tabular-nums ${item.type === "income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                        }`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {formatRupiah(Number(item.amount))}
                    </td>

                    <td className="px-4 py-5 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "success"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                          }`}
                      >
                        {item.status === "success"
                          ? "Berhasil"
                          : item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {error && transactions.length > 0 && !loading && (
            <div
              role="alert"
              className="absolute inset-x-0 top-0 flex justify-center bg-white/90 px-4 py-3 text-sm text-rose-600 dark:bg-surface/90"
            >
              {error}
            </div>
          )}
        </div>

        {/* FOOTER DAN PAGINATION */}
        <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Menampilkan{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {firstData}–{lastData}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {totalData}
            </span>{" "}
            data
          </p>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={loading || currentPage <= 1 || totalPages === 0}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-slate-800"
            >
              <ChevronLeft size={17} />
            </button>

            {(() => {
              const pages = [];
              const maxVisiblePages = 4;

              if (totalPages <= maxVisiblePages) {
                // Show all pages if totalPages is less than or equal to maxVisiblePages
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Always show the first page
                pages.push(1);

                // Show ellipsis if currentPage is far from the first page
                if (currentPage > 3) {
                  pages.push("...");
                }

                // Show the current page and its neighbors
                const startPage = Math.max(2, currentPage - 1);
                const endPage = Math.min(totalPages - 1, currentPage + 1);

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
                }

                // Show ellipsis if currentPage is far from the last page
                if (currentPage < totalPages - 2) {
                  pages.push("...");
                }

                // Always show the last page
                pages.push(totalPages);
              }

              return pages.map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    disabled={loading}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${currentPage === page
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-surface dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
                      }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={`ellipsis-${index}`}
                    className="h-9 min-w-9 flex items-center justify-center text-sm text-slate-600 dark:text-slate-300"
                  >
                    ...
                  </span>
                )
              );
            })()}

            <button
              type="button"
              aria-label="Halaman berikutnya"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={loading || currentPage >= totalPages || totalPages === 0}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-slate-800"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
