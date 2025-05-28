

export async function createSeat(data: {
  seatNumber: string;
  class: 'ECONOMY' | 'BUSINESS' | 'FIRST';
  available?: boolean;
  flightId: number;
}) {
  const res = await fetch('/api/seat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}
