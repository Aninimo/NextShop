import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { client, cartStore } from '../services/apollo-client'
import { Header } from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    cartStore(JSON.parse(localStorage.getItem("cart") || "[]"))
  }, [])
  return(
    <ApolloProvider client={client}>
     <ChakraProvider>
       <>
         <Header/>
         <Component {...pageProps}/>
       </>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
