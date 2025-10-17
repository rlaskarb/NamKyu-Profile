document.addEventListener("DOMContentLoaded", function () {
	const trailers = [
		{
			mainImage: "./images/sub3/golden2.avif",
			thumbImage: "./images/sub3/golden1.avif",
			title: "HUNTR/X - Golden",
			description:
				"This song tells a story about finding a golden light inside yourself. Using the magic of the Golden Honmoon, the music becomes a shield of light. It keeps everyone safe from the shadows trying to creep into the world.",
			youtubeId: "OwpgvSo_G0g",
		},
		{
			mainImage: "./images/sub3/sodapop2.avif",
			thumbImage: "./images/sub3/sodapop1.avif",
			title: "SAJA BOYS - Soda Pop",
			description:
				"On the surface, this song sounds bright and sweet, just like soda pop. But be careful. A dark secret is hidden in its cheerful sound. The melody is actually a beautiful trap made to steal the souls of its listeners.",
			youtubeId: "aNad2Ml2Lfw",
		},
		{
			mainImage: "./images/sub3/youridol2.avif",
			thumbImage: "./images/sub3/youridol1.avif",
			title: "SAJA BOYS - Your Idol",
			description:
				"At first it sounds like a sweet love letter to fans, but beneath the polished image lies a chilling truth. The addictive beat hides loneliness and the loss of self, asking: what remains of the person behind ‘Your Idol’?",
			youtubeId: "1xhi2mi5cfk",
		},
		{
			mainImage: "./images/sub3/howitdone2.avif",
			thumbImage: "./images/sub3/howitdone1.avif",
			title: "HUNTR/X - How It's Done",
			description:
				"A pure explosion of confidence, with heavy beats like an unstoppable train. Bold and unapologetic, it’s not a plea for attention but a clear command: Watch how it’s done.",
			youtubeId: "uo1YZXlP3O8",
		},
		{
			mainImage: "./images/sub3/whatitsoundlike2.avif",
			thumbImage: "./images/sub3/whatitsoundlike1.avif",
			title: "HUNTR/X - What It Sound Like ",
			description:
				"An anthem of healing and unity. Broken glass becomes strength as HUNTR/X reveal their true selves, defeat demons, and reunite in harmony.",
			youtubeId: "Ug_pv5-r1js",
		},
	];

	const trailerWrapper = document.querySelector(".trailer_wrapper");
	const popup = document.querySelector(".trailer_popup");
	const closeBtn = document.querySelector(".close_btn");
	const youtubeIframeContainer = document.querySelector(".youtube_iframe");
	let trailerSwiper = null; // Swiper 인스턴스를 저장할 변수

	// 유튜브 팝업 열기
	function openPopup(youtubeId) {
		if (trailerSwiper) trailerSwiper.autoplay.stop();
		youtubeIframeContainer.innerHTML = `
		<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1"
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
		popup.style.display = "flex";
	}

	// 유튜브 팝업 닫기
	function closePopup() {
		popup.style.display = "none";
		youtubeIframeContainer.innerHTML = "";
		if (trailerSwiper) trailerSwiper.autoplay.start();
	}

	// PC 레이아웃 설정
	function setupDesktopLayout() {
		const pcHTML = `
        <div class="trailer_pc_layout">
        	<div class="pc_main_display"> 
				<div class="play_icon" data-youtubeid="${trailers[0].youtubeId}">
            		<img id="pcMainImage" src="${trailers[0].mainImage}" alt="${trailers[0].title}">
            		<i class="fa-brands fa-youtube"></i>
				</div> 
			</div>
          <dl id="pcMainInfo">
            <dt>${trailers[0].title}</dt>
            <dd>${trailers[0].description}</dd>
          </dl>
        </div>
        <ul class="pc_thumb_list">
          ${trailers.map((trailer, index) => `
            <li data-index="${index}" class="${index === 0 ? "selected" : ""}">
              <img src="${trailer.thumbImage}" alt="${trailer.title}">
            </li>`
		).join("")}
        </ul>
      `;
		trailerWrapper.innerHTML = pcHTML;

		const mainImage = document.getElementById("pcMainImage");
		const mainInfo = document.getElementById("pcMainInfo");
		const playIcon = document.querySelector(".pc_main_display .play_icon");
		const thumbList = document.querySelector(".pc_thumb_list");

		thumbList.addEventListener("click", (e) => {
			const thumb = e.target.closest("li");
			if (!thumb) return;

			const index = parseInt(thumb.dataset.index);
			const trailer = trailers[index];

			mainImage.src = trailer.mainImage;
			mainInfo.querySelector("dt").innerHTML = trailer.title;
			mainInfo.querySelector("dd").textContent = trailer.description;
			playIcon.dataset.youtubeid = trailer.youtubeId;

			thumbList.querySelector(".selected")?.classList.remove("selected");
			thumb.classList.add("selected");
		});

		playIcon.addEventListener("click", (e) => {
			openPopup(e.currentTarget.dataset.youtubeid);
		});
	}

	// 태블릿/모바일 Swiper 레이아웃 설정
	function setupSwiperLayout() {
		const swiperHTML = `
        <div class="swiper trailer-swiper">
          <div class="swiper-wrapper">
            ${trailers.map((trailer) => `
              <div class="swiper-slide" data-youtubeid="${trailer.youtubeId}">
                <img src="${trailer.mainImage}" alt="${trailer.title}">
                <div class="play_icon">
					<i class="fa-brands fa-youtube"></i>
				</div>
                    <dl>
                    	<dt>${trailer.title}</dt>
                        <dd>${trailer.description}</dd>
                    </dl>
              </div>`).join("")}
          </div>
          <div class="swiper-pagination"></div>
		  <div class ="trailer-button" >	
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
		  </div>
        </div>
      `;

		trailerWrapper.innerHTML = swiperHTML;

		trailerSwiper = new Swiper(".trailer-swiper", {


			loop: true,

			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});

		trailerWrapper.addEventListener("click", (e) => {
			const slide = e.target.closest(".swiper-slide");
			if (slide && slide.dataset.youtubeid) {
				openPopup(slide.dataset.youtubeid);
			}
		});
	}

	// 화면 크기에 따라 레이아웃을 결정하는 메인 함수
	function handleResize() {
		const isMobile = window.innerWidth <= 1150;

		if (isMobile) {
			// Swiper가 없거나, PC 레이아웃 상태일 때만 Swiper 생성
			if (
				!trailerSwiper ||
				trailerWrapper.querySelector(".trailer_pc_layout")
			) {
				setupSwiperLayout();
			}
		} else {
			// Swiper가 있다면 파괴하고 PC 레이아웃으로 변경
			if (trailerSwiper) {
				trailerSwiper.destroy();
				trailerSwiper = null;
			}
			// PC 레이아웃이 아닐 때만 PC 레이아웃 생성
			if (!trailerWrapper.querySelector(".trailer_pc_layout")) {
				setupDesktopLayout();
			}
		}
	}

	// 팝업 닫기 버튼 이벤트
	closeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		closePopup();
	});
	popup.addEventListener("click", (e) => {
		if (e.target === popup) closePopup();
	});

	// 초기 로드 및 화면 크기 변경 시 함수 실행
	window.addEventListener("resize", handleResize);
	handleResize(); // 페이지 첫 로드 시 실행
});
