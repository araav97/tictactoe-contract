import {
  Flex,
  useColorMode,
  Circle,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";

function Header(props) {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("blue.800", "blue.200");
  const color = useColorModeValue("white", "gray.800");

  const bg_hover = useColorModeValue("blue.700", "blue.300");
  return (
    <Flex
      as="nav"
      align="center"
      justify="flex-end"
      wrap="wrap"
      padding={6}
      bg="blue.600"
      color="white"
      w="100%"
    >
      <Button
        w="8vw"
        mr={5}
        bg={bg}
        color={color}
        _hover={{
          background: bg_hover,
          color: color,
        }}
        key="Bot"
        onClick={props.setGameType}
      >
        Bot
      </Button>
      <Button
        w="8vw"
        mr={5}
        bg={bg}
        color={color}
        _hover={{
          background: bg_hover,
          color: color,
        }}
        key="Player"
        onClick={props.setGameType}
      >
        Player
      </Button>
      <Button
        mr={5}
        bg={bg}
        color={color}
        _hover={{
          background: bg_hover,
          color: color,
        }}
        onClick={props.connectMM}
      >
        Connect MetaMask
      </Button>
      <Circle>
        <IconButton
          colorScheme="teal"
          variant="unstyled"
          icon={<SunIcon />}
          onClick={toggleColorMode}
        />
      </Circle>
    </Flex>
  );
}

export default Header;
