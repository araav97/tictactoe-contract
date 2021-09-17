# Decentralised Tic Tac Toe
## Introduction
This is a blockchain dApp project done as part of EE4032 Blockchain Engineering Module.
This project consists of 2 parts - Smart contract that handles the logic of the game on the blockchain 
deployed on Ropsten and a front end built with React and Web3. 

Contract: https://ropsten.etherscan.io/address/0xcB18294ca62EdF9b7B48D557B8BB7681314B836C
Website: https://tictactoe-contract.vercel.app/

## Smart Contract
The source code for the contract can be found under `./contract` and consists of 2 main versions
- tictactoeV3.sol consists of a standard Tic Tac Toe game with Bot and Player versions
- tictactoeV4.sol consists of a modified version of Tic Tac Toe

### Modified Tic Tac Toe
You will be playing with another player live on the blockchain and the aim of the game is to win as many rows as possible! Each player will be given a total of 90 points to place on any cell on the board any division you like.

Once both players has submitted their bids, both players will call reveal to show their choices. Whichever bid higher for a given cell wins that cell. Same bids will end up as a wildcard for both players(counts to their rows)!

The winner will then be decided by the number of winning rows formed!

Step 1: Create a game room with a bet or join an existing game room. Host will be player one. (requires a metamask transaction).

Step 2: This is the bidding phase, choose how you want to split your 90 bid points and once done, submit the bid with another transaction.

Step 3: Once both players has placed their bids, both players must click reveal to get the final result.

Step 4: Enjoy your winnings or try beat and your friend again!

### Instructions for deploying it
1. Compile the source code on Remix
2. Use injected provider and deploy it

## Front End
The front end source code can be found under `./front-end`

### Instructions for running it 

#### `yarn install` 
Installs all the required dependencies.

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
