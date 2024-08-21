 async function login() {
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
    const response = await fetch("https://mystore-api.alahideb.me:8443/user/login", requestOptions);
    const result = await response.text();
    if (response.ok) {
        document.cookie = 'access_token=' + result + '; path=/'+ '; expires=' + new Date(Date.now() + 600000).toUTCString();
        window.location.href = "../dashboard"; // Redirect to index.html if the response is 200 OK
        } else {
            const Failed_alert = document.getElementById("Failed_signup");
            Failed_alert.style.display = "block";
        }
    } catch (error) {
    console.error(error);
    };


};