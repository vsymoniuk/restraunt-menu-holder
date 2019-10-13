export interface User {
    email: string
    password: string
    role: string
    _id?: string
    ordersList: OrderPosition[]
  }

  export interface OrderPosition {
    name: string
    quantity: number
    cost: number
    _id?: string
  }