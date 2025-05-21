import Link from "next/link"
import CheckInForm from "@/components/checkin-form"
import StepperUI from "@/components/stepper-ui"

export default function CheckInPage() {
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
            <Link href="#" className="text-gray-600 hover:text-[#605DEC]">
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

      {/* Stepper UI */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <StepperUI currentStep={2} totalSteps={3} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#4D89FF] to-[#7A6DFF] text-transparent bg-clip-text">
              Check-in de Equipaje
            </h1>
            <p className="text-gray-600">
              Por favor, ingresa los detalles de tu equipaje para agilizar el proceso de check-in en el aeropuerto.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Vuelo DL1234</h2>
                  <p className="text-gray-600">Nueva York (JFK) → París (CDG)</p>
                  <p className="text-gray-600">24 Mayo, 2025 · 08:30 AM</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  Check-in abierto
                </div>
              </div>
            </div>

            <CheckInForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">© 2025 Tripma. Todos los derechos reservados.</div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#605DEC]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                  width="20"
                  height="20"
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
                  width="20"
                  height="20"
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
        </div>
      </footer>
    </div>
  )
}
