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
    ]
    // clear data
    $('#modal-name').val('');
    $('#modal-birthday').val('');
    $('#modal-phone').val('');
    $('#modal-e-mail').val('');
    $('#modal-address').val('');
    dat.push(item);
    SaveData();
    RenewModal();
}

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

function Import() {
    var str = $('#field_DataJSON').val();
    dat = JSON.parse(str);
    SaveData();
    RenewModal();
}

function Export() {
    var exportData = JSON.stringify(dat);
    $('#field_DataJSON').val(exportData);
}