"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { date } from "zod"
import { FlightApi } from "@/app/api/flight"
import { set } from "react-hook-form"
import { DateSelectorProps } from "@/types/others"




export default function DateSelector({data, originId, destinationId, setFlights}: DateSelectorProps ) {
  // Estado para el arrastre
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  
const hasSelectedOnce = useRef(false);

useEffect(() => {
  if (!hasSelectedOnce.current && data.length > 0) {
    selectDate(0); // selecciona la primera fecha y hace fetch
    hasSelectedOnce.current = true;
  }
}, [data]);





  console.log("data", data)

  const [dates, setDates] = useState(data)



  // Manejar el inicio del arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return

    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  // Manejar el movimiento durante el arrastre
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return

    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Multiplicador para ajustar la velocidad del scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Manejar el fin del arrastre
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Manejar el scroll con los botones
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 300 // Cantidad de píxeles a desplazar
    const newScrollLeft =
      direction === "left"
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

const selectDate = async (index: number) => {
  // set visual state
  setDates(
    data.map((d, i) => ({
      ...d,
      isSelected: i === index,
    })),
  );

  const selected = data[index]; // usa directamente `data`, no `dates`

  const flightsDate = await FlightApi.getFlightsByDate(
    `${selected.year}-${selected.monthNumber}-${selected.date}`,
    originId,
    destinationId,
  );

  setFlights(flightsDate);

  console.log("flights", flightsDate);

};





  // Añadir y eliminar event listeners para el mouse up
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseLeave = () => setIsDragging(false)

    document.addEventListener("mouseup", handleGlobalMouseUp)
    document.addEventListener("mouseleave", handleGlobalMouseLeave)

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      document.removeEventListener("mouseleave", handleGlobalMouseLeave)
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Precios por fecha</h3>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-[#605DEC] transition-colors" onClick={() => handleScroll("left")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="text-gray-800 hover:text-[#605DEC] transition-colors"
            onClick={() => handleScroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto pb-2 scrollbar-hide ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex space-x-2 min-w-max">
          {dates.map((date, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center p-3 rounded-lg cursor-pointer min-w-[80px] ${
                date.isSelected ? "bg-[#605DEC] text-white" : "hover:bg-gray-100 transition-colors"
              }`}
              onClick={() => selectDate(index)}
            >
              <span className="text-xs font-medium">{date.day}</span>
              <span className="text-lg font-bold my-1">{date.date}</span>
              <span className="text-xs font-medium">{date.month}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Ocultar scrollbar para Chrome, Safari y Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
