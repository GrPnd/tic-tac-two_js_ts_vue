import { UI } from './ui.js';
import { AI } from './ai.js';
import { GameBrain } from './game.js';
import { WinLogic } from './winLogic.js';



let h1 = document.createElement('h1');
h1.innerHTML = 'Tic Tac Two';
document.body.appendChild(h1);


let game = new GameBrain();
let winLogic = new WinLogic();
let ui = new UI(game, handleMove, handleAI, checkWinFn);
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
    ui.updatePlayers();
    updateMoveOptions();
    checkWinFn();
    return;
}

function handleMove(x, y, e) {
    if (game.gameState === 'Stopped') {
        return;
    }
    
    // new move
    updateCell(x, y, e);
    ui.updatePlayers();
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
    console.log('handleGridMove', direction);
    game.moveGrid(direction);
    drawBoard();
    ui.updatePlayers();
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


function updateMoveOptions() {
    let gridMoveElement = document.querySelector('.grid-panel');
    let pieceMoveElement = document.querySelector('.piece-move');
    if (game.currentPlayerCanMovePieceAndGrid()) {
        gridMoveElement.innerHTML = 'Press to move the grid';
        let gridMoveElementArrows = ui.createGridMovePanelArrows(handleGridMove);
        gridMoveElement.appendChild(gridMoveElementArrows);

        pieceMoveElement.innerHTML = 'Drag your own piece to an open cell';
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

        ui.generateResetButton();

        let timerButton = document.querySelector('.timer-button');
        timerButton.remove();

    }
}


function drawBoard() {
    let board = document.querySelector('.board');
    board.remove();

    board = ui.createBoard();

    let container = document.querySelector('.container');
    container.appendChild(board);
}

let board = ui.drawUI(game, handleMove, handleAI, checkWinFn);
document.body.appendChild(board);