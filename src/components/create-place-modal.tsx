"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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
import { MapPin, Upload, X, ImageIcon } from "lucide-react";
import { PlaceAPI } from "@/app/api/place";

// Enum para los tipos de clima
export enum WeatherType {
  SUNNY = "SUNNY",
  CLOUDY = "CLOUDY",
  RAINY = "RAINY",
  STORMY = "STORMY",
  SNOWY = "SNOWY",
  WINDY = "WINDY",
  FOGGY = "FOGGY",
}

// Interfaz para el DTO
export interface CreatePlaceDto {
  id?: number;
  name: string;
  city?: string;
  country?: string;
  weather?: WeatherType;
  terminal?: string;
  photo?: string;
  discount?: number;
  latitude?: number;
  longitude?: number;
}

interface CreatePlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (place: CreatePlaceDto) => void;
  initialData?: CreatePlaceDto | null;
}

export default function CreatePlaceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CreatePlaceModalProps) {
  const [formData, setFormData] = useState<CreatePlaceDto>({
    name: "",
    city: "",
    country: "",
    weather: undefined,
    terminal: "",
    photo: "",
    discount: 0,
    latitude: 0,
    longitude: 0,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? Number(value) : undefined,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.photo) {
        setPhotoPreview(`data:image/png;base64,${initialData.photo}`);
      }
    } else {
      resetForm();
    }
  }, [initialData]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // no se guarda con "data:image/png;base64,"
        const base64 = result.replace(/^data:image\/png;base64,/, "");
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, photo: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData((prev) => ({ ...prev, photo: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    if (formData.id) {
      await PlaceAPI.update(formData.id, formData)
    } else {
      await PlaceAPI.create(formData)
    }

    onSave(formData) // puedes actualizar el listado en el componente padre
    resetForm()
    onClose()
  } catch (error) {
    console.error("Error al guardar el lugar:", error)
  }
}

  const resetForm = () => {
    setFormData({
      name: "",
      city: "",
      country: "",
      weather: undefined,
      terminal: "",
      photo: "",
      discount: 0,
      latitude: 0,
      longitude: 0,
    });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Crear Nuevo Lugar
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre (obligatorio) */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre del lugar"
              required
            />
          </div>

          {/* Ciudad y País (opcionales) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                Ciudad
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                placeholder="Ciudad"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                País
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                placeholder="País"
              />
            </div>
          </div>

          {/* longitud y latitud */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Latitude" className="text-sm font-medium">
                Latitud
              </Label>
              <Input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude || ""}
                onChange={handleChange}
                placeholder="Latitud"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Longitude" className="text-sm font-medium">
                Longitud
              </Label>
              <Input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude || ""}
                onChange={handleChange}
                placeholder="Longitud"
              />
            </div>
          </div>

          {/* Clima (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="weather" className="text-sm font-medium">
              Clima
            </Label>
            <Select
              value={formData.weather}
              onValueChange={(value) => handleSelectChange("weather", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el clima" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={WeatherType.SUNNY}>Soleado</SelectItem>
                <SelectItem value={WeatherType.CLOUDY}>Nublado</SelectItem>
                <SelectItem value={WeatherType.RAINY}>Lluvioso</SelectItem>
                <SelectItem value={WeatherType.STORMY}>Tormentoso</SelectItem>
                <SelectItem value={WeatherType.SNOWY}>Nevado</SelectItem>
                <SelectItem value={WeatherType.WINDY}>Ventoso</SelectItem>
                <SelectItem value={WeatherType.FOGGY}>Neblinoso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Terminal (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="terminal" className="text-sm font-medium">
              Terminal
            </Label>
            <Input
              id="terminal"
              name="terminal"
              value={formData.terminal || ""}
              onChange={handleChange}
              placeholder="Terminal (ej: T1, Terminal Norte)"
            />
          </div>

          {/* Descuento (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="discount" className="text-sm font-medium">
              Descuento (%)
            </Label>
            <Input
              id="discount"
              name="discount"
              type="number"
              min="0"
              max="100"
              value={formData.discount || 0}
              onChange={handleNumberChange}
              placeholder="Porcentaje de descuento"
            />
          </div>

          {/* Foto (opcional) */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Foto</Label>
            <div className="flex items-center space-x-4">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt="Vista previa"
                    className="h-24 w-24 object-cover rounded-md"
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
                <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Subir imagen
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Formato: PNG. Máx 5MB.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row justify-between">
            <Button
              className="px-6 cursor-pointer"
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <div />
            <Button
              onClick={() => {
                console.log(formData);
              }}
              type="submit"
              className="bg-[#605DEC] hover:bg-[#4F4ADB] px-11 cursor-pointer"
            >
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
