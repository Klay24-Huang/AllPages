// localStorage.removeItem('calender');
//所有資料
let data = []
let detailInfo = []
//每個月的資料
let detailData = []
//修改刪除使用
let index = 0

$('.detail').click(ShowModal)
$('#btn-modified').click(Upgrade)
$('#btn-delete').click(Delete)

Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
}

function ButtonSwitch(state) {
    switch (state) {
        case 'create':
            $('#btn-add').show();
            $('#btn-modified').hide();
            $('#btn-delete').hide();
            break;
        case 'modified':
            $('#btn-add').hide();
            $('#btn-modified').show();
            $('#btn-delete').show();
            break;
        default:
            break;
    }
}

//取得detail顯示時間的範圍
function GetDetailInfo() {
    detailInfo = []
    let start = {}
    let end = {}
    $('.DetailDates').each(function (index, element) {
        let order = $(element).data('order');
        switch (order) {
            case 0:
                start = element
                break;
            case 6:
                end = element
            default:
                break;
        }
    });
    let startTime = new Date($(start).data('year'), $(start).data('month') - 1, $(start).data('date'))
    let endTime = new Date($(end).data('year'), $(end).data('month') - 1, $(end).data('date'))
    endTime.addDays(1)
    detailInfo.push(startTime)
    detailInfo.push(endTime)
    // console.log(detailInfo)
}

// 在時間範圍內取得以儲存的活動內容
function GetDetailData() {
    data = Read()
    detailData = []
    console.log('data is ', data)
    for (let index = 0; index < data.length; index++) {
        let time = new Date(data[index].time)
        if (time >= detailInfo[0] && time < detailInfo[1]) {
            detailData.push(data[index])
        }
    }
    // console.log('detailData is ', detailData)
}

//選好範圍的data依時間排序
function OrderDetailData() {
    detailData = detailData.sort(function (a, b) {
        return a.time > b.time ? 1 : -1;
    })
    // for (let index = 0; index < detailData.length; index++) {
    //     detailData[index].index = index
    // }
    console.log('detailData is ', detailData)
}

//在畫面上產生徽章
function CreateBadge() {
    $('.detail').each(function (index, element) {
        $(element).html('');
        let temp = []
        let startTime = new Date($(element).data('year'), $(element).data('month') - 1, $(element).data('date'))
        let endTime = new Date($(element).data('year'), $(element).data('month') - 1, $(element).data('date'))
        endTime.addDays(1)
        //取出當天的資料
        for (let index = 0; index < detailData.length; index++) {
            let ItemTime = new Date(detailData[index].time)
            if (ItemTime >= startTime && ItemTime < endTime) {
                temp.push(detailData[index])
            }
        }
        // 產生徽章
        for (let i = 0; i < temp.length; i++) {
            let hour = new Date(temp[i].time).getHours()
            let minute = new Date(temp[i].time).getMinutes()
            let dataIndex = Index(temp[i])
            let badge = `<span class="badge badge-primary w-100 text-left mt-1" data-index=${dataIndex}><div>${temp[i].title}</div><div>${hour}點${minute}分</div></span>`;
            $(element).append(badge);
        }
    });
}

function Index(obj) {
    return detailData.indexOf(obj) 
}

//顯示活動在畫面上
function ShowEvent() {
    GetDetailInfo()
    GetDetailData()
    OrderDetailData()
    CreateBadge()
    $('.detail').children('span').click(function (event) {
        event.stopPropagation()
        BadgeClick(this)
    })
}

function ShowModal() {
    ButtonSwitch('create')
    CLearModal()
    $('#ModifiedModal').modal()
    let order = $(this).data('order');
    ModalTime(order)
}

function ModalTime(order) {
    let info = {}
    $('.DetailDates').each(function (index, element) {
        if ($(element).data('order') == order) {
            info = element
        }
    });
    let time = {
        year: $(info).data('year'),
        month: $(info).data('month'),
        date: $(info).data('date')
    }
    time.month = Format(time.month)
    time.date = Format(time.date)
    $('#time').val(`${time.year}-${time.month}-${time.date}T12:00`);
}

//時間格式必須填入0
function Format(obj) {
    let count = 0;
    for (let index = 0; index < obj.length; index++) {
        count++
    }
    if (count == 1) {
        obj = '0' + obj
    }
    return obj
}

function BadgeClick(obj) {
    ButtonSwitch('modified')
    index = $(obj).data('index');
    let data = detailData[index]
    $('#title').val(data.title)
    $('#time').val(data.time)
    $('#description').val(data.description)
    $('#ModifiedModal').modal()
}

//在所有data中尋找要修改或刪除的資料
function FindOfData(obj) {
    let dataIndex = data.indexOf(obj)
    return dataIndex
}

function CLearModal() {
    $('#title').val('')
    $('#time').val('')
    $('#description').val('')
}

function Create() {
    let event = {
        title: DefaultTitle(),
        time: $('#time').val(),
        description: $('#description').val()
    }
    data.push(event)
    Save()
    CLearModal()
}

function Save() {
    localStorage.setItem('calender', JSON.stringify(data))
}

function DefaultTitle() {
    let title = $('#title').val()
    if (title.length == 0) {
        title = '未命名的活動'
    }
    return title
}

function Read() {
    let data = localStorage.getItem('calender')
    if (data != undefined) {
        return JSON.parse(data)
    } else {
        return []
    }
}

function Upgrade() {
    let dataIndex = FindOfData(detailData[index])
    let event = {
        title: $('#title').val(),
        time: $('#time').val(),
        description: $('#description').val()
    }
    data[dataIndex] = event
    Save()
    ShowEvent()
}

function Delete() {
    let dataIndex = FindOfData(detailData[index])
    if (dataIndex ==-1) {
        return
    }
    data.splice(dataIndex, 1)
    Save()
    ShowEvent()

}

function NewMemo() {
    Create()
    ShowEvent()
}

$('#btn-add').click(NewMemo);
