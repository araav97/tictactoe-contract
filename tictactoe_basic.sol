// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */

contract TicTacToe {
    
    // define the struct for player and gameboard
    
    struct PlayerBoard {
        address player_address;
        
        // _,_,_
        // _,_,_
        // _,_,_
        // 1s denote player and 2s denote computer's choice 
        // TODO enum
        uint8[9] gameboard;
    }
    
    // mapping to store the player's board
    mapping(address => PlayerBoard) public gameboards;
    address[] public players;

    // start game - can integrate?
    function start_game() public returns (bool) {
        
        gameboards[msg.sender] = PlayerBoard({
            player_address: msg.sender,
            gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0]
            //status
        });

        players.push(msg.sender);
        
        // return true or false if success
        return true;
    }
    
    function get_board() public view returns (uint8[9] memory) {
        return gameboards[msg.sender].gameboard;
    }
    
    function bot_move(uint8[9] memory gameboard) internal returns(uint8) {
        // Just choose an empty place to put
        for(uint8 i = 0; i < gameboard.length; i++) {
            if (gameboard[i] == 0) {
                return i;
            }
        }
        return 10;
    } 
    
    // makeMove - checkwin, valid move
    function make_move(uint8 position) public returns (string memory) {
        //handle new move if win
        // Check if it is an actual position
        require(position >= 0 && position <= 8);
        
        // Check if a piece is already there
        uint8 board_position = gameboards[msg.sender].gameboard[position];
        require(board_position == 0);
        
        gameboards[msg.sender].gameboard[position] = 1;
        //check win
        if (check_win(gameboards[msg.sender].gameboard, false)) {
            return "win";
        }
        
        //bot move
        uint8 move = bot_move(gameboards[msg.sender].gameboard);
        //need to check if this is valid
        gameboards[msg.sender].gameboard[move] = 2;
        if (check_win(gameboards[msg.sender].gameboard, true)) {
            return "lost";
        }
        
        //all filled 
        for(uint8 i = 0; i < gameboards[msg.sender].gameboard.length; i++) {
            if (gameboards[msg.sender].gameboard[i] == 0) {
                return "next move";
            }
        }
        
        return "draw";
    }
    
    
    function check_win(uint8[9] memory gameboard, bool isBot) internal pure returns (bool) {
        uint8 player = 1;
        if(isBot) {
            player = 2;
        }
        
        uint8[3][8] memory winning_states = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [6, 4, 2]
            ];
        
        for (uint8 i = 0; i < winning_states.length; i++) {
            uint8[3] memory winning_state = winning_states[i];
            if (
                gameboard[winning_state[0]] == player && 
                gameboard[winning_state[1]] == player && 
                gameboard[winning_state[2]] == player) {
                    return true;
            }
            
        }
        return false;
    }
}
