
let listPlus = document.querySelectorAll('.plus');
let listMinus = document.querySelectorAll('.minus');
let listDestroy = document.querySelectorAll('.remove');
function solveAmount() {
    let listDivProduct = document.querySelectorAll(".product");
    let sumPriceProduct = 0;
    listDivProduct.forEach(function (divProduct, id, listDivProduct) {
        let countTextObj = divProduct.querySelector(".product-count");
        let priceTextObj = divProduct.querySelector(".price");
        countTextObj = parseInt(countTextObj.textContent.split(" ")[1]);
        priceTextObj = parseInt(priceTextObj.textContent.split(" ")[1]);
        let priceProduct = priceTextObj * countTextObj;
        console.log(priceTextObj)
        sumPriceProduct += priceProduct;
    })
    let everyPrice = document.querySelector('.products-price');
    everyPrice.textContent = `Ціна продуктів: ${String(sumPriceProduct)}`;
};
listPlus.forEach(function (plus, id, listPlus) {
    plus.addEventListener('click', function (event) {
        let plusClass = plus.className.split(' ')[1];
        let textObject = document.querySelector(`#${plusClass}`);
        textObject.textContent = `Кількість: ${parseInt(textObject.textContent.split(' ')[1]) + 1}`
        solveAmount();
    });
});
listMinus.forEach(function (minus, id, listMinus) {
    minus.addEventListener('click', function (event) {
        let minusClass = minus.className.split(' ')[1];
        let textObject = document.querySelector(`#${minusClass}`);
        textObject.textContent = `Кількість: ${parseInt(textObject.textContent.split(' ')[1]) - 1}`
        solveAmount();
    });
});
listDestroy.forEach(function (destroy, id, listDestroy) {
    destroy.addEventListener('click', function (event) {
        let destroyClass = destroy.className.split(' ')[1];
        let textObject = document.querySelector(`#${destroyClass}`);
        textObject.textContent = `Кількість: 0`;
        solveAmount();
    });
});
document.addEventListener('DOMContentLoaded', solveAmount())
$(document).ready(function () {
    $(".deleteCookie").on("submit", function (event) {
        event.preventDefault();
        objectText = event.currentTarget.querySelector('.product-count');
        objectText = parseInt(objectText.textContent.split(' ')[1]);
        let divParent = $(this).closest('div');
        let dataForm = $(this).serializeArray();
        dataForm.push({ name: 'product_count', value: $(this).find('.product-count').text() });
        $.ajax({
            type: "POST",
            url: $(this).action,
            data: dataForm,
            success: function () {
                if (objectText == 0) {
                    divParent.remove()
                }
            }
        })
    })
})