import React, { useEffect, useState } from 'react'
import article from '../../services/article'
import { Container } from '../index' 
import { useSelector } from 'react-redux'


function Home() {
  const [articles, setArticles] = useState([])
  const isLoggedin = useSelector((state) => state.authentication.isLoggedin)

  useEffect(() => {
    article.getArticles()
    .then((articles) => {
      if (articles) {
        console.log(articles);
        setArticles(articles.data)
      }
    })
    .catch((err) => console.log(err))
  }, [])

  if (articles.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {isLoggedin ? 'No Posts available to read!' : 'Please Login to read posts!' }
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {articles.map((article) => (
            <div key={article.$id} className='p-2 w-1/4'>
              {/* <PostCard {...post} /> */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
