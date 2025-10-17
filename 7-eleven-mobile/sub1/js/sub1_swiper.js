let youtubeUrl = "";

$(document).ready(function () {
    visualSwiper = new Swiper(".eleven_shorts_content", {
        slidesPerView: 2,
        spaceBetween: 0,
        centeredSlides: false, //1개일 땐 가운데 정렬 불필요

        speed: 1000,

        // 이펙트 효과
        effect: "creative",

        creativeEffect: {
            prev: {
                opacity: 0,
                translate: [0, 0, -300],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },

        loop: true,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".eleven_shorts_content .swiper-pagination",
            clickable: true,
        },
    });

    $(".swiper-slide a").click(function (e) {
        e.preventDefault();
        youtubeUrl = $(this).data("url");
        $("#youtube_modal").show();
    });

    $(".seven_modal").click(function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

function closeModal() {
    $("#youtube_modal").hide();
}

function goYoutube() {
    window.open(youtubeUrl, "_blank");
    closeModal();
}
