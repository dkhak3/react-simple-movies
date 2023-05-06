import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative mb-10">
        <div className="overlay absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>

      <div className="page-container mx-auto">
        <div className="flex mb-10">
          <div className="h-[400px] max-w-[800px] -mt-[200px] relative z-10 pb-10">
            <img
              src={`https://image.tmdb.org/t/p/original/${poster_path}`}
              className="w-full h-full object-cover rounded-xl"
              alt=""
            />
          </div>

          <div className="flex flex-col -mt-[100px] relative z-10 ml-5 max-w-[1000px]">
            <h1 className="text-4xl font-bold text-white mb-5">{title}</h1>
            {genres.length > 0 && (
              <div className="flex items-center gap-x-5 mb-5">
                {genres.map((item) => (
                  <span
                    className="py-2 px-4 border-primary text-primary border rounded"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            )}
            <p className="leading-relaxed mx-auto">{overview}</p>
          </div>
        </div>

        <MovieCredits></MovieCredits>
        <MovieVideos></MovieVideos>
        <MovieSimilar></MovieSimilar>
      </div>
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="">
      <h2 className="text-3xl font-medium mb-10">Casts</h2>
      <div className="cast-list">
        <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
          {cast.map((item) => (
            <SwiperSlide key={item.id}>
              <CreditsItem item={item}></CreditsItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function CreditsItem({ item }) {
  const { profile_path, name } = item;
  return (
    <div className="flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none cast-item">
      <img
        src={`https://image.tmdb.org/t/p/original/${profile_path}`}
        className="w-full h-[350px] object-cover rounded-lg"
        alt={name}
      />
      <h3 className="text-xl font-medium">{name}</h3>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 1).map((item) => (
          <div className="" key={item.id}>
            <h2 className="text-3xl font-medium mb-10">Trailer</h2>
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
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log(results);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
