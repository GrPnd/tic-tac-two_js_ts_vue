import { UI } from './ui.js';
import { AI } from './ai.js';
import { GameBrain } from './game.js';
import { WinLogic } from './winLogic.js';



let h1 = document.createElement('h1');
h1.innerHTML = 'Tic Tac Two';
document.body.appendChild(h1);


let game = new GameBrain();
let winLogic = new WinLogic();
let ui = new UI(game, handleMove, handleAI);
let ai = new AI(game);

function handleAI() {
    if (game.playerX === 'AI' && game.currentPlayer === 'X' && game.remainingPiecesX <= 0 || game.playerO === 'AI' && game.currentPlayer === 'O' && game.remainingPiecesO <= 0) {
        game.changeTurn();
        updatePlayers();
        updateMoveOptions();
        return;
    }

    ai.makeAMove();
    drawBoard();
    updatePlayers();
    updateMoveOptions();
    checkWinFn();
    return;
}

function handleMove(x, y, e) {
    if (game.gameState === 'Stopped') {
        return;
    }

    // move piece
    if (game.remainingPiecesX <= 2 && game.currentPlayer === 'X' && game.board[x][y] === 'X' || game.remainingPiecesO <= 2 && game.currentPlayer === 'O' && game.board[x][y] === 'O') {

        game.board[x][y] = undefined;
        e.target.innerHTML = '&nbsp;';
        if (game.currentPlayer === 'X') {
            game.remainingPiecesX++;
        }
        else {
            game.remainingPiecesO++;
        }
        checkWinFn();
        return;
    }
    
    // new move
    updateCell(x, y, e);
    updatePlayers();
    updateMoveOptions();
    checkWinFn();

    if (game.currentPlayer === 'O' && game.playerO === 'AI' || game.currentPlayer === 'X' && game.playerX === 'AI') {
        handleAI();
        return;
    }
}

function handleGridMove(direction) {
    if (game.gameState === 'Stopped') {
        return;
    }
    
    game.moveGrid(direction);
    drawBoard();
    updatePlayers();
    updateMoveOptions();
    checkWinFn();
}

function updateCell(x, y, e) {
    if (game.remainingPiecesX === 0 && game.remainingPiecesO === 0) {
        return;
    }
    game.makeAMove(x, y);
    e.target.innerHTML = game.board[x][y] || '&nbsp;';
}

function updatePlayers() {
    let currentPlayerElement = document.querySelector('.current-player');
    currentPlayerElement.innerHTML = `Current Player: ${game.currentPlayer}`;

    let remainingPiecesXElement = document.querySelector('.remaining-pieces-x');
    remainingPiecesXElement.innerHTML = `Remaining Pieces X: ${game.remainingPiecesX}`;

    let remainingPiecesOElement = document.querySelector('.remaining-pieces-o');
    remainingPiecesOElement.innerHTML = `Remaining Pieces O: ${game.remainingPiecesO}`;
}

function updateMoveOptions() {
    let gridMoveElement = document.querySelector('.grid-panel');
    let pieceMoveElement = document.querySelector('.piece-move');

    if (game.remainingPiecesX <= 2 && game.currentPlayer === 'X' || game.remainingPiecesO <= 2 && game.currentPlayer === 'O') {
        gridMoveElement.innerHTML = 'Press to move the grid';
        let gridMoveElementArrows = ui.createGridMovePanelArrows(handleGridMove);
        gridMoveElement.appendChild(gridMoveElementArrows);

        pieceMoveElement.innerHTML = 'Press your own piece to move it';
    } 
}

function checkWinFn() {
    let winner = winLogic.checkWin(game);
    if (winner) {
        let winnerElement = document.createElement('div');
        winnerElement.classList.add('winner');
        winnerElement.innerHTML = `Player ${winner} wins!`;
        document.body.appendChild(winnerElement);

        ui.stopTimer(game);

        generateResetButton();

        let timerButton = document.querySelector('.timer-button');
        timerButton.remove();

    }
}

function generateResetButton() {
    let resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset';
    resetButton.classList.add('reset-button');
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', () => { 
        game.resetGame();
        ui.resetTimer();

        document.body.innerHTML = '';
        document.body.appendChild(h1);
        board = ui.drawUI(game, handleMove, handleAI);
        document.body.appendChild(board);
    });
}


function drawBoard() {
    let board = document.querySelector('.board');
    board.remove();

    board = ui.createBoard();
    document.body.appendChild(board);
}

let board = ui.drawUI(game, handleMove, handleAI);
document.body.appendChild(board);