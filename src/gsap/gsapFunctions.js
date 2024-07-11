///////////////////////////
// Sticky Side Nav
///////////////////////////

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function pinNavToTop(element) {
  gsap.to(element, {
    width: "auto",
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top top",
      end: "+=10000",
      scrub: true,
      pin: true,
      pinSpacing: false,
    
    },
  });
}

