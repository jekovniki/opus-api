console.log("Github is working!");
const axios = reuqire('axios');

const element = document.querySelector('.input button');
console.log("this is the element");
element.addEventListener("click", () => {
    console.log("Button is pressed!");
    const input = document.querySelector(".input input");
    console.log(input.value);
})

async function fetchPost() {
    const request = axios.create({});
    const response =  await request.post("https://reqres.in/api/users", {
        "name": "morpheus",
        "job": "leader"
    });
    console.log(response);
}

await fetchPost();