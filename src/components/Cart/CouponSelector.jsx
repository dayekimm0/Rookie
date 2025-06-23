import styled from "styled-components";

const CouponList = styled.select`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Pretendard";
  font-size: 1.6rem;
  padding: 10px;
  border: 1px solid var(--grayC);
  border-radius: 4px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url(../../src/images/icons/select_arrow_down.svg);
  background-repeat: no-repeat;
  background-position: right 2% center;
  background-size: 3.2rem;
  &:focus {
    background-image: url(../../src/images/icons/select_arrow_up.svg);
  }

  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    background-position: right 1% center;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
`;

const getCouponLabel = (title) => {
  switch (title) {
    case "HOME RUN !":
      return "HOME RUN! [80% 할인]";
    case "TRIPLE !":
      return "TRIPLE! [50% 할인]";
    case "DOUBLE !":
      return "DOUBLE! [30% 할인]";
    case "SINGLE !":
      return "SINGLE! [10% 할인]";
    case "WELCOME!":
      return "WELCOME! [10% 할인]";
    default:
      return "기타 쿠폰";
  }
};

const CouponSelector = ({ coupons, selectedCoupon, onCouponChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "none") {
      onCouponChange(null);
      return;
    }

    const found = coupons.find((c) => c.id === selectedValue);
    onCouponChange(found || null);
  };

  return (
    <CouponList onChange={handleChange} value={selectedCoupon?.id || "none"}>
      <option value="none" disabled={false} selected={!selectedCoupon}>
        사용 가능한 쿠폰
      </option>
      <option value="none">쿠폰 미적용</option>
      {coupons.map((coupon) => (
        <option key={coupon.id} value={coupon.id}>
          {getCouponLabel(coupon.title)}
        </option>
      ))}
    </CouponList>
  );
};

export default CouponSelector;
