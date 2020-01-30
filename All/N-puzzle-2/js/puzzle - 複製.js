var size = 3; //拼圖大小
var recorder = []; //紀錄拼圖移動
var answer = []; //答案



$(function () {
    CreatePuzzle(size);
    CreatRecord(size);
    Blank(size);
});

//產生puzzle的div 和排版
function CreatePuzzle(size) {
    let left = 0;
    let top = 0;
    let id = 1;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let htmlString = `<div id="${id}" style="height:${500/size}px;
            width:${500/size}px;margin-left:${left}px;
            px;margin-top:${top}px;" onclick="PuzzleClick(this)">
            ${id}</div>`;
            id++;
            $('#puzzle').append(htmlString);
            left += 500 / size;
        }
        left = 0;
        top += 500 / size;
    }
}

//產生記錄方塊移動的array和答案
function CreatRecord(size) {
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
    answer = recorder;
}

//把最後一塊隱藏起來
function Blank(size) {
    $(`#${size * size}`).hide();
}

//puzzle div被點到，事件直接掛在html上
function PuzzleClick(div) {
    //取得的id是字串,所以要parse
    let id = parseInt($(div).attr('id'));
    //確認點到的div四周四否有空格
    let canMove = CheckAround(id);
    // 要移動div => CSS
    PuzzleMove(div);
    // 紀錄方塊移動位置
    RecordMove(div);
}

function GoUp(id) {
    if (recorder[location.y - 1][location.x] == 9) {
        $(`#${id}`).animate({bottom : `${500/size}`})
    }
}

function GoDown(id) {
    if (recorder[location.y + 1][location.x] == 9) {
        $(`#${id}`).animate({up : `${500/size}`})
    }
}

function GoLeft(id) {
    if (recorder[location.y][location.x - 1] == 9) {
        $(`#${id}`).animate({right : `${500/size}`})
    }
}

function GoRight(id) {
    if (recorder[location.y][location.x + 1] == 9) {
        $(`#${id}`).animate({left : `${500/size}`})
    }
}

function CheckAround(id) {
    //div在recorder中的座標:
    let location = FindLocation(id);
    //把點到的div的上下左右,存到array
    let pool = [];
    // up and left >0 ， down and right < size，不然會undefined
    let up = location.y - 1;
    let down = location.y + 1;
    let left = location.x - 1;
    let right = location.x + 1;
    if (up >= 0) {
        pool.push(recorder[location.y - 1][location.x]);
    }
    if (left >= 0) {
        pool.push(recorder[location.y][location.x - 1]);
    }
    if (down < size) {
        pool.push(recorder[location.y + 1][location.x]);
    }
    if (right < size) {
        pool.push(recorder[location.y][location.x + 1]);
    }
    //確認pool裡是否有9
    if (pool.indexOf(9) > -1) {
        return true;
    } else {
        return false;
    }
}

function PuzzleMove(id) {

}

function RecordMove(id) {

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

//-----------------------------------------------//