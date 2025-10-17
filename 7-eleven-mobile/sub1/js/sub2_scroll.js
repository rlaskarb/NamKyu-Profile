$(document).ready(function () {
    const $content = $(".content_area");

    if ("IntersectionObserver" in window && $content.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        //ceo 인사말
                        setTimeout(function () {
                            $content.find(".greeting h3").addClass("active");
                        }, 300);

                        setTimeout(function () {
                            $content.find(".greeting p").addClass("active");
                        }, 430);

                        setTimeout(function () {
                            $content.find(".greeting img").addClass("active");
                        }, 650);

                        // 경영이념
                        setTimeout(function () {
                            $content.find(".management h3").addClass("active");
                        }, 2000);

                        setTimeout(function () {
                            $content.find(".management > p ").eq(0).addClass("active");
                        }, 2200);

                        setTimeout(function () {
                            $content.find(".management > p").eq(1).addClass("active");
                        }, 2400);

                        setTimeout(function () {
                            $content.find(".management dl").addClass("active");
                        }, 2600);

                        setTimeout(function () {
                            $content.find(".management dt").addClass("active");
                        }, 2800);

                        //dd 한번에 처리하자
                        $content.find(".management dd").each(function (index) {
                            setTimeout(
                                function () {
                                    $(this).addClass("active");
                                }.bind(this),
                                3000 + index * 350
                            );
                        });

                        // 실행후 멈춤지시
                        observer.unobserve(entry.target);
                    }
                });
            },
            // 옵션 설정
            { threshold: 0.05 }
        );
        observer.observe($content[0]);
    }
});
