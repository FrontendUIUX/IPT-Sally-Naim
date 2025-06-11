document.addEventListener('DOMContentLoaded', function(event) {
  // Your code here
  gsap.registerPlugin(TextPlugin);
  gsap.to('.btn',{
    rotation:360,
    duration:2
  });

gsap.from(".navbar-nav .nav-item", {
  y: -20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: "back.out(1.7)"
});
document.querySelectorAll(".btn-danger").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.1, duration: 0.2 });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.2 });
  });
});
gsap.from(".employee", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".welcome",
    start: "top 70%",
  }
});
gsap.registerPlugin(ScrollTrigger);

gsap.from(".news-item", {
  scrollTrigger: {
    trigger: ".news",
    start: "top 80%", // when the top of .news hits 80% of viewport
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  stagger: 0.3 // delays between each item
});
gsap.to(".news-cta img", {
  y: 3,
  repeat: -1,
  yoyo: true,
  duration: 0.8,
  ease: "power1.inOut"
});

gsap.registerPlugin(ScrollTrigger);

// Initialize Swiper
const swiper = new Swiper('.hero-slider', {
    loop: true, // Keep looping slides
    autoplay: {
        delay: 5000, // 3 seconds per slide
    },
    on: {
        slideChangeTransitionStart: function () {
            // Get current active slide's header
            const activeSlide = document.querySelector('.swiper-slide-active .slide-header');
            
            if (activeSlide) {
                gsap.fromTo(activeSlide,
                    { y: 50, opacity: 0 }, // Start state: slide in from bottom, fade in
                    {
                        y: 0,
                        opacity: 1,
                        duration: 3, // animation duration
                        ease: "power2.out" // easing function
                    });
            }
        }
    }
});
 

}); 
window.addEventListener("load", () => {
  const firstHeader = document.querySelector('.swiper-slide-active .slide-header');
  if (firstHeader) {
      gsap.fromTo(firstHeader,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 4, ease: "power2.out" });
  }
});
gsap.utils.toArray(".image-card, .image-card2, .image-card3").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
    y: 13,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});
