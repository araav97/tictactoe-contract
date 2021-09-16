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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BsCircle } from "react-icons/bs";
import PlayerBetBoard from "./playerBetBoard";
import PlayerResultBoard from "./playerResultBoard";
const MINUTE_MS = 5000;

const getBoardFromChain = async (
  web3,
  contract,
  setBoard,
  setPlayerSymbol,
  toast,
  setOtherPlayer
) => {
  let board = await contract.methods.getBoard().call({
    from: web3.currentProvider.selectedAddress,
  });
  setOtherPlayer(board.otherPlayer);
  setPlayerSymbol(board.symbol);
  board = board[0].map((el) => parseInt(el));
  setBoard(board);

  const currentPlayer = board.symbol === "1" ? "3" : "5";
  const otherPlayer = board.symbol === "2" ? "3" : "5";

  if (board.status === currentPlayer) {
    if (!toast.isActive("win-toast")) {
      toast({
        id: "win-toast",
        title: "You Win",
        status: "success",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    }
  } else if (board.status === otherPlayer) {
    if (!toast.isActive("lose-toast")) {
      toast({
        id: "lose-toast",
        title: "You Lost",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    }
  } else if (board.status === "6") {
    if (!toast.isActive("draw-toast")) {
      toast({
        id: "draw-toast",
        title: "Draw",
        status: "warning",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }
};

function PlayerBoard(props) {
  const { web3, contract } = props;
  const [game, setGame] = useState({
    // gameStatus: 0, //0 - waiting, 1 - betting, 2 - reveal, 3 - completed
    bet: 0,
    playerOneAddress: "",
    playerTwoAddress: "",
    playerOneStatus: 0, //0 - not joined, 1 - bet, 2 - reveal
    playerTwoStatus: 0,
    playerOneBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    playerTwoBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  const [currentPlayer, setCurrentPlayer] = useState({
    otherPlayer: "ttase",
    otherPlayerStatus: "bet", //join, bet, reveal
    gameStatus: "wait", //wait, bet, reveal, result
  });

  useEffect(() => {
    const evaluateStatus = () => {
      let status = {
        otherPlayer: "",
        otherPlayerStatus: "bet", //join, bet, reveal
        gameStatus: "", //wait, bet, reveal, result
      };
      if (
        game.playerTwoAddress === "0x0000000000000000000000000000000000000000"
      ) {
        // waiting for player
        status.gameStatus = "wait";
        return;
      } else if (
        game.playerTwoAddress === web3.currentProvider.selectedAddress
      ) {
        // Current player is player two
        status.otherPlayer = game.playerOneAddress;

        // Status of the other player
        if (game.playerOneStatus === 0) {
          // If player 2 has placed his bet
          status.otherPlayerStatus = "bet";
          // If current player has bet
        } else if (game.playerOneStatus === 1) {
          status.otherPlayerStatus = "reveal";
        } else {
          status.otherPlayerStatus = "result";
        }

        //Status of current player
        if (game.playerTwoStatus === 0) {
          status.gameStatus = "bet";
        } else if (game.playerTwoStatus === 1) {
          status.gameStatus = "reveal";
        } else {
          status.gameStatus = "result";
        }
      } else {
        // Current player is player one
        status.otherPlayer = game.playerTwoAddress;

        // Status of the other player
        if (game.playerTwoStatus === 0) {
          // If player 2 has placed his bet
          status.otherPlayerStatus = "bet";
          // If current player has bet
        } else if (game.playerTwoStatus === 1) {
          status.otherPlayerStatus = "reveal";
        } else {
          status.otherPlayerStatus = "result";
        }

        //Status of current player
        if (game.playerOneStatus === 0) {
          status.gameStatus = "bet";
        } else if (game.playerOneStatus === 1) {
          status.gameStatus = "reveal";
        } else {
          status.gameStatus = "result";
        }
      }
      setCurrentPlayer(status);
      console.log(currentPlayer);
    };
    evaluateStatus();
  }, [game]);

  const handleReveal = async () => {};

  // handler
  const handleBoardSubmit = async (board) => {
    const sum = board.reduce((partial_sum, a) => partial_sum + a, 0);
    if (sum > 90) {
      alert("Please bid at most 90");
    }
    // try {
    //   // const gas =
    //   //   (await contract.methods.makeMove(position).estimateGas()) + 100000;
    //   await contract.methods.makeMove(position).send({
    //     from: web3.currentProvider.selectedAddress,
    //     gas: 4100000,
    //   });
    //   getBoardFromChain(
    //     web3,
    //     contract,
    //     setBoard,
    //     setPlayerSymbol,
    //     toast,
    //     setOtherPlayer
    //   );
    //   toast({
    //     title: "Move Made.",
    //     description: "Please wait for your opponent to make their move",
    //     status: "success",
    //     position: "bottom-right",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };
  // useEffect(() => {
  //   getBoardFromChain(
  //     props.web3,
  //     props.contract,
  //     setBoard,
  //     setPlayerSymbol,
  //     toast,
  //     setOtherPlayer
  //   );
  //   const interval = setInterval(() => {
  //     getBoardFromChain(
  //       props.web3,
  //       props.contract,
  //       setBoard,
  //       setPlayerSymbol,
  //       toast,
  //       setOtherPlayer
  //     );
  //   }, MINUTE_MS);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, []);

  return (
    <VStack>
      <Heading mt={10}>Player vs Player</Heading>
      <Button
      // onClick={() =>
      //   getBoardFromChain(
      //     props.web3,
      //     props.contract,
      //     setBoard,
      //     setPlayerSymbol,
      //     toast,
      //     setOtherPlayer
      //   )
      // }
      >
        Refresh
      </Button>
      {
        {
          wait: <Heading>Please wait for another player to join</Heading>,
          bet: (
            <>
              <Text as="kbd">{`Waiting for ${currentPlayer.otherPlayer} to ${currentPlayer.otherPlayerStatus}`}</Text>
              <PlayerBetBoard
                board={game.board}
                bet={game.bet}
                handleBoardSubmit={handleBoardSubmit}
              />
            </>
          ),
          reveal: (
            <>
              <Text as="kbd">{`Waiting for ${currentPlayer.otherPlayer} to ${currentPlayer.otherPlayerStatus}`}</Text>
              <Button w="20vw" size="lg" onClick={() => handleReveal()}>
                Reveal
              </Button>
            </>
          ),
          result: (
            <>
              <Text as="kbd">{`Waiting for ${currentPlayer.otherPlayer} to ${currentPlayer.otherPlayerStatus}`}</Text>
              <PlayerResultBoard />
            </>
          ),
        }[currentPlayer.gameStatus]
      }
    </VStack>
  );
}

export default PlayerBoard;
