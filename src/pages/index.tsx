import { GetServerSideProps, NextPage } from 'next'
import { GET_HOMEPAGE } from '../services/queries'
import { client } from '../services/apollo-client'
import { getRandomNumber } from '../utils'
import { ICategory, IProducts } from '../interfaces'
import { ProductsGrid } from '../components/ProductsGrid.tsx'

interface IProps{
  products: IProducts[]
}

export default function Home({ products }){
  return(
    <>
        <section>
          <ProductsGrid products={products} />
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_HOMEPAGE,
  })

  return {
    props: {
      products: data.products,
    },
  }
}
