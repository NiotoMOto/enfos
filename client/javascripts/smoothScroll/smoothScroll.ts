
class SmoothScroll {
  iterr: number = 30;
  tm: number;
  constructor(){
  }

  stopShow() {
    clearTimeout(this.tm); // stopp the timeout
    this.iterr = 30; // reset milisec iterator to original value
  }

  getRealTop(el: HTMLElement) {
    let elm = el;
    let realTop = 0;
    do {
      realTop += elm.offsetTop;
      elm = <HTMLElement>elm.offsetParent;
    }while(elm);

    return realTop;
  }

  getPageScroll() {
    var pgYoff = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    return pgYoff;
  }

  anim(id) {
   this.stopShow(); // for click on another button or link
   var eOff, pOff, tOff, scrVal, pos, dir, step;
   eOff = document.getElementById(id).offsetTop; // element offsetTop
   tOff =  this.getRealTop(<HTMLElement>document.getElementById(id).parentNode); // terminus point
   pOff = this.getPageScroll(); // page offsetTop
   if (pOff === null || isNaN(pOff) || pOff === 'undefined'){
     pOff = 0;
   }
   scrVal = eOff - pOff; // actual scroll value;
   if (scrVal > tOff) {
     pos = (eOff - tOff - pOff);
     dir = 1;
   }
   if (scrVal < tOff) {
     pos = (pOff + tOff) - eOff;
     dir = -1;
   }
   if (scrVal !== tOff) {
     step = ~~((pos / 4) +1) * dir;
     console.log(step);
     if(this.iterr > 1){
       this.iterr = 0;
     } else {
      this.iterr = 0;// decrease the timeout timer value but not below 0
     }
     window.scrollBy(0, step);
     console.log( this.iterr);
     this.tm = window.setTimeout(() => {
        // this.anim(id);
     }, this.iterr);
   }
   if (scrVal === tOff) {
     this.stopShow(); // reset function values
     return;
   }
 }
}

export default SmoothScroll;




// (function()
// {
//       window.setTimeout = window.setTimeout; //
// })();
//
//       var smoothScr = {
//       iterr : 30, // set timeout miliseconds ..decreased with 1ms for each iteration
//         tm : null, //timeout local variable
//       stopShow: function()
//       {
//         clearTimeout(this.tm); // stopp the timeout
//         this.iterr = 30; // reset milisec iterator to original value
//       },
//       getRealTop : function (el) // helper function instead of jQuery
//       {
//         var elm = el;
//         var realTop = 0;
//         do
//         {
//           realTop += elm.offsetTop;
//           elm = elm.offsetParent;
//         }
//         while(elm);
//         return realTop;
//       },
//       getPageScroll : function()  // helper function instead of jQuery
//       {
//         var pgYoff = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
//         return pgYoff;
//       },
//       anim : function (id) // the main func
//       {
//         this.stopShow(); // for click on another button or link
//         var eOff, pOff, tOff, scrVal, pos, dir, step;
//
//         eOff = document.getElementById(id).offsetTop; // element offsetTop
//
//         tOff =  this.getRealTop(document.getElementById(id).parentNode); // terminus point
//
//         pOff = this.getPageScroll(); // page offsetTop
//
//         if (pOff === null || isNaN(pOff) || pOff === 'undefined') pOff = 0;
//
//         scrVal = eOff - pOff; // actual scroll value;
//
//         if (scrVal > tOff)
//         {
//           pos = (eOff - tOff - pOff);
//           dir = 1;
//         }
//         if (scrVal < tOff)
//         {
//           pos = (pOff + tOff) - eOff;
//           dir = -1;
//         }
//         if(scrVal !== tOff)
//         {
//           step = ~~((pos / 4) +1) * dir;
//
//           if(this.iterr > 1) this.iterr -= 1;
//           else this.itter = 0; // decrease the timeout timer value but not below 0
//           window.scrollBy(0, step);
//           this.tm = window.setTimeout(function()
//           {
//              smoothScr.anim(id);
//           }, this.iterr);
//         }
//         if(scrVal === tOff)
//         {
//           this.stopShow(); // reset function values
//           return;
//         }
//     }
//  }
