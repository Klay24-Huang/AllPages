var timeNow;
var year;
var month;
var dates; //這個月有幾天
var day; //這個月一號是星期幾

$(function () {
    GetTime();
    RenewYAndM(year, month);
    CreateTable(dates);
    $('button').click(Test);
    $('#prevMonth').click(SubtractMonth);
    $('#nextMonth').click(AddMonth);
})

function GetTime() {
    //如果year沒值，抓現在電腦上的年份
    if (!year) {
        timeNow = new Date();
        year = timeNow.getFullYear();
        month = timeNow.getMonth(); //回傳0~11
    }
    // 利用getDate多載，取得當月天數
    //懷疑使用這個方法時，輸入9 = 9月
    let forDates = new Date(year, month + 1, 0);
    dates = forDates.getDate();
    let forDay = new Date(year, month, 1); // 0 ~ 11
    day = forDay.getDay();
    // console.log(`dates is ${dates}, day is ${day}`)
}

//點 向右按鈕
function AddMonth() {
    $('tbody').html('');
    month++;
    CheckYear(month);
    GetTime();
    RenewYAndM(year, month);
    CreateTable(dates);
}

//點 向左按鈕
function SubtractMonth() {
    $('tbody').html('');
    month--;
    CheckYear(month);
    GetTime();
    RenewYAndM(year, month);
    CreateTable(dates);
}

//確認年分
function CheckYear(month) {
    if (month > 11) {
        this.month = 0;
        year++;
    } else if (month < 0) {
        this.month = 12;
        year--;
    }
}

//刷新年月顯示
function RenewYAndM(year, month) {
    $('#yearAndMonth').text(`${year}年${month + 1}月`);
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
        if (trIndex == 1) {
            dates -= (7 - day);
        } else {
            // 產生七個td
            dates -= 7;
        }
        // 進到下一個tr
        trIndex++;
    }
}

//產生有日期的Td
function CreateTd(trIndex) {
    //把要產生的td code存在一個string裡
    // 給空值預防在html上加上為定義，雖然沒影響
    let CreateTdStr = '';
    //td的ID也等於日期
    //trIndex - 1，印為起始值是1
    let tdId = 1 + (trIndex - 1) * 7;  // <=================================要修改
    // 多出來td的天數
    let date = 1;
    //產生一號之前的td，只在第一列才執行
    if (trIndex == 1) {
        CreateTdStr = CreateBlankTd(day);
        var i = day; //下方迴圈的INDEX
    } else {
        var i = 0;
    }
    //產生七個td
    for (; i < 7; i++) {
        if (tdId > dates) {
            CreateTdStr += `<td class="text-muted">${date}</td>`;
            date++;
        } else {
            CreateTdStr += `<td id="td${tdId}">${tdId}</td>`;
            tdId++;
        }
    }
    return CreateTdStr;
}

//產生1號之前的空白td
function CreateBlankTd(day) {
    //把要產生的td code存在一個string裡
    let CreateTdStr;
    // 1號之前的td顯示的日期
    let date = 10;
    for (; day > 0; day--) {
        CreateTdStr += `<td class="text-muted">${date}</td>`;
        date--;
    }
    // this.day = 0;
    return CreateTdStr;
}

function Test() {

}