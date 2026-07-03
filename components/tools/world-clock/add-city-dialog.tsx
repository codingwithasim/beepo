"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { City } from "./use-world-clock";
import { LucidePlus } from "lucide-react";

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

      if (city) setQuery(city.name);
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
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {initialTimezone ? "Change City" : "Add City"}
            </DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="mt-4 max-h-60 space-y-2 overflow-auto">
            {results.map((city) => (
              <button
                key={city.timezone}
                onClick={() => handleSelect(city)}
                className="w-full rounded-md border p-2 text-left hover:bg-muted"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-xs text-muted-foreground">
                  {city.timezone}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}