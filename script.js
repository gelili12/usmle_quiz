let data = [];
let currentQuestion = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function loadData() {
    const response = await fetch("questions.jsonl");
    const text = await response.text();
    const lines = text.split("\n").filter(line => line.trim() !== "");

    for (const line of lines) {
        data.push(JSON.parse(line));
    }

    shuffleArray(data);
    displayQuestion();
}

function displayQuestion() {
    const questionData = data[currentQuestion];
    document.getElementById("question").textContent = questionData.question;

    let optionsHtml = "";
    for (const key in questionData.options) {
        optionsHtml += `<button onclick="checkAnswer('${key}')" class="option">${key}: ${questionData.options[key]}</button>`;
    }

    document.getElementById("options").innerHTML = optionsHtml;
}

function checkAnswer(selectedOption) {
    const questionData = data[currentQuestion];
    const correctOption = questionData.answer_idx;

    let answerText = "";
    if (selectedOption === correctOption) {
        answerText = "Correct!";
    } else {
        answerText = `Incorrect. The correct answer is: ${correctOption}. ${questionData.answer}`;
    }

    document.getElementById("answer").textContent = answerText;
    document.getElementById("next").style.display = "block";
}

function nextQuestion() {
    if (currentQuestion < data.length - 1) {
        currentQuestion++;
        displayQuestion();
        const answer = document.getElementById("answer");
        answer.textContent = "";
        document.getElementById("next").style.display = "none";
    } else {
        document.getElementById("answer").textContent = "No more questions!";
        document.getElementById("next").style.display = "none";
    }
}

loadData();
