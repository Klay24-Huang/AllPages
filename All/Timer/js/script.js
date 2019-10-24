$(function () {
    $('#start').click(Start);
    $('#pause').click(Pause);
});

var time;
var pause;
var counting = false; //防止連續點擊 加速到數

function Start() {
    // 在沒數到0之前, 且不為暫停狀態時, 使此按鈕無效
    if (pause == false && counting) return;
    pause = false;
    //防止繼續時 從頭開始數
    if (counting == false) time = $('input').val(); 
    CountTime();
    counting = true;
}

function Pause() {
        pause = true;
        time += 1; //避免繼續時, 直接減一秒
        $('#start').text('繼續倒數');
}

function CountTime() {
    if (pause == false) {
        if (time > 0) {
            $('label').text(time);
            time -= 1;
            setTimeout(CountTime, 1000);
        } else {
            $('label').text('倒數時間到了!!');
            // counting = false;
        }
    }
}