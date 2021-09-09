import { useState } from "react";
import {
  SimpleGrid,
  Box,
  VStack,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BsCircle } from "react-icons/bs";

const handleCardClick = (key) => {
  console.log(key);
};

function Board() {
  const [symbols, setSymbols] = useState([1, 0, 0, 0, 0, 0, 0, 0, 2]);

  const [selection, setSelection] = useState(-1);

  return (
    <VStack m={10}>
      <SimpleGrid w="630px" columns={3} spacing="10px">
        {symbols.map((key) => (
          <IconButton
            icon={
              symbols[key] === 0 ? (
                {}
              ) : symbols[key] === 1 ? (
                <CloseIcon boxSize="5em" />
              ) : (
                <Icon boxSize="5em" as={BsCircle} />
              )
            }
            bg="blue.500"
            onClick={() => handleCardClick(key)}
            height="200px"
            w="200px"
          ></IconButton>
        ))}
        <IconButton
          icon={
            symbols[0] === 0 ? (
              {}
            ) : symbols[0] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(0)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[1] === 0 ? (
              {}
            ) : symbols[1] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(1)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[2] === 0 ? (
              {}
            ) : symbols[2] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(2)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[3] === 0 ? (
              {}
            ) : symbols[3] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(3)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[4] === 0 ? (
              {}
            ) : symbols[4] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(4)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[5] === 0 ? (
              {}
            ) : symbols[5] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(5)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[6] === 0 ? (
              {}
            ) : symbols[6] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(6)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[7] === 0 ? (
              {}
            ) : symbols[7] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(7)}
          height="200px"
          w="200px"
        ></IconButton>
        <IconButton
          icon={
            symbols[8] === 0 ? (
              {}
            ) : symbols[8] === 1 ? (
              <CloseIcon boxSize="5em" />
            ) : (
              <Icon boxSize="5em" as={BsCircle} />
            )
          }
          bg="blue.500"
          onClick={() => handleCardClick(8)}
          height="200px"
          w="200px"
        ></IconButton>
      </SimpleGrid>
    </VStack>
  );
}

export default Board;
