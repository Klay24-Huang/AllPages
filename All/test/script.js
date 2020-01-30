var text = '$280.00';
var text2= 'aba';
$(function () {
    $('Button').click(function (e) { 
         text2.replace('b','fuck');
         console.log(text2);
    });
    text.replace('0','a');
    console.log(text);
});




