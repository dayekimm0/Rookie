export const mockItems = Array.from({ length: 3 }, (_, index) => ({
  id: `item${index + 1}`,
  team: "LG트윈스",
  name: `최고심 콜라보 반팔티셔츠 ${index + 1}`,
  price: 10000 * (index + 1),
  quantity: index + 1,
  image:
    "https://twinscorestore.co.kr/web/product/big/202504/5e799a1aeb0467ed583120db13e790db.jpg",
}));
