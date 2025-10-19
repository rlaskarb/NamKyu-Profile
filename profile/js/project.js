document.addEventListener("DOMContentLoaded", function () {
    // 1. 내용을 채울 모든 프로젝트 섹션 요소를 선택합니다.
    const projectSections = document.querySelectorAll(".section[data-project-json]"); // data-project-json 속성이 있는 section만 선택

    // 2. 각 섹션에 대해 JSON 데이터를 불러와 내용을 채웁니다.
    projectSections.forEach(function (section) {
        const jsonPath = section.dataset.projectJson;

        if (!jsonPath) {
            console.error("섹션에 data-project-json 속성이 없습니다:", section);
            return; // JSON 경로가 없으면 다음 섹션으로 넘어감
        }

        // 3. fetch API를 사용하여 JSON 데이터 로드
        fetch(jsonPath)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(function (data) {
                // 4. 불러온 데이터로 해당 섹션의 내용을 채우는 함수 호출
                populateSectionContent(section, data);
            })
            .catch(function (error) {
                console.error("JSON 파일을 불러오거나 처리하는 중 오류 발생:", jsonPath, error);
                // 오류 발생 시 사용자에게 알림 (옵션)
                const errorElement = section.querySelector(".pc-main"); // 오류 메시지 표시 위치
                if (errorElement) {
                    errorElement.innerHTML = `<p style="color: red; text-align: center;">프로젝트 정보를 불러오는 데 실패했습니다.</p>`;
                }
            });
    });

    // 5. 섹션 내용을 채우는 함수 정의
    function populateSectionContent(sectionElement, data) {
        // ---- 각 요소를 정확하게 선택합니다 ----
        const hiddenTitle = sectionElement.querySelector("h2.hidden"); // 숨겨진 제목
        const videoSource = sectionElement.querySelector(".pc-video source"); // 비디오 소스
        const githubLink = sectionElement.querySelector(".github-link"); // GitHub 링크 a 태그
        const siteLink = sectionElement.querySelector(".pc-goto dt div > a:not(.github-link)"); // 바로가기 링크 a 태그
        const meritsUl = sectionElement.querySelector(".pc-merit ul"); // 장점 목록 ul
        const skillsDd = sectionElement.querySelector(".pc-skill"); // 제작 스킬 dd
        const colorPaletteDd = sectionElement.querySelector(".pc-color dd:nth-of-type(1)"); // 색상 동그라미 dd
        const fontListDd = sectionElement.querySelector(".pc-color dd:nth-of-type(2)"); // 폰트 목록 dd
        const personnelDd = sectionElement.querySelector(".pc-personnel dd"); // 제작 인원 dd

        // ---- 내용을 채웁니다 ----
        if (hiddenTitle && data.hiddenTitle) hiddenTitle.textContent = data.hiddenTitle;
        if (videoSource && data.videoSource) videoSource.setAttribute("src", data.videoSource);


        // GitHub 링크 설정
        if (githubLink) {
            if (data.githubLink && data.githubLink !== "#") {
                githubLink.setAttribute("href", data.githubLink);
                githubLink.style.display = "inline-block"; // 보이게 설정
            } else {
                githubLink.style.display = "none"; // 숨김
            }
        }

        // 바로가기 링크 설정
        if (siteLink) {
            if (data.siteLink && data.siteLink !== "#") {
                siteLink.setAttribute("href", data.siteLink);
                siteLink.style.display = "inline-block"; // 보이게 설정
            } else {
                siteLink.style.display = "none"; // 숨김
            }
        }

        // 장점 목록 채우기
        if (meritsUl && data.merits && Array.isArray(data.merits)) {
            meritsUl.innerHTML = data.merits
                .map(
                    (merit, index) => `
                <li>
                    <i class="fa-solid fa-${index + 1}"></i> ${merit} 
                </li>`
                )
                .join("");
        }

        // 제작 스킬 채우기
        if (skillsDd && data.skills) skillsDd.textContent = data.skills;

        // 색상 동그라미 채우기
        if (colorPaletteDd && data.colorCodes && Array.isArray(data.colorCodes)) {
            colorPaletteDd.innerHTML = data.colorCodes
                .map(
                    (colorCode, index) => `
                <span style="background-color: ${colorCode}; 
                width: 30px; height: 30px; border-radius: 50%;
                display: inline-block; margin-right: 5px;" 
                title="${data.colors?.[index] || ''}"></span>` // JSON 데이터 삽입
                )
                .join("");
        }

        // 폰트 목록 채우기
        if (fontListDd && data.fonts && Array.isArray(data.fonts)) {
            fontListDd.innerHTML = data.fonts.map((font) => `<span>${font}</span>`).join(", "); // JSON 데이터 삽입
        }

        // 제작 인원 채우기
        if (personnelDd && data.personnel) personnelDd.textContent = data.personnel;
    }
});