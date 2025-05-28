"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlightList from "@/components/ui/flight-list";
import FilterBar from "@/components/ui/filter-bar";
import WorldMap from "@/components/ui/world-map";
import UserDashboard from "@/components/ui/user-dashboard";
import { FlightApi } from "../api/flight";
import { Flight } from "@/types/flight";



export type Filters = {
  airlineName?: string;
  originName?: string;
  destinationName?: string;
  status?: string;
};


function filterFlights(flights: Flight[], filters: Filters, search: string) {
  console.log("🔍 Filtrando con: ", filters, search);
  return flights.filter((flight) => {
    const matchesSearch = (''+flight.flightId).toLowerCase().includes(search.toLowerCase());

    const matchesAirline =
      !filters.airlineName || flight.airline.name.toLowerCase().includes(filters.airlineName.toLowerCase());

    const matchesOrigin =
      !filters.originName || flight.origin.name.toLowerCase().includes(filters.originName.toLowerCase());

    const matchesDestination =
      !filters.destinationName || flight.destination.name.toLowerCase().includes(filters.destinationName.toLowerCase());

    const matchesStatus =
      !filters.status || flight.status.toLowerCase() === filters.status.toLowerCase();

    return matchesSearch && matchesAirline && matchesOrigin && matchesDestination && matchesStatus;
  });
}





export default function SearchResultsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [name, setName] = useState('')

useEffect(() => {
  FlightApi.getAllFlightsActive()
    .then((result) => setFlights(result))
    .catch(console.error);

  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      const user = JSON.parse(userString);
      setName(user.name ?? '');
    } catch {
      setName('');
    }
  } else {
    setName('');
  }
}, []);


  const userStats = {
    booked: 45,
    completed: 33,
    cancelled: 12,
    totalSpent: 13105,
  };


  
  const filtered = filterFlights(flights, filters, searchQuery);




  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 container mx-auto px-4 py-5">
        <UserDashboard userName={name} stats={userStats} setSearchQuery={setSearchQuery} />

        <div className="flex justify-between items-center mb-6">
          <FilterBar filters={filters} setFilters={setFilters} />
          <button className="bg-[#605DEC] text-white px-4 py-2 rounded-md hover:bg-[#4F4ADB] transition-colors">
            Create flight
          </button>
        </div>

        <h1 className="text-xl font-medium text-gray-800 mb-4">Vuelos registrados</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <FlightList flights={filtered} />
        </div>

        <div className="rounded-lg overflow-hidden h-80 mb-8">
          <WorldMap />
        </div>
      </main>
    </div>
  );
}
