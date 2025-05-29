"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plane, Clock, MapPin, Info } from "lucide-react";

import { Flight, FlightStatus, Airline, Place, Weather } from "@/types/flight";

interface EditFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight | null;
  onSave: (updatedFlight: Flight) => void;
}

// Tipos para selects (puedes adaptarlos a tus datos reales)
const flightStatuses: { value: FlightStatus; label: string; color: string }[] = [
  { value: "SCHEDULED", label: "Programado", color: "bg-blue-100 text-blue-800" },
  { value: "DELAYED", label: "Retrasado", color: "bg-yellow-100 text-yellow-800" },
  { value: "CANCELLED", label: "Cancelado", color: "bg-red-100 text-red-800" },
  { value: "DEPARTED", label: "Despegado", color: "bg-indigo-100 text-indigo-800" },
  { value: "ARRIVED", label: "Llegado", color: "bg-green-100 text-green-800" },
];

// Ejemplo aerolíneas (ideal que las traigas dinámicamente)
const exampleAirlines: Airline[] = [
  {
    airlineId: 1,
    name: "Hawaiian Airlines",
    country: "USA",
    iataCode: "HA",
    logoUrl: "",
  },
  {
    airlineId: 2,
    name: "Japan Airlines",
    country: "Japan",
    iataCode: "JL",
    logoUrl: "",
  },
  {
    airlineId: 3,
    name: "American Airlines",
    country: "USA",
    iataCode: "AA",
    logoUrl: "",
  },
];

// Ejemplo lugares (igual dinámico idealmente)
const examplePlaces: Place[] = [
  {
    placeId: 1,
    name: "NYC",
    city: "New York",
    country: "USA",
    weather: Weather.SUNNY,
    terminal: "A",
    photo: { type: "Buffer", data: [] },
    discount: "",
    latitude: "40.7128",
    longitude: "-74.006",
    photoBase64: "",
  },
  {
    placeId: 2,
    name: "LAX",
    city: "Los Angeles",
    country: "USA",
    weather: Weather.SUNNY,
    
    terminal: "B",
    photo: { type: "Buffer", data: [] },
    discount: "",
    latitude: "34.0522",
    longitude: "-118.2437",
    photoBase64: "",
  },
  {
    placeId: 3,
    name: "MIA",
    city: "Miami",
    country: "USA",
    weather: Weather.SUNNY,
    
    terminal: "C",
    photo: { type: "Buffer", data: [] },
    discount: "",
    latitude: "25.7617",
    longitude: "-80.1918",
    photoBase64: "",
  },
];

export default function EditFlightModal({
  isOpen,
  onClose,
  flight,
  onSave,
}: EditFlightModalProps) {
  // Estado local para formulario, inicia como parcial para evitar tener que definir todo
  const [formData, setFormData] = useState<Partial<Flight>>({});

  // Cuando cambie el vuelo seleccionado, setea formData con sus datos
  useEffect(() => {
    if (flight) {
      // Para fechas, convertir a formato compatible con datetime-local: 'YYYY-MM-DDTHH:mm'
      const departureTimeFormatted = flight.departureTime
        ? flight.departureTime.substring(0, 16)
        : "";
      const arrivalTimeFormatted = flight.arrivalTime
        ? flight.arrivalTime.substring(0, 16)
        : "";

      setFormData({
        ...flight,
        departureTime: departureTimeFormatted,
        arrivalTime: arrivalTimeFormatted,
      });
    } else {
      setFormData({});
    }
  }, [flight]);

  // Manejar cambios en inputs simples
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Si cambias campos anidados, se deben manejar con cuidado
    // Aquí para campos simples, actualizar directo
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar cambios en selects personalizados (airline, origin, destination, status)
  const handleSelectChange = (name: string, value: string) => {
    if (name === "airline") {
      const airline = exampleAirlines.find((a) => a.name === value);
      if (airline) {
        setFormData((prev) => ({
          ...prev,
          airline,
        }));
      }
    } else if (name === "origin") {
      const origin = examplePlaces.find((p) => p.name === value);
      if (origin) {
        setFormData((prev) => ({
          ...prev,
          origin,
        }));
      }
    } else if (name === "destination") {
      const destination = examplePlaces.find((p) => p.name === value);
      if (destination) {
        setFormData((prev) => ({
          ...prev,
          destination,
        }));
      }
    } else if (name === "status") {
      if (
        flightStatuses.find((status) => status.value === value) !== undefined
      ) {
        setFormData((prev) => ({
          ...prev,
          status: value as FlightStatus,
        }));
      }
    }
  };

  // Enviar datos modificados
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones mínimas
    if (
      !formData.flightId ||
      !formData.airline ||
      !formData.origin ||
      !formData.destination ||
      !formData.departureTime ||
      !formData.arrivalTime ||
      !formData.status
    ) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    }

    // Crear objeto Flight completo para onSave
    // Si algún campo numérico o anidado falta, se debe asegurar que tenga valor

    const updatedFlight: Flight = {
      flightId: formData.flightId,
      airline: formData.airline,
      origin: formData.origin,
      destination: formData.destination,
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      status: formData.status,
      aircraft: formData.aircraft || {
        aircraftId: 0,
        model: "",
        capacity: 0,
        status: "ACTIVE",
      },
      lastLatitude: formData.lastLatitude || null,
      lastLongitude: formData.lastLongitude || null,
      lastAltitude: formData.lastAltitude || null,
      lastSpeedKmh: formData.lastSpeedKmh || null,
      lastUpdated: formData.lastUpdated || null,
    };

    onSave(updatedFlight);
    onClose();
  };

  if (!flight) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <Plane className="mr-2 h-5 w-5 text-[#605DEC]" />
            Editar Vuelo {flight.flightId}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Aerolínea */}
          <div className="space-y-2">
            <Label
              htmlFor="airline"
              className="flex items-center text-sm font-medium"
            >
              <Plane className="h-4 w-4 mr-1" />
              Aerolínea
            </Label>
            <Select
              value={formData.airline?.name || ""}
              onValueChange={(value) => handleSelectChange("airline", value)}
              name="airline"
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar aerolínea" />
              </SelectTrigger>
              <SelectContent>
                {exampleAirlines.map((airline) => (
                  <SelectItem key={airline.airlineId} value={airline.name}>
                    {airline.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estado del vuelo */}
          <div className="space-y-2">
            <Label
              htmlFor="status"
              className="flex items-center text-sm font-medium"
            >
              <Info className="h-4 w-4 mr-1" />
              Estado del Vuelo
            </Label>
            <Select
              value={formData.status || ""}
              onValueChange={(value) => handleSelectChange("status", value)}
              name="status"
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {flightStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          status.color.split(" ")[0]
                        }`}
                      ></span>
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Origen y Destino */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origen */}
            <div className="space-y-2">
              <Label
                htmlFor="origin"
                className="flex items-center text-sm font-medium"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Origen
              </Label>
              <Select
                value={formData.origin?.name || ""}
                onValueChange={(value) => handleSelectChange("origin", value)}
                name="origin"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar origen" />
                </SelectTrigger>
                <SelectContent>
                  {examplePlaces.map((place) => (
                    <SelectItem key={place.placeId} value={place.name}>
                      {place.name} ({place.city})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destino */}
            <div className="space-y-2">
              <Label
                htmlFor="destination"
                className="flex items-center text-sm font-medium"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Destino
              </Label>
              <Select
                value={formData.destination?.name || ""}
                onValueChange={(value) =>
                  handleSelectChange("destination", value)
                }
                name="destination"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  {examplePlaces.map((place) => (
                    <SelectItem key={place.placeId} value={place.name}>
                      {place.name} ({place.city})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Horarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hora de salida */}
            <div className="space-y-2">
              <Label
                htmlFor="departureTime"
                className="flex items-center text-sm font-medium"
              >
                <Clock className="h-4 w-4 mr-1" />
                Hora de Salida
              </Label>
              <Input
                id="departureTime"
                name="departureTime"
                type="datetime-local"
                value={formData.departureTime || ""}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            {/* Hora de llegada */}
            <div className="space-y-2">
              <Label
                htmlFor="arrivalTime"
                className="flex items-center text-sm font-medium"
              >
                <Clock className="h-4 w-4 mr-1" />
                Hora de Llegada
              </Label>
              <Input
                id="arrivalTime"
                name="arrivalTime"
                type="datetime-local"
                value={formData.arrivalTime || ""}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Información adicional: Aircraft (modelo y status) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aircraftModel" className="text-sm font-medium">
                Modelo de Aeronave
              </Label>
              <Input
                id="aircraftModel"
                name="aircraftModel"
                type="text"
                value={formData.aircraft?.model || ""}
                onChange={(e) => {
                  const model = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    aircraft: {
                      ...(prev.aircraft || {
                        aircraftId: 0,
                        capacity: 0,
                        status: "ACTIVE",
                        model: "",
                      }),
                      model,
                    },
                  }));
                }}
                placeholder="Ej: Boeing 737"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aircraftStatus" className="text-sm font-medium">
                Estado de Aeronave
              </Label>
              <Select
                value={formData.aircraft?.status || "ACTIVE"}
                onValueChange={(value) => {
                  const status = value as "ACTIVE" | "MAINTENANCE" | "RETIRED";
                  setFormData((prev) => ({
                    ...prev,
                    aircraft: {
                      ...(prev.aircraft || {
                        aircraftId: 0,
                        capacity: 0,
                        status: "ACTIVE",
                        model: "",
                      }),
                      status,
                    },
                  }));
                }}
                name="aircraftStatus"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado aeronave" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Activo</SelectItem>
                  <SelectItem value="MAINTENANCE">Mantenimiento</SelectItem>
                  <SelectItem value="RETIRED">Retirado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#605DEC] hover:bg-[#4F4ADB]">
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
