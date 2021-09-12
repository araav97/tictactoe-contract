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
import { FaEthereum } from "react-icons/fa";
import PlayerBoard from "./playerBoard";

const gameList = (
  openGames,
  bg,
  setIsGame,
  handleSelectGame,
  toast,
  web3,
  contract
) => {
  return openGames.map((el) => (
    <Box
      key={el}
      as="button"
      _hover={{
        background: bg,
      }}
      borderWidth="1px"
      borderRadius="lg"
      w="70vw"
      onClick={() =>
        handleSelectGame(web3, contract, el.gameId, setIsGame, toast)
      }
    >
      <HStack p={5} justify="space-between">
        <Text as="kbd" size="m">
          {el.playerOneId}
        </Text>
        <HStack>
          <Text as="kbd" size="m">
            {el.bet}
          </Text>
          <FaEthereum></FaEthereum>
        </HStack>
      </HStack>
    </Box>
  ));
};

const getOpenGames = async (web3, contract, setOpenGames) => {
  let res = await contract.methods.availGames().call();
  let openGames = [];
  console.log(res);
  for (let i = 0; i < 10; i++) {
    if (res.playerOneId[i] !== '0x0000000000000000000000000000000000000000') {
      openGames.push({
        playerOneId: res.playerOneId[i],
        bet: web3.utils.fromWei(res.bet[i].toString(), 'ether'),
        gameId: res.gameId[i],
      })
    }
  }
  console.log(openGames)
  setOpenGames(openGames);
};

//TODO If there is a current game in play, do not show the list, .stats from getboard
const getGameStatus = async (web3, contract, setIsGame) => {
  let board = await contract.methods.getBoard().call({
    from: web3.currentProvider.selectedAddress,
  });
  console.log("Test")
  console.log(board);

  if (board.status == 1 || board.status == 2) {
    setIsGame(true);  
  } else {
    setIsGame(true);
  }
};

const handleCreateGame = async (
  web3,
  contract,
  bet,
  toast,
  setIsOpen,
  setIsGame
) => {
  console.log(bet);
  // create game\
  setIsOpen(false);
  const gas =
    (await contract.methods.createGame(bet, false).estimateGas()) + 10000;
  await contract.methods.createGame(bet, false).send({
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

const handleSelectGame = async (web3, contract, gameId, setIsGame, toast) => {
  console.log(gameId)
  // join game
  const gas = (await contract.methods.joinGame(gameId).estimateGas()) + 10000;
  await contract.methods.joinGame(gameId).send({
    from: web3.currentProvider.selectedAddress,
    gas,
  });
  if (!toast.isActive("join-game-toast")) {
    toast({
      id: "join-game-toast",
      title: "You have joined a game.",
      description: "Time to start playing.",
      status: "success",
      position: "bottom-right",
      duration: 5000,
      isClosable: true,
    });
  }
  //Join game here
  setIsGame(true);
};

// const handleJoinGame = async (web3, contract, gameId, toast) => {
//   console.log(gameId)
//   const gas = (await contract.methods.joinGame(gameId).estimateGas()) + 10000;
//   await contract.methods.joinGame(gameId).send({
//     from: web3.currentProvider.selectedAddress,
//     gas,
//   });

//   if (!toast.isActive("join-game-toast")) {
//     toast({
//       id: "join-game-toast",
//       title: "You have joined a game.",
//       description: "Time to start playing.",
//       status: "success",
//       position: "bottom-right",
//       duration: 5000,
//       isClosable: true,
//     });
//   }
// };

function PvP(props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const [openGames, setOpenGames] = useState([]);
  const [isGame, setIsGame] = useState(false);
  const toast = useToast();
  const [bet, setBet] = useState(0);

  useEffect(() => {
    getGameStatus(props.web3, props.contract, setIsGame);
    getOpenGames(props.web3, props.contract, setOpenGames);
  }, []);

  const bg = useColorModeValue("gray.300", "gray.600");
  return (
    <VStack>
      {isGame ? (
        <>
        <PlayerBoard web3={props.web3} contract={props.contract} />
        <Button
          w="20vw"
          size="lg"
          onClick={() => setIsGame(false)}>
          Quit Game
        </Button>
        </>
      ) : (
        <>
          <Heading m={10} mb={3}>
            Player vs Player
          </Heading>
          <Button onClick={() => setIsOpen(true)}>Start New Board</Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Start a new board
                </AlertDialogHeader>

                <AlertDialogBody>Choose amount of amount:</AlertDialogBody>
                <Box pl="24px" pr="24px">
                  <InputGroup>
                    <NumberInput w="100%">
                      <InputRightElement children={<FaEthereum />} />
                      <NumberInputField
                        onChange={(e) => setBet(e.target.value)}
                      />
                    </NumberInput>
                  </InputGroup>
                </Box>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() =>
                      handleCreateGame(
                        props.web3,
                        props.contract,
                        bet,
                        toast,
                        setIsOpen,
                        setIsGame
                      )
                    }
                    ml={3}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <Text mb={10}>or</Text>
          {gameList(
            openGames,
            bg,
            setIsGame,
            handleSelectGame,
            toast,
            props.web3,
            props.contract
          )}
        </>
      )}
    </VStack>
  );
}

export default PvP;
