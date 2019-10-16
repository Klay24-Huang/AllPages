

function ButtonSend() {
    console.log('ButtonSend');
    var html = $('#TalkContainer').html();
    var UserSay = $('#inputText').val();

    // 產生客戶問題框框
    $('#TalkContainer').html(html + '<br><br> 客戶:' + UserSay);
    // 清空input
    $('#inputText').val('');
    // 視窗移至底部
    $('#TalkContainer').scrollTop($('#TalkContainer')[0].scrollHeight);
    //取得答案...
    GetAnswer(UserSay, function (ret) {
        //如果ok
        //show user Says...
        let html = $('#TalkContainer').html();
        $('#TalkContainer').html(html + '<br /><br />客服 : ' + ret.answers[0].answer);
        //scroll to bottom
        $('#TalkContainer').scrollTop($('#TalkContainer')[0].scrollHeight);
    });
}

//取得答案，並執行whenSuccess
        //whenSuccess:傳入function作為參數
        function GetAnswer(msg, whenSuccess) {
            $.ajax({
                type: "post",
                headers: {
                    "Authorization": "EndpointKey 47f1c031-ea28-4859-b936-40c311189e4b",
                    "Content-Type": "application/json"
                },
                url: "https://seanqnamaker1016.azurewebsites.net/qnamaker/knowledgebases/e28d0ce2-de81-45ec-851c-792d745b1e05/generateAnswer",
                data: JSON.stringify({ "question": msg }),
                dataType: "json",
                success: whenSuccess,
                error: function (err) {
                    //如果有錯
                }
            });
        }

        //doc ready
        $(document).ready(function () {
            $('#ButtonSend').click(ButtonSend);
            $('#inputText').keypress(function (e) {
                if (e.keyCode == 13) {
                    ButtonSend();
                    return false;
                }
            });
        });