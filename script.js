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

loadData();
