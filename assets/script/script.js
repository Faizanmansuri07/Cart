const products = [
    { id: 0, name: 'Product 1', description: 'This is the first product', price: 100, image: 'images/pexels-shiny-diamond-3373738.jpg' },
    { id: 1, name: 'Product 2', description: 'This is the second product', price: 150, image: 'images/onne-beauty-lZ7tao79Y1A-unsplash.jpg' },
    { id: 2, name: 'Product 3', description: 'This is the third product', price: 200, image: 'images/reuben-mansell-nwOip8AOZz0-unsplash.jpg' },
    { id: 3, name: 'Product 4', description: 'This is the fourth product', price: 250, image: 'images/product1.jpg' },
    { id: 4, name: 'Product 5', description: 'This is the fifth product', price: 350, image: 'images/product2.jpg' },
    { id: 5, name: 'Product 6', description: 'This is the sixth product', price: 500, image: 'images/product3.jpg' }
];

let cart = [];
let total = 0;

const cartTotal = document.querySelector("#cartTotal");
const cartContainer = document.querySelector("#cartItems");
const productContainer = document.querySelector("#productContainer");

// Render products on the page
function renderProducts() {
    products.forEach((product, index) => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img src="${product.image}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}$</p>
            <button onclick="addTocart(${index})">Add To Cart</button>
        `;
        productContainer.appendChild(div);
    });
}

// Add product to the cart or update the quantity if already present
function addTocart(index) {
    let productExist = false;

    // Check if product is already in the cart
    for (const item of cart) {
        if (item.pName === products[index].name) {
            alert(`${item.pName} quantity increased by 1`);
            item.quantity += 1;
            productExist = true;
            renderCart();
            return;
        }
    }

    // If product doesn't exist, add it to the cart
    if (!productExist) {
        const pId = products[index].id;
        const pName = products[index].name;
        const price = products[index].price;
        const pImage = products[index].image;
        cart.push({ pId, pImage, pName, price, quantity: 1 });
        renderCart();
    }
}

// Update quantity of a cart item
function updateQuantity(index, change) {
    cart[index].quantity += change;

    // Remove item if quantity is 0 or less
    if (cart[index].quantity <= 0) {
        deleteFromCart(index);
    } else {
        renderCart();
    }
}

// Delete an item from the cart
function deleteFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Render cart and update total price
function renderCart() {
    cartContainer.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Cart is empty</p>";
        cartTotal.innerHTML = "Total Cart: $0";
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div class="cart-image">
                <img src="${item.pImage}">
            </div>
            <span>${item.pName}</span>
            <span>Quantity: ${item.quantity}</span>
            <span>Price: $${item.price * item.quantity}</span>
            <div class="button">
                    <button onclick="updateQuantity(${index}, 1)">
                <i class="fas fa-plus"></i>
            </button>
            <button onclick="updateQuantity(${index}, -1)">
                <i class="fas fa-minus"></i>
            </button>
            <button onclick="deleteFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
                </div>
            
        `;
        cartContainer.appendChild(div);
        total += item.price * item.quantity;
    });

    cartTotal.innerHTML = `Total Cart: $${total}`;
}

// Initial rendering of products
renderProducts();
