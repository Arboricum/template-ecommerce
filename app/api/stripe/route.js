import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Estrai il corpo della richiesta

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1Prz8UIwzejbso9bnY1l8a64",
        },
      ],
      line_items: body.map((item) => {
        const newImage = item.imageUrl; // Assumendo che `imageUrl` sia il campo corretto

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.title, // Assicurati che `name` esista nell'oggetto `item`
              images: [newImage],
            },
            unit_amount: item.price * 100, // Assicurati che `item.price` sia un numero valido
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.cartQuantity,
        };
      }),
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/canceled`,
    };

    // Crea la sessione di checkout
    const session = await stripe.checkout.sessions.create(params);
    console.log('Checkout session created:', session.id);

    // Restituisci la risposta con la sessione
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error('Error creating Stripe checkout session:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
