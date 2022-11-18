import { gql } from '@apollo/client'

export const PRODUCT_CARD = gql`
  fragment ProductCard on Product {
    products{
      id
      name
      image{
        url
      }
      price
      quantity
    }
  }
`

export const GET_HOMEPAGE = gql`
  ${PRODUCT_CARD}
  query Products{
    products{
      name
      slug
      id
      image{
        url
      }
      price
      quantity
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  ${PRODUCT_CARD}
  query ProductPageQuery($slug: String!) {
      product(where: { slug: $slug }) {
        name
        description
        price
        id
        image{
          url
        }
        quantity
      }
    }
`
