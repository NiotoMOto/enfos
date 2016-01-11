import SmoothScroll from './smoothScroll/smoothScroll';
const SmoothScrollheroes = new SmoothScroll()
document.getElementById('heroes-link').addEventListener('click', () => {
  return SmoothScrollheroes.anim('heroes');
});
