"use client";

import { useEffect, useState } from "react";

export type City = {
  name: string;
  timezone: string;
  countryCode: string;
};

const DEFAULT_CITIES: City[] = [
  { name: "Paris", timezone: "Europe/Paris", countryCode: "fr" },
  { name: "New York", timezone: "America/New_York", countryCode: "us" },
  { name: "Tokyo", timezone: "Asia/Tokyo", countryCode: "jp" },
  { name: "London", timezone: "Europe/London", countryCode: "gb" },
];

// simple searchable dataset (you can later replace with API)
export const ALL_CITIES: City[] = [
  // 🇪🇺 Europe
  { name: "London", timezone: "Europe/London", countryCode: "gb" },
  { name: "Paris", timezone: "Europe/Paris", countryCode: "fr" },
  { name: "Berlin", timezone: "Europe/Berlin", countryCode: "de" },
  { name: "Madrid", timezone: "Europe/Madrid", countryCode: "es" },
  { name: "Rome", timezone: "Europe/Rome", countryCode: "it" },
  { name: "Amsterdam", timezone: "Europe/Amsterdam", countryCode: "nl" },
  { name: "Brussels", timezone: "Europe/Brussels", countryCode: "be" },
  { name: "Zurich", timezone: "Europe/Zurich", countryCode: "ch" },
  { name: "Vienna", timezone: "Europe/Vienna", countryCode: "at" },
  { name: "Stockholm", timezone: "Europe/Stockholm", countryCode: "se" },
  { name: "Athens", timezone: "Europe/Athens", countryCode: "gr" },
  { name: "Istanbul", timezone: "Europe/Istanbul", countryCode: "tr" },
  { name: "Moscow", timezone: "Europe/Moscow", countryCode: "ru" },

  // 🇺🇸 North America
  { name: "New York", timezone: "America/New_York", countryCode: "us" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", countryCode: "us" },
  { name: "Chicago", timezone: "America/Chicago", countryCode: "us" },
  { name: "Denver", timezone: "America/Denver", countryCode: "us" },
  { name: "Toronto", timezone: "America/Toronto", countryCode: "ca" },
  { name: "Vancouver", timezone: "America/Vancouver", countryCode: "ca" },
  { name: "Mexico City", timezone: "America/Mexico_City", countryCode: "mx" },
  { name: "San Francisco", timezone: "America/Los_Angeles", countryCode: "us" },
  { name: "Seattle", timezone: "America/Los_Angeles", countryCode: "us" },

  // 🇿🇦 South America
  { name: "São Paulo", timezone: "America/Sao_Paulo", countryCode: "br" },
  { name: "Rio de Janeiro", timezone: "America/Sao_Paulo", countryCode: "br" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires", countryCode: "ar" },
  { name: "Santiago", timezone: "America/Santiago", countryCode: "cl" },
  { name: "Lima", timezone: "America/Lima", countryCode: "pe" },
  { name: "Bogotá", timezone: "America/Bogota", countryCode: "co" },

  // 🌍 Middle East
  { name: "Dubai", timezone: "Asia/Dubai", countryCode: "ae" },
  { name: "Abu Dhabi", timezone: "Asia/Dubai", countryCode: "ae" },
  { name: "Riyadh", timezone: "Asia/Riyadh", countryCode: "sa" },
  { name: "Doha", timezone: "Asia/Qatar", countryCode: "qa" },
  { name: "Tel Aviv", timezone: "Asia/Jerusalem", countryCode: "il" },
  { name: "Tehran", timezone: "Asia/Tehran", countryCode: "ir" },

  // 🌏 Asia
  { name: "Tokyo", timezone: "Asia/Tokyo", countryCode: "jp" },
  { name: "Seoul", timezone: "Asia/Seoul", countryCode: "kr" },
  { name: "Beijing", timezone: "Asia/Shanghai", countryCode: "cn" },
  { name: "Shanghai", timezone: "Asia/Shanghai", countryCode: "cn" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", countryCode: "hk" },
  { name: "Singapore", timezone: "Asia/Singapore", countryCode: "sg" },
  { name: "Bangkok", timezone: "Asia/Bangkok", countryCode: "th" },
  { name: "Mumbai", timezone: "Asia/Kolkata", countryCode: "in" },
  { name: "Delhi", timezone: "Asia/Kolkata", countryCode: "in" },
  { name: "Jakarta", timezone: "Asia/Jakarta", countryCode: "id" },
  { name: "Manila", timezone: "Asia/Manila", countryCode: "ph" },
  { name: "Kuala Lumpur", timezone: "Asia/Kuala_Lumpur", countryCode: "my" },

  // 🇦🇺 Oceania
  { name: "Sydney", timezone: "Australia/Sydney", countryCode: "au" },
  { name: "Melbourne", timezone: "Australia/Melbourne", countryCode: "au" },
  { name: "Brisbane", timezone: "Australia/Brisbane", countryCode: "au" },
  { name: "Perth", timezone: "Australia/Perth", countryCode: "au" },
  { name: "Auckland", timezone: "Pacific/Auckland", countryCode: "nz" },

  // 🌍 Africa
  { name: "Cairo", timezone: "Africa/Cairo", countryCode: "eg" },
  { name: "Lagos", timezone: "Africa/Lagos", countryCode: "ng" },
  { name: "Johannesburg", timezone: "Africa/Johannesburg", countryCode: "za" },
  { name: "Nairobi", timezone: "Africa/Nairobi", countryCode: "ke" },
  { name: "Casablanca", timezone: "Africa/Casablanca", countryCode: "ma" },
];

export function useWorldClock() {
  const [now, setNow] = useState(new Date());
  const [cities, setCities] = useState<City[]>(DEFAULT_CITIES);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  function getTime(timezone: string) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timezone,
    }).format(now);
  }

  function addCity(city: City) {
    setCities((prev) => {
      if (prev.find((c) => c.timezone === city.timezone)) return prev;
      return [...prev, city];
    });
  }

  function removeCity(timezone: string) {
    setCities((prev) =>
      prev.filter((c) => c.timezone !== timezone)
    );
  }

  function searchCities(query: string) {
    if (!query) return [];
    return ALL_CITIES.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return {
    cities,
    getTime,
    addCity,
    removeCity,
    searchCities,
  };
}