var Puzzles = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //現在拼圖的順序
var answer = '1,2,3,4,5,6,7,8,9';
var win = false; //win flag

$(function () {
    SetArray();
    $('#start').click(ButtonFunction);
    $('.data').click(function (e) {
        MoveBlock(this);
    });
    // $('#test').click(function (e) { 
    //     let test = Puzzles.toString();
    //     console.log(test);
    // });
});

//定義div的位置
function SetArray() {
    let index = 1; //1~9 div id的index
    let leftP = 0; // 往右position
    let topP = 0; //往下position

    for (index = 1; index < 10; index++) {
        $(`#d${index}`).css('left', `${leftP}vw`);
        $(`#d${index}`).css('top', `${topP}vw`);
        leftP += 10;
        if (index % 3 == 0) {
            leftP = 0;
            topP += 10;
        }
    }
}

function MoveBlock(obj) {
    let num = parseInt($(obj).text()); //div當前的數值
    let leftP = GetPositionX(num);; // 往右position
    let topP = GetPositionY(num);; //往下position
    let index = Puzzles.indexOf(num); //當前物體在array裡的位置

    // console.log(Puzzles[index + 3]);
    if (Puzzles[index + 3] == 9) { //空格在下方
        $(obj).animate({
            top: `${topP + 10}vw`
        });
        ChangeArrayItem(num, index);
    }
    if (Puzzles[index - 3] == 9) { //空格在上方
        $(obj).animate({
            top: `${topP - 10}vw`
        });
        ChangeArrayItem(num, index);
    }
    if (Puzzles[index + 1] == 9) { //空格在右邊
        if (index != 2 && index != 5) {
            $(obj).animate({
                left: `${leftP + 10}vw`
            });
        }
        ChangeArrayItem(num, index);
    }
    if (Puzzles[index - 1] == 9) { //空格在左邊
        if (index != 3 && index != 6) {
            $(obj).animate({
                left: `${leftP - 10}vw`
            });
        }
        ChangeArrayItem(num, index);
    }
    CheckWin();
}

//尋找目前點選div的位置
function GetPositionX(num) {
    let index = Puzzles.indexOf(num);
    // 在第一行
    if (index % 3 == 0) {
        return 0;
    } else if (index % 3 == 1) { //在第二行
        return 10;
    } else if (index % 3 == 2) { //在第三行
        return 20;
    }
}

function GetPositionY(num) {
    let index = Puzzles.indexOf(num);
    // 在第一行
    if (index < 3) {
        return 0;
    } else if (index < 6) {
        return 10;
    } else if (index < 9) {
        return 20;
    }
}

function ChangeArrayItem(num, index) {
    let indexOf9 = Puzzles.indexOf(9);
    Puzzles[index] = 9;
    Puzzles[indexOf9] = num;
    console.log(Puzzles);
}

//開始按鈕 2
function ButtonFunction() {
    $('#d9').hide();
    GetRandom(); 
}


var obj = new Object();
var countMove = 10; //隨機移動步數
var objMove = 0//紀錄上次移動的物體的值

function GetRandom() {
    let randomNum = 0;
    let indexOf9 = Puzzles.indexOf(9);
    randomNum = Math.floor(Math.random() * 10);
    let x = (y) => {
        if (y == 0) { //空格下方
            return 3;
        } else if (y == 1) { //空格右方
            if (indexOf9 != 2 && indexOf9 != 5) {
                return 1;
            }
        } else if (y == 2) { //空格上方
            return -3;
        } else if (y == 3) { //空格左方
            if (indexOf9 != 3 && indexOf9 != 6) {
                return -1;
            }
        }
    };
    if (Puzzles[indexOf9 + x(randomNum)] != null) {
        obj = $(`#d${Puzzles[indexOf9 + x(randomNum)]}`);
        let recordObj = Puzzles[indexOf9 + x(randomNum)]; //儲存這次選到物體的值
        if (recordObj != objMove) { //如果這次選到的物體 != 上一次, 才移動
            MoveBlock(obj);
            objMove = recordObj; //記錄此次移動的物體
            countMove--;
        }
    }
    if (countMove > 0) {
        setTimeout(GetRandom, 50);
    }
}

function CheckWin() {
    if (Puzzles[8] == 9) {
        let check = Puzzles.toString();
        if (check == answer && countMove == 0) {
            alert('win!!!!');
        }
    }
}

//比較簡單的寫法
// function GetRandom() {
//     let countMove = 20; //隨機移動步數
//     let randomNum = 0;
//     let arr = [3, 1, -3, -1];
//     while (countMove > 0) {
//         let indexOf9 = Puzzles.indexOf(9);
//         let a = arr[Math.floor(Math.random() * arr.length)];

//         if (Puzzles[indexOf9 + a] != null) { //選空格上方的方塊 
//             obj = $(`#d${Puzzles[indexOf9 + a]}`);
//             MoveBlock(obj);
//             countMove--;
//         }
//     }
// }