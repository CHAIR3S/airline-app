"use client";

import Link from "next/link";
import { useState } from "react";
import FlightList from "@/components/ui/flight-list";
import FilterBar from "@/components/ui/filter-bar";
import WorldMap from "@/components/ui/world-map";
import UserDashboard from "@/components/ui/user-dashboard";

const allFlights = [
  {
    id: "1",
    flightNumber: "AM123",
    airline: "Aeroméxico",
    stops: 1,
    time: "7:00AM - 4:15PM",
    seatClass: "Economy",
    price: 624,
  },
  {
    id: "2",
    flightNumber: "JL456",
    airline: "Japan Airlines",
    stops: 1,
    time: "7:35AM - 12:15PM",
    seatClass: "Business",
    price: 663,
  },
  {
    id: "3",
    flightNumber: "HA789",
    airline: "Hawaiian Airlines",
    stops: 1,
    time: "8:20AM - 2:15PM",
    seatClass: "Premium",
    price: 690,
  },
];

export default function SearchResultsPage() {
  const userStats = {
    booked: 45,
    completed: 33,
    cancelled: 12,
    totalSpent: 13105,
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    price: null,
    stops: null,
    times: null,
    airlines: null,
    seatClass: null,
  });

  const filteredFlights = allFlights.filter((flight) => {
    const matchesSearch = flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters =
      (!filters.seatClass || flight.seatClass === filters.seatClass) &&
      (!filters.airlines || flight.airline === filters.airlines) &&
      (!filters.stops || flight.stops === filters.stops);

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 container mx-auto px-4 py-5">
        <UserDashboard userName="Naved Ansari" stats={userStats} setSearchQuery={setSearchQuery} />

        <div className="flex justify-between items-center mb-6">
          <FilterBar filters={filters} setFilters={setFilters} />
          <button className="bg-[#605DEC] text-white px-4 py-2 rounded-md hover:bg-[#4F4ADB] transition-colors">
            Create flight
          </button>
        </div>

        <h1 className="text-xl font-medium text-gray-800 mb-4">Vuelos registrados</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <FlightList flights={filteredFlights} />
        </div>

        <div className="rounded-lg overflow-hidden h-80 mb-8">
          <WorldMap />
        </div>
      </main>
    </div>
  );
}
