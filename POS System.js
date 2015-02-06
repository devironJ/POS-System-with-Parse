/**
 * Created by Devon on 1/29/2015.
 */

Parse.initialize("0p43OdSSwFJgsdWW3L3xKV0udcamMTLbz5vpUN1L", "GgjIfK5qwFBIUioeYYbU9CdDLdl07IYU3jbaPvsq");

//Get a list of products to add to a "collection"
function Collection(productList, name) {
    var collectionList = productList;
    var collectionName = name;
    this.addProduct = function (name, price) {
        var Product = Parse.Object.extend("Product");
        var product = new Product();
        product.save({name: name, price: price, keywords: [], reviews: [], collection: collectionName}, {
            success: function (product) {
                console.log(name +" created with objectid: " + product.id);
            },
            error: function (product) {
                alert("Failed to create new object, error code: " + error.message);
            }
        });
    };
    var addList = function(collectionList){
        var Product = Parse.Object.extend("Product");
        var product = new Product();
        for(i=0;i < collectionList.length;i++){
            product.save({name: collectionList[i].name, price: collectionList[i].price, keywords: collectionList[i].keywords,
                reviews: collectionList[i].reviews, collection: collectionName}, {
                success: function(product){
                    console.log(product +" created with objectid: " + product.id);
                },
                error: function(product){
                    alert("Failed to create new object, error code: " + error.message);
                }
            });
        }
    };
    addList(collectionList);
}

function Category(name) {
    var categoryName = name;
    var category = [];

    //adds a new collection which a category name is automatically assigned based on your category constructor
    this.addNewCollection = function (arrCollection, collectionName) {
        for(i=0;i < arrCollection.length;i++){
            var Product = Parse.Object.extend("Product");
            var product = new Product();
            product.save({name: arrCollection[i].name, price: arrCollection[i].price, keywords: arrCollection[i].keywords,
                reviews: arrCollection[i].reviews, collection: collectionName, category: categoryName}, {
                success: function(product){
                    console.log(product +" created with objectid: " + product.id);
                },
                error: function(product){
                    alert("Failed to create new object, error code: " + error.message);
                }
            });
        }
    };

    //finds the items under the collection in Parse database, then assigns the category name specified
    this.categorizeCollection = function (arrCollectionName){
        var Product = Parse.Object.extend("Product");
        var query = new Parse.Query(Product);
        query.equalTo("collection", arrCollectionName);
        query.find({
            success: function(results){
                console.log("Successfully retrieved " + results.length + " parts of a collection.");
                for(i = 0; i < results.length; i++){
                    var object = results[i];
                        object.set("category", categoryName);
                        object.save();
                }
            },
            error: function(error){
                console.log("Error!!!!");
            }
        });
    };

}

function Inventory(shopName) {
    var shopName = shopName;
    this.store ="";
    this.category ="";
    this.name = "";
    this.price = 0;
    this.keywords = [];
    this.reviews = [];
    //adds inventory property to given category of products
    this.addCategoryToInventory = function (categoryName) {
        var Product = Parse.Object.extend("Product");
        var query = new Parse.Query(Product);
        query.equalTo("category", categoryName);
        query.find({
            success: function (results) {
                console.log("Successfully retrieved " + results.length + " parts of a category.");
                for (i = 0; i < results.length; i++) {
                    var object = results[i];
                        object.set("inventory", shopName);
                        object.save();
                }
            },
            error: function (error) {
                console.log("Error!!!!");
            }
        });
    };

    this.priceCheck = function(itemName) {
        var Product = Parse.Object.extend("Product");
        var query = new Parse.Query(Product);
        query.equalTo("name", itemName);
        query.first({
            success: function(object){
               this.price=(object.get("price"));
                $("#divOutput").append('<p>' + "The price for " + itemName + " is: $" + this.price + '</p>')
            },
            error: function(error) {
                console.log("Error!!!");
            }
        });

    };

    this.changeProductPrice = function(itemName,changedPrice){
        var Product = Parse.Object.extend("Product");
        var query = new Parse.Query(Product);
        query.equalTo("name",itemName);
        query.first({
            success: function(object){
                object.set("price",changedPrice);
                object.save();
            }
        });
    };

    this.searchInventory = function(userOption, userSearchInput){
        var Product = Parse.Object.extend("Product");
        var query = new Parse.Query(Product);
        query.equalTo(userOption, userSearchInput);
        query.find({
            success: function (results) {
                console.log("Successfully retrieved " + results.length + " item(s)");
                for (i = 0; i < results.length; i++) {
                    this.store = results[i].get("inventory");
                    alert("store: " + this.store);
                    this.category = results[i].get("category");
                    alert("categ: " + this.category);
                    this.name = results[i].get("name");
                    alert("name: " + this.name);
                    this.price = results[i].get("price");
                    alert("price: " + this.price);
                    this.keywords = results[i].get("keywords");
                    alert("keywords: " + this.keywords);
                    this.reviews = results[i].get("reviews");
                    alert("reviews: " + this.reviews);

                    $(".store").append('<p>' + this.store + '</p>');
                    $(".category").append('<p>' + this.category + '</p>');
                    $(".name").append('<p>' + this.name + '</p>');
                    $(".price").append('<p>' + this.price + '</p>');
                    $(".keywords").append('<p>' + this.keywords + '</p>');
                    $(".reviews").append('<p>' + this.reviews + '</p>');
                }
            },
            error: function (error) {
                console.log("Error!!!!");
            }
        });
    }
}

//Create a few examples by objects of products, add to list
var sprite = {
    name: "sprite",
    price: 1.00,
    keywords: ["soda", "carbonation", "7-up", "can", "coke"],
    reviews: ["soooooo goodddd", "made me gain weight"]
};

//Adding drinks
var drinksList = [];
drinksList.push(sprite);

//Create a new Collection in which the list of drinks will be that new collection, adds Drinks to collection property
var drink = new Collection(drinksList, "drink");

//Adding two products
drink.addProduct("arizona iced tea", 1.00);
drink.addProduct("sunkist", 1.50);

//Adding foods

var food = [{name: "cheerios", price: 2.95}, {name: "turkey", price: 5.95}];

var foodAndDrink = new Category("Food and Drink");

foodAndDrink.addNewCollection(food, "food");
foodAndDrink.categorizeCollection("drink");

var billyBobIrvine = new Inventory("Billy Bob's General Store Irvine");
billyBobIrvine.addCategoryToInventory("Food and Drink");

////create User class, make a prototype of user of methods that all employees have access to
//function User(name, password) {
//    this.name = name;
//    var password = password;
//}
//
//User.prototype.listCategories = function () {
//    billyBob.viewCategoryList();
//};
//
//User.prototype.checkCategory = function (categoryName) {
//    billyBob.viewStoreAspect(categoryName);
//};
//
//User.prototype.priceCheck = function (itemName) {
////needs to take in item name, and find the collection list it belongs to
//    billyBob.priceCheck(itemName);
//};
//
//User.prototype.seeReviews = function (itemName) {
//    billyBob.seeReviews(itemName);
//};
//
//function StoreManager(name, password) {
////inherits constructor from User
//    User.apply(this, arguments);
//    this.changeProductPrice = function (itemName, price) {
//        billyBob.changeProductPrice(itemName, price);
//    }
//}
//
//StoreManager.prototype = Object.create(User.prototype);
//
//var Sylvester = new StoreManager("Sylvester", "tweety");

//Sylvester.listCategories();
//Sylvester.checkCategory("Food and drink");
//Sylvester.priceCheck("turkey");
//Sylvester.changeProductPrice("turkey", 6.95);
//Sylvester.priceCheck("turkey");
//Sylvester.seeReviews("sprite");
//
//function Employee(name, password) {
//    User.apply(this, arguments);
//}
//
//Employee.prototype = Object.create(User.prototype);
//Employee.prototype.changeProductPrice = function () {
//    console.log("You do not have permission to do that, ask a store manager");
//};
//
//var Devon = new Employee("Devon", "abc123");
//Devon.priceCheck("sprite");
//Devon.changeProductPrice("sprite", .25);

//function Customer(name){
//    this.name = name;
//    User.apply(this, arguments);
//    this.addReview = function(itemName, review){
//        billyBob.addReview(itemName, review);
//    }
//}
//Customer.prototype = Object.create(User.prototype);
//
//var Adam = new Customer("Adam");
//Adam.addReview("turkey", "this turkey sucks");
//Adam.checkCategory("Food and drink");

//jQuery
$("#searchInventoryButton").on("click",function(){
    var userOption = $("#optionSelection").val();
    var userSearchInput = $("#searchInventory").val();
    alert(userSearchInput);
    if(userOption.toLowerCase() == "price"){
        userOption = parseInt(userOption, 10)
        billyBobIrvine.searchInventory(userOption, userSearchInput)
    }
    else{
        billyBobIrvine.searchInventory(userOption, userSearchInput)
    }

});
$("#search").on("click",function(){
    var userInputProduct = $("#itemInput").val();
    billyBobIrvine.priceCheck(userInputProduct);
});

$("#changePrice").on("click", function(){
    var userInputProduct = $("#itemInput").val();
    var userInputPrice = parseInt($("#priceChange").val(),10);
    billyBobIrvine.changeProductPrice(userInputProduct, userInputPrice);
    $("#divOutput").append('<p>' + "The price of " + userInputProduct + " has been changed to $" + userInputPrice)
});


////HTML for check prices
//var output = document.getElementById("divOutput");
//var userInputProductHold = "";
//document.getElementById("search").onclick = function (){
//    var userInputProduct = document.getElementById("itemInput").value;
//    billyBobIrvine.priceCheck(userInputProduct);
//    var productPrice = billyBobIrvine.returnPrice();
//        output.innerHTML += '<p>' + "The price for " + userInputProduct + " is: $" + productPrice + '</p>';
//};


////HTML for editing prices
//document.getElementById("changePrice").onclick = function(){
//    var userInputProduct = document.getElementById("itemInput").value;
//    var userInputPrice = document.getElementById("priceChange").value;
//    if(billyBob.changeProductPrice(userInputProduct,userInputPrice)){
//        output.innerHTML += '<p>' + "The price of " + userInputProduct + " has been changed to $" + userInputPrice
//    }
//    else{
//        output.innerHTML = '<p>' + "Please enter a valid price and/or product" + '</p>'
//    }
//};

/*// creates an instance for the given category


//private function that will allow search of products by name and return the element in the array,
//allows for manipulation of reviews, price, keywords


        var searchProducts = function (name) {
            for (i = 0; i < collectionList.length; i++) {
                if (collectionList[i].name == name) {
                    return i
                }
            }
        };
        //adds a review to the review array of a given item
        this.addReview = function (name, review) {
            collectionList[searchProducts(name)]["reviews"].push(review);
        };
        //
        ////checks the current price of item
        this.checkPrice = function(name){
            return collectionList[searchProducts(name)]["price"];
        };
        //
        //updates price of product, takes name of product and the new price
        this.updatePrice = function(name, updatedPrice){
            var oldPrice = collectionList[searchProducts(name)]["price"];
            collectionList[searchProducts(name)]["price"] = updatedPrice;
            console.log("You have updated the price of " + name + " from " + oldPrice + " to " + updatedPrice)
        };

        //returns the collection
        this.getCollection = function () {
            return collectionList
        }
    }

//Assign name, price, keywords and reviews to each product

    function Product(name, price) {
        this.name = name;
        this.price = price;
        this.keywords = [];
        this.reviews = [];
    }



    function Alcohol(name, price, ml, alcoContent) {
        //takes the constructor of product
        Product.apply(this, arguments);
        this.mililiters = ml;
        this.alcoholContentPercent = alcoContent;
    }

    Alcohol.prototype.isAlcoholic = true;

    var grey_goose = new Alcohol("grey goose", 24.99, 750, 40);
    var bud_light = new Alcohol("bud light", 2.00, 355, 4.2);

    bud_light.keywords = ["beer", "alcohol", "buddweiser", "bottle", "munchies"];


//console.log(foods.getCollection());


    var foodAndDrink = new Category("Food and Drink");
    foodAndDrink.addCollection(foods);
    foodAndDrink.addCollection(drinks);
//console.log(foodAndDrink.printCollection(drinks));
//console.log(foodAndDrink.getCategory());


    var billyBob = new Inventory("Billy Bob's General Store");
    billyBob.addCategory(foodAndDrink);


//<=== HTML Starts Here ===>
//document.getElementById("user").textContent = Sylvester.name;





*/

