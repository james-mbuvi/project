var basketItems = [];
var commentsList = [];
var totalBasketPrice = 0;
var orderPlaced = false;

document.addEventListener('DOMContentLoaded', function(event) {
event.preventDefault();
    var addToBasketButtons = document.querySelectorAll('.add-to-basket-btn');
    addToBasketButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            if (!orderPlaced) {
                var itemName = button.parentNode.querySelector('p:first-child').innerText;
                var itemImage = button.parentNode.querySelector('img').src;
                var itemPrice = parseInt(button.getAttribute('data-price'));
                addToBasket(itemName, itemImage, itemPrice);
            } else {
            alert('you have already placed an order')
            }
        });
    });
});

function addToBasket(itemName, itemImage, itemPrice) {
    basketItems.push({ name: itemName, image: itemImage, price: itemPrice });
    totalBasketPrice += itemPrice;
    updateBasket();
}

function updateBasket() {
    var basketItemsContainer = document.getElementById('basketItems');
    var totalPriceElement = document.getElementById('totalPrice');
    basketItemsContainer.innerHTML = '';
    totalPriceElement.textContent = totalBasketPrice;

    basketItems.forEach(function (item) {
        var itemContainer = document.createElement('div');
        itemContainer.innerHTML = `<img src="${item.image}" alt="${item.name}" style="max-width: 100px; max-height: 100px; margin-right: 10px;">${item.name} - Price: ${item.price}`;
        basketItemsContainer.appendChild(itemContainer);
    });
}


function resetBasket() {
    if (!orderPlaced) {
        basketItems = [];
        totalBasketPrice = 0;
        updateBasket();
    } else {
        alert('Cannot reset basket after placing an order.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var resetBasketButton = document.getElementById('resetBasketButton');
    resetBasketButton.addEventListener('click', function () {
        resetBasket();
    });
});



function placeOrder() {
    if (basketItems.length > 0) {
        orderPlaced = true;
        var orderStatusMessage = document.getElementById('orderStatusMessage');
        orderStatusMessage.textContent = 'Order placed successfully!';
        updateBasket(); 
    } else {
        alert('Please add items to the basket before placing an order.');

    }
}

function addComment() {
    var commentText = document.getElementById('commentInput').value.trim();
    if (commentText !== '') {
        commentsList.push(commentText);
        updateComments();
        
        document.getElementById('commentInput').value = '';
    }
}

function updateComments() {
    var commentsListContainer = document.getElementById('commentsList');
    commentsListContainer.innerHTML = '';

    commentsList.forEach(function (comment) {
        var listItem = document.createElement('li');
        listItem.textContent = comment;
        commentsListContainer.appendChild(listItem);
    });
}

fetch('http://localhost:3000/items')
.then(response => {
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
})
.then(data => {
    
    console.log(data);

    
    data.items.forEach(item => {
        console.log(item.name);
    });
})
.catch(error => {
    
    console.error('Fetch error:', error);
});




