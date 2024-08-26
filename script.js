const gameBoard = (() => {
	const board = [];

	const resetBoard = () => {
		for (let i = 0; i < 9; i++) {
			board[i] = "";
		}
	};

	const getBoard = () => board;

	const receiveMarker = (index, marker) => {
		if (board[index] !== "") return false;

		board[index] = marker;
	};

	resetBoard();

	return { getBoard, receiveMarker, resetBoard };
})();

const gameController = ((
	playerOneName = "Player One",
	playerTwoName = "Player Two"
) => {
	const players = [
		{
			name: playerOneName,
			marker: "X",
			wins: 0,
		},
		{
			name: playerTwoName,
			marker: "O",
			wins: 0,
		},
	];

	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
	const getActivePlayer = () => activePlayer;

	const getPlayers = () => players;

	const gameOver = () => {
		const board = gameBoard.getBoard();
		const rows = [
			[board[0], board[1], board[2]],
			[board[3], board[4], board[5]],
			[board[6], board[7], board[8]],
		];
		const colums = [
			[board[0], board[3], board[6]],
			[board[1], board[4], board[7]],
			[board[2], board[5], board[8]],
		];
		const diagnols = [
			[board[0], board[4], board[8]],
			[board[2], board[4], board[6]],
		];
		return [...rows, ...colums, ...diagnols].some((cells) => {
			let joinedCells = cells.join("");
			return joinedCells === "OOO" || joinedCells === "XXX";
		});
	};

	const tieGame = () => {
		const board = gameBoard.getBoard().filter((cell) => cell !== "");
		console.log(board);
		return board.length === 9;
	};

	const playRound = (index) => {
		if (gameBoard.receiveMarker(index, getActivePlayer().marker) === false) {
			return;
		}

		if (gameOver()) {
			alert(`${getActivePlayer().name} wins!`);
			getActivePlayer().wins += 1;
			gameBoard.resetBoard();
		}

		if (tieGame()) {
			alert('Stalemate!')
			gameBoard.resetBoard();
		}

		switchPlayerTurn();
	};

	return {
		playRound,
		getPlayers,
	};
})();

const screenController = (() => {
	const boardDiv = document.querySelector(".gameboard");
	boardDiv.addEventListener("click", clickHandlerBoard);

	const playerOneScore = document.querySelector("#player-one-score");
	const playerTwoScore = document.querySelector("#player-two-score");

	const updateScreen = () => {
		boardDiv.textContent = "";

		const board = gameBoard.getBoard();
		const players = gameController.getPlayers();

		playerOneScore.value = players[0].wins;
		playerTwoScore.value = players[1].wins;

		board.forEach((cell, index) => {
			const cellDiv = document.createElement("div");
			const cellButton = document.createElement("button");

			cellButton.classList.add("cell");
			cellButton.dataset.index = index;
			cellDiv.appendChild(cellButton);

			cellButton.textContent = cell;
			boardDiv.appendChild(cellDiv);
		});
	};

	updateScreen();

	return { updateScreen };
})();

function clickHandlerBoard(e) {
	const selectedCell = e.target.dataset.index;

	if (!selectedCell) return;

	gameController.playRound(selectedCell);
	screenController.updateScreen();
}
