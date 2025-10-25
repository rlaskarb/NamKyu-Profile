const mobileLink = document.getElementById('mobile-window');
if (mobileLink) {
    mobileLink.addEventListener('click', function (event) {
        event.preventDefault();

        const url = this.href;
        const windowName = 'mobilePreview';

        const windowWidth = 420;
        const windowHeight = 860;

        const left = (window.screen.width / 4) - (windowWidth / 4);
        const top = (window.screen.height / 2) - (windowHeight / 2);
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${left},top=${top},resizable=yes , scrollbase=yes`;

        window.open(url, windowName, windowFeatures);
    });
}