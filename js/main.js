
const navMenuItems = [
    { id: '1section', text: 'Home' },
    { id: '2section', text: 'Profile' },
    { id: '3section', text: 'Web Project(PC)' },
    { id: '4section', text: 'Web Project(Mobile)' },
    { id: '5section', text: 'Responsive Project' },
    { id: '6section', text: 'Review' },
];


const headerShortcuts = [
    { href: "#2section", src: "./images/1.png", alt: "프로필 바로가기" },
    { href: "#3section", src: "./images/2.png", alt: "pc 프로젝트 바로가기" },
    { href: "#5section", src: "./images/5.png", alt: "반응형 프로젝트 바로가기" },
];



const chatListData = [
    {
        id: "portfolio-intro",
        title: " 김남규의 포트폴리오 소개방",
        lastMessage: "눌러 주실꺼죠!",
        time: "방금",
        unread: 2,
        avatar: "./images/rebit6.webm",
        mediaType: 'video',
        isClickable: true
    },
    {
        id: "friend",
        title: " 친구 4",
        lastMessage: "와... 대박 남규야 ...",
        time: "오후 2:40",
        unread: 0,
        avatar: "./images/nam.jpg",
        mediaType: 'image',
        isClickable: false
    },
    {
        id: "kakaotalk-deal",
        title: " 카카오 톡딜",
        lastMessage: "(광고)[톡딜 마감 임박 알림] 김남규 포트폴리오...",
        time: "오전 12:30",
        unread: 0,
        avatar: "./images/nam.jpg",
        mediaType: 'image',
        isClickable: false
    },
    {
        id: "kakao-pay",
        title: "NK 페이",
        lastMessage: "김남규 포트폴리오가 완료되었어요",
        time: "오전 08:21",
        unread: 0,
        avatar: "./images/nam.jpg",
        mediaType: 'image',
        isClickable: false
    },

    {
        id: "nobfshim",
        title: "KNK 브랜드 스토어",
        lastMessage: "포트폴리오 조회 버튼을 누르면 남규의현황을...",
        time: "오전 08:00",
        unread: 0,
        avatar: "./images/nam.jpg",
        mediaType: 'image',
        isClickable: false
    },

];



const kakaotalkData = {
    "portfolio-intro": [ //chatListData 의 id 연결
        { speaker: '망붕이', avatar: "./images/nam.jpg", message: '남규 포트폴리오를 클릭해주셔서 감사합니다' },
        { speaker: '김남규', message: '제 포트폴리오를 소개하겠습니다' },
        { speaker: '김남규', avatar: "./images/nam.jpg", message: '<a href="#2section">프로필 바로가기</a>' }
    ],
};






function createNavigation() {
    const menuList = document.getElementById("menu");

    if (!menuList) return;

    const menuItemsHTML = navMenuItems.map(function (item, index) {
        const activeClass = (index === 0) ? 'class="active" ' : ' ';
        return `
            <li data-section = "${item.id}" ${activeClass}>
                <a href = "#${item.id}">
                    <h3>${item.text}</h3>
                </a>
            </li>
        `;
    }).join('');

    menuList.innerHTML = menuItemsHTML;
}




function createChatListHeader() {
    const header = document.querySelector('.chat-list-panel .kakakotalk-header');
    if (!header) return;

    const iconsHTML = headerShortcuts.map(function (shortcut) {
        return `      
        <a href="${shortcut.href}" >
            <img src="${shortcut.src}" alt="${shortcut.alt}" class="header-shortcut-icon">  
        </a>
        `
    }).join('');

    header.innerHTML = `
        <div class="main-title"> 
           <span class="header-title">채팅</span>
           <ul>
           <li><a href="#">전체</a></li>
           <li><a href="#">안읽음</a></li>
           <li><a href="#"><i class="fa-solid fa-bars"></i></a></li>
           </ul>
        </div>
        <div class="header-shortcuts">${iconsHTML}</div>
    `;

}


function createChatList() {
    const chatListContainer = document.querySelector('.chat-list');

    if (!chatListContainer) return;

    chatListContainer.innerHTML = chatListData.map(function (item) {
        let avatarTagHTML;
        if (item.mediaType === "video") {
            avatarTagHTML = `
                 <video autoplay loop muted class="avatar">
                    <source src="${item.avatar}" type="video/webm">
                </video>
            `
        } else {
            avatarTagHTML = `<img src="${item.avatar}" alt="${item.title}" class="avatar">`;
        }
        const clickableClass = item.isClickable ? "" : "non-clickable";

        return `
        <li class="chat-item ${clickableClass}" data-chatroom-id="${item.id}">

            <div class="chat-left">
                 ${avatarTagHTML}
                <div class="chat-info">
                    <span class="chat-title">${item.title}</span>
                    <span class="chat-preview">${item.lastMessage}</span>
                </div>
            </div>

            <div class="chat-meta"> 
                <span class="chat-time">${item.time}</span>
                 ${item.unread > 0 ? `<span class="unread-count">${item.unread}</span>` : ''}       
            </div>

         </li>
        `
    }).join('');

    addChatClickEvent();
}




// 채팅 목록 아아템이 클릭 이벤트를 추가하는 함수

function addChatClickEvent() {
    const firstChatItem = document.querySelector('.chat-item');
    const allChatItem = document.querySelectorAll('.chat-item');
    const appContainer = document.querySelector('.kakaotalk-app-container');

    firstChatItem.addEventListener('click', function () {

        chatListData[0].unread = 0;

        const unreadBadge = firstChatItem.querySelector('.unread-count');

        if (unreadBadge) {
            unreadBadge.remove();
        }

        const chatroomId = firstChatItem.dataset.chatroomId;

        createKakaotalkUI(chatroomId);

        appContainer.classList.add('conversation-active');

        allChatItem.forEach(function (i) {
            i.classList.remove('active');
        });

        firstChatItem.classList.add('active');

    })

}



// 대화창 ui 를 생성하는 함수

function createKakaotalkUI(chatroomId) {
    const messageContainer = document.querySelector('.kakaotalk-messages');
    const conversationHeader = document.querySelector('.conversation-panel .kakakotalk-header');

    if (!messageContainer || !conversationHeader) return;

    const messages = kakaotalkData[chatroomId];

    const chatroomInfo = chatListData.find(function (item) {

        return item.id === chatroomId;

    });

    if (!chatroomInfo || !messages) return;

    conversationHeader.innerHTML = `
        <img src="${chatroomInfo.avatar}" alt="${chatroomInfo.title}" class="header-avatar">
        <span id="conversation-title">${chatroomInfo.title}</span> `;

    messageContainer.innerHTML = messages.map(function (chat) {

        const messageType = (chat.speaker === '김남규') ? 'sent' : 'received';

        if (messageType === "received") {
            return `
                <div class="kakaotalk-message-row received">
                    <img src="${chat.avatar}" alt="${chat.speaker}" class="avatar">
                    <div class="message-content">
                        <div class="sender-name">${chat.speaker}</div>
                        <div class="kakaotalk-bubble">${chat.message}</div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="kakaotalk-message-row sent">
                    <div class="message-content">
                        <div class="kakaotalk-bubble">${chat.message}</div>
                    </div>
                </div>
            `;
        }

    }).join('');
}




document.addEventListener("DOMContentLoaded", function () {

    createNavigation();

    createChatList();

    createChatListHeader();

})