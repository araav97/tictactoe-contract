import {
  Flex,
  useColorMode,
  Circle,
  IconButton,
  Button,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

function Header(props) {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("blue.800", "blue.200");
  const color = useColorModeValue("white", "gray.800");

  const connectMM = async (t) => {
    t.preventDefault();
    await window.ethereum.enable();
  };

  const bg_hover = useColorModeValue("blue.700", "blue.300");
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="blue.600"
      color="white"
      w="100%"
    >
      <Heading
        _hover={{
          cursor: "pointer",
        }}
        onClick={props.setPage}
      >
        Decentral Tic Tac Toe
      </Heading>
      <div>
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
          onClick={props.setPage}
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
          onClick={props.setPage}
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
          onClick={connectMM}
        >
          Connect MetaMask
        </Button>
        <IconButton
          mt={-1}
          colorScheme="blue"
          variant="unstyled"
          icon={<SunIcon />}
          onClick={toggleColorMode}
        />
      </div>
    </Flex>
  );
}

export default Header;
