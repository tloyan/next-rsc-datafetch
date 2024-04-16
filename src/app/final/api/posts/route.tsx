import {getPosts} from '@/db/sgbd'

export async function GET() {
  const data = await getPosts()
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('API-Key', process.env.DATA_API_KEY || '')

  return Response.json(data)
}
