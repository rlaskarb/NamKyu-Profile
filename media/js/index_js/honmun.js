document.addEventListener("DOMContentLoaded", function () {


    // 1. 필요한 요소(element)들을 가져옵니다.
    const canvas = document.getElementById('interactive-canvas');
    const ctx = canvas.getContext('2d');
    const contentSection = document.getElementById('content');
    const rootStyles = getComputedStyle(document.documentElement);
    const colorPoint1 = rootStyles.getPropertyValue('--color-point1').trim();
    const colorPoint2 = rootStyles.getPropertyValue('--color-point2').trim();

    let lines = [];
    let ripples = [];
    let particles = [];
    let animationTime = 0;

    const LINE_DENSITY = 25;
    const POINT_DENSITY = 10;
    const INITIAL_WAVE_AMPLITUDE = 15;
    const INITIAL_WAVE_FREQUENCY = 0.005;
    const INITIAL_LINE_ALPHA = 0.3;

    // 2. 캔버스 크기를 #content 섹션에 맞추는 함수를 정의합니다.
    function resizeCanvas() {
        canvas.width = contentSection.clientWidth;
        canvas.height = contentSection.clientHeight;
        initLines(); // 캔버스 크기가 변경될 때마다 선을 다시 그립니다.
    }

    // 3. 이벤트 리스너를 등록하고, 함수를 실행합니다.
    resizeCanvas(); // 페이지 로드 시 캔버스 크기를 한 번 설정합니다.
    window.addEventListener('resize', resizeCanvas); // 창 크기가 바뀔 때마다 캔버스 크기를 다시 설정합니다.



    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.life = 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.015;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }


    function initLines() {
        lines = [];
        // clientHeight가 0일 경우를 대비해 || window.innerHeight 추가
        const canvasHeight = contentSection.clientHeight || window.innerHeight;
        for (let i = 0; i < canvasHeight / LINE_DENSITY; i++) {
            const yOffset = i * LINE_DENSITY;
            let line = [];
            for (let x = 0; x <= canvas.width; x += POINT_DENSITY) {
                line.push({ x: x, y: yOffset, originalY: yOffset, waveY: 0 });
            }
            lines.push(line);
        }

    }

    contentSection.addEventListener('click', (event) => {

        event.stopPropagation();

        const clickX = event.clientX;
        const clickY = event.clientY;

        ripples.push({
            x: clickX,
            y: clickY,
            radius: 0,
            maxRadius: Math.max(canvas.width, canvas.height) * 0.7,
            strength: 80,
            color: colorPoint1,
            life: 1,
            waveSpeed: Math.random() * 0.05 + 0.02
        });

        const particleColors = [
            colorPoint1,
            colorPoint2,
            'rgba(255, 255, 255, 0.8)',
            'rgba(255, 223, 0, 0.9)'
        ];
        for (let i = 0; i < 80; i++) {
            const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
            particles.push(new Particle(clickX, clickY, randomColor));
        }
    });

    function animate() {
        ctx.fillStyle = 'rgba(12, 0, 20, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = ripples.length - 1; i >= 0; i--) {
            let ripple = ripples[i];
            ripple.radius += 3;
            ripple.life -= 0.005;
            if (ripple.radius > ripple.maxRadius || ripple.life <= 0) {
                ripples.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        lines.forEach((line, lineIndex) => {
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            let currentLineColor = `rgba(${parseInt(colorPoint1.split('(')[1].split(',')[0])}, ${parseInt(colorPoint1.split(',')[1])}, ${parseInt(colorPoint1.split(',')[2])}, ${INITIAL_LINE_ALPHA})`;

            line.forEach((point, pointIndex) => {
                point.waveY = Math.sin(point.x * INITIAL_WAVE_FREQUENCY + animationTime + lineIndex * 0.1) * INITIAL_WAVE_AMPLITUDE;
                point.y = point.originalY + point.waveY;

                ripples.forEach(ripple => {
                    const dx = point.x - ripple.x;
                    const dy = point.originalY - ripple.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < ripple.radius) {
                        const waveFactor = (ripple.radius - distance) / ripple.radius;
                        const waveHeight = ripple.strength * Math.cos(waveFactor * Math.PI) * (1 - (distance / ripple.maxRadius));
                        point.y += waveHeight * ripple.life;
                        currentLineColor = `rgba(${parseInt(colorPoint1.split('(')[1].split(',')[0])}, ${parseInt(colorPoint1.split(',')[1])}, ${parseInt(colorPoint1.split(',')[2])}, ${ripple.life})`;
                    }
                });
            });

            ctx.strokeStyle = currentLineColor;
            ctx.moveTo(line[0].x, line[0].y);
            for (let i = 1; i < line.length; i++) {
                ctx.lineTo(line[i].x, line[i].y);
            }
            ctx.stroke();
        });

        animationTime += 0.01;
        requestAnimationFrame(animate);
    }

    animate();
});