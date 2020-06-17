var TicTacToe = function() {
  this.board = [[0,0,0], [0,0,0], [0,0,0]];
  this.turn = 1;
  this.rowSums = [0,0,0];
  this.colSums = [0,0,0];
  this.majorDiag = 0;
  this.minorDiag = 0;
  this.filled = 0;
}

TicTacToe.prototype.render = function() {
  let rows = [];
  for (let i = 0; i < this.board.length; i++) {
    let currRow = [];
    for (let j = 0; j < this.board[i].length; j++) {
      if (this.board[i][j] === 1) {
        currRow.push('x');
      } else if (this.board[i][j] === -1) {
        currRow.push('o');
      } else {
        currRow.push(' ');
      }
    }
    rows.push(currRow.join('|'));
  }
  return rows.join('\n_____\n')
}

TicTacToe.prototype.checkWin = function(x, y) {
  if (this.filled === 9) {
    return 2;
  }

  for (let i = 0; i < 3; i++) {
    if (this.rowSums[i] === 3 || this.rowSums[i] === -1 * 3) {
      return this.rowSums[i] / 3;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (this.colSums[i] === 3 || this.colSums[i] === -1 * 3) {
      return this.colSums[i] / 3;
    }
  }
  if (this.majorDiag === 3 || this.majorDiag === -3) {
    return this.majorDiag / 3;
  }
  if (this.minorDiag === 3 || this.minorDiag === -3) {
    return this.minorDiag / 3;
  }

  return 0;
}

TicTacToe.prototype.makeMove = function(x, y) {
  if (this.board[x][y]) {
    return -2;
  }

  this.board[x][y] = this.turn;
  this.filled++;
  this.rowSums[x] += this.turn;
  this.colSums[y] += this.turn;
  if (x - y === 0) {
    this.majorDiag += this.turn;
  }
  if (x + y === 2) {
    this.minorDiag += this.turn;
  }
  let winner = this.checkWin();
  if (winner) {
    return winner;
  }
  this.turn *= -1;
  return 0;
}

let game = new TicTacToe();
console.log(game.render());
game.makeMove(0,0);
console.log(game.render());
game.makeMove(1,1);
console.log(game.render());
game.makeMove(1,0);
console.log(game.render());
game.makeMove(1,2);
console.log(game.render());
console.log(game.makeMove(2,0));
console.log(game.render());