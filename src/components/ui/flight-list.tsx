"use client"
import { Edit2 } from "lucide-react"

interface Flight {
  id: string
  flightNumber: string
  duration?: string
  airline: string
  departureTime?: string
  arrivalTime?: string
  stops?: number
  layover?: string
  seatClass?: string
  price: number
}

interface FlightListProps {
  flights: Flight[]
}

export default function FlightList({ flights }: FlightListProps) {
  const getAirlineLogo = (airline: string) => {
    switch (airline) {
      case "Hawaiian Airlines":
        return (
          <div className="w-10 h-10 bg-[#605DEC] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">HA</span>
          </div>
        )
      case "Japan Airlines":
        return (
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">JL</span>
          </div>
        )
      case "Delta":
        return (
          <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">DL</span>
          </div>
        )
      case "Aeroméxico":
        return (
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">AM</span>
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">AA</span>
          </div>
        )
    }
  }

  return (
    <div>
      {flights.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No se encontraron vuelos con los filtros aplicados.</div>
      ) : (
        flights.map((flight, index) => (
          <div
            key={flight.id}
            className={`p-4 flex items-center hover:bg-gray-50 ${index !== flights.length - 1 ? "border-b" : ""}`}
          >
            <div className="flex-shrink-0 mr-4">{getAirlineLogo(flight.airline)}</div>

            <div className="flex-grow grid grid-cols-5 gap-4">
              <div className="col-span-1">
                <p className="font-medium">{flight.duration || "N/A"}</p>
                <p className="text-sm text-[#605DEC]">{flight.airline}</p>
              </div>

              <div className="col-span-1">
                <p className="font-medium">
                  {flight.departureTime || "N/A"} - {flight.arrivalTime || "N/A"}
                </p>
                <p className="text-sm text-gray-500">value</p>
              </div>

              <div className="col-span-1">
                <p className="font-medium">
                  {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops! > 1 ? "s" : ""}`}
                </p>
                <p className="text-sm text-gray-500">{flight.layover || "-"}</p>
              </div>

              <div className="col-span-1"></div>

              <div className="col-span-1 text-right">
                <p className="font-medium">${flight.price}</p>
                <p className="text-sm text-gray-500">round trip</p>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4">
              <button className="text-gray-400 hover:text-[#605DEC]">
                <Edit2 size={18} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
