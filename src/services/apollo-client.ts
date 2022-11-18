import { ApolloClient, InMemoryCache, ReactiveVar, makeVar } from '@apollo/client'
import { ICart } from '../interfaces'


export const client = new ApolloClient({
  uri: "https://api-sa-east-1.hygraph.com/v2/cla4ljovm3wil01tb2t2tdi33/master",
  cache: new InMemoryCache(),
})

export const cartStore: ReactiveVar<ICart[]> = makeVar<ICart[]>([])
