import Image from "next/image"

interface FlightSummaryProps {
  duration: string
  airline: string
  departureTime: string
  arrivalTime: string
  stops: string
  layover: string
  price: string
}

export default function FlightSummary({
  duration,
  airline,
  departureTime,
  arrivalTime,
  stops,
  layover,
  price,
}: FlightSummaryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
      <div className="flex-shrink-0 mr-4">
        <div className="w-12 h-12 bg-[#605DEC] rounded-full flex items-center justify-center">
          <Image src="/placeholder.svg?height=24&width=24" alt={airline} width={24} height={24} className="invert" />
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

        <div className="col-span-1 text-right">
          <p className="font-medium">{price}</p>
          <p className="text-sm text-gray-500">round trip</p>
        </div>
      </div>
    </div>
  )
}
