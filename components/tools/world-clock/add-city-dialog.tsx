"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { City } from "./use-world-clock";

type Props = {
  searchCities: (query: string) => City[];
  onAdd: (city: City) => void;
};

export function AddCityDialog({ searchCities, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = searchCities(query);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full">+ Add City</Button>}>
        
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add City</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-4 space-y-2 max-h-60 overflow-auto">
          {results.map((city, idx) => (
            <button
              key={idx}
              className="w-full rounded-md border p-2 text-left hover:bg-muted"
              onClick={() => {
                onAdd(city);
                setOpen(false);
                setQuery("");
              }}
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
  );
}