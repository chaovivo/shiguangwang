/**
 * Created by Administrator on 2017/5/14.
 */
if(window.$===undefined){
    throw new Error("jquery未加载");
}

jQuery.fn.carousel=function(){
    var interval=1500;
    var $imgList=$("#slider").children("img");
    var $liList=$("#page").find("li");
    //显示下标
    var index=0;
    function lunHuan(){

        index++;
        //5.2:判断index>4
        (index>4)&&(index=0);
        //5.3:添加class active
        //清除class activeɾ��
        $imgList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        $liList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
    }

    var timer=setInterval(function(){
        lunHuan();
    },interval);
    $liList.click(function() {
        clearTimeout(timer);
        index = parseInt($(this).html());
        $imgList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        $liList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        timer=setInterval(function(){
            lunHuan();
        },interval);
    });

    $("#slider>a.lastpic").click(function(e){
        e.preventDefault();
        clearTimeout(timer);
        index--;
        (index<0)&&(index=4);
        $imgList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        $liList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        timer=setInterval(function(){
            lunHuan();
        },interval);
    });
    $("#slider>a.nextpic").click(function(e){
        e.preventDefault();
        clearTimeout(timer);
        index++;
        (index>4)&&(index=0);
        $imgList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        $liList.eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
        timer=setInterval(function(){
            lunHuan();
        },interval);
    })
}









/**********宣传片左右切换部分************/
//$(function(){
//    $("#shangying .cinemar li").click(function(){
//        //切换选中的按钮高亮状态
//        $(this).addClass("rexiao").siblings().removeClass("rexiao");
//        //获取被按下按钮的索引值，需要注意index是从0开始的
//        var index=$(this).index();
//        //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
//        $("[id^='left-']").eq(index).show().siblings().hide();
//    });
//});

var li=document.querySelectorAll(".cinemar li");
var div=document.querySelectorAll("[id^='left']");
for(var i=0;i<li.length;i++){
    (function(i){
        li[i].onclick=function(){
            for(var j=0;j<li.length;j++){
                li[j].className=" ";
                div[j].className="";
            }
            this.className="rexiao";
            div[i].className="active";
        }
    })(i)
}


//获取点击元素
var btn=document.querySelector(".btn");
var mainvideo=document.querySelector(".mainvideo");
//绑定鼠标移入移出事件
mainvideo.onmouseenter=function(){
    btn.style.display='block';
}
mainvideo.onmouseleave=function(){
    btn.style.display='none';
}
//绑定按钮点击事件
btn.onclick=function(e){
    e.preventDefault();
    //判断当前视频元素是否处理暂停状态
    if(v2.paused){
        v2.play();
        btn.src="video/pause.png";
    }else{
        v2.pause();
        btn.src="video/play.png"
    }
}
var ad=document.querySelector(".ad");
v2.onplay=function(){
    ad.style.display="none";
}
v2.onpause=function(){
    ad.style.display="block";
}
















