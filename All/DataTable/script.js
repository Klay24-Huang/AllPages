$(function () {
    // 初始化table
    dt = $('#table_id').DataTable({
        data: dat
    });
    // 讀取local data
    LoadData();
    //顯示新增modal
    $('#btn-ShowAddModal').click(function (e) {
        $('#AddModal').modal();
    });
    //點擊匯入按鈕
    $('#btn-ShowImportModal').click(function (e) {
        isImport = true;
        ImportOrExport();
    });
    //點擊匯出按鈕
    $('#btn-ShowExportModal').click(function (e) {
        isImport = false;
        ImportOrExport();
        Export();
    });
    //匯入資料
    $('#ButtonImport').click(Import);
    //新增資料
    $('#btn-modal-add').click(ModalAddData);
    // 修改資料
    $('#btn-modified').click(ButtonUpdate);
    // 刪除資料
    $('#btn-delete').click(ButtonDelete);
    //參考: https://datatables.net/examples/advanced_init/events_live.html
    $('#table_id tbody').on('click', 'tr', ButtonModified);
    // 增加tags
    $('.add-tags').tagsInput();
});
var isImport; //匯入匯出flag
var dat = [
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
    ["Sean", "1991/01/01", "3345678", "123@email", "台北市"],
];

function ModalAddData() {
    // console.log('ModalAddData');
    var item = [
        $('#modal-name').val(),
        $('#modal-birthday').val(),
        $('#modal-phone').val(),
        $('#modal-e-mail').val(),
        $('#modal-address').val(),
        $('#modal-category').val(),
    ]
    // clear data
    $('#modal-name').val('');
    $('#modal-birthday').val('');
    $('#modal-phone').val('');
    $('#modal-e-mail').val('');
    $('#modal-address').val('');
    $('#modal-category').importTags('');

    dat.push(item);
    SaveData();
    RenewModal();
}

//套用模板的內建方法?
function RenewModal() {
    dt.clear();
    dt.rows.add(dat);
    dt.draw();
}

//載入資料
function LoadData() {
    if (localStorage.getItem('AddressBook') != null) {
        var str = localStorage.getItem('AddressBook');
        //取回資料
        dat = JSON.parse(str);
    }
    //refresh data table
    RenewModal();
}

//儲存資料
function SaveData() {
    var str = JSON.stringify(dat);
    localStorage.setItem('AddressBook', str);
}

//控制匯入匯出modal版面
function ImportOrExport() {
    if (isImport) {
        $('#field_DataJSON').val('');
        $('#ButtonImport').attr('disabled', false);
        $('#ModalOfImport').text('資料匯入');
    } else {
        $('#ButtonImport').attr('disabled', true);
        $('#ModalOfImport').text('資料匯出');
    }
    $('#ModalDataExport').modal();
}

// 匯入
function Import() {
    var str = $('#field_DataJSON').val();
    dat = JSON.parse(str);
    SaveData();
    RenewModal();
}

// 匯出
function Export() {
    var exportData = JSON.stringify(dat);
    $('#field_DataJSON').val(exportData);
}

//刪除資料
function ButtonDelete() {
    //找出當前編輯的資料是哪一個元素
    var n = dat.indexOf(CurrentEditItem);
    //刪除指定位置的元素
    dat.splice(n, 1);
    //refresh data table
    RenewModal();
    //儲存記憶體中的資料到localstorage
    SaveData();
}

//更新資料
function ButtonUpdate() {
    //取得當前編輯資料
    var NewItem = [
        $('#EditField_Name').val(),
        $('#EditField_Birthday').val(),
        $('#EditField_TEL').val(),
        $('#EditField_Email').val(),
        $('#EditField_Address').val(),
        $('#EditField-category').val()
    ];
    //找出當前編輯的資料是哪一個元素
    var n = dat.indexOf(CurrentEditItem);
    //置換
    dat[n] = NewItem;
    //refresh data table
    RenewModal();
    //儲存記憶體中的資料到localstorage
    SaveData();
}

function ButtonModified() {
    //取得當前點選的資料 
    CurrentEditItem = dt.row(this).data();
    $('#EditField_Name').val(CurrentEditItem[0]);
    $('#EditField_Birthday').val(CurrentEditItem[1]);
    $('#EditField_TEL').val(CurrentEditItem[2]);
    $('#EditField_Email').val(CurrentEditItem[3]);
    $('#EditField_Address').val(CurrentEditItem[4]);
    $('#EditField-category').importTags(CurrentEditItem[5]);
    //顯示當前點選的資料
    $('#ModifiedModal').modal();
}