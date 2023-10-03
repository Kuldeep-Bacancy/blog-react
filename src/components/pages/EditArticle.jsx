import React, { useEffect, useState } from 'react'
import { Container, ArticleForm } from "../index"
import { useNavigate, useParams } from 'react-router-dom';
import articleService from '../../services/article';

function EditArticle() {
  const [article, setArticles] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      articleService.getArticle(id).then((article) => {
        if (article) {
          setArticles(article)
        }
      })
    } else {
      navigate('/')
    }
  }, [id, navigate])
  return article ? (
    <div className='py-8'>
      <Container>
        <ArticleForm article={article.data} />
      </Container>
    </div>
  ) : null
}

export default EditArticle