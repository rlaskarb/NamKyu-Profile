document.addEventListener("DOMContentLoaded", function () {
    const animated = document.querySelectorAll(".animate-on-scroll");

    if (animated.length > 0) {
        const aniObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                //요소가 뷰포트에 들어왔는지 확인
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visble');
                    // observer.unobserve(entry.target);
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.1, });
        animated.forEach(function (el) {
            aniObserver.observe(el);
        });
    }
});