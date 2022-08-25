const game = (function () {
    let gameBoard = [];

    const display = {
        announceWinner: function (){
            if (gameControls.checkWinner()==1){
                console.log("player one has won the game!");
            } else if (gameControls.checkWinner()==2){
                console.log("player two has won the game!");
            };
        },
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
            return winner;
        },
        gameStart: function () {
            //Clear game board
            gameBoard = [null,null,null, null, null, null, null, null, null];
            //Set player one and player two
            players.playerOne = players.createPlayer('X',true,false);
            players.playerTwo = players.createPlayer('O',false,false);
            //Start game

            /*maybe put this under an event listener for a click on grid div,, change getPlayerSelection() to e in event listener
            take out loop and put if statement isnt null then announce winner*/
            while (gameControls.checkWinner()==null){
                gameControls.playTurn(whoseTurn(), getPlayerSelection());
                gameControls.endTurn(whoseTurn());
                console.log(gameBoard);
            };
            //If that loop is terminated there has to be a winner therefore we can call the announceWinner() function here
            display.announceWinner();
        },
        playTurn: function (playerTurn, playerSelection) {
            console.log("Go player "+playerTurn);
            currentPiece = setPlayerPiece(playerTurn);
            gameBoard[playerSelection]=currentPiece;
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
        }
    };

    let currentPiece = null;

    const getPlayerSelection = function (){
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
//Uncomment to start automatically
//game.gameControls.gameStart();