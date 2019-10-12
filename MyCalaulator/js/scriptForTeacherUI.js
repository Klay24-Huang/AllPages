$(function () {
    Click();
    Calculate();
});

var input = '';


function Click() {
    $('button').click(function (e) {
        if (($(this).text()) == '=') {
            return;
        } else if (($(this).text()) == 'AC') {
            $('input').val('0');
            input ='';
        } else {
            input += $(this).text();
            $('input').val(input);

            
        }
    });
}

function Calculate() {
    $('#calculate').click(function (e) {
        $('input').val(eval(input));
        input ='';
    });

}

// function Show() {
//     $('input').val(input);
// }




// function ClickTest() {
//     $('button').click(function (e) { 
//         var input = $(this).val();
//         console.log(input);
//         $('input').text(input);
//     });
// }