var height = 1;
var weight = 1;



function getBodyValue(){
    height = document.getElementById("height").value;
    weight = document.getElementById("weight").value;
}

function caculateBMI(){
    getBodyValue();
    var result = weight/Math.pow((height/100), 2);
    document.getElementById("result").innerText = result;
}

//whyyyyyyyyyy
document.getElementById("calculate").onclick = function(){
    caculateBMI();}

// window.onload = function () {
//     document.getElementById("calculate").onclick = function(){
//         caculateBMI();
//     }
// }

// document.getElementById("calculate").onclick = caculateBMI();

