'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function AvionSimulado() {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         const lat = pos.coords.latitude;
  //         const lng = pos.coords.longitude;

  //         socket.emit('update-position', { flightId, lat, lng });
  //       },
  //       (error) => {
  //         console.error('Error al obtener la geolocalización:', error);
  //       }
  //     );
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [flightId]);

  // return (
  //   <div className="p-4">
  //     🛰️ Simulando posición del vuelo: <strong>{flightId}</strong>
  //   </div>
  // );
}
