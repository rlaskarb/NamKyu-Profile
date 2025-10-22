document.addEventListener("DOMContentLoaded", function () {

    // 내용을 채울 모든 섹션 요소 선택
    const projectSection = document.querySelectorAll('.section[data-project-json]');

    // 각 섹션에 대해 json 데이터를 불러와 내용 채우기
    projectSection.forEach(function (section) {
        const jsonPath = section.dataset.projectJson;

        if (!jsonPath) {
            console.error("코드확인해", section);
            return;
        }

        // fetch API를 사용해 json 데이터 로드
        fetch(jsonPath).then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error : ${response.status}`);
            }
            return response.json();

        }).then(function (data) {
            populateContent(section, data);

        }).catch(function (error) {
            console.error("json 파일불러오는중 에러발생", jsonPath, error);
            const errorElement = section.querySelector('.pc-main');
            if (errorElement) {
                errorElement.innerHTML = `<span style="color: red; text-alian:center;" > 프로젝트를 불러오는데 실패했어요...</span>`
            }
        });
    });


    //섹션을 내용을 채우는 함수
    function populateContent(section, data) {
        const merits = section.querySelector('.pc-merit ul');
        const skills = section.querySelector('.pc-skill');
        const colors = section.querySelector('.pc-color dd:nth-of-type(1)');
        const fonts = section.querySelector('.pc-color dd:nth-of-type(2)');
        const personnel = section.querySelector('.pc-personnel dd');
        const period = section.querySelector('.pc-period dd');


        // 장점 목록 채우기
        if (merits && data.merits && Array.isArray(data.merits)) {
            merits.innerHTML = data.merits.map(

                function (merit, index) {
                    return `
                <li>
                    <i class="fa-solid fa-${index + 1}"></i> ${merit}
                </li>
                `
                }
            ).join("");
        }
        // 제작스킬 채우기
        if (skills && data.skills) skills.textContent = data.skills;

        // 색 채우기
        if (colors && data.colorCodes && Array.isArray(data.colorCodes)) {
            colors.innerHTML = data.colorCodes.map(
                function (colorCode, index) {
                    return `
                <span style="background-color:${colorCode};
                             width:30px; height:30px; border-radius:50%;"
                              title="${data.colors?.[index] || ''}"></span>
                `
                }
            ).join("");
        }

        // 폰트 채우기
        if (fonts && data.fonts && Array.isArray(data.fonts)) {
            fonts.innerHTML = data.fonts.map(function (font) {
                return `
            <span>${font}</span>
            `
            }).join(",");
        }

        // 제작인원 채우기
        if (personnel && data.personnel) personnel.textContent = data.personnel;

        // 제작인원 채우기
        if (period && data.period) period.textContent = data.period;
    }



});