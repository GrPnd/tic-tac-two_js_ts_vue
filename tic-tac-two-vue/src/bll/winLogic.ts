import { GameBrain } from "./gameBrain";

export class WinLogic {
    
    checkWin(game: GameBrain): string | null {
        let board = game.board;
        let gridStartX = game.gridStartX;
        let gridStartY = game.gridStartY;
        let gridEndX = game.gridEndX;
        let gridEndY = game.gridEndY;

        // check rows
        for (let i = gridStartX; i <= gridEndX; i++) {
            if (board[i][gridStartY] === board[i][gridStartY + 1] && board[i][gridStartY] === board[i][gridStartY + 2]) {
                return board[i][gridStartY] ?? null;
            }
        }

        // check columns
        for (let i = gridStartY; i <= gridEndY; i++) {
            if (board[gridStartX][i] === board[gridStartX + 1][i] && board[gridStartX][i] === board[gridStartX + 2][i]) {
                return board[gridStartX][i] ?? null;
            }
        }

        // check diagonals
        if (board[gridStartX][gridStartY] === board[gridStartX + 1][gridStartY + 1] && board[gridStartX][gridStartY] === board[gridStartX + 2][gridStartY + 2]) {
            return board[gridStartX][gridStartY] ?? null;
        }

        if (board[gridStartX + 2][gridStartY] === board[gridStartX + 1][gridStartY + 1] && board[gridStartX + 2][gridStartY] === board[gridStartX][gridStartY + 2]) {
            return board[gridStartX + 2][gridStartY] ?? null;
        }

        return null;
    }
}