const buttons = document.querySelectorAll('button');
const inputField = document.getElementById("result");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.querySelector(".clear-history");
let calculationHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Load history on page load
loadHistory();

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",()=>{
        console.log(buttons[i].textContent);
        const buttonValue = buttons[i].textContent;
        if (buttonValue === "C") {
            clearResult()
        }else if(buttonValue === "="){
            calulateResult()
        }else if(buttonValue === "Clear History") {
            clearAllHistory()
        }else {
            appendValue(buttonValue)
        }           
    })
}

clearHistoryBtn?.addEventListener("click", clearAllHistory);

function clearResult() {
    inputField.value = ""
}

function calulateResult() {
    const expression = inputField.value;
    const result = eval(expression);
    inputField.value = result;
    
    // Add to history
    const historyItem = `${expression} = ${result}`;
    calculationHistory.unshift(historyItem);
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
    loadHistory();
}

function appendValue(buttonValue) {
    inputField.value += buttonValue
}

function loadHistory() {
    historyList.innerHTML = "";
    calculationHistory.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
            const result = item.split(" = ")[1];
            inputField.value = result;
        });
        historyList.appendChild(li);
    });
}

function clearAllHistory() {
    calculationHistory = [];
    localStorage.removeItem('calcHistory');
    loadHistory();
}

