$(document).ready(function () {
    const $content = $(".content_area");

    if ("IntersectionObserver" in window && $content.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            $content.find(".prs_intro_content > h3").addClass("active");
                        }, 100);

                        setTimeout(function () {
                            $content.find(".prs_intro_content > p").addClass("active");
                        }, 500);

                        setTimeout(function () {
                            $content.find(".prs_intro_content li").addClass("active");
                        }, 1000);

                        setTimeout(function () {
                            $content.find(".prs_intro_content dl dt").addClass("active");
                        }, 1500);

                        setTimeout(function () {
                            $content.find(".prs_intro_content dl dd").addClass("active");
                        }, 2000);

                        setTimeout(function () {
                            $content.find(".presentation_content > h3").addClass("active");
                        }, 2500);

                        setTimeout(function () {
                            $content.find(".presentation_content > p").addClass("active");
                        }, 3000);

                        setTimeout(function () {
                            $content.find(".presentation").addClass("active");
                        }, 3500);

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
