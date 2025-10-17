document.addEventListener("DOMContentLoaded", function () {
	const header = document.getElementById("headerArea");
	const gnb = document.getElementById("gnb");
	const topMove = document.querySelector(".top_move");
	const menuTriggers = document.querySelectorAll(".menu_ham");

	document.addEventListener("click", function (e) {
		const header = document.getElementById("headerArea");
		const hamButton = document.querySelector(".menu_ham");
		// 메뉴가 열려있는 상태인지 먼저 확인
		if (header.classList.contains("mn_open")) {
			if (!gnb.contains(e.target) && !hamButton.contains(e.target)) {
				header.classList.remove("mn_open");
				document.body.style.overflow = "auto";
			}
		}
	});

	menuTriggers.forEach((trigger) => {
		trigger.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			header.classList.toggle("mn_open");

			if (header.classList.contains("mn_open")) {
				document.body.style.overflow = "hidden";
				if (topMove) {
					topMove.classList.remove("show");
				}
			} else {
				document.body.style.overflow = "auto";
				const listItems = document.querySelectorAll("#gnb .main_menu li");
				listItems.forEach((li) => li.classList.remove("active"));
			}
		});
	});

	const menuLinks = document.querySelectorAll(".main_menu h3 a");

	menuLinks.forEach(function (link) {
		link.addEventListener("click", function (e) {
			const clickedLi = e.target.closest("li");

			if (clickedLi.classList.contains("active")) {
				clickedLi.classList.remove("active");
			} else {
				const allLis = document.querySelectorAll("#gnb .main_menu li");
				allLis.forEach((li) => li.classList.remove("active"));
				clickedLi.classList.add("active");
			}
		});
	});
});

let isDesktop = window.innerWidth > 1150;

window.addEventListener("resize", function () {
	if (!isDesktop && window.innerWidth > 1150) {
		console.log("데스크탑으로 전환!");

		document.getElementById("headerArea").classList.remove("mn_open");
		document.body.style.overflow = "auto";
		isDesktop = true;
	} else if (isDesktop && window.innerWidth <= 1150) {
		console.log("모바일로 전환!");
		isDesktop = false;
	}
});
