//左方的td click方法 直接掛在html上
//左方的td click方法 直接掛在html上
//左方的td click方法 直接掛在html上

//初始化
$(function () {
    // localStorage.clear() ;
    GetTime();
    TodayIs();
    RenewYAndM(year, month);
    CreateTable(dates);
    $('#prevMonth').click(SubtractMonth);
    $('#nextMonth').click(AddMonth);
    RenewDetailDates(todayDate);
    ChoseToday();
    //顯示行事曆modal
    $('.detail').click(ModalFunction);
    //點擊modal新增按鈕
    $('#btn-add').click(RecordDetail);
    LoadData();

    $('#testButton').click(Test); //測試用按鈕
})

function GetTime() {
    //如果year沒值，抓現在電腦上的年份
    if (!year) {
        timeNow = new Date();
        year = timeNow.getFullYear();
        month = timeNow.getMonth(); //回傳0~11
        date = timeNow.getDate();
        todayDate = date;
    }
    // 利用getDate多載，取得當月天數
    //懷疑使用這個方法時，輸入9 = 9月
    let forDates = new Date(year, month + 1, 0);
    //這個月有幾天
    dates = forDates.getDate();
    let forDay = new Date(year, month, 1); // 0 ~ 11
    //星期幾
    day = forDay.getDay();
}

// 把今天的年月日存到變數
function TodayIs() {
    currentYear = year; //現實時間的年
    currentMonth = month; //現實時間的月
    currentDate = date; //現實時間日期
}

//點 向右按鈕
function AddMonth() {
    $('#calenderDisplay').html('');
    month++;
    RenewCalender();
}

//點 向左按鈕
function SubtractMonth() {
    $('#calenderDisplay').html('');
    month--;
    RenewCalender();
}

//點選上下個月後，刷新行事曆相關的功能
function RenewCalender() {
    CheckYear(month);
    GetTime();
    RenewYAndM(year, month);
    CreateTable();
    ChoseToday();
}

//確認年分
function CheckYear(month) {
    if (month > 11) {
        this.month = 0;
        year++;
    } else if (month < 0) {
        this.month = 11;
        year--;
    }
}

//刷新日曆上方年月顯示
function RenewYAndM(year, month) {
    $('#yearAndMonth').text(`${year}年${month + 1}月`);
}

//產生日曆主體
function CreateTable() {
    let trIndex = 1;
    //dates = 這個月有幾天 = 要產生幾個td
    //產生六個tr
    while (trIndex < 7) {
        $('#calenderDisplay').append(
            `<tr id="tr${trIndex}"></tr>`
        );
        $(`#tr${trIndex}`).append(CreateTd(trIndex));
        trIndex++;
    }
}

//產生有日期的Td
function CreateTd(trIndex) {
    //把要產生的td code存在一個string裡
    // 給空值預防在html上加上undefined，雖然沒影響
    let CreateTdStr = '';
    //td的ID也等於日期
    let tdId = DecideTdId(trIndex);
    // //產生一號之前的td，只在第一列才執行
    if (trIndex == 1) {
        CreateTdStr = CreateBlankTd(day);
        var i = day; //下方迴圈的INDEX
    } else {
        var i = 0;
    }
    //產生七個td
    for (; i < 7; i++) {
        if (trIndex == 1) {
            // 多出來td的天數, 最後一天以後的日期
            ExDate = 1
        }
        if (tdId > dates) {
            CreateTdStr += `<td class="text-muted">${ExDate}</td>`;
            ExDate++;
        } else {
            CreateTdStr += `<td><div onclick="CalenderTdFunction(this)" id="td${tdId}">${tdId}</div></td>`;
            tdId++;
        }
    }
    return CreateTdStr;
}

//產生1號之前的空白td
function CreateBlankTd(day) {
    //把要產生的td code存在一個string裡
    let CreateTdStr = "";
    // 1號之前的td顯示的日期
    let date = DecideLastMonthDate(month);
    for (; day > 0; day--) {
        CreateTdStr += `<td class="text-muted">${date}</td>`;
        date++;
    }
    // this.day = 0;
    return CreateTdStr;
}


function DecideTdId(trIndex) {
    //trIndex - 1，因為起始值是1
    if (trIndex == 1) {
        return 1;
    } else {
        // 必須根據1號的星期幾縮排
        return 1 + (trIndex - 1) * 7 - day;
    }
}


function DecideLastMonthDate(month) {
    //取得上個月有幾天
    let forDates = new Date(year, month, 0);
    //根據星期幾往回退
    return forDates.getDate() - day + 1;
}

function DecideDate(trIndex) {
    if (trIndex == 1) {
        return 1;
    }
}

// 為今天加上標記
function ChoseToday() {

    if (month == currentMonth) {
        //在日曆上加上今天的標記
        $(`#td${currentDate}`).css("background-color", "#1967d2");
        $(`#td${currentDate}`).css("color", "white");
        $(`#td${currentDate}`).css("border-radius", "50%");
        //在右方table加上今天的標記
        if (todayDate == currentDate) {
            //如果選擇的日期 == 今天的日期，加上class
            $(`#${currentDate}`).addClass('choseDetailDate');
        } else {
            $(`#${todayDate}`).removeClass('choseDetailDate');
        }
    }
}

//點擊左方日曆
function CalenderTdFunction(obj) {
    todayDate = parseInt($(obj).text());
    RenewDetailDates(todayDate);
    // ChoseToday();
    ClearTable();
    LoadData();
}





function Test() {
    localStorage.clear();
    // let fakeData = `[{"title":"test1","time":"2019-11-11T12:00","description":""},{"title":"test2","time":"2019-11-19T12:00","description":""},{"title":"test3","time":"2019-11-11T12:00","description":""}]`;
    // localStorage.setItem('detailBook', fakeData);
}