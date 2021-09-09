export const ticTacToe = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "gameboards",
    outputs: [
      {
        internalType: "address",
        name: "host_player",
        type: "address",
      },
      {
        internalType: "address",
        name: "other_player",
        type: "address",
      },
      {
        internalType: "enum TicTacToe.Symbol",
        name: "host_player_symbol",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.Symbol",
        name: "other_player_symbol",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "enum TicTacToe.GameType",
        name: "game_type",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player_address",
        type: "address",
      },
    ],
    name: "get_board",
    outputs: [
      {
        internalType: "enum TicTacToe.Symbol[9]",
        name: "",
        type: "uint8[9]",
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
    name: "make_move",
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
    name: "players",
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
        internalType: "bool",
        name: "isBot",
        type: "bool",
      },
    ],
    name: "start_game",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
