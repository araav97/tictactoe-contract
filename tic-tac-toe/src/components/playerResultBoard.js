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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BsCircle } from "react-icons/bs";

function PlayerResultBoard(props) {
  const [results, setResults] = useState({
    playerOne: [12, 1, 1, 1, 1, 1, 1, 1, 2],
    playerTwo: [12, 1, 1, 1, 1, 1, 1, 1, 2],
    result: [0, 1, 1, 1, 1, 1, 1, 0, 1],
    winnder: "test",
  });

  return (
    <VStack>
      <HStack w="80vw" justify="space-around">
        <VStack>
          <Heading pt={10} size="md">
            Player 1's Board
          </Heading>
          <SimpleGrid pt={3} w="315px" columns={3} spacing="10px">
            {results.playerOne.map((value, index) => (
              <Button
                fontSize="4xl"
                key={index}
                bg="blue.500"
                h="100px"
                w="100px"
              >
                {value}
              </Button>
            ))}
          </SimpleGrid>
        </VStack>
        <VStack>
          <Heading pt={10} size="md">
            Player 2's Board
          </Heading>
          <SimpleGrid pt={3} w="315px" columns={3} spacing="10px">
            {results.playerTwo.map((value, index) => (
              <Button
                fontSize="4xl"
                key={index}
                bg="blue.500"
                h="100px"
                w="100px"
              >
                {value}
              </Button>
            ))}
          </SimpleGrid>
        </VStack>
      </HStack>
      <Heading pt={10} size="md">
        Final Board
      </Heading>
      <SimpleGrid pt={3} w="315px" columns={3} spacing="10px">
        {results.result.map((symbol, index) => (
          <IconButton
            key={index}
            icon={
              symbol === 1 ? (
                <CloseIcon boxSize="2em" />
              ) : (
                <Icon boxSize="2em" as={BsCircle} />
              )
            }
            bg="blue.500"
            h="100px"
            w="100px"
          ></IconButton>
        ))}
      </SimpleGrid>
      <br />
      <HStack>
        {/* <Button w="20vw" size="lg" onClick={() => handleBoardSubmit(board)}>
          Confirm
        </Button> */}
      </HStack>
    </VStack>
  );
}

export default PlayerResultBoard;
