"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type City = {
  name: string;
  country: string;
  timezone: string;
  countryCode: string;
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
  ...DEFAULT_CITIES,
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

type WorldClockState = {
  now: Date;
  cities: City[];

  hasHydrated: boolean;

  setHydrated: () =>  void;

  editingTimezone: string | null;

  tick: () => void;

  addCity: (city: City) => void;
  updateCity: (oldTimezone: string, city: City) => void;
  removeCity: (timezone: string) => void;

  openEditCity: (timezone: string) => void;
  closeEditCity: () => void;

  searchCities: (query: string) => City[];

  getTime: (timezone: string) => string;
  getDate: (timezone: string) => string;
  getGMT: (timezone: string) => string;
  getTimeDifference: (timezone: string) => string | null;
};

export const useWorldClockStore = create<WorldClockState>()(
  persist(
    (set, get) => ({
      now: new Date(),
      cities: DEFAULT_CITIES,
      editingTimezone: null,

      hasHydrated: false,
      setHydrated: () => set({hasHydrated: true}),

      tick: () => set({ now: new Date() }),

      // ---------------- CRUD ----------------

      addCity: (city) =>
        set((state) => {
          if (state.cities.some((c) => c.timezone === city.timezone)) {
            return state;
          }
          return { cities: [...state.cities, city] };
        }),

      updateCity: (oldTimezone, city) =>
        set((state) => ({
            cities: state.cities.map((c) =>
            c.timezone === oldTimezone
                ? {
                    ...city,
                    timezone: oldTimezone, // 👈 CRITICAL FIX
                }
                : c
            ),
        })),

      removeCity: (timezone) =>
        set((state) => ({
          cities: state.cities.filter((c) => c.timezone !== timezone),
        })),

      // ---------------- EDIT UI STATE ----------------

      openEditCity: (timezone) => set({ editingTimezone: timezone }),
      closeEditCity: () => set({ editingTimezone: null }),

      // ---------------- SEARCH ----------------

      searchCities: (query) => {
        if (!query.trim()) return [];

        const q = query.toLowerCase();

        return ALL_CITIES.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.timezone.toLowerCase().includes(q)
        );
      },

      // ---------------- TIME HELPERS ----------------

      getTime: (timezone) =>
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: timezone,
        }).format(get().now),

      getDate: (timezone) =>
        new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          timeZone: timezone,
        }).format(get().now),

      getGMT: (timezone) => {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone, // ✅ correct
            timeZoneName: "shortOffset",
        }).formatToParts(get().now);

        return (
            parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT"
        );
        },

      getTimeDifference: (timezone) => {
        const now = get().now;

        const target = new Date(
          now.toLocaleString("en-US", { timeZone: timezone })
        );

        const local = new Date(
          now.toLocaleString("en-US", {
            timeZone:
              Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        );

        const diffHours =
          (target.getTime() - local.getTime()) / (1000 * 60 * 60);

        const rounded = Math.round(diffHours);

        if (rounded === 0) return null;

        return `${rounded > 0 ? "+" : "-"}${Math.abs(rounded)}h`;
      },
    }),
    {
      name: "world-clock-storage",
      partialize: (state) => ({
        cities: state.cities,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      }
    }
  )
);