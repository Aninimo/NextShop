export interface IProducts {
  slug: string
  id: string
  image: {
    url: string
  }
  price: number
  quantity?: number
  name: string
}

export interface IProductInCart {
  id: string
  name: string
  image: {
    url: string
  }
  price: number
  quantity?: number
}

export interface ICart {
  product: IProductInCart
  quantity?: number
}
