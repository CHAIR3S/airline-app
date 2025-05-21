"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Check, AlertCircle } from "lucide-react"
import LuggageItem from "@/components/luggage-item"

export default function CheckInForm() {
  const [luggageItems, setLuggageItems] = useState([
    { id: 1, type: "Maleta de cabina", expanded: true, width: "", height: "", depth: "", weight: "", valid: false },
    { id: 2, type: "Maleta documentada", expanded: false, width: "", height: "", depth: "", weight: "", valid: false },
  ])

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const addLuggageItem = () => {
    const newId = Math.max(0, ...luggageItems.map((item) => item.id)) + 1
    setLuggageItems([
      ...luggageItems,
      {
        id: newId,
        type: "Maleta documentada",
        expanded: true,
        width: "",
        height: "",
        depth: "",
        weight: "",
        valid: false,
      },
    ])
  }

  const removeLuggageItem = (id: number) => {
    setLuggageItems(luggageItems.filter((item) => item.id !== id))
  }

  const toggleExpand = (id: number) => {
    setLuggageItems(luggageItems.map((item) => (item.id === id ? { ...item, expanded: !item.expanded } : item)))
  }

  const updateLuggageItem = (id: number, field: string, value: string) => {
    setLuggageItems(
      luggageItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          // Validar si todos los campos están completos
          updatedItem.valid = !!updatedItem.width && !!updatedItem.height && !!updatedItem.depth && !!updatedItem.weight
          return updatedItem
        }
        return item
      }),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mostrar mensaje de éxito con animación
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const allItemsValid = luggageItems.every((item) => item.valid)
  const completionPercentage = Math.round(
    (luggageItems.filter((item) => item.valid).length / luggageItems.length) * 100,
  )

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Detalles del equipaje</h3>
          <motion.button
            type="button"
            onClick={addLuggageItem}
            className="flex items-center text-[#605DEC] hover:text-[#4F4ADB] font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} className="mr-1" />
            Añadir maleta
          </motion.button>
        </div>

        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progreso del check-in</span>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-[#605DEC] h-2.5"
              initial={{ width: "0%" }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        {/* Lista de maletas */}
        <div className="space-y-4">
          <AnimatePresence>
            {luggageItems.map((item) => (
              <LuggageItem
                key={item.id}
                item={item}
                toggleExpand={toggleExpand}
                updateLuggageItem={updateLuggageItem}
                removeLuggageItem={removeLuggageItem}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Información importante</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>El peso máximo permitido por maleta documentada es de 23 kg.</li>
                <li>Las dimensiones máximas para equipaje de mano son 55 x 40 x 20 cm.</li>
                <li>Asegúrate de que tus maletas estén correctamente etiquetadas.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end">
        <motion.button
          type="submit"
          className={`px-6 py-3 rounded-lg font-medium text-white ${
            allItemsValid ? "bg-[#605DEC] hover:bg-[#4F4ADB]" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!allItemsValid}
          whileHover={allItemsValid ? { scale: 1.03 } : {}}
          whileTap={allItemsValid ? { scale: 0.97 } : {}}
        >
          Completar Check-in
        </motion.button>
      </div>

      {/* Mensaje de éxito */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            className="fixed bottom-8 right-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Check className="h-5 w-5 mr-2" />
            <span>¡Check-in completado con éxito!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
