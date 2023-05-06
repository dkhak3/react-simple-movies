import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();

  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm mb-10">
          <span className="opacity-50">
            {new Date(release_date).getFullYear()}
          </span>
          <div className="flex">
            <span className="flex text-center justify-center opacity-50">
              {vote_average}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.43074 14.4147L7 12.4532L10.5693 14.4147C11.083 14.6971 11.6815 14.2374 11.5829 13.6362L10.9023 9.48853L13.7861 6.5502C14.204 6.12442 13.9749 5.37905 13.3993 5.29162L9.40997 4.68568L7.62678 0.908861C7.3694 0.363713 6.6306 0.363713 6.37322 0.908861L4.59003 4.68568L0.600728 5.29162C0.0251203 5.37905 -0.203981 6.12442 0.213886 6.5502L3.09765 9.48853L2.4171 13.6362C2.31846 14.2374 2.91697 14.6971 3.43074 14.4147Z"
                fill="#F9CB62"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={() => navigate(`/movie/${id}`)}
          className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
