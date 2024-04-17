'use server'
import {JSONFilePreset} from 'lowdb/node'
import {revalidatePath} from 'next/cache'

export type Post = {
  title: string
}
export type Product = {
  title: string
  price?: number
  description?: string
  image?: string
  category?: string
  quantity?: number
}

export type Todo = {
  id: number
  title: string
  isCompleted: boolean
  createdAt?: string
  updadtedAt?: string
}

export type CreateTodo = Omit<Todo, 'id'>

type BddDataType = {
  posts?: Post[]
  products?: Product[]
  todos?: Todo[]
}

const defaultData: BddDataType = {
  posts: [{title: 'Default post'}],
  products: [{title: 'Default product'}],
  todos: [
    {
      id: 1,
      title: 'Default todo',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    },
  ],
}

// initialise db with default data and file creation
async function initDb() {
  const _db = await JSONFilePreset('./src/db/db.json', defaultData)
  if (_db.data.posts?.length === 1) {
    _db.update(({posts}: BddDataType) => posts?.push({title: 'Un post'}))
  }
  if (_db.data.products?.length === 1) {
    _db.update(({products}: BddDataType) =>
      products?.push({title: 'Un product'})
    )
  }
  return _db
}
export default async function db() {
  return initDb()
}

export async function getProducts() {
  const _db = await db()
  const {products} = _db.data
  return products
}

export async function getPosts() {
  const _db = await db()
  const {posts} = _db.data
  return posts
}

export async function getTodos() {
  const _db = await db()
  const {todos} = _db.data
  return todos
}
export async function addTodo(todo: Omit<Todo, 'id'>) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const _db = await db()
  await _db.update(({todos}) => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Server error : failed to add todo')
    // }
    todos?.push({
      id: todos.length + 1,
      title: todo.title,
      isCompleted: todo.isCompleted,
      createdAt: todo.createdAt ?? new Date().toISOString(),
      updadtedAt: todo.updadtedAt ?? new Date().toISOString(),
    })
  })

  //revalidatePath('/final/todos')
}
export async function updateTodo(_todo: Todo) {
  const _db = await db()
  //const {todos} = _db.data
  //const findTodo = todos?.find((todo) => todo.id === 1) // Find by id
  await _db.update(({todos}) => {
    const updatedTodos = todos?.filter((todo) => todo.id !== _todo.id)
    updatedTodos?.push(_todo)
    return {todos: updatedTodos}
  })
}
