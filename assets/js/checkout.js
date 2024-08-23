// Checkout page
const basket = JSON.parse(localStorage.getItem('productsCart'));
var stripe = Stripe('pk_test_51MDZpHFkDhKHmlx9PwB6skmVPaWR64OyGg20iLVwrEUT0veXHL7pYzJbP50fTO4MxNN70IL18UWJY928ke2pj0S700xQ3pn0zS');

async function getUserId() {
try {
    const userid = await validateToken();  // Wait for the promise to resolve
    return userid;
} catch (error) {
    console.error('Error validating token:', error);
    return null;
}
}
async function checkout() {
    if (basket.length === 0) {
        alert('Your basket is empty');
        return;
    }
    const userid =  await getUserId();
    if (!userid) {
        alert('You need to be logged in to checkout');
        return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formattedBasket = basket.map(item => ({
        "id": item.id,
        "number": item.number,
        "name": item.name,
        "price": item.price,
        "basketCounter": item.basketCounter
    }));

    var raw = JSON.stringify(formattedBasket);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    // change the userId to the actual user id
    await fetch(`https://mystore-api.alahideb.me:8443/api/orders/create-checkout-session?userId=${userid}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            localStorage.setItem('sessionId', result.sessionId),
            localStorage.setItem('invoice', result.invoice)
        })
        .catch(error => console.log('error', error));

    const sessionId_fetched = localStorage.getItem('sessionId');
    stripe.redirectToCheckout({
        sessionId: sessionId_fetched
    }).then(function(result) {
        console.log(result.error.message);
    });
};

async function validateToken() {
    const token = tokenCookie;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Cookie", "JSESSIONID=79B21BD9A73E7F7C93B8028CEA565AAF");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    try {
    const response = await fetch("https://mystore-api.alahideb.me:8443/api/user/data", requestOptions);
    const result = await response.json();
    
    if (response.ok) {
            return result.id;
        } else {
            return "";
            
        }
    } catch (error) {
        return "";
    };
    
}