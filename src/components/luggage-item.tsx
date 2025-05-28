"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Trash2, Luggage } from "lucide-react"

interface LuggageItemProps {
  item: {
    id: number
    type: string
    expanded: boolean
    width: string
    height: string
    depth: string
    weight: string
    valid: boolean
  }
  toggleExpand: (id: number) => void
  updateLuggageItem: (id: number, field: string, value: string) => void
  removeLuggageItem: (id: number) => void
}







  //calcular cargos extras
  type Luggage = {
    type: "cabina" | "documentada";
    width: number;
    height: number;
    depth: number;
    weight: number;
    extraAmount?: number; 
  };

  function calcularCargoExtra(maleta: Luggage): number {
    const reglas = {
      cabina: { maxW: 55, maxH: 40, maxD: 20, maxP: 10, base: 0, extraKg: 20 },
      documentada: {
        maxW: 80,
        maxH: 50,
        maxD: 30,
        maxP: 23,
        base: 300,
        extraKg: 15,
      },
    };

    const r = reglas[maleta.type];

    let extra = r.base;

    const { width, height, depth, weight, extraAmount } = maleta;

    const sizeExceeded = width > r.maxW || height > r.maxH || depth > r.maxD;

    const pesoExtra = weight > r.maxP ? weight - r.maxP : 0;

    if (sizeExceeded) {
      extra += 100; // Penalización por tamaño excedido
    }

    if (pesoExtra > 0) {
      extra += pesoExtra * r.extraKg;
    }

    return extra;
  }



















export default function LuggageItem({ item, toggleExpand, updateLuggageItem, removeLuggageItem }: LuggageItemProps) {
  const handleInputChange = (field: string, value: string) => {
    updateLuggageItem(item.id, field, value)
  }

  // Calcular si todos los campos están completos
  const isComplete = !!item.width && !!item.height && !!item.depth && !!item.weight

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={`border rounded-xl overflow-hidden ${isComplete ? "border-green-300 bg-green-50" : "border-gray-200"}`}
    >
      {/* Cabecera del acordeón */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${
          item.expanded ? "border-b border-gray-200" : ""
        }`}
        onClick={() => toggleExpand(item.id)}
      >
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isComplete ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            <Luggage size={20} />
          </div>
          <div>
            <h4 className="font-medium">{item.type}</h4>
            {isComplete && (
              <p className="text-sm text-gray-600">
                {item.width}x{item.height}x{item.depth} cm, {item.weight} kg
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {isComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mr-3"
            >
              Cargo Extra: ${calcularCargoExtra({
                type: item.type === "Maleta de cabina" ? "cabina" : "documentada",
                width: parseFloat(item.width),
                height: parseFloat(item.height),
                depth: parseFloat(item.depth),
                weight: parseFloat(item.weight),
              })}
            </motion.div>
          )}
          
          {isComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full mr-3"
            >
              Completo
            </motion.div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeLuggageItem(item.id)
            }}
            className="text-gray-400 hover:text-red-500 mr-2"
          >
            <Trash2 size={18} />
          </button>
          {item.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Contenido del acordeón */}
      {item.expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ancho (cm)</label>
              <div className="relative">
                <input
                  type="number"
                  value={item.width}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
                  placeholder="Ej: 55"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  cm
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alto (cm)</label>
              <div className="relative">
                <input
                  type="number"
                  value={item.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
                  placeholder="Ej: 40"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  cm
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profundidad (cm)</label>
              <div className="relative">
                <input
                  type="number"
                  value={item.depth}
                  onChange={(e) => handleInputChange("depth", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
                  placeholder="Ej: 20"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  cm
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
              <div className="relative">
                <input
                  type="number"
                  value={item.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
                  placeholder="Ej: 15"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  kg
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de equipaje</label>
            <select
              value={item.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC]"
            >
              <option value="Maleta de cabina">Maleta de cabina</option>
              <option value="Maleta documentada">Maleta documentada</option>
              <option value="Equipaje especial">Equipaje especial</option>
              <option value="Artículo personal">Artículo personal</option>
            </select>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
