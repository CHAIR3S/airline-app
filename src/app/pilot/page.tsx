'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';

// ⚠️ Cambia esta URL por la de tu backend real si no es localhost
const socket = io('https://airline-service-f9h1.onrender.com');

export default function AvionSimulado({ flightId }: { flightId: string }) {
  useEffect(() => {
    const interval = setInterval(() => {
      // Obtenemos la posición del dispositivo
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Enviamos la posición por WebSocket al backend
        socket.emit('update-position', { flightId, lat, lng });
      });
    }, 3000); // cada 3 segundos

    return () => clearInterval(interval);
  }, [flightId]);

  return (
    <div className="p-4">
      🛰️ Simulando posición del vuelo: <strong>{flightId}</strong>
    </div>
  );
}
