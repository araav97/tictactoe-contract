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

//Confitmed
const getOpenGames = async (web3, contract, setOpenGames) => {
  // let res = await contract.methods.availGames().call();
  // let openGames = [];
  // console.log(res);
  // for (let i = 0; i < 10; i++) {
  //   if (res.playerOneId[i] !== "0x0000000000000000000000000000000000000000") {
  //     openGames.push({
  //       playerOneId: res.playerOneId[i],
  //       bet: web3.utils.fromWei(res.bet[i].toString(), "ether"),
  //       gameId: res.gameId[i],
  //     });
  //   }
  // }
  // console.log(openGames);
  // setOpenGames(openGames);
};

const getGameStatus = async (web3, contract, setIsGame) => {
  // let board = await contract.methods.getBoard().call({
  //   from: web3.currentProvider.selectedAddress,
  // });
  // if (board.gameType === "0") {
  //   setIsGame(false);
  //   return;
  // }
  // setIsGame(true);
};

function PvP(props) {
  const [isGame, setIsGame] = useState(true);
  const toast = useToast();

  //Mock
  const _openGames = [
    {
      gameId: "1",
      host: "asdfasdf",
      bet: "1",
    },
    {
      gameId: "2",
      host: "asdfasdf",
      bet: "1",
    },
  ];
  // Confirmed
  const { web3, contract } = props;
  const [openGames, setOpenGames] = useState(_openGames);

  // Handlers
  const handleSelectGame = async (gameId) => {
    // // join game
    // const gas =
    //   (await contract.methods.joinGame(gameId).estimateGas()) + 100000;
    // await contract.methods.joinGame(gameId).send({
    //   from: web3.currentProvider.selectedAddress,
    //   gas,
    // });
    // if (!toast.isActive("join-game-toast")) {
    //   toast({
    //     id: "join-game-toast",
    //     title: "You have joined a game.",
    //     description: "Time to start playing.",
    //     status: "success",
    //     position: "bottom-right",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
    // //Join game here
    // setIsGame(true);
  };

  const handleCreateGame = async (bet) => {
    // create game
    const gas = await contract.methods.createGame(bet).estimateGas();
    await contract.methods.createGame(bet).send({
      from: web3.currentProvider.selectedAddress,
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
  }, []);

  return (
    <VStack>
      {isGame ? (
        <>
          <PlayerBoardV2 web3={web3} contract={contract} />
          <Button
            w="20vw"
            size="lg"
            onClick={() => {
              setIsGame(false);
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
