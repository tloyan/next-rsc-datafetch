import {Post, getPosts} from '@/db/sgbd'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPosts()
  return {
    title: `il y a ${posts?.length} posts`,
    description: 'Liste des derniers posts',
  }
}

const Page = async () => {
  const posts = await getPosts()
  // const response = await fetch('http://localhost:4000/posts')
  // const data: Post[] | undefined = await response.json()
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
