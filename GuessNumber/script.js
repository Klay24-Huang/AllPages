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
// 儲存題目
var problem = [1, 1, 1, 1];
var A = 0;
var B = 0;

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
    let user_guess = $('#userGuess').val();
    let guessArr = user_guess.split('');
    for (let i = 0; i < guessArr.length; i++) {
        for (let j = 0; j < problem.length; j++) {
            if (guessArr[i] == problem[j]) {
                B++;
                if (i == j) {
                    B--;
                    A++;
                }
            }
        }
    }
    listAdd()
    console.log(guessArr);
    // console.log(problem);
    console.log('A=' + A + ',B=' + B)
}

function listAdd () {
   var target = document.getElementById("startList");
   var newNode = document.createElement("li")
   newNode.innerHTML = '<span class="label label-danger">111</span>';
   target.appendChild(newNode);
}