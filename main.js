let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let gameActive = true;
let gameover = new Audio("gameover.mp3");
let music = new Audio("music.mp3");
let audioturnmusic = new Audio("ting.mp3");

function placeMark(row, col) {
    if (gameActive && board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.querySelector(`.row:nth-child(${row + 1}) .col-4:nth-child(${col + 1})`).innerText = currentPlayer;

        if (checkWin()) {
            document.getElementById('result').innerText = `${currentPlayer} wins!`;
            gameActive = false;
            gameover.play();
        } else if (checkTie()) {
            document.getElementById('result').innerText = 'It\'s a tie!';
            gameActive = false;
            gameover.play();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            audioturnmusic.play();
        }
    }
}

music.play();

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) ||
            (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) ||
            (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
            (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
        ) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}

function restartGame() {
    currentPlayer = 'X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    gameActive = true;
    document.getElementById('result').innerText = '';
    document.getElementById('restart-button').style.display = 'none';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');

    cells.forEach(cell => cell.style.pointerEvents = 'auto');
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        const row = Array.from(cell.parentNode.children).indexOf(cell.parentNode);
        const col = Array.from(cell.parentNode.children).indexOf(cell);
        placeMark(row, col);

        if (!gameActive) {
            document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
            document.getElementById('restart-button').style.display = 'block';
        }
    });
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        const row = Array.from(cell.parentNode.children).indexOf(cell.parentNode);
        const col = Array.from(cell.parentNode.children).indexOf(cell);
        placeMark(row, col);

        if (!gameActive) {
            document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
            document.getElementById('restart-button').style.display = 'block';
        }
    });
});

function stopmusic(){
    music.pause();
}

function playmusic(){
    music.play();
}