import {
  VStack,
  useColorModeValue,
  Heading,
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
      <Text p={5} w="60%">
        Decentral Tic-Tac-Toe is a tic-tac-toe game running on the Ropsten
        Network.
        <br />
        <br />
        Choose between two games Bot vs Player normal Tic Tac Toe or Player vs
        Player Tic Tac Toe with a twist!
      </Text>
      <VStack w="60%" p={5} pb={10} borderWidth="3px" borderRadius="lg">
        <Heading p={5}>How to play?</Heading>
        <Text pl={5} w="100%">
          Step 1: Connect Metmask
        </Text>
        <Text pl={5} w="100%">
          Step 2: Click Bot or Player modes at the top
        </Text>
        <Heading size="lg" p={5}>
          Bot Tic Tac Toe
        </Heading>
        <Text pl={5} w="100%">
          Just a standard Tic Tac Toe game with a simple bot to warm up your tic
          tac toe game!
        </Text>
        <Heading size="lg" p={5}>
          Player Tic Tac Toe
        </Heading>
        <Text pl={5} w="100%">
          You will be playing with another player live on the blockchain and the
          aim of the game is to win as many rows as possible! Each player will
          be given a total of 90 points to place on any cell on the board any
          division you like.
          <br />
          <br />
          Once both players has submitted their bids, both players will call
          reveal to show their choices. Whichever bid higher for a given cell
          wins that cell. Same bids will end up as a wildcard for both
          players(counts to their rows)!
          <br />
          <br />
          The winner will then be decided by the number of winning rows formed!
        </Text>
        <Text pl={5} w="100%">
          Step 1: Create a game room with a bet or join an existing game room.
          Host will be player one. (requires a metamask transaction).
        </Text>
        <Text pl={5} w="100%">
          Step 2: This is the bidding phase, choose how you want to split your
          90 bid points and once done, submit the bid with another transaction.
        </Text>
        <Text pl={5} w="100%">
          Step 3: Once both players has placed their bids, both players must
          click reveal to get the final result.
        </Text>
        <Text pl={5} w="100%">
          Step 4: Enjoy your winnings or try beat and your friend again!
        </Text>
      </VStack>
    </VStack>
  );
}

export default Home;
