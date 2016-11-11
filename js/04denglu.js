/**
 * Created by Administrator on 2016/10/11 0011.
 */

var off={};
for(var i=0;i<$('.dv input').length;i++){
    $('.dv input').eq(i).addClass('input_'+i)
}

$('.dv input').eq(0).focus(function(){


    var one= $('p').eq(0);
    one.css('display','block')
});
$('.dv input').eq(0).blur(function(){
    var one= $('p').eq(0);
    var two= $('.dv').eq(0);
    var re=/[^\w\u4e00-\u9fa5]/g;
    if(re.test(this.value)){
        one.html('含有非法字符');
        two.css('border','1px solid red');
        off[this.className]=false;
    }else if(this.value==""){
        one.html('不能为空');
        two.css('border','1px solid red');
        off[this.className]=false;
    }
    else if(this.value.length>20){
        one.html('超过20个字符');
        two.css('border','1px solid red');
        off[this.className]=false;
    }
    else if(this.value.length<4){
        one.html('少于4个字符');
        two.css('border','1px solid red');
        off[this.className]=false;
    }
    else {
        one.html('ok!');
        two.css('border','1px solid #70ad46');
        off[this.className]=true;

    }
});



$('.dv input').eq(1).focus(function(){

    var p1= $('p').eq(1);
    p1.css('display','block')
});
$('.dv input').eq(1). blur(function(){
    var p1= $('p').eq(1);
    var dv1= $('.dv').eq(1);
    var mm=/[\w]{4,16}/;
    if(mm.test(this.value)){
        p1.html('ok!');
        dv1.css('border','1px solid #70ad46');
        off[this.className]=true;
    }
    else if(this.value==""){
        p1.html('不能为空');
        dv1.css('border','1px solid red');
        off[this.className]=false;
    }
    else if(this.value.length<4){
        p1.html('少于4个字符');
        dv1.css('border','1px solid red');
        off[this.className]=false;
    }
    else if(this.value.length>16){
        p1.html('超过16个字符');
        dv1.css('border','1px solid red');
        off[this.className]=false;
    }
    $('p').eq(2).css('display','block');
});

$('form .button').click(function() {

    //console.log(off);
    var fm = true;
    var arr=[];
    //alert($('.xieyi input').get(0).checked) 先判断选中状态是否为true  或者false

    if($('.xieyi input').get(0).checked){
        fm=true;
    } else{
        fm = false; }

    for (var i in off) {
        if (!off[i]) {
            fm = false; }
    }


    for(var i=0; i<$('.dv input').length;i++){
        arr.push($('.dv input').eq(i).val());
    }


    for (var i in arr) {
        if (arr[i]=="") {
            fm = false;

            $('.dv input').eq(i).blur();
        }
        $('.dv input').eq(i).focus().blur();
    }


    if (fm) {
        console.log($('form').serialize());
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/landlordLogin.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                //console.log(data);
                if (data.resultCode == '0000') {
                    //alert('成功')
                    location.href = 'http://localhost:63342/YR2016/yiju123/html/%E6%98%93%E5%B1%85.html'

                } else {
                    alert('失败')
                }
            }
        })
    }
});

//注意：：：原生js用 this value.  但是jq  中要用  $ 符和 val()  ；







