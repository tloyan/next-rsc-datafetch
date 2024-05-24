'use client'
import {Post} from '@/lib/type'
// ⛏️ supprime useEffect et useState nous n'en avons plus besoin
import {useEffect, useState} from 'react'
// 🐶 A la place importe 'use' from "react"

// 🐶 créé une fonction 'fetchPosts'
// 🤖
// const fetchPosts = async () => {
//   const response = await fetch('http://localhost:3000/exercises/api/posts')
//   const data = await response.json()
//   return data as Post[]
// }

const Page = () => {
  // ⛏️ supprime ce state
  const [posts, setPosts] = useState<Post[]>([])

  // ⛏️ supprime le useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/exercises/api/posts'
        )
        const data = await response.json()
        setPosts(data as Post[])
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])

  // 🐶 appelle la fonction fetchPosts() dans use() et affecte le resultat dans "posts"
  // 🐶 logue posts : console.log(posts)
  // constate que nous sommes toujours en train de fetch les posts dans un composants clients
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
