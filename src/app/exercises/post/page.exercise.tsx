// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Post} from '@/lib/type'
// 🐶 importe useEffect et useState car ils seront util pour recuperer les data
// 🤖 import {useEffect, useState} from 'react'

// 🐶 une erreur devrait apparaitre,  corrige la car nous sommes dans un composant client

const Page = () => {
  // 🐶 creer un state pour les posts
  //const [posts, setPosts] = useState<Post[]>([])

  // 🐶 creer un effet pour recuperer les posts
  // 🤖 utilise le code ci-dessous

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://jsonplaceholder.typicode.com/posts'
  //       )
  //       const data = await response.json()
  //       setPosts(data as Post[])
  //     } catch (error) {
  //       console.error('Error fetching posts:', error)
  //     }
  //   }
  //   fetchPosts()
  // }, [])
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {/* 🐶 Affiche les posts */}
        {/* {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)} */}
      </ul>
    </div>
  )
}
export default Page
