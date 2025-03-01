import { WinLogic } from './winLogic.js';

export class AI {
    constructor(game) {
        this.game = game;
    }

    makeAMove() {
        if (this.tryFindWinningMove()) {
            this.game.makeAMove(this.tryFindWinningMove().x, this.tryFindWinningMove().y);
        }
        else if (this.tryFindBlockingMove()) {
            this.game.makeAMove(this.tryFindBlockingMove().x, this.tryFindBlockingMove().y);
        }
        else {
            this.game.makeAMove(this.generateRandomMove().x, this.generateRandomMove().y);
        }
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
        let enemy = this.game.currentPlayer === 'X' ? 'O' : 'X';

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