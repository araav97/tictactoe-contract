import { useState } from "react";
import {
  SimpleGrid,
  VStack,
  Button,
  IconButton,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BsCircle } from "react-icons/bs";

const handleCardClick = (key, setSelection) => {
  console.log(key);
  setSelection(key);
};

const handleSubmit = (position, makeMove) => {
  makeMove(position);
  console.log(position);
};

function Board(props) {
  console.log(props.board);
  const [symbols, setSymbols] = useState([1, 0, 0, 0, 0, 0, 0, 0, 2]);

  const [selection, setSelection] = useState(-1);
  const [playerSymbol, setPlayerSymbol] = useState(1);

  const color = useColorModeValue("red.600", "red.300");
  return (
    <VStack m={10}>
      <SimpleGrid w="630px" columns={3} spacing="10px">
        {props.board.map((symbol, index) => (
          <IconButton
            key={index}
            icon={
              symbol === 0 ? (
                selection === index ? (
                  playerSymbol === 1 ? (
                    <CloseIcon boxSize="5em" color={color} />
                  ) : (
                    <Icon boxSize="5em" as={BsCircle} />
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
            onClick={() => handleCardClick(index, setSelection)}
            height="200px"
            w="200px"
          ></IconButton>
        ))}
      </SimpleGrid>
      <br />
      <Button
        w="20vw"
        size="lg"
        onClick={() => handleSubmit(selection, props.makeMove)}
      >
        Confirm
      </Button>
    </VStack>
  );
}

export default Board;
