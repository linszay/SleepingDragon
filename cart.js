//checking to make sure the document is loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removecartItemContainers = document.getElementsByClassName('btn-danger')
    
    for (var i = 0; i < removecartItemContainers.length; i++) { 
        var button = removecartItemContainers[i]
        button.addEventListener('click', removecartItemContainer)
    }
    
    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChange)
    }

    var addToCart = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCart.length; i++) {
        var button = addToCart[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseButtonClicked)
}


function purchaseButtonClicked() {
    alert('Thank you for your purchase!')
    //get the cart items element
    var cartItems = document.getElementsByClassName('cart-items')[0]
    //loop to remove all child elements & empty cart
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removecartItemContainer(event) {
    //get the button that was clicked
    var buttonClicked = event.target
    //move to the parent element of the button and then to the parent element of that and remove it
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function quantityChange(event) {
    //get input element that triggered event change
    var input = event.target
    //check if input is valid number or less than or equal to 0
    if (isNaN(input.value) || input.value <= 0) {
        //default set to 1
        input.value = 1
    }
    updateCartTotal()
}


function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    //getting title from html
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    //getting price from html
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    //getting image src from html
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}


function addItemToCart(title, price, imageSrc) {
    //creating the element to add to cart
    var cartRow = document.createElement('div')
    //adding cart-row class to the element to get correct styling
    cartRow.classList.add('cart-row')
    //getting the container for cart items
    var cartItemContainers = document.getElementsByClassName('cart-items')[0]
    var cartItemContainerNames = cartItemContainers.getElementsByClassName('cart-item-title')
    //loop verifies that cart items are not duplicated
    for (var i = 0; i < cartItemContainerNames.length; i++) {
        if (cartItemContainerNames[i].innerText == title) {
            alert('This item has already been added to your cart')
            return
        }
    }
    //creating new cart items from existing html for cart items (now removed)
    var cartRowContents = `
    <div class="cart-item cart-column">
                         <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                         <span class="cart-item-title">${title}</span>
                     </div>
                     <span class="cart-price cart-column">${price}</span>
                     <div class="cart-quantity cart-column">
                         <input class="cart-quantity-input" type="number" value="1">
                         <button class="btn btn-danger" type="button">REMOVE</button>
                     </div>`
    //set innerHTML of the cart row to the created content
    cartRow.innerHTML = cartRowContents
    //append cart row to the container
    cartItemContainers.append(cartRow)
    //event listeners for remove button and quantity input change
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removecartItemContainer)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}


function updateCartTotal() {
    //selecting first cart item
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    //selecting all cart row elements in cart item container
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    //looping through all cart row elements
    for (var i = 0; i < cartRows.length; i++) {
        var cartRowItem = cartRows[i]
        //getting price element from cart row item
        var priceElements = cartRowItem.getElementsByClassName('cart-price')[0]
        //getting quantity element from cart row item
        var quantityElements = cartRowItem.getElementsByClassName('cart-quantity-input')[0]
        //getting price element and removing the characters and using parseFloat to get number and not a string
        var price = parseFloat(priceElements.innerText.replace('$', ''))
        //getting the value of the input element
        var quantity = quantityElements.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    //adding $ back to updated total price
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

