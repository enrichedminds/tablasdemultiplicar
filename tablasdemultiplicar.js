let num1, num2, correctAnswer;
let score = 0;
let timeRemaining = 60; // Set time limit (in seconds)
let timer;
let selectedTable;

function startGame(table) {
    selectedTable = table;
    score = 0;
    timeRemaining = 60;
    document.getElementById('selectionScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('score').textContent = `Puntaje: ${score}`;
    document.getElementById('timer').textContent = `Tiempo: ${timeRemaining}s`;
    generateQuestion();
    startTimer();
}

function generateQuestion() {
    num1 = selectedTable === 'mixed' ? Math.floor(Math.random() * 9) + 1 : selectedTable;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;

    const options = new Set();
    options.add(correctAnswer); // Add correct answer first

    // Generate unique incorrect options that are multiples of the table
    while (options.size < 4) {
        const multiplier = Math.floor(Math.random() * 10) + 1; // Random multiplier
        const option = num1 * multiplier;
        options.add(option);
    }

    const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);

    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;

    // Assign options to targets
    document.getElementById('target1').textContent = optionsArray[0];
    document.getElementById('target2').textContent = optionsArray[1];
    document.getElementById('target3').textContent = optionsArray[2];
    document.getElementById('target4').textContent = optionsArray[3];

    document.getElementById('feedback').textContent = ''; // Clear feedback
}

function checkAnswer(target) {
    const userAnswer = parseInt(target.textContent);
    const feedback = document.getElementById('feedback');
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');

    if (userAnswer === correctAnswer) {
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";
        correctSound.play(); // Play correct sound
        score++;
        document.getElementById('score').textContent = `Puntaje: ${score}`;
    } else {
        feedback.textContent = "Incorrecto.";
        feedback.style.color = "red";
        incorrectSound.play(); // Play incorrect sound
    }

    generateQuestion(); // Generate new question immediately
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = `Tiempo: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function returnToMenu() {
    clearInterval(timer); // Stop the timer
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('selectionScreen').style.display = 'flex';
}

function endGame() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('selectionScreen').style.display = 'flex';
    alert(`¡Juego Terminado! Puntaje final: ${score}`);
}