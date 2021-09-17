import { useState, useEffect, useRef } from "react";
import {
  VStack,
  useColorModeValue,
  Box,
  HStack,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  NumberInput,
  NumberInputField,
  InputRightElement,
  InputGroup,
  Heading,
  useToast,
} from "@chakra-ui/react";
import PlayerBoardV2 from "./playerBoardV2";
import GameList from "./gameList";
import { BsClipboardData } from "react-icons/bs";

const MINUTE_MS = 1000;

//Confitmed
const getOpenGames = async (web3, contract, setOpenGames) => {
  let res = await contract.methods.availGames().call({
    from: web3.currentProvider.selectedAddress,
  });
  let openGames = [];
  for (let i = 0; i < 10; i++) {
    if (res.playerOneId[i] !== "0x0000000000000000000000000000000000000000") {
      if (
        res.playerOneId[i].toLowerCase() ===
        web3.currentProvider.selectedAddress
      ) {
        continue;
      }
      openGames.push({
        playerOneId: res.playerOneId[i],
        bet: web3.utils.fromWei(res.bet[i].toString(), "ether"),
        gameId: res.gameId[i],
      });
    }
  }
  // console.log(openGames);
  setOpenGames(openGames);
};

const getGameStatus = async (web3, contract, setIsGame) => {
  let board = await contract.methods
    .getBoard(web3.currentProvider.selectedAddress)
    .call({
      from: web3.currentProvider.selectedAddress,
    });

  if (
    board.playerOne.toLowerCase() === web3.currentProvider.selectedAddress ||
    board.playerTwo.toLowerCase() === web3.currentProvider.selectedAddress
  ) {
    setIsGame(true);
  } else {
    setIsGame(false);
  }
};

function PvP(props) {
  const [isGame, setIsGame] = useState(false);
  const [isQuitGame, setIsQuitGame] = useState(false);
  const toast = useToast();

  //Mock
  // Confirmed
  const { web3, contract } = props;
  const [openGames, setOpenGames] = useState([]);

  // Handlers
  const handleSelectGame = async (gameId, bet) => {
    // join game
    console.log(web3.utils.toWei(bet, "ether"));
    const gas =
      (await contract.methods.joinGame(gameId).estimateGas({
        from: web3.currentProvider.selectedAddress,
        value: web3.utils.toWei(bet, "ether"),
      })) * 2;
    console.log(bet);
    await contract.methods.joinGame(gameId).send({
      from: web3.currentProvider.selectedAddress,
      value: web3.utils.toWei(bet, "ether"),
      gas,
    });
    // //Join game here
    setIsGame(true);
    setIsQuitGame(false);
  };

  const handleCreateGame = async (value) => {
    // create game
    const gas = (await contract.methods.createGame().estimateGas()) * 2;
    console.log(value);
    await contract.methods.createGame().send({
      from: web3.currentProvider.selectedAddress,
      value: web3.utils.toWei(value, "ether"),
      gas,
    });
    toast({
      title: "Game Created.",
      status: "success",
      position: "bottom-right",
      duration: 5000,
      isClosable: true,
    });
    setIsGame(true);
  };

  useEffect(() => {
    getGameStatus(web3, contract, setIsGame);
    getOpenGames(web3, contract, setOpenGames);
    const interval = setInterval(() => {
      getGameStatus(web3, contract, setIsGame);
      getOpenGames(web3, contract, setOpenGames);
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <VStack>
      {isGame && !isQuitGame ? (
        <>
          <PlayerBoardV2 web3={web3} contract={contract} />
          <Button
            w="20vw"
            size="lg"
            onClick={() => {
              setIsQuitGame(true);
              getOpenGames(web3, contract, setOpenGames);
            }}
          >
            Quit Game
          </Button>
        </>
      ) : (
        <GameList
          openGames={openGames}
          handleSelectGame={handleSelectGame}
          handleCreateGame={handleCreateGame}
        />
      )}
    </VStack>
  );
}

export default PvP;
