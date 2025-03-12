import { UI } from './ui';
import { AI } from './ai';
import { GameBrain } from './game';
import { WinLogic } from './winLogic';



let h1 = document.createElement('h1');
h1.innerHTML = 'Tic Tac Two';
document.body.appendChild(h1);


let game = new GameBrain();
let winLogic = new WinLogic();
let ui = new UI(game, handleMove, handleAI, checkWinFn);
let ai = new AI(game);

function handleAI(): void {
    if (game.playerX === 'AI' && game.currentPlayer === 'X' && game.remainingPiecesX <= 0 || game.playerO === 'AI' && game.currentPlayer === 'O' && game.remainingPiecesO <= 0) {
        game.changeTurn();
        ui.updatePlayers();
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

function handleMove(x: number, y: number, e: MouseEvent): void {
    if (game.gameState === 'Stopped') {
        return;
    }

    console.log(game.board[x][y]);
    if (game.board[x][y] !== undefined) {
        console.log('is null');
        return;  // Ignore the move if the cell is already occupied
    }
    
    console.log('clear', x, y, e);
    // new move
    updateCell(x, y, e);
    ui.updatePlayers();
    updateMoveOptions();
    checkWinFn();

    if ((game.currentPlayer === 'O' && game.playerO === 'AI') || (game.currentPlayer === 'X' && game.playerX === 'AI')) {
        handleAI();
    }
}


function updateCell(x: number, y: number, e: MouseEvent): void {
    if ((game.currentPlayer === 'X' && game.remainingPiecesX <= 0) || (game.currentPlayer === 'O' && game.remainingPiecesO <= 0)) {
        return;
    }

    game.makeAMove(x, y);
    (e.target as HTMLDivElement).innerHTML = game.board[x][y] || '&nbsp;';
}

function handleGridMove(direction: string): void {
  if (game.gameState === 'Stopped') {
      return;
  }
  console.log('handleGridMove', direction);
  game.moveGrid(direction);
  drawBoard();
  ui.updatePlayers();
  updateMoveOptions();
  checkWinFn();
  handleAI();
}


function updateMoveOptions(): void {
    let gridMoveElement = document.querySelector('.grid-panel');
    let pieceMoveElement = document.querySelector('.piece-move');
    if (game.currentPlayerCanMovePieceAndGrid()) {
        gridMoveElement!.innerHTML = 'Press to move the grid';
        let gridMoveElementArrows = ui.createGridMovePanelArrows(handleGridMove);
        gridMoveElement!.appendChild(gridMoveElementArrows);

        pieceMoveElement!.innerHTML = 'Drag your own piece to an open cell';
    } 
}

function checkWinFn(): void {
    let winner = winLogic.checkWin(game);
    if (winner) {
        let winnerElement = document.createElement('div');
        winnerElement.classList.add('winner');
        winnerElement.innerHTML = `Player ${winner} wins!`;
        document.body.appendChild(winnerElement);

        ui.stopTimer();

        ui.generateResetButton();

        let timerButton = document.querySelector('.timer-button');
        timerButton!.remove();

    }
}


function drawBoard() {
    let board = document.querySelector('.board');
    if (board) {
        board.remove();
    }

    board = ui.createBoard();

    let container = document.querySelector('.container');
    container!.appendChild(board);
}

let board = ui.drawUI();
document.body.appendChild(board);