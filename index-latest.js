console.log("Github is working!");

const element = document.querySelector('.input button');
console.log("this is the element");
element.addEventListener("click", async () => {
    const input = document.querySelector(".input input");
    await fetchPost(input.value);
})

async function fetchPost(email) {
    const request = axios.create({
        "X-Auth-Token": "api-key 3321avhagseem8fntsnnhnbs90xaaea9"
    })
    const response =  await request.post("https://api.getresponse.com/v3/contacts", {
        "email": email,
        "campaign": {
            "campaignId": "qA9mA"
        }
    });
    console.log(response.status);
}
