var addToCartButton = document.getElementsByClassName('addToCart')
for(var i = 0; i<addToCartButton.length; i++){
    var button = addToCartButton[i]
    button.addEventListener('click', addToCartClicked)
}

var removeItemFromCartButton = document.getElementsByClassName('remove')
for(var i = 0; i<removeItemFromCartButton.length; i++){
    var button = removeItemFromCartButton[i]
    button.addEventListener('click', removeCartItem)
    button.addEventListener('click', updateTotal)
}


var quantities = document.getElementsByClassName('quantitySelector')
for(var i = 0; i<quantities.length; i++){
    var input = quantities[i]
    input.addEventListener('change', quantityChanged)
}

var filters = document.getElementsByClassName('filterOption')
for(var i = 0; i<filters.length; i++){
    var tag = filters[0]
    tag.addEventListener('click', filterByTypeAll)
    var tag = filters[1]
    tag.addEventListener('click', filterByTypeShirt)
    var tag = filters[2]
    tag.addEventListener('click', filterByTypeFigures)
    var tag = filters[3]
    tag.addEventListener('click', filterByTypeSnacks)
}

function filterByTypeAll(){
    window.location.reload();
    }



function filterByTypeShirt(){
    var card = document.getElementsByClassName('card')
    var tag = document.getElementsByClassName('filterTag')
    for( var i = 0; i<tag.length; i++){
        if(tag[i].innerText !== 'Shirts'){
        card[i].style.display = 'none'
        }
    }
}

function filterByTypeFigures(){
    var card = document.getElementsByClassName('card')
    var tag = document.getElementsByClassName('filterTag')
    for( var i = 0; i<tag.length; i++){
        if(tag[i].innerText !== 'Figures'){
        card[i].style.display = 'none'
        }
    }
}

function filterByTypeSnacks(){
    var card = document.getElementsByClassName('card')
    var tag = document.getElementsByClassName('filterTag')
    for( var i = 0; i<tag.length; i++){
        if(tag[i].innerText !== 'Snacks'){
        card[i].style.display = 'none'
        }
    }
}


function addToCartClicked(event){
    var button = event.target
    var product = button.parentElement.parentElement.parentElement
    var productName = product.getElementsByClassName('title3')[0].innerText
    var productPrice = product.getElementsByClassName('productPrice')[0].innerText
    var productImage = product.getElementsByClassName('cardLargeImg')[0].src
    var defaultTextRemove = document.getElementsByClassName('defaultCartText')[0]
    defaultTextRemove.innerText = ' '
    console.log(defaultTextRemove)
    addProductToCart(productName, productPrice, productImage)
    updateTotal()
}

function addProductToCart (productName, productPrice, productImage){
    var cardSmall = document.createElement('div');
    cardSmall.classList.add('cardSmall');
    /*var cartItems = document.getElementsByClassName('cardSmall')[0]
    var cartItemsNames = cartItems.getElementsByClassName('title3')
    for( var i=0; i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText == productName){
            alert('This product is already on your cart!')
        }
    }*/
    var image = document.createElement('img');
    image.classList.add('cardSmallImg');
    image.src = productImage
    var  wrapper = document.createElement('div')
    wrapper.classList.add('cardSmallContent');
    var title = document.createElement('p');
    title.classList.add('title3', 'cardSmallText');
    title.innerText = productName
    var priceQuantity = document.createElement('div');
    priceQuantity.classList.add('priceQuantity');
    var price = document.createElement('p');
    price.classList.add('productPrice', 'cardSmallText')
    price.innerText = productPrice
    var quantitySelector = document.createElement('input');
    quantitySelector.classList.add('productPrice', 'cardSmallText', 'quantitySelector')
    quantitySelector.type = 'number'
    quantitySelector.value = '1'
    quantitySelector.min ='1'
    var removeButton = document.createElement('button');
    removeButton.classList.add('caption','cardSmallText','remove');
    removeButton.innerText = 'Remove item';
    var cart = document.getElementById('cart')
    priceQuantity.appendChild(price);
    priceQuantity.appendChild(quantitySelector);
    wrapper.appendChild(title);
    wrapper.appendChild(priceQuantity);
    wrapper.appendChild(removeButton);
    cardSmall.appendChild(image);
    cardSmall.appendChild(wrapper);
    cart.appendChild(cardSmall);
    cardSmall.getElementsByClassName('remove')[0].addEventListener('click',removeCartItem)
    quantitySelector.addEventListener('change', quantityChanged)
    cardSmall.getElementsByClassName('quantitySelector')[0].addEventListener('change', updateTotal)
}

function removeCartItem (event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function quantityChanged(event){
    var input = event.target
    console.log(input.value)
    if (input.value == ''){
        input.value = 1
    }
    updateTotal()
}

function updateTotal(){
    var cartListContainer = document.getElementsByClassName('cart')[0]
    var cartElements = cartListContainer.getElementsByClassName('cardSmall')
    var total = 0
    var totalQuantity = 0
    for(var i = 0; i<cartElements.length; i++){
        var cartElement = cartElements[i]
        var priceElement = cartElement.getElementsByClassName('productPrice')[0]
        var priceValue = parseFloat(priceElement.innerText)
        var quantityElement = cartElement.getElementsByClassName('quantitySelector')[0]
        var quantityValue = parseFloat(quantityElement.value)
        total = total + (priceValue*quantityValue)
        totalQuantity = totalQuantity+quantityValue
    }
    document.getElementsByClassName('value')[0].innerText= total
    document.getElementsByClassName('quantityDisplay')[0].innerText = totalQuantity
}