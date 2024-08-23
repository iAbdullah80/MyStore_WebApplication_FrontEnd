var savedData = JSON.parse(localStorage.getItem('productsData'));
let cart = JSON.parse(localStorage.getItem('productsCart')) || [];
var path = window.location.pathname;
var productNo = path.split("/")[2];

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
        </div>
        <button class="btn btn-primary" id='${data[productNo-1].number}' type="button">
                                <span class="button-text">Buy Now</span>
                                <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                            </button>
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
insertDataIntoHTMLClass(savedData, 'testdsgjsdjg444');