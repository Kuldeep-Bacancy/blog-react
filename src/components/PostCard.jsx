import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({id, attributes}) {
  return (
    <Link to={`/article/${id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={attributes.image || "https://images.unsplash.com/photo-1586943759341-be5595944989?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDE1MDB8MHwxfHNlYXJjaHwyNHx8YXJ0aWNsZXxlbnwwfHx8fDE2OTYzOTQxNTN8MA&ixlib=rb-4.0.3&q=85"} alt={attributes.title}
            className='rounded-xl' />

        </div>
        <h2
          className='text-xl font-bold'
        >{attributes.title}</h2>
      </div>
    </Link>
  )
}

export default PostCard