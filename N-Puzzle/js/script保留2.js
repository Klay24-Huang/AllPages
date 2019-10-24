// var Puzzles = [, , ]; //所有拼圖, 總共9個 index:0~8
var Puzzle; //單獨一個puzzle
// var RandomP = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //打亂的拼圖

class PuzzlesData {
    constructor() {
        this.dat = [];
        this.dat[0] = ['aa', 'aa', 'aa'];
        this.dat[1] = ['aa', 'aa', 'aa'];
        this.dat[2] = ['aa', 'aa', 'aa'];
    }
    setPoint(x, y, point) {
        this.dat[x][y] = point;
    }
}


$(function () {
    SetArray();
    $('button').click(ButtonFunction);
    $('#t9').text('');
    // $('td').click(ClickTd);
    $('.data').click(MoveBlock);
});

function SetPoint(obj) {

}

var Puzzles = new PuzzlesData();
//先把所有td放到一個array

function SetArray() {
    let index = 1; //1~9 div id的index
    let leftP = 0; // 往右position
    let topP = 0; //往下position
    for (let j = 0; j < Puzzles.dat.length; j++) {
        for (let k = 0; k < Puzzles.dat[j].length; k++) {
            Puzzle = $(`#d${index}`);

            if (Puzzle) {

                $(`#d${index}`).css('left', `${leftP}vw`);
                $(`#d${index}`).css('top', `${topP}vw`);
                console.log(Puzzles.dat[j][k]);
                Puzzles.dat[j][k] = Puzzle;
                leftP += 10;
            }
            index++;
        }
        leftP = 0; //row結束 x軸歸零
        topP += 10;
    }
}

function MoveBlock() {
    console.log(' MoveBlock');
    let arr = FindIndex(this);
    console.log(arr);
    ChangeDiv(this);

    $(this).animate({
        left: '10vw'
    });
    $(this).animate({
        top: '10vw'
    });
}

function ButtonFunction() {
    $('#d9').css('background-color', 'burlywood');
    $('#d9').text('');

    // GetRandom();
}

function ChangeDiv(obj) {
    // 暫時保留
    // // obj是目前選取div
    // let temporarySave = obj;
    // //和#d9交換
    // obj = $('#d9');
    // $('#d9') = temporarySave;
}

function FindIndex(obj) {
    let j;
    let k;
    for (j = 0; j < Puzzles.dat.length; j++) {
        for (k = 0; k < Puzzles.dat[j].length; k++) {
            if (obj = Puzzles.dat[j][k]) {
                return [j, k];
            }
        }
    }
}