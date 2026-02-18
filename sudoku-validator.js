function isValidSudoku(board) {
  if (!Array.isArray(board) || board.length !== 9) {
    throw new Error("Board must be a 9x9 array");
  }

  for (let r = 0; r < 9; r++) {
    if (!Array.isArray(board[r]) || board[r].length !== 9) {
      throw new Error("Board must be a 9x9 array");
    }
  }

  const isValidGroup = (getValue) => {
    const seen = new Set();

    for (let i = 0; i < 9; i++) {
      const value = getValue(i);

      if (value === ".") continue;

      if (value < "1" || value > "9") {
        return false;
      }

      if (seen.has(value)) {
        return false;
      }

      seen.add(value);
    }

    return true;
  };

  // Check all rows
  for (let row = 0; row < 9; row++) {
    if (!isValidGroup((col) => board[row][col])) {
      return false;
    }
  }

  // Check all columns
  for (let col = 0; col < 9; col++) {
    if (!isValidGroup((row) => board[row][col])) {
      return false;
    }
  }

  // Check all 3x3 subgrids
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();

      const startRow = boxRow * 3;
      const startCol = boxCol * 3;

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const value = board[startRow + r][startCol + c];

          if (value === ".") continue;

          if (value < "1" || value > "9") {
            return false;
          }

          if (seen.has(value)) {
            return false;
          }

          seen.add(value);
        }
      }
    }
  }

  return true;
}

// ---- Simple Tests ----

function cloneBoard(board) {
  return board.map((row) => row.slice());
}

function runTests() {
  // Classic valid Sudoku example with some empty cells
  const validBoard = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];

  const invalidRowBoard = cloneBoard(validBoard);
  // Make a duplicate in the first row (two "5"s)
  invalidRowBoard[0][2] = "5";

  const invalidColumnBoard = cloneBoard(validBoard);
  // Make a duplicate in the first column (two "6"s)
  invalidColumnBoard[2][0] = "6";

  const invalidSubgridBoard = cloneBoard(validBoard);
  // Make a duplicate inside the top-left 3x3 box (two "9"s)
  invalidSubgridBoard[2][1] = "9";

  const invalidCharacterBoard = cloneBoard(validBoard);
  // Put an invalid character in the board
  invalidCharacterBoard[0][0] = "X";

  const tests = [
    { name: "Valid board", board: validBoard, expected: true },
    { name: "Invalid row", board: invalidRowBoard, expected: false },
    { name: "Invalid column", board: invalidColumnBoard, expected: false },
    { name: "Invalid subgrid", board: invalidSubgridBoard, expected: false },
    { name: "Invalid character", board: invalidCharacterBoard, expected: false },
  ];

  tests.forEach((test, index) => {
    const result = isValidSudoku(test.board);
    const passed = result === test.expected;

    console.log(
      `Test ${index + 1} - ${test.name}: ${passed ? "PASSED" : "FAILED"} (expected ${test.expected}, got ${result})`
    );
  });
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

if (typeof module !== "undefined") {
  module.exports = { isValidSudoku };
}

