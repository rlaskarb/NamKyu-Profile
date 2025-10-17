//  abut 텍스트 이미지 애니매이션 효과
document.addEventListener("DOMContentLoaded", function () {
  const targetElement = document.querySelector("#content h2");

  const text = targetElement.textContent;
  targetElement.textContent = ""; // 원래 텍스트를 비운다.

  function typeWriter(index) {
    if (index < text.length) {
      targetElement.textContent += text.charAt(index);
      index++;
      setTimeout(function () {
        typeWriter(index);
      }, 300);
    } else {
      setTimeout(function () {
        targetElement.textContent = "";
        typeWriter(0);
      }, 2000);
    }
  }

  typeWriter(0);
});
