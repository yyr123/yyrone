/**
 * Created by Administrator on 2016/9/26 0026.
 */
//这是选择城市  下拉框
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

//这是选择全部的  诚信房源  什么的
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



login();
//获取登录信息

function login() {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/loginSession.action',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data.success);
            if (data.success) {

                $('.span-1 a').eq(0).html('欢迎  ' + data.data[0].lname).attr('href', 'http://localhost:63342/YR2016/yiju123/html/%E7%AC%AC%E4%B8%89%E9%A1%B5%E9%87%8D%E8%A6%81%E6%A0%BC%E5%B1%80.html');
                $('.left-block h4').eq(0).html(data.data[0].lname);
                $('.span-1 a').eq(1).html('退出').attr({
                    'onclick': 'quitLogin()',
                    'href': '###'

                });
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


            }
        }
    });
}


function Collect(pageNo,price,shi,room,level) {
                 //页码，价钱，几室几厅
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryHousesBySql.action',
        dataType: 'jsonp',
        data: {
            pageNo: pageNo,
            price:price,
            shi:shi,
            room:room,
            level:level
        },
        success: function (data) {
                console.log(level);
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
                         '<div class="z-block-r"><span>删除</span><span>编辑</span>' +
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



//这是搜索房源页面，主要针对的是信息的筛选，以便获取后台的信息

var hh=[];
    hh[4]=1; //这是首页把  页码设置为默认是第I一页

//这里要用绑定事件，要不然获取不到 浏览器里面点击的是  哪个
$('.head-sou p').eq(1).on('click','i',function(){
    //hh[0]=$(this).html();  //后台获取的是  1500-1800，所以‘元’就不要了，然后就是进行筛选，这样写获取的是全部
    hh[0]=$(this).html().slice(0,-1);
    //这是获取价钱
    Collect(hh[4],hh[0],hh[1],hh[2],hh[3]);
    //console.log(hh);

});

$('.head-sou p').eq(2).on('click','i',function(){
    hh[1]=$(this).index()-1;

    //这是获取  二室 三室 四室 五室以上
    Collect(hh[4],hh[0],hh[1],hh[2],hh[3]);
    //console.log(hh);
});


$('select').eq(0).change(function(){
    hh[2]=$(this).val();   //后台是获取的是数字

    //这是获取  下拉框中的  几室几厅
    Collect(hh[4],hh[0],hh[1],hh[2],hh[3]);
    //console.log(hh);

});

$('select').eq(1).change(function(){
    hh[3]=$(this).val();

    //这是获取装修的风格   简装修 精装修

    Collect(hh[4],hh[0],hh[1],hh[2],hh[3]);

    //console.log(hh[3]);


});





