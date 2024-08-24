function Gameboard() {
	const rows = 3;
	const columns = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(Cell());
		}
	}

	const getBoard = () => board;

    const receiveMarker = (row, column, player) => {
        const availableCells = board.flat().some((cell) => cell.getValue() === 1);
        console.log(availableCells)
    }

	const printBoard = () => {
		const boardWithCellValues = board.map((row) =>
			row.map((cell) => cell.getValue())
		);
        console.log(boardWithCellValues)
	};

	return { getBoard, receiveMarker ,printBoard };
}

function Cell() {
	let value = null;

	const placeMarker = (player) => {
		value = player;
	};

	const getValue = () => value;

	return { placeMarker, getValue };
}

const board = Gameboard();

board.receiveMarker();
