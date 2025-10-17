$(document).ready(function () {
    // Supabase 접속 정보 설정
    const supabaseUrl = "https://ozummxbytqiyzpljwbli.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dW1teGJ5dHFpeXpwbGp3YmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Njg5NTksImV4cCI6MjA3MDI0NDk1OX0.s7SmnNVrasiE52xZD1ALRXOUzWkwMcIrLzUkfe18aeo";

    // Supabase 클라이언트 초기화
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    let recipeSwiper; // 스와이퍼 인스턴스 저장용

    async function loadLatestPosts() {
        const $swiperWrapper = $(".honey_recipe_swiper .swiper-wrapper");

        try {
            // 로딩 상태 표시
            $swiperWrapper.html(`
                <div class="swiper-slide">
                    <div class="recipe_loading">
                        <p>맛있는 레시피를 불러오는 중...</p>
                    </div>
                </div>
            `);

            // Supabase에서 최신 게시글 6개 조회
            const { data: posts, error } = await supabaseClient
                .from("Posts")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(6);

            // 오류 처리
            if (error) {
                console.error("게시글 조회 실패:", error);
                $swiperWrapper.html(`
                    <div class="swiper-slide">
                        <div class="recipe_error">
                            <p>데이터를 불러오는 데 실패했습니다.</p>
                            <p>잠시 후 다시 시도해주세요.</p>
                        </div>
                    </div>
                `);
                return;
            }

            // 게시글이 없는 경우
            if (!posts || posts.length === 0) {
                $swiperWrapper.html(`
                    <div class="swiper-slide">
                        <div class="recipe_empty">
                            <p>아직 등록된 꿀조합이 없어요!</p>
                            <p>첫 번째 꿀조합을 공유해보세요 😊</p>
                        </div>
                    </div>
                `);
                return;
            }

            // 기존 내용 초기화
            $swiperWrapper.empty();

            // 각 게시글을 스와이퍼 슬라이드로 생성
            posts.forEach(function (post) {
                // 날짜 포맷팅
                const displayDate = new Date(post.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                });

                // 내용 자르기 
                const truncatedContent =
                    post.content.length > 28 ? post.content.substring(0, 28) + "..." : post.content;

                // 제목 자르기
                const truncatedTitle = post.title.length > 10 ? post.title.substring(0, 10) + "..." : post.title;
                
                const imageUrl = post.filePath || "./sub2/images/content2/ddddd.jpg";

                // 스와이퍼 슬라이드 HTML 구조 생성
                const slideHtml = `
                    <div class="swiper-slide">
                        <div class="recipe_card">
                            <div class="recipe_img_box">
                                <img src="${imageUrl}" alt="${post.title}" />
                            </div>
                            <div class="recipe_info">
                                <div class="recipe_title">
                                    <span>${truncatedTitle}</span>
                                </div>
                                <div class="recipe_content">
                                    <span>${truncatedContent}</span>
                                </div>
                                <div class="recipe_meta">
                                    <span class="recipe_nik">${post.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // 생성된 HTML을 스와이퍼에 추가
                $swiperWrapper.append(slideHtml);
            });

            // 스와이퍼 초기화 (데이터 로드 후)
            initRecipeSwiper();
        } catch (error) {
            console.error("예상치 못한 오류 발생:", error);
            $swiperWrapper.html(`
                <div class="swiper-slide">
                    <div class="recipe_error">
                        <p>오류가 발생했습니다.</p>
                        <p>페이지를 새로고침 해주세요.</p>
                    </div>
                </div>
            `);
        }
    }

    // 레시피 스와이퍼 초기화 함수
    function initRecipeSwiper() {
        // 기존 스와이퍼가 있다면 제거
        if (recipeSwiper) {
            recipeSwiper.destroy(true, true);
        }

        // 새 스와이퍼 생성
        recipeSwiper = new Swiper(".honey_recipe_swiper", {
            slidesPerView: 1,
            spaceBetween: 10,

            loop: true,

            autoplay: {
                delay: 3500,
                disableOnInteraction: false, // 사용자가 터치해도 자동재생 계속
            },

            // 터치/드래그 설정
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,

            // 효과 설정 (자연스러운 슬라이드)
            speed: 600,
            effect: "slide",
        });
    }

    // 페이지 로드 시 게시글 불러오기
    loadLatestPosts();
    recipeSwiper = new Swiper(".honey_recipe_swiper", {});
    $(".honey_swiper_next")
        .off("click")
        .on("click", function () {
            if (recipeSwiper) {
                recipeSwiper.slideNext();
            }
        });
});
