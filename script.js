startGameBtn = document.querySelector(".start-game-btn");

startGameBtn.addEventListener("click", ()=>console.log('btn clicked'));

let gameCell = document.querySelectorAll('.gameCell');

let turn = document.querySelector('.turn');

let reset = document.querySelector('.reset');

let winner = document.querySelector('.winner');

reset.addEventListener('click',()=>{
    game.reset();
    gameCell.forEach((cell)=>{
        cell.innerHTML = "";
    })
    turn.textContent = "saturn";
})


let winCount = 0;

let display = (e) =>{
    let token = game.getActivePlayer().token;
    game.playRound(e.target.dataset.column,e.target.dataset.row,token);
    if(winCount>=1){
        winCount=0;
        game.reset();
        return; 
    }
    if(token===1){
        e.target.innerHTML = '<img style="height:70%; width:70%;" src="./Images/saturn.png" alt="" srcset="">';
        turn.textContent = 'moon';
       
    }
    else if(token===2)
    {
        e.target.innerHTML = '<img style="height:70%; width:70%;" src="./Images/full-moon.png" alt="" srcset="">';
        turn.textContent = 'saturn'
    }
}

gameCell.forEach((cell)=>{
    cell.addEventListener('click',display)
});

function Cell(){
    let value = 0;

    const addToken = (player)=>{
        value = player;
    }

    const getValue = () => value;

    return {addToken,getValue}
}

function Gameboard(){
    let row = 3;
    let column = 3;
    let board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board;

    const dropToken = (column,row,player) => {
        if(board[row][column].getValue()===0){
            board[row][column].addToken(player)
        }
        else{
           game.switchPlayerTurn(); 
        }
    }

    const printBoard = () =>{
        const boardWithCellvalues = board.map((row)=>row.map((cell)=>cell.getValue()));
        console.log(boardWithCellvalues);
    };

    return {getBoard,dropToken,printBoard};
}

function GameController(
    playerOneName = "Saturn",
    playerTwoName = "Moon"
){
    const board = Gameboard();

    const players = [{name:playerOneName,token:1},{name:playerTwoName,token:2}];

    let activePlayer = players[0];

    const switchPlayerTurn = () =>{
        activePlayer = activePlayer=== players[0]?players[1]:players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
            board.printBoard();
            console.log(`${getActivePlayer().name}'s turn.`);
    }

    const reset = ()=>{
        let boarder = board.getBoard();
        activePlayer = players[0];
        boarder.map((row)=>row.map((cell)=>cell.addToken(0)));
        gameCell.forEach((cell)=>{
            cell.innerHTML = "";
        })
        turn.textContent = 'saturn';
    }

    const win = ()=>{
        console.log(`${getActivePlayer().name} is the winner`);
        winCount = winCount+1;
        winner.textContent = ` ${getActivePlayer().name} is the winner`;
    }

    const checkForDraw = () =>
    {
        let boarder = board.getBoard();
        let numberOfZeros = 0;
        for (let i = 0; i < boarder.length; i++) {
            for (let j = 0; j < boarder[i].length; j++) {
                if(boarder[i][j].getValue()===0){
                    numberOfZeros = numberOfZeros + 1;
                }
            }
        }

        return numberOfZeros;
    }

    const playRound = (column,row)=>{
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column} and row ${row}`);
        board.dropToken(column,row,getActivePlayer().token);
          /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

        let boarder = board.getBoard();
        if(boarder[1][1].getValue()===1 && boarder[0][0].getValue()===1 && boarder[2][2].getValue()===1 || boarder[1][1].getValue()===2 && boarder[0][0].getValue()===2 && boarder[2][2].getValue()===2)
        {
            win();
            return;
        }
        else if(boarder[0][2].getValue()===1 && boarder[1][1].getValue()===1 && boarder[2][0].getValue()===1 || boarder[0][2].getValue()===2 && boarder[1][1].getValue()===2 && boarder[2][0].getValue()===2)
        {
            win();
            return;
        }
        else if(boarder[0][0].getValue()===1 && boarder[0][1].getValue()===1 && boarder[0][2].getValue()===1 || boarder[0][0].getValue()===2 && boarder[0][1].getValue()===2 && boarder[0][2].getValue()===2)
        {
            win();
            return;
        }
        else if(boarder[1][0].getValue()===1 && boarder[1][1].getValue()===1 && boarder[1][2].getValue()===1 || boarder[1][0].getValue()===2 && boarder[1][1].getValue()===2 && boarder[1][2].getValue()===2)
        {
            win();
            return;
        }
        else if(boarder[2][0].getValue()===1 && boarder[2][1].getValue()===1 && boarder[2][2].getValue()===1 || boarder[2][0].getValue()===2 && boarder[2][1].getValue()===2 && boarder[2][2].getValue()===2)
        {
            win();
            return;
        }
        else if(boarder[0][0].getValue()===1 && boarder[1][0].getValue()===1 && boarder[2][0].getValue()===1 || boarder[0][0].getValue()===2 && boarder[1][0].getValue()===2 && boarder[2][0].getValue()===2)
        {
            win();
            return;
        }
        else if(boarder[0][1].getValue()===1 && boarder[1][1].getValue()===1 && boarder[2][1].getValue()===1 || boarder[0][1].getValue()===2 && boarder[1][1].getValue()===2 && boarder[2][1].getValue()===2)
        {
            win();
            return;
        }
        else if(boarder[0][2].getValue()===1 && boarder[1][2].getValue()===1 && boarder[2][2].getValue()===1 || boarder[0][2].getValue()===2 && boarder[1][2].getValue()===2 && boarder[2][2].getValue()===2)
        {
            win();
            return;
        }

        let numZeros = checkForDraw();
        if (numZeros===0)
        {
            console.log(`It's a DRAW play again`)
            winner.textContent = "It's a DRAW play again";
            let newReset = document.querySelector('.reset');
            winner=1;
            return;
        };
        printNewRound();
        switchPlayerTurn();
    };

    printNewRound();

    return{playRound,getActivePlayer,reset};
}

const game = GameController();