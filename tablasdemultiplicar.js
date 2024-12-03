let num1, num2, correctAnswer;
let score = 0; // Puntaje total
let timeRemaining = 20; // Tiempo límite en segundos
let timer;
let selectedTable;
let correctAnswers = 0; // Contador de respuestas correctas
let incorrectAnswers = 0; // Contador de respuestas incorrectas
let incorrectResponses = []; // Lista para almacenar respuestas incorrectas

function startGame(table) {
    selectedTable = table;
    score = 0;
    timeRemaining = 60;
    correctAnswers = 0;
    incorrectAnswers = 0;
    incorrectResponses = []; // Reinicia respuestas incorrectas
    document.getElementById('selectionScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('score').textContent = `Puntaje: ${score}`;
    document.getElementById('timer').textContent = `Tiempo: ${timeRemaining}s`;
    document.getElementById('feedback').textContent = ''; // Limpia el feedback al iniciar
    generateQuestion();
    startTimer();
}

function generateQuestion() {
    num1 = selectedTable === 'mixed' ? Math.floor(Math.random() * 9) + 1 : selectedTable;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;

    const options = new Set([correctAnswer]);

    while (options.size < 4) {
        const option = num1 * (Math.floor(Math.random() * 10) + 1);
        options.add(option);
    }

    const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);

    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;

    document.getElementById('target1').textContent = optionsArray[0];
    document.getElementById('target2').textContent = optionsArray[1];
    document.getElementById('target3').textContent = optionsArray[2];
    document.getElementById('target4').textContent = optionsArray[3];
}

function checkAnswer(target) {
    const userAnswer = parseInt(target.textContent);
    const feedback = document.getElementById('feedback');
    if (userAnswer === correctAnswer) {
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";
        score++;
        correctAnswers++;
    } else {
        feedback.textContent = "Incorrecto.";
        feedback.style.color = "red";
        incorrectAnswers++;
        incorrectResponses.push(`${num1} x ${num2} = ${correctAnswer} (Tu respuesta: ${userAnswer})`);
    }
    document.getElementById('score').textContent = `Puntaje: ${score}`;
    generateQuestion();
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

function endGame() {
    document.getElementById('gameScreen').style.display = 'none';

    const totalAnswers = correctAnswers + incorrectAnswers;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
    document.getElementById('accuracy').textContent = accuracy;

    const incorrectList = document.getElementById('incorrectList');
    incorrectList.innerHTML = ""; // Limpia la lista
    if (incorrectResponses.length > 0) {
        incorrectResponses.forEach(response => {
            const listItem = document.createElement('li');
            listItem.textContent = response;
            incorrectList.appendChild(listItem);
        });
    } else {
        incorrectList.innerHTML = "<li>No hubo respuestas incorrectas</li>";
    }

    document.getElementById('resultScreen').style.display = 'flex';
}

function returnToMenu() {
    clearInterval(timer);
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('selectionScreen').style.display = 'flex';
}