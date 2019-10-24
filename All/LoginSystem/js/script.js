// var ischecked = false;

// getElementById('btn').onclick = function () {
//     ischecked = getElementById('ischeck').checked;
//     Show_model()
// };


// function Show_model() {
//     if (!ischecked) {
//         $('#myModal').modal()
//     };
// }

//當網頁載入完成後執行


$(document).ready(function () {
    $('#my-btn').click(function () {
        Check();
    });
});

function getElement(name) {
    return document.getElementById(name);
}

function Check() {
    var isChecked = getElement('ischeck').checked;

    if (isChecked) {
        document.getElementById('modal-body').innerHTML = "成功註冊";
        $('#myModal').modal();
    }
    //否則就...
    else {
        document.getElementById('modal-body').innerHTML = "請勾選同意";
        $('#myModal').modal();

    }
}

