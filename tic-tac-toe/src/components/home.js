import { useState } from "react";
import {
  SimpleGrid,
  VStack,
  Button,
  IconButton,
  Icon,
  useColorModeValue,
  Heading,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

function Home(props) {
  const bg = useColorModeValue("red.300", "red.700");
  return (
    <VStack>
      <Center h={10} w="100%" bg={bg}>
        <WarningTwoIcon />
        <Text>
          Take note that moves might take awhile as they are running on the
          blockchain!
        </Text>
        <WarningTwoIcon />
      </Center>
      <Heading p={5}>Tic-Tac-Toe on Ropsten</Heading>
      <Text p={5} w="50%">
        Decentral Tic-Tac-Toe is a tic-tac-toe game running on the Ropsten
        Network. Choose between Bot vs Player or Player vs Player.
      </Text>
      <VStack w="50%" p={5} pb={10} borderWidth="3px" borderRadius="lg">
        <Heading p={5}>How to play?</Heading>
        <Text pl={5} w="100%">
          Step 1: Connect Metmask
        </Text>
        <Text pl={5} w="100%">
          Step 2: Click Player or Bot
        </Text>
        <Text pl={5} w="100%">
          Step 3: For bot games, simply click start game to begin a new game and
          carry on playing! For player vs player games, click to join an open
          game or create a new game and wait for someone to join!
        </Text>
      </VStack>
    </VStack>
  );
}

export default Home;
