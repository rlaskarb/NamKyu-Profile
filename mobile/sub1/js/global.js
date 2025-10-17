$(document).ready(function () {
    const $expansion = $(".global_expansion");
    const $img = $expansion.find("img");
    const $text1 = $expansion.find(".global_text1");
    const $text2 = $expansion.find(".global_text2");
    const $global_h3 = $(".global_seven_title h3");
    const $global_p = $(".global_seven_title p");
    const $shorts_h3 = $(".eleven_shorts_title h3");
    const $shorts_p = $(".eleven_shorts_title p");
    const $shorts_img = $(".eleven_shorts_content .swiper-wrapper");
    let check = false;

    $(window).on("scroll", function () {
        // 현재 스크롤 위치
        let scroll = $(window).scrollTop();
        // 화면 전체 높이
        let windowHeight = $(window).height();
        // 애니매이션을 실행할  화면 상단으로부터 거리
        let targetTop = $expansion.offset().top;

        if (scroll + windowHeight > targetTop && !check) {
            check = true;

            setTimeout(function () {
                $global_h3.addClass("active");
            }, 200);

            setTimeout(function () {
                $global_p.addClass("active");
            }, 500);

            setTimeout(function () {
                $img.addClass("active");
            }, 700);

            setTimeout(function () {
                $text1.addClass("active");
            }, 1200);

            setTimeout(function () {
                $text2.addClass("active");
            }, 1700);

            setTimeout(function () {
                $shorts_h3.addClass("active");
            }, 2000);

            setTimeout(function () {
                $shorts_p.addClass("active");
            }, 2300);

            setTimeout(function () {
                $shorts_img.addClass("active");
            }, 2800);
        }
    });
});
