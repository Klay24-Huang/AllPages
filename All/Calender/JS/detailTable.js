//左方的td click方法 直接掛在html上
//左方的td click方法 直接掛在html上
//左方的td click方法 直接掛在html上

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
    //在html上顯示新增
    HtmlAddDetail(date);
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
            element.date == date) {
            let hour = new Date(DataObj.time).getHours();
            let htmlStr = `<span class="badge badge-primary w-100 text-left mt-1">${DataObj.title}<br>${hour}點</span>`;
            //取得當前item的index
            let index = infoRecorder.indexOf(element);
            //ex 第一天是3號 index = 0, id = 3
            // 第三天是5號 index = 2, id = 2+3
            let id = index + infoRecorder[0].date;
            $(`#detail${id}`).append(htmlStr);
        }
    });
}

//在右下方table，增加活動的badge
function HtmlAddDetail(id) {
    let htmlStr = `<span class="badge badge-primary w-100 text-left">${title}<br>${time}點</span>`;
    $(`#detail${id}`).append(htmlStr);
}

//換周後清空右方table
function ClearTable() {
    $('.detail').each(function () {
        $(this).html('');
    });
}