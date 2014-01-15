var sampleBoard = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,0,0,0,0,0],
	[0,0,0,1,0,1,0,0,0,0],
	[0,0,0,1,0,1,0,0,0,0],
	[0,0,0,1,0,0,0,0,0,0],
	[0,0,0,1,0,1,0,0,0,0],
	[0,0,0,1,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

function toroidal(x, min, max) {
	if (x < min) { return max; }
	if (x > max) { return min; }
	return x;
}

var board = {
	width : 10,
	height : 10,
	board : sampleBoard,
	at : function(x, y) {
		x = toroidal(x, 0, this.width-1);
		y = toroidal(y, 0, this.height-1);
		return this.board[x][y];
	}
};

function countNeighbors(board, x, y) {
	var count = 0;
	
	count += board.at(x-1, y);
	count += board.at(x+1, y);
	count += board.at(x, y-1);
	count += board.at(x, y+1);
	
	return count;
}

function isAlive(board, x, y) {
	var count = countNeighbors(board, x, y);
	if (board.at(x,y)) {
		if (count < 2) {
			return false;
		}
		if (count > 3) {
			return false;
		}
		// else for 2 or 3
		return true;
	}
	
	// A dead cell with 3 live neighbors come alive
	return (count === 3); 
}

function tick(board) {
	var i, j, newRow, newBoard;
	
	newBoard = [];
	for ( i = 0; i < board.width; i+=1 ) {
	
		newRow = [];
		for ( j = 0; j < board.height; j+=1 ) {
			newRow.push( isAlive(board, i, j) );
		}
		newBoard.push(newRow);
	}
	return newBoard;
}

$(document).ready(function() {
	$("#game_of_life").html("hello");

	console.log(board.board);
	console.log(tick(board));
});