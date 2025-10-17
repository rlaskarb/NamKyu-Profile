// 1. 필요한 요소 가져오기
const cursor = document.querySelector('.custom-cursor');

// 2. 마우스 움직임 감지 -> 커서 따라다니게 하기
window.addEventListener('mousemove', e => {
    // GSAP 같은 라이브러리를 쓰면 더 부드럽게 만들 수 있지만, 기본은 이렇습니다.
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 3. 마우스 클릭 감지 -> 회전 및 파티클 생성
window.addEventListener('mousedown', e => {
    // 커서에 .clicked 클래스를 추가하여 회전 시작
    cursor.classList.add('clicked');

    // 파티클을 여러 개(예: 15개) 생성
    for (let i = 0; i < 15; i++) {
        createParticle(e.clientX, e.clientY);
    }
});

// 4. 마우스 클릭 해제 감지 -> 회전 클래스 제거
window.addEventListener('mouseup', () => {
    // .clicked 클래스를 제거하여 다음 클릭을 준비
    cursor.classList.remove('clicked');
});


// 파티클을 생성하고 애니메이션을 적용하는 함수
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // 파티클의 초기 위치를 마우스 클릭 위치로 설정
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // 파티클이 흩어질 최종 목적지를 랜덤하게 계산
    // -100px ~ +100px 사이의 랜덤 값
    const destX = (Math.random() - 0.5) * 2 * 100;
    const destY = (Math.random() - 0.5) * 2 * 100;

    // CSS 변수(--x, --y)에 계산된 랜덤 목적지 값을 설정
    particle.style.setProperty('--x', destX + 'px');
    particle.style.setProperty('--y', destY + 'px');

    // body에 파티클 추가
    document.body.appendChild(particle);

    // ★★★ 중요: 애니메이션이 끝나면 파티클을 HTML에서 제거 (메모리 관리)
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}