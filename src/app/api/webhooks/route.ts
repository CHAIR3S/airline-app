import Stripe from "stripe"
import { buffer } from "micro"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  const buf = await req.arrayBuffer()
  const rawBody = Buffer.from(buf).toString("utf8")
  const sig = req.headers.get("stripe-signature")!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed.")
    return new Response("Webhook Error", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // 📧 Aquí envías correo
    await fetch(`${process.env.API_URL}/api/send-confirmation-email`, {
      method: "POST",
      body: JSON.stringify({
        to: session.customer_email,
        subject: "🎟️ Confirmación de tu vuelo",
        body: `Gracias por tu compra, tu vuelo está confirmado. Número: ${session.id}`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  return new Response("Received", { status: 200 })
}
