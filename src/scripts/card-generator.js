import DataFetcher from "./fetch-data.js";
import cardData from "./data.json";
const fetcher = new DataFetcher(cardData);

class CardGenerator {
  constructor(container) {
    this.data;
    this.container = container;
    this.template = document.querySelector("#card-template");
  }

  async init() {
    await this.getData();
    this.generateCards();
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

  filter(criteria) {
    const filtered =
      criteria === "all"
        ? this.data.menu
        : this.data.menu.filter((item) => item.category === criteria);

    this.generateCards(filtered);
  }

  generateCards(data = this.data.menu) {
    this.container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
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
      /*  cardImage || */ "../assets/images/menu/default.jpg";
    clone.querySelector(".card__image").alt = cardName;
    clone.querySelector(".card__category").textContent = cardCategory;

    return clone;
  }
}

export default CardGenerator;
