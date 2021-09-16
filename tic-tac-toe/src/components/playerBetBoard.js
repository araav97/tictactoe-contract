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

function PlayerBetBoard(props) {
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const { otherPlayer, bet, handleBoardSubmit } = props;

  const color = useColorModeValue("red.600", "red.300");
  return (
    <VStack>
      <Text>
        Take note that you have only 90 points to use, if you exceed, the
        contract might be reverted!
      </Text>
      <SimpleGrid pt={3} w="630px" columns={3} spacing="10px">
        {board.map((amount, index) => (
          <Button key={index} bg="blue.500" height="200px" w="200px">
            <NumberInput defaultValue={0} clampValueOnBlur={false}>
              <NumberInputField
                inputMode="numeric"
                onChange={(e) =>
                  setBoard(
                    board.map((el, idx) =>
                      idx === index ? parseInt(e.target.value) : el
                    )
                  )
                }
              />
            </NumberInput>
          </Button>
        ))}
      </SimpleGrid>
      <br />
      <HStack>
        <Button w="20vw" size="lg" onClick={() => handleBoardSubmit(board)}>
          Confirm
        </Button>
      </HStack>
    </VStack>
  );
}

export default PlayerBetBoard;
