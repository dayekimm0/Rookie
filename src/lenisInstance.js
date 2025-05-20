import Lenis from "lenis";

const lenis = new Lenis({
  smooth: true,
  lerp: 0.08, // 부드러움 정도
});
window.lenis = lenis;

export default lenis;
