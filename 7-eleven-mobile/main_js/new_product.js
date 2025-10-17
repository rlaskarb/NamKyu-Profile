// jQuery의 $(document).ready()와 동일한 역할을 합니다.
$(function () {
    // 1. Supabase 클라이언트 설정
    const supabaseUrl = "https://ozummxbytqiyzpljwbli.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dW1teGJ5dHFpeXpwbGp3YmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Njg5NTksImV4cCI6MjA3MDI0NDk1OX0.s7SmnNVrasiE52xZD1ALRXOUzWkwMcIrLzUkfe18aeo";

    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    /**
     * Supabase에서 최신 상품 데이터를 가져와 Swiper 슬라이더를 만드는 비동기 함수
     */
    async function setupNewProductSlider() {
        const $sliderWrapper = $(".new_product_swiper .swiper-wrapper");

        // 위에서 만든 supabaseClient 변수를 사용합니다.
        const { data: products, error } = await supabaseClient
            .from("Product")
            .select("FilePath, Name, Content1, Price , Category")
            .eq("Category", "신상")
            .order("id", { ascending: false })
            .limit(10);

        if (error) {
            console.error("Error fetching new products:", error);
            $sliderWrapper.html("<li><p>상품을 불러오는 데 실패했습니다.</p></li>");
            return;
        }

        // 변수명을 products로 소문자로 통일합니다. (기존 Products -> products)
        if (!products || products.length === 0) {
            $sliderWrapper.html("<li><p>등록된 신상품이 없습니다.</p></li>");
            return;
        }

        $sliderWrapper.empty();

        // 변수명을 product로 소문자로 통일합니다. (기존 Product -> product)
        $.each(products, function (index, product) {
            // 내용 자르기 (모바일에서는 더 짧게)
            const truncatedContent =
                product.Content1.length > 40 ? product.Content1.substring(0, 40) + "..." : product.Content1;

            // 제목 자르기
            const truncatedTitle = product.Name.length > 12 ? product.Name.substring(0, 12) + "..." : product.Name;

            const productSlideHtml = `
                <li class="swiper-slide">

                    <a href="#" class="product_image_link">
                        <img src="${product.FilePath}" alt="${product.Name} 상품 이미지">
                    </a>

                    <dl class="product_info">
                        <dt>${truncatedTitle}</dt>
                        <dd>${truncatedContent}</dd>
                        <dd class="product_price">가격 : ${product.Price.toLocaleString()}원</dd>
                    </dl>
                    
                </li>
            `;
            $sliderWrapper.append(productSlideHtml);
        });

        // 2. Swiper.js 초기화
        new Swiper(".new_product_swiper", {
            
            speed: 850,
            effect: "coverflow",
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            coverflowEffect: {
                rotate: 50, // 각도
                stretch: 0, //간격
                depth: 100, // 3D 깊이감
                modifier: 1, // 배수
                slideShadows: true,
            },

            autoplay: {
                delay: 3000,
                disableOnInteraction: false, 
            },

            pagination: {
                el: ".new_product_swiper .swiper-pagination",
                clickable: true,
            },
        });
    }

    // 함수를 실행하여 전체 프로세스를 시작합니다.
    setupNewProductSlider();
});
