$(document).ready(function () {
    const $header = $("#headerArea");
    const $gnb = $("#gnb");
    const $blindBox = $(".blind_box");

    $(".menu_ham , .blind_box").click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        $header.toggleClass("mn_open");
        if ($header.hasClass("mn_open")) {
            $("body").css("overflow", "hidden"); // 메뉴 열릴때 스크롤 막기
            $blindBox.show();
            $gnb.css("height", window.innerHeight - 70 + "px");
            $(".top_move").removeClass("show");
        } else {
            $("body").css("overflow", "auto"); // 닫을때 복구
            $blindBox.hide();
            $("#gnb .main_menu li").removeClass("active");
        }
    });

    $(".main_menu h3 a").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $clickLi = $(this).closest("li");

        if ($clickLi.hasClass("active")) {
            $clickLi.removeClass("active");
        } else {
            $("#gnb .main_menu li").removeClass("active");
            $clickLi.addClass("active");
        }
    });
});
