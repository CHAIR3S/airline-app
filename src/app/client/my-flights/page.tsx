import Link from "next/link"
import FlightCard from "@/components/flight-card"

export default function MyFlightsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#605DEC]">
            Tripma
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-gray-600 hover:text-[#605DEC]">
              Vuelos
            </Link>
            <Link href="#" className="text-gray-600 hover:text-[#605DEC] font-medium">
              Ver mis vuelos
            </Link>
            <Link href="#" className="text-gray-600 hover:text-[#605DEC]">
              Inicio de sesión
            </Link>
            <Link
              href="#"
              className="bg-[#605DEC] text-white px-4 py-2 rounded-md hover:bg-[#4F4ADB] transition-colors"
            >
              Registro
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis vuelos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Flight Card 1 */}
          <FlightCard
            image="/placeholder.svg?height=300&width=600"
            departureDate="February 25th, 2021"
            arrivalDate="March 21st, 2021"
            duration="16h 45m"
            airline="Hawaiian Airlines"
            departureTime="7:00AM"
            arrivalTime="4:15PM"
            stops="1 stop"
            layover="2h 45m in HNL"
          />

          {/* Flight Card 2 */}
          <FlightCard
            image="/placeholder.svg?height=300&width=600"
            departureDate="February 25th, 2021"
            arrivalDate="March 21st, 2021"
            duration="16h 45m"
            airline="Hawaiian Airlines"
            departureTime="7:00AM"
            arrivalTime="4:15PM"
            stops="1 stop"
            layover="2h 45m in HNL"
          />

          {/* Flight Card 3 */}
          <FlightCard
            image="/placeholder.svg?height=300&width=600"
            departureDate="February 25th, 2021"
            arrivalDate="March 21st, 2021"
            duration="16h 45m"
            airline="Hawaiian Airlines"
            departureTime="7:00AM"
            arrivalTime="4:15PM"
            stops="1 stop"
            layover="2h 45m in HNL"
          />

          {/* Flight Card 4 */}
          <FlightCard
            image="/placeholder.svg?height=300&width=600"
            departureDate="February 25th, 2021"
            arrivalDate="March 21st, 2021"
            duration="16h 45m"
            airline="Hawaiian Airlines"
            departureTime="7:00AM"
            arrivalTime="4:15PM"
            stops="1 stop"
            layover="2h 45m in HNL"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#605DEC] mb-6">Tripma</h2>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    About Tripma
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-[#605DEC] text-sm">
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">© 2025 Odisea incorporated</div>
        </div>
      </footer>
    </div>
  )
}
