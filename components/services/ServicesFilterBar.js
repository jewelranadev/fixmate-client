import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import { CATEGORIES, SERVICE_MODES } from "@/lib/constants";

/**
 * ServicesFilterBar — a plain HTML GET form. No "use client", no handlers,
 * no validation, no URL syncing: the browser submits to /services and the
 * server decides what to do with the query string.
 *
 * TODO: Wired by owner in manual phase M5 (server-side search/filter/sort).
 *
 * Layout: one row on desktop, two rows on tablet (search, then the three
 * selects + actions), stacked full-width on mobile.
 */

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const labelClass = "text-xs font-semibold uppercase tracking-[0.08em] text-muted";

export default function ServicesFilterBar({ defaultValues = {} }) {
  const {
    q = "",
    category = "",
    serviceMode = "",
    sort = "newest",
  } = defaultValues;

  return (
    <form
      action="/services"
      method="get"
      role="search"
      aria-label="Filter services"
      className="rounded-card border border-border bg-surface p-4 shadow-xs sm:p-5"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.9fr))_auto] lg:items-end">
        <div className="space-y-1.5 md:col-span-4 lg:col-span-1">
          <Label htmlFor="services-q" className={labelClass}>
            Search
          </Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <Input
              id="services-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Search by title or category"
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="services-category" className={labelClass}>
            Category
          </Label>
          <Select
            id="services-category"
            name="category"
            defaultValue={category}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="services-mode" className={labelClass}>
            Service mode
          </Label>
          <Select
            id="services-mode"
            name="serviceMode"
            defaultValue={serviceMode}
          >
            <option value="">All modes</option>
            {SERVICE_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="services-sort" className={labelClass}>
            Sort by
          </Label>
          <Select id="services-sort" name="sort" defaultValue={sort}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-2 md:col-span-1">
          <Button type="submit" className="flex-1 lg:flex-none">
            Search
          </Button>
          <Button href="/services" variant="ghost" className="flex-1 lg:flex-none">
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
