import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});


export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: 'Reserva de vuelo',
            },
            unit_amount: body.amount, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get("origin")}/reservation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/reservation/error`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ statusCode: 500, message: err.message });
  }
}
