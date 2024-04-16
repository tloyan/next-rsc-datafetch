'use client'
import {Post} from '@/db/sgbd'
import {useEffect, useState} from 'react'

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts')
        const data = await response.json()
        setPosts(data as Post[])
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/final/api/posts')
  //       const data = await response.json()
  //       setPosts(data as Post[])
  //     } catch (error) {
  //       console.error('Error fetching posts:', error)
  //     }
  //   }
  //   fetchPosts()
  // }, [])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const data = await getPosts()
  //     setPosts(data as Post[])
  //   }
  //   // Additional logic or data manipulation can be done here
  //   fetchPosts()
  // }, [])

  return (
    <div className="w-full">
      <h2 className="text-xl">Liste des derniers Posts</h2>
      <ul className="list-disc pl-4">
        {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
      </ul>
    </div>
  )
}

export default Posts
