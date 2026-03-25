document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');
    const resetScoresBtn = document.getElementById('reset-scores-btn');
    const p1Input = document.getElementById('player1');
    const p2Input = document.getElementById('player2');
    const displayP1 = document.getElementById('display-p1');
    const displayP2 = document.getElementById('display-p2');
    const scoreP1 = document.getElementById('score-p1');
    const scoreP2 = document.getElementById('score-p2');
    const cardP1 = document.querySelector('.player1-card');
    const cardP2 = document.querySelector('.player2-card');

    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let scores = { X: 0, O: 0 };

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Initialize names
    const updateNames = () => {
        displayP1.textContent = p1Input.value || "Spieler 1";
        displayP2.textContent = p2Input.value || "Spieler 2";
        updateStatus();
    };

    const updateStatus = () => {
        const name = currentPlayer === 'X' ? (p1Input.value || "Spieler 1") : (p2Input.value || "Spieler 2");
        statusText.textContent = `${name} ist am Zug`;
        
        if (currentPlayer === 'X') {
            cardP1.classList.add('active');
            cardP2.classList.remove('active');
        } else {
            cardP2.classList.add('active');
            cardP1.classList.remove('active');
        }
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) return;

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winnerName = currentPlayer === 'X' ? (p1Input.value || "Spieler 1") : (p2Input.value || "Spieler 2");
            statusText.textContent = `${winnerName} hat gewonnen!`;
            scores[currentPlayer]++;
            updateScores();
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            statusText.textContent = "Unentschieden!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    };

    const updateScores = () => {
        scoreP1.textContent = scores.X;
        scoreP2.textContent = scores.O;
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        updateStatus();
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.textContent = ''; // Explicitly clear if content was set via textContent
        });
    };

    const resetScores = () => {
        scores = { X: 0, O: 0 };
        updateScores();
        resetGame();
    };

    // Event Listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
    resetScoresBtn.addEventListener('click', resetScores);
    p1Input.addEventListener('input', updateNames);
    p2Input.addEventListener('input', updateNames);

    // Initial setup
    updateStatus();
    updateNames();
});
