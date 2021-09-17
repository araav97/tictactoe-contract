import { useState, useEffect } from "react";
import { VStack, Button, Heading, Text } from "@chakra-ui/react";
import PlayerBetBoard from "./playerBetBoard";
import PlayerResultBoard from "./playerResultBoard";
const MINUTE_MS = 5000;

function PlayerBoard(props) {
  const { web3, contract } = props;
  const [game, setGame] = useState({
    // gameStatus: 0, //0 - waiting, 1 - betting, 2 - reveal, 3 - completed
    gameId: "0",
    bet: 0,
    playerOne: "",
    playerTwo: "",
    playerOneStatus: 0, //0 - not joined, 1 - bet, 2 - reveal
    playerTwoStatus: 0,
    playerOneBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    playerTwoBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  const [currentPlayer, setCurrentPlayer] = useState({
    otherPlayer: "",
    otherPlayerNextAction: "bet", //join, bet, reveal
    gameStatus: "wait", //wait, bet, reveal, result
  });

  const getBoardFromChain = async () => {
    let board = await contract.methods
      .getBoard(web3.currentProvider.selectedAddress)
      .call({
        from: web3.currentProvider.selectedAddress,
      });

    setGame({
      gameId: board.gameId,
      bet: web3.utils.fromWei(board.bet, "ether"),
      playerOne: board.playerOne,
      playerTwo: board.playerTwo,
      playerOneStatus: board.playerOneStatus,
      playerTwoStatus: board.playerTwoStatus,
      playerOneBoard: board.playerOneBoard,
      playerTwoBoard: board.playerTwoBoard,
      board: board.board,
    });
  };

  const handleReveal = async () => {
    const gas = (await contract.methods.evaluate().estimateGas()) * 2;
    await contract.methods.evaluate().send({
      from: web3.currentProvider.selectedAddress,
      gas,
    });
    getBoardFromChain();
  };

  // handler
  const handleBoardSubmit = async (board) => {
    const sum = board.reduce((partial_sum, a) => partial_sum + a, 0);
    if (sum > 90) {
      alert("Please bid at most 90");
      return;
    }
    try {
      const gas = (await contract.methods.placeBids(board).estimateGas()) * 5;
      await contract.methods.placeBids(board).send({
        from: web3.currentProvider.selectedAddress,
        gas,
      });
      getBoardFromChain();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const evaluateStatus = () => {
      const status = {
        otherPlayer:
          // One is uppercase... one is lower gdi
          game.playerOne.toLowerCase() === web3.currentProvider.selectedAddress
            ? game.playerTwo
            : game.playerOne,
        otherPlayerNextAction: "",
        gameStatus: "wait", //wait, bet, reveal, result
      };

      // console.log(status);
      if (game.playerTwo === "0x0000000000000000000000000000000000000000") {
        // waiting for player
        status.gameStatus = "wait";
      } else if (
        game.playerTwo.toLowerCase() === web3.currentProvider.selectedAddress
      ) {
        // Status of the other player
        if (game.playerOneStatus === "1") {
          // If player 2 has placed his bet
          status.otherPlayerNextAction = "bet";
          // If current player has bet
        } else if (game.playerOneStatus === "2") {
          status.otherPlayerNextAction = "reveal";
        } else if (game.playerOneStatus === "3") {
          status.otherPlayerNextAction = "result";
        } else if (game.playerOneStatus === "4") {
          status.otherPlayerNextAction = "won";
        } else if (game.playerOneStatus === "5") {
          status.otherPlayerNextAction = "lost";
        } else {
          status.otherPlayerNextAction = "draw";
        }

        //Status of current player
        if (game.playerTwoStatus === "1") {
          status.gameStatus = "bet";
        } else if (game.playerTwoStatus === "2") {
          status.gameStatus = "reveal";
        } else {
          status.gameStatus = "result";
        }
      } else {
        if (game.playerTwoStatus === "1") {
          // If player 2 has placed his bet
          status.otherPlayerNextAction = "bet";
          // If current player has bet
        } else if (game.playerTwoStatus === "2") {
          status.otherPlayerNextAction = "reveal";
        } else if (game.playerTwoStatus === "3") {
          status.otherPlayerNextAction = "result";
        } else if (game.playerTwoStatus === "4") {
          status.otherPlayerNextAction = "won";
        } else if (game.playerTwoStatus === "5") {
          status.otherPlayerNextAction = "lost";
        } else {
          status.otherPlayerNextAction = "draw";
        }

        //Status of current player
        if (game.playerOneStatus === "1") {
          status.gameStatus = "bet";
        } else if (game.playerOneStatus === "2") {
          status.gameStatus = "reveal";
        } else {
          status.gameStatus = "result";
        }
      }
      setCurrentPlayer(status);
    };

    evaluateStatus();
  }, [game]);

  useEffect(() => {
    getBoardFromChain();
    const interval = setInterval(() => {
      getBoardFromChain();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <VStack>
      <Heading mt={10}>Player vs Player</Heading>
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
      <Button onClick={() => getBoardFromChain()}>Refresh</Button>
      {
        {
          wait: <Heading>Please wait for another player to join</Heading>,
          bet: (
            <>
              <Text as="kbd">{`Waiting for ${currentPlayer.otherPlayer} to ${currentPlayer.otherPlayerNextAction}`}</Text>
              <PlayerBetBoard
                board={game.board}
                bet={game.bet}
                handleBoardSubmit={handleBoardSubmit}
              />
            </>
          ),
          reveal: (
            <>
              <Text as="kbd">{`Waiting for ${currentPlayer.otherPlayer} to ${currentPlayer.otherPlayerNextAction}`}</Text>
              <Button w="20vw" size="lg" onClick={() => handleReveal()}>
                Reveal
              </Button>
            </>
          ),
          result: (
            <>
              <Text as="kbd">{`You have ${
                currentPlayer.otherPlayerNextAction === "draw"
                  ? "draw"
                  : currentPlayer.otherPlayerNextAction === "won"
                  ? "lost"
                  : "won"
              }`}</Text>
              <PlayerResultBoard game={game} />
            </>
          ),
        }[currentPlayer.gameStatus]
      }
    </VStack>
  );
}

export default PlayerBoard;
