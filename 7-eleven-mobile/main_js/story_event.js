$(function () {
    const $storyLinks = $(".eleven_story_content ul li a"); //스토리이미지링크
    const $modalBox = $(".main_modal_box"); //모달 전체 박스
    const $modalMoveBtn = $("#modal_youtube_link"); // 모달스토리링크
    const $modalCloseBtn = $(".modal_close"); // 닫기버튼

    //이미지 클릭시 이벤트
    $storyLinks.on("click", function (e) {
        e.preventDefault();
        const youtubeUrl = $(this).data("url"); // url 값 가져오기
        $modalMoveBtn.attr("href", youtubeUrl); //주소설정
        $modalBox.addClass("active"); // 화면에 표시
    });

    // 닫기 클릭시 이벤트
    $modalCloseBtn.on("click", function () {
        $modalBox.removeClass("active");
    });

    // 다른부분 터치해도 닫기 이벤트 발생시키기
    $modalBox.on("click", function (e) {
        if ($(e.target).is(".main_modal_box")) {
            $modalBox.removeClass("active");
        }
    });
});
