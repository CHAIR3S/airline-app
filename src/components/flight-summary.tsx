import Image from "next/image"

interface FlightSummaryProps {
  logo: string
  duration: string
  airline: string
  departureTime: string
  arrivalTime: string
  price: string
}

export default function FlightSummary({
  logo,
  duration,
  airline,
  departureTime,
  arrivalTime,
  price,
}: FlightSummaryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
      <div className="flex-shrink-0 mr-4">
        <div className="w-16 h-16  rounded-full flex items-center justify-center">
          <Image src={logo || "/placeholder.svg"} alt={airline} width={200} height={200} className="invert" />
        </div>
      </div>

      <div className="flex-grow grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <p className="font-medium">{duration}</p>
          <p className="text-sm text-[#605DEC]">{airline}</p>
        </div>

        <div className="col-span-1">
          <p className="font-medium">
            {departureTime} - {arrivalTime}
          </p>
        </div>


        <div className="col-span-1 text-right">
          <p className="font-medium">{price.slice(1, -1)}</p>
        </div>
      </div>
    </div>
  )
}
