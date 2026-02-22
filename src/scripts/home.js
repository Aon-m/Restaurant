import loadAbout from "./about.js";
import loadMenu from "./menu.js";

export default function loadHome() {
  const template = document.querySelector("#home-template");
  const section = template.content.cloneNode(true);

  const buttons = section.querySelectorAll(".container__link");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => handlePage(btn));
  });

  return section;
}

function handlePage(btn) {
  const content = document.querySelector("#content");
  const page = btn.dataset.page;

  const routes = {
    about: loadAbout,
    menu: loadMenu,
  };

  content.innerHTML = "";
  content.appendChild(routes[page]?.());
}
