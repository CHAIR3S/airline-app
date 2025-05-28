"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Filters } from "@/app/dashboard/page"

interface FilterOption {
  label: string
  icon: React.ReactNode
}

type FilterBarProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filtersList: Record<string, FilterOption> = {
    seatClass: {
      label: "Economy",
      icon: <ChevronDown className="h-4 w-4 ml-1" />,
    },
    airlines: {
      label: "Japan Airlines",
      icon: <ChevronDown className="h-4 w-4 ml-1" />,
    },
    stops: {
      label: "1 Stop",
      icon: <ChevronDown className="h-4 w-4 ml-1" />,
    },
  }

  
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Aerolínea"
        onChange={(e) =>
          setFilters({ ...filters, airlineName: e.target.value })
        }
        className="border rounded px-3 py-1"
      />

      <input
        type="text"
        placeholder="Origen"
        onChange={(e) =>
          setFilters({ ...filters, originName: e.target.value })
        }
        className="border rounded px-3 py-1"
      />

      <input
        type="text"
        placeholder="Destino"
        onChange={(e) =>
          setFilters({ ...filters, destinationName: e.target.value })
        }
        className="border rounded px-3 py-1"
      />

      <select
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value || undefined })
        }
        className="border rounded px-3 py-1"
      >
        <option value="">Todos</option>
        <option value="SCHEDULED">Scheduled</option>
        <option value="DEPARTED">Departed</option>
        <option value="DELAYED">Delayed</option>
      </select>
    </div>
  );
}
