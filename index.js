const btn = document.getElementById("menu");
const container = document.querySelector(".navbar-container");
btn.addEventListener("click", function () {
  container.classList.toggle("high");
});
