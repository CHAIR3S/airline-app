
import { CreateRefundRequestDto } from '@/types/refund';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export class RefundRequestAPI {
  static async create(data: CreateRefundRequestDto) {
    const res = await fetch(`${API_BASE}/refund-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.message || 'Error al crear la solicitud de reembolso');
    }

    return res.json();
  }
}
