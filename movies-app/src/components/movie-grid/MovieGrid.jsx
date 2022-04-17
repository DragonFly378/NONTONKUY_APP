import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category, movieType, tvType } from "../../apis/tmdbApi";
import Button, { OutlineButton } from "../button/Button";

import Input from "../input/Input";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();
  /* nama "keyword" pasti undefined karena tidak ada 
  params di Routes.js dengan nama :keyword */

  useEffect(() => {
    console.log(keyword);
    const getList = async () => {
      let res = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            res = await tmdbApi.getMoviesList(movieType.upcoming, { params });
            break;
          default:
            res = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        res = await tmdbApi.search(props.category, { params });
      }
      setItems(res.results);
      console.log(res.results);
      setTotalPage(res.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let res = null;

    if (keyword === undefined) {
      const params = { page: page + 1 };
      switch (props.category) {
        case category.movie:
          res = await tmdbApi.getMoviesList(movieType.upcoming, { params });
          break;
        default:
          res = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      res = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...res.results]);
    // console.log(res.results);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, itemIdx) => (
          <MovieCard category={props.category} item={item} key={itemIdx} />
        ))}
      </div>

      {page < totalPage ? (
        <div className="movie-grid-loadMore">
          <OutlineButton className="small" onClick={loadMore}>
            Load More
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <>
      <div className="movie-search">
        <Input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />{" "}
        <Button className="small" onClick={goToSearch}>
          Search
        </Button>
      </div>
    </>
  );
};

export default MovieGrid;
