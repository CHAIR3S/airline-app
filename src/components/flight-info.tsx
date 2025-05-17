export default function FlightInfo() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cabecera con número de vuelo */}
      <div className="bg-[#605DEC] text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Vuelo DL1234</h2>
          <span className="text-sm bg-white text-[#605DEC] px-2 py-1 rounded-full font-medium">En vuelo</span>
        </div>
        <p className="text-sm opacity-90">Nueva York (JFK) → París (CDG)</p>
      </div>

      {/* Información del vuelo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Salida</p>
            <p className="text-xl font-bold">08:30 AM</p>
            <p className="text-sm text-gray-700">24 Mayo, 2025</p>
            <p className="text-sm text-gray-700">Terminal 4</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Llegada</p>
            <p className="text-xl font-bold">10:15 PM</p>
            <p className="text-sm text-gray-700">24 Mayo, 2025</p>
            <p className="text-sm text-gray-700">Terminal 2E</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-3 h-3 rounded-full bg-[#605DEC]"></div>
          <div className="flex-1 h-0.5 bg-[#605DEC] mx-2"></div>
          <div className="w-3 h-3 rounded-full bg-[#605DEC]"></div>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <span>Duración: 7h 45m</span>
          <span>Distancia: 5,834 km</span>
        </div>
      </div>

      {/* Estado del vuelo */}
      <div className="p-4 border-b border-gray-200">
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
      </div>

      {/* Información meteorológica */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium mb-3">Clima en destino</h3>
        <div className="flex items-center">
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500"
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
          </div>
          <div>
            <p className="text-xl font-bold">22°C</p>
            <p className="text-sm text-gray-600">Soleado</p>
          </div>
        </div>
      </div>

      {/* Aerolínea */}
      <div className="p-4">
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
      </div>
    </div>
  )
}
