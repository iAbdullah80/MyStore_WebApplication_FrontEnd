var savedData = JSON.parse(localStorage.getItem('productsData'));
var savedCart = JSON.parse(localStorage.getItem('productsCart'));


function calculateTotalPrice(cart) {
    let totalPrice = 0;
    try{
    cart.forEach(item => {
        totalPrice += item.price * item.basketCounter;
    });
}
catch (error) {
    console.log(error)
}
    return totalPrice;
}

function shoppingCart(data, cart, className) {
    const container = document.getElementById(`${className}`);
    
    if (!container) {
        console.error(`HTML class "${className}" not found.`);
        return;
    }
    
    let html = '';
    try{
    cart.forEach(item => {
        html += `
    <div class="items">
        <div class="product">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-3">
                    <div class="product-image"><img class="img-fluid d-block mx-auto image" src="${item.image}"></div>
                </div>
                <div class="col-md-5 product-info"><a class="product-name" href="product/${parseInt(item.number, 10)}">${item.name}</a>
                    <div class="product-specs">
                        <div><span>Description:&nbsp;</span><span class="value">${item.description}</span></div>
                    </div>
                </div>
                <div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Quantity</label><input type="number" id="number-1" class="form-control quantity-input" value=${item.basketCounter}></div>
                <div class="col-6 col-md-2 price"><span>$${item.price}</span>
                    <a class="btn btn-primary shadow" id="trash_button" role="button" style="padding: 0;padding-top: 0px;padding-bottom: 5px;padding-right: 5px;margin: 0px;margin-right: 6px;width: 53.6px;height: 29.2px;position: relative;padding-left: 14px;margin-left: 1px;">
                        <svg class="bi bi-trash3" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="font-size: 20px;padding-left: 0px;margin-left: -10px;">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                        </svg></a>
                </div>
            </div>
        </div>
    </div>

    `;
    });
}
catch (error) {
    console.log(error)
}
    
    container.innerHTML = html;
    
    // Add event listener to each button
    const quantityInputs = container.getElementsByClassName('quantity-input');
    Array.from(quantityInputs).forEach((input, index) => {
        input.addEventListener('change', (event) => {
            const newQuantity = event.target.value;
            cart[index].basketCounter = parseInt(newQuantity, 10);
            localStorage.setItem('productsCart', JSON.stringify(cart));
            location.reload();
        });
    });

    // Add event listener to trash button
    const trashButtons = container.getElementsByClassName('btn-primary');
    Array.from(trashButtons).forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            cart.splice(index, 1);
            localStorage.setItem('productsCart', JSON.stringify(cart));
            location.reload();
        });
    });
}



shoppingCart(savedData, savedCart, 'shopping-cart');

const totalPrice = calculateTotalPrice(JSON.parse(localStorage.getItem('productsCart')));

function updateSummary(totalPrice) {
    const summaryContainer = document.getElementById('summary_class');
    
    if (!summaryContainer) {
        console.error('Summary container not found.');
        return;
    }
    
    summaryContainer.innerHTML = `
    <h3>Summary</h3>
    <h4 class="border-primary-subtle"><span class="text">Subtotal</span><span class="price">$${totalPrice}</span></h4>
    <h4><span class="text">Discount</span><span class="price">$0</span></h4>
    <h4><span class="text">Shipping</span><span class="price">$0</span></h4>
    <h4><span class="text">Total</span><span class="price">$${totalPrice}</span></h4>
    <button class="btn btn-primary btn-lg d-block w-100" id="checkout_button" type="button" onclick="checkout()">Checkout</button>
    `;
}
updateSummary(totalPrice);
