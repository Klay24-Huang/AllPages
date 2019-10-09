$(function () {
    Click();
    Calculate();
});

var input = '';
var result;

function Click() {
    $('td').click(function (e) { 
        // if ($(this).val() == '=') return;
        input += $(this).text();
        console.log(input);
        $('input').val(input);
    });
}

function Calculate () {
$('#calculate').click(function (e) { 
    input -= '=';
    result = parseInt(input);
    $('input').val(results)
});
    
}

function Show() {
    $('input').val(input);
}




// function ClickTest() {
//     $('button').click(function (e) { 
//         var input = $(this).val();
//         console.log(input);
//         $('input').text(input);
//     });
// }
