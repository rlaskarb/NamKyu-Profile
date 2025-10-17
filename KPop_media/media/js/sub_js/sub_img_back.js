window.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const value = Number(urlParams.get("num"));
  const contentElement = document.querySelector("#content");
  const imgBGElement = this.document.querySelector("#imgBG");
  const downButton = this.document.querySelector(".down");

  //  화면 크기에 따라 레이아웃 설정
  function setScreenLayout() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    contentElement.style.marginTop = screenHeight + "px";
    if (screenWidth > 768) {
      imgBGElement.src = "./images/sub" + value + "/sub" + value + "_big.avif";
    } else {
      imgBGElement.src =
        "./images/sub" + value + "/sub" + value + "_small.avif";
    }
  }

  setScreenLayout();

  window.addEventListener("resize", setScreenLayout);
  downButton.addEventListener("click", function (e) {
    e.preventDefault();
    const screenHeight = window.innerHeight;

    window.scrollTo({
      top: screenHeight,
      behavior: "smooth",
    });
  });
});
