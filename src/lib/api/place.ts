export interface Place {
  placeId: number;
  name: string;
  city?: string;
  country?: string;
  weather?: 'SUNNY' | 'CLOUDY' | 'RAINY' | 'STORMY' | 'SNOWY' | 'WINDY' | 'FOGGY';
  terminal?: string;
  photo?: string; 
  cost?: string;  
  discount?: string;
}

export interface CreatePlaceDto {
  name: string;
  city?: string;
  country?: string;
  weather?: Place['weather'];
  terminal?: string;
  photo?: string;     
  cost?: string;      
  discount?: string;  
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export class PlaceAPI {
  static async getAll(): Promise<Place[]> {
    const res = await fetch(`${API_BASE}/place`);
    if (!res.ok) throw new Error('Error al obtener los lugares');
    return res.json();
  }

  static async getOne(id: number): Promise<Place> {
    const res = await fetch(`${API_BASE}/place/${id}`);
    if (!res.ok) throw new Error('Lugar no encontrado');
    return res.json();
  }

  static async create(data: CreatePlaceDto): Promise<Place> {
    const res = await fetch(`${API_BASE}/place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.message || 'Error al crear el lugar');
    }

    return res.json();
  }
}
