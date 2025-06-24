import styled from "styled-components";
import ProductCard from "../ProductCard";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media screen and (max-width: 1440px) {
    gap: 30px;
  }
  @media screen and (max-width: 1024px) {
    gap: 14px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    row-gap: 25px;
    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  }
  /* @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  } */
  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const HomeProducts = ({ products }) => {
  return (
    <Container>
      {products.map((item) => (
        <ProductCard key={`${item.team} ${item.id}`} data={item} />
      ))}
    </Container>
  );
};

export default HomeProducts;
