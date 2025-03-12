import { Timer } from './timer';
import { GameBrain } from './game';

type handleMoveType = (x: number, y: number, e: MouseEvent) => void;
type aiFnType = () => void;
type checkWinFnType = () => void;
type handleGridMoveType = (direction: string) => void;


export class UI {
    private game: GameBrain;
    private handleMoveFn: handleMoveType;
    private aiFn: aiFnType;
    private checkWinFn: checkWinFnType;
    private timer: Timer;


    constructor(game: GameBrain, handleMoveFn: handleMoveType, aiFn: aiFnType, checkWinFn: checkWinFnType) {
        this.game = game;
        this.handleMoveFn = handleMoveFn;
        this.aiFn = aiFn;
        this.checkWinFn = checkWinFn;
        this.timer = new Timer();
    }

    drawUI(): HTMLElement {
        let container = document.createElement('div');
        container.classList.add('container');

        let gameModes = this.chooseGameMode();
        container.appendChild(gameModes);

        let board = this.createBoard();
        container.appendChild(board);

        let rightPanel = document.createElement('div');
        rightPanel.classList.add('right-panel');

        let infoPanel = this.createPlayerInfoPanel();
        rightPanel.appendChild(infoPanel);

        let playerOptions = this.createOptionsPanel();  
        rightPanel.appendChild(playerOptions);

        container.appendChild(rightPanel);

        return container;
    }


    chooseGameMode(): HTMLElement {
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
            document.querySelector('.game-mode')!.remove();
        });

        let pva = document.createElement('button');
        pva.classList.add('pva');
        pva.innerHTML = 'Player vs AI';
        pva.addEventListener('click', () => {
            this.game.gameType = 'PvA';
            document.querySelector('.game-mode')!.remove();
            this.createPlayerPieceSelection(gameModeContainer);
        });

        gameMode.appendChild(pvp);
        gameMode.appendChild(pva);

        gameModeContainer.appendChild(gameMode);

        return gameModeContainer;
    }

    createPlayerPieceSelection(gameModeContainer: HTMLElement): void {
        let playerPieceSelection = document.createElement('div');
        playerPieceSelection.classList.add('player-piece-selection');
        playerPieceSelection.innerHTML = 'Choose your piece';

        let x = document.createElement('button');
        x.classList.add('x');
        x.innerHTML = 'X';
        x.addEventListener('click', () => {
            this.game.playerO = 'AI';
            gameModeContainer.remove();
            this.timer.createTimer(this.game);
        });

        let o = document.createElement('button');
        o.classList.add('o');
        o.innerHTML = 'O';
        o.addEventListener('click', () => {
            this.game.playerX = 'AI';
            gameModeContainer.remove();
            this.aiFn();
            this.timer.createTimer(this.game);
            this.timer.toggleTimer(this.game);
        });

        playerPieceSelection.appendChild(x);
        playerPieceSelection.appendChild(o);

        gameModeContainer.appendChild(playerPieceSelection);
    }


    createBoard(): HTMLElement { 
        let board = document.createElement('div');
        board.classList.add('board');

        for (let x = 0; x < 5; x++) {
            let row = document.createElement('div');
            row.classList.add('row');
    
            for (let y = 0; y < 5; y++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');


                if (this.game.isCellInGrid(x, y)) {
                    cell.classList.add('grid');
                }
   


                cell.setAttribute('draggable', 'true');

                cell.addEventListener('dragstart', (e) => {
                    e.dataTransfer!.setData('text/plain', JSON.stringify({ x, y }));
                });

                cell.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });


                cell.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const data = e.dataTransfer!.getData('text/plain');
                    const { x: dragX, y: dragY } = JSON.parse(data);
                    
                    // Swap the content of the cells
                    const draggedCell = this.game.board[dragX][dragY];
                    const targetCell = this.game.board[x][y];
                    
                    if (this.game.gameState === 'Stopped') {
                        return;
                    }

                    if (!this.game.currentPlayerCanMovePieceAndGrid()) {

                        console.log('You cannot move a piece');
                        return;
                    }

                    if (this.game.currentPlayer !== draggedCell) {
                        console.log('You can only move your own pieces');
                        return;
                    }

                    if (targetCell !== undefined) {
                        console.log('Invalid move');
                        return;
                    }

                    // Perform the cell swap logic
                    this.game.board[dragX][dragY] = targetCell;
                    this.game.board[x][y] = draggedCell;


    
                    // Re-render the board after the move
                    this.game.changeTurn();
                    this.checkAndHandleAiMove();
                    this.updatePlayers();
                    this.updateBoard();
                    this.checkWinFn();
                });

                cell.addEventListener('click', (e) => {
                    this.handleMoveFn(x, y, e);
                });
               
                cell.innerHTML = this.game.board[x][y] || '&nbsp;';
                row.appendChild(cell);
            }
    
            board.appendChild(row);
        }
    
        return board;
    }
    
    updateBoard(): void {
        // Clear the existing board
        const boardContainer = document.querySelector('.board');
        if (boardContainer) {
            boardContainer.innerHTML = '';  // Clear the current board
        }

        // Create a new board based on the current game state
        const newBoard = this.createBoard();  // This will create a fresh new board based on the updated state

        // Append the new board to the container
        if (boardContainer) {
            boardContainer.appendChild(newBoard);  // Add the updated board
        }
    }

    checkAndHandleAiMove(): void {
        if (this.game.currentPlayer === 'X' && this.game.playerX === 'AI' || this.game.currentPlayer === 'O' && this.game.playerO === 'AI') {
            this.aiFn();
        }
    }


    createPlayerInfoPanel(): HTMLElement {
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

    createOptionsPanel(): HTMLElement {
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

    createGridMovePanelArrows(gridMoveFn: handleGridMoveType): HTMLElement {
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

    stopTimer(): void {
        this.timer.toggleTimer(this.game);
    }

    resetTimer(): void {
        this.timer.resetTimer();
    }

    updatePlayers(): void {
        const currentPlayerElement = document.querySelector('.current-player');
        if (currentPlayerElement) {
            currentPlayerElement.innerHTML = `Current Player: ${this.game.currentPlayer}`;
        }
        
        const remainingPiecesXElement = document.querySelector('.remaining-pieces-x');
        if (remainingPiecesXElement) {
            remainingPiecesXElement.innerHTML = `Remaining Pieces X: ${this.game.remainingPiecesX}`;
        }
        
        const remainingPiecesOElement = document.querySelector('.remaining-pieces-o');
        if (remainingPiecesOElement) {
            remainingPiecesOElement.innerHTML = `Remaining Pieces O: ${this.game.remainingPiecesO}`;
        }
    }


    generateResetButton(): void {
        let existingResetButton = document.querySelector('.reset-button');
        if (existingResetButton) {
            return;
        }
        let resetButton = document.createElement('button');
        resetButton.innerHTML = 'Reset';
        resetButton.classList.add('reset-button');
        document.body.appendChild(resetButton);
        resetButton.addEventListener('click', () => { 
            this.game.resetGame();
            this.resetTimer();
    
            document.body.innerHTML = '';
            let h1 = document.createElement('h1');
            h1.innerHTML = 'Tic Tac Two';
            document.body.appendChild(h1);
            let board = this.drawUI();
            //             let board = this.drawUI(this.game, this.handleMoveFn, this.aiFn);
            document.body.appendChild(board);
        });
    }
    
}
