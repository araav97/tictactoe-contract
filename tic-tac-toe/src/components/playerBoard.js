import { useState, useEffect } from "react";
import {
  SimpleGrid,
  VStack,
  Button,
  IconButton,
  Icon,
  useColorModeValue,
  Heading,
  HStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BsCircle } from "react-icons/bs";

const handleCardClick = (key, setPosition) => {
  console.log(key);
  setPosition(key);
};

// pos 0 and 1 does not work
const handleSubmit = async (
  web3,
  contract,
  setBoard,
  position,
  toast,
  setPlayerSymbol,
  setOtherPlayer
) => {
  try {
    const gas =
      (await contract.methods.makeMove(position).estimateGas()) + 100000;
    await contract.methods.makeMove(position).send({
      from: web3.currentProvider.selectedAddress,
      gas,
    });
    getBoardFromChain(
      web3,
      contract,
      setBoard,
      setPlayerSymbol,
      toast,
      setOtherPlayer
    );
    toast({
      title: "Move Made.",
      description: "Please wait for your opponent to make their move",
      status: "success",
      position: "bottom-right",
      duration: 5000,
      isClosable: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const getBoardFromChain = async (
  web3,
  contract,
  setBoard,
  setPlayerSymbol,
  toast,
  setOtherPlayer
) => {
  let board = await contract.methods.getBoard().call({
    from: web3.currentProvider.selectedAddress,
  });
  console.log(board);
  setOtherPlayer(board.otherPlayer);
  if (board.status === "3") {
    toast({
      title: "You Win",
      status: "success",
      position: "bottom-right",
      duration: 5000,
      isClosable: true,
    });
  } else if (board.status === "5") {
    toast({
      title: "You Lost",
      status: "error",
      position: "bottom-right",
      duration: 5000,
      isClosable: true,
    });
  } else if (board.status === "6") {
    toast({
      title: "Draw",
      status: "warning",
      position: "bottom-right",
      duration: 5000,
      isClosable: true,
    });
  }

  console.log(board);
  setPlayerSymbol(board.symbol);
  board = board[0].map((el) => parseInt(el));
  setBoard(board);
};

function PlayerBoard(props) {
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [otherPlayer, setOtherPlayer] = useState("");
  useEffect(() => {
    getBoardFromChain(
      props.web3,
      props.contract,
      setBoard,
      setPlayerSymbol,
      toast,
      setOtherPlayer
    );
  }, []);

  const [position, setPosition] = useState(-1);
  const [playerSymbol, setPlayerSymbol] = useState(1);
  const toast = useToast();

  const color = useColorModeValue("red.600", "red.300");
  return (
    <VStack>
      <Heading mt={10}>Player vs Player</Heading>
      <Text as="kbd">Playing against {otherPlayer}</Text>
      <Button
        onClick={() =>
          getBoardFromChain(
            props.web3,
            props.contract,
            setBoard,
            setPlayerSymbol,
            toast,
            setOtherPlayer
          )
        }
      >
        Refresh
      </Button>
      <SimpleGrid pt={3} w="630px" columns={3} spacing="10px">
        {board.map((symbol, index) => (
          <IconButton
            key={index}
            icon={
              symbol === 0 ? (
                position === index ? (
                  playerSymbol === "1" ? (
                    <CloseIcon boxSize="5em" color={color} />
                  ) : (
                    <Icon boxSize="5em" color={color} as={BsCircle} />
                  )
                ) : (
                  {}
                )
              ) : symbol === 1 ? (
                <CloseIcon boxSize="5em" />
              ) : (
                <Icon boxSize="5em" as={BsCircle} />
              )
            }
            bg="blue.500"
            onClick={() => handleCardClick(index, setPosition)}
            height="200px"
            w="200px"
          ></IconButton>
        ))}
      </SimpleGrid>
      <br />
      <HStack>
        <Button
          w="20vw"
          size="lg"
          onClick={() =>
            handleSubmit(
              props.web3,
              props.contract,
              setBoard,
              position,
              toast,
              setPlayerSymbol,
              setOtherPlayer
            )
          }
        >
          Confirm
        </Button>
      </HStack>
    </VStack>
  );
}

export default PlayerBoard;
