import {getPosts} from '@/db/sgbd'

export async function GET() {
  try {
    const req = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await req.json()

    // const posts = await getPosts()
    return Response.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return Response.json({error: 'Error fetching posts'})
  }
}
