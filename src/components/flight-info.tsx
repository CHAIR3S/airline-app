import { Airline, Place } from "@/types/flight";
import { convertDate, flightDuration, formatTo12Hour } from "@/utils/datetime";
import { distance } from "@/utils/pricing";
import { Weather } from "@/types/flight";



export function WeatherIcon({ type }: { type: Weather }) {
  switch (type) {
    case Weather.SUNNY:
      return (
        <svg
          className="text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      );
    case Weather.RAINY:
      return (
        <svg
          className="text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M16 13a4 4 0 100-8 4 4 0 00-3.5 2.11A6 6 0 104 13h12zM8 19h.01M12 19h.01M16 19h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case Weather.CLOUDY:
      return (
        <svg
          className="text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.5 19a4.5 4.5 0 100-9 6 6 0 00-11.7 1.2A4 4 0 004 19h13.5z" />
        </svg>
      );
    case Weather.STORMY:
      return (
        <svg
          className="text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 11V7.5a3.5 3.5 0 00-7 0V11H2l5 6v3h4v-3l5-6h-3z" />
        </svg>
      );
    case Weather.SNOWY:
      return (
        <svg
          className="text-blue-300"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 17H4a4 4 0 010-8 5.5 5.5 0 0110.42-2.33A4.5 4.5 0 0117.5 9a4.5 4.5 0 012.5 8zM8 19h.01M12 19h.01M16 19h.01" />
        </svg>
      );
    case Weather.WINDY:
      return (
        <svg
          className="text-cyan-500"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12h16M4 18h10M4 6h8" />
        </svg>
      );
    case Weather.FOGGY:
      return (
        <svg
          className="text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M3 16h18M3 20h18" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FlightInfo({
  flightId,
  origin,
  destination,
  departureDate,
  arrivalDate,
  airline,
  weather,
}: any) {
  console.log(
    "FlightInfo",
    flightId,
    origin,
    destination,
    departureDate,
    arrivalDate,
    airline,
    weather
  );

  var departureFormatted;
  var arrivalFormatted;

  const km = distance(
    origin?.latitude || "0",
    origin?.longitude || "0",
    destination?.latitude || "0",
    destination?.longitude || "0"
  );

  if (departureDate || arrivalDate) {
    departureFormatted = convertDate(departureDate || "");

    arrivalFormatted = convertDate(arrivalDate || "");
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cabecera con número de vuelo */}
      <div className="bg-[#605DEC] text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Vuelo 000{flightId}</h2>
          {/* <span className="text-sm bg-white text-[#605DEC] px-2 py-1 rounded-full font-medium">En vuelo</span> */}
        </div>
        <p className="text-sm opacity-90">
          {origin?.country} ({origin?.city}) → {destination?.country} (
          {destination?.city})
        </p>
      </div>

      {/* Información del vuelo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Salida</p>
            <p className="text-xl font-bold">
              {formatTo12Hour(departureDate || "")}
            </p>
            <p className="text-sm text-gray-700">{`${departureFormatted?.date} ${departureFormatted?.month}, ${departureFormatted?.year}`}</p>
            <p className="text-sm text-gray-700">{origin?.terminal}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Llegada</p>
            <p className="text-xl font-bold">
              {formatTo12Hour(arrivalDate || "")}
            </p>
            <p className="text-sm text-gray-700">{`${arrivalFormatted?.date} ${arrivalFormatted?.month}, ${arrivalFormatted?.year}`}</p>
            <p className="text-sm text-gray-700">{destination?.terminal}</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-3 h-3 rounded-full bg-[#605DEC]"></div>
          <div className="flex-1 h-0.5 bg-[#605DEC] mx-2"></div>
          <div className="w-3 h-3 rounded-full bg-[#605DEC]"></div>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <span></span>
          <span>Distancia: {km} km</span>
        </div>
      </div>

      {/* Estado del vuelo */}
      {/* <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium mb-3">Estado del vuelo</h3>
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Progreso</span>
            <span className="text-sm font-medium">42%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#605DEC] h-2.5 rounded-full" style={{ width: "42%" }}></div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>Velocidad: 870 km/h</p>
            <p>Altitud: 10,668 m</p>
            <p>Tiempo restante: 4h 30m</p>
          </div>
        </div>
      </div> */}

      {/* Información meteorológica */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium mb-3">Clima en destino</h3>
        <div className="mt-2 pt-1 flex flex-row">
          <div className="mr-4 ">
            <WeatherIcon type={weather as Weather} />
          </div>
          <div>
            <p className="text-sm text-gray-600">{weather}</p>
          </div>
        </div>
      </div>

      {/* Aerolínea */}
      {/* <div className="p-4">
        <h3 className="font-medium mb-3">Operado por</h3>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-800 font-bold">DL</span>
          </div>
          <div>
            <p className="font-medium">Delta Airlines</p>
            <p className="text-sm text-gray-600">Airbus A350-900</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
