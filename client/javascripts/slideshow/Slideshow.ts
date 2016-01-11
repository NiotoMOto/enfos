/// <reference path="../../../typings/hammerjs/hammerjs.d.ts" />

import SlideImage from './SlideImage';

class Slideshow{
  private rootElement: HTMLElement;
  private items: Array<HTMLElement>;
  private numItems: number;
  private counter: number = 0;

  constructor(el: string) {
    this.rootElement = <HTMLElement>document.querySelectorAll(el)[0];
    this.items = [].slice.call(this.rootElement.querySelectorAll('figure'));
    this.numItems = this.items.length;
    this.items[0].classList.add('bss-show');
    this.injectControls();
    this.addEventListeners();
    this.addFullScreen();
    this.addSwipe();
    this.autoCycle(5000, true);
  }

  injectControls () {
    const spanPrev = document.createElement("span"),
          spanNext = document.createElement("span"),
          docFrag = document.createDocumentFragment();

    spanPrev.classList.add('bss-prev');
    spanNext.classList.add('bss-next');

    spanPrev.innerHTML = '&laquo;';
    spanNext.innerHTML = '&raquo;';

    docFrag.appendChild(spanPrev);
    docFrag.appendChild(spanNext);
    this.rootElement.appendChild(docFrag);
  }

  addEventListeners () {
    this.rootElement.querySelector('.bss-next').addEventListener('click', () => {
        this.showCurrent(1); // increment & show
    }, false);

    this.rootElement.querySelector('.bss-prev').addEventListener('click', () => {
        this.showCurrent(-1); // decrement & show
    }, false);

    this.rootElement.onkeydown = e => {
        if (e.keyCode === 37) {
            this.showCurrent(-1); // decrement & show
        } else if (e.keyCode === 39) {
            this.showCurrent(1); // increment & show
        }
    };
  }

  showCurrent(i: number) {
    if (i > 0) {
      this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
    } else {
      this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
    }

    [].forEach.call(this.items, function (el) {
      el.classList.remove('bss-show');
    });

    this.items[this.counter].classList.add('bss-show');
  }

  addFullScreen() {
    const fsControl = document.createElement("span");

    fsControl.classList.add('bss-fullscreen');
    this.rootElement.appendChild(fsControl);
    this.rootElement.querySelector('.bss-fullscreen').addEventListener('click', function () {
      this.toggleFullScreen(this.rootElement);
    }, false);
  }

  addSwipe() {
    const ht = new Hammer(this.rootElement);
    ht.on('swiperight', e => {
      this.showCurrent(-1); // decrement & show
    });
    ht.on('swipeleft', e => {
      this.showCurrent(1); // increment & show
    });
  }

  autoCycle(speed: number, pauseOnHover: boolean) {
      let interval = window.setInterval( () => {
        /* increment & show */
        this.showCurrent(1);
      }, speed);

    if (pauseOnHover) {
        /* on mouseover, cancel the setInterval()
           loop that was started above */
        this.rootElement.addEventListener('mouseover', function () {
          clearInterval(interval);
        }, false);

        /* on mouseout, reatsrt the setInterval() */
        this.rootElement.addEventListener('mouseout', () => {
          interval = window.setInterval( () => {
            this.showCurrent(1);
          }, speed);
        }, false);
      } // end pauseonhover
    }

}

export default Slideshow;


// var makeBSS = function (el, options) {
//     var $slideshows = document.querySelectorAll(el), // a collection of all of the slideshow
//         $slideshow = {},
//         Slideshow = {
//             init: function (el, options) {
//                 this.counter = 0; // to keep track of current slide
//                 this.el = el; // current slideshow container
//                 this.$items = el.querySelectorAll('figure'); // a collection of all of the slides, caching for performance
//                 this.numItems = this.$items.length; // total number of slides
//                 options = options || {}; // if options object not passed in, then set to empty object
//                 options.auto = options.auto || false; // if options.auto object not passed in, then set to false
//                 this.opts = {
//                     auto: (typeof options.auto === "undefined") ? false : options.auto,
//                     speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
//                     pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
//                     fullScreen: (typeof options.fullScreen === "undefined") ? false : options.fullScreen,
//                     swipe: (typeof options.swipe === "undefined") ? false : options.swipe
//                 };
//
//                 this.$items[0].classList.add('bss-show'); // add show class to first figure
//                 this.injectControls(el);
//                 this.addEventListeners(el);
//                 if (this.opts.auto) {
//                     this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
//                 }
//                 if (this.opts.fullScreen) {
//                     this.addFullScreen(this.el);
//                 }
//                 if (this.opts.swipe) {
//                     this.addSwipe(this.el);
//                 }
//             },
//             showCurrent: function (i) {
//                 // increment or decrement this.counter depending on whether i === 1 or i === -1
//                 if (i > 0) {
//                     this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
//                 } else {
//                     this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
//                 }
//
//                 // remove .show from whichever element currently has it
//                 // http://stackoverflow.com/a/16053538/2006057
//                 [].forEach.call(this.$items, function (el) {
//                     el.classList.remove('bss-show');
//                 });
//
//                 // add .show to the one item that's supposed to have it
//                 this.$items[this.counter].classList.add('bss-show');
//             },
//             injectControls: function (el) {
//             // build and inject prev/next controls
//                 // first create all the new elements
//                 var spanPrev = document.createElement("span"),
//                     spanNext = document.createElement("span"),
//                     docFrag = document.createDocumentFragment();
//
//                 // add classes
//                 spanPrev.classList.add('bss-prev');
//                 spanNext.classList.add('bss-next');
//
//                 // add contents
//                 spanPrev.innerHTML = '&laquo;';
//                 spanNext.innerHTML = '&raquo;';
//
//                 // append elements to fragment, then append fragment to DOM
//                 docFrag.appendChild(spanPrev);
//                 docFrag.appendChild(spanNext);
//                 el.appendChild(docFrag);
//             },
//             addEventListeners: function (el) {
//                 var that = this;
//                 el.querySelector('.bss-next').addEventListener('click', function () {
//                     that.showCurrent(1); // increment & show
//                 }, false);
//
//                 el.querySelector('.bss-prev').addEventListener('click', function () {
//                     that.showCurrent(-1); // decrement & show
//                 }, false);
//
//                 el.onkeydown = function (e) {
//                     e = e || window.event;
//                     if (e.keyCode === 37) {
//                         that.showCurrent(-1); // decrement & show
//                     } else if (e.keyCode === 39) {
//                         that.showCurrent(1); // increment & show
//                     }
//                 };
//             },
//             autoCycle: function (el, speed, pauseOnHover) {
//                 var that = this,
//                     interval = window.setInterval(function () {
//                         that.showCurrent(1); // increment & show
//                     }, speed);
//
//                 if (pauseOnHover) {
//                     el.addEventListener('mouseover', function () {
//                         interval = clearInterval(interval);
//                     }, false);
//                     el.addEventListener(//
//                     addSwipe: function(el){
//                 var that = this,
//                     ht = new Hammer(el);
//                 ht.on('swiperight', function(e) {
//                     that.showCurrent(-1); // decrement & show
//                 });
//                 ht.on('swipeleft', function(e) {
//                     that.showCurrent(1); // increment & show
//                 });
//             },'mouseout', function () {
//                         interval = window.setInterval(function () {
//                             that.showCurrent(1); // increment & show
//                         }, speed);
//                     }, false);
//                 } // end pauseonhover
//
//             },
//             addFullScreen: function(el){
//                 var that = this,
//                 fsControl = document.createElement("span");
//
//                 fsControl.classList.add('bss-fullscreen');
//                 el.appendChild(fsControl);
//                 el.querySelector('.bss-fullscreen').addEventListener('click', function () {
//                     that.toggleFullScreen(el);
//                 }, false);
//             },
//             addSwipe: function(el){
//                 var that = this,
//                     ht = new Hammer(el);
//                 ht.on('swiperight', function(e) {
//                     that.showCurrent(-1); // decrement & show
//                 });
//                 ht.on('swipeleft', function(e) {
//                     that.showCurrent(1); // increment & show
//                 });
//             },
//             toggleFullScreen: function(el){
//                 // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
//                 if (!document.fullscreenElement &&    // alternative standard method
//                     !document.mozFullScreenElement && !document.webkitFullscreenElement &&
//                     !document.msFullscreenElement ) {  // current working methods
//                     if (document.documentElement.requestFullscreen) {
//                       el.requestFullscreen();
//                     } else if (document.documentElement.msRequestFullscreen) {
//                       el.msRequestFullscreen();
//                     } else if (document.documentElement.mozRequestFullScreen) {
//                       el.mozRequestFullScreen();
//                     } else if (document.documentElement.webkitRequestFullscreen) {
//                       el.webkitRequestFullscreen(el.ALLOW_KEYBOARD_INPUT);
//                     }
//                 } else {
//                     if (document.exitFullscreen) {
//                       document.exitFullscreen();
//                     } else if (document.msExitFullscreen) {
//                       document.msExitFullscreen();
//                     } else if (document.mozCancelFullScreen) {
//                       document.mozCancelFullScreen();
//                     } else if (document.webkitExitFullscreen) {
//                       document.webkitExitFullscreen();
//                     }
//                 }
//             } // end toggleFullScreen
//
//         }; // end Slideshow object
//
//     // make instances of Slideshow as needed
//     [].forEach.call($slideshows, function (el) {
//         $slideshow = Object.create(Slideshow);
//         $slideshow.init(el, options);
//     });
// };
// var opts = {
//     auto : {
//         speed : 5000,
//         pauseOnHover : true
//     },
//     fullScreen : true,
//     swipe : true
// };
// makeBSS('.demo1', opts);
