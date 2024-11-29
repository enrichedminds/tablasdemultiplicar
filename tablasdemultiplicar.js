let num1, num2, correctAnswer;
let score = 0; // Puntaje total
let timeRemaining = 60; // Tiempo límite en segundos
let timer;
let selectedTable;
let correctAnswers = 0; // Contador de respuestas correctas
let incorrectAnswers = 0; // Contador de respuestas incorrectas

function startGame(table) {
    selectedTable = table;
    score = 0;
    timeRemaining = 60;
    correctAnswers = 0; // Reinicia contador de correctas
    incorrectAnswers = 0; // Reinicia contador de incorrectas
    document.getElementById('selectionScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('score').textContent = `Puntaje: ${score}`;
    document.getElementById('timer').textContent = `Tiempo: ${timeRemaining}s`;
    document.getElementById('resultScreen').style.display = 'none'; // Oculta pantalla de resultados
    generateQuestion();
    startTimer();
}

function generateQuestion() {
    num1 = selectedTable === 'mixed' ? Math.floor(Math.random() * 9) + 1 : selectedTable;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;

    const options = new Set();
    options.add(correctAnswer); // Agrega la respuesta correcta primero

    // Genera opciones incorrectas únicas que también sean múltiplos de la tabla
    while (options.size < 4) {
        const multiplier = Math.floor(Math.random() * 10) + 1;
        const option = num1 * multiplier;
        options.add(option);
    }

    const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);

    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;

    // Asigna opciones a los círculos
    document.getElementById('target1').textContent = optionsArray[0];
    document.getElementById('target2').textContent = optionsArray[1];
    document.getElementById('target3').textContent = optionsArray[2];
    document.getElementById('target4').textContent = optionsArray[3];

    document.getElementById('feedback').textContent = ''; // Limpia el feedback
}

function checkAnswer(target) {
    const userAnswer = parseInt(target.textContent);
    const feedback = document.getElementById('feedback');
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');

    if (userAnswer === correctAnswer) {
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";
        correctSound.play(); // Reproduce sonido correcto
        score++;
        correctAnswers++; // Incrementa respuestas correctas
        document.getElementById('score').textContent = `Puntaje: ${score}`;
    } else {
        feedback.textContent = "Incorrecto.";
        feedback.style.color = "red";
        incorrectSound.play(); // Reproduce sonido incorrecto
        incorrectAnswers++; // Incrementa respuestas incorrectas
    }

    generateQuestion(); // Genera una nueva pregunta
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
    clearInterval(timer); // Detiene el cronómetro
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('selectionScreen').style.display = 'flex';
}

function endGame() {
    // Oculta la pantalla del juego
    document.getElementById('gameScreen').style.display = 'none';

    // Calcula el porcentaje de aciertos
    const totalAnswers = correctAnswers + incorrectAnswers;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    // Actualiza los valores en la pantalla de resultados
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
    document.getElementById('accuracy').textContent = accuracy;

    // Muestra la pantalla de resultados
    document.getElementById('resultScreen').style.display = 'flex';
}