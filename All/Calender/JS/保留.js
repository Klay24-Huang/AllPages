var timeNow;
var year;
var month;
var date; //幾號
var dates; //這個月有幾天
var day; //這個月一號是星期幾
var ExDate; //多出來td的天數, 最後一天以後的日期
var todayDate; //現在選擇的是幾號
var currentYear; //現實時間的年
var currentMonth; //現實時間的月
var currentDate; //現實時間日期
var title;
var time;

$(function () {
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

    //左方的td click方法 直接掛在html上
    $('#123').click(Test);
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

// 把今天的年月日存到變數,不可修改
function TodayIs() {
    currentYear = year; //現實時間的年
    currentMonth = month; //現實時間的月
    currentDate = date; //現實時間日期
}

//點 向右按鈕
function AddMonth() {
    $('#calenderDisplay').html('');
    month++;
    CheckYear(month);
    GetTime();
    RenewYAndM(year, month);
    CreateTable(dates);
    ChoseToday();
}

//點 向左按鈕
function SubtractMonth() {
    $('#calenderDisplay').html('');
    month--;
    CheckYear(month);
    GetTime();
    RenewYAndM(year, month);
    CreateTable(dates);
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

//刷新年月顯示
function RenewYAndM(year, month) {
    $('#yearAndMonth').text(`${year}年${month + 1}月`);
}

//產生日曆主體
function CreateTable(dates) {
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

//刷新右方table上方的日期
function RenewDetailDates(date) {
    $(`#${currentDate}`).removeClass('choseDetailDate');
    //取得傳入日期是星期幾
    let day = new Date(year, month, date).getDay();
    //週日開始的日期
    let startDate = DecideDetailDates(day, date);
    //取得這個月有幾天
    let forThisMonthDates = new Date(year, month + 1, 0);
    $('.DetailDates').each(function () {
        $(this).text(startDate);
        $(this).attr('id', startDate);
        startDate++;
        //如果超過這個月最後一天
        if (startDate > forThisMonthDates.getDate()) {
            startDate = 1;
        }
    });
    SetDetailID(date);
}

//決定右方table開始的日期
function DecideDetailDates(day, date) {
    //傳入的日期扣掉星期幾
    if (date - day > 0) {
        return date - day;
    } else {
        return DecideLastMonthDate(month);
    }
}

//點擊左方日曆
function CalenderTdFunction(obj) {
    todayDate = parseInt($(obj).text());
    RenewDetailDates(todayDate);
    ChoseToday();

}

//Modal相關
function ModalFunction() {
    date = $(this).attr('id').replace('detail', '');
    //設定時間的格式，ex 2017-01-01， 0不可省略
    let setMonth = (month) => {
        if (month + 1 < 10) {
            return '0' + (month + 1)
        } else {
            return month + 1
        }
    };
    let setDate = (date) => {
        if (date < 10) {
            return '0' + date
        } else {
            return date
        }
    };
    $('#time').val(`${year}-${setMonth(month)}-${setDate(date)}T12:00`);
    $('#ModifiedModal').modal();
}

//右下方td設立ID, ID等於選擇的日期
function SetDetailID(date) {
    //取得傳入日期是星期幾
    let day = new Date(year, month, date).getDay();
    //週日開始的日期
    let startDate = DecideDetailDates(day, date);
    //取得這個月有幾天
    let forThisMonthDates = new Date(year, month + 1, 0);
    //給setRecorder用，進到下個月 month要+1
    let recordMonth = month;
    //把陣列清空
    infoRecorder.length = 0;
    $('.detail').each(function () {
        $(this).attr('id', `detail${startDate}`);
        SaveRecorder(year, recordMonth, startDate);
        startDate++;
        //如果超過這個月最後一天
        if (startDate > forThisMonthDates.getDate()) {
            startDate = 1;
            recordMonth++;
            // 從12月回到1月 12月=11 1月=0
            if (recordMonth = 12) {
                recordMonth = 0
            }
        }

    });
    // console.log(infoRecorder); 
}

//給右方用的資料結構, 用來說明點到的td的年月日
//constructor function
function Information(year, month, date) {
    this.year = year;
    this.month = month;
    this.date = date;
}
var infoRecorder = [];

function SaveRecorder(year, month, date) {
    let obj = new Information(year, month + 1, date);
    infoRecorder.push(obj);
}

//用json紀錄行事曆事件

var detailData = [];

function RecordDetail() {
    let item = {
        title: $('#title').val(),
        time: $('#time').val(),
        description: $('#description').val()
    }
    //為顯示的badge顯示活動名稱和時間
    title = $('#title').val();
    time = new Date($('#time').val()).getHours();
    //清空
    $('#title').val('');
    $('#time').val('');
    $('#description').val('');

    detailData.push(item);
    SaveData(detailData);
    localStorage.setItem('detailBook', convertToJson);
    //在html上顯示新增
    ModalAddDetail(date);
}


//讀取save data
function SaveData(detailData) {
    convertToJson = JSON.stringify(detailData);
    localStorage.setItem('detailBook', convertToJson);
}

//讀取local data
function LoadData() {
    if (localStorage.getItem('detailBook') != null) {
        let load = localStorage.getItem('detailBook');
        load = JSON.parse(load);
        load.forEach(element => {
                let time = new Date(element.time);
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let date = time.getDate();
                AddDetail(year, month, date, element);
            });
        }
    }

    function AddDetail(year, month, date, DataObj) {
        infoRecorder.forEach(element => {
            if (element.year == year && element.month == month &&
                element.Date == date) {
                let hour = new Date(DataObj.time).getHours();
                let htmlStr = `<span class="badge badge-primary w-100 text-left">${element.title}<br>${hour}點</span>`;
                //取得當前item的index
                let element = infoRecorder.indexOf(element);
                //ex 第一天是3號 index = 0, id = 3
                // 第三天是5號 index = 2, id = 2+3
                let id = index + element[0].date;
                $(`#detail${id}`).append(htmlStr);
            }
        });
    }

    //在右下方table，增加活動的badge
    function ModalAddDetail(id) {
        let htmlStr = `<span class="badge badge-primary w-100 text-left">${title}<br>${time}點</span>`;
        $(`#detail${id}`).append(htmlStr);
    }

    function Test() {
        // let load = localStorage.getItem('detailBook');
        // load = JSON.parse(load);
        // console.log(infoRecorder);
        localStorage.clear();
    }