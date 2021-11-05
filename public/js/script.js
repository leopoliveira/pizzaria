// INÍCIO FUNC. AUXILIAR QUERYSELECTOR

function elem(item) {
    return document.querySelector(item);
};

// FIM FUNC. AUXILIAR QUERYSELECTOR


// INÍCIO DECLARAÇÃO VARIÁVEIS

let cartItemQtde = elem(".cart--item--qt");
let cartItemMenos = elem(".cart--item-qtmenos");
let cartItemMais = elem(".cart--item-qtmais");
let PIZZA_ITEM_QTDE = elem(".pizzaInfo--qt");
let PIZZA_ITEM_MENOS = elem(".pizzaInfo--qtmenos");
let pizzaItemMais = elem(".pizzaInfo--qtmais");
let PIZZA_ID = 0;
let PIZZA_VALOR = 0;

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
    pizzaItens.querySelector(".pizza-item--price").innerHTML = item.sizesPrice[2].toLocaleString("pt-BR", {
        style: "currency", 
        currency: "BRL",
        maximumFractionDigits: 2
    });
    pizzaItens.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItens.querySelector(".pizza-item--desc").innerHTML = item.description;

    pizzaArea.appendChild(pizzaItens);
});

// FIM PREENCHIMENTO PIZZAS



// ------- MODAL -------

// INÍCIO PREENCHIMENTO MODAL

function modal(id) {
    let modal = elem(".pizzaWindowArea");
    let modalItem = [];
    
    id = Number(id.getAttribute("data-id"));

    PIZZA_ID = id;

    modalItem = pizzaJson.filter((item) => {
        return item.id == id;
    });

    modal.querySelector(".pizzaBig img").src = modalItem[0].img;
    modal.querySelector(".pizzaInfo h1").innerHTML = modalItem[0].name;
    modal.querySelector(".pizzaInfo--desc").innerHTML = modalItem[0].description;

    modal.querySelectorAll(".pizzaInfo--size").forEach((item, index) => {
        item.querySelector("span").innerHTML = modalItem[0].sizesPrice[index].toLocaleString("pt-BR", {
            style: "currency", 
            currency: "BRL", 
            maximumFractionDigits: 2
        });
    });

    PIZZA_VALOR = modal.querySelector(".pizzaInfo--pricearea .pizzaInfo--actualPrice").innerHTML = modalItem[0].sizesPrice[2];

    modal.querySelector(".pizzaInfo--pricearea .pizzaInfo--actualPrice").innerHTML = modalItem[0].sizesPrice[2].toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2
    });
    
    modal.style.display = "flex";
    modal.style.zIndex = 1000;
};



// FIM PREENCHIMENTO MODAL

// INÍCIO FECHA MODAL

function fechaModal() { 
    let modal = elem(".pizzaWindowArea");
    let pizzaValor = elem(".pizzaWindowArea .pizzaInfo--pricearea .pizzaInfo--actualPrice");

    PIZZA_ITEM_QTDE.innerHTML = 1;
    modal.style.display = "none";
    modal.style.zIndex = "-1";
}

// FIM FECHA MODAL


// INÍCIO + E - QUANTIDADE DE PRODUTO

PIZZA_ITEM_MENOS.addEventListener("click", () => {
    let pizzaValor = elem(".pizzaWindowArea .pizzaInfo--pricearea .pizzaInfo--actualPrice");
    let pizzaTamanhoSelected = elem(".pizzaInfo--sizes .selected");
    let json = pizzaJson;

    pizzaTamanhoSelected = pizzaTamanhoSelected.getAttribute("data-key");
    pizzaTamanhoSelected = Number(pizzaTamanhoSelected);
    pizzaTamSelValor = json[PIZZA_ID - 1].sizesPrice[pizzaTamanhoSelected];

    if(Number(PIZZA_ITEM_QTDE.innerHTML) > 0) {
        PIZZA_ITEM_QTDE.innerHTML = Number(PIZZA_ITEM_QTDE.innerHTML) - 1;
        pizzaValor.innerHTML = Number(PIZZA_ITEM_QTDE.innerHTML) * Number(pizzaTamSelValor);

        PIZZA_VALOR = Number(pizzaValor.innerHTML);

        pizzaValor.innerHTML = Number(pizzaValor.innerHTML).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 2
        });
    } else {
        PIZZA_ITEM_QTDE.innerHTML = 0;
    }
    qtde = Number(PIZZA_ITEM_QTDE.innerHTML);
});

pizzaItemMais.addEventListener("click", () => {
    let pizzaValor = elem(".pizzaWindowArea .pizzaInfo--pricearea .pizzaInfo--actualPrice");
    let pizzaTamanhoSelected = elem(".pizzaInfo--sizes .selected");
    let json = pizzaJson;

    pizzaTamanhoSelected = pizzaTamanhoSelected.getAttribute("data-key");
    pizzaTamanhoSelected = Number(pizzaTamanhoSelected);
    pizzaTamSelValor = json[PIZZA_ID - 1].sizesPrice[pizzaTamanhoSelected];

    PIZZA_ITEM_QTDE.innerHTML = Number(PIZZA_ITEM_QTDE.innerHTML) + 1;
    pizzaValor.innerHTML = Number(PIZZA_ITEM_QTDE.innerHTML) * Number(pizzaTamSelValor);

    PIZZA_VALOR = Number(pizzaValor.innerHTML);

    pizzaValor.innerHTML = Number(pizzaValor.innerHTML).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2
    });
});

// FIM + E - QUANTIDADE DE PRODUTO


// ------- CARRINHO DE COMPRAS

// INÍCIO + E - QUANTIDADE DE PRODUTO

cartItemMenos.addEventListener("click", () => {
    if(Number(cartItemQtde.innerHTML) > 0) {
        cartItemQtde.innerHTML = Number(cartItemQtde.innerHTML) - 1;
    } else {
        cartItemQtde.innerHTML = 0;
    }
});

cartItemMais.addEventListener("click", () => {
    cartItemQtde.innerHTML = Number(cartItemQtde.innerHTML) + 1;
});

// FIM + E - QUANTIDADE DE PRODUTO