$(function () {
    const supabaseUrl = "https://ozummxbytqiyzpljwbli.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dW1teGJ5dHFpeXpwbGp3YmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Njg5NTksImV4cCI6MjA3MDI0NDk1OX0.s7SmnNVrasiE52xZD1ALRXOUzWkwMcIrLzUkfe18aeo";
    // supabase.createClient 함수를 사용해 Supabase 통신을 위한 클라이언트 객체를 생성합니다.
    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    // --- 전역 변수 설정: 이 파일 내의 여러 함수에서 공통으로 사용될 변수들입니다. ---

    let currentPage = 1; // 현재 보고 있는 페이지 번호. 페이지를 이동할 때마다 이 값이 바뀝니다.
    const productsPerPage = 8; // 한 페이지에 보여줄 상품의 개수입니다.
    let currentFilter = { type: "all" }; // 현재 적용된 필터 상태를 저장하는 객체. 초기값은 '전체' 보기입니다.
    let productsOnPage = {}; // 현재 페이지에 표시된 상품들의 전체 데이터를 저장하는 객체입니다. 팝업창을 띄울 때 사용됩니다.

    /**
     * 상품 목록을 불러와 화면에 렌더링하는 메인 함수입니다.
     * @param {number} page - 불러올 페이지 번호
     * @param {object} filter - 어떤 조건으로 상품을 필터링할지에 대한 정보가 담긴 객체
     */
    async function loadProducts(page, filter) {
        currentPage = page; // 현재 페이지 번호를 업데이트합니다.
        currentFilter = filter; // 현재 필터 상태를 업데이트합니다.

        const $productList = $(".new_product_list");
        $productList.html("<p>상품을 불러오는 중입니다...</p>");

        // --- 페이지네이션을 위한 데이터 범위 계산 ---
        // 예: 1페이지 -> 0-7, 2페이지 -> 8-15
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = page * productsPerPage - 1;

        // --- Supabase 쿼리 작성 ---
        // let으로 쿼리 변수를 선언하는 이유: 필터 조건에 따라 쿼리가 계속 변경(추가)될 수 있기 때문입니다.
        let query = supabaseClient
            .from("Product") // 'Product' 테이블에서 조회합니다.
            .select("id, Name, FilePath, Price, Content1, Content2, Content3, Flavor ,Category ,Menu", {
                count: "exact",
            }) // 필요한 모든 컬럼과 함께, 필터링된 데이터의 전체 개수(count)를 함께 요청합니다.
            .eq("Category", "차별화") //  'Category'가 '차별화'인 상품만 필터링합니다.
            .order("id", { ascending: false }); // 최신 상품이 먼저 오도록 정렬합니다.

        // --- 추가 필터 조건 적용 ---
        if (filter.type === "flavor") {
            query = query.eq("Flavor", filter.value); // '맛'으로 필터링합니다.
        } else if (filter.type === "search") {
            query = query.ilike("Name", `%${filter.value}%`); // '이름'으로 검색합니다. ilike는 대소문자를 구분하지 않습니다.
        }
        // filter.type이 'all'이면 '차별화' 카테고리 내에서 추가 필터는 적용하지 않습니다.

        // 페이지네이션을 위한 최종 범위(range)를 쿼리에 적용합니다.
        query = query.range(startIndex, endIndex);

        // await를 사용해 Supabase에 최종적으로 쿼리를 보내고, 응답을 기다립니다.
        const { data: products, error, count } = await query;

        // --- 오류 처리 ---
        if (error) {
            console.error("상품 로딩 실패:", error);
            $productList.html("<p>상품을 불러오는 데 실패했습니다.</p>");
            return;
        }

        productsOnPage = {}; // 새 데이터를 표시하기 전, 이전 데이터를 초기화합니다.

        // --- 상품 목록이 없을 경우 처리 ---
        if (!products || products.length === 0) {
            $productList.html("<p>조건에 맞는 상품이 없습니다.</p>");
            $(".pagination").empty(); // 페이지네이션도 비워줍니다.
            return;
        }

        // --- 상품 목록 HTML 동적 생성 ---
        $productList.empty(); // 로딩 메시지를 지우고, 목록을 새로 채울 준비를 합니다.
        const $ul = $("<ul></ul>"); // 상품들을 감쌀 ul 태그를 만듭니다.
        $.each(products, function (index, product) {
            productsOnPage[product.id] = product; // 팝업창에서 사용하기 위해 상품 데이터를 저장합니다.
            const price = product.Price ? product.Price.toLocaleString() + "원" : "가격 정보 없음";
            // 각 상품에 대한 li 태그 HTML을 만듭니다.
            const productHtml = `
                <li data-id="${product.id}">
                    <a href="#">
                        <img src="${product.FilePath}" alt="${product.Name}">
                        <dl>
                            <dt>${product.Name}</dt>
                            <dd>${price}</dd>
                        </dl>
                    </a>
                </li>
            `;
            $ul.append(productHtml); // 만들어진 li를 ul에 추가합니다.
        });
        $productList.append($ul); // 완성된 ul을 화면에 표시합니다.

        // 페이지네이션 UI를 생성하는 함수를 호출합니다.
        setupPagination(count, filter);
    }

    /**
     * 페이지네이션 버튼을 생성하는 함수입니다.
     * @param {number} totalProducts - 필터링된 전체 상품의 개수
     * @param {object} filter - 현재 적용된 필터 정보 (페이지를 이동해도 필터가 유지되어야 하므로 필요)
     */
    function setupPagination(totalProducts, filter) {
        const $pagination = $(".pagination");
        $pagination.empty();

        const totalPages = Math.ceil(totalProducts / productsPerPage); // 전체 페이지 수를 계산합니다.
        if (totalPages <= 1) return; // 1페이지 이하면 페이지네이션을 만들지 않습니다.

        for (let i = 1; i <= totalPages; i++) {
            const $button = $(`<button>${i}</button>`);
            if (i === currentPage) {
                $button.addClass("active"); // 현재 보고 있는 페이지 버튼은 활성화 상태로 표시합니다.
            }
            // 각 페이지 버튼에 클릭 이벤트를 추가합니다.
            $button.on("click", function () {
                loadProducts(i, filter); // 현재 필터를 유지한 채, 해당 페이지의 상품을 불러옵니다.
            });
            $pagination.append($button);
        }
    }

    /**
     * 카테고리(맛) 필터 버튼에 클릭 이벤트를 설정하는 함수입니다.
     */
    function setupCategoryFilters() {
        $(".fresh_food_inquiry .food_inquiry_btn").on("click", function (e) {
            e.preventDefault();
            const $this = $(this);
            const filterType = $this.parent().data("filter"); // li 태그의 data-filter 속성 값을 가져옵니다.

            let filter = {};
            if (filterType === "all_food") {
                filter = { type: "all" };
            } else if (filterType === "sweet") {
                filter = { type: "flavor", value: "달달" };
            } else if (filterType === "salty") {
                filter = { type: "flavor", value: "짭짤" };
            }

            $(".fresh_food_inquiry .food_inquiry_btn").removeClass("active");
            $this.addClass("active");

            loadProducts(1, filter); // 새로운 필터로 1페이지부터 다시 불러옵니다.
        });
    }

    /**
     * 검색 버튼에 클릭 이벤트를 설정하는 함수입니다.
     */
    function setupSearch() {
        $(".new_food_btn").on("click", function () {
            const searchTerm = $(".new_food_input").val().trim(); // 검색어의 양쪽 공백을 제거합니다.

            if (searchTerm === "") {
                loadProducts(1, { type: "all" }); // 검색어가 없으면 '전체' 보기
                $(".fresh_food_inquiry .food_inquiry_btn").removeClass("active");
                $(".fresh_food_inquiry li[data-filter='all_food'] .food_inquiry_btn").addClass("active");
            } else {
                loadProducts(1, { type: "search", value: searchTerm }); // 검색어가 있으면 검색 실행
                $(".fresh_food_inquiry .food_inquiry_btn").removeClass("active"); // 필터 버튼은 모두 비활성화
            }
        });
    }

    /**
     * 팝업(모달) 창 관련 이벤트를 설정하는 함수입니다.
     */
    function setupModal() {
        const $modalBox = $(".new_modal_box");
        const $popupContent = $(".new_popup_con");

        // 상품 목록 클릭 시 모달 열기
        $(".new_product_list").on("click", "li", function (e) {
            e.preventDefault();
            const productId = $(this).data("id");
            const productData = productsOnPage[productId];

            if (!productData) return;

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

        // 동적으로 생성된 닫기 버튼 클릭 시 모달 닫기
        $popupContent.on("click", ".close_pop", function (e) {
            e.preventDefault();
            $modalBox.fadeOut(300);
        });

        // 모달 바깥 영역 클릭 시 모달 닫기
        $modalBox.on("click", function (e) {
            if (e.target === this) {
                $modalBox.fadeOut(300);
            }
        });
    }

    // --- 스크립트 최초 실행 ---
    // 1. 페이지가 처음 로딩될 때 '차별화' 카테고리 내의 '전체' 상품 1페이지를 불러옵니다.
    loadProducts(1, { type: "all" });
    $(".fresh_food_inquiry li[data-filter='all_food'] .food_inquiry_btn").addClass("active");

    // 2. 필요한 모든 이벤트 핸들러를 설정합니다.
    setupCategoryFilters();
    setupSearch();
    setupModal();
});
