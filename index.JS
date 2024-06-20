let timerEle = document.getElementById("timer");
let quoteEle = document.getElementById("quoteDisplay");
let resultEle = document.getElementById("result");
let textEle = document.getElementById("quoteInput");
let submitEle = document.getElementById("submitBtn");
let resetEle = document.getElementById("resetBtn");
let overlayEle = document.getElementById("overlay");
let urlEle = "https://apis.ccbp.in/random-quote";
let count = 0;
let quoteSen = "";
let uniqueId;

function fetchQuote() {
    overlayEle.style.display = "flex";
    fetch(urlEle)
        .then(response => response.json())
        .then(jsonData => {
            quoteSen = jsonData.content;
            quoteEle.textContent = quoteSen;
            overlayEle.style.display = "none";
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
            overlayEle.style.display = "none";
        });
}

function startTimer() {
    uniqueId = setInterval(function() {
        count += 1;
        timerEle.textContent = count + " seconds";
    }, 1000);
}

function resetTimer() {
    clearInterval(uniqueId);
    count = 0;
    timerEle.textContent = count + " seconds";
}

submitEle.addEventListener("click", function() {
    let textValue = textEle.value.trim();
    if (textValue === quoteSen) {
        clearInterval(uniqueId);
        resultEle.textContent = "Success! You typed the quote correctly.";
        resultEle.classList.remove("text-danger");
        resultEle.classList.add("text-success");
    } else {
        resultEle.textContent = "Error! The text does not match the quote.";
        resultEle.classList.remove("text-success");
        resultEle.classList.add("text-danger");
    }
});

resetEle.addEventListener("click", function() {
    resetTimer();
    fetchQuote();
    textEle.value = "";
    resultEle.textContent = "";
});

// Initial load
fetchQuote();
startTimer();