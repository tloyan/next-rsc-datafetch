export type Post = {
  title: string
}
export type Product = {
  id: string
  title: string
  price?: number
  description?: string
  image?: string
  category?: CategoriesEnum
  quantity?: number
  createdAt?: string
  updadtedAt?: string
}

export type Todo = {
  id: number
  title: string
  isCompleted: boolean
  createdAt?: string
  updadtedAt?: string
}

export type AddTodo = Partial<Pick<Todo, 'id'>> & Omit<Todo, 'id'>
export enum CategoriesEnum {
  default = 'default',
  lighting = 'lighting',
  furniture = 'furniture',
  bags = 'bags',
}
