
const navMenuItems = [
    { id: '1section', text: 'Home' },
    { id: '2section', text: 'Profile' },
    { id: '3section', text: 'Web Project(PC)' },
    { id: '4section', text: 'Web Project(Mobile)' },
    { id: '5section', text: 'Responsive Project' },
    { id: '6section', text: 'Review' },
];

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

        `;
    }).join('');

    menuList.innerHTML = menuItemsHTML;
}

document.addEventListener("DOMContentLoaded", function () {
    createNavigation();
})