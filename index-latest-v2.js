const element = document.querySelector('.input button');
element.addEventListener("click", async () => {
    const input = document.querySelector(".input input");
    await fetchPost(input.value);
})

async function fetchPost(email) {
    console.log(1);
    console.log(email);
    const request = axios.create({
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "X-Auth-Token": "api-key 3321avhagseem8fntsnnhnbs90xaaea9",
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.29.2"
    })
    const response =  await request.post("https://api.getresponse.com/v3/contacts", {
        "email": email,
        "campaign": {
            "campaignId": "qA9mA"
        }
    });
    console.log(response.status);
}
