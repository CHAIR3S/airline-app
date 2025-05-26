"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Info } from "lucide-react"

type SeatStatus = "available" | "unavailable" | "selected" | "premium"
type ViewMode = "sections" | "seats"
type SectionType = "first-class" | "economy"

interface Seat {
  id: string
  status: SeatStatus
  section: SectionType
}

interface Section {
  id: SectionType
  name: string
  color: string
  description: string
  features: string[]
}

export default function SeatSelector() {
  const [viewMode, setViewMode] = useState<ViewMode>("sections")
  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null)
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  const sections: Section[] = [
    {
      id: "first-class",
      name: "Primera Clase",
      color: "#FFD700",
      description: "Máximo confort y lujo",
      features: [
        "Asiento reclinable 180°",
        "Comida gourmet incluida",
        "Entretenimiento premium",
        "Servicio personalizado",
        "Acceso a sala VIP",
        "Equipaje adicional gratuito",
      ],
    },
    {
      id: "economy",
      name: "Clase Económica",
      color: "#605DEC",
      description: "Comodidad y precio accesible",
      features: [
        "Asiento cómodo con espacio para las piernas",
        "Entretenimiento a bordo",
        "Snacks y bebidas incluidas",
        "Equipaje de mano incluido",
        "WiFi disponible",
        "Servicio amigable",
      ],
    },
  ]

  // Generar asientos para cada sección
  const generateSeats = (section: SectionType): Seat[][] => {
    if (section === "first-class") {
      // Primera clase: 3 filas de 2x2 (4 asientos por fila)
      const rows = 3
      const seatsPerRow = 4
      const seats: Seat[][] = []

      for (let i = 0; i < rows; i++) {
        const row: Seat[] = []
        for (let j = 0; j < seatsPerRow; j++) {
          const seatLetter = j < 2 ? String.fromCharCode(65 + j) : String.fromCharCode(67 + j - 2) // A,B,D,E
          row.push({
            id: `${i + 1}${seatLetter}`,
            status: "available",
            section: "first-class",
          })
        }
        seats.push(row)
      }
      return seats
    } else {
      // Clase económica: 8 filas de 3x3 (6 asientos por fila)
      const rows = 8
      const seatsPerRow = 6
      const seats: Seat[][] = []

      for (let i = 0; i < rows; i++) {
        const row: Seat[] = []
        for (let j = 0; j < seatsPerRow; j++) {
          const seatLetter = j < 3 ? String.fromCharCode(65 + j) : String.fromCharCode(68 + j - 3) // A,B,C,D,E,F
          row.push({
            id: `${i + 4}${seatLetter}`, // Empezar desde fila 4
            status: "available",
            section: "economy",
          })
        }
        seats.push(row)
      }
      return seats
    }
  }

  const handleSectionSelect = (sectionId: SectionType) => {
    setSelectedSection(sectionId)
    setViewMode("seats")
    setShowAlert(true)
  }

  const handleSeatClick = (seatId: string, status: SeatStatus) => {
    if (status === "unavailable") return

    setSelectedSeat(selectedSeat === seatId ? null : seatId)
  }

  const handleBackToSections = () => {
    setViewMode("sections")
    setSelectedSection(null)
    setSelectedSeat(null)
    setShowAlert(false)
  }

  const currentSection = sections.find((s) => s.id === selectedSection)
  const seats = selectedSection ? generateSeats(selectedSection) : []

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <AnimatePresence mode="wait">
        {viewMode === "sections" ? (
          <motion.div
            key="sections"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-[#605DEC]">Seleccione la sección del avión</h3>

            {/* Vista general del avión con secciones */}
            <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl overflow-hidden mx-auto max-w-lg p-8">
              {/* Cabina del piloto */}
              <div className="bg-gray-300 rounded-t-full h-16 w-3/4 mx-auto mb-4"></div>

              {/* Sección Primera Clase */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSectionSelect("first-class")}
                className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg p-6 mb-4 cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-all"
              >
                <div className="text-center">
                  <h4 className="font-semibold text-yellow-800 mb-2">Primera Clase</h4>
                  <p className="text-sm text-yellow-700">3 filas • 12 asientos</p>
                  <div className="grid grid-cols-4 gap-1 mt-3 max-w-24 mx-auto">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-yellow-600 rounded-sm"></div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Separador */}
              <div className="h-4 bg-gray-400 rounded mx-4 mb-4"></div>

              {/* Sección Clase Económica */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSectionSelect("economy")}
                className="bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg p-6 cursor-pointer border-2 border-transparent hover:border-[#605DEC] transition-all"
              >
                <div className="text-center">
                  <h4 className="font-semibold text-[#605DEC] mb-2">Clase Económica</h4>
                  <p className="text-sm text-purple-700">8 filas • 48 asientos</p>
                  <div className="grid grid-cols-6 gap-1 mt-3 max-w-36 mx-auto">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-[#605DEC] rounded-sm"></div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Cola del avión */}
              <div className="bg-gray-300 rounded-b-full h-12 w-2/3 mx-auto mt-4"></div>
            </div>

            {/* Información general */}
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">Cada uno de nuestros asientos incluye:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Entretenimiento personal con pantalla táctil</li>
                    <li>• Puerto USB para cargar dispositivos</li>
                    <li>• Almohada y manta de cortesía</li>
                    <li>• Servicio de bebidas durante el vuelo</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="seats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header con botón de regreso */}
            <div className="flex items-center mb-6">
              <button
                onClick={handleBackToSections}
                className="flex items-center text-[#605DEC] hover:text-[#4F4ADB] transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver a secciones
              </button>
              <h3 className="text-xl font-semibold text-[#605DEC]">Seleccione su asiento - {currentSection?.name}</h3>
            </div>

            {/* Alerta específica de la sección */}
            {showAlert && currentSection && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg border-l-4 ${
                  selectedSection === "first-class" ? "bg-yellow-50 border-yellow-500" : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex items-start">
                  <Info
                    className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${
                      selectedSection === "first-class" ? "text-yellow-500" : "text-blue-500"
                    }`}
                  />
                  <div>
                    <h4
                      className={`font-medium mb-2 ${
                        selectedSection === "first-class" ? "text-yellow-800" : "text-blue-800"
                      }`}
                    >
                      Los asientos de {currentSection.name} incluyen:
                    </h4>
                    <ul
                      className={`text-sm space-y-1 ${
                        selectedSection === "first-class" ? "text-yellow-700" : "text-blue-700"
                      }`}
                    >
                      {currentSection.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Leyenda */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-sm mr-2 ${
                    selectedSection === "first-class" ? "bg-yellow-500" : "bg-[#605DEC]"
                  }`}
                ></div>
                <span className="text-sm text-gray-600">Disponible</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">Ocupado</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-sm mr-2 ring-2 ring-offset-2 ${
                    selectedSection === "first-class" ? "bg-yellow-600 ring-yellow-600" : "bg-[#3A36B1] ring-[#3A36B1]"
                  }`}
                ></div>
                <span className="text-sm text-gray-600">Seleccionado</span>
              </div>
            </div>

            {/* Mapa de asientos */}
            <div className="relative bg-gray-50 rounded-2xl p-6 mx-auto max-w-md">
              <div className={`grid gap-2 ${selectedSection === "first-class" ? "grid-cols-4" : "grid-cols-6"}`}>
                {seats.flat().map((seat, index) => (
                  <motion.div
                    key={seat.id}
                    whileHover={seat.status !== "unavailable" ? { scale: 1.1 } : {}}
                    whileTap={seat.status !== "unavailable" ? { scale: 0.95 } : {}}
                    onClick={() => handleSeatClick(seat.id, seat.status)}
                    className={`
                      w-10 h-10 rounded-md cursor-pointer flex items-center justify-center text-xs font-medium transition-all
                      ${
                        seat.status === "available"
                          ? selectedSection === "first-class"
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-[#605DEC] text-white hover:bg-[#4F4ADB]"
                          : ""
                      }
                      ${seat.status === "unavailable" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}
                      ${
                        seat.status === "selected" || selectedSeat === seat.id
                          ? selectedSection === "first-class"
                            ? "bg-yellow-600 text-white ring-2 ring-offset-2 ring-yellow-600"
                            : "bg-[#3A36B1] text-white ring-2 ring-offset-2 ring-[#3A36B1]"
                          : ""
                      }
                    `}
                  >
                    {seat.id}
                  </motion.div>
                ))}
              </div>

              {/* Pasillo central para clase económica */}
              {selectedSection === "economy" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-3/4 bg-gray-300 rounded-full pointer-events-none"></div>
              )}
            </div>

            {/* Confirmación de asiento seleccionado */}
            {selectedSeat && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-green-800 font-medium text-center">
                  ✓ Has seleccionado el asiento {selectedSeat} en {currentSection?.name}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
