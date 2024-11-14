'use server'
import {Post} from '@/lib/type'
import {getPosts} from '@/db/sgbd'

const fetchPosts = async () => {
  const response = await fetch('http://localhost:3000/exercises/api/posts')
  const data = await response.json()
  return data as Post[]
}

const Page = async () => {
  // const posts = await fetchPosts()
  const posts = await getPosts()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
      </ul>
    </div>
  )
}

export default Page
