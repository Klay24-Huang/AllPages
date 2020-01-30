let arrMonth = [
    [],
    [],
    [],
    [],
    [],
    []
]
let today = new Date()
let year = today.getFullYear()
let month = today.getMonth() + 1


function YearAndMonth(year, month) {
    $('#yearAndMonth').text(`${year}年${month}月`);
}

// 點月份切換按鈕
function PrevOrNext() {
    let button = $(this).data('button');
    switch (button) {
        case 'prev':
            month = month - 1
            break;
        default:
            month = month + 1
            break;
    }
    CheckMonth(month)
    RedrawCalender()
}

// 確認年月分
function CheckMonth(check) {
    switch (check) {
        case 0:
            year = year - 1
            month = 12
            break;
        case 13:
            year = year + 1
            month = 1
        default:
            break;
    }
}

function MonthData() {
    curMonth = {
        days: new Date(year, month, 0).getDate(),
        // 一號是星期幾
        first: new Date(year, month - 1, 1).getDay()
    }
    prevMonth = {
        days: new Date(year, month - 1, 0).getDate(),
    }
}

function ArrMonth() {
    //這個月有幾天
    let manyDate = curMonth.days
    //塞入當月幾號
    let x = 1
    //塞入下個月幾號
    let y = 1
    // 一天的資訊
    let date = {}
    // 上個月要顯示幾天
    let prevDays = curMonth.first
    //上個月data
    let tempMonth = 0
    let tempYear = 0
    let tempDate = 0
    //周
    for (let index = 0; index < 6; index++) {
        //天
        for (let d = 1; d < 8; d++) {
            //上個月的天數
            if (index == 0 && prevDays != 0) {
                if (month - 1 == 0) {
                    tempYear = year - 1
                    tempMonth = 12
                    tempDate = new Date(year, tempMonth, 0).getDate() - (prevDays - 1)
                } else {
                    tempYear = year
                    tempMonth = month - 1
                    tempDate = new Date(year, tempMonth, 0).getDate() - (prevDays - 1)
                }
                date = {
                    year: tempYear,
                    month: tempMonth,
                    date: tempDate,
                    color: 'grey'
                }
                prevDays--
                tempDate++
            } else if (prevDays == 0 && manyDate != 0) {
                //現在的月份
                date = {
                    year: year,
                    month: month,
                    date: x,
                    color: 'black'
                }
                manyDate--
                x++
            } else {
                date = {
                    year: year,
                    month: month + 1,
                    date: y,
                    color: 'grey'
                }
                y++
            }
            arrMonth[index].push(date)
        }
    }
}

function ClearArr() {
    for (let index = 0; index < arrMonth.length; index++) {
        arrMonth[index] = []
    }
}

function FillCalender() {
    //clear
    $('#calenderDisplay').html('');
    // week
    for (let index = 0; index < arrMonth.length; index++) {
        // days
        let td = ''
        for (let d = 0; d < arrMonth[index].length; d++) {
            let color = ''
            if (arrMonth[index][d].color == 'grey') {
                color = 'text-black-50'
            } else {
                color = 'text-black'
            }
            td += `<td><div data-year=${arrMonth[index][d].year} data-month=${arrMonth[index][d].month} class=${color}>${arrMonth[index][d].date}</div></td>`
        }
        let tr = `<tr data-week=${index+1}>${td}</tr>`
        td = ''
        $('#calenderDisplay').append(tr);
    }
}

function ChangeDetail() {
    let week = $(this).data('week');
    if (week == undefined) {
        let date = today.getDate()
        for (let w = 0; w < arrMonth.length; w++) {
            for (let d = 0; d < arrMonth[w].length; d++) {
                let now = arrMonth[w][d]
                if (now.month == month && now.date == date) {
                    week = w+1
                }
            }
        }
    }
    $('.DetailDates').each(function (index, element) {
        $(element).text(arrMonth[week-1][index].date);
        $(element).data('year', arrMonth[week-1][index].year.toString());
        $(element).data('month', arrMonth[week-1][index].month.toString());
        $(element).data('date', arrMonth[week-1][index].date.toString());
    });
    $('.detail').each(function (index, element) {
        $(element).data('year', arrMonth[week-1][index].year.toString());
        $(element).data('month', arrMonth[week-1][index].month.toString());
        $(element).data('date', arrMonth[week-1][index].date.toString());
    });
    ShowEvent()
}

function RedrawCalender() {
    YearAndMonth(year, month)
    MonthData()
    ClearArr()
    ArrMonth()
    FillCalender()
    $('#calenderDisplay').children('tr').click(ChangeDetail)
}

$(function () {
    RedrawCalender()
    ChangeDetail()
    $('.arrow').click(PrevOrNext); 
    
})