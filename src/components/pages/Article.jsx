import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import articleService from "../../services/article";

export default function Article() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authentication.userData);
  
  const isAuthor = article && userData ? article.data.attributes.user_id === userData.user_id : false;

  useEffect(() => {
    if (id) {
      articleService.getArticle(id).then((article) => {
        if (article) setArticle(article);
        else navigate("/");
      });
    } else navigate("/");
  }, [id, navigate]);

  const deletePost = () => {
    if (confirm("Are you sure?")) {
      articleService.deleteArticle(article.data.id).then((res) => {
        if (res.status_code === 200) {
          navigate("/");
        }
      });
    }
  };


  return article ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={article.data.attributes.image}
            alt={article.data.attributes.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-article/${article.data.id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{article.data.attributes.title}</h1>
        </div>
        <div className="browser-css">
          {parse(article.data.attributes.content)}
        </div>
      </Container>
    </div>
  ) : null;
}