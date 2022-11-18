import Link from 'next/link'
import { Badge, Box, Heading, Icon, Text } from '@chakra-ui/react'
import { useReactiveVar } from '@apollo/client'
import { Storefront, ShoppingCart } from 'phosphor-react'
import { cartStore } from '../services/apollo-client'
import { ICart } from '../interfaces'

export function Header(){
  const cart: ICart[] = useReactiveVar(cartStore)

  return(
    <Heading 
      display='flex'
      justifyContent='space-between'
      p='1rem'>
      <Link href='/'>
        <a>
          <Text
            display='flex'
            alignItems='center'>
            <Icon as={Storefront}/>
            NextShop
          </Text>        
        </a>
      </Link>
      <Link href="/cart" secondary>
        <a>
          <Box
            w='1.5rem'
            h='1.5rem'
            bg='purple.100'
            fontSize='1rem'
            position='absolute'
            ml='-1.2rem'
            mt='-1rem'
            borderRadius='full'
            textAlign='center'>
            {cart.length}
          </Box>
          <Icon as={ShoppingCart}/>
        </a>
      </Link>
    </Heading>
  )
}
