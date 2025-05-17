"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"

interface FlightCardProps {
  image: string
  departureDate: string
  arrivalDate: string
  duration: string
  airline: string
  departureTime: string
  arrivalTime: string
  stops: string
  layover: string
}

export default function FlightCard({
  image,
  departureDate,
  arrivalDate,
  duration,
  airline,
  departureTime,
  arrivalTime,
  stops,
  layover,
}: FlightCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Destination Image */}
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt="Destination" fill className="object-cover" priority />
      </div>

      {/* Flight Information */}
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-gray-600">Departing {departureDate}</h3>
          </div>
          <div className="text-right">
            <h3 className="text-gray-600">Arriving {arrivalDate}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-[#605DEC] rounded-full flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=24&width=24"
                alt={airline}
                width={24}
                height={24}
                className="invert"
              />
            </div>
          </div>

          <div className="flex-grow grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <p className="font-medium">{duration}</p>
              <p className="text-sm text-[#605DEC]">{airline}</p>
            </div>

            <div className="col-span-1">
              <p className="font-medium">
                {departureTime} - {arrivalTime}
              </p>
              <p className="text-sm text-gray-500">value</p>
            </div>

            <div className="col-span-1">
              <p className="font-medium">{stops}</p>
              <p className="text-sm text-gray-500">{layover}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <motion.button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Cancelar vuelo
          </motion.button>
        </div>
      </div>
    </div>
  )
}
