let data = [];

async function loadData() {
    const response = await fetch("questions.jsonl");
    const text = await response.text();
    const lines = text.split("\n").filter(line => line.trim() !== "");

    for (const line of lines) {
        data.push(JSON.parse(line));
    }

    displayQuestion();
}

let currentQuestion = 0;

function displayQuestion() {
    const question = document.getElementById("question");
    const optionA = document.getElementById("A");
    const optionB = document.getElementById("B");
    const optionC = document.getElementById("C");
    const optionD = document.getElementById("D");

    question.textContent = data[currentQuestion].question;
    optionA.textContent = data[currentQuestion].options.A;
    optionB.textContent = data[currentQuestion].options.B;
    optionC.textContent = data[currentQuestion].options.C;
    optionD.textContent = data[currentQuestion].options.D;
}

function checkAnswer(option) {
    const answer = document.getElementById("answer");
    if (option === data[currentQuestion].answer_idx) {
        answer.textContent = "Correct! The answer is " + data[currentQuestion].answer;
    } else {
        answer.textContent = "Incorrect! The correct answer is " + data[currentQuestion].answer;
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function loadData() {
    // ... (existing loadData() function content) ...
    shuffleArray(data);
    displayQuestion();
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

function checkAnswer(option) {
    // ... (existing checkAnswer() function content) ...
    document.getElementById("next").style.display = "block";
}


loadData();
