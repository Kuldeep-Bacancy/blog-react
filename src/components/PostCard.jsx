import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({id, attributes}) {
  return (
    <Link to={`/article/${id}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={attributes.image || "https://images.unsplash.com/photo-1586943759341-be5595944989?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDE1MDB8MHwxfHNlYXJjaHwyNHx8YXJ0aWNsZXxlbnwwfHx8fDE2OTYzOTQxNTN8MA&ixlib=rb-4.0.3&q=85"} alt={attributes.title} />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{attributes.title}</h5>
        </div>
      </div>
    </Link>
  )
}

export default PostCard