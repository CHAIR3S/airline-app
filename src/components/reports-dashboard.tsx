"use client"

import { useEffect, useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line, AreaChart, Area, CartesianGrid
} from "recharts"
import { Calendar, TrendingUp, Users, Plane, DollarSign, MapPin } from "lucide-react"
import { AverageBaggage, OccupancyRate, TopDestination } from "@/types/others"


type Period = 'week' | 'month' | 'year'






const COLORS = ["#605DEC", "#34D399", "#F59E0B", "#EF4444", "#8B5CF6"]

export default function ReportsDashboard() {
  const [period, setPeriod] = useState<Period>("month")
  const [loading, setLoading] = useState(true)

  const [summary, setSummary] = useState({
    reservations: 0,
    clients: 0,
    flights: 0,
    revenue: 0,
    avgTicketPrice: 0,
    occupancyRate: 0,
  })

  const [topDestinations, setTopDestinations] = useState<TopDestination[]>([])
  const [occupancyRates, setOccupancyRates] = useState<OccupancyRate[]>([])
  const [baggageData, setBaggageData] = useState<AverageBaggage[]>([])


useEffect(() => {
  const fetchReports = async () => {
    setLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const query = `?period=${period}`;

    try {
      const [
        reservationsRes,
        clientsRes,
        flightsRes,
        salesRes,
        destinationsRes,
        occupancyRes,
        baggageRes,
      ] = await Promise.all([
        fetch(`${baseUrl}/reports/reservations/total${query}`),
        fetch(`${baseUrl}/reports/clients/total${query}`),
        fetch(`${baseUrl}/reports/flights/total${query}`),
        fetch(`${baseUrl}/reports/sales/summary${query}`),
        fetch(`${baseUrl}/reports/destinations/top${query}`),
        fetch(`${baseUrl}/reports/occupancy-rate${query}`),
        fetch(`${baseUrl}/reports/baggage/average${query}`),
      ]);

      const reservations: number = await reservationsRes.json();
      const clients: number = await clientsRes.json();
      const flights: number = await flightsRes.json();
      const revenue: number = await salesRes.json();
      const destinations: TopDestination[] = await destinationsRes.json();
      const occupancy: OccupancyRate[] = await occupancyRes.json();
      const baggage: AverageBaggage[] = await baggageRes.json()


      // Calcular el ticket promedio
      const avgTicketPrice = revenue && reservations ? revenue / reservations : 0;

      // Calcular la tasa de ocupación promedio
      const occupancyAvg =
        occupancy && occupancy.length > 0
          ? Math.round(
              occupancy.reduce((sum: number, o) => {
                return sum + Number(o.occupancyRate);
              }, 0) / occupancy.length
            )
          : 0;

      setSummary({
        reservations,
        clients,
        flights,
        revenue,
        avgTicketPrice: Math.round(avgTicketPrice),
        occupancyRate: occupancyAvg,
      });

      setTopDestinations(destinations);
      setOccupancyRates(occupancy);
      setBaggageData(baggage);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }

    setLoading(false);
  };

  fetchReports();
}, [period]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#605DEC]"></div>
        <span className="ml-3 text-gray-600">Cargando reportes...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Reportes</h1>
          <p className="text-gray-600">Análisis completo de operaciones y ventas</p>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {(["week", "month", "year"] as const).map((p) => (
            <button
              key={p}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                period === p
                  ? "bg-[#605DEC] text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
              onClick={() => setPeriod(p)}
            >
              {p === "week" ? "Semanal" : p === "month" ? "Mensual" : "Anual"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPI title="Reservaciones" icon={<Calendar />} value={summary.reservations} color="blue" />
        <KPI title="Clientes" icon={<Users />} value={summary.clients} color="green" />
        <KPI title="Vuelos" icon={<Plane />} value={summary.flights} color="purple" />
        <KPI title="Ingresos" icon={<DollarSign />} value={`$${summary.revenue}`} color="yellow" />
        <KPI title="Promedio Boleto" icon={<DollarSign />} value={`$${summary.avgTicketPrice}`} color="indigo" />
        <KPI title="Ocupación" icon={<Users />} value={`${summary.occupancyRate}%`} color="red" />
      </div>

      {/* Top Destinations Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinos Reservados</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topDestinations}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="city" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Bar dataKey="total_reservations" fill="#605DEC" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Occupancy Rate Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ocupación por Destino</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={occupancyRates}
              dataKey="occupancyRate"
              nameKey="destination"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ destination, occupancyRate }) => `${destination}: ${occupancyRate}%`}
            >
              {occupancyRates.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Average Baggage per Flight Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Promedio de Equipaje por Vuelo</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vuelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Promedio (kg)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
{baggageData.map((b) => (
  <tr key={b.flight_id}>
    <td className="px-6 py-4 text-sm text-gray-900">Vuelo #{b.flight_id}</td>
    <td className="px-6 py-4 text-sm text-gray-900">{Number(b.avg_weight).toFixed(2)} kg</td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

function KPI({
  title,
  icon,
  value,
  color,
}: {
  title: string
  icon: React.ReactNode
  value: number | string
  color: string
}) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
    indigo: "bg-indigo-100 text-indigo-600",
    red: "bg-red-100 text-red-600",
  }[color]

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${colorMap} p-3 rounded-full`}>{icon}</div>
      </div>
    </div>
  )
}
