import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({id, attributes}) {
  return (
    <Link to={`/article/${id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={attributes.image} alt={attributes.title}
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