import logo from "./logo.svg";
import "./App.css";
import Board from "./components/board.js";
import StartingOptions from "./components/startingOptions.js";
import Header from "./components/header.js";
import { ChakraProvider, theme, Heading, VStack, Box } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <VStack mt={20}>
        <Heading as="H1">Decentralised Tic Tac Toe!</Heading>
      </VStack>
      <Board />
    </ChakraProvider>
  );
}

export default App;
