$(document).ready(function () {
    const historyItems = document.querySelectorAll(".history_item");
    if ("IntersectionObserver" in window && historyItems.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 } // 항목이 10%보일때 실행
        );
        historyItems.forEach(function (item) {
            observer.observe(item);
        });
    }
});
