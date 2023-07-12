// let storageTitle = localStorage.getItem("basket-title");
// let storagePrice = localStorage.getItem("basket-price");
// let storageImg = localStorage.getItem("basket-img");
// let parseImg = JSON.parse(storageImg)

let storageCard = localStorage.getItem("bouth-products");
let parseCard = JSON.parse(storageCard);
console.log(parseCard);

const product = document.createElement("div");
const productImg = document.createElement("img");
const productName = document.createElement("p");
const price = document.createElement("p");

product.classList.add("product");
productImg.classList.add("image");
productName.classList.add("product-name");
price.classList.add("price");
// вирізаю лінк на першу картинку
let arrCardImg = parseCard[2];
let firstImg = arrCardImg.split(',')
console.log(firstImg);
// let splits = firstImg.split(',', 1); // typeOf'object'-cut 1 link 
// productImg.src = splits;
//
productImg.src = firstImg[0];
productName.textContent = parseCard[0]; //
price.textContent = parseCard[1]; //

product.appendChild(productImg);
product.appendChild(productName);
product.appendChild(price);

document.querySelector("body").appendChild(product);
