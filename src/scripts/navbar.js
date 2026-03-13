import loadHome from "./home.js";
import loadAbout from "./about.js";
import loadMenu from "./menu.js";

export default class NavBar {
  constructor() {
    this.mobile = document.querySelector("#mobileNav");
    this.hamburger = document.querySelector(".nav__hamburger");
    this.closeBtn = document.querySelector(".nav__close-button");
    this.links = document.querySelectorAll(".nav__link");
    this.items = document.querySelectorAll(".nav__item");

    if (this.mobile && this.hamburger && this.closeBtn && this.items.length) {
      this.init();
    }
  }

  init() {
    const homeBtn = document.createElement("button");
    homeBtn.dataset.page = "home";

    this.onClick();
    this.handlePage(homeBtn);
  }

  onClick() {
    this.mobile.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.close();
    });
    this.hamburger.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
    this.links.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.handlePage(btn);
      });
    });
    this.items.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.style(btn);
      });
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
    this.close();
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
  style(item) {
    this.items.forEach((i) => i.classList.remove("underline-hover--selected"));
    item.classList.add("underline-hover--selected");
  }
}
