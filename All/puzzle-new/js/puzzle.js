let puzzle = []
let size = 3
let empty = size * size
let start = false

// array相關---------------------------------------   
function CreateArr() {
    let temp = []
    for (let index = 0; index < size; index++) {
        temp = FillTemp(index)
        puzzle.push(temp)
    }
}

function FillTemp(index) {
    let num = size * index + 1
    let temp = []
    for (let i = 0; i < size; i++) {
        temp.push(num)
        num++
    }
    return temp
}

function CheckEmpty(arr) {
    let move = ''
    let y = arr[0]
    let x = arr[1]
    if (puzzle[y - 1] != undefined && puzzle[y - 1][x] == empty) {
        move = 'up'
    }
    if (puzzle[y + 1] != undefined && puzzle[y + 1][x] == empty) {
        move = 'down'
    }
    if (puzzle[y][x - 1] != undefined && puzzle[y][x - 1] == empty) {
        move = 'left'
    }
    if (puzzle[y][x + 1] != undefined && puzzle[y][x + 1] == empty) {
        move = 'right'
    }
    return move
}

function ChangeArrayAndPosition(obj, move) {
    if (move != '') {
        let pOfLast = GetPosition($(`#puzzle${empty}`))
        let pOfNow = GetPosition(obj)
        //array
        let temp = puzzle[pOfNow[0]][pOfNow[1]]
        puzzle[pOfNow[0]][pOfNow[1]] = puzzle[pOfLast[0]][pOfLast[1]]
        puzzle[pOfLast[0]][pOfLast[1]] = temp
        //position
        $(obj).data("y", pOfLast[0]);
        $(obj).data("x", pOfLast[1]);

        $(`#puzzle${empty}`).data("y", pOfNow[0]);
        $(`#puzzle${empty}`).data("x", pOfNow[1]);
    }
    //console.log(puzzle)
}

let moveStep = 20
let lastMove = 0;

function GetRandom() {
    let st = setTimeout(function () {
        GetRandom()
    }, 100);
    if (moveStep > 0) {
        let pOfLast = GetPosition($(`#puzzle${empty}`))
        let x = pOfLast[1]
        let y = pOfLast[0]
        let aroundOfLast = []
        // up
        if (puzzle[y - 1] != undefined) {
            aroundOfLast.push(puzzle[y - 1][x])
        }
        // down
        if (puzzle[y + 1] != undefined) {
            aroundOfLast.push(puzzle[y + 1][x])
        }
        // left
        if (puzzle[y][x - 1] != undefined) {
            aroundOfLast.push(puzzle[y][x - 1])
        }
        // right
        if (puzzle[y][x + 1] != undefined) {
            aroundOfLast.push(puzzle[y][x + 1])
        }
        let random = Math.floor(Math.random() * aroundOfLast.length);
        if (aroundOfLast[random] != lastMove) {
            // console.log(puzzle)
            DivClick($(`#puzzle${aroundOfLast[random]}`))
            moveStep--;
            lastMove = aroundOfLast[random]
        }
    } else {
        start = true;
        clearTimeout(st);
    }
}

function Win() {
    if (start) {
        let x = 1;
        if (puzzle[size - 1][size - 1] == empty) {
            for (let i = 0; i < puzzle.length; i++) {
                for (let j = 0; j < puzzle[i].length; j++) {
                    if (puzzle[i][j] != x) {
                        return;
                    }
                    x++
                }
            }
            console.log('win')
            console.log(puzzle)
            alert('你贏了')
            $(`#puzzle${size * size}`).show();
            start = false;
        }
    }
}

// 拼圖畫面相關-----------------------------------------
function DivStart() {
    CreateDiv()
    Div()
    ImgSize()
    ImgOverflow()
    HideLastPuzzle()
}

function CreateDiv() {
    let x = 0
    let y = 0
    for (let index = 1; index < size * size + 1; index++) {
        if (index % size == 1 && index > size) {
            x = 0
            y++
        }
        let div = `<div id='puzzle${index}' data-x='${x}' data-y='${y}'>
        <img src="pic.jpg"></div>`
        $('#puzzle').append(div);
        x++
    }
}

function Div() {
    let top = 0
    let left = 0
    let divSize = (500 / size) + 'px'
    $('#puzzle').children('div').each(function (index, element) {
        $(this).css('height', divSize);
        $(this).css('width', divSize);
        $(this).click(function (e) {
            DivClick(this)
        });
        if ((index + 1) % size == 1 && index > 2) {
            top += 500 / size
            left = 0
        }
        $(this).css('top', `${top}px`);
        $(this).css('left', `${left}px`);
        left += 500 / size
    });

}

function ImgSize() {
    let size = '500px'
    $('#puzzle').children('div').children('img').each(function (index, element) {
        $(this).css('height', size);
        $(this).css('width', size);
    });
}

function ImgOverflow() {
    let top = 0
    let left = 0
    $('#puzzle').children('div').children('img').each(function (index, element) {
        if ((index + 1) % size == 1 && index > 2) {
            top += -500 / size
            left = 0
        }
        $(this).css('margin', `${top}px 0 0 ${left}px`);
        left += -500 / size
    });
}

function DivClick(obj) {
    //現在點擊的方塊位置
    let position = GetPosition(obj)
    let move = CheckEmpty(position)
    MoveBlock(move, obj)
    if (start) {
        Win()
    }
}

function GetPosition(obj) {
    let position = [$(obj).data('y'), $(obj).data('x')]
    return position
}

function MoveBlock(move, obj) {
    var position = $(obj).position();
    ChangeArrayAndPosition(obj, move);
    switch (move) {
        case 'up':
            $(obj).animate({
                top: `${position.top - 500 / size}px`
            })
            break;
        case 'down':
            $(obj).animate({
                top: `${position.top + 500 / size}px`
            })
            break;
        case 'left':
            $(obj).animate({
                left: `${position.left - 500 / size}px`
            })
            break;
        case 'right':
            $(obj).animate({
                left: `${position.left + 500 / size}px`
            })
            break;

        default:
            break;
    }
}

function HideLastPuzzle() {
    $(`#puzzle${size * size}`).hide();
}

// 其他功能相關____________________________________________
function Reset() {
    $('#puzzle').html('');
    puzzle = [];
    moveStep = 20
    lastMove = 0;
    start = false
}

function ChangeSize(obj) {
    let val = $(obj).val();
    switch (val) {
        case '3x3':
            size = 3;
            empty = size * size
            break;
        case '4x4':
            size = 4;
            empty = size * size
            break;
        case '5x5':
            size = 5;
            empty = size * size
            break;

        default:
            break;
    }
    Reset()
    CreateArr()
    DivStart()
}

function ChangeMoveStep() {
    moveStep = $('#Random').val();
}

function ResetButton() {
    start = false;
    Reset()
    CreateArr()
    DivStart()
}

function ChangePic(e) {
    let path = URL.createObjectURL(e.target.files[0])
    console.log(path)
    $('img').each(function (index, element) {
        $(element).attr('src', path);
    });
}

$(function () {
    CreateArr()
    DivStart()
    $('#Start').click(GetRandom);
    $('#Size').change(function (e) {
        ChangeSize(this)
    });
    $('#Random').change(ChangeMoveStep)
    $('#Reset').click( ResetButton)
    $('#Pic').change(function (e) { 
        ChangePic(e)  
    });
});