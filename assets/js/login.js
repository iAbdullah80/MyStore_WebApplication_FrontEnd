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
    const response = await fetch("http://localhost:8080/api/user/login", requestOptions);
    const result = await response.text();
    console.log(result)
    if (response.ok) {
        document.cookie = 'access_token=' + result + '; expires=' + new Date(Date.now() + 600000).toUTCString();
        window.location.href = "dashboard.html"; // Redirect to index.html if the response is 200 OK
        } else {
            const Failed_alert = document.getElementById("Failed_signup");
            Failed_alert.style.display = "block";
        }
    } catch (error) {
    console.error(error);
    };


};