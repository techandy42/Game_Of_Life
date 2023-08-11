export class Game {
  private board: boolean[][]

  constructor() {
    // initialize the board
    this.board = []
    for (let i = 0; i < 20; i++) {
      this.board.push([])
      for (let j = 0; j < 20; j++) {
        this.board[i].push(false)
      }
    }
  }

  clearBoard(): void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        this.board[i][j] = false
      }
    }
  }

  populateRandom(): void {
    this.clearBoard()
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        this.board[i][j] = Math.random() < 0.5
      }
    }
  }

  populateLWSS(): void {
    this.clearBoard()
    this.board[1][1] = true
    this.board[1][4] = true
    this.board[2][5] = true
    this.board[3][0] = true
    this.board[3][5] = true
    this.board[4][0] = true
    this.board[4][1] = true
    this.board[4][2] = true
    this.board[4][3] = true
  }

  populateBeacon(): void {
    this.clearBoard()
    this.board[1][1] = true
    this.board[1][2] = true
    this.board[2][1] = true
    this.board[3][3] = true
    this.board[3][4] = true
    this.board[4][3] = true
    this.board[4][4] = true
  }

  populatePulsar(): void {
    this.clearBoard()
    const offset = 6
    for (let i = 0; i < 3; i++) {
      this.board[offset + i][offset + 1] = true
      this.board[offset + i][offset + 6] = true
      this.board[offset + i + 3][offset + 1] = true
      this.board[offset + i + 3][offset + 6] = true
      this.board[offset + 1][offset + i] = true
      this.board[offset + 1][offset + i + 3] = true
      this.board[offset + 6][offset + i] = true
      this.board[offset + 6][offset + i + 3] = true
    }
  }

  populateToad(): void {
    this.clearBoard()
    this.board[9][8] = true
    this.board[9][9] = true
    this.board[9][10] = true
    this.board[10][7] = true
    this.board[10][8] = true
    this.board[10][9] = true
  }

  populateDiehard(): void {
    this.clearBoard()
    this.board[10][7] = true
    this.board[11][7] = true
    this.board[11][8] = true
    this.board[9][8] = true
    this.board[9][12] = true
    this.board[9][13] = true
    this.board[9][14] = true
  }

  populateAcorn(): void {
    this.clearBoard()
    this.board[10][9] = true
    this.board[10][11] = true
    this.board[11][10] = true
    this.board[11][11] = true
    this.board[12][8] = true
    this.board[12][10] = true
    this.board[12][13] = true
  }

  update(): void {
    const newBoard: number[][] = []
    for (let i = 0; i < 20; i++) {
      newBoard.push([])
      for (let j = 0; j < 20; j++) {
        newBoard[i].push(0)
      }
    }

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (this.board[i][j]) {
          const neighbors: number[][] = [
            [i - 1, j - 1],
            [i - 1, j],
            [i - 1, j + 1],
            [i, j - 1],
            [i, j + 1],
            [i + 1, j - 1],
            [i + 1, j],
            [i + 1, j + 1],
          ]
          neighbors.forEach((neighbor) => {
            let [x, y] = neighbor
            if (x < 0) x = 19
            if (x > 19) x = 0
            if (y < 0) y = 19
            if (y > 19) y = 0
            newBoard[x][y]++
          })
        }
      }
    }

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (this.board[i][j]) {
          if (newBoard[i][j] < 2 || newBoard[i][j] > 3) {
            this.board[i][j] = false
          }
        } else {
          if (newBoard[i][j] == 3) {
            this.board[i][j] = true
          }
        }
      }
    }
  }

  getBoard(): boolean[][] {
    return this.board
  }
}
