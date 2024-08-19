

document.querySelector('.btn.btn-primary.shadow.d-block.w-100').addEventListener('click', async function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));
    

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    try {
    const response = await fetch("http://localhost:8080/api/user/login", requestOptions);
    const result = await response.text();
    document.cookie = 'access_token=' + result + '; expires=' + new Date(Date.now() + 120000).toUTCString();
    console.log(result)
    if (response.ok) {
            window.location.href = "dashboard.html"; // Redirect to index.html if the response is 200 OK
        } else {
            window.location.href = "signup.html"; // Redirect to signup.html if the response is not 200 OK
        }
    } catch (error) {
    console.error(error);
    };


});