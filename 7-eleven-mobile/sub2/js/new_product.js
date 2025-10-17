$(function () {
    // 1. Supabase 클라이언트 설정
    const supabaseUrl = "https://ozummxbytqiyzpljwbli.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dW1teGJ5dHFpeXpwbGp3YmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Njg5NTksImV4cCI6MjA3MDI0NDk1OX0.s7SmnNVrasiE52xZD1ALRXOUzWkwMcIrLzUkfe18aeo";
    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    // --- 전역 변수 설정 ---
    let currentPage = 1;
    const productsPerPage = 8;
    let currentFilter = { type: "all" };
    let productsOnPage = {}; // 현재 페이지의 상품 데이터를 저장하는 객체

    /**
     * 상품 목록을 불러와 화면에 렌더링하는 메인 함수
     */
    async function loadProducts(page, filter) {
        currentPage = page;
        currentFilter = filter;

        const $productList = $(".new_product_list");
        $productList.html("<p>상품을 불러오는 중입니다...</p>");

        const startIndex = (page - 1) * productsPerPage;
        const endIndex = page * productsPerPage - 1;

        let query = supabaseClient
            .from("Product")
            .select("id, Name, FilePath, Price, Content1, Content2, Content3, Flavor ,Category ,Menu", {
                count: "exact",
            })
            .eq("Category", "신상")
            .order("id", { ascending: false });

        if (filter.type === "flavor") {
            query = query.eq("Flavor", filter.value);
        } else if (filter.type === "search") {
            query = query.ilike("Name", `%${filter.value}%`);
        }

        query = query.range(startIndex, endIndex);

        const { data: products, error, count } = await query;

        if (error) {
            console.error("상품 로딩 실패:", error);
            $productList.html("<p>상품을 불러오는 데 실패했습니다.</p>");
            return;
        }

        productsOnPage = {}; // 상품 데이터 객체 초기화

        if (!products || products.length === 0) {
            $productList.html("<p>조건에 맞는 상품이 없습니다.</p>");
            $(".pagination").empty();
            return;
        }

        $productList.empty();
        const $ul = $("<ul></ul>");
        $.each(products, function (index, product) {
            productsOnPage[product.id] = product; // 받아온 상품 정보를 id를 key로 저장
            const price = product.Price ? product.Price.toLocaleString() + "원" : "가격 정보 없음";
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
            $ul.append(productHtml);
        });
        $productList.append($ul);

        setupPagination(count, filter);
    }

    /**
     * 페이지네이션 버튼을 생성하는 함수
     */
    function setupPagination(totalProducts, filter) {
        const $pagination = $(".pagination");
        $pagination.empty();

        const totalPages = Math.ceil(totalProducts / productsPerPage);
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const $button = $(`<button>${i}</button>`);
            if (i === currentPage) {
                $button.addClass("active");
            }
            $button.on("click", function () {
                loadProducts(i, filter);
            });
            $pagination.append($button);
        }
    }

    /**
     * 카테고리 필터 버튼 이벤트를 설정하는 함수
     */
    function setupCategoryFilters() {
        $(".fresh_food_inquiry .food_inquiry_btn").on("click", function (e) {
            e.preventDefault();
            const $this = $(this);
            const filterType = $this.parent().data("filter");

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

            loadProducts(1, filter);
        });
    }

    /**
     * 검색 버튼 이벤트를 설정하는 함수
     */
    function setupSearch() {
        $(".new_food_btn").on("click", function () {
            const searchTerm = $(".new_food_input").val().trim();

            if (searchTerm === "") {
                loadProducts(1, { type: "all" });
                $(".fresh_food_inquiry .food_inquiry_btn").removeClass("active");
                $(".fresh_food_inquiry li[data-filter='all_food'] .food_inquiry_btn").addClass("active");
            } else {
                loadProducts(1, { type: "search", value: searchTerm });
                $(".fresh_food_inquiry .food_inquiry_btn").removeClass("active");
            }
        });
    }

    /**
     * 모달(팝업) 창 관련 이벤트를 설정하는 함수
     */
    function setupModal() {
        const $modalBox = $(".new_modal_box");
        const $popupContent = $(".new_popup_con");

        // 1. 상품 목록 클릭 시 모달 열기 (이벤트 위임)
        $(".new_product_list").on("click", "li", function (e) {
            e.preventDefault();
            const productId = $(this).data("id");
            const productData = productsOnPage[productId];

            if (!productData) return; // 상품 데이터가 없으면 중단

            // 모달 내용 구성
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

            $popupContent.html(modalHtml); // 기존 내용 대신 새 HTML 삽입
            $modalBox.fadeIn(300); // 부드럽게 나타나기
        });

        // 2. 닫기 버튼은 .new_popup_con 안에 동적으로 생성되므로, 이벤트 위임을 사용해야 합니다.
        $popupContent.on("click", ".close_pop", function (e) {
            e.preventDefault();
            $modalBox.fadeOut(300);
        });

        // 3. 모달 바깥 영역 클릭 시 모달 닫기
        $modalBox.on("click", function (e) {
            if (e.target === this) {
                $modalBox.fadeOut(300);
            }
        });
    }

    // --- 스크립트 최초 실행 ---
    loadProducts(1, { type: "all" });
    $(".fresh_food_inquiry li[data-filter='all_food'] .food_inquiry_btn").addClass("active");

    setupCategoryFilters();
    setupSearch();
    setupModal(); // 모달 이벤트 설정 함수 호출
});
