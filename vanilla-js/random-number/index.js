"use strict";
const userInput = document.getElementById('user-input');
const result = document.getElementById('result');
const container = document.getElementById('container');
const btn = document.getElementById('sub-btn');
let number;
let rand;
let attempts = 0;
// Initialize game
function initializeGame() {
    let userNumber = prompt("Choose a number: 1 - 1000");
    if (!userNumber || isNaN(Number(userNumber)) || Number(userNumber) <= 0) {
        alert("Invalid input! Defaulting to 100.");
        number = 100;
    }
    else {
        number = Number(userNumber);
    }
    rand = Math.floor(Math.random() * number) + 1;
    attempts = 0;
    userInput.placeholder = `Guess a number 1-${number}`;
    console.log(`Random number: ${rand}`); // For debugging
}
// Start the game
initializeGame();
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
    const inputValue = Number(userInput.value.trim());
    result.style.display = 'none';
    if (isNaN(inputValue) || inputValue < 1 || inputValue > number) {
        result.style.display = 'block';
        result.style.color = '#fff';
        result.style.backgroundColor = '#f44336';
        result.textContent = `Enter a number between 1 - ${number}`;
        return;
    }
    attempts++;
    if (rand === inputValue) {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)';
        result.textContent = `🎉 Congratulations! You guessed the number ${rand} in ${attempts} attempts!`;
        resetGame();
    }
    else if (inputValue < rand) {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)';
        result.textContent = `Your guess is too low. Try again!`;
    }
    else {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)';
        result.textContent = `Your guess is too high. Try again!`;
    }
});
function resetGame() {
    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Play Again!!!";
    resetBtn.style.marginTop = '10px';
    resetBtn.style.background = '#4caf50';
    resetBtn.style.color = '#fff';
    resetBtn.style.padding = '10px 20px';
    resetBtn.style.border = 'none';
    resetBtn.style.borderRadius = '8px';
    resetBtn.style.cursor = 'pointer';
    resetBtn.style.fontSize = '1rem';
    resetBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    resetBtn.addEventListener('click', () => {
        initializeGame();
        result.style.display = "none";
        userInput.value = "";
        btn.style.display = "block";
        resetBtn.remove();
        userInput.focus();
    });
    btn.style.display = "none";
    container.appendChild(resetBtn);
}
