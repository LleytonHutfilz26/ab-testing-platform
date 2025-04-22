"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, MoreHorizontal, Home, Search, Bell, User, Plus } from "lucide-react"

export default function SocialMockupF() {
  const [likes, setLikes] = useState<{ [key: string]: number }>({})
  const [comments, setComments] = useState<{ [key: string]: number }>({})

  const handleLike = (postId: string) => {
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }))
  }

  const handleComment = (postId: string) => {
    setComments(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }))
  }

  const posts = [
    {
      id: 1,
      author: {
        name: "Dr. Kolman",
        handle: "trinityadmin",
        avatar: "https://i.pravatar.cc/150?img=4",
        verified: true
      },
      content: "After the incident with Sticker Tag, it is with a heavy heart that I have decided to formally banish TrinLabs from operating on Trinity School premises.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60",
      likes: 2345,
      comments: 156,
      shares: 78,
      timeAgo: "1h",
      location: "Trinity School",
      hashtags: ["#PrincipalLife", "#TrinitySchool", "#StickerTag", "#TrinLabs"]
    },
    {
      id: 2,
      author: {
        name: "Mr. Gohde",
        handle: "trinityCS",
        avatar: "https://i.pravatar.cc/150?img=4",
        verified: true
      },
      content: "TrinLabs is not allowed to operate on Trinity School premises. Please do not attempt to contact their communications director, as he has been removed from office, along with the rest of the administrative team.",
      image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=800&auto=format&fit=crop&q=60",
      likes: 3456,
      comments: 234,
      shares: 123,
      timeAgo: "3h",
      location: "Trinity School",
      hashtags: ["#TrinLabs", "#TrinitySchool", "#StickerTag", "#PrincipalLife"]
    },
    {
      id: 3,
      author: {
        name: "Daniel Iofin",
        handle: "iofindaniel",
        avatar: "https://i.pravatar.cc/150?img=6",
        verified: false
      },
      content: "I am so sorry for the incident with Sticker Tag. I will be taking full responsibility for all associated problems. Henceforth, I will be stepping down from my position as the director of TrinLabs' sticker tag project.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
      likes: 1234,
      comments: 98,
      shares: 45,
      timeAgo: "5h",
      hashtags: ["#TrinLabs", "#StickerTag", "#PrincipalLife", "#TrinitySchool"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
        <div className="flex justify-around py-3">
          <button className="text-blue-500">
            <Home className="w-6 h-6" />
          </button>
          <button className="text-gray-500">
            <Search className="w-6 h-6" />
          </button>
          <button className="bg-blue-500 text-white rounded-full p-2">
            <Plus className="w-6 h-6" />
          </button>
          <button className="text-gray-500">
            <Bell className="w-6 h-6" />
          </button>
          <button className="text-gray-500">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      <nav className="bg-white shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-purple-600">ConnectF</h1>
              <div className="flex items-center space-x-6">
                <button className="text-purple-600">
                  <Home className="w-6 h-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-900">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-500 hover:text-gray-900">
                <Bell className="w-6 h-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-900">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold">{post.author.name}</span>
                      {post.author.verified && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>@{post.author.handle}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <span>{post.location}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-gray-800">{post.content}</p>
              {post.image && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {post.hashtags.map((tag, index) => (
                  <span key={index} className="text-blue-500 hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                    </svg>
                    <span>{post.shares}</span>
                  </button>
                </div>
                <button className="hover:text-blue-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 