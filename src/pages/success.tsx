import { Box, Button, Link, Text } from '@chakra-ui/react'

export default function Success(){
  return(
    <Box p='1rem'>
     <Text mb='1rem'>Thank you for your purchase!🥳</Text> 
       <Link 
          href='/'
          bg='purple.200'
          p='.5rem 1rem'
          borderRadius='8px'>
            Home
        </Link>
     </Box>
  )
}
