import {JSONFilePreset} from 'lowdb/node'

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

//export type CreateTodo = Omit<Todo, 'id'>
export type AddTodo = Partial<Pick<Todo, 'id'>> & Omit<Todo, 'id'>
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

export default async function db() {
  return initDb()
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

export async function getTodos() {
  const _db = await db()
  const {todos} = _db.data
  return todos
}

export async function addTodo(todo: AddTodo) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const _db = await db()
  await _db.update(({todos}) => {
    if (Math.random() > 0.5) {
      throw new Error('Server error : failed to add todo')
    }
    todos?.push({
      id: todo.id ?? todos.length + 1,
      title: todo.title,
      isCompleted: todo.isCompleted,
      createdAt: todo.createdAt ?? new Date().toISOString(),
      updadtedAt: todo.updadtedAt ?? new Date().toISOString(),
    })
  })
}
export async function updateTodo(_todo: Todo) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const _db = await db()
  if (Math.random() > 0.5) {
    throw new Error('Server error : failed to add todo')
  }
  await _db.update(({todos}) => {
    updateById(todos ?? [], _todo)
  })
}

interface Identifiable {
  id: number | string
}

// Fonction générique pour mettre à jour un élément dans un tableau
function updateById<T extends Identifiable>(items: T[], updatedItem: T): void {
  const index = items.findIndex((item) => item.id === updatedItem.id)
  if (index !== -1) {
    items[index] = updatedItem
  }
}

// Utilisation de la fonction
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
