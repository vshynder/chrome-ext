// Я предположил, что все карточки приходят с сервера в видео массива обьектов, тут я его просто получаю

import homeCards from "./js/promoCard.js";
import shopCards from "./js/shopCard.js";
const cardPromo = { homeCards, shopCards };
// Рендер карточек
function renderHomeCards(cardArr) {
  const main = document.querySelector(".ext__main-scroll--home");
  const cards = cardArr.reduce((acc, el) => {
    acc += `
        <div class="ext__main-card ext__main-home--card">
            <div class="card__promo">${el.cardPromo}</div>
                <span class="card__promo-copy">Copied to clipboard</span>
                <p class="card__desc">
                    ${el.cardDescription}
                </p>
        </div>`;
    return acc;
  }, "");
  main.insertAdjacentHTML("beforeend", cards);
}

function renderShopCards(cardArr) {
  const main = document.querySelector(".ext__main-scroll--shop");
  const cards = cardArr.reduce((acc, el) => {
    acc += `
        <div class="ext__main-card ext__main-shop--card">
            <img
                src="${el.imgSrc}"
                alt="${el.storeLink}"
                class="ext__main-shop--img"
            />
            <a href="" class="card__link--shop">Visit store</a>
        </div>`;
    return acc;
  }, "");
  main.insertAdjacentHTML("beforeend", cards);
}

function renderCards(cardPromo) {
  renderHomeCards(cardPromo.homeCards);
  renderShopCards(cardPromo.shopCards);
}
renderCards(cardPromo);

// Функции, которые отвечают за копирование промокода и выведение на экран строчки "Copied to clipboard";

const extension = document.querySelector(".ext");
extension.addEventListener("click", handleMainClick);

function handleMainClick(e) {
  if (e.target.classList.contains("card__promo")) {
    copyPromo(e.target);
    return;
  }
  if (e.target.classList.contains("nav__icon")) {
    handleIconClick(e.target);
    return;
  }
  if (e.target.nodeName === "use") {
    handleIconClick(e.target.closest("svg"));
    return;
  }
}

function copyPromo(promoCard) {
  const el = document.createElement("textarea");
  el.value = promoCard.textContent;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  handleActive(promoCard.parentNode.querySelector("span"));
}

function handleActive(node) {
  node.classList.add("span-active");
  setTimeout(() => {
    node.classList.remove("span-active");
  }, 1000);
}

// Функции переключения вкладок
const container = document.querySelector(".ext__container");

function handleIconClick(icon) {
  const icons = Array.from(icon.parentNode.querySelectorAll(".nav__icon"));
  icons.forEach((el) => {
    el.classList.remove("icon-active");
  });
  icon.classList.add("icon-active");
  const svg = icon.querySelector("use");

  switch (svg.dataset.id) {
    case "home":
      handleHomeClick();
      break;
    case "shop":
      handleShopClick();
      break;
    case "cart":
      handleCartClick();
      break;
  }
}

function handleHomeClick() {
  container.classList.remove("move-shop");
  container.classList.remove("move-cart");
  container.classList.add("move-home");
}

function handleShopClick() {
  container.classList.remove("move-home");
  container.classList.remove("move-cart");
  container.classList.add("move-shop");
}

function handleCartClick() {
  container.classList.remove("move-home");
  container.classList.remove("move-shop");
  container.classList.add("move-cart");
}
