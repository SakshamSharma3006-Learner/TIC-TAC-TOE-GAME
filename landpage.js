const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const pvpBtn = document.getElementById("pvpBtn");
const aiBtn = document.getElementById("aiBtn");

const themeBtn = document.getElementById("themeBtn");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const playAgain = document.getElementById("playAgain");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameRunning = true;
let aiMode = false;

let x = 0;
let o = 0;
let draw = 0;

const winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",cellClick);
});

restartBtn.onclick = restartGame;
newGameBtn.onclick = resetAll;
playAgain.onclick = ()=>{
    popup.classList.remove("show");
    restartGame();
};

pvpBtn.onclick=()=>{
    aiMode=false;
    pvpBtn.classList.add("active");
    aiBtn.classList.remove("active");
    resetAll();
};

aiBtn.onclick=()=>{
    aiMode=true;
    aiBtn.classList.add("active");
    pvpBtn.classList.remove("active");
    resetAll();
};

themeBtn.onclick=()=>{
    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        themeBtn.innerHTML="🌙 Dark Mode";
    }else{
        themeBtn.innerHTML="☀️ Light Mode";
    }
};

function cellClick(){

    const index=this.dataset.index;

    if(board[index]!="" || !gameRunning) return;

    board[index]=currentPlayer;
    this.innerHTML=currentPlayer;

    this.classList.add(currentPlayer==="X"?"x":"o");

    checkWinner();

    if(!gameRunning) return;

    currentPlayer=currentPlayer==="X"?"O":"X";

    statusText.innerHTML="Player "+currentPlayer+"'s Turn";

    if(aiMode && currentPlayer==="O"){
        setTimeout(aiMove,500);
    }

}

function aiMove(){

    let empty=[];

    board.forEach((v,i)=>{
        if(v=="") empty.push(i);
    });

    if(empty.length==0) return;

    let random=empty[Math.floor(Math.random()*empty.length)];

    cells[random].click();

}

function checkWinner(){

    for(let pattern of winPatterns){

        let a=pattern[0];
        let b=pattern[1];
        let c=pattern[2];

        if(board[a] &&
           board[a]==board[b] &&
           board[b]==board[c]){

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            popup.classList.add("show");

            popupText.innerHTML="🎉 Player "+board[a]+" Wins!";

            statusText.innerHTML="Player "+board[a]+" Wins!";

            gameRunning=false;

            if(board[a]=="X"){
                x++;
                scoreX.innerHTML=x;
            }else{
                o++;
                scoreO.innerHTML=o;
            }

            return;
        }

    }

    if(!board.includes("")){

        popup.classList.add("show");
        popupText.innerHTML="🤝 Match Draw";

        statusText.innerHTML="Match Draw";

        draw++;
        drawScore.innerHTML=draw;

        gameRunning=false;

    }

}

function restartGame(){

    board=["","","","","","","","",""];

    currentPlayer="X";

    gameRunning=true;

    statusText.innerHTML="Player X's Turn";

    cells.forEach(cell=>{
        cell.innerHTML="";
        cell.classList.remove("x","o","win");
    });

}

function resetAll(){

    x=0;
    o=0;
    draw=0;

    scoreX.innerHTML=0;
    scoreO.innerHTML=0;
    drawScore.innerHTML=0;

    popup.classList.remove("show");

    restartGame();

}