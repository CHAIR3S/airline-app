import { FlightApi } from "@/app/api/flight"
import { Search, Calendar, CheckCircle, XCircle, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"

interface UserDashboardProps {
  userName: string
  stats: {
    booked: number
    completed: number
    cancelled: number
    totalSpent: number
  }
  setSearchQuery: (value: string) => void
}

export default function UserDashboard({ userName, stats, setSearchQuery }: UserDashboardProps) {

  const [statistics, setStatistics] = useState<any>();

  useEffect(() => {
    FlightApi.getStats().then((result) => {setStatistics(result)})
  }, [])


  console.log(statistics)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-2xl mr-2">👋</span>
          <h2 className="text-xl font-bold">Hola de nuevo {userName}</h2>
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Flight number"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#605DEC] focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-4xl font-bold">{statistics?.statusCounts?.SCHEDULED}</h3>
              <p className="text-gray-600">Vuelos programados</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="text-blue-700" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-4xl font-bold">{statistics?.statusCounts?.ARRIVED}</h3>
              <p className="text-gray-600">Vuelos completados</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-4xl font-bold">{statistics?.statusCounts?.CANCELLED}</h3>
              <p className="text-gray-600">Vuelos cancelados</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="text-red-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-4xl font-bold">${statistics?.totalAmount}</h3>
              <p className="text-gray-600">Total Spends</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <DollarSign className="text-amber-500" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
