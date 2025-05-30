// app/admin/[flightId]/page.tsx
'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Props {
  params: {
    flightId: string;
  };
}

export default function DashboardVuelo() {
  // const { flightId } = params;
  // const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  // useEffect(() => {
  //   socket.on(`flight-${flightId}`, (data) => {
  //     setPosition({ lat: data.lat, lng: data.lng });
  //   });

  //   return () => {
  //     socket.off(`flight-${flightId}`);
  //   };
  // }, [flightId]);

  // const googleMapsUrl = position
  //   ? `https://www.google.com/maps?q=${position.lat},${position.lng}`
  //   : null;

  // return (
  //   <div className="p-4">
  //     <h2 className="text-xl font-bold">Ubicación del vuelo {flightId}</h2>
  //     {position ? (
  //       <div>
  //         <p>
  //           Latitud: <strong>{position.lat}</strong><br />
  //           Longitud: <strong>{position.lng}</strong>
  //         </p>
  //         <a
  //           href={googleMapsUrl!}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className="text-blue-600 underline"
  //         >
  //           Ver en Google Maps 🌍
  //         </a>
  //       </div>
  //     ) : (
  //       <p>Esperando datos de ubicación...</p>
  //     )}
  //   </div>
  // );
}
