import React, { useState, useEffect } from 'react'
import { Container, PostCard } from "../index"
import articleService from '../../services/article'

function AllArticles() {
  const [articles, setArticles] = useState([])
  
  useEffect(() => {
    articleService.getArticles().then((articles) => {
      
      if (articles) {
        setArticles(articles.data)
      }
    })
  },[])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {
            articles.length > 0 ?
            articles.map((article) => (
              <div key={article.id} className='p-2 w-1/4'>
                <PostCard {...article} />
              </div>
            )) :
              <div className="flex flex-wrap">
                <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                    No Articles available to read!
                  </h1>
                </div>
              </div>
          }
        </div>
      </Container>
    </div>
  )
}

export default AllArticles