document.addEventListener("DOMContentLoaded", function () {
    const youtubeLinks = document.querySelectorAll('a[data-youtube-id]');
    const modal = document.getElementById('youtube-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const player = document.getElementById('youtube-player');

    youtubeLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const videoId = this.getAttribute('data-youtube-id');

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
            iframe.title = 'YouTube video player';
            iframe.frameBorder = '0';
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;

            // 플레이어 내부에 기존 iframe이 있는지 확인
            const iframeCheck = player.querySelector('iframe');
            if (iframeCheck) {
                // 있다면 해당 iframe만 제거합니다.
                player.removeChild(iframeCheck);
            }
            player.appendChild(iframe);
            //모달창 보여주기
            modal.style.display = 'flex';
        });
    });


    //닫기
    closeBtn.addEventListener('click', function () {
        closemodal();
    });
    // 배경 클릭해도 닫기
    modal.addEventListener('click', function (e) {
        if (e.target == modal) {
            closemodal();
        }
    });

    //닫기 함수
    function closemodal() {
        modal.style.display = 'none';
        player.innerHTML = '';
    }


});