localStorage.setItem('order', localStorage.getItem('productsCart'));
var savedCart = JSON.parse(localStorage.getItem('order'));
var savedInvoice = JSON.parse(localStorage.getItem('invoice'));
localStorage.removeItem('productsCart');
localStorage.removeItem('sessionId');
localStorage.removeItem('invoice');


function displayProductsInCart(cart) {
    console.log("Products in the shopping cart:");
    cart.forEach(productId => {
        const product = data.find(item => item.number === productId);
        console.log(`- ${product.name} (${product.price})`);
    });
}

function calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.basketCounter;
    });
    return totalPrice;
}
console.log("Total Price:", savedInvoice);
if (savedInvoice) {
    displayProductsInCart(savedInvoice);
}
function displayProductsInCart(cart) {
    const summaryContainer = document.getElementById('dkdkldkl');
    let html2 = `<h2 class="fw-bold">Order ID: ${cart}</h2>`;
    summaryContainer.innerHTML = html2;
}
function shoppingCart(cart, className) {
    const container = document.getElementById(`${className}`);
    
    if (!container) {
        console.error(`HTML class "${className}" not found.`);
        return;
    }

    let html = '';
    
    cart.forEach(item => {
        html += `
    <div class="items">
        <div class="product">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-3">
                    <div class="product-image"><img class="img-fluid d-block mx-auto image" style="width: 129px; height: 100px; margin:10px" src="${item.image}"></div>
                </div>
                <div class="col-md-5 product-info"><a class="product-name" href="product/${parseInt(item.number, 10)}.html">${item.name}</a>
                </div>
                <div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Quantity</label><p>${item.basketCounter}</p>
                </div>
                <div class="col-6 col-md-2 price"><span>$${item.price*item.basketCounter}</span>
                </div>
            </div>
        </div>
    </div>

    `;
    });
    
    container.innerHTML = html; 
    
}



shoppingCart(savedCart, 'shopping-cart');

const totalPrice = calculateTotalPrice(JSON.parse(localStorage.getItem('productsCart')));
console.log("Total Price:", totalPrice);

function updateSummary(totalPrice) {
    const summaryContainer = document.getElementById('summary_class');
    
    if (!summaryContainer) {
        console.error('Summary container not found.');
        return;
    }
    
    summaryContainer.innerHTML = `
    <h3>Summary</h3>
    <h4><span class="text">Total</span><span class="price">$${totalPrice}</span></h4>
    `;
}
updateSummary(totalPrice);
