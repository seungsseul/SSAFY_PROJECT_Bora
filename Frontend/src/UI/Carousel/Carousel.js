// Import Swiper React components
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Carousel.scss";

import title1 from "../../assets/title1.jpg";
import title2 from "../../assets/title2.jpg";
import title3 from "../../assets/title3.jpg";
import title4 from "../../assets/title4.jpg";
import title5 from "../../assets/title5.jpg";
import title6 from "../../assets/title6.jpg";
import title7 from "../../assets/title7.jpg";
import title8 from "../../assets/title8.jpg";
import title9 from "../../assets/title9.jpg";
import title10 from "../../assets/title10.jpg";

// Swiper에서 가져올 모듈들
import {
  EffectCoverflow,
  Mousewheel,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper";
import { useRef } from "react";

const Carousel = () => {
  const arr = {
    title1,
    title2,
    title3,
    title4,
    title5,
    title6,
    title7,
    title8,
    title9,
    title10,
  };

  const navigate = useNavigate();

  const isTrue = useRef(false);

  const [ranking, setRanking] = useState();

  useEffect(() => {
    const API_URL = `http://localhost:8080/main/top-ten`;
    axios({
      url: API_URL,
      method: "GET",
    })
      .then((res) => {
        isTrue.current = true;
        console.log(res.data);
        setRanking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(ranking);

  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isTrue.current === true ? (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={4} //한 슬라이드에 보여줄 갯수
          loop={false}
          coverflowEffect={{
            rotate: 10, //회전각도
            stretch: 0,
            depth: 100, //깊이감도
            modifier: 2,
            slideShadows: true, //선택한부분 밝게, 나머지는 그늘지게
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }} //네비게이션 버튼
          mousewheel={true} //마우스 휠로 이동
          modules={[
            EffectCoverflow,
            Navigation,
            Pagination,
            Mousewheel,
            Autoplay,
          ]}
          className="carousel"
          navigation
        >
          <div className="carouselContainer">
            {ranking.map((res, index) => (
              <SwiperSlide className="carouselSlide" key={index}>
                <img
                  id="carousel"
                  // src="https://i.pinimg.com/originals/8e/08/9b/8e089b01489631d37d7d4576616f21bb.png"
                  src={title1}
                  alt=""
                />
                <h1 id="lankTitle">
                  #{index + 1}&nbsp;{res.nickName}
                </h1>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      ) : null}
    </motion.div>
  );
};

export default Carousel;
