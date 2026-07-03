"use client";

import { useEffect, useState } from "react";

export type City = {
  name: string;         // Paris
  country: string;      // France
  timezone: string;     // Europe/Paris
  countryCode: string;  // fr
};

const DEFAULT_CITIES: City[] = [
  {
    name: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    countryCode: "fr",
  },
  {
    name: "New York",
    country: "United States",
    timezone: "America/New_York",
    countryCode: "us",
  },
  {
    name: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    countryCode: "jp",
  },
  {
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    countryCode: "gb",
  },
];

export const ALL_CITIES: City[] = [
  {
    name: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    countryCode: "fr",
  },
  {
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    countryCode: "gb",
  },
  {
    name: "New York",
    country: "United States",
    timezone: "America/New_York",
    countryCode: "us",
  },
  {
    name: "Los Angeles",
    country: "United States",
    timezone: "America/Los_Angeles",
    countryCode: "us",
  },
  {
    name: "Toronto",
    country: "Canada",
    timezone: "America/Toronto",
    countryCode: "ca",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    timezone: "Asia/Dubai",
    countryCode: "ae",
  },
  {
    name: "Riyadh",
    country: "Saudi Arabia",
    timezone: "Asia/Riyadh",
    countryCode: "sa",
  },
  {
    name: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    countryCode: "jp",
  },
  {
    name: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
    countryCode: "sg",
  },
  {
    name: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
    countryCode: "au",
  },
];

export function useWorldClock() {
  const [now, setNow] = useState(() => new Date());
  const [cities, setCities] = useState<City[]>(DEFAULT_CITIES);

  const [editingTimezone, setEditingTimezone] = useState<string | null>(null);

  function closeEditCity() {
    setEditingTimezone(null);
  }

  function openEditCity(timezone: string) {
    setEditingTimezone(timezone);
  }
  

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- TIME ----------------

  function getTime(timezone: string) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    }).format(now);
  }

  function getDate(timezone: string) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: timezone,
    }).format(now);
  }

  function getGMT(timezone: string) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    }).formatToParts(now);

    return (
      parts.find((part) => part.type === "timeZoneName")?.value ??
      "GMT"
    );
  }

  function getTimeDifference(timezone: string) {
    const localOffset = now.getTimezoneOffset();

    const targetOffset = new Date(
      now.toLocaleString("en-US", { timeZone: timezone })
    ).getTime();

    const localTime = new Date(
      now.toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    ).getTime();

    const diffMs = targetOffset - localTime;
    const diffHours = diffMs / (1000 * 60 * 60);

    const rounded = Math.round(diffHours);

    if (rounded === 0) return null;

    const sign = rounded > 0 ? "+" : "-";
    return `${sign}${Math.abs(rounded)}h`;
  }

  // ---------------- CRUD ----------------

  function addCity(city: City) {
    setCities((prev) => {
      if (prev.some((c) => c.timezone === city.timezone)) return prev;
      return [...prev, city];
    });
  }

  function updateCity(oldTimezone: string, newCity: City) {
    setCities((prev) => {
      const index = prev.findIndex((c) => c.timezone === oldTimezone);

      if (index === -1) return prev;

      const copy = [...prev];
      copy[index] = newCity;

      return copy;
    });
  }

  function removeCity(timezone: string) {
    setCities((prev) => prev.filter((c) => c.timezone !== timezone));
  }

  function searchCities(query: string) {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return ALL_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.timezone.toLowerCase().includes(q)
    );
  }

  return {
    cities,
    getTime,
    getDate,
    getGMT,
    getTimeDifference,
    addCity,
    removeCity,
    searchCities,
    openEditCity,
    closeEditCity,
    editingTimezone,
    updateCity
  };
}