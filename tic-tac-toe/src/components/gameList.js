import {
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
  VStack,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { useState, useRef } from "react";

function GameList(props) {
  const [bet, setBet] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const onClose = () => setIsOpen(false);

  const bg = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      <Heading m={10} mb={3}>
        Player vs Player
      </Heading>
      <VStack w="60%" p={5} pb={10} borderWidth="3px" borderRadius="lg">
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
          Step 4: Enjoy your winnings or try beat your friend again!
        </Text>
      </VStack>
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
                    placeHolder="Eth"
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
                onClick={() => {
                  props.handleCreateGame(bet);
                  setIsOpen(false);
                }}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Text mb={10}>or</Text>
      {props.openGames.map((el) => (
        <Box
          key={el}
          as="button"
          _hover={{
            background: bg,
          }}
          borderWidth="1px"
          borderRadius="lg"
          w="70vw"
          onClick={() => props.handleSelectGame(el.gameId, el.bet)}
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
      ))}
    </>
  );
}
export default GameList;
