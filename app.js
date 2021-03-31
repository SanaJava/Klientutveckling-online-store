"use strict";

var itemsInStock
var itemsInBasket = 0
const shoppingcart = new Array;

function render(content) {
    var data = JSON.parse(content);
    itemsInStock = data
    console.log(data)

    var rowDiv = document.createElement("div")
    rowDiv.className = "grid-container"

    for (var i = 0; i < data.length; i++) {
        var columnDiv = createGridItem(data[i])
        rowDiv.appendChild(columnDiv)
    }

    var divContainer = document.getElementById("content");
    divContainer.innerHTML = "";
    divContainer.appendChild(rowDiv);
}

function createGridItem(data) {

    var columnDiv = document.createElement("div")
    columnDiv.className = "grid_item"

    var image_div = document.createElement("div")
    image_div.className = "content_img"
    var image = document.createElement("img")
    image.src = data['image']
    image_div.appendChild(image)

    columnDiv.appendChild(image_div)

    var title = document.createElement("h3")
    title.innerHTML = data['title']
    columnDiv.appendChild(title)

    var price = document.createElement("h3")
    price.className = "content_price"
    price.innerHTML = data['price'].toFixed(2) + ' €'
    columnDiv.appendChild(price)

    var buyButton = document.createElement("button")
    buyButton.className = "buyButton"
    buyButton.innerHTML = "Add item"
    buyButton.addEventListener('click', function () {
        addToBasket(data['id'])
    })
    columnDiv.appendChild(buyButton)

    return columnDiv

}

function addToBasket(id) {
    console.log('addToBasket called with ' + id)

    var itemToAdd = itemsInStock[id - 1]

    shoppingcart.push(itemToAdd)

    console.log('shopping cart size: ' + shoppingcart.length)

    var counter = document.getElementById("itemsBasket")
    console.log('Counter: ' + counter)
    counter.innerHTML = shoppingcart.length

    console.log('Adding ' + itemToAdd["title"] + ' to basket')

    sessionStorage.setItem('cart', JSON.stringify(shoppingcart))


}

function loadShoppingCart() {

    console.log('Loading')

    var cart = JSON.parse(sessionStorage.getItem('cart'))

    var tbody = document.getElementById("cartItems")
    var actions = '<a class="add" title="Add"><i class="material-icons"></i></a>' +
    '<a class="delete" title="Delete"><i class="material-icons"></i></a>'

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i]
       
       $(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr class="item">' +
            '<td>' + item['title'] + '</td>' +
            '<td>' + item['description'] + '</td>' +
            '<td class="count">1</td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    }

    var counter = document.getElementById("itemsBasket")
    counter.innerHTML = cart.length

}

// Delete row on delete button click
$(document).on("click", ".delete", function(){
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
});

// Add row on add button click
$(document).on("click", ".add", function(){
    var index = ($(this).parent().parent().index())
    var T = document.getElementById('cartTable');

    var item = document.querySelectorAll('tbody .item')[index];

    var clone = item.cloneNode(true);

    $("table").append(clone);		
  
});

function loadData() {

    console.log('Loading')
    fetch("https://fakestoreapi.com/products")
        .then((response) => {
            return response.text();
        })
        .then((myContent) => render(myContent));
}

function validateForm() {

    var valid = true
    
    valid = valid && validateFirstName()
    valid = valid && validateLastName()
    valid = valid && validateAdress()
    valid = valid && validateEmail()
    valid = valid && validateZipCode()
    valid = valid && validateCity()
    valid = valid && validatePhoneNumber()

    if (valid) {
        alert('Thank you for choosing Sana Online Shopping!')
    }

}

function validateFirstName() {

    var x;
    var text = "";

    var regex = /\d/;
    var x = document.getElementById("firstname").value;
    if (x == "" || regex.test(x)) {
        text = "Vänligen ange ett förnamn";
    }

    document.getElementById("invalidfirstname").innerHTML = text;
    return text == ""
}

function validateLastName() {

    var x;
    var text = "";
    var regex = /\d/;

    var x = document.getElementById("lastname").value;
    if (x == "" || regex.test(x)) {
        text = "Vänligen ange ett efternamn";
    }

    document.getElementById("invalidlastname").innerHTML = text;

    return text == ""
}

function validateAdress() {

    var x;
    var text = "";

    var x = document.getElementById("address").value;
    if (x == "") {
        text = "Vänligen ange en postadress";
    }

    document.getElementById("invalidaddress").innerHTML = text;

    return text == ""

}

function validateEmail() {

    var x;
    var text = "";
    var regex = /\S+@\S+\.\S+/;
    x = document.getElementById("email").value;

    if (x == "" || !regex.test(x)) {
        text = "Vänligen ange en giltig e-postadress";
    }
    document.getElementById("invalidemail").innerHTML = text;

    return text == ""
}

function validateZipCode() {

    var x, text;

    x = document.getElementById("zipcode").value;

    if (isNaN(x) || x.length != 5) {
        text = "Ogiltigt postnummer";
    } else {
        text = "";
    }

    document.getElementById("invalidzipcode").innerHTML = text;
    return text == ""
}

function validateCity() {

    var x;
    var text = "";

    var regex = /\d/;
    var x = document.getElementById("city").value;
    if (x == "" || regex.test(x)) {
        text = "Vänligen ange en postort";
    }

    document.getElementById("invalidcity").innerHTML = text;
    return text == ""
}

function validatePhoneNumber() {

    var x, text;

    x = document.getElementById("phonenumber").value;

    if (isNaN(x) || x.length < 1 || x.length > 11) {
        text = "Ogiltigt telefonnummer";
    } else {
        text = "";
    }

    document.getElementById("invalidphonenumber").innerHTML = text;
    return text == ""
}

function addItem(){


    console.log('Loading')

    var cart = JSON.parse(sessionStorage.getElementById("itemsBasket"))
    console.log('items in cart: ' + cart + ', size: ' + cart.length)

    var prodDiv = document.createElement("div")
    prodDiv.className = "list-container"


    for (var i = 0; i < cart.length; i++) {
        var item = cart[i]
        var columnDiv = createGridItem(item)
        prodDiv.appendChild(columnDiv)
        console.log('item: ') + item
    }

    var divContainer = document.getElementById("content");
    divContainer.innerHTML = "";
    divContainer.appendChild(prodDiv);
}
