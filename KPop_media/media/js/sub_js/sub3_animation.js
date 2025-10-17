document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .glitch, .reveal-stagger > *',
    );

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observer.unobserve(entry.target);
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        },
        { threshold: 0.1 },
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});