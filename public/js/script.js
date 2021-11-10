// INÍCIO FUNC. AUXILIAR QUERYSELECTOR

function elem(item) {
    return document.querySelector(item);
};

// FIM FUNC. AUXILIAR QUERYSELECTOR


// INÍCIO DECLARAÇÃO VARIÁVEIS

let PIZZA_ITEM_QTDE = elem(".pizzaInfo--qt"); // Variável Global para guardar a quantidade de pizzas de um mesmo sabor selecionadas
let PIZZA_ITEM_MENOS = elem(".pizzaInfo--qtmenos");
let PIZZA_ITEM_MAIS = elem(".pizzaInfo--qtmais");
let PIZZA_ID = 0; // Variável Global de identificação da pizza
let PIZZA_VALOR = 0; // Variável Global de valor da pizza
let PIZZA_TAMANHO = 2; // Variável Global do tamanho da pizza 0. Pequena; 1. Média; 2. Grande
let CARRINHO_ITENS = []; // Variável Global de itens presentes no carrinho de pedidos

// FIM DECLARAÇÃO VARIÁVEIS

// ------- PIZZA AREA -------

// INÍCIO PREENCHIMENTO PIZZAS

pizzaJson.map((item) => {
    // Preenchimento das Pizzas
    let pizzaArea = elem(".pizza-area"); // Área para adição dos elementos
    let pizzaItens = elem(".models .pizza-item").cloneNode(true); // Clonando o modelo completo

    pizzaItens.querySelector(".pizza-item a").setAttribute("data-id", item.id); // Seta um identificador de pizza no botão de add
    pizzaItens.querySelector(".pizza-item a").href = "#";
    pizzaItens.querySelector(".pizza-item--img img").src = item.img;
    pizzaItens.querySelector(".pizza-item--price").innerHTML = item.sizesPrice[2].toLocaleString("pt-BR", {
        style: "currency", 
        currency: "BRL",
        maximumFractionDigits: 2
    });
    pizzaItens.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItens.querySelector(".pizza-item--desc").innerHTML = item.description;

    pizzaArea.appendChild(pizzaItens); // Adiciona o conjunto de itens dentro da área do elemento pizzaArea
});

// FIM PREENCHIMENTO PIZZAS



// ------- MODAL -------

// INÍCIO PREENCHIMENTO MODAL

function modal(id) {
    let modal = elem(".pizzaWindowArea");
    let modalItem = [];
    let pizzaTamanho = document.querySelector(".selected"); // Encontra o tamanho selecioando

    pizzaTamanho = pizzaTamanho.getAttribute("data-key"); // Pega o identificador do tamanho selecionado
    pizzaTamanho = Number(pizzaTamanho);
    
    id = Number(id.getAttribute("data-id")); // Pega o id da pizza aberta no modal

    PIZZA_ID = id;

    // Busca a pizza na base de dados pelo id
    modalItem = pizzaJson.filter((item) => {
        return item.id == id;
    });

    // Monta os elementos na tela
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

    // Transfere o valor da pizza para a variável global
    PIZZA_VALOR = modal.querySelector(".pizzaInfo--pricearea .pizzaInfo--actualPrice").innerHTML = modalItem[0].sizesPrice[pizzaTamanho];

    modal.querySelector(".pizzaInfo--pricearea .pizzaInfo--actualPrice").innerHTML = modalItem[0].sizesPrice[pizzaTamanho].toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2
    });
    
    // Mostra o modal após o preenchimento
    modal.style.display = "flex";
    modal.style.zIndex = 1000;
};

// FIM PREENCHIMENTO MODAL

// INÍCIO FECHA MODAL

function fechaModal() { 
    let modal = elem(".pizzaWindowArea");

    PIZZA_ITEM_QTDE.innerHTML = 1;
    modal.style.display = "none";
    modal.style.zIndex = "-1";
}

// FIM FECHA MODAL


// INÍCIO + E - QUANTIDADE DE PRODUTO

PIZZA_ITEM_MENOS.addEventListener("click", () => {
    let pizzaValor = elem(".pizzaWindowArea .pizzaInfo--pricearea .pizzaInfo--actualPrice");
    let pizzaTamanhoSelected = elem(".pizzaInfo--sizes .selected");
    let json = pizzaJson; // Base de dados

    // Pega o identificador do tamanho da pizza selecionado
    pizzaTamanhoSelected = pizzaTamanhoSelected.getAttribute("data-key");
    pizzaTamanhoSelected = Number(pizzaTamanhoSelected);
    pizzaTamSelValor = json[PIZZA_ID - 1].sizesPrice[pizzaTamanhoSelected];

    // diminui a quantidade selecionada de pizzas do tamanho selecionado anteriormente caso a quantidade seja > 0
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

PIZZA_ITEM_MAIS.addEventListener("click", () => {
    let pizzaValor = elem(".pizzaWindowArea .pizzaInfo--pricearea .pizzaInfo--actualPrice");
    let pizzaTamanhoSelected = elem(".pizzaInfo--sizes .selected");
    let json = pizzaJson; // Base de dados

    // Pega o identificador do tamanho da pizza selecionado
    pizzaTamanhoSelected = pizzaTamanhoSelected.getAttribute("data-key");
    pizzaTamanhoSelected = Number(pizzaTamanhoSelected);
    pizzaTamSelValor = json[PIZZA_ID - 1].sizesPrice[pizzaTamanhoSelected];

    // Aumenta a quantidade de pizza selecionada
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

// INÍCIO MUDA SELEÇÃO TAMANHO DA PIZZA

function mudaTamanho(obj){
    let pizzaValor = elem(".pizzaWindowArea .pizzaInfo--pricearea .pizzaInfo--actualPrice");
    let id = obj.getAttribute("data-key"); // Pega o identificador de tamanho da pizza
    let json = pizzaJson; // Base de dados

    id = Number(id);

    // Procura a pizza na base de dados pelo identificador
    json = json.filter((valor) => {
        return valor.id === PIZZA_ID;
    });

    PIZZA_VALOR = json[0].sizesPrice[id];

    // Remove o select de todas os tamanhos
    document.querySelectorAll(".pizzaInfo--size").forEach((item) => {
        item.classList.remove("selected");
    });

    // Adiciona o select no tamanho clicado
    obj.classList.toggle("selected");

    PIZZA_TAMANHO = id;
    
    pizzaValor.innerHTML = PIZZA_VALOR.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2
    });
};

// FIM MUDA SELEÇÃO TAMANHO DA PIZZA


// ------- CARRINHO DE COMPRAS

// INÍCIO ABRE CARRINHO DE COMPRAS

function abreCarrinho() {
    let carrinhoArea = elem("aside");
    let identificador = PIZZA_ID+"#"+PIZZA_TAMANHO; //id#tamanho
    let existeItemIndex = CARRINHO_ITENS.findIndex((pizza) => pizza.identificador == identificador); // Busca pelo identificador no carrinho de compras

    // Atualiza carrinho
    if(existeItemIndex > -1){
        CARRINHO_ITENS[existeItemIndex].qtde += Number(PIZZA_ITEM_QTDE.innerHTML);
        
        atualizarCarrinho(existeItemIndex);
    } else {
        CARRINHO_ITENS.push({
            identificador, // Mesma coisa de identificador: identificador
            id: PIZZA_ID,
            tamanho: PIZZA_TAMANHO,
            qtde: Number(PIZZA_ITEM_QTDE.innerHTML)
        });

        adicionaCarrinho();
    };
    // Fecha a tela logo após a inserção de produtos no banco
    fechaModal();

    // Verifica se o carrinho de compras não está presente na tela.
    if(CARRINHO_ITENS.length > 0){
        carrinhoArea.classList.add("show");

    } else {
        carrinhoArea.classList.remove("show");
    };  
    
};

// FIM ABRE CARRINHO DE COMPRAS

// INÍCIO ATUALIZA CARRINHO DE COMPRAS

function atualizarCarrinho(itemIndex) {
    let itens = elem(".cart");
    let json = pizzaJson; // Base de dados

    itens.innerHTML = ""; // Limpa o carrinho antes de atualizar

    for(let item of CARRINHO_ITENS){
        let pizzaItem = json.find((pizzaJson) => item.id === pizzaJson.id);
        let models = elem(".models .cart--item").cloneNode(true);

        models.querySelector("img").src = pizzaItem.img;
        models.querySelector(".cart--item-nome").innerHTML = pizzaItem.name;
        models.querySelector(".cart--item--qtarea .cart--item--qt").innerHTML = CARRINHO_ITENS[itemIndex].qtde;

        itens.appendChild(models);
    }
};

function adicionaCarrinho() {
    let itens = elem(".cart");
    let json = pizzaJson; // Base de dados
    let pizzaItem = json.find((pizzaJson) => PIZZA_ID === pizzaJson.id);
    let models = elem(".models .cart--item").cloneNode(true);

    models.querySelector("img").src = pizzaItem.img;
    models.querySelector(".cart--item-nome").innerHTML = pizzaItem.name;
    models.querySelector(".cart--item--qtarea .cart--item--qt").innerHTML = CARRINHO_ITENS[CARRINHO_ITENS.length - 1].qtde;

    itens.appendChild(models);
};

// FIM ATUALIZA CARRINHO DE COMPRAS

// INÍCIO + E - QUANTIDADE DE PRODUTO

// ADICIONA A QUANTIDADE DE PIZZAS
 function cartMais(){
    let cartItemQtde = document.querySelector(".cart .cart--item--qt");
    cartItemQtde.innerHTML = Number(cartItemQtde.innerHTML) + 1;
};

// SUBTRAI A QUANTIDADE DE PIZZAS
function cartMenos() {
    let subTotal = elem(".subtotal span:last-child");
    let desconto = elem(".desconto span:last-child");
    let total = elem(".total span:last-child");
    let cartItemQtde = elem(".cart .cart--item--qt");
    let pizzaItem = elem(".cart .cart--item");
    let itens = elem(".cart");

    if(Number(cartItemQtde.innerHTML < 2 )){
        cartItemQtde.innerHTML = 0;
        itens.removeChild(pizzaItem);
        // Procura a pizza para remover o preço do total
        for(let valor of CARRINHO_ITENS){
            if(valor.name === pizzaItem.querySelector(".cart--item-nome").innerHTML){
                subTotal.innerHTML = Number(subTotal.innerHTML) - valor.priceUn;
                desconto.innerHTML = Number(subTotal.innerHTML) * 0.1;
                total.innerHTML = Number(subTotal.innerHTML) - Number(desconto.innerHTML);
            }
        };  

    } else {
        cartItemQtde.innerHTML = Number(cartItemQtde.innerHTML) - 1;
        // Procura a pizza para remover o preço do total
        for(let valor of CARRINHO_ITENS){
            if(valor.name === pizzaItem.querySelector(".cart--item-nome").innerHTML){
                subTotal.innerHTML = Number(subTotal.innerHTML) - valor.priceUn;
                desconto.innerHTML = Number(subTotal.innerHTML) * 0.1;
                total.innerHTML = Number(subTotal.innerHTML) - Number(desconto.innerHTML);
            }
        };
    }
};

// FIM + E - QUANTIDADE DE PRODUTO