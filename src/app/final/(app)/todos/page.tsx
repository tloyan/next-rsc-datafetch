import db from '@/db/sgbd'
import Todos from './todos-view'

const Page = async () => {
  const bdd = await db()
  //bdd.update(({products}) => products?.push({title: 'Un product'}))
  return (
    <div className="w-full">
      <h1 className="text-2xl">Shop</h1>
      <Todos todos={bdd.data.todos ?? []} />
    </div>
  )
}

export default Page
