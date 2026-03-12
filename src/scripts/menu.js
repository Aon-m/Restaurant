import CardGenerator from "./card-generator.js";

export default function loadMenu() {
  const section = document
    .querySelector("#menu-template")
    .content.cloneNode(true);

  const container = document.createElement("div");
  container.classList.add("container");
  container.classList.add("container--grid");

  const cardGenerator = new CardGenerator(container);

  cardGenerator.init();

  section.querySelector(".container__sub-container").appendChild(container);

  return section;
}
