"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StepperUI from "@/components/stepper-ui";
import DateSelector, { DateItem, DateSelectorProps } from "@/components/ui/date-selector";
import { Place, PlaceAPI } from "@/lib/api/place";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FlightApi } from "@/lib/api/flight";
import { Flight } from "@/types/flight";
import { flightDuration, formatIsoToHHMM } from "@/utils/datetime";
import { calcularPrecioVuelo } from "@/utils/pricing";
import { useRouter } from "next/navigation";



export default function DatePage() {
  const { placeId } = useParams();
  
  // hook lugar de destino
  const [destinationPlace, setDestinationPlace] = useState<Place | null>(null);

  //hook lugar de origen
  const [originPlace, setOriginPlace] = useState<Place | null>(null);

  // hook contador
  
  //hook para fechas
  const [dates, setDates] = useState<string[]>([]);
  
  // hook para error
  const [error, setError] = useState("");

  const router = useRouter()

  // Obtener el destino (desde el parámetro placeId de la URL)
  useEffect(() => {
    if (!placeId) return;

    PlaceAPI.getOne(Number(placeId))
      .then((data) => setDestinationPlace(data))
      .catch(console.error);
  }, [placeId]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

          try {
            const result = await PlaceAPI.getNearestPlace(lat, lng);
            setOriginPlace(result);
          } catch (err: any) {
            console.log(err);
          }
      },
      (error) => {
        console.error('Error getting location', error);
      },
      { enableHighAccuracy: true }
    );
  }, []);


  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await FlightApi.getScheduledDates(1, 2); 
        setDates(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchDates();
  }, []);


  const [flights, setFlights] = useState<any>([]);


  if (!destinationPlace) return <p className="p-6">Cargando...</p>;
  if (!dates.length) return <p className="text-gray-500">Cargando fechas...</p>;



  function convertDates(dates: string[]): DateItem[] {
    return dates.map((isoDate) => {
      const date = new Date(isoDate);

      const day = date.getDate().toString().padStart(2, "0");
      const monthNumber = Number((date.getMonth() + 1).toString().padStart(2, "0")); // 01-12
      const year = date.getFullYear().toString();

      const formatter = new Intl.DateTimeFormat("es-MX", {
        weekday: "short",
        month: "short",
      });

      const parts = formatter.formatToParts(date);
      const weekday = parts.find((p) => p.type === "weekday")?.value || "";
      const monthText = parts.find((p) => p.type === "month")?.value || "";

      const result: DateItem = {
          day: capitalize(weekday),    // Ej: "Jue"
          date: day,                   // Ej: "22"
          month: capitalize(monthText),// Ej: "May"
          monthNumber,                // Ej: "05"
          year,                       // Ej: "2025"
          isSelected: false,          // Estado inicial
        }

      return result;
    });
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }


  const originDestination: DateSelectorProps = {
    data: convertDates(dates),
    originId: originPlace?.placeId || 0,
    destinationId: destinationPlace.placeId || 0,
    setFlights: setFlights
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Summary */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-[#605DEC]">
              <ArrowLeft size={16} className="mr-2" />
              Modificar búsqueda
            </Link>
            <div className="mx-4 text-gray-300">|</div>
            <div>
              <span className="font-medium">{originPlace?.city}</span> →{" "}
              <span className="font-medium">{destinationPlace.city}</span> · 24 mayo · 1 adulto
            </div>
          </div>
        </div>
      </div>

      {/* Stepper UI */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <StepperUI currentStep={1} totalSteps={3} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-medium text-lg mb-4">Filtros</h2>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Precio
                </h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  defaultValue="300"
                  className="w-full accent-[#605DEC]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Aerolíneas
                </h3>
                {[
                  "Delta Airlines",
                  "Spirit Airlines",
                  "American Airlines",
                  "United Airlines",
                ].map((airline, idx) => (
                  <label key={idx} className="flex items-center mb-1 text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 accent-[#605DEC]"
                      defaultChecked={idx < 2}
                    />
                    {airline}
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Escalas
                </h3>
                {["Directo", "1 escala", "2+ escalas"].map((scale, idx) => (
                  <label key={idx} className="flex items-center mb-1 text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 accent-[#605DEC]"
                      defaultChecked={idx === 0}
                    />
                    {scale}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Duración
                </h3>
                <input
                  type="range"
                  min="0"
                  max="24"
                  defaultValue="2"
                  className="w-full accent-[#605DEC]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0h</span>
                  <span>24h</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:w-3/4">
              <DateSelector  {...originDestination} /> 
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-bold mb-2">{`${flights.length} resultados`}</h2>
              {flights.map((flight: Flight) => (
                <div
                  key={flight.flightId}
                  className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={flight.airline.logoUrl}
                      alt={flight.airline.name}
                      width={110}
                      height={125}
                      className="object-contain"
                    />
                    <div className="text-center ">
                      <div className="text-lg font-semibold">{flight.origin.name}</div>
                      <div className="text-blue-500">
                        {formatIsoToHHMM(flight.departureTime)}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{flight.airline.name}</div>
                    <div className="text-sm text-gray-600">
                      {flightDuration(flight.departureTime, flight.arrivalTime)}
                    </div>
                    {/* <div className="text-sm text-gray-500">{flight.type}</div> */}
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{flight.destination.city}</div>
                    <div className="text-blue-500">{formatIsoToHHMM(flight.arrivalTime)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{calcularPrecioVuelo(flight.origin.latitude, flight.origin.longitude, flight.destination.latitude, flight.destination.longitude, flight.departureTime, 0)}</div>
                    <button
                      onClick={() => {
                        console.log("Reservar vuelo", flight.flightId);
                        router.push(`/reservation/passenger-info/${flight.flightId}`);
                      }}
                    className="
                    max-sm:w-full
                    bg-[#003B80] text-white px-4 py-2 rounded-full mt-2 hover:bg-[#002f6c] transition-colors
                    cursor-pointer">
                      Reservar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
