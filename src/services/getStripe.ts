import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Stripe

const getStripe = async () => {
  if (!stripePromise) {
    
    stripePromise = new loadStripe('pk_test_51LLB0DLGZYTsJVoIuXgEzagUguiBtdtaG0U2MaSRiFtHLNJPvHj7ut3TUjjOBxyFZsxTsD3qlhV1Y0zsVhBQEYRM00oa5pzDU0')
  }

  return stripePromise
}

export default getStripe
