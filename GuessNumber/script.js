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
//控制label的顏色
var labelColor;

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
    startGame();
}

function showAnswer() {
    // console.log('showAnswer');
    var answerStr = '';
    for (let index = 0; index < problem.length; index++) {
        answerStr += problem[index];
    }
    console.log(answerStr);
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
    listAdd();
    // console.log(guessArr);
    // console.log(problem);
    // console.log('A=' + A + ',B=' + B)
}

function listAdd() {
    //抓取unordered list
    let target = document.getElementById("guessResults");
    //產生li 放目前猜測數字
    let newNode = document.createElement("li")
    //勝利text
    let winText = ' 你贏了!!';
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
        return 'success';
    } else {
        return 'danger';
    }
}