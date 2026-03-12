import loadAbout from "./about.js";
import loadMenu from "./menu.js";

export default function loadHome() {
  const template = document.querySelector("#home-template");
  const section = template.content.cloneNode(true);

  const buttons = section.querySelectorAll(".container__link");
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      handlePage(btn);
    });
  });

  return section;
}

function handlePage(btn) {
  const page = btn.dataset.page;

  if (page === "menu") {
    document.querySelectorAll(`[data-page="menu"`)[0].click();
  } else if (page === "about") {
    document.querySelectorAll(`[data-page="about"`)[0].click();
  }
}
