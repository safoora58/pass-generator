const range = document.querySelector('#range');
const numberLength = document.querySelector('.number-length');
const generateButton = document.querySelector('#generate');
const includespaces = document.querySelector('#include-spaces');
const exclude = document.querySelector('#exclude');
const inputPassword = document.querySelector('#inputPassword');
const pass = document.querySelector('.pass');
const copyImage = document.querySelector('#copyImage');
const checkboxes = document.querySelectorAll('.checkbox');
const checkboxId = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+|[]{}:;.,<=>?/~"
}
const generatePass = () => {
    let totalPassword = '';
    randomIndex = '';
    duplicatePass = false;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            if (checkbox.id === "include-spaces") {
                totalPassword += `       ${totalPassword}       `;
            } else if (checkbox.id === "exclude") {
                duplicatePass = true;
            }
            else {
                totalPassword += checkboxId[checkbox.id];
            }
        }
    });
    for (let i = 0; i < range.value; i++) {
        let randompass = totalPassword[Math.floor(Math.random() * totalPassword.length)];
        if (duplicatePass) {
            !randomIndex.includes(randompass) || randompass == " " ? randomIndex += randompass : i--;
        } else {
            randomIndex += randompass;
        }
    }
    inputPassword.value = randomIndex;
}
const updatePassIndicator = () => {
    if (range.value <= 8) {
        pass.classList.add('weak');
        pass.classList.remove('medium');
        pass.classList.remove('strong');
    } else if (range.value <= 16) {
        pass.classList.add('medium');
        pass.classList.remove('weak');
        pass.classList.remove('strong');
    } else {
        pass.classList.add('strong');
        pass.classList.remove('medium');
        pass.classList.remove('weak');
    }
}
const showNumber = () => {
    const valueRange = range.value;
    numberLength.textContent = valueRange;
    generatePass();
    updatePassIndicator();
}
const copyPassword = () => {
    navigator.clipboard.writeText(inputPassword.value);
    copyImage.innerHTML = '<i class="bi bi-check-lg"></i>';
    setTimeout(() => {
        copyImage.innerHTML = '<img src="images/copy.png" class="copy">';
        const copy = document.querySelector('.copy');
        copy.classList.add('slide');
    }, 1200);
}
const setEventHandlers = (element , callback) => {
    element.oninput = callback;
    element.onclick = callback;
}
setEventHandlers(copyImage, copyPassword);
setEventHandlers(range, showNumber);
setEventHandlers(generateButton, generatePass);
showNumber();