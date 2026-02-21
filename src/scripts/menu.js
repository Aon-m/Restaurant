import CardGenerator from "./card-generator.js";

export default function loadMenu() {
  const section = document.createElement("section");
  section.classList.add("container");

  const container = document.createElement("div");

  const cardGenerator = new CardGenerator(container);

  cardGenerator.init();

  section.appendChild(container)

  return section;
}
