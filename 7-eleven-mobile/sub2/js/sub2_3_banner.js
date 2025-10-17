// jQuery의 $(function() { ... })는 HTML 문서가 모두 로드된 후 코드를 실행하라는 의미입니다.
// 자바스크립트 코드가 HTML 요소보다 먼저 실행되어 발생하는 오류를 방지하는 중요한 역할을 합니다.
$(function () {
    // --- Supabase 클라이언트 설정: 데이터베이스와 통신하기 위한 접속 정보를 설정합니다. ---

    // supabaseUrl: 각자의 Supabase 프로젝트마다 부여되는 고유한 주소입니다.
    const supabaseUrl = "https://ozummxbytqiyzpljwbli.supabase.co";
    // supabaseKey: 프로젝트에 접근하기 위한 인증키입니다. 웹사이트에 공개되는 키는 보통 anon key로, 보안 규칙에 따라 제한된 접근만 가능합니다.
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dW1teGJ5dHFpeXpwbGp3YmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Njg5NTksImV4cCI6MjA3MDI0NDk1OX0.s7SmnNVrasiE52xZD1ALRXOUzWkwMcIrLzUkfe18aeo";
    // supabase.createClient 함수를 사용해 Supabase 통신을 위한 클라이언트 객체를 생성합니다.
    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    // --- 전역 변수 설정: 이 파일 내의 여러 함수에서 공통으로 사용될 변수입니다. ---

    // bannerProducts: 배너에 표시된 상품들의 전체 데이터를 저장하는 객체입니다.
    // 사용자가 슬라이드를 클릭했을 때, 이 객체에서 해당 상품의 상세 정보를 찾아 팝업창에 보여주기 위해 사용됩니다.
    let bannerProducts = {};

    /**
     * 배너 슬라이더를 설정하고 화면에 표시하는 비동기(async) 함수입니다.
     * async를 사용하는 이유: Supabase에서 데이터를 가져오는 작업은 시간이 걸리므로, 프로그램이 멈추지 않고 비동기적으로 처리해야 합니다.
     */
    async function setupBannerSlider() {
        // jQuery를 사용해 슬라이드 아이템들이 들어갈 HTML 요소를 찾습니다.
        const $sliderWrapper = $(".new_banner_container .swiper-wrapper");

        // --- Supabase에서 데이터 가져오기 ---
        // await 키워드: 비동기 작업(데이터 요청)이 완료될 때까지 기다리라는 명령어입니다.
        const { data: products, error } = await supabaseClient
            .from("Product") // 'Product' 테이블에서 데이터를 조회합니다.
            .select("id, Name, FilePath, Content1, Content2, Content3, Flavor ,Category ,Menu") // 필요한 모든 컬럼(열)을 선택합니다.
            .eq("Category", "차별화") // 'Category'가 '차별화'인 상품만 필터링합니다.
            .order("id", { ascending: false }) // 최신 상품이 먼저 오도록 id를 기준으로 내림차순 정렬합니다.
            .limit(6); // 최대 6개의 데이터만 가져옵니다.

        // 데이터 요청 중 에러가 발생했는지 확인합니다.
        if (error) {
            console.error("배너 상품 로딩 실패:", error); // 개발자가 오류를 확인할 수 있도록 콘솔에 에러 메시지를 출력합니다.
            $sliderWrapper.html("<li><p>상품을 불러오는 데 실패했습니다.</p></li>");
            return; // 에러가 발생했으므로 함수 실행을 중단합니다.
        }

        // 가져온 상품 데이터가 없는 경우
        if (!products || products.length === 0) {
            $sliderWrapper.html("<li><p>추천 상품이 없습니다.</p></li>");
            return;
        }

        // --- HTML 동적 생성 ---
        bannerProducts = {}; // 새 데이터를 받기 전, 이전에 저장된 데이터를 초기화합니다.
        $sliderWrapper.empty(); // 슬라이더의 기존 내용을 모두 비웁니다.

        // $.each 함수를 사용해 가져온 상품 데이터(products 배열)를 하나씩 순회합니다.
        $.each(products, function (index, product) {
            // bannerProducts 객체에 상품 id를 key로, 상품 전체 데이터를 value로 저장합니다.
            bannerProducts[product.id] = product;

            // 각 상품에 대한 HTML(li 태그)을 문자열로 만듭니다.
            // data-id 속성: 나중에 클릭된 슬라이드가 어떤 상품인지 쉽게 찾기 위해 상품의 고유 id를 저장해둡니다.
            const slideHtml = `
                <li class="swiper-slide" data-id="${product.id}">
                    <img src="${product.FilePath}" alt="${product.Name} 상품 이미지" />
                    <p>${product.Name}</p>                    
                </li>
            `;
            // 만들어진 HTML을 슬라이더 wrapper에 추가합니다.
            $sliderWrapper.append(slideHtml);
        });

        // --- Swiper.js 라이브러리 초기화 ---
        // new Swiper()를 통해 슬라이더를 실제로 동작시킵니다.
        new Swiper(".new_banner_container.swiper", {
            slidesPerView: 2, // 한 화면에 보여줄 슬라이드 개수
            spaceBetween: 15, // 슬라이드 사이의 여백 (px)
            loop: true, // 무한 반복 여부
            autoplay: {
                // 자동 재생 설정
                delay: 3000, // 3초마다 다음 슬라이드로 이동
                disableOnInteraction: false, // 사용자가 조작한 후에도 자동 재생 계속
            },
            navigation: {
                // 좌우 화살표 버튼 설정
                nextEl: ".banner_slider_arrows .next",
                prevEl: ".banner_slider_arrows .prev",
            },
        });

        // 배너 팝업 기능 설정 함수를 호출합니다.
        setupBannerModal();
    }

    /**
     * 배너 슬라이더의 팝업(모달) 창 관련 이벤트를 설정하는 함수입니다.
     */
    function setupBannerModal() {
        // 팝업창과 관련된 HTML 요소들을 미리 찾아 변수에 저장해두면, 필요할 때마다 다시 찾지 않아도 되므로 효율적입니다.
        const $modalBox = $(".new_modal_box");
        const $popupContent = $(".new_popup_con");

        // 이벤트 위임(Event Delegation): 슬라이드 하나하나에 이벤트를 걸지 않고, 부모 요소인 .new_banner_container에 한 번만 이벤트를 겁니다.
        // 이렇게 하면, 나중에 동적으로 슬라이드가 추가되어도 이벤트가 정상적으로 작동하며, 메모리를 아낄 수 있습니다.
        $(".new_banner_container").on("click", ".swiper-slide", function (e) {
            e.preventDefault(); // a 태그나 button 등이 가진 기본 동작(예: 페이지 이동)을 막습니다.

            // 클릭된 슬라이드의 data-id 속성 값을 가져옵니다.
            const productId = $(this).data("id");
            // 위에서 저장해둔 bannerProducts 객체에서 해당 id의 상품 데이터를 찾습니다.
            const productData = bannerProducts[productId];

            // 혹시 모를 오류를 방지. 데이터가 없으면 아무 작업도 하지 않고 함수를 종료합니다.
            if (!productData) return;

            // --- 팝업창에 들어갈 HTML 동적 생성 ---
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
                    </div
                </div>
            `;

            // 생성된 HTML을 팝업창 내부에 삽입합니다.
            $popupContent.html(modalHtml);
            // 팝업창을 부드럽게 나타나게 합니다. (0.3초 동안)
            $modalBox.fadeIn(300);
        });

        // 팝업창의 닫기 버튼이나 배경 클릭 이벤트는 `sub2_3_product_list.js` 파일에서 이미 공통으로 처리하고 있으므로,
        // 여기서는 중복으로 설정하지 않아도 됩니다. 만약 이 파일이 독립적으로 사용된다면 여기에 닫기 이벤트 로직도 추가해야 합니다.
    }

    // --- 최종 실행 ---
    // 이 페이지의 메인 기능인 setupBannerSlider 함수를 호출하여 모든 프로세스를 시작합니다.
    setupBannerSlider();
});
