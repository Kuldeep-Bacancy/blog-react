import axios from "axios";
import config from '../config/config';
import authHeader from "./authHeader";

const API_URL = config.backendURL

const headers = {
  headers: authHeader()
}


const getArticles = async () => {
  const response = await axios.get(`${API_URL}/articles`, headers)

  return response.data;
}

const getArticle = async (id) => {
  const response = await axios.get(`${API_URL}/articles/${id}`, headers)

  return response.data
}

const createArticle = async (article) => {
  if (article.image) {
    headers["headers"]["Content-Type"] = "multipart/form-data"
  }

  const response = await axios.post(`${API_URL}/articles`, {
    article: article
  }, headers)

  return response.data
}

const updateArticle = async (article, articleID) => {
  if(article.image){
    headers["headers"]["Content-Type"] = "multipart/form-data"
  }

  const response = await axios.patch(`${API_URL}/articles/${articleID}`, {
    article: article
  }, headers)

  return response.data
}

const deleteArticle = async (articleID) => {
  const response = await axios.delete(`${API_URL}/articles/${articleID}`, headers)
    
  return response.data
}


const articleService = { getArticles, createArticle, updateArticle, deleteArticle, getArticle }

export default articleService