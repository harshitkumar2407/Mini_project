const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+";
const btn = document.querySelector(".btn");
const inputE1 =document.querySelector("#input");
const copyIconE1 = document.querySelector(".fa-copy");
const alertContainerE1 = document.querySelector(".alert-container");

// Initialize with a default password on page load
window.addEventListener('DOMContentLoaded', () => {
    const password = createPassword();
    inputE1.value = password;
});

btn.addEventListener("click",()=>{
    const password = createPassword()
    inputE1.value = password
})

copyIconE1.addEventListener("click", ()=>{
    copyPassword()


    alertContainerE1.classList.remove("active");
    setTimeout(()=>{
        alertContainerE1.classList.add("active");
    },1000)
})

function createPassword() {
    const passwordLength = 14;
    let password = ""
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * characters.length)
        password += characters.charAt(randomNumber)
    }
    console.log( password);     
    alertContainerE1.innerHTML = password + "   Copied"
    return password
}

function copyPassword() {
    if (!inputE1.value) return; // Prevent copying empty password
    inputE1.select();
    inputE1.setSelectionRange(0 , 9999);

    navigator.clipboard.writeText(inputE1.value)
}