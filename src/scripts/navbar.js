import alertHome from "./home.js";
import alertAbout from "./about.js";
import alertMenu from "./menu.js";

export default class NavBar {
  constructor() {
    this.mobile = document.querySelector("#mobileNav");
    this.hamburger = document.querySelector(".nav__hamburger");
    this.closeBtn = document.querySelector(".nav__close-button");
    this.links = document.querySelectorAll(".nav__link");

    if (this.mobile && this.hamburger && this.closeBtn && this.links.length) {
      this.onClick();
    }
  }

  onClick() {
    this.mobile.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
    this.hamburger.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
    this.links.forEach((btn) => {
      btn.addEventListener("click", () => this.handlePage(btn));
    });
  }

  handlePage(btn) {
    const content = document.querySelector("#content");
    const page = btn.dataset.page;

    const routes = {
      home: loadHome,
      about: loadAbout,
      menu: loadMenu,
    };

    content.innerHTML = "";
    content.appendChild(routes[page]?.());
  }

  open() {
    this.mobile.showModal();

    const firstLink = this.mobile.querySelector("a");
    if (firstLink) firstLink.focus();
  }
  close() {
    this.mobile.close();
    this.hamburger.focus();
  }
}
