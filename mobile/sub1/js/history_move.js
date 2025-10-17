let smh = $(".history_nav").offset().top - 70;
let hnav_h = $(".history_nav").height() + 130;
const history_2020 = Math.floor($(".company_history>div:eq(0)").offset().top - hnav_h);
const history_2010 = Math.floor($(".company_history>div:eq(1)").offset().top - hnav_h);
const history_2000 = Math.floor($(".company_history>div:eq(2)").offset().top - hnav_h);
const history_1990 = Math.floor($(".company_history>div:eq(3)").offset().top - hnav_h + 5);
const history_1980 = Math.floor($(".company_history>div:eq(4)").offset().top - hnav_h);
console.log(hnav_h, history_2020, history_2010, history_2000, history_1990, history_1980);

$(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
  

    
    if (scroll > smh) {
        $(".history_nav").addClass("fixed");
       
        $("header").hide();
    } else {
        $(".history_nav").removeClass("fixed");
        
        $("header").show();
    }

    $(".history_nav li").removeClass("on");

    if (scroll >= history_2020 && scroll < history_2010) {
        $(".history_nav li:eq(0)").addClass("on");
    } else if (scroll >= history_2010 && scroll < history_2000) {
        $(".history_nav li:eq(1)").addClass("on");
    } else if (scroll >= history_2000 && scroll < history_1990) {
        $(".history_nav li:eq(2)").addClass("on");
    } else if (scroll >= history_1990 && scroll < history_1980) {
        $(".history_nav li:eq(3)").addClass("on");
    } else if (scroll >= history_1980) {
        $(".history_nav li:eq(4)").addClass("on");
    }
});

$(".history_nav li a").click(function (e) {
    e.preventDefault();

    let value = 0;

    if ($(this).hasClass("link1")) {
        value = history_2020;
    } else if ($(this).hasClass("link2")) {
        value = history_2010;
    } else if ($(this).hasClass("link3")) {
        value = history_2000;
    } else if ($(this).hasClass("link4")) {
        value = history_1990;
    } else if ($(this).hasClass("link5")) {
        value = history_1980;
    }

    console.log(value);
    $("html,body").stop().animate({ scrollTop: value }, 1000);
});
