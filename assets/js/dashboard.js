async function getInvoices(userId) {
    const token = tokenCookie;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    try {
    const response = await fetch(`http://localhost:5500/api/invoices/user/${userId}`, requestOptions);
    const result = await response.json();
    
    if (response.ok) {
            return result;
        } else {
            // If the response is not 200 OK, redirect to /root
            return null;
            
        }
    } catch (error) {
        // If there's an error in the request, redirect to /root
        return null;
        
    };
    
}

// Get the user data
async function getData() {
    const token = tokenCookie;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    try {
    const response = await fetch("http://localhost:5500/api/user/data", requestOptions);
    const result = await response.json();
    
    if (response.ok) {
            return result;
        } else {
            // If the response is not 200 OK, redirect to /root
            return null;
            
        }
    } catch (error) {
        // If there's an error in the request, redirect to /root
        return null;
        
    };
    
}

// Function to send the token to the server
async function validateToken() {
    const token = tokenCookie;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    try {
    const response = await fetch("http://localhost:5500/api/user/checkToken", requestOptions);
    const result = await response.json();
    
    if (response.ok) {
            return result;
        } else {
            // If the response is not 200 OK, redirect to /root
            window.location.replace("/");
            
        }
    } catch (error) {
        // If there's an error in the request, redirect to /root
        window.location.replace("/");
        
    };
    
}

function renderInvoices(invoices) {
const invoiceList = document.getElementById('invoice-list');
invoiceList.innerHTML = ''; // Clear existing content

invoices.forEach(invoice => {
    const invoiceElement = document.createElement('div');
    invoiceElement.classList.add('d-flex', 'text-muted', 'pt-3');
    
    // Generate product list HTML
    const productList = invoice.products.map(product => 
        `<li>${product.name} - ${product.quantity} x $${product.price.toFixed(2)}</li>`
    ).join('');

    // Generate HTML content for each invoice
    invoiceElement.innerHTML = `
      <div class="pb-3 mb-0 border-bottom w-100">
          <div class="d-flex justify-content-between align-items-center">
              <strong class="text-gray-dark">Order #${invoice.invoiceNumber}</strong>
              <span class="badge ${invoice.paid ? 'bg-success' : 'bg-danger'}">
                  ${invoice.paid ? 'Paid' : 'Canceled'}
              </span>
          </div>
          <ul class="list-unstyled mt-2 mb-2">
              ${productList}
          </ul>
          <div class="d-flex justify-content-between align-items-center">
              <strong>Total Price:</strong>
              <span>$${invoice.totalPrice.toFixed(2)}</span>
          </div>
      </div>
  `;


    invoiceList.appendChild(invoiceElement);
});
}

document.getElementById('dashboardBtn').addEventListener('click', async (event) => {  

const token = tokenCookie;
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token);

const requestOptions = {
method: "GET",
headers: myHeaders,
redirect: "follow"
};

try {
const response = await fetch("http://localhost:5500/api/user/logout", requestOptions);      
if (response.ok) {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.replace("/");
} else {
  
  window.location.replace("/");     
  }
} catch (error) {
// If there's an error in the request, redirect to /root
window.location.replace("/");
  
};
});
