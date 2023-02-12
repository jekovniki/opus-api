const element = document.querySelector('.input button');
element.addEventListener("click", async () => {
    const input = document.querySelector(".input input");
    await fetchPost(input.value);
})

async function fetchPost(email) {
    console.log(1);
    console.log("TES1111T");
    const request = axios.create({
        withCredentials: false,
        headers: {
            "X-Auth-Token": "api-key 3321avhagseem8fntsnnhnbs90xaaea9",
            "Content-Type": "application/json",
        }
    })
    const response =  await request.post("https://api.getresponse.com/v3/contacts", {
        "email": email,
        "campaign": {
            "campaignId": "qA9mA"
        }
    });
    console.log(response.status);
}
