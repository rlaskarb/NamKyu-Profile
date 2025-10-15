
import { navMenuItems } from "./main.js";


// 스크롤 기능을  초기화 하고 이벤트를 설정
export function initFullPageScroll(){

    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0 ;
    let isScrolling = false;

    //네이게이션 메뉴 활성 상태를 업데이트 하는 함수

    function updateActiveNav(index){
        const navLinks = document.querySelectorAll('#menu li');
        navLinks.forEach(function(li , i){
            if( i === index){
                li.classList.add('active');
            }else{
                li.classList.remove('active');
            }

        });
    }

    // 휠 이벤트 리스너
    window.addEventListener('wheel', function(event){
        if(isScrolling) return;

        isScrolling = true;

        setTimeout(function(){
          {isScrolling = false;}
        },800); // 스크롤 중복 방지 시간

        if(event.deltaY > 0){ // 휠 내릴때
            if(currentSectionIndex < sections.length -1){
                currentSectionIndex++;
            }
        }else{ // 휠 올릴때
            if(currentSectionIndex > 0){
                currentSectionIndex--;
            }
        }

        // 해당 섹션으로 부드럽게 이동
        sections[currentSectionIndex].scrollIntoView({
            behavior:'smooth',
            block: 'start' // 섹션의 상단을 뷰포트로 상단에 맞춤
        });

        // 네비게이션 상태 업데이트
        updateActiveNav(currentSectionIndex);
    },{passive:false}); // passive : false는 preventDefault 사용을 위함

    updateActiveNav(0);
}