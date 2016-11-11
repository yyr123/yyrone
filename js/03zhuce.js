/**
 * Created by Administrator on 2016/10/11 0011.
 */

var off = {};
for (var i = 0; i < $('.dv input').length; i++) {
    $('.dv input').eq(i).addClass('input_' + i)
}

$('.dv input').eq(0).focus(function () {


    var one = $('p').eq(0);
    one.css('display', 'block')
});
$('.dv input').eq(0).blur(function () {
    var one = $('p').eq(0);
    var two = $('.dv').eq(0);
    var re = /[^\w\u4e00-\u9fa5]/g;
    if (re.test(this.value)) {
        one.html('含有非法字符');
        two.css('border', '1px solid red');
        off[this.className] = false;
    } else if (this.value == "") {
        one.html('不能为空');
        two.css('border', '1px solid red');
        off[this.className] = false;
    }
    else if (this.value.length > 20) {
        one.html('超过20个字符');
        two.css('border', '1px solid red');
        off[this.className] = false;
    }
    else if (this.value.length < 4) {
        one.html('少于4个字符');
        two.css('border', '1px solid red');
        off[this.className] = false;
    }
    else {
        one.html('ok!');
        two.css('border', '1px solid #70ad46');
        off[this.className] = true;

    }
});


$('.dv input').eq(1).focus(function () {

    var p1 = $('p').eq(1);
    p1.css('display', 'block')
});
$('.dv input').eq(1).blur(function () {
    var p1 = $('p').eq(1);
    var dv1 = $('.dv').eq(1);
    var mm = /[\w]{4,16}/;
    if (mm.test(this.value)) {
        p1.html('ok!');
        dv1.css('border', '1px solid #70ad46');
        off[this.className] = true;
    }
    else if (this.value == "") {
        p1.html('不能为空');
        dv1.css('border', '1px solid red');
        off[this.className] = false;
    }
    else if (this.value.length < 4) {
        p1.html('少于4个字符');
        dv1.css('border', '1px solid red');
        off[this.className] = false;
    }
    else if (this.value.length > 16) {
        p1.html('超过16个字符');
        dv1.css('border', '1px solid red');
        off[this.className] = false;
    }
    $('p').eq(2).css('display', 'block');
});


$('.dv input').eq(2).blur(function () {
    var p2 = $('p').eq(2);
    var dv2 = $('.dv').eq(2);
    if ($('input').eq(2).val() !== $('input').eq(1).val()) {
        p2.html('两次输入密码不一致');
        dv2.css('border', '1px solid red');
        off[this.className] = false;
    }
    else if ($('input').eq(2).val() == "") {
        p2.html('不能为空');
        dv2.css('border', '1px solid red');
        off[this.className] = false;
    }

    else {
        p2.html('ok!');
        dv2.css('border', '1px solid #70ad46');
        off[this.className] = true;
    }
});


$('.dv input').eq(3).focus(function () {

    var p3 = $('p').eq(3);
    p3.css('display', 'block')
}),

    $('.dv input').eq(3).blur(function () {
        var p3 = $('p').eq(3);
        var dv3 = $('.dv').eq(3);
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test($('.dv input').eq(3).val())) {
            p3.html('ok!');
            dv3.css('border', '1px solid #70ad46');
            off[this.className] = true;

        }
        else if ($('input').eq(3).val() == "") {
            p3.html('不能为空');
            dv3.css('border', '1px solid red');
            off[this.className] = false;
        }

        else {
            p3.html('请输入正确的邮箱地址');
            dv3.css('border', '1px solid red');
            off[this.className] = false;
        }
    });


$('.dv input').eq(4).focus(function () {

    var p4 = $('p').eq(4);
    p4.css('display', 'block')
}),
    $('.dv input').eq(4).blur(function () {
        var p4 = $('p').eq(4);
        var dv4 = $('.dv').eq(4);
        var phon = /^1[0-9]{10}$/;
        if (phon.test($('.dv input').eq(4).val())) {
            p4.html('ok!');
            dv4.css('border', '1px solid #70ad46');
            off[this.className] = true;

        }
        else if ($('input').eq(4).val() == "") {
            p4.html('不能为空');
            dv4.css('border', '1px solid red');
            off[this.className] = false;
        }

        else {
            p4.html('请输入正确的手机号');
            dv4.css('border', '1px solid red');
            off[this.className] = false;
        }
    });


$('form .button').click(function () {

    //console.log(off);
    var fm = true;
    var arr = [];
    //alert($('.xieyi input').get(0).checked) 先判断选中状态是否为true  或者false

    if ($('.xieyi input').get(0).checked) {
        fm = true;
    } else {
        fm = false;
    }

    for (var i in off) {
        if (!off[i]) {
            fm = false;
        }
    }


    for (var i = 0; i < $('.dv input').length; i++) {
        arr.push($('.dv input').eq(i).val());
    }


    for (var i in arr) {
        if (arr[i] == "") {
            fm = false;

            $('.dv input').eq(i).blur();
        }
        $('.dv input').eq(i).focus().blur();
    }

    if (fm) {
        console.log($('form').serialize());
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                //alert('注册成功');
                console.log(data);
                if (data.resultCode == '0000') {
                    $('#dialog').css('display','block');
                    //location.href = "http://localhost:63342/YR2016/yiju123/html/%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2.html";
                }
            }
        })
    }
    else {
        alert('注册失败')
    }
});

$('#ca').click(function(){
    $('#dialog').css('display','none');

});












//注意：：：原生js用 this value.  但是jq  中要用  $ 符和 val()  ；







