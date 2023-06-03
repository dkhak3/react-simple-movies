import classNames from "classnames/bind";
import style from "./Search2.module.scss";

import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import "../Search/Custome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faClose,
  faMagnifyingGlass,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { apiKey } from "../../config";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(style);

function Search() {
  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteValue, setDeleteValue] = useState(false);

  const debounce = useDebounce(searchValue, 600);

  const handleDeleteValue = () => {
    setSearchValue("");
  };

  useEffect(() => {
    if (!debounce) {
      setDeleteValue(false);
      return;
    }

    if (debounce) {
      setDeleteValue(true);
    }

    const fetch = async () => {
      setLoading(true);
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${debounce}&page=1&include_adult=false`
        )
        .then((data) => {
          console.log(data);
          setSearchResult(data.data.results);
        });

      setLoading(false);
    };
    fetch();
  }, [debounce]);

  return (
    <div className={cx("search")}>
      <HeadlessTippy
        trigger="click"
        hideOnClick="toggle"
        interactive
        placement="bottom-start"
        duration={[1000, 2000]}
        render={(attrs) => (
          <div className={cx("box")} tabIndex="-1" {...attrs} data-tipp>
            <ul className={cx("search-result")}>
              {searchValue.length > 0 &&
                searchResult.map((item, index) => {
                  return (
                    <NavLink
                      to={`/movie/${item.id}`}
                      key={index}
                      className="items-center font-bold gap-x-3 hidden xl:block lg:block md:block"
                      onClick={() => setSearchValue("")}
                    >
                      <li className={cx("search-result-item")}>
                        <span className={cx("icon")}>
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <span className={cx("search-result-text")}>
                          {item.original_title}
                        </span>
                      </li>
                    </NavLink>
                  );
                })}
            </ul>
          </div>
        )}
      >
        <div className={cx("content")}>
          <input
            className={cx("search-input")}
            placeholder="Search..."
            ref={searchRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {deleteValue && (
            <span onClick={handleDeleteValue} className={cx("delete-icon")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          )}

          {loading ? (
            <span className={cx("loading-icon")}>
              <FontAwesomeIcon icon={faSpinner} />
            </span>
          ) : (
            <span className={cx("search-icon")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          )}
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
