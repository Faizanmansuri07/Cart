let url = ""
let userCart = []
let data

const cart = document.querySelector(".cart")
const cartContainer = document.querySelector(".cart-container");
document.querySelector("#showCart").addEventListener("click", () => {
    cart.classList.add("show")
})

document.querySelector("#hide").addEventListener("click", () => {
    cart.classList.remove("show")
})


// ---------------
// render products
// ----------------

const select = document.querySelector("select")
const productsContainer = document.querySelector(".products")
const loaders = document.querySelectorAll(".loader");
const items = document.querySelector(".items");
const isEmpty = document.querySelector("#empty")

if(userCart.length === 0) {
    isEmpty.innerHTML = "cart is empty"
}
async function fetchProducts() {
    let category = select.value;
    console.log(category);
    loaders.forEach((loader) => loader.style.display = "flex")
    try {
        if(category === "products") {
            url = "https://fakestoreapi.com/products"
            
        }   else {
            url = `https://fakestoreapi.com/products/category/${category}`
        }
        const response = await fetch(url)
        data = await response.json();
        renderProducts(data);
                
    } catch (error) {
        console.log(error);
        
    }
    loaders.forEach((loader) => loader.style.display = "none")

}


function renderProducts(data) {
    productsContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();
    data.forEach((product, idx) => {
        const div = document.createElement("div");
        div.classList.add("product")
        div.innerHTML = `
            <div class="product-detail">
                <div class="img">
                    <img src="${product.image}" alt="">
                </div>    
                    <p id="title">${product.title}</p>
                    <p id="price">Price : ${product.price}</p>
                    <button id="addtocart" onclick="addToCart(${idx})">Add to cart</button>
            </div>
        `;
        fragment.appendChild(div)
    })
    productsContainer.appendChild(fragment)
}

function addToCart(idx) {
    alert("Item added to the cart ")
    let productExist = false;
    for (const product of userCart) {
        if(product.pName === data[idx].title) {
            product.quantity += 1;
            productExist = true
            renderCart()
            return;
        }
    }

    if(!productExist) {
        let pImg = data[idx].image;
        let pName = data[idx].title;
        let pPrice = data[idx].price;
        userCart.push({pImg, pName, pPrice, quantity : 1})
        renderCart();
        updateTotal()
    }
}


function renderCart() {
    items.innerHTML = "";
    console.log(userCart);
    
    const fragment = document.createDocumentFragment();
    userCart.forEach((product,idx) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <img src="${product.pImg}" alt="">
                <p id="p-name">${product.pName}</p>
                <p id="p-price">${product.pPrice * product.quantity} $</p>
                <div class="quantity">
                    <button onclick="updateQuantity(${idx}, -1)">-</button>
                    <p id="quantity">${product.quantity}</p>
                    <button onclick="updateQuantity(${idx}, 1)">+</button>
                </div>
            <button id="remove" onclick="removeProduct(${idx})">&times;</button>
        `;
        fragment.appendChild(div)
    })
    items.appendChild(fragment)
}

function updateQuantity(idx,change) {
        userCart[idx].quantity += change

        if(userCart[idx].quantity <= 0) {
            removeProduct(idx)

        }   else {
            renderCart()

        }
        updateTotal();

}

function removeProduct(idx) {
    
    userCart.splice(idx, 1)
    renderCart()
    updateTotal()
}

function updateTotal() {
    let total = 0;
    for (let value of userCart) {
        total += value.pPrice * value.quantity;
    }
    total.toFixed(2);
    document.querySelector("#amount").innerHTML = `${total} $`;
}




select.addEventListener("change", fetchProducts);

fetchProducts()