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
    this.addNewCollection = function (arrCollection, collectionName) {
        var Product = Parse.Object.extend("Product");
        var product = new Product();
        for(i=0;i < arrCollection.length;i++){
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

    //finds the items under the collection in Parse, then assigns the category name specified
    this.categorizeCollection = function (arrCollectionName){
        var Product = Parse.Object.extend("Product");
        var query = new Parse.Query(Product);
        query.equalTo("collection", arrCollectionName);
        query.find({
            success: function(results){
                console.log("Successfully retrieved " + results.length + " parts of a collection.");
                for(i = 0; i < results.length; i++){
                    var object = results[i];
                    object.save(null, {
                        success: function(object) {
                            object.set("category", categoryName);
                            object.save();
                        }
                    });
                }
            },
            error: function(error){
                console.log("Error!!!!");
            }
        });
    };

    ////private function that tells the position of the collection passed as an argument
    //var findCollection = function (collectionName) {
    //    for (i = 0; i < collectionNames.length; i++) {
    //        if (collectionName = collectionNames[i]) {
    //            return i
    //        }
    //    }
    //};
    ////returns the entire category
    //this.getCategory = function () {
    //    return category
    //};
    ////given the collection name, will only print out the collection given
    //this.printCollection = function (collectionName) {
    //    return category[findCollection(collectionName)]
    //};

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

var foodsList = [];
var food = new Collection(foodsList, "food");

food.addProduct("cheerios", 2.95);
food.addProduct("turkey", 5.95);

var foodAndDrink = new Category("Food and Drink");
foodAndDrink.categorizeCollection("drink");

//
//drinks.addReview("arizona iced tea", "good for the price");
////console.log(drinks.checkPrice("bud light"));
//drinks.updatePrice("bud light", 3.00);
////console.log(drinks.getCollection());

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

    function Inventory(shopName) {
        this.name = shopName;
        var store = [];
        this.addCategory = function (category) {
            store.push(category);
        };
        this.viewCategoryList = function () {
            for (i = 0; i < store.length; i++) {
                console.log(store[i].name);
            }
        };

        //pass category name, reference the name to the category
        this.viewStoreAspect = function (categoryName) {
            for (i = 0; i < store.length; i++) {
                if (categoryName = store[i].name) {
                    console.log(store[i].getCategory());
                }
            }
        };
        var productReference = function (itemName) {
            for (i = 0; i < store.length; i++) {
                for (j = 0; j < store[i].getCategory().length; j++) {
                    for (k = 0; k < store[i].getCategory()[j].length; k++) {
                        if (store[i].getCategory()[j][k]["name"] == itemName) {
                            return (store[i].getCategory()[j][k])
                        }
                    }
                }
            }
        };
        this.priceCheck = function (itemName) {
            //console.log("The price of " + itemName + " is: " + productReference(itemName)["price"]);
            return productReference(itemName)["price"]
        };
        this.changeProductPrice = function (itemName, price) {
            productReference(itemName)["price"] = price;
            return productReference(itemName)["price"]
            //console.log("You changed the price of " + itemName + " from " + originalPrice + " to " + price);
        };
        this.seeReviews = function (itemName) {
            console.log(productReference(itemName)["reviews"]);
        };
        this.addReview = function(itemName, review){
            productReference(itemName)["reviews"] += review;
        }
    }

    var billyBob = new Inventory("Billy Bob's General Store");
    billyBob.addCategory(foodAndDrink);

//create User class, make a prototype of user of methods that all employees have access to
    function User(name, password) {
        this.name = name;
        var password = password;
    }

    User.prototype.listCategories = function () {
        billyBob.viewCategoryList();
    };

    User.prototype.checkCategory = function (categoryName) {
        billyBob.viewStoreAspect(categoryName);
    };

    User.prototype.priceCheck = function (itemName) {
        //needs to take in item name, and find the collection list it belongs to
        billyBob.priceCheck(itemName);
    };

    User.prototype.seeReviews = function (itemName) {
        billyBob.seeReviews(itemName);
    };

    function StoreManager(name, password) {
        //inherits constructor from User
        User.apply(this, arguments);
        this.changeProductPrice = function (itemName, price) {
            billyBob.changeProductPrice(itemName, price);
        }
    }

    StoreManager.prototype = Object.create(User.prototype);

    var Sylvester = new StoreManager("Sylvester", "tweety");

    //Sylvester.listCategories();
    //Sylvester.checkCategory("Food and drink");
    //Sylvester.priceCheck("turkey");
    //Sylvester.changeProductPrice("turkey", 6.95);
    //Sylvester.priceCheck("turkey");
    //Sylvester.seeReviews("sprite");

    function Employee(name, password) {
        User.apply(this, arguments);
    }

    Employee.prototype = Object.create(User.prototype);
    Employee.prototype.changeProductPrice = function () {
        console.log("You do not have permission to do that, ask a store manager");
    };

    var Devon = new Employee("Devon", "abc123");
    Devon.priceCheck("sprite");
    Devon.changeProductPrice("sprite", .25);

    function Customer(name){
        this.name = name;
        User.apply(this, arguments);
        this.addReview = function(itemName, review){
            billyBob.addReview(itemName, review);
        }
    }
Customer.prototype = Object.create(User.prototype);

var Adam = new Customer("Adam");
Adam.addReview("turkey", "this turkey sucks");
Adam.checkCategory("Food and drink");

//<=== HTML Starts Here ===>
//document.getElementById("user").textContent = Sylvester.name;




//HTML for edit-prices
var output = document.getElementById("divOutput");
var userInputProductHold = "";
document.getElementById("search").onclick = function (){
    var userInputProduct = document.getElementById("itemInput").value;
    userInputProductHold = userInputProduct;
    if(billyBob.priceCheck(userInputProduct)){
        output.innerHTML += '<p>' + "The price for " + userInputProduct + " is: $" + billyBob.priceCheck(userInputProduct) + '</p>';
    }
    else {
        output.innerHTML += '<p>' + "Item cannot be found" + "</p>";
    }
};

document.getElementById("changePrice").onclick = function(){
    var userInputProduct = document.getElementById("itemInput").value;
    var userInputPrice = document.getElementById("priceChange").value;
    if(billyBob.changeProductPrice(userInputProduct,userInputPrice)){
        output.innerHTML += '<p>' + "The price of " + userInputProduct + " has been changed to $" + userInputPrice
    }
    else{
        output.innerHTML = '<p>' + "Please enter a valid price and/or product" + '</p>'
    }
};*/

