import {
  Flex,
  useColorMode,
  Circle,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";

function Header() {
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
        mr={5}
        bg={bg}
        color={color}
        _hover={{
          background: bg_hover,
          color: color,
        }}
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
