import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../config";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import Button from "../components/button/Button";
import { ScrollToTop } from "../components/scrollToTop/ScrollToTop";
const { useRef } = React;

const itemsPerPage = 20;

const MoviePage = () => {
  const inputRef = useRef();
  const [typeMovie, setTypeMovie] = useState("movie/popular");
  const [valueSearch, setValueSeach] = useState("");

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    tmdbAPI.getMovieList("movie/popular", nextPage)
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setValueSeach(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("movie/popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const movies = data?.results || [];

  useEffect(() => {
    setPageCount(Math.ceil(data?.total_results / itemsPerPage));
  }, [itemOffset, data?.total_results]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  const handleClickType = (type) => {
    setUrl(tmdbAPI.getMovieList(type, nextPage));
    setTypeMovie(type);
    inputRef.current.value = "";
    setValueSeach("");
  };

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            name=""
            id=""
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <div className="flex mb-10 gap-x-5 text-center justify-center">
        <Button onClick={() => handleClickType("movie/popular")}>
          Popular
        </Button>
        <Button onClick={() => handleClickType("movie/now_playing")}>
          Now playing
        </Button>
        <Button onClick={() => handleClickType("movie/upcoming")}>
          Up Coming
        </Button>
        <Button onClick={() => handleClickType("movie/top_rated")}>
          Top Rated
        </Button>
        <Button onClick={() => handleClickType("trending/movie/day")}>
          Trending
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}

      {valueSearch === "" && (
        <h2 className="text-3xl font-medium mb-10">
          {typeMovie === "movie/popular" ? (
            <strong className="text-primary">
              Popular -{" "}
              <strong className="text-white inline-block">{nextPage}</strong>
            </strong>
          ) : typeMovie === "movie/now_playing" ? (
            <strong className="text-primary">
              Now Playing -{" "}
              <strong className="text-white inline-block">{nextPage}</strong>
            </strong>
          ) : typeMovie === "movie/upcoming" ? (
            <strong className="text-primary">
              Up Coming -{" "}
              <strong className="text-white inline-block">{nextPage}</strong>
            </strong>
          ) : typeMovie === "movie/top_rated" ? (
            <strong className="text-primary">
              Top Rated -{" "}
              <strong className="text-white inline-block">{nextPage}</strong>
            </strong>
          ) : typeMovie === "trending/movie/day" ? (
            <strong className="text-primary">
              Trending -{" "}
              <strong className="text-white inline-block">{nextPage}</strong>
            </strong>
          ) : (
            ""
          )}
        </h2>
      )}
      {valueSearch !== "" && (
        <h2 className="text-3xl font-medium mb-10">
          <p className="text-primary">
            {filterDebounce} -{" "}
            <p className="text-white inline-block">{nextPage}</p>
          </p>
        </h2>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>

      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default MoviePage;
