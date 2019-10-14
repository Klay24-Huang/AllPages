 
$(function () {
    // Select wrong element
    // Error as #demo is the `div` element
    dt = $('#table_id').dataTable({
        data: dat
    });

    
    RenewModal();
    // $('#btn-add').click(function (e) {
    //     DataTable.clear();
    //     DataTable.rows.add(dat2);
    //     DataTable.draw();
    // });
    // $('#btn-add').click(LoadData);

    $('#btn-ShowAddModal').click(function (e) {
        $('.modal').modal();
    });

    $('#btn-modal-add').click(ModalAddData);
});

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
    dat.push(item);
    RenewModal();
}

function RenewModal() {
    dt.clear();
    dt.rows.add(dat);
    dt.draw();
}