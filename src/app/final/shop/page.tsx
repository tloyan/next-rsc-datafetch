import Link from 'next/link'
import {getProducts} from './actions'

export const revalidate = 10 // revalidate the data at most every hour
export default async function Page() {
  const products = await getProducts()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Shop</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id ?? 'ok'}>
            <Link href={`/final/shop/${product.id}`}>{product.title} </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
