document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove("active")
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealOnScroll, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  // --- 캐릭터 애니메이션  ---

  const characterCards = document.querySelectorAll(".characters_content");

  characterCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 70}ms`;
  });

  // --- News 애니메이션 ---
  const newsArticles = document.querySelectorAll(".news_content");

  newsArticles.forEach((article, index) => {
    article.style.transitionDelay = `${index * 70}ms`;
  });

  // --- 4. Gallery 섹션 순차 애니메이션 로직 추가 (이 부분을 추가하세요) ---
  const galleryCards = document.querySelectorAll(".gallery_card");
  galleryCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 70}ms`;
  });

  // --- 모든 .reveal 요소 관찰 시작 ---
  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
});
