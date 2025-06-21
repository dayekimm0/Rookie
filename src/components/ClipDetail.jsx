import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import LikeButton from "./PlayDetail/LikeButton";
import { useNavigate } from "react-router-dom";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  overflow: hidden; /* 배경 스크롤 방지 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 36%;
  height: 79%;
  left: 34%;
  top: 8%;
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const ModalPlay = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
`;

const WingCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const Btn = styled.div`
  margin-left: 20px;
`;

const ModalProducts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  margin: 20px;
  gap: 10px;

  h1 {
    width: 100%;
    color: var(--light);
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const ModalProduct = styled.div`
  width: 160px;
  cursor: pointer;
`;

const ProductThumbnail = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.4rem;
    color: var(--light);
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 최대 2줄 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`;

const teamMap = {
  LG: ["lg", "엘지", "엘지트윈스"],
  두산: ["doosan", "두산", "두산베어스"],
  SSG: ["ssg", "쓱", "에스에스지"],
  한화: ["hanwha", "한화", "한화이글스"],
  KIA: ["kia", "기아", "기아타이거즈", "갸"],
  KT: ["kt", "케이티", "kt위즈", "ki wiz"],
  NC: ["nc", "엔씨", "엔씨다이노스"],
  롯데: ["lotte", "롯데", "롯데자이언츠"],
  키움: ["kiwoom", "키움", "키움히어로즈"],
  삼성: ["samsung", "삼성", "삼성라이온즈"],
};

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const ClipDetail = ({ videoId, videoList = [], onClose }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(
    videoList.findIndex((v) => v.id === videoId)
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const video = videoList[currentIndex];
      if (!video) return;

      const title = (video.title || "").toLowerCase();
      const channel = (video.channelTitle || "").toLowerCase();

      // 팀 매칭 (기존 로직 유지)
      // ...

      const targets = matchedTeams.length > 0 ? matchedTeams : ["kbo"];

      try {
        const fetches = targets.map((team) =>
          fetch(`https://rookiejson.netlify.app/teamJson/${team}.json`).then(
            (res) => res.json()
          )
        );
        const results = await Promise.all(fetches);
        const merged = shuffle(results.flat()).slice(0, 2); // 상품 2개만
        setProducts(merged);
      } catch (err) {
        console.error("상품 불러오기 실패:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [currentIndex, videoList]);

  const opts = {
    width: "480px",
    height: "780px",
    playerVars: { autoplay: 1, loop: 1 },
  };

  if (!videoId) return null;

  // 스크롤 이벤트 버블링 막기 핸들러
  const stopScrollPropagation = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <ModalWrapper onClick={onClose}>
      <Swiper
        direction="vertical"
        spaceBetween={50}
        slidesPerView={1}
        mousewheel={true}
        initialSlide={currentIndex}
        modules={[Mousewheel]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        style={{ width: "100%", height: "100%" }}
      >
        {videoList.map((video) => (
          <SwiperSlide key={video.id}>
            {/* ModalContent에 onWheel, onTouchMove에서 버블링 막음 */}
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              onWheel={stopScrollPropagation}
              onTouchMove={stopScrollPropagation}
            >
              <ModalPlay>
                <YouTube videoId={video.id} opts={opts} />
              </ModalPlay>
              <WingCon>
                <Btn>
                  <LikeButton videoId={video.id} />
                </Btn>
                <ModalProducts>
                  <h1>추천하는 ROOK</h1>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ModalProduct
                        key={product.id}
                        onClick={() =>
                          navigate(`/store/${product.team}/${product.id}`)
                        }
                      >
                        <ProductThumbnail>
                          <img src={product.thumbnail} alt={product.name} />
                        </ProductThumbnail>
                        <ProductInfo>
                          <p>{product.name}</p>
                        </ProductInfo>
                      </ModalProduct>
                    ))
                  ) : (
                    <p style={{ color: "#888", fontSize: "1.4rem" }}>
                      추천 상품이 없습니다.
                    </p>
                  )}
                </ModalProducts>
              </WingCon>
            </ModalContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </ModalWrapper>,
    document.body
  );
};

export default ClipDetail;
