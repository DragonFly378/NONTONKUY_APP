import React, { useState, useEffect, useRef } from "react";

import Button, { OutlineButton } from "../button/Button";

/* Swiper slide */
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

/* Data */
import tmdbApi, { category, movieType } from "../../apis/tmdbApi";
import apiConfig from "../../apis/apiConfig";

/* SCSS */
import "./hero-slide.scss";

import { useHistory } from "react-router-dom";
import Modal, { ModalContent } from "../modal/Modal";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(res.results.slice(0, 4));
        console.log(res);
      } catch {
        console.log("error");
      }
    };
    getMovies();
    // console.log(movieItems);
  }, []);

  return (
    <>
      <div className="hero-slide">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
        >
          {movieItems.map((item, itemIdx) => (
            <SwiperSlide key={itemIdx}>
              {({ isActive }) => (
                // <img src={apiConfig.originalImage(item.backdrop_path)} />
                <HeroSlideItem
                  item={item}
                  className={`${isActive ? "active" : ""}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {movieItems.map((item, itemIdx) => (
          <TrailerModal key={itemIdx} item={item} />
        ))}
      </div>
    </>
  );
};

const HeroSlideItem = (props) => {
  let history = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal-content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal-content").innerHTML = "No trailer";
    }
    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide-item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* {item.title} */}
      <div className="hero-slide-item-content container">
        <div className="hero-slide-item-content-info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push("/movie/" + item.id)}>
              Watch Now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>{" "}
        <div className="hero-slide-item-content-poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

/* make trailer modal */
const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
