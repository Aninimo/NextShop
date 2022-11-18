import type { SyntheticEvent } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { Box, Button, Icon } from '@chakra-ui/react'
import { Trash } from 'phosphor-react'
import { ICart } from '../interfaces'
import { cartStore } from '../services/apollo-client'
import { displayPrice, removeFromCart, updateCart } from '../utils'

import Link from 'next/link'

interface IProps {
  cartItem: ICart
}

export function CartProduct({ cartItem }: IProps){
  const [quantity, setQuantity] = useState<number>(cartItem.quantity)
  const { product } = cartItem

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    removeFromCart(event.currentTarget.value)
    cartStore(JSON.parse(localStorage.getItem("cart") || "[]"))
  }

  const cartProductUpdate = useCallback(() => {
    updateCart(product.id, quantity)
    cartStore(JSON.parse(localStorage.getItem("cart") || "[]"))
  }, [quantity])

  useEffect(() => {
    cartProductUpdate()
  }, [cartProductUpdate])

  return (
    <Box
      textAlign='center'>
      <img src={product.image.url}/>
      <p>{product.name}</p>
      <Box
        display='flex'
        justifyContent='space-between'>
      </Box>
      <Box 
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mt='.5rem'>
          {displayPrice(product.price)}
        <Button
          value={product.id}
          onClick={handleClick}
          bg='red.500'
          color='white'
          mt='1rem'>
           <Icon as={Trash}/> 
        </Button>
      </Box>
    </Box>
  )
}
