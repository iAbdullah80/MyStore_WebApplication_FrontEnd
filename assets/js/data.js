localStorage.removeItem('order');
let cart = JSON.parse(localStorage.getItem('productsCart')) || [];

async function fetchData() {


    let requestOptions = {
        method: 'GET',

        redirect: 'follow'
    };

    try {
        const response = await fetch("https://mystore-api.alahideb.me:8443/api/products/all", requestOptions);
        const result = await response.json();
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
                <div class="col-md-12"><a class="product-image" href="../product/${item.number}"><img src="${item.image}"></a></div>
            </div>
            <div class="row">
                <div class="col-8">
                    <h2><a href="../product/${item.number}">${item.name}</a></h2>
                </div>
            </div>
            <div class="product-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i><a class="small-text" href="#">${item.review}</a></div>
            <div class="row">
                <div class="col-12">
                    <p class="product-description">${item.description}</p>
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-light" id='${item.number}' type="button">
                                <span class="button-text">Add to Cart!</span>
                                <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                            </button>
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
    async function addToCart(event) {
        const button = event.target.closest('.btn');
        const productId = button.id;
        const buttonText = button.querySelector('.button-text');
        const spinner = button.querySelector('.spinner-border');

        // Disable the button and show spinner
        button.disabled = true;
        buttonText.classList.add('d-none');
        spinner.classList.remove('d-none');

        let productInCart = false;

        cart.forEach(item => {
            if (item.number == productId) {
                item.basketCounter += 1;
                productInCart = true;
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
                }
            });
        }

        localStorage.setItem('productsCart', JSON.stringify(cart));

        // Simulate a delay (e.g., for an API call)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Re-enable the button and hide spinner
        button.disabled = false;
        buttonText.classList.remove('d-none');
        spinner.classList.add('d-none');

        // Change button color to green for 3 seconds
    const originalColor = button.style.backgroundColor;
    button.style.backgroundColor = 'green';

    setTimeout(() => {
        button.style.backgroundColor = originalColor;
    }, 3000);
        // Show alert after the button is back to normal
        const addedItem = cart.find(item => item.number == productId);
        if (addedItem) {
            buttonText.innerText = 'Added!';
            setTimeout(() => {
                buttonText.innerText = 'Add to Cart!';
            }, 3000);
        }
    }
}