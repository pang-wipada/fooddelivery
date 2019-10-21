var firebaseConfig = {
  apiKey: "AIzaSyAuU0DnyjEdPTzpL8tLW_xB2eRR07-3vXo",
  authDomain: "food247-67a9f.firebaseapp.com",
  databaseURL: "https://food247-67a9f.firebaseio.com",
  projectId: "food247-67a9f",
  storageBucket: "food247-67a9f.appspot.com",
  messagingSenderId: "294113746913",
  appId: "1:294113746913:web:5e3039c2f1961b9604fca0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#signinbtn").click(function () {
      var email = $("#username").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
        content.load('home.html');
      })
        .catch(function (error) {
         
          console.log(error.message);
        });

    });

    $("#gmail").click(function () {
      console.log("gmail");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        content.load('home.html');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    });
  }


  if (page.id === 'homePage') {
    console.log("homePage");

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#Category_1_name").click(function () {
      $("#content")[0].load("resturant.html");
    });


    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {       
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recommended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().PhotoUrl}')">
            </div>
        </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });
  }

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#login").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });
  }

  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");
    });

    $("#register").click(function () {
      $("#content")[0].load("register.html");
    });
  }

  if (page.id === 'regisPage') {
    console.log("regisPage");

    $("#signup").click(function () {
      $("#content")[0].load("login.html");
    });

    $("#backbtn").click(function () {
      $("#content")[0].load("login.html");
    });
  }

  if (page.id === 'resturantPage') {
    console.log("resturantPage");

    $("#backbtn").click(function () {
      $("#content")[0].load("home.html");
    });

    $("#select1").click(function () {
      $("#content")[0].load("resturant-menu.html");
    });
  }

  if (page.id === 'resturantmenuPage') {
    console.log("resturantmenuPage");

    $("#backbtn").click(function () {
      $("#content")[0].load("resturant.html");
    });
  }


  if (page.id === 'confirmPage') {
    console.log("resturantmenuPage");

    $("#backbtn").click(function () {
      $("#content")[0].load("resturant-menu.html");
    });
  }


var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
  }

  // Save cart
  function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
  }


  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function(name, price, count) {
          for (var item in cart) {
              if (cart[item].name === name) {
                  cart[item].count++;
                  saveCart();
                  return;
              }
          }
          var item = new Item(name, price, count);
          cart.push(item);
          saveCart();
      }
      // Set count from item
  obj.setCountForItem = function(name, count) {
      for (var i in cart) {
          if (cart[i].name === name) {
              cart[i].count = count;
              break;
          }
      }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for (var item in cart) {
          if (cart[item].name === name) {
              cart[item].count--;
              if (cart[item].count === 0) {
                  cart.splice(item, 1);
              }
              break;
          }
      }
      saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
      for (var item in cart) {
          if (cart[item].name === name) {
              cart.splice(item, 1);
              break;
          }
      }
      saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
      cart = [];
      saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
      var totalCount = 0;
      for (var item in cart) {
          totalCount += cart[item].count;
      }
      return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
      var totalCart = 0;
      for (var item in cart) {
          totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
      var cartCopy = [];
      for (i in cart) {
          item = cart[i];
          itemCopy = {};
          for (p in item) {
              itemCopy[p] = item[p];

          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy)
      }
      return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
      output += "<tr>" +
          "<td>" + cartArray[i].name + "</td>" +
          "<td>(" + cartArray[i].price + ")</td>" +
          "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
          "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
          "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
          "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
          " = " +
          "<td>" + cartArray[i].total + "</td>" +
          "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
      var name = $(this).data('name')
      shoppingCart.removeItemFromCart(name);
      displayCart();
  })
  // +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
  var name = $(this).data('name');
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

});




