$(document).ready(function() {
    var $targets = $('.scroll-target');
    var $window = $(window);

    function check() {
        var windowHeight = $window.height();
        var scrollTop = $window.scrollTop();

        $targets.each(function() {
            var $target = $(this);
            var targetTop = $target.offset().top;

            
            if (scrollTop > targetTop - windowHeight + 100) {
                $target.addClass('visible');
            }
        });
    }

    // 스크롤 및 로드 시 실행
    $window.on('scroll resize', check);
    $window.trigger('scroll'); // 페이지 로드 시 즉시 실행
});
