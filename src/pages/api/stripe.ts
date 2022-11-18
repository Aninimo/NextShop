import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import { ICart } from '../../interfaces'

// @ts-ignore
const stripe = new Stripe('sk_test_51LLB0DLGZYTsJVoIhla5KpEFAFYx7eNkiwEJMtO3LAxvrbnoiMDSimrPyMpq5iy0UdiD2VSiQtTCTaTkJny7488E00bAXOTnbT')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [],
        line_items: req.body.map((item: ICart) => {
          const { product } = item

          return {
            price_data: {
              currency: "BRL",
              product_data: {
                name: product.name,
                images: [product.image.url],
              },
              unit_amount: product.price * 100,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      })

      res.status(200).json(session)
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
  }
