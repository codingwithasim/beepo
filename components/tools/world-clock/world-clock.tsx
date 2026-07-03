"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useWorldClock } from "./use-world-clock";
import { CityDialog } from "./add-city-dialog";
import { TimezoneCard } from "./timezone-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";

export function WorldClockTool() {
  const clock = useWorldClock();

  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="h-full w-full rounded-3xl bg-background shadow-none ring-0">
        <CardContent className="flex flex-col gap-4 py-5">
          
          {/* GRID */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clock.cities.map((city) => (
              <TimezoneCard
                key={city.timezone}
                city={city.name}
                country={city.countryCode}
                time={clock.getTime(city.timezone)}
                date={clock.getDate(city.timezone)}
                gmt={clock.getGMT(city.timezone)}
                offset={clock.getTimeDifference(city.timezone)}
                onDelete={() => clock.removeCity(city.timezone)}
                onEdit={() => clock.openEditCity(city.timezone)}
              />
            ))}
          </div>

          {/* ADD / EDIT DIALOG */}
          <CityDialog
            searchCities={clock.searchCities}
            initialTimezone={clock.editingTimezone}
            open={!!clock.editingTimezone || isAddOpen}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                clock.closeEditCity();
                setIsAddOpen(false);
              }
            }}
            onSelect={(city) => {
              if (clock.editingTimezone) {
                clock.updateCity(clock.editingTimezone, city);
                clock.closeEditCity();
              } else {
                clock.addCity(city);
                setIsAddOpen(false);
              }
            }}
          />
        </CardContent>
      </Card>

      <Button
        onClick={() => setIsAddOpen(true)}
        className="fixed bottom-6 right-6 size-14 rounded-2xl shadow-lg"
      >
        <LucidePlus/>
      </Button>
    </div>
  );
}