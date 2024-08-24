const gameBoard = (() => {
	const board = [];

	for (let i = 0; i < 3; i++) {
		board[i] = [];
		for (let j = 0; j < 3; j++) {
			board[i].push(Cell());
		}
	}

	const getBoard = () => board;

	const receiveMarker = (row, column, marker) => {
		if (board[column][row] === "") return;

		board[column][row].placeMarker(marker);
	};

	return { getBoard, receiveMarker };
})();

function Cell() {
	let value = "";

	const placeMarker = (player) => {
		value = player;
	};

	const getValue = () => value;

	return { placeMarker, getValue };
}

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

	const playRound = (row, column) => {
		gameBoard.receiveMarker(row, column, getActivePlayer().marker)
		switchPlayerTurn();
	};

	return {
		playRound,
		getActivePlayer,
	};
})();

const screenController = (() => {
	const boardDiv = document.querySelector(".gameboard");
	boardDiv.addEventListener("click", clickHandlerBoard);

	const playerTurnDiv = document.querySelector(".player-turn");

	const updateScreen = () => {
		boardDiv.textContent = "";

		const board = gameBoard.getBoard();
		const activePlayer = gameController.getActivePlayer();

		playerTurnDiv.textContent = `${activePlayer.name}'s turn ...`;

		board.forEach((row, rowindex) => {
			row.forEach((cell, colindex) => {
				const cellDiv = document.createElement("div");
				const cellButton = document.createElement("button");
				cellButton.classList.add("cell");
				cellButton.dataset.rowindex = rowindex;
				cellButton.dataset.colindex = colindex;
				cellDiv.appendChild(cellButton);

				cellButton.textContent = cell.getValue();
				boardDiv.appendChild(cellDiv);
			});
		});
	};

	updateScreen();

	return { updateScreen };
})();

function clickHandlerBoard(e) {
	const selectedColumn = e.target.dataset.colindex;
	const selectedRow = e.target.dataset.rowindex;

	if (!selectedColumn || !selectedRow) return;

	gameController.playRound(selectedColumn, selectedRow);
	screenController.updateScreen();
}
