import { useState, useEffect } from "react";
import {
  SimpleGrid,
  VStack,
  Button,
  IconButton,
  Icon,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon, StarIcon } from "@chakra-ui/icons";
import { BsCircle } from "react-icons/bs";

function PlayerResultBoard(props) {
  const [results, setResults] = useState({
    playerOne: props.game.playerOneBoard,
    playerTwo: props.game.playerTwoBoard,
    result: props.game.board,
  });

  useEffect(() => {
    setResults({
      playerOne: props.game.playerOneBoard,
      playerTwo: props.game.playerTwoBoard,
      result: props.game.board,
    });
  }, [props.game]);
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
              symbol === "1" ? (
                <CloseIcon boxSize="2em" />
              ) : symbol === "2" ? (
                <Icon boxSize="2em" as={BsCircle} />
              ) : (
                <StarIcon boxSize="2em" />
              )
            }
            bg="blue.500"
            h="100px"
            w="100px"
          ></IconButton>
        ))}
      </SimpleGrid>
      <br />
      <HStack></HStack>
    </VStack>
  );
}

export default PlayerResultBoard;
