// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {fetchProduct, getProductById} from '../actions'

export default async function Page({params}: {params: {id: string}}) {
  const product = await getProductById(Number(params.id))
  // const product = await fetchProduct(params.id)
  // const product1 = await fetchProduct(params.id)
  // const produc2 = await fetchProduct(params.id)
  // const product3 = await fetchProduct(params.id)
  return (
    <div>
      Product : {params.id}
      <div>{product?.title}</div>
    </div>
  )
}
