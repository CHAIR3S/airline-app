'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { DateItem } from '@/utils/datetime'
import { ConfirmationModal } from './confirmation-modal'
import { RefundRequestAPI } from '@/app/api/refund-request'
import { RefundStatus } from '@/types/refund'

interface FlightCardProps {
  flightId: number
  destinationName: string
  image: string
  departureDate: DateItem
  arrivalDate: DateItem
  duration: string
  airline: string
  departureTime: string
  arrivalTime: string
  airlineLogo: string
  paymentId: number
}

export default function FlightCard({
  flightId,
  destinationName,
  image,
  departureDate,
  arrivalDate,
  duration,
  airline,
  departureTime,
  arrivalTime,
  airlineLogo,
  paymentId
}: FlightCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleConfirm = () => {
    setModalOpen(false)
    console.log(`Vuelo ${flightId} cancelado`)

    RefundRequestAPI.create({
      paymentId: paymentId,
      reason: 'Cancelar vuelo',
      status: RefundStatus.PENDING,
      resolutionDate: ''
    })
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48">
          <Image src={`data:image/jpeg;base64,${image || "/placeholder.svg"}`} alt="Destination" fill className="object-cover" priority />
        </div>

        <div className="p-4">
          <div className="flex mb-4 flex-col">
            <h2 className="font-bold">{destinationName}</h2>
            <div className="flex flex-row justify-between">
              <h3 className="text-gray-600">
                Salida {`${departureDate.date} de ${departureDate.month} del ${departureDate.year}`}
              </h3>
              <h3 className="text-gray-600 text-right">
                Llegada {`${arrivalDate.date} de ${arrivalDate.month}`}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 flex">
            <div className="mr-4">
              <div className="w-32 h-16 flex items-center justify-center">
                <Image src={airlineLogo} alt={airline} width={274} height={274} className="invert" />
              </div>
            </div>

            <div className="flex-grow grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{duration}</p>
                <p className="text-sm text-[#605DEC]">{airline}</p>
              </div>
              <div>
                <p className="font-medium">{departureTime} - {arrivalTime}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <motion.button
              onClick={() => setModalOpen(true)}
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Cancelar vuelo
            </motion.button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        title="¿Cancelar vuelo?"
        description="¿Estás seguro que deseas cancelar este vuelo? Esta acción no se puede deshacer.
        Se te devolverá el dinero en un plazo no mayor a 30 días"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}
