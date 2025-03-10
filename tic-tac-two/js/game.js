export class GameBrain {
    #board;

    constructor() { 
    // private
    this.#board = [[], [], [], [], []];

    this.gridStartX = 1;
    this.gridStartY = 1;
    this.gridEndX = 3;
    this.gridEndY = 3;
    
    this.currentPlayer = 'X';
    this.remainingPiecesX = 4;
    this.remainingPiecesO = 4;

    this.gameType = 'PvP';
    this.gameState = 'Stopped'

    this.playerX = 'Player';
    this.playerO = 'Player';
    }

    makeAMove(x, y) {
        if (this.#board[x][y] === undefined) {
            this.#board[x][y] = this.currentPlayer;
            if (this.currentPlayer === 'X') {
                this.remainingPiecesX--;
            } else {
                this.remainingPiecesO--;
            }
            this.changeTurn();
        }
    }

    get board() {
        return this.#board;
    }


    moveGrid(direction) {

        // Check if the grid will still be within bounds after the move
        let newGridStartX = this.gridStartX;
        let newGridStartY = this.gridStartY;

        switch (direction)
        {
            case "centre":
                break;
            case "up":
                newGridStartY--;
                break;

            case "down":
                newGridStartY++;
                break;

            case "left":
                newGridStartX--;
                break;

            case "right":
                newGridStartX++;
                break;

            case "up-left":
                newGridStartX--;
                newGridStartY--;
                break;

            case "up-right":
                newGridStartX++;
                newGridStartY--;
                break;

            case "down-left":
                newGridStartX--;
                newGridStartY++;
                break;

            case "down-right":
                newGridStartX++;
                newGridStartY++;
                break;
        }

        if (this.gridIsPlacedInBounds(newGridStartX, newGridStartY)) {
            this.gridStartX = newGridStartX;
            this.gridStartY = newGridStartY;
            this.gridEndX = this.gridStartX + 2;
            this.gridEndY = this.gridStartY + 2;
            this.changeTurn();
            return;
        }
        return;
    }
        

    gridIsPlacedInBounds(gridXStart, gridYStart) {
        var gridXEnd = gridXStart + 2;
        var gridYEnd = gridYStart + 2;

        return gridXStart >= 0 && gridYStart >= 0 && gridXEnd < 5 && gridYEnd < 5;
    }


    changeTurn() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }


    resetGame() {
        this.#board = [[], [], [], [], []];
        this.currentPlayer = 'X';
        this.gridStartX = 1;
        this.gridStartY = 1;
        this.gridEndX = 3;
        this.gridEndY = 3;
        this.remainingPiecesX = 4;
        this.remainingPiecesO = 4;
        this.gameState = 'Stopped'
    }


    isCurrentPlayersCell(x, y) {
        console.log('isCurrentPlayersCell', x, y, this.#board[x][y], this.currentPlayer);
        return this.#board[x][y] === this.currentPlayer;
    }

    currentPlayerCanMovePieceAndGrid() {
        return (this.remainingPiecesX <= 2 && this.currentPlayer === 'X') || (this.remainingPiecesO <= 2 && this.currentPlayer === 'O');
    }

    isCellInGrid(x, y) {
        return x >= this.gridStartX && x <= this.gridEndX &&
        y >= this.gridStartY && y <= this.gridEndY;
    }
    
}