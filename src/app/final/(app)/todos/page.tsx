// @refresh reset
import db from '@/db/sgbd'
import Todos from './todos-view'

const Page = async () => {
  const bdd = await db()
  const todos = bdd.data.todos ?? []
  console.log('reload page bdd')
  //bdd.update(({products}) => products?.push({title: 'Un product'}))
  return (
    <div className="w-full">
      <h1 className="text-2xl">Shop</h1>
      <Todos todos={todos} />
    </div>
  )
}

export default Page
