var Puzzles = []; //所有拼圖, 總共9個 index:0~8
var Puzzle; //單獨一個puzzle
var RandomP = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //打亂的拼圖

$(function () {
    $('button').click(ButtonFunction);
    $('#t9').text('');
    // $('td').click(ClickTd);
});

//先把所有td放到一個array
function SetArray() {
    for (let index = 1; index < 10; index++) {
        Puzzle = $(`#t${index}`);
        if (Puzzle) {
            Puzzles.push(Puzzle);
        }
    }
}

//把存好td的array打散
function GetRandom() {

}

// function GetRandom() {
//     for (let index = 0; index < RandomP.length; index++) {
//         let randomIndex = Math.floor((Math.random() * 9) + 1);
//         if (randomIndex >= Puzzles.length) {
//             index -= 1;
//             console.log('index');
//         } else {
//             RandomP[index] = Puzzles[randomIndex];
//             Puzzles.splice(randomIndex, 1);
//             console.log('test');
//         }
//     }
// }

function ButtonFunction() {
    SetArray();
    GetRandom();
}
