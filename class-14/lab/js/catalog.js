/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i=0; i < Product.allProducts.length; i++) {
    
          //var value = document.createAttribute('value')
          var item = document.createElement('option');
          //item
          
         // value.textContent = Product.allProducts[i].name;

         item.textContent = Product.allProducts[i].name;
          
  }

  
  selectElement.appendChild(item);
  console.log(selectElement)
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
// function creatTable(){
//   var table = document.getElementById('cart');

// }


function handleSubmit(event){

  ///var getValue = event.target.getAttribute('value');
  /////var getNum = event.target.getAttibute ('number');
  ////cart.item(getValue,getNum);
  event.preventDefault();
  // getValue.setItem(key, JSON.stringify(data));  

 


  // TODO: Prevent the page from reloading

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var product = document.getElementsById('items').value;
  // TODO: get the quantity
  var quantity = document.getElementById('quantity').value;
  // TODO: using those, add one item to the Cart
  cart.product = product;
  //cart.items.allProducts = product;
  //cart.product = value;
  //var numberOfProducts = cart.quantity++;
  //numberOfProducts = quantity;
  cart.quantity += quantity;
}
/////console.log(numberOfProducts);
// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var textEl = document.createElement('li');
  var cartCount = document.getElementById('itemCount');
  textEl.textContent = ('Number of Items In Cart: ' + cart.items.length);
  cartCount = appendChild(textEl);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
var showItems = document.getElementById('cart')
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var item = document.getElementById('items').value;
  var numSelected = document.getElementById('quantity').value;
  
  var row = table.insertRow(0); //// found here  https://www.w3schools.com/jsref/met_table_insertrow.asp///
  var cellOne = row.insertCell(0);
  var cellTwo = row.insertCell(1);

  // TODO: Add a new element to the cartContents div with that information
  cellOne.innerHTML = ('Your Items: ' + item);
  showItems.appendChild(cellOne)
  cellTwo.innerHTML = ('Quantity ' + numSelected); 
  showItems.appendChild(cellTwo)

  
}


// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
