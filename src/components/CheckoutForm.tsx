import { FormEvent, useEffect, useState } from 'react'
import getStripe from '@/utils/get-stripejs'

export default function CheckoutForm({ money }: { money: number }) {
  const [loading, setLoading] = useState(false);
  const amount = Math.round(money * 100); // en centavos

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const session = await res.json();

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) console.error(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={loading}
        className="bg-[#605DEC] text-white px-6 py-3 rounded-md hover:bg-[#4F4ADB] transition-colors"
      >
        {loading ? 'Redirigiendo...' : `Pagar $${money.toFixed(2)}`}
      </button>
    </form>
  );
}
