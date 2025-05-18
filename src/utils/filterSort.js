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
    filtered = products.filter((item) => item.brand === selectedBrand);
  } else if (selectCollabo !== "ALL") {
    filtered = products.filter((item) => item.category === selectCollabo);
  }

  if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "lowPrice") {
    filtered.sort((a, b) => getPrice(a.price) - getPrice(b.price));
  } else if (sort === "highPrice") {
    filtered.sort((a, b) => getPrice(b.price) - getPrice(a.price));
  } else if (sort === "popular") {
    filtered.sort((a, b) => b.like - a.like);
  }

  return filtered;
};
