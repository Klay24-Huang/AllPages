$(function () {
    // 開始
    $('#start').click(startGame);
    //重新
    $('#restart').click(abortGame);
    // 作弊
    $('#cheat').click(showAnswer);
    // 猜答案
    $('#guess').click(doGuess);
});

// 一些變數
var problem = [1, 1, 1, 1]; // 儲存題目
var A = 0;
var B = 0;
var user_guess; //儲存當前數字
var win; //win flag
var labelColor; //控制label的顏色
var seeAnswer; //看答案flag

function startGame() {
    console.log('startGame');
    myNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let index = 0; index < problem.length; index++) {
        let randomIndex = Math.floor((Math.random() * 10) + 1);
        if (randomIndex >= myNumber.length) {
            index -= 1;
        } else {
            problem[index] = myNumber[randomIndex];
            myNumber.splice(randomIndex, 1);
        }
        console.log(myNumber.length);
    }
}

function abortGame() {
    $('#guessResults').html('');
    startGame();
}

function showAnswer() {
    seeAnswer = true;
    A = 0; 
    B = 0;
    // console.log('showAnswer');
    var answerStr = '';
    for (let index = 0; index < problem.length; index++) {
        answerStr += problem[index];
    }
    user_guess = answerStr; //把答案放到顯示變數
    ListAdd();
    // console.log(answerStr);
    // alert(answerStr);
}

function doGuess() {
    // console.log('doGuess');
    A = 0;
    B = 0;
    user_guess = $('#userGuess').val();
    let guessArr = user_guess.split('');
    for (let i = 0; i < guessArr.length; i++) {
        for (let j = 0; j < problem.length; j++) {
            if (guessArr[i] == problem[j]) {
                if (i == j) {
                    A++;
                } else {
                    B++;
                }
            }
        }
    }
    CheckWin();
    ListAdd();
    // console.log(guessArr);
    // console.log(problem);
    // console.log('A=' + A + ',B=' + B)
}

function ListAdd() {
    //抓取unordered list
    let target = document.getElementById("guessResults");
    //產生li 放目前猜測數字
    let newNode = document.createElement("li")
    //勝利text
    let winText;
    if (win) {
        winText = ' 你贏了!!';
    } else if (seeAnswer) {
        winText = ' 看答案';
    }
    else {
        winText = '';
    }
    //控制label的顏色
    labelColor = LabelColor();
    newNode.classList.add('list-group-item');
    newNode.innerHTML = `<span class="label label-${labelColor}">${A}A${B}B</span>  ${user_guess + winText}`;
    target.appendChild(newNode);

}

function CheckWin() {
    if (A == 4) {
        win = true;
    }
}

function LabelColor() {
    if (win) {
        win = false;
        return 'success';
    } else if (seeAnswer) {
        seeAnswer = false;
        return 'info';
    } else {
        return 'danger';
    }
}