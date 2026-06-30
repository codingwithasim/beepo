"use client";

import { Card, CardContent } from "@/components/ui/card";

import { useWorldClock } from "./use-world-clock";
import { ClockItem } from "./clock-item";
import { AddCityDialog } from "./add-city-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorldClockTool() {
  const clock = useWorldClock();

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-2xl ring-0 shadow-none rounded-3xl">
        <CardContent className="flex flex-col gap-4 py-10">

          <div className="mb-2 text-center">
            <h2 className="text-xl font-semibold">World Clock</h2>
            <p className="text-sm text-muted-foreground">
              Track time across cities
            </p>
          </div>

          <div className="space-y-3">
      {clock.cities.map((city, idx) => (
        <div
          key={idx}
          className="group relative flex items-center  rounded-xl border bg-card px-4 py-3 transition hover:shadow-md"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              {/* FLAG */}
              <img
                src={`https://flagcdn.com/w40/${city.countryCode}.png`}
                alt={city.name}
                className="h-5 w-7 rounded-sm object-cover shadow-sm"
              />

              {/* NAME */}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{city.name}</span>
                <span className="text-xs text-muted-foreground">
                  {city.timezone}
                </span>
              </div>
            </div>

            {/* TIME */}
            <div className="ml-auto mr-4 text-bs font-semibold tabular-nums">
              {clock.getTime(city.timezone)}
            </div>

            {/* REMOVE BUTTON */}
            <Button
              onClick={() => clock.removeCity(city.timezone)}
              variant={"secondary"}
              className="cursor-pointer"
            >
              <Trash2/>
            </Button>
          </div>
        ))}
  </div>

          <AddCityDialog
            searchCities={clock.searchCities}
            onAdd={clock.addCity}
          />

        </CardContent>
      </Card>
    </div>
  );
}