export const ticTacToePVP = [
  {
    inputs: [],
    name: "availGames",
    outputs: [
      {
        internalType: "uint256",
        name: "numOfOpenGames",
        type: "uint256",
      },
      {
        internalType: "uint256[10]",
        name: "gameId",
        type: "uint256[10]",
      },
      {
        internalType: "uint256[10]",
        name: "bet",
        type: "uint256[10]",
      },
      {
        internalType: "address[10]",
        name: "playerOneId",
        type: "address[10]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "createGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "evaluate",
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
        internalType: "enum TicTacToe.PlayerStatus",
        name: "playerOneStatus",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.PlayerStatus",
        name: "playerTwoStatus",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "playerOneBidPoints",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "playerTwoBidPoints",
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
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getBoard",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
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
        internalType: "enum TicTacToe.PlayerStatus",
        name: "playerOneStatus",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.PlayerStatus",
        name: "playerTwoStatus",
        type: "uint8",
      },
      {
        internalType: "uint8[9]",
        name: "playerOneBoard",
        type: "uint8[9]",
      },
      {
        internalType: "uint8[9]",
        name: "playerTwoBoard",
        type: "uint8[9]",
      },
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "enum TicTacToe.Symbol[9]",
        name: "board",
        type: "uint8[9]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPotAmt",
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
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8[9]",
        name: "bidsPlaced",
        type: "uint8[9]",
      },
    ],
    name: "placeBids",
    outputs: [],
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
];
