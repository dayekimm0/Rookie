import styled from "styled-components";
import clip from "/src/images/mockup/playdetail_clip.jpg";

const ClipWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const RecoClip = ({ thumbnailUrl }) => {
  return (
    <ClipWrapper>
      <img src={thumbnailUrl} alt="clip_thumbnail" />
    </ClipWrapper>
  );
};

export default RecoClip;
