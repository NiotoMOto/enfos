import SlideImage from './SlideImage';


class Slideshow {
  rootElement: HTMLElement;

  constructor(container = 'slideshow') {
    this.rootElement = document.getElementById(container);
    this.rootElement.getElementsByTagName('img');
  }
}

export default Slideshow;
