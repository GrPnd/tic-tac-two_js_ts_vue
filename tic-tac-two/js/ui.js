import { Timer } from './timer.js';

export class UI {
    constructor(game, handleMoveFn, aiFn) {
        this.game = game;
        this.handleMoveFn = handleMoveFn;
        this.aiFn = aiFn;
        this.timer = new Timer();
    }

    drawUI() {
        this.chooseGameMode();

        let container = document.createElement('div');
        container.classList.add('container');

        let board = this.createBoard();
        container.appendChild(board);

        let infoPanel = this.createPlayerInfoPanel();
        container.appendChild(infoPanel);

        let playerOptions = this.createOptionsPanel();
        container.appendChild(playerOptions);

        return container;
    }


    chooseGameMode() {
        let gameModeContainer = document.createElement('div');
        gameModeContainer.classList.add('game-mode-container');

        let gameMode = document.createElement('div');
        gameMode.classList.add('game-mode');
        gameMode.innerHTML = 'Choose Game Mode';

        let pvp = document.createElement('button');
        pvp.classList.add('pvp');
        pvp.innerHTML = 'Player vs Player';
        pvp.addEventListener('click', () => {
            this.timer.createTimer(this.game);
            this.game.gameType = 'PvP';
            document.querySelector('.game-mode').remove();
        });

        let pva = document.createElement('button');
        pva.classList.add('pva');
        pva.innerHTML = 'Player vs AI';
        pva.addEventListener('click', () => {
            this.timer.createTimer(this.game);
            this.game.gameType = 'PvA';
            document.querySelector('.game-mode').remove();
            this.createPlayerPieceSelection(gameModeContainer);
        });

        gameMode.appendChild(pvp);
        gameMode.appendChild(pva);

        gameModeContainer.appendChild(gameMode);

        document.body.appendChild(gameModeContainer);
    }

    createPlayerPieceSelection(gameModeContainer) {
        let playerPieceSelection = document.createElement('div');
        playerPieceSelection.classList.add('player-piece-selection');
        playerPieceSelection.innerHTML = 'Choose your piece';

        let x = document.createElement('button');
        x.classList.add('x');
        x.innerHTML = 'X';
        x.addEventListener('click', () => {
            this.game.playerO = 'AI';
            gameModeContainer.remove();
        });

        let o = document.createElement('button');
        o.classList.add('o');
        o.innerHTML = 'O';
        o.addEventListener('click', () => {
            this.game.playerX = 'AI';
            gameModeContainer.remove();
            this.aiFn();
            this.timer.toggleTimer(this.game);
        });

        playerPieceSelection.appendChild(x);
        playerPieceSelection.appendChild(o);

        gameModeContainer.appendChild(playerPieceSelection);
    }


    createBoard() {
        this.checkAndHandleAiMove();

        let board = document.createElement('div');
        board.classList.add('board');

        for (let i = 0; i < 5; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');

                if (
                    i >= this.game.gridStartX && i <= this.game.gridEndX &&
                    j >= this.game.gridStartY && j <= this.game.gridEndY
                ) {
                    cell.classList.add('grid');
                }

                cell.addEventListener('click', (e) => {
                    this.handleMoveFn(i, j, e);
                });

                cell.innerHTML = this.game.board[i][j] || '&nbsp;';
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
        return board;
    }


    checkAndHandleAiMove() {
    console.log('asd');
        if (this.game.currentPlayer === 'X' && this.game.playerX === 'AI') {
            this.aiFn();
        }
    }


    createPlayerInfoPanel() {
        let playerInfoPanel = document.createElement('div');
        playerInfoPanel.classList.add('player-info-panel');

        let currentPlayer = document.createElement('div');
        currentPlayer.classList.add('current-player');
        currentPlayer.innerHTML = `Current Player: ${this.game.currentPlayer}`;

        let remainingPiecesX = document.createElement('div');
        remainingPiecesX.classList.add('remaining-pieces-x');
        remainingPiecesX.innerHTML = `Remaining Pieces X: ${this.game.remainingPiecesX}`;

        let remainingPiecesO = document.createElement('div');
        remainingPiecesO.classList.add('remaining-pieces-o');
        remainingPiecesO.innerHTML = `Remaining Pieces O: ${this.game.remainingPiecesO}`;

        playerInfoPanel.appendChild(currentPlayer);
        playerInfoPanel.appendChild(remainingPiecesX);
        playerInfoPanel.appendChild(remainingPiecesO);

        return playerInfoPanel;
    }

    createOptionsPanel() {
        let optionsPanel = document.createElement('div');
        optionsPanel.classList.add('options-panel');

        let newPieceElement = document.createElement('div');
        newPieceElement.classList.add('new-piece');
        newPieceElement.innerHTML = 'Press to place a new piece';

        let gridMoveElement = document.createElement('div');
        gridMoveElement.classList.add('grid-panel');

        let pieceMoveElement = document.createElement('div');
        pieceMoveElement.classList.add('piece-move');

        let errorPanel = document.createElement('div');
        errorPanel.classList.add('error-panel');

        optionsPanel.appendChild(errorPanel);
        optionsPanel.appendChild(gridMoveElement);
        optionsPanel.appendChild(pieceMoveElement);
        optionsPanel.appendChild(newPieceElement);
        
        return optionsPanel;
    }

    createGridMovePanelArrows(gridMoveFn) {
        let gridInfoPanel = document.createElement('div');
        gridInfoPanel.classList.add('grid-arrows-panel');

        const arrows = [
            { class: 'up-left', symbol: '↖' },
            { class: 'up', symbol: '↑' },
            { class: 'up-right', symbol: '↗' },
            { class: 'left', symbol: '←' },
            { class: 'center', symbol: '' },
            { class: 'right', symbol: '→' },
            { class: 'down-left', symbol: '↙' },
            { class: 'down', symbol: '↓' },
            { class: 'down-right', symbol: '↘' }
        ];

        arrows.forEach(arrow => {
            let button = document.createElement('button');
            button.classList.add('arrow-btn', arrow.class);
            button.innerHTML = arrow.symbol;

            if (arrow.class === 'center') {
                button.disabled = true;
            }

            button.addEventListener('click', () => {
                gridMoveFn(arrow.class);
            });

            gridInfoPanel.appendChild(button);
        });

        return gridInfoPanel;
    }

    stopTimer() {
        this.timer.toggleTimer(this.game);
    }

    resetTimer() {
        this.timer.resetTimer();
    }
}
