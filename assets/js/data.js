localStorage.removeItem('order');
let cart = JSON.parse(localStorage.getItem('productsCart')) || [];

async function fetchData() {


    let requestOptions = {
        method: 'GET',

        redirect: 'follow'
    };

    try {
        const response = await fetch("http://localhost:8080/api/products/all", requestOptions);
        const result = await response.json();
        console.log('result', result);
        return result;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

async function initializeData() {
    let responseData = await fetchData();
    localStorage.setItem('productsData', JSON.stringify(responseData));
    insertDataIntoHTMLClass(responseData, 'dfgdfgdfg');
}
initializeData();

function insertDataIntoHTMLClass(data, className) {
    const container = document.getElementById(`${className}`);
    
    if (!container) {
        console.error(`HTML class "${className}" not found.`);
        return;
    }
    
    let html = '';
    
    data.forEach(item => {
        html += `
    <div class="col-sm-6 col-md-4 product-item animation-element slide-top-left" style="color: var(--bs-body-bg);">
        <div class="product-container" style="color: var(--bs-body-bg);">
            <div class="row">
                <div class="col-md-12"><a class="product-image" href="product/${item.number}.html"><img src="${item.image}"></a></div>
            </div>
            <div class="row">
                <div class="col-8">
                    <h2><a href="product/${item.number}.html">${item.name}</a></h2>
                </div>
            </div>
            <div class="product-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i><a class="small-text" href="#">${item.review}</a></div>
            <div class="row">
                <div class="col-12">
                    <p class="product-description">${item.description}</p>
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-light" id='${item.number}' type="button">Add to Cart! </button>
                        </div>
                        <div class="col-6">
                            <p class="product-price">$${item.price} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        `;
        
    });
    
    container.innerHTML = html;
    
    // Add event listener to each button
    const buttons = container.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    function addToCart(event) {
        const productId = event.target.id;
        // Add your logic to add the product to the cart
        console.log(`Product with ID ${productId} added to cart.`);
        let productInCart = false;
    
    
        cart.forEach(item => {
            if (item.number == productId) {
                item.basketCounter += 1;
                productInCart = true;
                alert(`${item.name} added to cart again!`);
            }
        });
        if (!productInCart) {
            data.forEach(item => {
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
        
        console.log(cart);
        localStorage.setItem('productsCart', JSON.stringify(cart));
        
        
    }
}



// Usage:

// Path: assets/js/app.js

// insertDataIntoHTMLClass(data, 'dfgdfgdfg');
