import config from '../config/config';
import { axiosPrivate } from "../common/axiosPrivate.js";

const API_URL = config.backendURL

const getArticles = async () => {
  const response = await axiosPrivate.get(`${API_URL}/articles`)

  return response.data;
}

const getArticle = async (id) => {
  const response = await axiosPrivate.get(`${API_URL}/articles/${id}`)

  return response.data
}

const createArticle = async (article) => {
  const response = await axiosPrivate.post(`${API_URL}/articles`, {
    article: article
  }, { headers: { "Content-Type": "multipart/form-data" }})

  return response.data
}

const updateArticle = async (article, articleID) => {
  const response = await axiosPrivate.patch(`${API_URL}/articles/${articleID}`, {
    article: article
  }, { headers: { "Content-Type": "multipart/form-data" } })

  return response.data
}

const deleteArticle = async (articleID) => {
  const response = await axiosPrivate.delete(`${API_URL}/articles/${articleID}`)
    
  return response.data
}


const articleService = { getArticles, createArticle, updateArticle, deleteArticle, getArticle }

export default articleService