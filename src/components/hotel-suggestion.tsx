"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface HotelSuggestionProps {
  image: string
  name: string
  description: string
  price: string
}

export default function HotelSuggestion({ image, name, description, price }: HotelSuggestionProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300"
    >
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-800">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          <span className="font-bold text-lg">{price}</span>
        </div>
      </div>
    </motion.div>
  )
}
