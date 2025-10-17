$(document).ready(function () {
    const $content = $(".description_area");

    if ("IntersectionObserver" in window && $content.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            $content.find("#desc2").addClass("active");
                        }, 100);

                        setTimeout(function () {
                            $content.find("#desc3").addClass("active");
                        }, 500);

                        setTimeout(function () {
                            $content.find("#desc4").addClass("active");
                        }, 1000);

                        setTimeout(function () {
                            $content.find("#desc5").addClass("active");
                        }, 1500);

                        setTimeout(function () {
                            $content.find("#desc6").addClass("active");
                        }, 2000);

                        setTimeout(function () {
                            $content.find("#desc7").addClass("active");
                        }, 2500);

                        setTimeout(function () {
                            $content.find("#desc8").addClass("active");
                        }, 3000);

                        setTimeout(function () {
                            $content.find("#desc9").addClass("active");
                        }, 3500);

                        setTimeout(function () {
                            $content.find("#desc10").addClass("active");
                        }, 4000);

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
