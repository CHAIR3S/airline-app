"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FilterOption {
  label: string
  icon: React.ReactNode
}

interface FilterBarProps {
  filters: any
  setFilters: (value: any) => void
}

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

  const toggleFilter = (filter: string, value: string | number) => {
    setFilters((prev: any) => ({
      ...prev,
      [filter]: prev[filter] === value ? null : value,
    }))
    setActiveFilter(activeFilter === filter ? null : filter)
  }

  return (
    <div className="flex space-x-2">
      {Object.entries(filtersList).map(([key, { label, icon }]) => (
        <button
          key={key}
          onClick={() => toggleFilter(key, label)}
          className={`flex items-center px-4 py-2 rounded-md border ${
            filters[key] ? "border-[#605DEC] text-[#605DEC]" : "border-gray-300 text-gray-700 hover:border-gray-400"
          }`}
        >
          {label}
          {icon}
        </button>
      ))}
    </div>
  )
}
