export type playerChar = 'X' | 'O';

export class GameBrain {
    private _board: (playerChar | undefined)[][];

    public gridStartX: number;
    public gridStartY: number;
    public gridEndX: number;
    public gridEndY: number;

    public currentPlayer: playerChar;
    public remainingPiecesX: number;
    public remainingPiecesO: number;

    public gameType: string;
    public gameState: string;
    public isWon: boolean;
    public winner: string;
    
    public playerX: string;
    public playerO: string;


    constructor() { 
        this._board = Array(5).fill(null).map(() => Array(5).fill(undefined));


    this.gridStartX = 1;
    this.gridStartY = 1;
    this.gridEndX = 3;
    this.gridEndY = 3;
    
    this.currentPlayer = 'X';
    this.remainingPiecesX = 4;
    this.remainingPiecesO = 4;

    this.gameType = 'PvP';
    this.gameState = 'Stopped'
    this.isWon = false;
    this.winner = '';

    this.playerX = 'Player';
    this.playerO = 'Player';
    }

    makeAMove(x: number, y: number): void {
        if (this.gameState == 'Stopped') {
            return;
        }

        if (this._board[x][y] === undefined) {
            this._board[x][y] = this.currentPlayer;
            if (this.currentPlayer === 'X') {
                this.remainingPiecesX--;
            } else {
                this.remainingPiecesO--;
            }
            this.changeTurn();
        }
    }

    get board(): (playerChar | undefined)[][] {
        return this._board;
    }


    moveGrid(direction: string): void {
        if (this.gameState == 'Stopped') {
            return;
        }
        
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
        

    gridIsPlacedInBounds(gridXStart: number, gridYStart: number): boolean {
        var gridXEnd = gridXStart + 2;
        var gridYEnd = gridYStart + 2;

        return gridXStart >= 0 && gridYStart >= 0 && gridXEnd < 5 && gridYEnd < 5;
    }

    changeTurn(): void {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    isCurrentPlayersCell(x: number, y: number): boolean {
        return this._board[x][y] === this.currentPlayer;
    }

    currentPlayerCanMovePieceAndGrid(): boolean {
        return (this.remainingPiecesX <= 2 && this.currentPlayer === 'X') || (this.remainingPiecesO <= 2 && this.currentPlayer === 'O');
    }

    isGridCell(x: number, y: number): boolean {
        return x >= this.gridStartX && x <= this.gridEndX &&
        y >= this.gridStartY && y <= this.gridEndY;
    }

    resetGame(): void {
        this._board = Array(5).fill(null).map(() => Array(5).fill(undefined));
        this.currentPlayer = 'X';
        this.gridStartX = 1;
        this.gridStartY = 1;
        this.gridEndX = 3;
        this.gridEndY = 3;
        this.remainingPiecesX = 4;
        this.remainingPiecesO = 4;
        this.gameState = 'Stopped'
        this.isWon = false;
        this.winner = '';
    }
    
}