import React from "react";
import { Article } from "../interface";
import placeHolderImg from '../assets/img/webp/placeholder.webp'

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const getImageSrc = (url: string) => {
    return url ? `${import.meta.env.VITE_IMAGE_URL}${url}` : placeHolderImg;
  };

  return (
    <div className="flex flex-col mb-6">
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="lg:w-1/2 w-full lg:h-1/2 h-full">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img
              src={getImageSrc(article.image)}
              alt={article.title}
              className="w-100 h-100 rounded-md transition duration-300 ease-in-out hover:scale-110"
            />
          </a>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xs font-normal text-[#565D6D]">{article.date}</p>
            <p className="text-xs font-normal text-[#565D6D]">
              {article.source}
            </p>
          </div>
          <h2 className="font-bold text-base text-[#171A1F] my-3">
            {article.title}
          </h2>
        </div>
      </div>
      <p className="text-sm font-normal text-[#171A1F] my-6">{article.body}</p>
      <p className="font-bold text-sm text-[#171A1F]">{article.author}</p>
      <hr className="my-6" />
    </div>
  );
};

export default React.memo(ArticleCard);
