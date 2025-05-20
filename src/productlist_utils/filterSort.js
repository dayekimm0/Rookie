export const getPrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
};

export const filterAndSortProducts = (
  products,
  { selectCollabo, selectedBrand, sort }
) => {
  let filtered = products;

  if (selectCollabo === "COLLABORATION") {
    // collaboration 값이 존재하는 상품만 필터
    filtered = products.filter(
      (item) => item.collaboration && item.collaboration.trim() !== ""
    );
    if (selectedBrand) {
      filtered = filtered.filter(
        (item) => item.collaboration === selectedBrand
      );
    }
  } else if (selectCollabo !== "ALL") {
    // category 값 기준 필터
    filtered = products.filter((item) => item.category === selectCollabo);
  }

  switch (sort) {
    case "newest":
      filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      break;
    case "lowPrice":
      filtered.sort((a, b) => getPrice(a.price) - getPrice(b.price));
      break;
    case "highPrice":
      filtered.sort((a, b) => getPrice(b.price) - getPrice(a.price));
      break;
    case "popular":
      filtered.sort((a, b) => (b.like || 0) - (a.like || 0));
      break;
    default:
      break;
  }

  return filtered;
};
