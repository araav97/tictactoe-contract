// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */

contract TicTacToe {
    
    enum Symbol { EMPTY, X, O }
    enum Status { WAITING_FOR_PLAYER, PLAYER_ONE_MOVE, PLAYER_TWO_MOVE, PLAYER_ONE_WON, PLAYER_TWO_WON, BOT_WON, DRAW }
    enum GameType { BOT, PLAYER }
    
    struct Game {
        // Players
        address playerOne; // Player 1 X
        address playerTwo; // Player 2 O
        
        // Symbol
        Symbol playerOneSymbol;
        Symbol playerTwoSymbol;
        
        //Status
        Status gameStatus;
        GameType gameType;
        
        uint256 bet; // converted to wei
        
        Symbol[9] board;
    }
    
    struct Player {
        address player;
        uint256 score;
    }
    
    address payable public admin;
    
    uint256 greenPot;

    constructor() {
        greenPot = 100 * (1 ether);
    }

    mapping(address => uint256) public players;     // mapping to store player and the gameId
    mapping(uint256 => Game) public games;          // mapping to store the player's board with gameId
    mapping(address => uint256) public scoreboard;
    mapping (uint256 => Player) public leaderboard;
    
    address[] public playersArray;
    uint256[] public gamesArray;
    
    function createGame(uint256 _bet, bool isBot) public {
        uint256 gameId = gamesArray.length;
        uint256 betAmt = _bet * (1 ether); //in wei
        gamesArray.push(gameId);
        players[msg.sender] = gameId;
        
        //require(approveBet(betAmt));
        //depositToPot(betAmt);

        games[gameId] = Game({
            playerOne: msg.sender,
            playerTwo: address(0),
            playerOneSymbol: Symbol.X,
            playerTwoSymbol: Symbol.EMPTY,
            gameStatus: Status.WAITING_FOR_PLAYER,
            gameType: GameType.PLAYER,
            bet: betAmt,
            board: [Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY, Symbol.EMPTY]
        });
        
        Game storage board = games[gameId];
        
        if (isBot) {
            board.gameType = GameType.BOT;
            board.playerTwoSymbol = Symbol.O;
            
            if (generateRandomStart() == 1) { //bot starts
                int move = botMove(board.board, board.playerTwoSymbol, board.playerOneSymbol);
                board.board[uint256(move)] = board.playerTwoSymbol;
                board.gameStatus = Status.PLAYER_TWO_MOVE;
            } else {
                board.gameStatus = Status.PLAYER_ONE_MOVE;
            }
        }        
    }

    function joinGame(uint256 _gameId) public returns (bool success, string memory reason) {
        if (gamesArray.length == 0 || _gameId > gamesArray.length) {
            return (false, "No such game exists.");
        }
        
        address player = msg.sender;
        Game storage game = games[_gameId];
        
        if (player == game.playerOne) {
            return (false, "You can't play against yourself.");
        }
        
        
        // Assign the new player to slot 2 if it is empty.
        if (game.playerTwoSymbol == Symbol.EMPTY) {
            game.playerTwo = player;
            game.playerTwoSymbol = Symbol.O;
            game.gameStatus = Status.PLAYER_ONE_MOVE;
            //emit PlayerJoinedGame(_gameId, player, uint8(players.playerTwo));
            return (true, "Joined as player Two player. Player one can make the first move.");
        }
        return (false, "All seats taken.");
    }
    
    function evaluate(Symbol[9] memory gameboard, Symbol player, Symbol opponent) internal pure returns(int) {
        uint8[3][8] memory winningStates = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [6, 4, 2]
            ];
        
        for (uint8 i = 0; i < winningStates.length; i++) {
            uint8[3] memory winningState = winningStates[i];
            if (
                gameboard[winningState[0]] == player && 
                gameboard[winningState[1]] == player && 
                gameboard[winningState[2]] == player) {
                    return 1;
            } else if (
                gameboard[winningState[0]] == opponent && 
                gameboard[winningState[1]] == opponent && 
                gameboard[winningState[2]] == opponent) {
                    return -1;
            }
        }
        return 0;
    }
    
    function isMovesLeft(Symbol[9] memory gameboard) internal pure returns(bool) {
        for(uint8 i = 0; i < gameboard.length; i++) {
            if (gameboard[i] == Symbol.EMPTY) {
                return true;
            }
        }
        return false;
    }
    
    //TODO: check for bot make move after game is won
    function makeMove(uint8 position) public returns (string memory) {
        uint256 gameID = players[msg.sender];
        Game storage _game = games[gameID];
        
        Symbol playerSymbol;
        Symbol otherPlayerSymbol;
        Symbol boardPosition = _game.board[position];
        
        // Check that game is still in IN_PROGRESS
        require(_game.gameStatus == Status.PLAYER_ONE_MOVE || _game.gameStatus == Status.PLAYER_TWO_MOVE);
        
        // Check if it is a valid position
        require(position >= 0 && position <= 8);

        // Check if a piece is already there
        require(boardPosition == Symbol.EMPTY);
        
        if (_game.playerOne == msg.sender) {
            playerSymbol = _game.playerOneSymbol;
            otherPlayerSymbol = _game.playerTwoSymbol;
        } else {
            playerSymbol = _game.playerTwoSymbol;
            otherPlayerSymbol = _game.playerOneSymbol;
        }
        
        // Make the move
        _game.board[position] = playerSymbol;
        
         if (_game.gameType == GameType.BOT) {
            //bot move
            int move = botMove(_game.board, otherPlayerSymbol, playerSymbol);
            _game.board[uint256(move)] = otherPlayerSymbol;
            
            if (evaluate(_game.board, otherPlayerSymbol, playerSymbol) == 1) {
                _game.gameStatus = Status.BOT_WON;
                //other_player.transfer(wagers_[other_player]); //Other player wins - Wager goes to player
                return "lost";
            }
            
            if (isMovesLeft(_game.board) == false) {
                _game.gameStatus = Status.DRAW;
                return "draw"; //wager goes to bot
            }
        } else if (_game.gameType == GameType.PLAYER) {
            //check win
            if (evaluate(_game.board, playerSymbol, otherPlayerSymbol) == 1) {
                
                if (playerSymbol == _game.playerOneSymbol) {
                    _game.gameStatus = Status.PLAYER_ONE_WON;
 //                   _game.otherPlayer.transfer(_game.bet);
                } else {
                    _game.gameStatus = Status.PLAYER_TWO_WON;
                }
    
                update_scoreboard();
                update_leaderboard();
                
                //TODO: havent add in wagers
                //host_player.transfer(wagers_[host_player]);
                return "win";
            }
                
            if (isMovesLeft(_game.board) == false) {
                _game.gameStatus = Status.DRAW;
                
                //We take money
                return "draw";
            }
        }
        return "next move";
    }
    

    function getBoard() public view returns (Symbol[9] memory, Symbol symbol, Status status) {
        Symbol playerSymbol;
        uint256 gameId = players[msg.sender];
        Game storage game = games[gameId];
        
        
        playerSymbol = (game.playerOne == msg.sender) ? game.playerOneSymbol : game.playerTwoSymbol;
        
        /*
        if (game.playerOne == msg.sender) {
            playerSymbol = (game.playerOneSymbol == Symbol.X) ? 1: 2;
        } else {
            playerSymbol = (game.playerTwoSymbol == Symbol.X) ? 1: 2;
        }
        */
        
        return (games[gameId].board, playerSymbol, game.gameStatus);
    }
    
    
    //=============bot=============
    function generateRandomStart() internal view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, playersArray))) % 2;
    }
    
    function botMove(Symbol[9] memory board, Symbol botSymbol, Symbol playerSymbol) pure internal returns(int) {
        
        // Put centre if possible
        if (board[4] == Symbol.EMPTY) {
            return 4;
        }
        
        for(int i = 0; i < int(board.length); i++) {
            if (board[uint256(i)] == Symbol.EMPTY) {
                board[uint256(i)] = botSymbol;
                
                // If can win, win
                int score = evaluate(board, botSymbol, playerSymbol);
                if (score == 1) {
                    return i;
                }
                
                // Remove
                board[uint256(i)] = Symbol.EMPTY;
            }
        }
        
        // If opponent is 1 away from winning
        for(int i = 0; i < int(board.length); i++) {
            if (board[uint256(i)] == Symbol.EMPTY) {
                // Opponent move
                board[uint256(i)] = playerSymbol;
                
                int oppScore = evaluate(board, playerSymbol, botSymbol);
                
                // If opponent can win with one more move, block it
                if (oppScore == 1) {
                    return i;
                }
            }
        }
        
        // Place it somewhere along the path of the opponents move
        for(int i = 0; i < int(board.length); i++) {
            if (board[uint256(i)] == playerSymbol) {
                for (int j = -4; i < 5; j++) {
                    if (j + i >= 0 && j + i < 9) {
                        return j + i;
                    }
                }
            }
        }
        return -1;
    } 
         

    
    
    //=============leaderboard=============
    function update_scoreboard() internal {
        scoreboard[msg.sender] += 1;
    }

    function get_score(address player) public view returns(uint256) {
        return scoreboard[player];
    }
    
    function update_leaderboard() internal {
        uint maxLen = 10;
        uint256 player_score = get_score(msg.sender);

        if (player_score > leaderboard[maxLen-1].score) {
            for (uint i = 0; i < maxLen; i ++) {
                if (player_score > leaderboard[i].score) {
                    if (msg.sender == leaderboard[i].player) {
                        leaderboard[i].score = player_score;
                    } else { //shift down
                        Player memory curr_player = leaderboard[i];
                        for (uint j = i + 1; j < maxLen + 1; j ++) {
                            Player memory next_player = leaderboard[j];
                            leaderboard[j] = curr_player;
                            curr_player = next_player;
                        }
                        leaderboard[i] = Player({
                            player: msg.sender,
                            score: player_score
                        });
                    }
                }
            }
            delete leaderboard[maxLen];
        }
    }
    
    //=============wager=============
    function initializePot() external payable {
    }
    
    function getPlayerBalance(address player) external view returns(uint256) {
        return player.balance / (1 ether) ;
    }
    
    function getPotAmt() public view returns (uint256) {
        return address(this).balance /(1 ether);
    }
    
    function approveBet(uint256 bet) public view returns (bool) {
        if (address(this).balance >= bet) {
            return true;
        } else {
            return false;
        }
    }
    
    //seds to receiver instead lol
    function sendToPot(address to, uint256 amt) public {
        address payable receiver = payable(to);
        receiver.transfer(amt * (1 ether));
    }

    //works
    function payOutWinnings(address payable _receiver, uint256 _amount) external { //send frm smart contract to receipient
        _receiver.transfer(_amount * (1 ether));
    } 
    
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function transfer(address payable to, uint256 amount) public {
        to.transfer(amount);
    }  
    
    //=============stats=============
    function getNumofGames() public view returns (uint256) {
        return gamesArray.length;
    }
    
    function gameStats() public view returns (uint256 openGame, uint256 gameInProgress, uint256 gameComplete) {
        uint256 open = 0;
        uint256 inProgress = 0;
        uint256 complete = 0;
        
        for (uint256 i = 0; i < gamesArray.length; i++) {
            Game storage game = games[i];
            if (game.gameStatus == Status.WAITING_FOR_PLAYER) {
                open ++;
            } else if (game.gameStatus == Status.PLAYER_ONE_MOVE || game.gameStatus == Status.PLAYER_TWO_MOVE) {
                inProgress ++;
            } else {
                complete ++;
            }
        }
        return (open, inProgress, complete);
    }
    
    //10 most recent games that are available
    function availGames() public view returns (uint256[] memory gameId, uint256[] memory bet, address[] memory playerOneId) {
        (uint256 openGames, , ) = gameStats();
        uint maxLen = 10;
        uint256[] memory gameIds = new uint256[](maxLen);
        uint256[] memory bets = new uint256[](maxLen);
        address[] memory playerOneIds = new address[](maxLen);
        
        if (openGames > 0) {
            for (uint256 i = 0; i < openGames; i++) {
                uint256 j = 0;
                Game storage game = games[i];
                if (game.gameStatus == Status.WAITING_FOR_PLAYER && game.playerOne != address(0)) {
                    gameIds[j] = i;
                    bets[j] = game.bet;
                    playerOneIds[j] = game.playerOne;
                    j ++;
                }
            }
            return (gameIds, bets, playerOneIds);   
        }
    }
}
