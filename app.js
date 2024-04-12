// document.addEventListener("DOMContentLoaded",()=>{



// })

// variable declaration

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart 

let cart = [];

// getting the products

class Products{
   async getProducts(){
    try{
        let result = await fetch("products.json");
        let data = await result.json();
        let products = data.items;
        // getting property for items from son
        products = products.map(item=>{
            const {title,price} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            // return the clean product
            return {title,price,id,image};
        });
        return products;
    }
    catch(error){
        console.log(error);
    }
    } 
}

// display the products

class UI{
    displayProducts(products){
        let result = "";
        // this creates a string for every item and acceses thm from the products array whuch we created and puts them one by one into it
        products.forEach(product => {
            // result is an array which would store all the items one by one
            result += `
            <article class="product">
                        <div class="img-container">
                            <img src=${product.image} 
                            alt="product" 
                            class="product-img">
                            <button class="bag-btn" data-id=${product.id}>
                                <i class="fas fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                        </div>
                        <h3>${product.title}</h3>
                        <h4>$${product.price}</h4>
                    </article>`;
        });
        // this displays the products into the parent container that we created
        productsDOM.innerHTML = result;
    }
    getBagButtons(){
        // converts the nodelist of buttons to an array
        const buttons = [...document.querySelectorAll(".bag-btn")]
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id)
            if(inCart){
                button.innerText = "In Cart"
                button.disabled = true;
            }
            else{
                button.addEventListener("click", (e)=>{
                    e.target.innerText = "In Cart";
                    e.target.disabled = true;
                    // get product from products 
                    // add product to the cart
                    // save the cart in local storage
                })
            }
        })
    }

}

// local storage

class Storage{
    static saveProduct(products){
        localStorage.setItem("product", JSON.stringify(products))
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts()
    .then(products =>{
        ui.displayProducts(products);
        Storage.saveProduct(products);
    })
    .then(()=>{
        ui.getBagButtons();
    });
})

