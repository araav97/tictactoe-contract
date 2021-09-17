export const ticTacToeBot = [
  {
    inputs: [],
    name: "availGames",
    outputs: [
      {
        internalType: "uint256[]",
        name: "gameId",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "bet",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "playerOneId",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bet",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isBot",
        type: "bool",
      },
    ],
    name: "createGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameStats",
    outputs: [
      {
        internalType: "uint256",
        name: "openGame",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gameInProgress",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gameComplete",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "address",
        name: "playerOne",
        type: "address",
      },
      {
        internalType: "address",
        name: "playerTwo",
        type: "address",
      },
      {
        internalType: "enum TicTacToe.Symbol",
        name: "playerOneSymbol",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.Symbol",
        name: "playerTwoSymbol",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.Status",
        name: "gameStatus",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.GameType",
        name: "gameType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gamesArray",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBoard",
    outputs: [
      {
        internalType: "enum TicTacToe.Symbol[9]",
        name: "",
        type: "uint8[9]",
      },
      {
        internalType: "enum TicTacToe.Symbol",
        name: "symbol",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.GameType",
        name: "gameType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "otherPlayer",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumofGames",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getScore",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "joinGame",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "leaderboard",
    outputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "score",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "position",
        type: "uint8",
      },
    ],
    name: "makeMove",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playersArray",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "scoreboard",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
