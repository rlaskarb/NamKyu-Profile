

let audioPlayer;
let currentPlayingId = null;
let currentPlayingContainer = null;


// 유튜브 API가 준비되면 자동으로 이 함수를 실행
function onYouTubeIframeAPIReady() {
    audioPlayer = new YT.Player('audio-player', {
        height: '1', width: '1', events: {
            'onReady': setupAudioPlayer, // 플레이어가 준비되면 2번함수 호출
            'onStateChange': onPlayerStateChange

        }
    });
}


// 플레이어가 준비된 후 실제 버튼 이벤트 설정
function setupAudioPlayer() {
    const musicContainers = document.querySelectorAll('.trailer_music');
    musicContainers.forEach(function (container) {
        const videoId = container.getAttribute('data-youtube-id');
        const imageLink = container.querySelector('a');
        const playBtn = container.querySelector('.fa-play');
        const playingBtn = container.querySelector('.fa-pause');
        const stopBtn = container.querySelector('.fa-stop');

        // '재생'을 유발하는 요소들 (재생버튼 , 이미지)
        [playBtn, imageLink].forEach(function (element) {
            element.addEventListener('click', function (e) {
                e.preventDefault();
                playMusic(videoId, container); // playMusic 함수는 내부에 다른곡이 재생중이면 알아서 멈추는 기능이 포함되어있음.
            });
        });

        //'정지'를 유발하는 요소들(재생 중 버튼 , 정지 버튼)
        [playingBtn, stopBtn].forEach(function (element) {
            element.addEventListener('click', function (e) {
                e.preventDefault();
                stopMusic();
            });
        });
    });
}


// 재생 작업을 처리하는 함수
function playMusic(videoId, container) {

    //만약 지금 클릭한 곡이 이미 재생중이라면 아무것도 안하고 함수를 종료
    if (currentPlayingId === videoId) {
        return;
    }

    //  다른 노래가 재생 중이었다면, 그 노래의 UI를 원래대로 되돌립니다.
    if (currentPlayingContainer) {
        currentPlayingContainer.classList.remove('playing');
    }

    // 새로운 노래를 재생합니다.
    audioPlayer.loadVideoById(videoId);
    audioPlayer.playVideo();

    //새로운 노래의 UI를 '재생중' 상태로 바꾼다
    container.classList.add('playing');

    // 기억장치에 현재 재생 상태를 새로 기록한다
    currentPlayingId = videoId;
    currentPlayingContainer = container;
}


//정지 작업을 처리하는 함수
function stopMusic() {
    // 플레이어 재생을 멈춘다
    audioPlayer.stopVideo();

    //현재 재생중인 노래의 UI를 원래대로 되돌린다.
    if (currentPlayingContainer) {
        currentPlayingContainer.classList.remove('playing');
    }

    // 기억장치를 초기화 합니다.
    currentPlayingId = null;
    currentPlayingContainer = null;
}

// 플레이어의 상태가 바뀔 때마다 함수호출
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        stopMusic();
    }
}