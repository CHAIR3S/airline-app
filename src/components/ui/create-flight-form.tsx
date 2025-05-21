"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Plane, Calendar, Clock, MapPin, DollarSign, Users, Briefcase, Info, AlertTriangle, Check } from "lucide-react"

export default function CreateFlightForm() {
  const [formData, setFormData] = useState({
    // Información básica del vuelo
    flightNumber: "",
    airline: "",
    aircraft: "",
    status: "scheduled",

    // Origen y destino
    origin: "",
    originAirport: "",
    originTerminal: "",
    originGate: "",
    departureDate: "",
    departureTime: "",
    departureTimezone: "GMT-6",

    destination: "",
    destinationAirport: "",
    destinationTerminal: "",
    destinationGate: "",
    arrivalDate: "",
    arrivalTime: "",
    arrivalTimezone: "GMT-6",

    // Duración y escalas
    duration: "",
    hasLayover: false,
    layoverAirport: "",
    layoverDuration: "",

    // Precios y asientos
    economyPrice: "",
    economySeats: "",
    economyBaggage: "1 maleta de mano, 1 maleta documentada (23kg)",
    economyServices: "Bebidas no alcohólicas, snack básico",

    premiumPrice: "",
    premiumSeats: "",
    premiumBaggage: "1 maleta de mano, 2 maletas documentadas (23kg c/u)",
    premiumServices: "Comida caliente, bebidas alcohólicas y no alcohólicas, prioridad de embarque",

    businessPrice: "",
    businessSeats: "",
    businessBaggage: "2 maletas de mano, 2 maletas documentadas (32kg c/u)",
    businessServices: "Menú gourmet, bebidas premium, acceso a sala VIP, prioridad en todo",

    // Información adicional
    crewMembers: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos del vuelo:", formData)
    // Aquí iría la lógica para enviar los datos del formulario
    alert("Vuelo creado con éxito")
  }

  const airlines = [
    "Aeroméxico",
    "Air France",
    "American Airlines",
    "British Airways",
    "Delta Airlines",
    "Emirates",
    "Iberia",
    "Japan Airlines",
    "KLM",
    "Lufthansa",
    "Qatar Airways",
    "Singapore Airlines",
    "United Airlines",
    "Volaris",
  ]

  const aircraftTypes = [
    "Airbus A320",
    "Airbus A330",
    "Airbus A350",
    "Airbus A380",
    "Boeing 737",
    "Boeing 747",
    "Boeing 777",
    "Boeing 787 Dreamliner",
    "Embraer E190",
  ]

  const airports = [
    { code: "MEX", name: "Aeropuerto Internacional Benito Juárez", city: "Ciudad de México" },
    { code: "GDL", name: "Aeropuerto Internacional de Guadalajara", city: "Guadalajara" },
    { code: "CUN", name: "Aeropuerto Internacional de Cancún", city: "Cancún" },
    { code: "MTY", name: "Aeropuerto Internacional de Monterrey", city: "Monterrey" },
    { code: "TIJ", name: "Aeropuerto Internacional de Tijuana", city: "Tijuana" },
    { code: "JFK", name: "John F. Kennedy International Airport", city: "Nueva York" },
    { code: "LAX", name: "Los Angeles International Airport", city: "Los Ángeles" },
    { code: "MAD", name: "Aeropuerto Adolfo Suárez Madrid-Barajas", city: "Madrid" },
    { code: "CDG", name: "Aéroport de Paris-Charles de Gaulle", city: "París" },
    { code: "LHR", name: "London Heathrow Airport", city: "Londres" },
  ]

  const timezones = [
    "GMT-8",
    "GMT-7",
    "GMT-6",
    "GMT-5",
    "GMT-4",
    "GMT-3",
    "GMT",
    "GMT+1",
    "GMT+2",
    "GMT+3",
    "GMT+8",
    "GMT+9",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Información Básica</TabsTrigger>
          <TabsTrigger value="route">Ruta y Horarios</TabsTrigger>
          <TabsTrigger value="classes">Clases y Precios</TabsTrigger>
          <TabsTrigger value="additional">Información Adicional</TabsTrigger>
        </TabsList>

        {/* Pestaña de Información Básica */}
        <TabsContent value="basic" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Número de vuelo */}
            <div>
              <Label htmlFor="flightNumber" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Plane className="h-4 w-4 mr-1" />
                Número de Vuelo
              </Label>
              <Input
                id="flightNumber"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="Ej: AM123"
                className="w-full"
                required
              />
            </div>

            {/* Aerolínea */}
            <div>
              <Label htmlFor="airline" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Plane className="h-4 w-4 mr-1" />
                Aerolínea
              </Label>
              <Select value={formData.airline} onValueChange={(value) => handleSelectChange("airline", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar aerolínea" />
                </SelectTrigger>
                <SelectContent>
                  {airlines.map((airline) => (
                    <SelectItem key={airline} value={airline}>
                      {airline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de avión */}
            <div>
              <Label htmlFor="aircraft" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Plane className="h-4 w-4 mr-1" />
                Tipo de Avión
              </Label>
              <Select value={formData.aircraft} onValueChange={(value) => handleSelectChange("aircraft", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de avión" />
                </SelectTrigger>
                <SelectContent>
                  {aircraftTypes.map((aircraft) => (
                    <SelectItem key={aircraft} value={aircraft}>
                      {aircraft}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Estado del vuelo */}
            <div>
              <Label htmlFor="status" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Info className="h-4 w-4 mr-1" />
                Estado del Vuelo
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Programado</SelectItem>
                  <SelectItem value="on-time">En tiempo</SelectItem>
                  <SelectItem value="delayed">Retrasado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        {/* Pestaña de Ruta y Horarios */}
        <TabsContent value="route" className="space-y-6 pt-4">
          <div className="space-y-6">
            {/* Origen */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Origen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Ciudad de Origen
                  </Label>
                  <Select value={formData.origin} onValueChange={(value) => handleSelectChange("origin", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.city} value={airport.city}>
                          {airport.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="originAirport" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Plane className="h-4 w-4 mr-1" />
                    Aeropuerto de Origen
                  </Label>
                  <Select
                    value={formData.originAirport}
                    onValueChange={(value) => handleSelectChange("originAirport", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar aeropuerto" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          {airport.name} ({airport.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="departureDate" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Fecha de Salida
                  </Label>
                  <Input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="departureTime" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Hora de Salida
                  </Label>
                  <Input
                    id="departureTime"
                    name="departureTime"
                    type="time"
                    value={formData.departureTime}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="departureTimezone"
                    className="flex items-center text-sm font-medium text-gray-700 mb-1"
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Zona Horaria de Origen
                  </Label>
                  <Select
                    value={formData.departureTimezone}
                    onValueChange={(value) => handleSelectChange("departureTimezone", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone} value={timezone}>
                          {timezone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="originTerminal"
                      className="flex items-center text-sm font-medium text-gray-700 mb-1"
                    >
                      Terminal
                    </Label>
                    <Input
                      id="originTerminal"
                      name="originTerminal"
                      value={formData.originTerminal}
                      onChange={handleChange}
                      placeholder="Ej: T1"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="originGate" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      Puerta
                    </Label>
                    <Input
                      id="originGate"
                      name="originGate"
                      value={formData.originGate}
                      onChange={handleChange}
                      placeholder="Ej: A12"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Destino */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Destino</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destination" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Ciudad de Destino
                  </Label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) => handleSelectChange("destination", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.city} value={airport.city}>
                          {airport.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="destinationAirport"
                    className="flex items-center text-sm font-medium text-gray-700 mb-1"
                  >
                    <Plane className="h-4 w-4 mr-1" />
                    Aeropuerto de Destino
                  </Label>
                  <Select
                    value={formData.destinationAirport}
                    onValueChange={(value) => handleSelectChange("destinationAirport", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar aeropuerto" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          {airport.name} ({airport.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="arrivalDate" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Fecha de Llegada
                  </Label>
                  <Input
                    id="arrivalDate"
                    name="arrivalDate"
                    type="date"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="arrivalTime" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Hora de Llegada
                  </Label>
                  <Input
                    id="arrivalTime"
                    name="arrivalTime"
                    type="time"
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="arrivalTimezone" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Zona Horaria de Destino
                  </Label>
                  <Select
                    value={formData.arrivalTimezone}
                    onValueChange={(value) => handleSelectChange("arrivalTimezone", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone} value={timezone}>
                          {timezone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="destinationTerminal"
                      className="flex items-center text-sm font-medium text-gray-700 mb-1"
                    >
                      Terminal
                    </Label>
                    <Input
                      id="destinationTerminal"
                      name="destinationTerminal"
                      value={formData.destinationTerminal}
                      onChange={handleChange}
                      placeholder="Ej: T2"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="destinationGate"
                      className="flex items-center text-sm font-medium text-gray-700 mb-1"
                    >
                      Puerta
                    </Label>
                    <Input
                      id="destinationGate"
                      name="destinationGate"
                      value={formData.destinationGate}
                      onChange={handleChange}
                      placeholder="Ej: B15"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Duración y Escalas */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Duración y Escalas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Duración del Vuelo
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ej: 2h 30m"
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Label htmlFor="hasLayover" className="flex items-center text-sm font-medium text-gray-700">
                    <Plane className="h-4 w-4 mr-1" />
                    ¿Tiene Escala?
                  </Label>
                  <Switch
                    id="hasLayover"
                    checked={formData.hasLayover}
                    onCheckedChange={(checked) => handleSwitchChange("hasLayover", checked)}
                  />
                </div>

                {formData.hasLayover && (
                  <>
                    <div>
                      <Label
                        htmlFor="layoverAirport"
                        className="flex items-center text-sm font-medium text-gray-700 mb-1"
                      >
                        <Plane className="h-4 w-4 mr-1" />
                        Aeropuerto de Escala
                      </Label>
                      <Select
                        value={formData.layoverAirport}
                        onValueChange={(value) => handleSelectChange("layoverAirport", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar aeropuerto" />
                        </SelectTrigger>
                        <SelectContent>
                          {airports.map((airport) => (
                            <SelectItem key={airport.code} value={airport.code}>
                              {airport.name} ({airport.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label
                        htmlFor="layoverDuration"
                        className="flex items-center text-sm font-medium text-gray-700 mb-1"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Duración de la Escala
                      </Label>
                      <Input
                        id="layoverDuration"
                        name="layoverDuration"
                        value={formData.layoverDuration}
                        onChange={handleChange}
                        placeholder="Ej: 1h 45m"
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Pestaña de Clases y Precios */}
        <TabsContent value="classes" className="space-y-6 pt-4">
          {/* Clase Económica */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Clase Económica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="economyPrice" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Precio (USD)
                </Label>
                <Input
                  id="economyPrice"
                  name="economyPrice"
                  type="number"
                  value={formData.economyPrice}
                  onChange={handleChange}
                  placeholder="Ej: 299.99"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="economySeats" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Users className="h-4 w-4 mr-1" />
                  Asientos Disponibles
                </Label>
                <Input
                  id="economySeats"
                  name="economySeats"
                  type="number"
                  value={formData.economySeats}
                  onChange={handleChange}
                  placeholder="Ej: 150"
                  className="w-full"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="economyBaggage" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Equipaje Permitido
                </Label>
                <Input
                  id="economyBaggage"
                  name="economyBaggage"
                  value={formData.economyBaggage}
                  onChange={handleChange}
                  placeholder="Ej: 1 maleta de mano, 1 maleta documentada (23kg)"
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="economyServices" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Check className="h-4 w-4 mr-1" />
                  Servicios Incluidos
                </Label>
                <Textarea
                  id="economyServices"
                  name="economyServices"
                  value={formData.economyServices}
                  onChange={handleChange}
                  placeholder="Ej: Bebidas no alcohólicas, snack básico"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Clase Premium */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Clase Premium</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="premiumPrice" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Precio (USD)
                </Label>
                <Input
                  id="premiumPrice"
                  name="premiumPrice"
                  type="number"
                  value={formData.premiumPrice}
                  onChange={handleChange}
                  placeholder="Ej: 499.99"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="premiumSeats" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Users className="h-4 w-4 mr-1" />
                  Asientos Disponibles
                </Label>
                <Input
                  id="premiumSeats"
                  name="premiumSeats"
                  type="number"
                  value={formData.premiumSeats}
                  onChange={handleChange}
                  placeholder="Ej: 50"
                  className="w-full"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="premiumBaggage" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Equipaje Permitido
                </Label>
                <Input
                  id="premiumBaggage"
                  name="premiumBaggage"
                  value={formData.premiumBaggage}
                  onChange={handleChange}
                  placeholder="Ej: 1 maleta de mano, 2 maletas documentadas (23kg c/u)"
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="premiumServices" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Check className="h-4 w-4 mr-1" />
                  Servicios Incluidos
                </Label>
                <Textarea
                  id="premiumServices"
                  name="premiumServices"
                  value={formData.premiumServices}
                  onChange={handleChange}
                  placeholder="Ej: Comida caliente, bebidas alcohólicas y no alcohólicas, prioridad de embarque"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Clase Business/Primera */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Clase Business/Primera</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessPrice" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Precio (USD)
                </Label>
                <Input
                  id="businessPrice"
                  name="businessPrice"
                  type="number"
                  value={formData.businessPrice}
                  onChange={handleChange}
                  placeholder="Ej: 1299.99"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="businessSeats" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Users className="h-4 w-4 mr-1" />
                  Asientos Disponibles
                </Label>
                <Input
                  id="businessSeats"
                  name="businessSeats"
                  type="number"
                  value={formData.businessSeats}
                  onChange={handleChange}
                  placeholder="Ej: 20"
                  className="w-full"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="businessBaggage" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Equipaje Permitido
                </Label>
                <Input
                  id="businessBaggage"
                  name="businessBaggage"
                  value={formData.businessBaggage}
                  onChange={handleChange}
                  placeholder="Ej: 2 maletas de mano, 2 maletas documentadas (32kg c/u)"
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="businessServices" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Check className="h-4 w-4 mr-1" />
                  Servicios Incluidos
                </Label>
                <Textarea
                  id="businessServices"
                  name="businessServices"
                  value={formData.businessServices}
                  onChange={handleChange}
                  placeholder="Ej: Menú gourmet, bebidas premium, acceso a sala VIP, prioridad en todo"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Pestaña de Información Adicional */}
        <TabsContent value="additional" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tripulación */}
            <div>
              <Label htmlFor="crewMembers" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Users className="h-4 w-4 mr-1" />
                Número de Tripulantes
              </Label>
              <Input
                id="crewMembers"
                name="crewMembers"
                type="number"
                value={formData.crewMembers}
                onChange={handleChange}
                placeholder="Ej: 8"
                className="w-full"
              />
            </div>

            {/* Notas adicionales */}
            <div className="md:col-span-2">
              <Label htmlFor="notes" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Info className="h-4 w-4 mr-1" />
                Notas Adicionales
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Información adicional sobre el vuelo..."
                className="w-full"
                rows={4}
              />
            </div>

            {/* Advertencias */}
            <div className="md:col-span-2">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Asegúrese de verificar toda la información antes de crear el vuelo. Una vez creado, algunos datos
                      no podrán ser modificados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" className="border-gray-300 text-gray-700">
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#605DEC] hover:bg-[#4F4ADB] text-white">
          Crear Vuelo
        </Button>
      </div>
    </form>
  )
}
