"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Check, AlertCircle } from "lucide-react"
import LuggageItem from "@/components/luggage-item"
import CheckoutForm from "./CheckoutForm"
import { calcularCargoExtra } from "@/utils/luggage"
import { parseCurrencyToCents } from "@/utils/pricing"

export default function CheckInForm() {
  const [totalLuggageCost, setTotalLuggageCost] = useState(0);
  

  const [luggageItems, setLuggageItems] = useState([
    { id: 1, type: "Maleta de cabina", expanded: true, width: "", height: "", depth: "", weight: "", valid: false, extraAmount: 0 },
    { id: 2, type: "Maleta documentada", expanded: false, width: "", height: "", depth: "", weight: "", valid: false, extraAmount: 0 },
  ])

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)


  
  const [priceBase, setPriceBase] = useState(0); // en centavos
  const [cargoExtra, setCargoExtra] = useState(0); // en centavos
  const [primeraClase, setPrimeraClase] = useState(false); // Estado para primera clase

  useEffect(() => {
    const priceStorage = localStorage.getItem("price");
    const base = parseCurrencyToCents(priceStorage ?? "0");
    setPriceBase(base);
  }, []);

  useEffect(() => {
    const primeraClaseStorage = localStorage.getItem("selected-seat-section");
    console.log("Primera clase desde localStorage:", primeraClaseStorage);
    setPrimeraClase(primeraClaseStorage == "first-class");
  }, []);

  useEffect(() => {
    const total = luggageItems.reduce((acc, item) => {
      if (item.valid) {
        acc += calcularCargoExtra({
          type: item.type === "Maleta de cabina" ? "cabina" : "documentada",
          width: parseFloat(item.width),
          height: parseFloat(item.height),
          depth: parseFloat(item.depth),
          weight: parseFloat(item.weight),
          extraAmount: item.extraAmount || 0,
        });
      }
      return acc;
    }, 0);
    setCargoExtra(total * 100); // convierte a centavos también
  }, [luggageItems]);

  const totalAPagar = priceBase + cargoExtra + (primeraClase ? Number(process.env.NEXT_PUBLIC_PRECIO_PRIMERA_CLASE!) * 100 : 0); // Agrega 1000 centavos si es primera clase

const addLuggageItem = () => {
  const newId = Math.max(0, ...luggageItems.map((item) => item.id)) + 1;
  const updated = [
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
      extraAmount: 0, 
    },
  ];
  setLuggageItems(updated);
  calcularTotalEquipaje(updated);
};


const removeLuggageItem = (id: number) => {
  const updated = luggageItems.filter((item) => item.id !== id);
  setLuggageItems(updated);
  calcularTotalEquipaje(updated);
};

  const toggleExpand = (id: number) => {
    setLuggageItems(luggageItems.map((item) => (item.id === id ? { ...item, expanded: !item.expanded } : item)))
  }

const updateLuggageItem = (id: number, field: string, value: string) => {
  const updated = luggageItems.map((item) => {
    if (item.id === id) {
      const updatedItem = { ...item, [field]: value };
      updatedItem.valid =
        !!updatedItem.width && !!updatedItem.height && !!updatedItem.depth && !!updatedItem.weight;
      return updatedItem;
    }
    return item;
  });

  setLuggageItems(updated);
  calcularTotalEquipaje(updated);
};


  const calcularTotalEquipaje = (items = luggageItems) => {
    let total = 0;

    const updatedItems = items.map((item) => {
      if (!item.valid) return item;

      const extra = calcularCargoExtra({
        type: item.type === "Maleta de cabina" ? "cabina" : "documentada",
        width: parseFloat(item.width),
        height: parseFloat(item.height),
        depth: parseFloat(item.depth),
        weight: parseFloat(item.weight),
      });

      total += extra;

      return {
        ...item,
        extraAmount: extra,
      };
    });

    setLuggageItems(updatedItems);
    setTotalLuggageCost(total);
    localStorage.setItem("luggageItems", JSON.stringify(updatedItems));
  };




  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // Mostrar mensaje de éxito con animación
  //   setShowSuccessMessage(true)
  //   console.log("Detalles del equipaje:", luggageItems)
  //   setTimeout(() => setShowSuccessMessage(false), 3000)
  // }

  const allItemsValid = luggageItems.every((item) => item.valid)
  const completionPercentage = Math.round(
    (luggageItems.filter((item) => item.valid).length / luggageItems.length) * 100,
  )

  return (
    // <form onSubmit={handleSubmit} className="p-6">
    <div className="p-6">
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
          <CheckoutForm money={totalAPagar / 100} />

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
    </div>
  )
}
