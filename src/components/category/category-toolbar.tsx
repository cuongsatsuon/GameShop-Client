"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Account } from "@/types";
import { AccountGrid } from "@/components/product/account-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Sort = "newest" | "price-asc" | "price-desc";

const sortOptions: { label: string; value: Sort }[] = [
  { label: "Mới nhất", value: "newest" },
  { label: "Giá thấp đến cao", value: "price-asc" },
  { label: "Giá cao đến thấp", value: "price-desc" },
];

/** Client-side search + sort toolbar over a category's accounts. */
export function CategoryToolbar({ accounts }: { accounts: Account[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const result = useMemo(() => {
    const q = query.toLowerCase();
    const filtered = accounts.filter(
      (a) => String(a.id).includes(query) || a.seller.toLowerCase().includes(q)
    );
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [accounts, query, sort]);

  return (
    <div>
      <div className="surface flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo ID, người đăng..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSort(option.value)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                sort === option.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-secondary/50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <Button variant="outline">
          <SlidersHorizontal className="h-4 w-4" /> Bộ lọc
        </Button>
      </div>

      {result.length > 0 ? (
        <AccountGrid accounts={result} className="mt-6" />
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          Không tìm thấy nick phù hợp.
        </div>
      )}
    </div>
  );
}
