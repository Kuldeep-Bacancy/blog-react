import axios from "axios";
import config from '../config/config';
import authHeader from "./authHeader";

const API_URL = config.backendURL


const getArticles = async () => {
  const response = await axios.get(`${API_URL}/articles`, { headers: authHeader() })

  return response.data;
}

const createArticle = async (article) => {
  const response = await axios.post(`${API_URL}/articles`, {
    article: article
  }, { headers: authHeader() })

  return response.data
}

const updateArticle = async (article, articleID) => {
  const response = await axios.patch(`${API_URL}/articles/${articleID}`, {
    article: article
  }, { headers: authHeader() })

  return response.data
}

const deleteArticle = async (articleID) => {
  const response = await axios.delete(`${API_URL}/articles/${articleID}`, {
    article: article
  }, { headers: authHeader() })

  return response.data
}


const articleService = { getArticles, createArticle, updateArticle, deleteArticle }

export default articleService