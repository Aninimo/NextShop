import { NextPage } from 'next'
import Link from 'next/link'
import { Badge, Box } from '@chakra-ui/react'
import { displayPrice } from '../utils'
import { IProducts } from '../interfaces'

interface IProps {
  product: IProducts
}

export function Card({ product }: IProps){
  return(
    <>
      <Link href={`/product/${product.slug}`}>
        <a>
          <Box
            w='15rem'
            h='17rem'
            background='gray.300'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            textAlign='center'
            borderRadius='8px'>
          <img 
            src={product.image.url}
            width='150px'/>
            <h2>
              {product.name}
            </h2>
            <Badge
              fontSize='1rem'
              mt='.5rem'>
            {displayPrice(product.price)}
            </Badge>
          </Box>
        </a>
      </Link>
    </>
  )
}
