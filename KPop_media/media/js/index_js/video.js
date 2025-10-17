document.addEventListener("DOMContentLoaded", function () {
  let screenSize, screenHeight;
  let current = false;
  const content = document.getElementById("content");
  const videoBG = document.getElementById("videoBG");
  const imgBG = document.getElementById("imgBG");
  const downButton = document.querySelector(".down");

  function screen_size() {
    screenSize = window.innerWidth;
    screenHeight = window.innerHeight;

    if (screenSize > 768 && current === false) {
      videoBG.style.display = "block";
      videoBG.src = "./images/main/go.webm";
      imgBG.style.display = "none";
      current = true;
    }
    if (screenSize <= 768) {
      videoBG.style.display = "none";
      videoBG.src = "";
      imgBG.style.display = "block";
      current = false;
    }
  }

  screen_size();

  //크기조절시 반응하는 이벤트 리스너
  window.addEventListener("resize", screen_size);

  // 스크롤 다운 버튼 클릭 이벤트
  downButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });
});
