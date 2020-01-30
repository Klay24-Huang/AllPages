var picVue = null
$(function () {
    //隱藏Shipping and Returns
    $('#SAndR').hide()
    //隱藏問題跟回顧表格
    $('#questionForm').hide()
    $('#reviewForm').hide()
    //問題跟回顧表格按鈕
    $('#btn-review').click(FormStatus)
    $('#btn-question').click(FormStatus)
    //控制購買數量按鈕
    $('#quantityAdd').click(QuantityChange)
    $('#quantityReduce').click(QuantityChange)
    //產品細節切換
    $('#btn-detail').click(DetailSwitch)
    $('#btn-SAndR').click(DetailSwitch)
    //切換產品大圖
    //$( '.thumbnail123' ).click( PicChange123 )
    //產品卡片
    $(".card-figure").hover(function () {
        $(this).find(".btnWL").addClass("showdown")
        $(this).find(".btnQV").addClass("hoverin")
        $(this).find(".btnATC").addClass("hoverin")
    }, function () {
        $(this).find(".btnWL").removeClass("showdown")
        $(this).find(".btnQV").removeClass("hoverin")
        $(this).find(".btnATC").removeClass("hoverin")
    })
    //vue binding
    BindingVue()
    //加入wishlist
    $(".btnWL").click(function (e) {
        e.preventDefault()
        var item = $(this)
        var id = item.parents("figure").attr("id")
        if (id == null) {
            id = @ViewBag.ProductID
        }
        var isRed = item.find("i").attr("style") == null ? false : true
        //if ($(this).find("i").attr("style") == null) {
        //    var isRed = false
        //} else {
        //    var isRed = true
        //}
        if (isRed) {
            $.ajax({
                type: "POST",
                url: "/FrontEnd/DeleteWish",
                data: {
                    MemberID: 0,
                    ProductID: id
                },
                dataType: "text",
                success: function (response) {
                    if (response) {
                        alert('Delete wishlist')
                        item.find("i").removeAttr("style")
                        item.find("span").text("Add to Wish List")
                    }
                }
            })
        } else {
            $.ajax({
                type: "POST",
                url: "/FrontEnd/AddWish",
                data: {
                    MemberID: 0,
                    ProductID: id
                },
                dataType: "text",
                success: function (response) {
                    if (response) {
                        alert('Add to wishlist')
                        item.find("i").attr("style", "color:red")
                        item.find("span").text("Delete Wish List")
                    }
                }
            })
        }
    })
})

function GetBtnId(btn) {
    //取得傳入btn的id
    let btnId = $(btn).attr('id')
    return btnId
}

//增加購買數量
function QuantityChange() {
    let btnId = GetBtnId(this)
    //取得目前顯示數量
    var quant = $('#quantity').val()
    if (btnId == 'quantityReduce' && quant > 1) {
        quant--
    } else if (btnId == 'quantityAdd') {
        quant++
    }
    $('#quantity').val(quant)
}

//產品細節和Q&A切換
function DetailSwitch() {
    let btnId = GetBtnId(this)
    if (btnId == 'btn-detail') {
        $('#detail').show()
        $('#SAndR').hide()
    } else {
        $('#detail').hide()
        $('#SAndR').show()
    }
}

//切換產品大圖
//function picchange123() {
//     console.log("有進來嗎")
//    // 大小圖片的src
//    let smallsrc = $( this ).attr( 'src' )
//    let largesrc = $( '#largepic' ).attr( 'src' )
//    if ( smallsrc != largesrc ) {
//        $( '#largepic' ).attr( 'src', smallsrc )
//    }
//}

//切換問題和回顧表格
//bool 表示現在顯示的是哪種表格
var question = false
var review = false

function FormStatus() {
    let btnId = GetBtnId(this)
    if (btnId == "btn-question" && question == false) {
        question = true
        review = false
    } else if (btnId == "btn-question" && question == true) {
        question = false
    } else if (btnId == "btn-review" && review == false) {
        question = false
        review = true
    } else if (btnId == "btn-review" && review == true) {
        review = false
    }
    FormSwitch(question, review)
}

//切換表格顯示
function FormSwitch(question, review) {
    $('#questionForm').hide()
    $('#reviewForm').hide()
    $('#defaultReview').hide()
    if (question) {
        $('#questionForm').show()
    } else if (review) {
        $('#reviewForm').show()
    } else {
        $('#defaultReview').show()
    }
}

//新增購物車 ajax
function AddCart() {
    let productId = $('#ProductID').val()
    //let memberId = $( '#MemberID' ).val()
    let quantity = $('#quantity').val()

    $.ajax({
        type: "POST",
        //先確認目前的訂單狀況 再接AddCart的action
        url: "/FrontEnd/CheckOrder",
        data: {
            /*MemberID: memberId,*/
            ProductID: productId,
            Quantity: quantity
        },
        dataType: "text",
        success: function (response) {
            alert('成功加入購物車')
        }
    })
}

function BindingVue() {
    picVue = new Vue({
        el: '#ProductPics',
        data: {
            pics: @Html.Raw(ViewBag.ProductUrl)
        },
        methods: {
            PicChange(e) {
                // 大小圖片的src
                let smallSrc = $(e.target).attr('src')
                let largeSrc = $('#LargePic').attr('src')
                if (smallSrc != largeSrc) {
                    $('#LargePic').attr('src', smallSrc)
                }
            }
        }
    })

    let LargePicVue = new Vue({
        el: '#LargePic',
        data: {
            pics: @Html.Raw(ViewBag.ProductUrl)
        }
    })

}