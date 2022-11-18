import { Box, Grid } from '@chakra-ui/react'
import { IProducts } from '../interfaces'
import { Card } from './Card'

interface IProps {
  products: IProducts[]
}

export function ProductsGrid({ products }) {
  return (
    <Grid
      templateColumns={['repeat(1, 1fr)','repeat(3,1fr)']}
      gap={6}
      mt='3rem'
      mb='3rem'>
      {products.map((product) => (
        <Box 
          display='flex'
          justifyContent='center'>
          <Card product={product} key={product.id} />
        </Box>
      ))}
    </Grid>
  )
}
