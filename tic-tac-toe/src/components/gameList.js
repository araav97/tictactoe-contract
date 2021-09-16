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
          onClick={() => props.handleSelectGame(el.gameId)}
        >
          <HStack p={5} justify="space-between">
            <Text as="kbd" size="m">
              {el.host}
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
