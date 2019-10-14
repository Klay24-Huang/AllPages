$(function () {
    // $('#btn-translate').click(DoTranslate);
    $('#btn-translate').click(DoTranslate);
    // $('#translate').val('test');
    $('#abc').text('test');
});

function DoTranslate() {
    var source = $('#input').val();

    $.ajax({
        type: "post", //http verb
        headers: {
            //http header
            "Ocp-Apim-Subscription-Key": "1ccdd2baec084486bbfbb5bfe9b43cbc",
            "Content-Type": "application/json"
        },
        url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en",
        data: JSON.stringify([{ "Text": source }]), //要翻譯的文字
        dataType: "json",
        success: function (response) {
            //呼叫遠端服務後的回傳結果
            $('#translate').val(response[0].translations[0].text);
        }
    });
}

