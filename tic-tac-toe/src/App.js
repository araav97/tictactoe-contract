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

const contractAddressBot = "0x2b14E03d74142a4C3b33520E885B90d58eDC89Ab";

const ticTacToeContract = new web3.eth.Contract(ticTacToe, contractAddressBot, {
  gasPrice: "10000000000", // default gas price in wei, 20 gwei in this case
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
