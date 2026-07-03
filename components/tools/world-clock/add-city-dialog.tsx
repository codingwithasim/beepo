"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { City } from "./use-world-clock";
import { LucideMap } from "lucide-react";

// your Empty UI (assuming it's already defined in your system)
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

type Props = {
  searchCities: (query: string) => City[];
  onSelect: (city: City) => void;

  open: boolean;
  onOpenChange: (open: boolean) => void;

  initialTimezone?: string | null;
};

export function CityDialog({
  searchCities,
  onSelect,
  initialTimezone,
  open,
  onOpenChange,
}: Props) {
  const [query, setQuery] = useState("");

  const results = searchCities(query);

  useEffect(() => {
    if (!open) return;

    if (initialTimezone) {
      const city = searchCities("").find(
        (c) => c.timezone === initialTimezone
      );
      setQuery(city?.name ?? "");
    } else {
      setQuery("");
    }
  }, [open, initialTimezone]);

  function handleSelect(city: City) {
    onSelect(city);
    setQuery("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        
        {/* Header */}
        <div className="border-b px-5 py-4">
          <DialogHeader>
            <DialogTitle className="text-base">
              {initialTimezone ? "Change City" : "Add City"}
            </DialogTitle>
          </DialogHeader>

          {/* Search */}
          <div className="mt-3">
            <Input
              autoFocus
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <LucideMap className="size-5" />
                  </EmptyMedia>
                </EmptyHeader>

                <EmptyTitle>No cities found</EmptyTitle>

                <EmptyDescription>
                  Try searching "Paris", "Tokyo", or "New York"
                </EmptyDescription>
              </Empty>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((city) => (
                <button
                  key={city.timezone}
                  onClick={() => handleSelect(city)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-muted"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{city.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {city.timezone}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {city.countryCode.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}