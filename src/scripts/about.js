export default function loadAbout() {
  const template = document.querySelector("#about-template");
  const section = template.content.cloneNode(true);

  return section;
}
