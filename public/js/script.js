let models = document.querySelector(".models")
let pizzaItemImg = document.querySelector(".pizza-item--img img");
let pizzaItemPrice = document.querySelector(".pizza-item--price");
let pizzaItemName = document.querySelector(".pizza-item--name");
let pizzaItemDesc = document.querySelector(".pizza-item--desc");
let cartItemImg = document.querySelector(".cart--item img");
let cartItemNome = document.querySelector(".cart--item-nome");
let carItemQtde = document.querySelector(".cart--item--qt");
let cartItemMenos = document.querySelector(".cart--item-qtmenos");
let cartItemMais = document.querySelector(".cart--item-qtmais");

window.addEventListener("load", () => {
    pizzaJson.map(() => {
        
    })
});

cartItemMenos.addEventListener("click", () => {
    if(Number(carItemQtde.innerHTML) > 0) {
        carItemQtde.innerHTML = Number(carItemQtde.innerHTML) - 1;
    } else {
        carItemQtde.innerHTML = 0;
    }
});

cartItemMais.addEventListener("click", () => {
    carItemQtde.innerHTML = Number(carItemQtde.innerHTML) + 1;
});