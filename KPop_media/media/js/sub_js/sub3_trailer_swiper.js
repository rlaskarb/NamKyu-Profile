window.addEventListener("DOMContentLoaded", function () {
  new Swiper(".trailer-swiper", {
    loop: true,
    allowTouch: true,
    touchEventTarget: "wrapper",
    slidesPerView: 1,
    spaceBetween: 0,

    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});
