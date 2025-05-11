'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// ⚠️ Cambia esta URL por la de tu backend real
const socket = io('https://airline-service-f9h1.onrender.com');
// const socket = io('http://localhost:4000');

export default function DashboardVuelo({ flightId }: { flightId: string }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Escuchamos las actualizaciones de ese vuelo
    socket.on(`flight-${flightId}`, (data) => {
      setPosition({ lat: data.lat, lng: data.lng });
    });

    return () => {
      socket.off(`flight-${flightId}`); // limpiamos el listener al desmontar
    };
  }, [flightId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">📍 Ubicación del vuelo {flightId}</h2>
      {position ? (
        <p>
          Latitud: <strong>{position.lat}</strong><br />
          Longitud: <strong>{position.lng}</strong>
        </p>
      ) : (
        <p>Esperando datos de ubicación...</p>
      )}
    </div>
  );
}
