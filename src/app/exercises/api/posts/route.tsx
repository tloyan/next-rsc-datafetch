import {getPosts} from '@/db/sgbd'

export async function GET() {
  const data = await getPosts()
  return Response.json(data)
}
