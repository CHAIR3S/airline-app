"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import StepperUI from "@/components/stepper-ui";
import DateSelector, { DateItem, DateSelectorProps } from "@/components/ui/date-selector";
import { Place, PlaceAPI } from "@/app/api/place";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FlightApi } from "@/app/api/flight";
import { Flight } from "@/types/flight";
import { flightDuration, formatIsoToHHMM } from "@/utils/datetime";
import { calcularPrecioVuelo } from "@/utils/pricing";
import { calcularCargoExtra } from '../../../../utils/luggage';

export default function DatePage() {
  const { placeId } = useParams();

  const [destinationPlace, setDestinationPlace] = useState<Place | null>(null);
  const [originPlace, setOriginPlace] = useState<Place | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airlines, setAirlines] = useState<any[]>([]);
  const router = useRouter();
  
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null)
  const [selectedClass, setSelectedClass] = useState<"economy" | "first">("economy");
  

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(25000);
  const [selectedDuration, setSelectedDuration] = useState<number>(24);




  const toggleExpanded = (flightId: number) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId)
  }

  // Efecto para obtener el lugar de destino
  useEffect(() => {
    if (!placeId) return;

    PlaceAPI.getOne(Number(placeId))
      .then((data) => setDestinationPlace(data))
      .catch(console.error);
  }, [placeId]);

  // Efecto para obtener la ubicación actual del usuario
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result = await PlaceAPI.getNearestPlace(
            position.coords.latitude,
            position.coords.longitude
          );
          setOriginPlace(result);
        } catch (err) {
          console.error("Error obteniendo el lugar más cercano:", err);
        }
      },
      (error) => console.error("Error obteniendo la ubicación", error),
      { enableHighAccuracy: true }
    );
  }, []);

  // Efecto para obtener las fechas programadas
  useEffect(() => {
    FlightApi.getScheduledDates(1, 2) // Reemplazar 1 y 2 por originPlace?.placeId y destinationPlace?.placeId
      .then((data) => setDates(data))
      .catch((err) => setError(err.message));
  }, []);

  // Efecto para obtener los vuelos según las fechas seleccionadas
  useEffect(() => {
    if (!originPlace || !destinationPlace || !dates.length) return;

    FlightApi.getFlightsByDate(dates[0], originPlace.placeId, destinationPlace.placeId)
      .then((response) => {
        console.log("Vuelos recibidos:", response);
        setFlights(response);
      })
      .catch((err) => setError(err.message));
  }, [originPlace, destinationPlace, dates]);

  // Efecto para obtener las aerolíneas disponibles
  useEffect(() => {
    fetch("http://localhost:4000/airline")
      .then((res) => res.json())
      .then((data) => {
        setAirlines(data);
        setSelectedAirlines(data.map((a: any) => a.name)); // Selecciona todas las aerolíneas al inicio
      })
      .catch(console.error);
  }, []);

  if (!destinationPlace) return <p className="p-6">Cargando...</p>;
  if (!dates.length) return <p className="text-gray-500">Cargando fechas...</p>;

  function convertDates(dates: string[]): DateItem[] {
    return dates.map((isoDate) => {
      const date = new Date(isoDate);
      const day = date.getDate().toString().padStart(2, "0");
      const monthNumber = Number((date.getMonth() + 1).toString().padStart(2, "0"));
      const year = date.getFullYear().toString();
      const formatter = new Intl.DateTimeFormat("es-MX", { weekday: "short", month: "short" });
      const parts = formatter.formatToParts(date);
      const weekday = parts.find((p) => p.type === "weekday")?.value || "";
      const monthText = parts.find((p) => p.type === "month")?.value || "";
      return { day: capitalize(weekday), date: day, month: capitalize(monthText), monthNumber, year, isSelected: false };
    });
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const filteredFlights = flights.filter((flight) => {
    const airlineMatch = selectedAirlines.includes(flight.airline.name);

    const flightHours =
      (new Date(flight.arrivalTime).getTime() -
        new Date(flight.departureTime).getTime()) /
      3600000;
    const durationMatch = flightHours <= selectedDuration;

    const price = calcularPrecioVuelo(
      flight.origin.latitude,
      flight.origin.longitude,
      flight.destination.latitude,
      flight.destination.longitude,
      flight.departureTime,
      0
    );
    const priceMatch = price <= selectedPrice;

    console.log("✈️ Evaluando:", {
      airline: flight.airline.name,
      price,
      priceMatch,
      flightHours,
      durationMatch,
      airlineMatch
    });

    return airlineMatch && durationMatch && priceMatch;
  });



  const originDestination: DateSelectorProps = {
    data: convertDates(dates),
    originId: originPlace?.placeId || 0,
    destinationId: destinationPlace.placeId || 0,
    setFlights
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-[#605DEC]">
              <ArrowLeft size={16} className="mr-2" />
              Modificar búsqueda
            </Link>
            <div className="mx-4 text-gray-300">|</div>
            <div>
              <span className="font-medium">{originPlace?.city}</span> → <span className="font-medium">{destinationPlace.city}</span> · 24 mayo · 1 adulto
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <StepperUI currentStep={1} totalSteps={3} />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-medium text-lg mb-4">Filtros</h2>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Precio</h3>
                <input type="range" min="0" max="30000" value={selectedPrice} onChange={(e) => setSelectedPrice(Number(e.target.value))} className="w-full accent-[#605DEC]" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>${selectedPrice}</span>
                </div>
              </div>

              {/* Filtros de aerolíneas */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Aerolíneas</h3>
                {airlines.map((airline) => (
                  <label
                    key={airline.airlineId}
                    className="flex items-center mb-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 accent-[#605DEC]"
                      checked={selectedAirlines.includes(airline.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAirlines([...selectedAirlines, airline.name]);
                        } else {
                          setSelectedAirlines(
                            selectedAirlines.filter((a) => a !== airline.name)
                          );
                        }
                      }}
                    />
                    <img
                      src={airline.logoUrl}
                      alt={airline.name}
                      className="w-5 h-5 object-contain mr-2"
                    />
                    {airline.name}
                  </label>
                ))}
              </div>

              {/* Filtro de duración */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Duración</h3>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(Number(e.target.value))}
                  className="w-full accent-[#605DEC]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0h</span>
                  <span>{selectedDuration}h</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:w-3/4">
            <DateSelector {...originDestination} />
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-bold mb-2">{`${filteredFlights.length} resultados`}</h2>
              {filteredFlights.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No se encontraron vuelos con los filtros actuales.
                </p>
              )}

              {filteredFlights.map((flight) => (
                <div
                  key={flight.flightId}
                  className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Información del origen */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={flight.airline.logoUrl}
                      alt={flight.airline.name}
                      width={110}
                      height={125}
                      className="object-contain"
                    />
                    <div className="text-center">
                      <div className="text-lg font-semibold">{flight.origin.name}</div>
                      <div className="text-blue-500">{formatIsoToHHMM(flight.departureTime)}</div>
                    </div>
                  </div>

                  {/* Información de la aerolínea */}
                  <div className="text-center">
                    <div className="font-medium">{flight.airline.name}</div>
                    <div className="text-sm text-gray-600">
                      {flightDuration(flight.departureTime, flight.arrivalTime)}
                    </div>
                  </div>

                  {/* Información del destino */}
                  <div className="text-center">
                    <div className="text-lg font-semibold">{flight.destination.city}</div>
                    <div className="text-blue-500">{formatIsoToHHMM(flight.arrivalTime)}</div>
                  </div>

                  {/* Precio y botón de reserva */}
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {calcularPrecioVuelo(
                        flight.origin.latitude,
                        flight.origin.longitude,
                        flight.destination.latitude,
                        flight.destination.longitude,
                        flight.departureTime,
                        0
                      ).toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
                    </div>


                    <button

                      onClick={() => {
                        
                        localStorage.setItem("price", JSON.stringify(calcularPrecioVuelo(
                          flight.origin.latitude,
                          flight.origin.longitude,
                          flight.destination.latitude,
                          flight.destination.longitude,
                          flight.departureTime,
                          0
                        ).toLocaleString("es-MX", { style: "currency", currency: "MXN" })));

                        router.push(`/reservation/passenger-info/${flight.flightId}`)
                      }}

                      className="cursor-pointer max-sm:w-full bg-[#003B80] text-white px-4 py-2 rounded-full mt-2 hover:bg-[#002f6c] transition-colors"
                    >
                      Reservar
                    </button>
                  <button
                    onClick={() => toggleExpanded(flight.flightId)}
                    className="p-2 text-gray-400 hover:text-[#003B80] transition-colors"
                  >
                    {expandedFlight === flight.flightId ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  
                  </div>

                  
          {/* Expandable Class Options */}
          <AnimatePresence>
            {expandedFlight === flight.flightId && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 bg-gray-50"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Asientos Normales */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#605DEC] transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">Asientos Normales</h4>
                          <p className="text-sm text-gray-600">Clase económica</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#605DEC]">{0}</p>
                          <p className="text-xs text-gray-500">extra por persona</p>
                        </div>
                      </div>
                    </div>

                    {/* Primera Clase */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#FFD700] transition-colors relative">
                      <div className="flex flex-col justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">Primera Clase</h4>
                          <p className="text-sm text-gray-600">Máximo confort</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#FFD700]">{process.env.NEXT_PUBLIC_PRECIO_PRIMERA_CLASE!}</p>
                          <p className="text-xs text-gray-500">extra por persona</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

                  


                </div>





))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
