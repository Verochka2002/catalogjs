'use strict';
let AddButtons = document.querySelectorAll('.add-box')

function addToCard() {
    AddButtons.forEach(function (button) {
        button.addEventListener('click', addedProductHandler)
    });
}
function addedProductHandler(event) {
    let productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId)
}
const basketCounter = document.querySelector('.cartIconWrap span');
const BasketEl = document.querySelector('.basket')
const openBasketBtn = document.querySelector('.cartIconWrap');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

openBasketBtn.addEventListener('click', function () {
    BasketEl.classList.toggle('hidden');
})

let basket = {}

function renderProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductsCount(productId);
        recalculateSumForProduct(productId);
    } else {
        renderNewProductInBasket(productId);
    }
}

function renderNewProductInBasket(productId) {
    let productRow = `
        <div class="basketRow">
            <div>${products[productId].name}</div>
            <div>
                <span class="productCount" data-productId="${productId}">1</span> шт.
            </div>
            <div>$${products[productId].price}</div>
            <div>
                $<span class="productTotalRow" data-productId="${productId}">${products[productId].price}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

function increaseProductsCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}

function recalculateSumForProduct(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * products[productId].price).toFixed(2);
    productTotalRowEl.textContent = totalPriceForRow;
}

function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * products[productId].price;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}



function addProductObj(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    } else {
        basket[productId]++;
    }
}

function addProductIntoBasket(productId) {
    increaseProductCount()
    addProductObj(productId);
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}
function increaseProductCount() {
    basketCounter.textContent++;
}

addToCard()

