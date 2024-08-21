async function signup() {
    const first_name = document.getElementById("first_name")
    const last_name = document.getElementById("last_name")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "firstName": first_name.value,
    "lastName": last_name.value,
    "email": email.value,
    "password": password.value
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    try {
    const response = await fetch("http://localhost:5500/user/signup", requestOptions);
    if (response.status === 200) {
        const success_alert = document.getElementById("success_signup");
        const Failed_alert = document.getElementById("Failed_signup");
        const form = document.getElementById("form_signup");
        Failed_alert.style.display = "none";
        success_alert.style.display = "block";
        form.style.display = "none";
        
    }
    else {
        const Failed_alert = document.getElementById("Failed_signup");
        Failed_alert.style.display = "block";
    }
    

    } catch (error) {
    const Failed_alert = document.getElementById("Failed_signup");
    Failed_alert.style.display = "block";
    console.error(error);
    };
};