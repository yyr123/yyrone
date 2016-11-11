/**
 * Created by Administrator on 2016/9/26 0026.
 */

$(".daojiao").click(function(){
    $("#uul").show();

});
$(".co1").click(function(){
    $("#uul").show();

});

$('#uul li').click(function(){
    for(var i=0;i<$('#uul li').length;i++){
        $(".co1").html($(this).html());
        $("#uul").hide();
}
});

$('#uul').mouseleave(function(){
    $("#uul").hide();

});

//以上是下拉框，选择地区




var Span=$(".hangbiao span");

Span.click(function(){
    for(var i=0; i<Span.length;i++ ){
        Span.eq(i).removeAttr('style');
        $('#bjxuan li').eq(i).css({display:"none"});
    }
    //alert($(this).index())
   $('#bjxuan li').eq($(this).index()).removeAttr('style');
    $(this).css({color:"#333333",backgroundColor:"#cccccc"})

});
//以上是设置横着的导航条，来回切换



var pp=$(".block-p2");

pp.click(function(){
    for(var i=0; i<pp.length;i++ ){
       pp.eq(i).removeAttr('style');
        //移除原来的样式，
    }
    $(this).css({color:"#ffffff",backgroundColor:"#75a749"});
       //增加新的 style样式
        });

 //以上是点击我是昵称下面的选项进行的样式变化

$('.left-block').on('click','.block-p2',function(){
    console.log(($(this).index() - 2));

     for(var i=0; i<$("#ulul>li").length;i++){
               $("#ulul>li").eq(i).css({display:'none'});
              //这是首先把所有的  css样式都设置成  不可见的，
         }



          $("#ulul>li").eq($(this).index()-2).removeAttr('style');

        //这是点击当前的标题时，然后移除原来的所有style  样式，就变成可见了。
});


     //以上是跟着左边的导航条改变，同时内容也跟着改变


var pp2=$(".right-block-p2");

pp2.click(function(){
    pp2.removeAttr('style');
    $(this).css({color:"#ffffff",backgroundColor:"#75a749"})

});



var Span1=$(".right-block-p3 span");

Span1.click(function(){
    for(var i=0; i<Span1.length;i++ ){
        Span1.eq(i).removeAttr('style')
    }

    $(this).css({color:"#ffffff",backgroundColor:"#75a749"})

});



var Span2=$(".ul-1-p");

Span2.click(function(){
    for(var i=0; i<Span2.length;i++ ){
        Span2.eq(i).removeAttr('style')
    }
    $(this).css({color:"#ffffff",backgroundColor:"#75a749"})

});




login();
//获取登录信息
var pass;
function login() {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/loginSession.action',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data.success);
            if (data.success) {
                pass=data.data[0].lpassword;
                $('.span-1 a').eq(0).html('欢迎  ' + data.data[0].lname).attr('href', 'http://localhost:63342/YR2016/yiju123/html/%E7%AC%AC%E4%B8%89%E9%A1%B5%E9%87%8D%E8%A6%81%E6%A0%BC%E5%B1%80.html');
                $('.left-block h4').eq(0).html(data.data[0].lname);
                $('.span-1 a').eq(1).html('退出').attr({
                    'onclick': 'quitLogin()',
                    'href': '###'

                });
                $('.left-block-p img').attr({src: "http://www.zhijunxing.com/yiju/upload/" + data.data[0].lphoto});
//这是获取图片登陆后自动显示个人昵称图片

            }
        }
    });
}



//以下是改变头像图片

$('#tutu').on('change', '#uploadPhoto', function  () {

    if (typeof FileReader == 'undefined') {
        alert("检测到您的浏览器不支持FileReader对象！");
    }
     var reader= new FileReader();
     var   val=this.files[0];

    reader.readAsDataURL(val);
    reader.onload=function(){
        $('.right-block-img').attr('src',reader.result);
    }
});


$('#cuntu').click(function () {
    if(!($('.right-block-img').attr('src')==="../img/ren2.png")){

        $.ajaxFileUpload({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
            secureuri: false,
            fileElementId:'uploadPhoto',
            async: true,
            cache: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            success: function(data){
                console.log(data);

            }
        })
    }


    setTimeout(function () {
        location.href = 'http://localhost:63342/YR2016/yiju123/html/%E7%AC%AC%E4%B8%89%E9%A1%B5%E9%87%8D%E8%A6%81%E6%A0%BC%E5%B1%80.html';
     }, 1000);//一秒后在从新获取一次登录信息   页面会自动转为更新后的头像

     });



//这是设置昵称

$('.SetNickname input').on({
    focus: function () {
        $(this).css({
            'border-color': 'red'
        });
    },
    blur:function(){

       var val=$(this).val();      //这是检测  输入框内的  内容，然后后台直接获取。
        if(/[\w]{6,20}$/.test(val)){

            $('#baoming').click(function(){

                $.ajax({
                    type: 'post',
                    url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                    dataType: 'jsonp',
                    data: {
                        lname: val
                    },
                    success: function (data) {
                        //console.log(data);
                        if (data.resultCode == '0000') {
                            login();
                            $('.SetNickname input').css({ 'border-color': 'rgb(117, 167, 73)'});


                        }
                       }
                    })
                   })

                 }
               }
            });


//这是第三页重要格局的页码设置
$('#co').click(function (){
    var pageNo = 1;
    Collect(pageNo);
    $('#collect_page').on('click', 'a', function () {
        // console.log($('.page-box a').last().prev().html());
        if ($(this).html() == '上一页') {
            if (!(pageNo == 1)) {
                pageNo -= 1;
                Collect(pageNo);
            }
        } else if ($(this).html() == '下一页') {
            if (!(pageNo == $('.right-block-ul a').last().prev().html())) {
                pageNo += 1;
                Collect(pageNo);
            }
        } else {
            pageNo = parseInt($(this).html());
            Collect(pageNo);
        }
    });
}).click();
function Collect(pageNo) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryCollectHouses.action',
        dataType: 'jsonp',
        data: {
            pageNo: pageNo
        },
        success: function (data) {
//                console.log(data);
            if (data.success) {
                var a;

                if (Math.ceil(data.rowCount / 2) <= 5  ) {

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= Math.ceil(data.rowCount / 2); i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (pageNo <= 3  ) {

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<b> ··· </b><a href="###">' + Math.ceil(data.rowCount / 2) + '</a><a href="###">下一页</a>';

                } else if (pageNo + 2 >= Math.ceil(data.rowCount / 2)) {

                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>';

                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 2) - i == pageNo) {
                            a += '<a href="###" class="page-checked">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        } else {
                            a += '<a href="###">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (pageNo + 2 < Math.ceil(data.rowCount / 2)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + (parseInt(pageNo) - 1) + '</a>' +
                        '<a href="###" class="page-checked">' + pageNo + '</a>' +
                        '<a href="###">' + (parseInt(pageNo) + 1) + '</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + Math.ceil(data.rowCount / 2) + '</a>' +
                        '<a href="###">下一页</a>';
                }
                $('#collect_page').html(a);

                var item = '';
                for (var i=0 ;i<data.data.length;i++) {
                    item +='<div class="z-block f-clear " id="'+data.data[i].id+'">'+
                        '<img src="http://www.zhijunxing.com/yiju/upload/'+data.data[i].photo.split(',')[0] +'" alt="">'+
                         '<div class="z-block-r"><span id="dl">删除</span><span>编辑</span>' +
                        '<p class="z-p"><strong>'+data.data[i].price+'</strong>/月</p>'+
                        '<p class="z-p1">'+data.data[i].addtime+'</p>'+'</div>'+
                        '<div class="z-block-zo">'+
                        '<h1>'+data.data[i].tittle+'  '+data.data[i].room+'</h1>'+
                        '<p>'+data.data[i].room+''+data.data[i].countfloor+'</p>'+
                        '<p class="z-block-p1">'+data.data[i].address+'</p>'+
                        '<a href="" class="a1">精装修</a>'+
                        '<a href="" class="a2">地铁口</a>'+
                        '</div>'+
                        '</div>'
                }
                $('#collect').html(item);
            } else {

                alert('您没有收藏房源！');
            }
        }
    })
}

//删除收藏
$('#collect').on('click','#dl',function(){
    alert(44)
});


//这是设置密码
$('.changepsw input').focus(function(){

   $(this).css('border-color','green')


});
$('.changepsw input').eq(0).blur(function(){
    var val=$(this).val();
    if(!(val==pass)) {
        $(this).css('border-color','red')
    }
});

$('.changepsw input').eq(1).blur(function(){
    var val=$(this).val();
    if(!(/^[a-zA-Z0-9][\w]{5,19}/.test(val))) {
        $(this).css('border-color','red')
    }
});
$('.changepsw input').eq(2).blur(function(){
    var val=$(this).val();
    if(!(val=""?false:val==$('.changepsw input').eq(1).val())) {
        $(this).css('border-color','red')
    }
});
$('#baomi').click(function(){
    if(
        $('.changepsw input').eq(0).val()==pass&&
        /^[a-zA-Z0-9][\w]{5,19}/.test($('.changepsw input').eq(1).val())&&
        $('.changepsw input').eq(2).val()===$('.changepsw input').eq(1).val()

    ){
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
            dataType: 'jsonp',
            data: {
                lpassword: $('.changepsw input').eq(2).val()   //这是向后台传输   新的密码
            },
            success: function (data) {
                console.log(data);
                if (data.resultCode == '0000') {
                    $('.dialog').eq(0).show();   //  这是让弹出  确认密码修改成功弹出窗

                }
            }
        });
    }
});


//这是  退出页面，返回到首页
function quitLogin(){

    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
//                console.log(data);
            if(data.resultCode=='0000'){

                $('.span-1 a').eq(0).html('登录').attr('href','http://localhost:63342/YR2016/yiju123/html/%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2.html');
                $('.span-1 a').eq(1).html('注册').attr('href','http://localhost:63342/YR2016/yiju123/html/%E6%B3%A8%E5%86%8C%E9%A1%B5%E9%9D%A2.html').removeAttr('onclick');
            }

        }
    });

}

//这是  点击搜房源  跳转到搜索房源的页面
$('.anniu').click(function(){
   window.open("http://localhost:63342/YR2016/yiju123/html/%E6%90%9C%E7%B4%A2%E6%88%BF%E6%BA%901.html")

});


//这是发布房源页面
$('#release').click(function(){
    $('.supernatant').hide();    //这是 点击继续发布

});
$('#ca').click(function(){
    $('.supernatant').hide();  //这是点击  ×  ，把弹出窗隐藏起来。

});

$('.ul-div1 li').click(function(){
      $('.ul-div1 li').eq($(this).index()).css('border','1px solid #75a749');
      $('.ul-div1 li i').eq($(this).index()).show();
});
$('.ul-div1 li').dblclick(function(){
    $('.ul-div1 li').eq($(this).index()).removeAttr('style');
       $('.ul-div1 li i').eq($(this).index()).hide();
});



//提交表单，后台接受的是对象形式，里面的必须以键值对的形式，所以要首先对表单进行  序列化，得到一段没有间隔的字符串，
// 然后进行键值对  排列，要用split  分隔符分开，得到一组新的数组，然后再进行这个数组的分析，最后转化为对象形式。


var ff={furniture:''};

$('#issue').click(function(){
    var ll=$('form').serialize();
    console.log(ll);

    var uu=ll.split('&');
    //直接在&符处进行分割，然后就是返回的是 ，  符。
    console.log(uu);

    var tt=[];
    for(var i=0;i<uu.length;i++){
       tt.push(uu[i].split('='));     //注意这里要选对  刚组成的新的数组，接下来进行：的拼接,push只能用于数组加数据。
    }
    console.log(tt) ;

   for(var i=0;i<tt.length;i++){

      ff[ tt[i][0] ]=decodeURI(tt[i][1]);  //这是进行  ：的连接
   }


    //这是对家具一项进行选择的事件，以便向后台传输数据

    var kk=[];
    for(var i=0;i<$('.ul-div1 li[style]').length;i++){

      kk.push($('.ul-div1 li[style]').eq(i).text())

    }
  //  console.log(kk) ;
    var dd=kk.join(",");
    ff.furniture=dd;

    console.log(ff) ;


    $.ajax({
        type: 'get',
        url: 'http://www.zhijunxing.com/yiju/addHouses.action',
        dataType: 'jsonp',
        data:ff,
        success: function (data) {
           if(data.resultCode=='0000'){
               $('.supernatant').show();
            }

        }

    })
});

$('#chu').click(function(){

    $('.chun').show()

});


//这是  个人中心页面
$('.z-block span').click(function(){      //这是点击  删除  出现的确认框
    $('.dialog').eq(1).show();

});

$('.dialog button').click(function(){
    for(var i=0;i<$('.dialog button').length;i++){
          $('.dialog').eq(i).hide();  //这是确认和取消按钮

      }

  });

$('.ca').click(function(){
    for(var i=0;i<$('.ca').length;i++){
        $('.dialog').eq(i).hide();
    }

    });          //这是点击  x  然后弹出窗消失






