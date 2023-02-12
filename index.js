console.log("Github is working!");

const element = document.querySelector('.input button');
console.log("this is the element");
element.addEventListener("click", () => {
    console.log("Button is pressed!");
    const input = document.querySelector(".input input");
    console.log(input.value);
})