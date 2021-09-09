import "./App.css";
import Board from "./components/board.js";
import Header from "./components/header.js";
import {
  ChakraProvider,
  theme,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ticTacToe } from "./abi/TicTacToe";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const contractAddressBot = "0x35544EeCac50e46851dDc9a0e0c2d9F4b3071e99";
const contractAddressPlayer = "your contract address here";

const ticTacToeContract = new web3.eth.Contract(ticTacToe, contractAddressBot);
const handleChangeGameType = (gameType, setGameType) => {
  setGameType(gameType);
  if (gameType === "Bot") {
  } else {
  }
};

function App() {
  const [gameType, setGameType] = useState("Bot");
  const [account, setAccount] = useState(undefined);
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const connectMM = async (t) => {
    t.preventDefault();
    await window.ethereum.enable();
    setAccount(web3.currentProvider.selectedAddress);
  };

  const getBoard = async () => {
    console.log(web3.currentProvider.selectedAddress);
    if (web3.currentProvider.selectedAddress !== null) {
      let board = await ticTacToeContract.methods
        .get_board(web3.currentProvider.selectedAddress)
        .call();
      board = board.map((el) => parseInt(el));
      setBoard(board);
    }
  };

  useEffect(() => {
    getBoard();
  }, [account]);

  const startGame = async (t) => {
    t.preventDefault();
    const gas = await ticTacToeContract.methods
      .start_game(gameType === "Bot" ? true : false)
      .estimateGas();
    await ticTacToeContract.methods
      .start_game(gameType === "Bot" ? true : false)
      .send({
        from: web3.currentProvider.selectedAddress,
        gas,
      });
    getBoard();
  };

  const makeMove = async (move) => {
    try {
      //TODO solve this error... inpage.js:1 MetaMask - RPC Error: execution reverted
      // {code: -32000, message: 'execution reverted'}
      // code: -32000

      const gas = await ticTacToeContract.methods.make_move(3).estimateGas();
      console.log(gas);
      // await ticTacToeContract.methods.make_move(3).send({
      //   from: web3.currentProvider.selectedAddress,
      //   gas,
      // });
      getBoard();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Header
        connectMM={connectMM}
        setGameType={(e) => {
          const gameType = e.target.innerHTML;
          handleChangeGameType(gameType, setGameType);
        }}
      />
      {/* <Button onClick={startGame}></Button> */}
      <Button onClick={makeMove}></Button>
      <VStack mt={10}>
        <Heading>Decentralised Tic Tac Toe!</Heading>
      </VStack>
      <Board board={board} makeMove={makeMove} />
    </ChakraProvider>
  );
}

export default App;
