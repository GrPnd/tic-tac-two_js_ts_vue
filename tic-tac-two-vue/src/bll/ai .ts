import { WinLogic } from './winLogic';
import { GameBrain } from './gameBrain';
import type { playerChar } from './gameBrain';

export class AI {
    private game: GameBrain;

    constructor(game: GameBrain) {
        this.game = game;
    }

    makeAMove(): void {
        if (this.game.currentPlayer == 'X' && this.game.remainingPiecesX <= 0 || this.game.currentPlayer == 'O' && this.game.remainingPiecesO <= 0) {
            return;
        }

        const winningMove = this.tryFindWinningMove();
        if (winningMove !== null) {
            return this.game.makeAMove(winningMove.x, winningMove.y);
        } 
        const blockingMove = this.tryFindBlockingMove();
        if (blockingMove !== null) {
            return this.game.makeAMove(blockingMove.x, blockingMove.y);
        }
        const randomMove = this.generateRandomMove();
        return this.game.makeAMove(randomMove.x, randomMove.y);   
    }


    tryFindWinningMove() {
        let winLogic = new WinLogic();

        for (let x = this.game.gridStartX; x <= this.game.gridEndX; x++) {
            for (let y = this.game.gridStartY; y <= this.game.gridEndY; y++) {
                if (this.game.board[x][y] !== undefined) {
                   continue;
                }
                this.game.board[x][y] = this.game.currentPlayer;
                if (winLogic.checkWin(this.game) === this.game.currentPlayer) {
                    this.game.board[x][y] = undefined;
                    return {x, y};
                }
                this.game.board[x][y] = undefined;
            }
        }
        return null;
    }


    tryFindBlockingMove() {
        let winLogic = new WinLogic();
        let enemy: playerChar = this.game.currentPlayer === 'X' ? 'O' : 'X';

        for (let x = this.game.gridStartX; x <= this.game.gridEndX; x++) {
            for (let y = this.game.gridStartY; y <= this.game.gridEndY; y++) {
                if (this.game.board[x][y] !== undefined) {
                   continue;
                }
                this.game.board[x][y] = enemy;
                if (winLogic.checkWin(this.game) === enemy) {
                    this.game.board[x][y] = undefined;
                    return {x, y};
                }
                this.game.board[x][y] = undefined;
            }
        }
        return null;
    }
    

    generateRandomMove() {
        let x = Math.floor(Math.random() * 5);
        let y = Math.floor(Math.random() * 5);
        return { x, y };
    }
}