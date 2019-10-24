    //getElementById(抓取頁面上的元素)
    function getElement(name) {
        return document.getElementById(name);
      }
  
      //判斷是否可以送件
      function Button_Submit() {
        //抓取頁面上的checkboc1，取得是否checked
        var isChecked = getElement('ischeck').checked;
        //如果是，就return true
        if (isChecked) return true;
        //否則就... 
        alert('必須勾選同意!');
        return false;
      }
  
      //當網頁載入完成後執行
      window.onload = function () {
        //hook event(在form1被submit時...)
        getElement('Form1').onsubmit = function () {
        //呼叫 Button_Submit()
          return Button_Submit();
        };
      };