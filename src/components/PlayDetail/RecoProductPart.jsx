import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import RecoProduct from "./RecoProduct";

const RecoProductWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 0 3%;
`;

const RecoProductTitle = styled.h1`
  font-size: 2.2rem;
  color: var(--light);
  font-weight: 600;
  margin-bottom: 26px;
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 500px) {
  }
`;

const StyledSwiper = styled(Swiper)`
  .swiper-scrollbar {
    width: 100%;
    background: var(--gray3);
    height: 4px;
    border-radius: 4px;
    bottom: 0 !important;
  }

  /* 스크롤바 드래그하는 부분 */
  .swiper-scrollbar-drag {
    background: var(--grayF5);
    border-radius: 4px;
    cursor: pointer;
  }
`;

// 팀별 키워드 (검색에 사용)
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

// 팀명(키) → JSON 파일명 매핑
const teamCodeMap = {
  LG: "lg_twins",
  두산: "ds_bas",
  SSG: "ssg_lds",
  한화: "hw_egs",
  KIA: "kia_tgs",
  KT: "kt_wiz",
  NC: "nc_dns",
  롯데: "lt_gnt",
  키움: "kw_hrs",
  삼성: "ss_lns",
};

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const RecoProductPart = ({ videoTitle = "", channelTitle = "" }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!videoTitle && !channelTitle) {
      setProducts([]);
      return;
    }

    const lowerVideoTitle = videoTitle.toLowerCase();
    const lowerChannelTitle = channelTitle.toLowerCase();

    // videoTitle 또는 channelTitle에 팀 키워드가 포함된 팀만 필터링
    const matchedTeams = Object.entries(teamMap)
      .filter(([team, keywords]) =>
        keywords.some(
          (keyword) =>
            lowerVideoTitle.includes(keyword) ||
            lowerChannelTitle.includes(keyword)
        )
      )
      .map(([team]) => team);

    const fetchTeamProducts = async () => {
      try {
        let results = [];

        if (matchedTeams.length > 0) {
          // 팀별 상품 불러오기
          const fetches = matchedTeams.map((team) => {
            const jsonFileName = teamCodeMap[team];
            if (!jsonFileName)
              throw new Error("No JSON file mapping for " + team);
            return fetch(
              `https://rookiejson.netlify.app/teamJson/${jsonFileName}.json`
            ).then((res) => {
              if (!res.ok) throw new Error("Failed to load " + jsonFileName);
              return res.json();
            });
          });

          results = await Promise.all(fetches);
        }

        if (matchedTeams.length === 0 || results.flat().length === 0) {
          // 매칭 팀 없거나 결과가 빈 배열이면 KBO 전체 상품 불러오기
          const res = await fetch(
            `https://rookiejson.netlify.app/teamJson/kbo.json`
          );
          if (!res.ok) throw new Error("Failed to load KBO all products");
          const allProducts = await res.json();
          results = [allProducts];
        }

        const merged = results.flat();
        setProducts(shuffle(merged));
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    };

    fetchTeamProducts();
  }, [videoTitle, channelTitle]);

  const displayProducts = products.slice(0, 6);

  return (
    <RecoProductWrapper>
      <RecoProductTitle>여기서 추천하는 ROOK</RecoProductTitle>
      <StyledSwiper
        slidesPerView={3}
        spaceBetween={20}
        freeMode={true}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 6 },
          400: { slidesPerView: 1, spaceBetween: 6 },
          500: { slidesPerView: 1, spaceBetween: 14 },
          768: { slidesPerView: 2, spaceBetween: 14 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
          1440: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {displayProducts.map((product, idx) => (
          <SwiperSlide key={`product-${product.id ?? idx}-${idx}`}>
            <RecoProduct
              thumbnail={product.thumbnail}
              brand={product.brand}
              name={product.name}
              price={product.price}
              team={product.team}
              id={product.id}
            />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </RecoProductWrapper>
  );
};

export default RecoProductPart;
