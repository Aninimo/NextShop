import { useReactiveVar } from '@apollo/client'
import { Box, Button, Divider, Link, Text } from '@chakra-ui/react'
import { cartStore } from '../../services/apollo-client'
import { ICart } from '../../interfaces'
import { displayPrice } from '../../utils'
import getStripe from '../../services/getStripe'
import { CartProduct } from '../../components/CartProduct'

export default function Cart(){
  const cart: ICart[] = useReactiveVar(cartStore)

  const cartTotal = cart.reduce((prev, next) => {
    return prev + next.quantity * next.product.price
  }, 0)

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response: Response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    })

    if (response.status === 500) return

    const data = await response.json()

    stripe.redirectToCheckout({
      sessionId: data.id,
    })
  }

  return (
    <Box
      p='1.5rem'>
      {cart.length > 0 ? (
        <>
          <Text
            fontSize='1.3rem'
            fontWeight='bold'
            mb='1rem'>
            Cart
          </Text>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            {cart.map((product) => (
              <CartProduct cartItem={product} key={product.product.id} />
            ))}
          </Box >
          <Divider 
            mt='1rem'/>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <span>Total: {displayPrice(cartTotal)}</span>
            <Button
               onClick={handleCheckout}
              bg='purple.200'
              mt='1rem'>
               Checkout
            </Button>
          </Box>
        </>
      ) : (
        <div>
          <Text
            mb='3rem'>
Oh no! Your cart is empty, but that is about to change...
          </Text>
          <Link 
            href="/"
            bg='purple.200'
            p='1rem'
            borderRadius='8px'>
            Go Shopping
          </Link>
        </div>
      )}
    </Box>
  )
}
