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

export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Table {
  places: number
  isBusy: boolean
  waiter?: string
  customer?: string
  _id?: string
}

export interface Position {
  name: string
  cost: number
  category: string
  user?: string
  _id?: string
}

export interface Message {
  message: string
}

export interface LoginRes {
  token: string
  role: string
}