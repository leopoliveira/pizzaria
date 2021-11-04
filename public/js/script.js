// INÍCIO FUNC. AUXILIAR QUERYSELECTOR

function elem(item) {
    return document.querySelector(item);
};

// FIM FUNC. AUXILIAR QUERYSELECTOR


// INÍCIO DECLARAÇÃO VARIÁVEIS

let carItemQtde = elem(".cart--item--qt");
let cartItemMenos = elem(".cart--item-qtmenos");
let cartItemMais = elem(".cart--item-qtmais");

// FIM DECLARAÇÃO VARIÁVEIS

// ------- PIZZA AREA -------

// INÍCIO PREENCHIMENTO PIZZAS

pizzaJson.map((item) => {
    // Preenchimento das Pizzas
    let pizzaArea = elem(".pizza-area"); // Área para adição dos elementos
    let pizzaItens = elem(".models .pizza-item").cloneNode(true); // Clonando o modelo completo

    pizzaItens.querySelector(".pizza-item a").setAttribute("data-id", item.id);
    pizzaItens.querySelector(".pizza-item a").href = "#";
    pizzaItens.querySelector(".pizza-item--img img").src = item.img;
    pizzaItens.querySelector(".pizza-item--price").innerHTML = item.sizesPrice[2];
    pizzaItens.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItens.querySelector(".pizza-item--desc").innerHTML = item.description;

    pizzaArea.appendChild(pizzaItens);
});

// FIM PREENCHIMENTO PIZZAS



// ------- MODAL -------

// INÍCIO VERIFICAÇÃO DE ADIÇÃO DE PIZZA PARA ABRIR O MODAL

function modal(id) {
    let modal = elem(".pizzaWindowArea");
    let modalItem = [];
    id = Number(id.getAttribute("data-id"));

    modalItem = pizzaJson.filter((item) => {
        return item.id == id;
    });

    modal.querySelector(".pizzaBig img").src = modalItem[0].img;
    modal.querySelector(".pizzaInfo h1").innerHTML = modalItem[0].name;
    modal.querySelector(".pizzaInfo--desc").innerHTML = modalItem[0].description;

    modal.style.display = "flex";
    modal.style.zIndex = 1000;

};

// FIM VERIFICAÇÃO DE ADIÇÃO DE PIZZA PARA ABRIR O MODAL

// INÍCIO FECHA MODAL

function fechaModal() {
    let modal = elem(".pizzaWindowArea");

    modal.style.display = "none";
    modal.style.zIndex = "-1";
}

// FIM FECHA MODAL



// ------- CARRINHO DE COMPRAS

// INÍCIO + E - QUANTIDADE DE PRODUTO

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

// FIM + E - QUANTIDADE DE PRODUTO