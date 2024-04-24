import {JSONFilePreset} from 'lowdb/node'

const randomError = false
const slowConnexion = false
const serverResponseTime = 3000

export type Post = {
  title: string
}
export type Product = {
  id: number
  title: string
  price?: number
  description?: string
  image?: string
  category?: string
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
type BddDataType = {
  posts?: Post[]
  products?: Product[]
  todos?: Todo[]
}

const defaultData: BddDataType = {
  posts: [{title: 'Default post'}],
  products: [
    {
      id: 1,
      title: 'Default product',
      price: 199,
      quantity: 19,
      category: 'Lighting',
      createdAt: '2024-04-24T05:56:06.593Z',
      updadtedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'IPhone',
      price: 1490,
      quantity: 4,
      category: 'Lighting',
      createdAt: '2024-04-25T05:56:06.593Z',
      updadtedAt: new Date().toISOString(),
    },
  ],
  todos: [
    {
      id: 1,
      title: 'Default todo',
      isCompleted: false,
      createdAt: new Date().toISOString(),
    },
  ],
}

export default async function lowDb() {
  return initDb()
}
// initialise db with default data and file creation
async function initDb() {
  const db = await JSONFilePreset('./src/db/db.json', defaultData)
  if (db.data.posts?.length === 1) {
    db.update(({posts}: BddDataType) => posts?.push({title: 'Un post'}))
  }

  return db
}

export async function getTodos() {
  const db = await lowDb()
  const {todos} = db.data
  return todos
}

export async function addTodo(todo: AddTodo) {
  simulateUnstableServer()
  const db = await lowDb()
  await db.update(({todos}) => {
    todos?.push({
      id: todo.id ?? todos.length + 1,
      title: todo.title,
      isCompleted: todo.isCompleted,
      createdAt: todo.createdAt ?? new Date().toISOString(),
      updadtedAt: todo.updadtedAt ?? new Date().toISOString(),
    })
  })
}
export async function updateTodo(todo: Todo) {
  simulateUnstableServer()
  todo.updadtedAt = new Date().toISOString()
  const db = await lowDb()
  await db.update(({todos}) => {
    updateById(todos ?? [], todo)
  })
}
//PRODUCTS
export async function getProducts() {
  const db = await lowDb()
  const {products} = db.data
  return sortByDate(products, 'asc')
}

export async function addProduct(product: Product) {
  console.log('addProduct', product)
  simulateUnstableServer()
  const db = await lowDb()
  await db.update(({products}) => {
    products?.push({
      id: product.id ?? products.length + 1,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      quantity: product.quantity,
      createdAt: product.createdAt ?? new Date().toISOString(),
      updadtedAt: product.updadtedAt ?? new Date().toISOString(),
    })
  })
}

export async function updateProduct(product: Product) {
  console.log('updateProduct', product)
  simulateUnstableServer()
  product.updadtedAt = product.updadtedAt ?? new Date().toISOString()
  const db = await lowDb()
  await db.update(({products}) => {
    updateById(products ?? [], product)
  })
}

export async function deleteProduct(id: number) {
  console.log('deleteProduct', id)
  const db = await lowDb()
  await db.update(({products}) => {
    deleteById(products ?? [], id)
  })
}

interface Identifiable {
  id: number | string
}

// Fonction générique pour mettre à jour un élément dans un tableau
function updateById<T extends Identifiable>(items: T[], updatedItem: T): void {
  const index = items.findIndex((item) => item.id === updatedItem.id)
  if (index === -1) {
    throw new Error(`Item with id ${updatedItem.id} not found`)
  } else {
    items[index] = updatedItem
  }
}

// Fonction générique pour supprimer un élément dans un tableau
function deleteById<T extends Identifiable>(
  items: T[],
  itemId: number | string
): void {
  const index = items.findIndex((item) => item.id === itemId)
  if (index === -1) {
    throw new Error(`Item with id ${itemId} not found`)
  } else {
    items.splice(index, 1)
  }
}

interface Sortable {
  createdAt?: string
  updatedAt?: string
}

function sortByDate<T extends Sortable>(
  items?: T[],
  sortOrder: 'asc' | 'desc' = 'asc'
): T[] {
  if (!items) {
    return []
  }
  return items.toSorted((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date()
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date()
    const result = dateA.getTime() - dateB.getTime()
    return sortOrder === 'asc' ? result : -result
  })
}

// Définition des types avec la contrainte Sortabl

export async function getPosts() {
  const db = await lowDb()
  const {posts} = db.data
  return posts
}

async function simulateUnstableServer({
  slow = slowConnexion,
  random = randomError,
  serverTime = serverResponseTime,
}: {slow?: boolean; random?: boolean; serverTime?: number} = {}) {
  if (slow) {
    await new Promise((resolve) => setTimeout(resolve, serverTime))
  }
  if (Math.random() > 0.5 && random) {
    throw new Error('Internal server error')
  }
}
