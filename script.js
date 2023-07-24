let APIurl = "https://dummyjson.com/products/";

let arr;
let cardArr = [];
// const basketaIcon = document.querySelector('.basketa-Icon');
if (localStorage.getItem("bouth-products")) {
  cardArr = JSON.parse(localStorage.getItem("bouth-products"));
  // basketaIcon.classList.add('full-basket')
  // basketaIcon.textContent = cardArr.length;
} else {
  cardArr = [];
}

let category = "all";
let price = 2000;

const container = document.querySelector(".container");
const titles = document.querySelector(".titles");
const mainDiv = document.querySelector(".main-div");

// create product cards
function createProduct(element, condition) {
  if (condition) {
    const product = document.createElement("div");
    product.setAttribute("data-category", element.category);
    const productImg = document.createElement("img");
    const addToCartLink = document.createElement("a");
    addToCartLink.href =
      "./card.html?title=" +
      element.title +
      "&price=" +
      element.price +
      "&image=" +
      element.images;
    const addToCart = document.createElement("img");
    addToCart.style.cursor = "pointer";
    addToCart.setAttribute("data-basket-title", element.title);
    addToCart.setAttribute("data-basket-price", element.price);
    addToCart.setAttribute("data-basket-img", element.images);
    const productName = document.createElement("p");
    const price = document.createElement("p");

    addToCart.addEventListener("click", () => {
      // event.preventDefault();
      const title = addToCart.getAttribute("data-basket-title");
      const price = addToCart.getAttribute("data-basket-price");
      const imgs = addToCart.getAttribute("data-basket-img");

      if (title !== null && price !== null && imgs !== null) {
        const prodInfo = [title, price, imgs];
        cardArr.push(prodInfo);
        // щоб записати масив у локал.пам -> JSON.stringify
        localStorage.setItem("bouth-products", JSON.stringify(cardArr));
        // baske.textContent = cardArr.length;
      }
      // window.location.href = "file:///D:/sharpMinds/svatCardsOnlineShop/onlineShop/card.html";
    });

    product.classList.add("product");
    productImg.classList.add("image");
    addToCart.classList.add("add-to-card-btn");
    productName.classList.add("product-name");
    price.classList.add("price");

    productImg.src = element.images[0];
    addToCart.src = "./busket.png";
    productName.textContent = element.title;
    price.textContent = element.price;

    product.appendChild(productImg);
    product.appendChild(addToCartLink);
    addToCartLink.appendChild(addToCart);
    product.appendChild(productName);
    product.appendChild(price);

    mainDiv.appendChild(product);
  }
} // end createProduct
//my edit
//     ////////////////baske.textContent = parseCard.length ;
const baske = document.querySelector("#baske span");
let parseCard = [];
if (localStorage.getItem("bouth-products")) {
  let storageCard = localStorage.getItem("bouth-products");
  parseCard = JSON.parse(storageCard);
  localStorage.setItem("bouth-products", JSON.stringify(parseCard));
  baske.textContent = parseCard.length;
} else {
  localStorage.setItem("bouth-products", JSON.stringify(parseCard));
}

// display all products and category buttons after page load
arrCategory = [];
fetch(APIurl)
  .then((res) => res.json())
  .then((json) => {
    arr = json.products;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      createProduct(element, element.title == element.title);

      if (!arrCategory.includes(element.category)) {
        arrCategory.push(element.category);
      }
    }
    for (let i = 0; i < arrCategory.length; i++) {
      const categoryElement = arrCategory[i];
      const button = document.createElement("button");
      button.id = "button-" + i;
      button.innerText = categoryElement;
      container.appendChild(button);
      // button.classList.add("category-btn");
      button.classList.add("like-btn");

      button.addEventListener("click", (event) => {
        category = document.getElementById(event.target.id).textContent;

        const products = document.querySelectorAll(".product");

        for (let index = 0; index < products.length; index++) {
          const element = products[index];
          const children = element.children;
          const prodPrice = parseInt(children[3].textContent);

          if (category == "all") {
            if (prodPrice > parseInt(price)) {
              element.style.display = "none";
            } else {
              element.style.display = "block";
            }
          } else {
            if (
              element.getAttribute("data-category") !== category ||
              prodPrice > parseInt(price)
            ) {
              element.style.display = "none";
            } else {
              element.style.display = "block";
            }
          }
        }
      });
    }
  });

// filter products by price
const rangeInput = document.getElementById("myRange");
rangeInput.addEventListener("change", function () {
  const rangeValue = rangeInput.value;
  price = rangeValue;
  const products = document.querySelectorAll(".product");

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const children = element.children;
    const prodPrice = parseInt(children[3].textContent);

    if (category == "all") {
      if (prodPrice > parseInt(price)) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    } else {
      if (
        element.getAttribute("data-category") !== category ||
        prodPrice > parseInt(price)
      ) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    }
  }
});

// display all cathegories button
const allCategories = document.createElement("button");
allCategories.innerText = "all categories";
container.appendChild(allCategories);
allCategories.classList.add("like-btn");
//allCategories.classList.add("category-btn");
allCategories.addEventListener("click", () => {
  category = "all";
  const products = document.querySelectorAll(".product");

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const children = element.children;
    const prodPrice = parseInt(children[3].textContent);

    if (prodPrice > parseInt(price)) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }
});

// slaider from lesson 22 07
let sliderElements = document.querySelectorAll('.sliderElement');
// sliderElements[1].style.translate = "200px";
// sliderElements[1].style.display = "block";
index = 1;

setInterval(() => {
  if (index < sliderElements.length) {
    for (let index = 0; index < sliderElements.length; index++) {
      sliderElements[index].style.translate = "200px";
      sliderElements[index].style.display = "block";
    }
    sliderElements[index].style.translate = "0";
    index++;
  } else {
    for (let index = 0; index < sliderElements.length; index++) {
      sliderElements[index].style.translate = "200px";
    }
    sliderElements[0].style.translate = "0";
    index = 1;
  }
}, 2000);

// home manual slider
let ofset = 0 //move from left
const sliderLine = document.querySelector('.slider-line');

const btnNext = document.querySelector('.btnext');
btnNext.addEventListener('click', () => {
  ofset += 200
  if (ofset > 600 ){
ofset = 0
  }
  sliderLine.style.left =  -ofset + 'px'
})

const btnPrev = document.querySelector('.btnprev');
btnPrev.addEventListener('click', () => {
  ofset -= 200
  if (ofset < 0 ){
ofset = 600
  }
  sliderLine.style.left =  -ofset + 'px'
})