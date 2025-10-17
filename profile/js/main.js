

const navMenuItems = [
    { id: '1section', text: 'Home' },
    { id: '2section', text: 'Profile' },
    { id: '3section', text: 'Web Project(PC)' },
    { id: '4section', text: 'Web Project(Mobile)' },
    { id: '5section', text: 'Responsive Project' },
    { id: '6section', text: 'Review' },
];


const headerShortcuts = [
    { href: "#2section", src: "./images/1.avif", alt: "프로필 바로가기" },
    { href: "#3section", src: "./images/2.avif", alt: "pc 프로젝트 바로가기" },
    { href: "#5section", src: "./images/5.avif", alt: "반응형 프로젝트 바로가기" },
];



const chatListData = [
    {
        id: "portfolio-intro",
        title: " 김남규의 포트폴리오",
        lastMessage: "클릭 해 주실꺼죠?",
        time: "방금",
        unread: 2,
        avatar: "./images/kyu.jpg",
        mediaType: 'image',
        isClickable: true
    },
    {
        id: "friend",
        title: "친구",
        lastMessage: "👍",
        time: "오후 2:40",
        unread: 0,
        avatar: "./images/6.avif",
        mediaType: 'image',
        isClickable: false
    },
    {
        id: "7-eleven",
        title: "7-ELEVEn",
        lastMessage: "프론트엔드 개발자가 서버 없이 백엔드를 구현했다니, Supabase 활용법이 궁금하네요.",
        time: "오전 12:30",
        unread: 0,
        avatar: "./images/2.avif",
        mediaType: 'image',
        isClickable: false
    },
    {
        id: "kakao-pay",
        title: "ZOEY",
        lastMessage: "LIGHTHOUSE 90... 혹시 이미지/영상 144개 넣으신 거 맞나요? 점수가 믿기지 않아서요.",
        time: "오전 08:21",
        unread: 0,
        avatar: "./images/zoey.avif",
        mediaType: 'image',
        isClickable: false
    },

    {
        id: "brauhaus",
        title: "Brauhaus",
        lastMessage: "React로 ERP요? 배포 안 된 게 아쉬울 정도네요. 그 복잡한 상태 관리, 어떻게 하셨어요?",
        time: "오전 08:00",
        unread: 0,
        avatar: "./images/bra.png",
        mediaType: 'image',
        isClickable: false
    },

];



const kakaotalkData = {
    "portfolio-intro": [ //chatListData 의 id 연결
        {
            speaker: '김남규',
            avatar: "./images/1.avif",
            mediaType: 'image',
            message: '찾아와주셔서 정말 감사해요!'
        },

        {
            speaker: '김남규1',
            message: '차근차근 스크롤을 내리시면 저를 만나실 수 있습니다.'
        },

        {
            speaker: '김남규1',
            message: '<a href="#2section">프로필 바로가기</a>'
        }
    ],
};






function createNavigation() {
    const menuList = document.getElementById("menu");

    if (!menuList) return;

    const menuItemsHTML = navMenuItems.map(function (item) {

        return `
           <li data-menuanchor="${item.id}"> 
                <a href="#${item.id}">
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

    const totalUnread = chatListData.reduce(function (sum, item) {
        return sum + item.unread
    }, 0);

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
           <li><a href="#" id="filter-all">전체</a></li>
           <li><a href="#" id="filter-unread" >안읽음  ${totalUnread > 0 ? `<span class="unread-count">${totalUnread}</span>` : ''}</a></li>
           <li><a href="#"><i class="fa-solid fa-bars"></i></a></li>
           </ul>
        </div>
        <div class="header-shortcuts">${iconsHTML}</div>
    `;

}


function createChatList(dataToRender) {
    const chatListContainer = document.querySelector('.chat-list');

    if (!chatListContainer) return;

    chatListContainer.innerHTML = dataToRender.map(function (item) {
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

        updateHeaderCount();

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

    let headerAvatarHTML;

    if (chatroomInfo.mediaType === 'video') {
        headerAvatarHTML = `
            <video autoplay loop muted class="header-avatar">
                <source src="${chatroomInfo.avatar}" type="video/webm">
            </video>`;
    } else {
        headerAvatarHTML = `
        <img src="${chatroomInfo.avatar}" alt="${chatroomInfo.title}" class="header-avatar">`;
    }

    conversationHeader.innerHTML = `
        ${headerAvatarHTML} 
        <span id="conversation-title">${chatroomInfo.title}</span>
    `

    messageContainer.innerHTML = messages.map(function (chat) {
        const messageType = (chat.speaker === '김남규1') ? 'sent' : 'received';

        if (messageType === "received") {

            let messageAavatarHTML;
            if (chat.mediaType === 'video') {
                messageAavatarHTML = `
                    <video autoplay loop muted class="avatar">
                        <source src="${chat.avatar}" type="video/webm">
                    </video>`;
            } else {
                messageAavatarHTML = `<img src="${chat.avatar}" alt="${chat.title}" class="header-avatar">`;
            }

            return `
                <div class="kakaotalk-message-row received">
                    ${messageAavatarHTML}
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


function addFilterEvents() {
    const filterAllBtn = document.getElementById('filter-all');
    const filterUnreadBtn = document.getElementById('filter-unread');

    if (!filterAllBtn || !filterUnreadBtn) return;

    filterAllBtn.addEventListener('click', function (event) {
        event.preventDefault();
        createChatList(chatListData);
    });

    filterUnreadBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const unreadList = chatListData.filter(function (item) {
            return item.unread > 0;
        });
        createChatList(unreadList); // 안앍은 목록만 전달
    });
}


function updateHeaderCount() {
    const filterUnreadBtn = document.getElementById('filter-unread');
    if (!filterUnreadBtn) return;

    const totalUnread = chatListData.reduce(function (sum, item) {
        return sum + item.unread;
    }, 0);

    const unreadCountSpan = totalUnread > 0 ? `<span class="unread-count">${totalUnread}</span>` : '';
    filterUnreadBtn.innerHTML = `안읽음${unreadCountSpan}`;
}




// 문서가 모두 준비되면(로드되면) 코드를 실행합니다.
$(document).ready(function() {

    createNavigation();

    createChatListHeader(); // 1. 헤더를 먼저 만드어서 버튼들을 생성

    createChatList(chatListData); // 2. 처음에는 전체 목록을 보여줌

    addFilterEvents(); // 3. 생성된 버튼들에 클릭기능을 추가


    // new fullpage(...) 대신 $('#fullpage').fullpage(...)로 변경
    $('#fullpage').fullpage({
        licenseKey: null, // v2에서는 이 옵션이 없지만, 그대로 두어도 문제는 없습니다.
        navigation: true,
        fixedElements: '#headerArea',
        paddingTop: '75px',

        // 메뉴 클릭과 스크롤을 연동하기 위해 반드시 필요!
        // #menu 안의 링크와 아래 anchors를 연결합니다.
        menu: '#menu',
        anchors: ['1section', '2section', '3section', '4section', '5section', '6section'],
    });

});