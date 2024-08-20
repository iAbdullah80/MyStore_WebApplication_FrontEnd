function calculateTotalPrice(cart) {
    let totalNumberOfProducts = 0;
    try{
    cart.forEach(item => {
        totalNumberOfProducts += item.basketCounter;
    });
}
catch (error) {
    console.log(error)
}
    const basketProducts = document.getElementById('numberInBasket');
    basketProducts.innerHTML = totalNumberOfProducts;
}
if (localStorage.getItem('productsCart')){
calculateTotalPrice(JSON.parse(localStorage.getItem('productsCart')))
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const tokenCookie = getCookie("access_token")
if (tokenCookie) {
    const dashboardBtn = document.getElementById("dashboardBtn")
    dashboardBtn.style.display = "block"        
}
else {
    const signupBtn = document.getElementById("signupBtn")
    signupBtn.style.display = "block"
}