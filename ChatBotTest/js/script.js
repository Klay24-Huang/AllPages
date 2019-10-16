$(function () {
    // $('#btn-translate').click(RespondProblem);
    $('#btn-translate').click(RespondProblem);
    // $('#translate').val('test');
    $('#abc').text('test');
});

function RespondProblem() {
    var source = $('#input').val();
    
    $.ajax({
        type: "post",
        headers: {
            "Authorization": "EndpointKey 47f1c031-ea28-4859-b936-40c311189e4b",
            "Content-Type": "application/json"
        },
        url: "https://seanqnamaker1016.azurewebsites.net/qnamaker/knowledgebases/e28d0ce2-de81-45ec-851c-792d745b1e05/generateAnswer",
        data: JSON.stringify({ "question": source }), //輸入問題
        dataType: "json",
        success: function (ret) {
            console.log(ret);
            $('#output').val(ret.answers[0].answer);

        }, error: function (err) {
            //如果有錯
            console.log('失敗')
            $('#output').val(ret[0].answers[0].text);
        }
    });
}

// $.ajax({
//     type: "post", //http verb
//     headers: {
//         //http header
//         "Ocp-Apim-Subscription-Key": "1ccdd2baec084486bbfbb5bfe9b43cbc",
//         "Content-Type": "application/json"
//     },
//     url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en",
//     data: JSON.stringify([{ "Text": source }]), //要翻譯的文字
//     dataType: "json",
//     success: function (response) {
//         //呼叫遠端服務後的回傳結果
//         $('#output').val(response[0].translations[0].text);
//     }
// });