import SlideImage from './SlideImage';

class Slideshow {
  constructor(container = 'slideshow') {
    this.rootElement = document.getElementById(container);
    for (let img of this.rootElement.getElementsByTagName('img')) {
      console.log(img);
    }
    this.rootElement.getElementsByTagName('img');
  }
}

export default Slideshow;
