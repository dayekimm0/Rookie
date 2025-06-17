export const formatSubscribeCount = (count) => {
  if (!count) return "0명";

  const num = Number(count);
  if (isNaN(num)) return "0명";

  if (num < 10000) {
    return num.toLocaleString() + "명";
  } else if (num < 100000000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, "") + "만명";
  } else {
    return (num / 100000000).toFixed(1).replace(/\.0$/, "") + "억명";
  }
};
