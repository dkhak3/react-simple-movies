import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetcher, tmdbAPI } from "../../config";
import useSWR from "swr";
import { ScrollToTop } from "../scrollToTop/ScrollToTop";
import useSWRInfinite from "swr/infinite";
import Button from "../button/Button";
import useDebounce from "../../hooks/useDebounce";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const itemsPerPage = 5;

const MoreMovie = () => {
  const { movieId } = useParams();
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(
    tmdbAPI.getMoreMovie(movieId, "videos", nextPage)
  );

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );

  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const isLoading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);

  return (
    <div className="py-10 page-container">
      {isLoading && (
        <>
          <MoreMovieSkeleton></MoreMovieSkeleton>
          <MoreMovieSkeleton></MoreMovieSkeleton>
          <MoreMovieSkeleton></MoreMovieSkeleton>
          <MoreMovieSkeleton></MoreMovieSkeleton>
        </>
      )}

      {!isLoading && (
        <>
          <h2 className="text-3xl font-medium mb-10">Trailer</h2>
          <div className="flex flex-col gap-10">
            {movies.map((item) => (
              <div className="" key={item.id}>
                <h2 className="text-3xl font-medium mb-10">{item.name}</h2>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="1280"
                    height="720"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* <div className="mt-10">
        <Button
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          full="true"
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-300" : ""}`}
        >
          Load More
        </Button>
      </div> */}
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default MoreMovie;

export const MoreMovieSkeleton = () => {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-medium mb-10">
        <LoadingSkeleton height="50px"></LoadingSkeleton>
      </h2>
      <div className="w-full aspect-video">
        <LoadingSkeleton height="720px" width="1280"></LoadingSkeleton>
      </div>
    </div>
  );
};
