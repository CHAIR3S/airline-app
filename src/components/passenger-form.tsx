"use client"

import type React from "react"

import { useState } from "react"
// import { motion } from "framer-motion"

export default function PassengerForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">
            Nombres
          </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
            placeholder="Nombres"
          />
        </div>

        <div>
          <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
            Apellidos
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
            placeholder="Apellidos"
          />
        </div>


        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Número de teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
            placeholder="Número de teléfono"
          />
        </div>

        <div>
          <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
            placeholder="MM/DD/YY"
          />
        </div>

        <div className="md:col-span-2">
          <div className="h-4"></div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#605DEC] focus:border-[#605DEC] transition-all duration-200"
            placeholder="Email"
          />
        </div>


      {/* <div>
        <label
          htmlFor="numeroConfirmacion"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Número de confirmación
        </label>
        <input
          type="text"
          id="numeroConfirmacion"
          name="numeroConfirmacion"
          value={formData.numeroConfirmacion}
          readOnly
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed focus:outline-none"
          placeholder="Número de confirmación"
        />
      </div> */}

      </div>

      <div className="mt-6">
        <div
          className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-r"
        //   initial={{ opacity: 0, x: -10 }}
        //   animate={{ opacity: 1, x: 0 }}
        //   transition={{ delay: 0.2 }}
        >
          <p className="text-sm">
            Por favor, asegúrese de que la información proporcionada coincida exactamente con la que aparece en su
            documento de identidad o pasaporte.
          </p>
        </div>
      </div>
    </div>
  )
}
