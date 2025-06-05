import React from "react";
import styled from "styled-components";
import PlayContent from "../components/Play/PlayContent";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 5%;
  gap: 100px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
    gap: 50px;
  }
`;

const ContentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  color: var(--light);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
  }
`;

const PlayAll = ({ type }) => {
  // 샘플 데이터 (실제 데이터로 교체 가능)
  const baseData = [
    {
      thumbnailSrc: "/thumbnail.jpg",
      channelName: "KBO",
      influencerId: "@influencer1",
      videoTitle: "하이라이트 모음",
    },
  ];

  const dataLength = 20;

  const sampleData = Array.from(
    { length: dataLength },
    (_, i) => baseData[i % baseData.length]
  );

  return (
    <Container>
      <ContentList>
        {sampleData.map((item, idx) => (
          <PlayContent key={idx} {...item} type={type} />
        ))}
      </ContentList>
    </Container>
  );
};

export default PlayAll;
