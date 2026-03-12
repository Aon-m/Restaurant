import move from "./forward-and-back-button.js";

export default function loadAbout() {
  const template = document.querySelector("#about-template");
  const section = template.content.cloneNode(true);

  const backBtn = section.querySelector("#back-btn");
  const forwardBtn = section.querySelector("#forward-btn");

  backBtn.addEventListener("click", () => {
    move.looping.prev();
  });
  forwardBtn.addEventListener("click", () => {
    move.looping.next();
  });
  return section;
}
