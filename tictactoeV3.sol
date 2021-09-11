// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */

contract TicTacToe {
    
    enum Symbol { EMPTY, X, O }
    enum Status { WAITING_FOR_PLAYER, IN_PROGRESS, PLAYER_ONE_WON, PLAYER_TWO_WON, BOT_WON, DRAW }
    enum GameType { BOT, PLAYER }
    
    uint256 greenPot;
    
    struct Game {
        // Players
        address playerOne; // Player 1 X
        address playerTwo; // Player 2 other_player
        
        // Symbol
        Symbol playerOneSymbol;
        Symbol playerTwoSymbol;
        
        //Status
        Status gameStatus;
        GameType gameType;
        
        uint256 bet;
        
        Symbol[9] board;
    }
    
    constructor() public {
        greenPot = 0;
    }
    
    function createBotGame() public returns (bool) {
        
    }
    
    function createPlayerGame(bool isBot) public returns (bool) {
// 
    }
    
    
    //Helper functions
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
            if (board[uint256(i)] == player_symbol) {
                for (int j = -4; i < 5; j++) {
                    if (j + i >= 0 && j + i < 9) {
                        return j + i;
                    }
                }
            }
        }
        
        return -1;
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
    
    
    function makeMove(uint8 position) public returns (string memory) {
        
        // Check that game is still in IN_PROGRESS
        require(board.status == Status.IN_PROGRESS);
        
        // Check if it is a valid position
        require(position >= 0 && position <= 8);
        
        uint256 gameID = players[msg.sender];
        Game storage _game = Games[gameID];
        
        Symbol playerSymbol;
        Symbol otherPlayerSymbol;
        
        if (_game.playerOne == msg.sender) {
            playerSymbol = _game.playerOneSymbol;
            otherPlayerSymbol = _game.playerTwoSymbol;
        } else {
            playerSymbol = _game.playerTwoSymbol;
            otherPlayerSymbol = _game.playerOneSymbol;
        }
        
        // Check if a piece is already there
        Symbol boardPosition = _game.board[position];
        require(boardPosition == Symbol.EMPTY);
        
        // Make the move
        _game.board[position] = board.playerSymbol;
        
         if (_game.gameType == GameType.BOT) {
             
            //bot move
            int move = botMove(_game.board, otherPlayerSymbol, playerSymbol);
            _game.board[uint256(move)] = otherPlayerSymbol;
            
            if (evaluate(_game.board, otherPlayerSymbol, playerSymbol) == 1) {
                board.status = Status.BOT_WON;
                other_player.transfer(wagers_[other_player]); //Other player wins - Wager goes to other player
                return "lost";
            }
            
            if (isMovesLeft(_game.board) == false) {
                board.status = Status.DRAW;
                return "draw";
            }
        } else if (_game.gameType == GameType.Player) {
            
            //check win
            if (evaluate(_game.board, playerSymbol, otherPlayerSymbol) == 1) {
                
                if (playerSymbol == _game.playerOneSymbol) {
                    _game.gameStatus = Status.PLAYER_ONE_WON;
                    // playerTwo.transfer(_game.bet)
                } else {
                    _game.gameStatus = Status.PLAYER_TWO_WON;
                }
    
                //TODO
                // update_scoreboard();
                // update_leaderboard();
                
                //TODO 
                // host_player.transfer(wagers_[host_player]); //Host player wins - Wager goes to host player
                return "win";
            }
                
            if (isMovesLeft(_game.board) == false) {
                board.status = Status.DRAW;
                
                //We take money
                return "draw";
            }
        }
        
        return "next move";
    }
    
}