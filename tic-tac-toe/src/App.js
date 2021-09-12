import "./App.css";
import BotBoard from "./components/botBoard.js";
import Header from "./components/header.js";
import PvP from "./components/pvp.js";
import Home from "./components/home.js";
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

const contractAddressBot = "0x1639ffb167E0555d0dabA97A887909856E7E96c5";

const ticTacToeContract = new web3.eth.Contract(ticTacToe, contractAddressBot, {
  gasPrice: "40000000000", // default gas price in wei, 20 gwei in this case
});
console.log(ticTacToeContract);

function App() {
  const [page, setPage] = useState("Home");

  return (
    <ChakraProvider theme={theme}>
      <Header
        web3={web3}
        setPage={(e) => {
          const gameType = e.target.innerHTML;
          setPage(gameType);
        }}
      />
      {page === "Bot" ? (
        <BotBoard web3={web3} contract={ticTacToeContract} />
      ) : page === "Player" ? (
        <PvP web3={web3} contract={ticTacToeContract} />
      ) : (
        <Home />
      )}
    </ChakraProvider>
  );
}

export default App;
