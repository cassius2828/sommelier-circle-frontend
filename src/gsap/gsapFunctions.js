///////////////////////////
// Sticky Side Nav
///////////////////////////

import { gsap } from "gsap";


import { ScrollTrigger } from "gsap/ScrollTrigger";

if (import.meta.env.VITE_GSAP_NO_WARN) {
  gsap.config({ nullTargetWarn: false });
}
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

