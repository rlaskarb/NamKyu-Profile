const episodeData = [
    {
        id: 'food',
        navTitle: 'FOOD',
        title: 'Fuel for the Hunt',
        description: "The great ramen war is on. It's a legendary showdown every Korean knows, as two rival companies battle for the throne. The nation holds its breath, waiting to see which brand will reign supreme. I've already secured my box of Nongshim Shin Ramyun. What about you? Have you picked a side?",
        images: [
            "./images/sub4/sub4_3.avif",
            "./images/sub4/sub4_4.avif",
            "./images/sub4/sub4_4_1.avif"
        ]
    },
    {
        id: 'couple',
        navTitle: 'COUPLE',
        title: 'Partners in Destiny',
        description: "Let's be real—the 'will-they-won't-they' tension is the best part of any story. The chemistry between Rumi & Jinu has fans on the edge of their seats, while the enigmatic pull between Zoey & Mystery leaves us guessing. Will these fan-favorite ships finally set sail?",
        images: [
            "./images/sub4/sub4_7.avif",
            "./images/sub4/sub4_8.avif",
            "./images/sub4/sub4_8_1.avif"
        ]
    },
    {
        id: 'voice',
        navTitle: 'VOICE',
        title: 'Echoes of Power',
        description: "These are the voices that took our heroes to the top of the Billboard charts. But just revealing them would be too easy, right? So, we've prepared a game for the true fans. Take your guess: Who is the real voice behind the one and only Rumi?",
        images: [
            "./images/sub4/sub4_9.avif",
            "./images/sub4/sub4_10.avif",
            "./images/sub4/sub4_10_1.avif"
        ]
    }
];



document.addEventListener("DOMContentLoaded", function () {


    const tabMenu = document.querySelector(".sub_nav");
    const contentArea = document.getElementById("episodes_content");

    function createMenu() {
        episodeData.forEach(function (episode, index) {
            const li = document.createElement('li');
            const a = document.createElement('a');

            a.href = "#";
            a.textContent = episode.navTitle;
            a.dataset.episodeId = episode.id;

            if (index === 0) {
                a.classList.add("current");
            }

            li.appendChild(a);
            tabMenu.appendChild(li);
        });
    }

    function updateContent(episodeId) {
        const selectedEpisode = episodeData.find(function (ep) {
            return ep.id === episodeId;
        });
        if (!selectedEpisode) return;

        contentArea.innerHTML = "";



        const p = document.createElement('p');
        p.textContent = selectedEpisode.description;

        const imgGallery = document.createElement('div');
        imgGallery.className = 'episode-images';

        selectedEpisode.images.forEach(function (imagePath) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'episode-image';
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${selectedEpisode.title} image`;
            imgContainer.appendChild(img);
            imgGallery.appendChild(imgContainer);
        });

        contentArea.appendChild(p);
        contentArea.appendChild(imgGallery);
    }

    // 3. 이벤트 처리
    tabMenu.addEventListener('click', function (event) {

        if (event.target.tagName !== 'A') return;

        event.preventDefault();


        tabMenu.querySelectorAll('a').forEach(function (link) { link.classList.remove('current') });

        event.target.classList.add('current');

        const selectedId = event.target.dataset.episodeId;

        updateContent(selectedId);
    });


    createMenu();
    updateContent(episodeData[0].id);
}); 