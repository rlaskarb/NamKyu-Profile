$(function () {
    // 1. Supabase 클라이언트 설정
    const supabaseUrl = "https://ozummxbytqiyzpljwbli.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dW1teGJ5dHFpeXpwbGp3YmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Njg5NTksImV4cCI6MjA3MDI0NDk1OX0.s7SmnNVrasiE52xZD1ALRXOUzWkwMcIrLzUkfe18aeo";
    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    // 배너에 표시된 상품들의 전체 데이터를 저장할 객체
    let bannerProducts = {};

    /**
     * Supabase에서 '신상' 카테고리 상품을 가져와 배너 슬라이더를 만드는 비동기 함수
     */
    async function setupBannerSlider() {
        const $sliderWrapper = $(".new_banner_container .swiper-wrapper");

        // 팝업창에 필요한 모든 정보를 함께 요청합니다.
        const { data: products, error } = await supabaseClient
            .from("Product")
            .select("id, Name, FilePath, Content1, Content2, Content3, Flavor,Category ,Menu")
            .eq("Category", "신상")
            .order("id", { ascending: false })
            .limit(6);

        if (error) {
            console.error("배너 상품 로딩 실패:", error);
            $sliderWrapper.html("<li><p>상품을 불러오는 데 실패했습니다.</p></li>");
            return;
        }

        if (!products || products.length === 0) {
            $sliderWrapper.html("<li><p>추천 상품이 없습니다.</p></li>");
            return;
        }

        bannerProducts = {}; // 데이터 객체 초기화
        $sliderWrapper.empty();

        $.each(products, function (index, product) {
            bannerProducts[product.id] = product; // ID를 key로 전체 데이터 저장

            const slideHtml = `
                <li class="swiper-slide" data-id="${product.id}">
                    <img src="${product.FilePath}" alt="${product.Name} 상품 이미지" />
                    <p>${product.Name}</p>         
                </li>
            `;
            $sliderWrapper.append(slideHtml);
        });

        // Swiper.js 초기화
        new Swiper(".new_banner_container.swiper", {
            slidesPerView: 2,
            spaceBetween: 15,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });

        // 배너 팝업 기능 설정 함수 호출
        setupBannerModal();
    }

    /**
     * 배너 슬라이더의 모달(팝업) 창 관련 이벤트를 설정하는 함수
     */
    function setupBannerModal() {
        const $modalBox = $(".new_modal_box");
        const $popupContent = $(".new_popup_con");

        // 배너 슬라이더 클릭 시 모달 열기 (이벤트 위임)
        $(".new_banner_container").on("click", ".swiper-slide", function (e) {
            e.preventDefault();
            const productId = $(this).data("id");
            const productData = bannerProducts[productId];

            if (!productData) return;

            // 모달 내용 구성 (닫기 버튼 포함)
            const modalHtml = `
                <a href="#" class="close_pop"><i class="fa-solid fa-x"></i></a>
                <div class="modal_content_wrapper">
                    <img src="${productData.FilePath}" alt="${productData.Name}">
                    <h3>${productData.Name}</h3>
                    <p>${productData.Content1 || ""}</p>
                    <p>${productData.Content2 || ""}</p>
                    <p>${productData.Content3 || ""}</p>
                       <div class="menu_box">
                    ${productData.Flavor ? `<span class="flavor-tag">#${productData.Flavor}</span>` : ""}
                    ${productData.Category ? `<span class="flavor-tag">#${productData.Category}</span>` : ""}
                    ${productData.Menu ? `<span class="flavor-tag">#${productData.Menu}</span>` : ""}
                    </div>
                </div>
            `;

            $popupContent.html(modalHtml);
            $modalBox.fadeIn(300);
        });

        // 닫기 버튼과 배경 클릭 이벤트는 new_product.js의 setupModal 함수가 이미 처리하고 있으므로,
        // 여기서는 중복으로 설정할 필요가 없습니다. 만약 해당 파일과 독립적으로 동작해야 한다면 여기에 추가해야 합니다.
    }

    // 함수를 실행하여 배너 슬라이더를 설정합니다.
    setupBannerSlider();
});
