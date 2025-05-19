"use client"

import type React from "react"

import { useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, User, Mail, Phone, CreditCard, Briefcase, DollarSign } from "lucide-react"

export default function CreateEmployeeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    position: "",
    salary: "",
    photo: null as File | null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null }))
    setPhotoPreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos del formulario
    console.log("Datos del empleado:", formData)
    // Cerrar el modal después de enviar
    setIsOpen(false)
    // Resetear el formulario
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      employeeId: "",
      position: "",
      salary: "",
      photo: null,
    })
    setPhotoPreview(null)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-[#605DEC] hover:bg-[#4F4ADB] text-white px-4 py-2 rounded-md transition-colors"
      >
        Crear empleado
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white rounded-lg w-full max-w-md mx-auto overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Crear Nuevo Empleado</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              {/* Foto de perfil */}
              <div className="mb-4 flex flex-col items-center">
                <div className="mb-2">
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Vista previa"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="flex items-center text-sm text-[#605DEC] cursor-pointer">
                  <Upload size={16} className="mr-1" />
                  Subir foto
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="mb-4">
                  <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 w-full"
                      placeholder="Nombre"
                      required
                    />
                    <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Apellido */}
                <div className="mb-4">
                  <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </Label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 w-full"
                      placeholder="Apellido"
                      required
                    />
                    <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Teléfono */}
              <div className="mb-4">
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                  <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* ID Empleado */}
              <div className="mb-4">
                <Label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                  ID Empleado
                </Label>
                <div className="relative">
                  <Input
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="pl-10 w-full"
                    placeholder="EMP-001"
                    required
                  />
                  <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Puesto */}
              <div className="mb-4">
                <Label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Puesto
                </Label>
                <div className="relative">
                  <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Seleccionar puesto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Piloto">Piloto</SelectItem>
                      <SelectItem value="Azafata">Azafata</SelectItem>
                      <SelectItem value="Técnico de Mantenimiento">Técnico de Mantenimiento</SelectItem>
                      <SelectItem value="Gerente de Operaciones">Gerente de Operaciones</SelectItem>
                      <SelectItem value="Controlador Aéreo">Controlador Aéreo</SelectItem>
                      <SelectItem value="Agente de Reservas">Agente de Reservas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Briefcase size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Salario */}
              <div className="mb-6">
                <Label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salario Anual ($)
                </Label>
                <div className="relative">
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    className="pl-10 w-full"
                    placeholder="50000"
                    required
                  />
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-gray-300 text-gray-700"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#605DEC] hover:bg-[#4F4ADB] text-white">
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}
