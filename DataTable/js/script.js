$(function () {
    dt = $('#table_id').DataTable({
        data: dat
    });
    LoadData();
    $('#btn-ShowAddModal').click(function (e) {
        $('#AddModal').modal();
    });

    $('#btn-ShowImportModal').click(function (e) {
        isImport = true;
        ImportOrExport();
    });

    $('#btn-ShowExportModal').click(function (e) {
        isImport = false;
        ImportOrExport();
    });

});
var isImport;
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

var dat2 = [
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
    ['Amy', '1980/1/1', '0912345678', 'eric@gmail.com', '台北市光復南路179號13樓'],
];



// function LoadData() {
//     console.log('LoadData');
//     DataTable.clear();
//     DataTable.rows.add(dat2);
//     DataTable.draw();
// }

function ModalAddData() {
    var item = [
        $('#modal-name').val(),
        $('#modal-birthday').val(),
        $('#modal-phone').val(),
        $('#modal-e-mail').val(),
        $('#modal-address').val(),
    ]

    // clear data
    $('#modal-name').val();
    $('#modal-birthday').val();
    $('#modal-phone').val();
    $('#modal-e-mail').val();
    $('#modal-address').val();


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

function ImportOrExport() {
    if (isImport) {
        $('#ButtonImport').attr('disabled', false);
        $('#ModalOfImport').text('資料匯入');
    } else {
        $('#ButtonImport').attr('disabled', true);
        $('#ModalOfImport').text('資料匯出');
    }
    $('#ModalDataExport').modal();
}