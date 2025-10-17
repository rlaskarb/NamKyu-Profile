let characterGroups = [];
document.addEventListener("DOMContentLoaded", function () {
  fetch("./data/sub2.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      characterGroups = data;

      // 데이터 로딩 후 함수실행

      createTabMenu();
      renderContent(characterGroups[0].id);
    });
});

// 메뉴 생성 함수
function createTabMenu() {
  const tabMenu = document.querySelector(".sub_nav");

  // JSON 데이터를 기반으로 메뉴를 만듭니다.
  characterGroups.forEach(function (group, index) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = group.groupName;
    a.dataset.groupId = group.id;

    // 첫 번째 메뉴에만 'current' 클래스를 추가합니다.
    if (index === 0) {
      a.classList.add("current");
    }

    li.appendChild(h3);
    h3.appendChild(a);
    tabMenu.appendChild(li);
  });

  // 탭 메뉴 클릭 이벤트 리스너
  tabMenu.addEventListener("click", function (event) {
    event.preventDefault();
    const clickedElement = event.target.closest("a");
    window.scrollTo({
      top: subNavTopPosition,
      behavior: "smooth",
    });
    const groupId = clickedElement.dataset.groupId;
    renderContent(groupId);

    // 클릭 시 모든 current 클래스 제거 후, 클릭된 요소에만 추가
    const navLinks = document.querySelectorAll(".sub_nav li a");
    navLinks.forEach(function (link) {
      link.classList.remove("current");
    });
    clickedElement.classList.add("current");
  });
}

// 스크롤 이벤트 핸들러 함수를 분리
function handleBlindScroll() {
  const container = document.querySelector(".blind-container");
  const image2 = document.querySelector(".blind-image.image2");

  //실제로 이미지가 존재하는지 확인
  if (container && image2) {
    const containerTop = container.getBoundingClientRect().top; // 위치추적
    const scrollReveal = 100; // 화면상단에 100px 안으로 들어왔을때

    if (containerTop < scrollReveal) {
      const revealPercentage = (scrollReveal - containerTop) / scrollReveal;
      image2.style.clipPath = `inset(${100 - revealPercentage * 100}% 0 0)`;
    } else {
      image2.style.clipPath = "inset(100% 0 0)";
    }
  }
}

window.addEventListener("scroll", handleBlindScroll);

// 콘텐츠 렌더링 함수(핵심)
function renderContent(groupId) {
  const contentContainer = document.getElementById("character_content");
  contentContainer.innerHTML = ""; // 기존 컨탠츠 삭제
  const groupTitleDisplay = document.getElementById("group_title_display");

  // 선택된 데이터 그룹찾기
  const selectedGroup = characterGroups.find(function (group) {
    return group.id === groupId;
  });
  if (!selectedGroup) {
    if (!groupTitleDisplay) {
      groupTitleDisplay.textContent = "";
    }
    return;
  }

  if (groupTitleDisplay) {
    groupTitleDisplay.textContent = selectedGroup.groupName;
  }

  // 케릭터 카드 렌더링

  selectedGroup.characters.forEach(function (character, index) {
    const characterCard = document.createElement("div");
    characterCard.className =
      "character-card-grid animate-on-scroll animate-fade-in-up";
    characterCard.style.transitionDelay = `${index * 150}ms`;

    const cardContent = document.createElement("div");
    cardContent.className = "character-card-content";

    const swiperArea = document.createElement("div");
    swiperArea.className = "character-swiper-area";

    const swiperContainer = document.createElement("div");
    swiperContainer.className = "swiper-container";

    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    character.images.slice(0, 2).forEach(function (imagePath) {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = `${character.name} img`;
      slide.appendChild(img);
      swiperWrapper.appendChild(slide);
    });

    swiperContainer.appendChild(swiperWrapper);
    swiperArea.appendChild(swiperContainer);

    const infoArea = document.createElement("div");
    infoArea.className = "character-info-area";
    infoArea.innerHTML = `
   			<h4>${character.name}</h4>
   			<p>Age : ${character.age}</p>
   			<p>MBTI : ${character.mbti}</p>
   			<p>Position : ${character.position}</p>
    `;

    const descriptionArea = document.createElement("div");
    descriptionArea.className = "character-description-area";
    descriptionArea.innerHTML = `<p>${character.description}</p>`;

    const video1 = document.createElement("video");
    video1.className = "character-image1-area";
    video1.autoplay = true;
    video1.loop = true;
    video1.muted = true;
    video1.src = character.images[2];
    video1.alt = `${character.name} video`;

    const image2Area = document.createElement("div");
    image2Area.className = "character-image2-area";
    const img2 = document.createElement("img");
    img2.src = character.images[3];
    img2.alt = `${character.name} img2`;
    image2Area.appendChild(img2);

    // 모든 요소 메인 컨테이너 추가

    cardContent.appendChild(swiperArea);
    cardContent.appendChild(infoArea);
    cardContent.appendChild(descriptionArea);
    cardContent.appendChild(video1);
    cardContent.appendChild(image2Area);

    characterCard.appendChild(cardContent);
    contentContainer.appendChild(characterCard);

    const sub2Swiper = new Swiper(swiperContainer, {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      allowTouch: true,
      touchEventTarget: "wrapper",
      slidesPerView: 1,
      spaceBetween: 20,
    });

    setTimeout(() => {
      sub2Swiper.update();
    }, 100);
  });

  // 배경이미지 블라인드 효과 주기
  const blindContainer = document.createElement("div");
  blindContainer.className = "blind-container";

  const blindImage1 = document.createElement("div");
  blindImage1.className = "blind-image image1";
  blindImage1.style.backgroundImage = `url(${selectedGroup.backImage[0]})`;
  blindContainer.appendChild(blindImage1);

  const blindImage2 = document.createElement("div");
  blindImage2.className = "blind-image image2";
  blindImage2.style.backgroundImage = `url(${selectedGroup.backImage[1]})`;
  blindContainer.appendChild(blindImage2);

  // 이 코드를 storySection 생성 코드 바로 위에 추가
  contentContainer.appendChild(blindContainer);

  //  스토리 섹션 반복
  const storySection = document.createElement("div");
  storySection.className = "story-section";
  storySection.innerHTML = `
	   <h3 class="animate-on-scroll animate-fade-in-up">${
       selectedGroup.storyTitle
     }</h3>
      <p class="animate-on-scroll animate-fade-in-up" style="transition-delay: 150ms;">${
        selectedGroup.storyDescription
      }</p>
      <div class="story-grid-images">
          ${selectedGroup.storyImg
            .map(
              (imgSrc, index) =>
                `<div class="story-image-wrapper animate-on-scroll animate-slide-in-left">
                   <img src="${imgSrc}" alt="스토리 이미지" style="transition-delay: ${
                  index * 300
                }ms;">
                 </div>`
            )
            .join("")}
      </div>
      <p class="animate-on-scroll animate-fade-in-up" style="transition-delay: 300ms;">${
        selectedGroup.storyDescription2
      }</p>
  `;
  contentContainer.appendChild(storySection);
  observerNewAni();
}

//동적으로 추가된 요소에 애니메이션 observer를 다 적용하는 함수
function observerNewAni() {
  const aniElements = document.querySelectorAll(
    ".animate-on-scroll:not(.is-visible)"
  );
  if (aniElements.length > 0) {
    const aniObserver = new IntersectionObserver(
      function (entries, observe) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // observe.unobserve(entry.target);
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    aniElements.forEach(function (el) {
      aniObserver.observe(el);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("#headerArea");
  const subNav = document.querySelector(".sub_nav");
  const navTop = window.scrollY;

  let = subNavTopPosition = 0;
  if (subNav) {
    subNavTopPosition = navTop + 1000;
  }

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;

    if (scrollTop >= navTop + 1300) {
      header.style.display = "none";
      subNav.classList.add("fixed");
    } else {
      header.style.display = "";
      subNav.classList.remove("fixed");
    }
  });
});
