import DataFetcher from "./fetch-data.js";
import cardData from "./data.json";
const fetcher = new DataFetcher(cardData);

class CardGenerator {
  constructor(container) {
    this.data;
    this.container = container;
    this.template = document.querySelector("#card-template");
    // this.buttons = document.querySelectorAll(".filter");
    // this.period = "all";
  }

  async init() {
    await this.getData();
    this.generateCards();
    // this.onClick();
  }

  async getData() {
    const cached = sessionStorage.getItem("menuData");

    if (cached) {
      this.data = JSON.parse(cached);
    } else {
      this.data = await fetcher.fetchData();
      sessionStorage.setItem("menuData", JSON.stringify(this.data));
    }
  }

  generateCards() {
    const fragment = document.createDocumentFragment();

    this.data.menu.forEach((item) => {
      const card = this.createCard(item);

      fragment.append(card);
    });

    this.container.append(fragment);
  }

  createCard(item) {
    if (!this.template) {
      console.error("Template #card-template not found!");
      return null;
    }

    const clone = this.template.content.cloneNode(true);

    const ratings = {
      1: "⭐",
      2: "⭐⭐",
      3: "⭐⭐⭐",
      4: "⭐⭐⭐⭐",
      5: "⭐⭐⭐⭐⭐",
    };

    const cardName = item.name,
      cardPrice = item.price,
      cardRating = ratings[item.rating],
      cardImage = item.image,
      cardCategory = item.category;
    clone.querySelector(".card__name").textContent = cardName;
    clone.querySelector(".card__price").textContent = `$${cardPrice}`;
    clone.querySelector(".card__rating").textContent = cardRating;
    clone.querySelector(".card__image").src =
      cardImage || "../assets/icons/icon-logo.svg";
    clone.querySelector(".card__image").alt = cardName;
    clone.querySelector(".card__category").textContent = cardCategory;

    return clone;
  }

  /* onClick() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.select(button);

        this.period = button.dataset.period;

        this.container
          .querySelectorAll(`.card:not(.card--wide)`)
          .forEach((element) => {
            element.remove();
          });

        this.generateCards();
      });
    });
  } 

  select(button) {
    this.buttons.forEach((btn) => {
      btn.classList.remove("time-frame--selected");
      btn.setAttribute("aria-checked", "false");
    });

    button.classList.add("time-frame--selected");
    button.setAttribute("aria-checked", "true");
  }
  */
}

export default CardGenerator;
