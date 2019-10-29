var timeNow;
var year;
var month;
var dates; //這個月有幾天
var day; //星期幾

$(function () {
    GetTime();
    RenewYAndM(year, month);
    CreateTable(dates);
    $('button').click(Test);
    $('#prevMonth').click(SubtractMonth);
    $('#nextMonth').click(AddMonth);
})

function GetTime() {
    timeNow = new Date();
    year = timeNow.getFullYear();
    month = timeNow.getMonth() + 1; //回傳0~11
    // 利用getDate多載，取得當月天數
    let forDays = new Date(year, month, 0);
    dates = forDays.getDate();
    day = forDays.getDay();
}

//點 向右按鈕
function AddMonth() {
    month++;
    CheckYear(month);
    RenewYAndM(year, month);
}

//點 向左按鈕
function SubtractMonth() {
    month--;
    CheckYear(month);
    RenewYAndM(year, month);
}

//確認年分
function CheckYear(month) {
    if (month > 12) {
        this.month = 1;
        year++;
    } else if (month == 0) {
        this.month = 12;
        year--;
    }
}

//刷新年月顯示
function RenewYAndM(year, month) {
    $('#yearAndMonth').text(`${year}年${month}月`);
}

//產生日曆主體
function CreateTable(dates) {
    let trIndex = 1;
    //dates = 這個月有幾天 = 要產生幾個td
    while (dates > 0) {
        $('tbody').append(
            `<tr id="tr${trIndex}"></tr>`
        );
        $(`#tr${trIndex}`).append(CreateTd(trIndex));
        // 產生七個td
        dates -= 7;
        // 進到下一個tr
        trIndex++;
    }
}

//產生有日期的Td
function CreateTd(trIndex) {
    //把要產生的td code存在一個string裡
    let CreateTdStr;
    //td的ID也等於日期
    //trIndex - 1，印為起始值是1
    let tdId = 1 + (trIndex - 1) * 7;
    //產生七個td
    for (let i = 1; i < 8; i++) {
        if (tdId > dates) {
            tdId = 1;
        }
        CreateTdStr += `<td id="td${tdId}">${tdId}</td>`;
        tdId++;
    }
    return CreateTdStr;
}
//產生1號之前的空白td
function CreateBlankTd(day) {
    for (; day > 0; day--) {

    }
}

function Test() {

}