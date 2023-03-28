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

    // Disable the option buttons after checking the answer
    const optionButtons = document.getElementsByClassName("option");
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const numberOfQuestionsToLoad = 20;

async function loadData() {
    const response = await fetch("questions.jsonl");
    const text = await response.text();
    const lines = text.split("\n").filter(line => line.trim() !== "");

    const allData = [];
    for (const line of lines) {
        allData.push(JSON.parse(line));
    }

    shuffleArray(allData);

    for (let i = 0; i < numberOfQuestionsToLoad; i++) {
        data.push(allData[i]);
    }

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
