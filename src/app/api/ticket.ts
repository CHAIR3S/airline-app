import { Ticket } from "@/types/ticket";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export class TicketAPI {
  static async getByUserId(userId: number): Promise<Ticket[]> {
    const res = await fetch(`${API_BASE}/ticket/by-user/${userId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('No se pudieron obtener los tickets');
    }

    return res.json();
  }
}
