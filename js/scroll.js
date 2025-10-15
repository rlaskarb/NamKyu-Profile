export function initFullPageScroll() {
  // --- 1. 준비물 챙기기 ---
  const sections = document.querySelectorAll(".section"); // 모든 TV 채널(섹션)
  const buttons = document.querySelectorAll("#menu li"); // 모든 리모컨 버튼

  // --- 2. 기억하기 ---
  let nowIdx = 0; // 현재 보고 있는 채널 번호
  let isMoving = false; // 지금 채널 이동 중인지?

  // --- 3. 핵심 동작 만들기: "채널 이동!" ---
  function move(num) {
    // 1. isMoving 상태를 여기서 한 번에 관리!
    isMoving = true;
    setTimeout(function () {
      isMoving = false;
    }, 1000); // 1초의 쿨타임

    // 2. ★★★ 여기가 최종 해결책입니다! ★★★
    // 이동할 위치 = 화면 높이 * 채널 번호(num)
    const targetY = window.innerHeight * num;

    // 3. 계산된 위치로 부드럽게 스크롤! (틈, 오차 문제 완벽 해결)
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    // 4. 모든 리모컨 버튼의 불(active) 끄기
    buttons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // 5. num번 리모컨 버튼에만 불(active) 켜기
    buttons[num].classList.add("active");
  }

  // --- 4. 언제 동작할지 알려주기 ---

  // 4-1. 리모컨 버튼을 '클릭'했을 때
  buttons.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      if (isMoving === false) {
        nowIdx = index;
        move(nowIdx);
      }
    });
  });

  // 4-2. 마우스 '휠'을 굴렸을 때
  window.addEventListener("wheel", function (event) {
    if (isMoving === false) {
      if (event.deltaY > 0) {
        if (nowIdx < sections.length - 1) {
          nowIdx++;
          move(nowIdx);
        }
      } else {
        if (nowIdx > 0) {
          nowIdx--;
          move(nowIdx);
        }
      }
    }
  });

  // --- 5. 처음 시작하기 ---
  move(0); // 첫 번째 채널 보여주기
}