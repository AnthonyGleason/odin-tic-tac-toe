//Still needs new game function with a button to start a new game

const game = (function () {
    let gameBoard = [];
    let boardElementArray = [];
    const gameBoardContainer = document.querySelector('.game-board');
    
    const display = {
        announceWinner: function (){
            if (gameControls.checkWinner()==1){
                display.displayText("Player One has won the game!");
            } else if (gameControls.checkWinner()==2){
                display.displayText("Player Two has won the game!");
            } else if (gameControls.checkWinner()==3){
                display.displayText("Tie! Start a new game to play again.")
            };
        },
        announceTurn: function (turn){
            if (turn==1){
                turn="One";
            } else if (turn == 2){
                turn="Two";
            }
            display.displayText("Player "+turn+"'s turn.");
        },
        displayPiece: function (location){
            boardElementArray[location].boardItem.textContent=currentPiece;
        },
        displayText: function (text){
            display.turnDiv.textContent = text;
        },
        turnDiv: document.querySelector('.turn-display-text')
    };

    const gameControls = {
        checkWinner: function (){
            let winner=null;
            //Check horizontally for matches
            if (samePiece(gameBoard[0],gameBoard[1],gameBoard[2])){
                //first row
                return getWinner(0);
            } else if (samePiece(gameBoard[3],gameBoard[4],gameBoard[5])){
                //second row
                return getWinner(3);
            } else if (samePiece(gameBoard[6],gameBoard[7],gameBoard[8])){
                //third row
                return getWinner(6);
            }
            //Check verically for matches
            if (samePiece(gameBoard[0],gameBoard[3],gameBoard[6])){
                //first column
                return getWinner(0);
            } else if (samePiece(gameBoard[1],gameBoard[4],gameBoard[7])){
                //second column
                return getWinner(1);
            } else if (samePiece(gameBoard[2],gameBoard[5],gameBoard[8])){
                //third column
                return getWinner(2);
            }
            //Check Diagionally for matches
            if (samePiece(gameBoard[0],gameBoard[4],gameBoard[8])){
                //upper left to bottom right
                return getWinner(0);
            } else if (samePiece(gameBoard[2],gameBoard[4],gameBoard[6])){
                //upper right to bottom left
                return getWinner(2);
            }
            if (gameBoard.every(e=>{
                return e!=null;
            })){
                return 3;
            };
            return winner;
        },
        gameStart: function () {
            //Clear game board
            gameBoard = [null,null,null, null, null, null, null, null, null];
            //Set player one and player two
            players.playerOne = players.createPlayer('X',true,false);
            players.playerTwo = players.createPlayer('O',false,false);
            //Start game
            createBoardDivsIndex(gameBoardContainer);
            //Initializes display with go player 1
            display.announceTurn(whoseTurn());
            setEventListeners();
        },
        playTurn: function (playerTurn, playerSelection) {
            currentPiece = setPlayerPiece(playerTurn);
            gameBoard[playerSelection]=currentPiece;
            display.announceTurn(whoseTurn());
        },
        newGameStart: function (){
            //Clear game board
            gameBoard = [null,null,null, null, null, null, null, null, null];
            clearGameBoard();
            //Set player one and player two
            players.playerOne = players.createPlayer('X',true,false);
            players.playerTwo = players.createPlayer('O',false,false);
            display.announceTurn(whoseTurn());
            
        },
        endTurn: function(playerTurn){
            if (playerTurn==1){
                players.playerOne.isTurn=false;
                players.playerTwo.isTurn=true;
            } else if (playerTurn==2){
                players.playerOne.isTurn=true;
                players.playerTwo.isTurn=false;
            } else{
                console.log("error");
            }
            //Displays whose turn it is
            display.announceTurn(whoseTurn());
        }
    };

    let currentPiece = null;

    const getPlayerSelection = function (e){
        return parseInt(prompt("choose a spot 0-8"));
    };

    const getWinner = function (location){
        if (getPiece(location) == "X"){
            return 1;
        } else if (getPiece(location)=="O"){
            return 2;
        } else{
            console.log("error");
        }
    };

    const samePiece = function (a,b,c){
        if (a==null || b==null|| c==null ){
            return false;
        } else if (a==b && b==c){
            return true;
        }else{
            return false;
        }
    };
    const clearGameBoard = function (){
        boardElementArray.forEach(e =>{
            e.boardItem.textContent="";
        });
    };
    const getPiece = function(location){
        if (gameBoard[location]=="X"){
            return "X";
        }else if (gameBoard[location]=="O"){
            return "O";
        }
    };

    const setPlayerPiece= function (playerTurn){
        if (playerTurn==1){
            return players.playerOne.gamePiece;
        }else if (playerTurn==2){
            return players.playerTwo.gamePiece;
        } else{
            console.log("error");
        }
    };
    const indexBoardElement = function(boardItem, counter){
        boardElementArray.push({boardItem,index: counter});
        return counter+=1;
    }
    const createBoardDivsIndex= function (gameBoardContainer){
        boardArray=gameBoardContainer.querySelectorAll('.game-board-item');
        let counter=0;
        boardArray.forEach(e => {
            counter=indexBoardElement(e, counter)
        });
    };
    const isSpace = function (object) {
        if (object.boardItem.textContent != ""){
            return false;
        }
        return true;
    };
    const setEventListeners = function (){
        boardElementArray.forEach(e => {
            e.boardItem.addEventListener('click', ()=>{
                if (isSpace(e)){
                    gameControls.playTurn(whoseTurn(), e.index);
                    display.displayPiece(e.index);
                    gameControls.endTurn(whoseTurn());
                    if (gameControls.checkWinner()!=null){
                        display.announceWinner();
                    }  
                } else{
                    console.log("This space is already taken");
                }
            })
        });
    };
    const whoseTurn= function (){
        if (players.playerOne.isTurn == true){
            return 1;
        }else if (players.playerTwo.isTurn == true){
            return 2;
        }else{
            console.log("error!");
        }
    };

    const players = {
        createPlayer: function (gamePiece, isTurn, isWinner){
            return {gamePiece, isTurn, isWinner};
        },
        playerOne: null,
        playerTwo: null
    };

    return {gameControls};
})();
game.gameControls.gameStart();