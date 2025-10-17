document.addEventListener("DOMContentLoaded", function () {
  const swiperClasses = [
    ".huntrx_content_swiper",
    ".saja_boys_content_swiper",
    ".duffy_content_swiper",
  ];

  swiperClasses.forEach(function (selector) {
    new Swiper(selector, {
      direction: "horizontal",
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      allowTouch: true,
      touchEventTarget: "wrapper",
    });
  });

  const fadeInElements = document.querySelectorAll(".fade-in");
  const fadeInObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entery) {
        if (entery.isIntersecting) {
          entery.target.classList.add("is-visible");
          // observer.unobserve(entery.target); 
        } else {
          entery.target.classList.remove("is-visible")
        }
      });
    },
    { threshold: 0.1 }
  );

  //감시
  fadeInElements.forEach(function (element) {
    fadeInObserver.observe(element);
  });
});

//  webm 비디오 속도 조절 효괴
document.addEventListener("DOMContentLoaded", function () {
  const rumiVideo = document.getElementById("rumiVideo");
  const miraVideo = document.getElementById("miraVideo");
  const zoyeVideo = document.getElementById("zoyeVideo");

  rumiVideo.playbackRate = 0.7;
  zoyeVideo.playbackRate = 0.9;
  miraVideo.playbackRate = 0.4;
});


