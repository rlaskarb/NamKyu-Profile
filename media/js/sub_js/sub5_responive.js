// masonry 인스턴스를 전역에서 접근할 수 있도록 변수 선언
let masonry;
const grid = document.querySelector(".grid");

// Masonry 레이아웃 초기화 및 업데이트 함수
function initMasonry() {
	// 기존 masonry 인스턴스가 있다면 파괴하여 메모리를 확보
	if (masonry) {
		masonry.destroy();
	}

	let columnWidth;
	// 창 너비에 따라 컬럼 너비 결정
	if (window.innerWidth <= 667) {
		columnWidth = ".grid-sizer-1"; // 모바일
	} else if (window.innerWidth <= 855) {
		columnWidth = ".grid-sizer-2"; // 소형 태블릿
	} else if (window.innerWidth <= 1150) {
		columnWidth = ".grid-sizer-3"; // 태블릿
	} else {
		columnWidth = ".grid-sizer-4"; // 와이드 PC
	}

	// Masonry 인스턴스 새로 생성
	masonry = new Masonry(grid, {
		itemSelector: ".grid-item",
		columnWidth: columnWidth,
		percentPosition: true,
	});

	// 이미지 및 비디오 로딩 이벤트 재등록
	imagesLoaded(grid).on("progress", function () {
		masonry.layout();
	});
	const videoElements = grid.querySelectorAll("video");
	videoElements.forEach((video) => {
		video.addEventListener("loadeddata", () => {
			masonry.layout();
		});
	});
}

// -------------------------------------------------------------
// 초기 로드 시 Masonry 실행
initMasonry();

// 창 크기가 변경될 때 Masonry 재실행 (디바운스 적용)
let resizeTimer;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		initMasonry();
	}, 250);
});


// 애니매이션 효과 

document.addEventListener("DOMContentLoaded", function () {
	const grid = document.querySelector(".grid");
	const gridItems = document.querySelectorAll(".grid-item");

	imagesLoaded(grid, function () {
		const msnry = new Masonry(grid, {
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: 10, //사이간격
			percentPosition: true
		});
		setupScrollAnimation();
	});

	function setupScrollAnimation() {
		if (!gridItems.length) return;

		const aniObserver = new IntersectionObserver(function (enties, observer) {
			enties.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
				} else {
					entry.target.classList.remove('is-visible');
				}
			});
		}, { threshold: 0.1 });

		gridItems.forEach(function (item, index) {
			item.style.transitionDelay = `${index * 70}ms`;
			aniObserver.observe(item);
		});
	}
});