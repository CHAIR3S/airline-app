"use client"

import { useState } from "react"

type SeatStatus = "available" | "unavailable" | "selected" | "premium"

interface Seat {
  id: string
  status: SeatStatus
}

export default function SeatSelector() {
  // Generar asientos para el avión
  const generateSeats = (): Seat[][] => {
    const rows = 11
    const seatsPerRow = 6
    const seats: Seat[][] = []

    for (let i = 0; i < rows; i++) {
      const row: Seat[] = []
      for (let j = 0; j < seatsPerRow; j++) {
        // Determinar el estado del asiento
        let status: SeatStatus = "available"

        // Hacer algunos asientos no disponibles
        if (Math.random() < 0.3) {
          status = "unavailable"
        }

        // Hacer algunos asientos premium (los de la última fila)
        if (i === 8 && (j === 4 || j === 5)) {
          status = "premium"
        }

        row.push({
          id: `${String.fromCharCode(65 + i)}${j + 1}`,
          status,
        })
      }
      seats.push(row)
    }
    return seats
  }

  const [seats, setSeats] = useState<Seat[][]>(generateSeats())
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)

  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    const seat = seats[rowIndex][seatIndex]

    if (seat.status === "unavailable" || seat.status === "premium") {
      return
    }

    const newSeats = [...seats]

    // Si ya hay un asiento seleccionado, deseleccionarlo
    if (selectedSeat) {
      const [prevRowIndex, prevSeatIndex] = findSeatById(selectedSeat)
      if (prevRowIndex !== -1 && prevSeatIndex !== -1) {
        newSeats[prevRowIndex][prevSeatIndex].status = "available"
      }
    }

    // Seleccionar el nuevo asiento
    if (seat.id !== selectedSeat) {
      newSeats[rowIndex][seatIndex].status = "selected"
      setSelectedSeat(seat.id)
    } else {
      setSelectedSeat(null)
    }

    setSeats(newSeats)
  }

  const findSeatById = (id: string): [number, number] => {
    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[i].length; j++) {
        if (seats[i][j].id === id) {
          return [i, j]
        }
      }
    }
    return [-1, -1]
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">Seleccione su asiento</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#605DEC] rounded-sm mr-2"></div>
            <span className="text-sm text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#E4E2FF] rounded-sm mr-2"></div>
            <span className="text-sm text-gray-600">Ocupado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#FF4A4A] rounded-sm mr-2"></div>
            <span className="text-sm text-gray-600">Premium</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Avión */}
        <div className="relative bg-[#F7F5FF] rounded-3xl overflow-hidden mx-auto max-w-md">
          {/* Cabina */}
          <div className="p-8">
            {/* Filas de asientos */}
            <div className="grid grid-cols-6 gap-2">
              {seats.map((row, rowIndex) =>
                row.map((seat, seatIndex) => (
                  <div
                    key={seat.id}
                    // whileHover={seat.status !== "unavailable" ? { scale: 1.1 } : {}}
                    // whileTap={seat.status !== "unavailable" ? { scale: 0.95 } : {}}
                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                    className={`
                      w-8 h-8 rounded-md cursor-pointer flex items-center justify-center text-xs font-medium
                      ${seat.status === "available" ? "bg-[#605DEC] text-white" : ""}
                      ${seat.status === "unavailable" ? "bg-[#E4E2FF] text-gray-400 cursor-not-allowed" : ""}
                      ${seat.status === "selected" ? "bg-[#3A36B1] text-white ring-2 ring-offset-2 ring-[#3A36B1]" : ""}
                      ${seat.status === "premium" ? "bg-[#FF4A4A] text-white" : ""}
                    `}
                  >
                    {seat.id}
                  </div>
                )),
              )}
            </div>
          </div>
        </div>

        {/* Pasillo y alas */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/6 h-24 bg-gray-200 rounded-r-3xl"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/6 h-24 bg-gray-200 rounded-l-3xl"></div>
        </div>
      </div>

      {selectedSeat && (
        <div
        //   initial={{ opacity: 0, y: 10 }}
        //   animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-green-800 font-medium">
            Has seleccionado el asiento {selectedSeat}. Puedes cambiar tu selección haciendo clic en otro asiento
            disponible.
          </p>
        </div>
      )}
    </div>
  )
}
