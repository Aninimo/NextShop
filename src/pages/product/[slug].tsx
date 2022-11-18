import { useState, MouseEvent, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Badge, Box, Button, Link } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { client, cartStore } from '../../services/apollo-client'
import { displayPrice, addToCart } from '../../utils'
import { GET_PRODUCT_BY_SLUG } from '../../services/queries'
import { IProducts, ICart } from "../../interfaces"

import { ProductsGrid } from '../../components/ProductsGrid'

interface IProduct {
  product: {
    description: string
    id: string
    image: {
      url: string
    }
    price: number
    quantity: number
    name: string
  }
}

export default function ProductPage({ product }: IProduct){
  const router = useRouter()
  const { id } = router.query
  const isInCart = cartStore().findIndex((item) => item.product.id === product.id) >= 0
  const [quantity, setQuantity] = useState<number>(1)
  const [addedToCart, setAddedToCart] = useState<boolean>(isInCart)

  const handlePurchase = (event: MouseEvent<HTMLButtonElement>): void => {
    const productToAdd: ICart = {
      product: {
        id: product.id,
        image: {
          url: product.image.url,
        },
        price: product.price,
        name: product.name,
      },
    }
    toast.success('Product added to cart successfully!', {
    position: toast.POSITION.TOP_RIGHT
});
    addToCart(productToAdd)
    
    cartStore(JSON.parse(localStorage.getItem("cart") || "[]"))
    setAddedToCart(true)
  }

  useEffect(() => {
    setAddedToCart(cartStore().findIndex((item) => item.product.id === product.id) >= 0)
  }, [product.id])

  return (
    <Box 
      display='flex'
      justifyContent='center'
      mt='3rem'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        textAlign='center'>
        <img 
          src={product.image.url}
          width='150px'/>
       <h2>{product.name}</h2>
        <Badge
          fontSize='1rem'
          mt='.5rem'
          mb='.5rem'>
          {displayPrice(product.price)}
        </Badge>
        <p>{product.description}</p>
        {addedToCart ? (
        <Link 
          href="/cart" secondary
          bg='purple.200'
          p='.5rem 2rem'
          borderRadius='8px'
          mt='1rem'>
          In Cart
       </Link>
      ) : (
          <>
          <Button
            onClick={handlePurchase}
            bg='purple.200'
            mt='1rem'>
              Purchase
          </Button>
            
          </>
      )}
        <ToastContainer />
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug
  const { data } = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug: slug,
    },
  })

  if (!data.product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product: data.product,
    },
  }
}
