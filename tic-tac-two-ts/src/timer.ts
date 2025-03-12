import { GameBrain } from './game';


export class Timer {
    private timerInterval: number;
    private timerRunning: boolean;
    private elapsedTime: number;


    constructor() {
        this.timerInterval = 0;
        this.timerRunning = false;
        this.elapsedTime = 0;
    }

    createTimer(game: GameBrain): void {
        let timer = document.querySelector('.timer-container');
        if (timer) {
            return;
        } 
    
        let timerContainer = document.createElement('div');
        timerContainer.classList.add('timer-container');
    
        let timerDisplay = document.createElement('div');
        timerDisplay.classList.add('timer-display');
        timerDisplay.innerHTML = `Time: 0s`;
        timerContainer.appendChild(timerDisplay);
    
    
        let timerButton = document.createElement('button');
        timerButton.classList.add('timer-button');
        timerButton.innerHTML = 'Start Timer';
        timerButton.addEventListener('click', () => this.toggleTimer(game));
    
        timerContainer.appendChild(timerButton);
        document.body.appendChild(timerContainer);
    }
    
    toggleTimer(game: GameBrain) : void {
        let timerButton = document.querySelector('.timer-button');
        let timerDisplay = document.querySelector('.timer-display');

        if (!timerButton) {
            return;
        }

        if (this.timerRunning) {
            clearInterval(this.timerInterval);
            timerButton.innerHTML = 'Start Timer';
            game.gameState = 'Stopped';
        } else {
            game.gameState = 'Playing';
            this.timerInterval = setInterval(() => {
                this.elapsedTime++;
                timerDisplay!.innerHTML = `Time: ${this.elapsedTime}s`;
            }, 1000);
            timerButton.innerHTML = 'Stop Timer';
        }
    
        console.log("Updated Game State:", game.gameState);
        this.timerRunning = !this.timerRunning;
    }

    resetTimer() : void {
        clearInterval(this.timerInterval);
        this.timerInterval = 0;
        this.elapsedTime = 0;
        this.timerRunning = false;

        let timerDisplay = document.querySelector('.timer-display');
        let timerButton = document.querySelector('.timer-button');

        if (timerDisplay) timerDisplay.innerHTML = `Time: 0s`;
        if (timerButton) timerButton.innerHTML = 'Start Timer';
    }
}