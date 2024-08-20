var savedData = JSON.parse(localStorage.getItem('productsData'));
let cart = JSON.parse(localStorage.getItem('productsCart')) || [];
var path = window.location.pathname;
var productNo = path.split("/").pop()[0];

function insertDataIntoHTMLClass(data, className) {
    const container = document.getElementById(`${className}`);
    
    if (!container) {
        console.error(`HTML class "${className}" not found.`);
        return;
    }
    
    let html = '';
    html += `
    <div class="col-md-6 col-xl-3">
    <div class="gallery">
        <div id="product-preview" class="vanilla-zoom">
            <div class="zoomed-image"></div>
            <div class="sidebar"><img class="img-fluid d-block small-preview" src="${data[productNo-1].image}"></div>
        </div>
    </div>
</div>
<div class="col-md-6 col-xl-6">
    <div class="info">
        <h3>${data[productNo-1].name}</h3>
        <div class="price">
            <h3>$${data[productNo-1].price}</h3>
        </div><button class="btn btn-primary" id='${data[productNo-1].number}' type="button">Buy Now</button>
        <div class="summary">
            <p>${data[productNo-1].description}</p>
        </div>
    </div>
</div>

    `;
    
    container.innerHTML = html;
    
    // Add event listener to each button
    const buttons = container.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}
function addToCart(event) {
    event.preventDefault();
    const productId = event.target.id;
    // Add your logic to add the product to the cart
    let productInCart = false;


    cart.forEach(item => {
        if (item.number == productId) {
            item.basketCounter += 1;
            productInCart = true;
            alert(`${item.name} added to cart again!`);
        }
    });
    if (!productInCart) {
        savedData.forEach(item => {
            if (item.number == productId) {
                if (!item.basketCounter) {
                    item.basketCounter = 1;
                }
                else if (item.basketCounter > 1) {
                    item.basketCounter += 1;
                }
                cart.push(item);
                alert(`${item.name} added to cart!`);
            }

            
        });
    }
    localStorage.setItem('productsCart', JSON.stringify(cart));
}
insertDataIntoHTMLClass(savedData, 'testdsgjsdjg444');