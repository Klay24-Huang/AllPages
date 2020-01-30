var size; //拼圖大小
var url = "../img/pic.jpg"; //預設圖片位置
var recorder = []; //紀錄拼圖移動
var answer = []; //答案
var win; //win flag

$(function () {
    GetSize();
    Init();
    $('#Difficult').on("change", RedrawPuzzle);
    $('#reduction').click(function (e) { 
        
    });
    $('#test').click(GetRandom);
});

//初始化
function Init() {
    AnswerImg(url);
    CreatePuzzle(size);
    CreateRecord(size);
    CreatAnswer(size);
    Blank(size);
}

// 取得拼圖大小
function GetSize() {
    size = $('select').val();
}

// 清空拼圖和某些參數
function Clear() {
    $('#puzzle').html('');
    recorder = [];
    answer = [];
}

// 重繪
function RedrawPuzzle() {
    GetSize();
    Clear();
    Init();
}

//產生puzzle的div 和排版
function CreatePuzzle(size) {
    let left = 0;
    let top = 0;
    let id = 1;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let htmlString = `<div id="${id}" style=" position: absolute;height:${500/size}px;
            width:${500/size}px;left:${left}px;
            px;top:${top}px;margin-top:5px;margin-left:5px;" onclick="PuzzleClick(this)">
            <div style = "position:relative "> 
            <div style = "position:absolute; font-size: 35px;left:10px; top:0; color:#ccffff;">${id}</div> 
            <img style = "height:500px;
            width:500px;border: 2px solid white;
            box-sizing: border-box;position:absolute;overflow: hidden;
            clip:rect(${top}px,${left + 500/size}px,${top + 500/size}px,${left}px);z-index: -1;" src= ${url}> </img> 
            </div></div>`
            id++;
            $('#puzzle').append(htmlString);
            left += 500 / size;
        }
        left = 0;
        top += 500 / size;
    }
}

//產生記錄方塊移動的array和答案
function CreateRecord(size) {
    let chamber = [];
    let num = 1;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            chamber.push(num);
            num++;
        }
        recorder.push(chamber);
        chamber = [];
    }
}

//產生答案
function CreatAnswer(size) {
    let chamber = [];
    let num = 1;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            chamber.push(num);
            num++;
        }
        answer.push(chamber);
        chamber = [];
    }
}

//顯示左方答案圖片
function AnswerImg(url) {
    $('#answer').attr('src', url);
}

//把最後一塊隱藏起來
function Blank(size) {
    $(`#${size * size}`).hide();
}

//puzzle div被點到，事件直接掛在html上
function PuzzleClick(div) {
    //取得的id是字串,所以要parse
    let id = parseInt($(div).attr('id'));
    //div在recorder中的座標:
    let location = FindLocation(id);
    let findMargin = FindMargin(location);
    // up and left >0 ， down and right < size，不然會undefined
    let up = location.y - 1;
    let down = location.y + 1;
    let left = location.x - 1;
    let right = location.x + 1;
    if (up >= 0) {
        GoUp(id, location, findMargin);
    }
    if (left >= 0) {
        GoLeft(id, location, findMargin);
    }
    if (down < size) {
        GoDown(id, location, findMargin);
    }
    if (right < size) {
        GoRight(id, location, findMargin);
    }
}

function GoUp(id, location, findMargin) {
    if (recorder[location.y - 1][location.x] == size * size) {
        $(`#${id}`).animate({top : `${findMargin.y - 500/size}`})
        ChangeRecorder(location, location.y - 1, location.x);
        CheckWin();
    }
}

function GoDown(id, location, findMargin) {
    if (recorder[location.y + 1][location.x] == size * size) {
        $(`#${id}`).animate({top : `${findMargin.y + 500/size}`})
        ChangeRecorder(location, location.y + 1, location.x);
        CheckWin();
    }
}

function GoLeft(id, location, findMargin) {
    if (recorder[location.y][location.x - 1] == size * size) {
        $(`#${id}`).animate({left : `${findMargin.x - 500/size}`})
        ChangeRecorder(location, location.y, location.x - 1);
        CheckWin();
    }
}

function GoRight(id, location, findMargin) {
    if (recorder[location.y][location.x + 1] == size * size) {
        $(`#${id}`).animate({left : `${findMargin.x + 500/size}`})
        ChangeRecorder(location, location.y, location.x + 1);
        CheckWin();
    }
}

//尋找點到的div，在recorder中的位置
function FindLocation(id) {
    let location = new Object();
    for (let y = 0; y < size; y++) {
        let x = recorder[y].indexOf(id);
        if (x != -1) {
            location.x = x;
            location.y = y;
            break;
        }
    }
    return location;
}

//取得實際上margin的px
function FindMargin(location) {
    let findMargin = new Object();
    findMargin.x = 500/size * location.x;
    findMargin.y = 500/size * location.y;
    return findMargin;
}

function ChangeRecorder(location, xOf9, yOf9) {
    let temp = recorder[location.y][location.x];
    recorder[location.y][location.x] = recorder[xOf9][yOf9];
    recorder[xOf9][yOf9] = temp;
    console.log(answer);
}

function CheckWin() {
    //如果角落是空格才判斷
    if (recorder[size - 1][size - 1] == size * size) {
        for (let index = 0; index < size; index++) {
            let recorderStr = recorder[index].toString(); 
            let answerStr = answer[index].toString()
            if (recorderStr == answerStr) {
                win = true;
            } else {
                win = false;
            }
        }
    }

    if (win) {
        $('#WinModal').modal();
    }
}

function GetRandom() {
    //尋找blank的index
    let indexOfBlank = new Object();
    recorder.forEach(element => {
        if (element.indexOf(size * size) != -1) {
            indexOfBlank.x = element.indexOf(size * size);
            indexOfBlank.y = recorder.indexOf(element);
        }
    });

    let up = recorder[indexOfBlank.y - 1][indexOfBlank.x];
    let down = recorder[indexOfBlank.y + 1][indexOfBlank.x];
    let left = recorder[indexOfBlank.y][indexOfBlank.x - 1];
    let right = recorder[indexOfBlank.y][indexOfBlank.x + 1];
    let pool = [up, down, left, right];
    
}
