import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Article } from "../../interface";
import { fetchArticles, selectFilteredArticles } from "../../../articlesSlice";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import FilterBar from "../../components/FilterBar";

const Articles: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector(selectFilteredArticles);
  const status = useSelector((state: RootState) => state.articles.status);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const articlesPerPage = 5;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const displayedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div className="container mx-auto my-12 px-10">
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <div className="flex lg:flex-row flex-col justify-center gap-10">
            <div className="lg:w-72 w-full">
              <FilterBar />
            </div>

            {displayedArticles.length > 0 ? (
              <div className="flex flex-col">
                {displayedArticles.map((article: Article) => (
                  <ArticleCard key={article.title} article={article} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <p className="text-center text-black font-bold text-lg">
                  Articles Not Found.
                </p>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Articles;
