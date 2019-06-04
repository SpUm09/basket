$(document).ready(function () {

    let basket = [];

    if (JSON.parse(localStorage.getItem('basketProd')) !== null) {
        basket = JSON.parse(localStorage.getItem('basketProd'));
        updateBasket();
    }

    function updateBasket() {
        for (let i = 0; i < basket.length; i++) {
            let prodItem = ('' +
                '<div class="basket_shop-list-item"><div class="close _delete"><img src="img/close.png" alt=""></div><p class="name">'
                + basket[i].name
                + '</p><div class="price">'
                + basket[i].price
                + '</div></div>' +
                '');
            $(".basket_shop-list").append(prodItem);
        }
        updatePrice();
    };

    function updatePrice() {
        let summ = 0,
            priceInt = 0;
        $('.basket_shop-list-item').each(function () {
            priceInt = parseInt($(this).find('.price').text());
            summ += priceInt;
        });
        $('.basket_sum ._result_sum').text(summ);
    };


    $('.add-product').on('click', function (e) {
        e.preventDefault();
        let parents = $(this).parents('.product-list_item');
        let productName = parents.find('.name').text().trim();
        let productPrice = parents.find('.price').text().trim();
        let prodItem = ('' +
            '<div class="basket_shop-list-item"><div class="close _delete"><img src="img/close.png" alt=""></div><p class="name">'
            + productName
            + '</p><div class="price">'
            + productPrice
            + '</div></div>' +
            '');
        $(".basket_shop-list").append(prodItem);

        basket.push({name: productName, price: productPrice});
        localStorage.setItem('basketProd', JSON.stringify(basket));

        updatePrice();
    });

    $(document).on('click', '._delete', function (e) {
        e.preventDefault();
        $(this).parent().remove();
        basket = [];

        $('.basket_shop-list-item').each(function () {
            let productName = $(this).find('.name').text().trim();
            let productPrice = $(this).find('.price').text().trim();
            basket.push({name: productName, price: productPrice});
        });
        localStorage.setItem('basketProd', JSON.stringify(basket));

        updatePrice();
    });

    $('._order').on('click', function (e) {
        e.preventDefault();
        let basketName = $('.basket_shop-list-item .name');
        let totalPrice = $('.basket_sum ._result_sum').text();
        let alertList = [];
        basketName.each(function () {
            alertList.push($(this).text());
        });
        alert('Вы добавили в корзину ' + alertList.join(', ') + ' на сумму ' + totalPrice + '');
    })

});

$(window).on('load', function () {
    let offsetBasket = $('.basket').offset().top;
    let scrollTop = $(window).scrollTop();

    $(window).on('scroll', function () {
        let $basket = $('.basket-wrapper');
        scrollTop = $(window).scrollTop();
        if (scrollTop < offsetBasket) {
            $basket.removeClass('_fixed');
        } else {
            $basket.addClass('_fixed');
        }
    });
});