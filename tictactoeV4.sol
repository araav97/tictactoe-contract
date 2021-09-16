// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title TicTacToe
 * @dev TicTacToe game
 */


///createGame joinGame
//place bets
//reveal


contract TicTacToe {
    enum Symbol {
        EMPTY,
        X,
        O,
        WILDCARD
    }
    
    enum PlayerStatus {
        NOT_JOINED,
        BETTING,
        REVEAL
    }
    
    //ISPLAYER COMMITTED
    //FINAL EVALUATED board
    //ADDRESS OF WINNER

    struct Game {
        // Players
        address playerOne;          // Player 1 X
        address playerTwo;          // Player 2 O
        // Symbol
        Symbol playerOneSymbol;
        Symbol playerTwoSymbol;
        
        bool hasPlayerOneBid;
        bool hasPlayerTwoBid;
        
        PlayerStatus playerOneStatus;
        PlayerStatus playerTwoStatus;
        
        uint8[9] playerOneBoard;
        uint8[9] playerTwoBoard;

        uint8 playerOneBidPoints;
        uint8 playerTwoBidPoints;
        
        uint256 bet;                // converted to wei
        
        Symbol[9] board;

    }

    struct Player {
        address player;
        uint256 score;
    }

    mapping(address => uint256) public players;     // mapping to store player and the gameId
    mapping(uint256 => Game) public games;          // mapping to store the player's board with gameId

    address[] public playersArray;
    uint256[] public gamesArray;

    function createGame(uint256 _bet) public {
        uint256 gameId = gamesArray.length;
        uint256 betAmt = _bet * (1 ether);          //in wei, to be used for v2.0
        
        //TODO
        //CHECK TO ENSURE THEY GOT SUFF BALANCE TO PLACE BET 
        //IF YES RETURN success + SEND TO CONTRACT
        //IF NO RETURN NOT ENOUGH
        
        gamesArray.push(gameId);
        players[msg.sender] = gameId;

        games[gameId] = Game({
            playerOne: msg.sender,
            playerTwo: address(0),
            playerOneSymbol: Symbol.X,
            playerTwoSymbol: Symbol.EMPTY,
            hasPlayerOneBid: false,
            hasPlayerTwoBid: false,
            playerOneStatus: PlayerStatus.NOT_JOINED,
            playerTwoStatus: PlayerStatus.NOT_JOINED,
            playerOneBoard: [0,0,0,0,0,0,0,0,0],
            playerTwoBoard: [0,0,0,0,0,0,0,0,0],
            playerOneBidPoints: 90,
            playerTwoBidPoints: 90,
            bet: betAmt,
            board: [
                Symbol.EMPTY,
                Symbol.EMPTY,
                Symbol.EMPTY,
                Symbol.EMPTY,
                Symbol.EMPTY,
                Symbol.EMPTY,
                Symbol.EMPTY,
                Symbol.EMPTY,
                Symbol.EMPTY
            ]            
        });
    }

    // function for player two to join a board
    function joinGame(uint256 _gameId)
        public
        returns (bool success, string memory reason)
    {
        if (gamesArray.length == 0 || _gameId > gamesArray.length) {
            return (false, "No such game exists.");
        }

        //TODO
        //CHECK TO ENSURE THEY GOT SUFF BALANCE TO PLACE BET 
        //IF YES RETURN success + SEND TO CONTRACT
        //IF NO RETURN NOT ENOUGH
        
        address player = msg.sender;
        Game storage game = games[_gameId];

        if (player == game.playerOne) {
            return (false, "You can't play against yourself.");
        }

        players[player] = _gameId;

        // Assign the new player to slot 2 if it is empty.
        if (game.playerTwoSymbol == Symbol.EMPTY) {
            game.playerTwo = player;
            game.playerTwoSymbol = Symbol.O;
            game.playerOneStatus = PlayerStatus.BETTING;
            game.playerTwoStatus = PlayerStatus.BETTING;
            return (
                true,
                "Joined as player Two. You can bid for the cells now."
            );
        }
        return (false, "All seats taken.");
    }

    function placeBids(uint8[9] memory bidsPlaced) public {
        uint256 _gameId = players[msg.sender];
        Game storage game = games[_gameId];
        
        if (msg.sender == game.playerOne) {
            game.playerOneBoard = bidsPlaced;
            game.hasPlayerOneBid = true;
        } else if (msg.sender == game.playerTwo) {
            game.playerTwoBoard = bidsPlaced;
            game.hasPlayerTwoBid = true;
        }
    }
    
    //if REVEAL THEN DO THIS DO THIS AFT BTH PARTIES PLACED BIDS
    function placeSpots() public {
        uint256 _gameId = players[msg.sender];
        Game storage game = games[_gameId];
        
        for (uint i = 0; i < 9; i++) {
            if (game.playerOneBoard[i] != 0 && game.playerTwoBoard[i] == 0) {
                game.board[i] = game.playerOneSymbol;
                game.playerOneBidPoints -= game.playerOneBoard[i];
            } else if (game.playerOneBoard[i] == 0 && game.playerTwoBoard[i] != 0) {
                game.board[i] = game.playerTwoSymbol;
                game.playerTwoBidPoints -= game.playerTwoBoard[i];
            } else if (game.playerOneBoard[i] != 0 && game.playerTwoBoard[i] != 0) {
                if (game.playerOneBoard[i] > game.playerTwoBoard[i]) {
                    game.board[i] = game.playerOneSymbol;
                    game.playerOneBidPoints -= game.playerOneBoard[i];
                }
                if (game.playerOneBoard[i] < game.playerTwoBoard[i]) {
                    game.board[i] = game.playerTwoSymbol;
                    game.board[i] = game.playerTwoSymbol;
                }
                if (game.playerOneBoard[i] == game.playerTwoBoard[i]) {
                    //game.board[i] = Symbol.WILDCARD;
                    uint randomNum = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, playersArray))) % 2;
                    if (randomNum == 1) {
                        game.board[i] = game.playerOneSymbol;
                        game.playerOneBidPoints -= game.playerOneBoard[i];
                    } else {
                        game.board[i] = game.playerTwoSymbol;
                        game.playerOneBidPoints -= game.playerTwoBoard[i];                        
                    }
                }
            }
        }
    }
    
    //todo: change to when status is reveal then eval
    function rowsOfWins() public view returns(int256) {
        uint8[3][8] memory winningStates = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];        
        int256 count = 0;
        uint256 _gameId = players[msg.sender];
        Game storage game = games[_gameId];
        Symbol[9] memory gameboard = game.board;
        
        Symbol player = (msg.sender == game.playerOne) ? game.playerOneSymbol : game.playerTwoSymbol;

        for (uint8 i = 0; i < winningStates.length; i++) {
            uint8[3] memory winningState = winningStates[i];
            if (gameboard[winningState[0]] == player &&
                gameboard[winningState[1]] == player &&
                gameboard[winningState[2]] == player
            ) {
                count ++;  
            }
        }
        return count;
    }




//for debugging
    function getB() public view returns (Symbol[9] memory) {
        uint256 _gameId = players[msg.sender];
        Game storage game = games[_gameId];
        return game.board;
    }

    function getOneB() public view returns (uint8[9] memory) {
        uint256 _gameId = players[msg.sender];
        Game storage game = games[_gameId];
        return game.playerOneBoard;
    }
    
    function getTwoB() public view returns (uint8[9] memory) {
        uint256 _gameId = players[msg.sender];
        Game storage game = games[_gameId];
        return game.playerTwoBoard;
    }
//for debugging




    //=============wager=============
    function initializePot() external payable {
    }

    function getPlayerBalance(address player) external view returns(uint256) {
        return player.balance / (1 ether) ;
    }

    function approveBet(uint256 bet) public view returns (bool) {
        if (address(this).balance >= bet) {
            return true;
        } else {
            return false;
        }
    }
    
    function payOutWinnings(address payable _receiver, uint256 _amount) external { //send frm smart contract to receipient
        _receiver.transfer(_amount * (1 ether));
    }









    //=============stats=============
    
    /*
    

    // returns details about the board the player is on
    function getBoard()
        public
        view
        returns (
//            Symbol[9] memory,
            Symbol symbol,
            Status status,
//            GameType gameType,
            uint256 gameId,
            address otherPlayer
        )
    {
        uint256 _gameId = players[msg.sender];
        Game storage game = games[_gameId];
        Symbol playerSymbol = (game.playerOne == msg.sender)
            ? game.playerOneSymbol
            : game.playerTwoSymbol;

        address _otherPlayer = (game.playerOne == msg.sender)
            ? game.playerTwo
            : game.playerOne;
        return (
//            games[_gameId].board,
            playerSymbol,
            game.gameStatus,
            _gameId,
            _otherPlayer
        );
    }
    
    
    
    
    function getNumofGames() public view returns (uint256) {
        return gamesArray.length;
    }

    function gameStats()
        public
        view
        returns (
            uint256 openGame,
            uint256 gameInProgress,
            uint256 gameComplete
        )
    {
        uint256 open = 0;
        uint256 inProgress = 0;
        uint256 complete = 0;

        for (uint256 i = 0; i < gamesArray.length; i++) {
            Game storage game = games[i];
            if (game.gameStatus == Status.WAITING_FOR_PLAYER) {
                open++;
            } else if (game.gameStatus == Status.BETTING) {
                inProgress++;
            } else {
                complete++;
            }
        }
        return (open, inProgress, complete);
    }

    // 10 most recent games that are available
    function availGames()
        public
        view
        returns (
            uint256[] memory gameId,
            uint256[] memory bet,
            address[] memory playerOneId
        )
    {
        uint256 maxLen = 10;
        uint256[] memory gameIds = new uint256[](maxLen);
        uint256[] memory bets = new uint256[](maxLen);
        address[] memory playerOneIds = new address[](maxLen);

        uint256 noGames = 0;
        uint256 maxGames = 0;
        if (gamesArray.length < 10) {
            noGames = 0;
            maxGames = gamesArray.length;
        } else {
            noGames = gamesArray.length - 10;
            maxGames = gamesArray.length;
        }

        for (uint256 i = noGames; i < maxGames; i++) {
            uint256 j = 0;
            Game storage game = games[i];
            if (
                game.gameStatus == Status.WAITING_FOR_PLAYER &&
                game.playerOne != address(0)
            ) {
                gameIds[j] = i;
                bets[j] = game.bet;
                playerOneIds[j] = game.playerOne;
                j++;
            }
        }
        return (gameIds, bets, playerOneIds);
    }
    */
    
}
