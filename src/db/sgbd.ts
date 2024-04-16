import {JSONFilePreset} from 'lowdb/node'

export type Post = {
  title: string
}
export type Product = {
  title: string
}

type BddDataType = {
  posts?: Post[]
  products?: Product[]
}

const defaultData: BddDataType = {
  posts: [{title: 'Default post'}],
  products: [{title: 'Default product'}],
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
