const element = document.querySelector('.input button');
element.addEventListener("click", async () => {
    const input = document.querySelector(".input input");
    await fetchPost(input.value);
})

async function fetchPost(email) {
    console.log(1);
    console.log("aaa");
    const request = axios.create({
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": "api-key 3321avhagseem8fntsnnhnbs90xaaea9",
        }
    })
    const response =  await request.post("https://cors-anywhere.herokuapp.com/http://api.getresponse.com/v3/contacts", {
        "email": email,
        "campaign": {
            "campaignId": "qA9mA"
        }
    });
    console.log(response.status);
}
