//动态页头加载
$("#header").load("header.html",function(){
    $("#welcome").html("欢迎来到时光网"+sessionStorage['loginName']);
});
$("#footer").load("footer.html");


//#功能模块一:用户登录  14:50--15:00
//1:获取登录表单按钮 id=bt-login
//2:绑定点击事件
$("#bt-login").click(function(){
    console.log(1);
//3:获取用户输入的用户名和密码
    var n = $("#uname").val();
    var p = $("#upwd").val();
    console.log(2+n+p);
    $.ajax({
        type:"POST",
        url:"login",
        data:{uname:n,upwd:p},
        error:function(data){ //404 500
            console.log(4);    //json格式不正确
        },
        success:function(data){
            console.log(3+data);
            //5:判断登录成功 隐藏模态框    class="modal"
            //6:判断登录失败 获取出错信息
            if(data.code<0){
                //登录失败
                $("p.alert").html(data.msg);
            }else{//15:35---15:45
                //1:隐藏登录框 a:产品表 b:productlist.php

                $(".modal").hide();
                //2:保存用户名和用户id
                //创建全局变量保存用户名和用户编号
                sessionStorage['loginName']=n;
                sessionStorage['loginUid']=data.uid;
                //console.log(5+n+data.uid);
            }
        }
    });
});
var loginUid = 0;
var loginUname = 0;



$(function(){
    show(1);
});
page();
//点击页码，自动生成对应的10个产品列表
$("ol.pager").on('click','li a',function(e){
    //2:阻止事件默认行为
    e.preventDefault();
    //3:获取当前页->页码
    var pno = $(this).html();
    //4:发起异步请求，获取当前页产品列表,
    //  并且更新分页条 1 2 3 4 5
    show(pno);
    $(this).parent().addClass("active").siblings().removeClass("active");
});

function show(pno) {
    $.ajax({
        type: "POST",
        data: {pno:pno},
        url: "/product",
        success: function (data) {
            //3:获取返回数据
            var html = "";
            //4:创建空字符串拼接
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                html += `
                    <li>
                        <a href=""><img src="${obj.pic}" alt=""/></a>
                        <p>￥${obj.price}</p>
                        <h1><a href="">${obj.pname}</a></h1>
                        <div>
                            <a href="" class="contrast"><i></i>对比</a>
                            <a href="" class="p-operate"><i></i>关注</a>
                            <a href="${obj.pid}" class="addcart"><i></i>加入购物车</a>
                        </div>
                    </li>
                `;
            }
            $("#plist ul").html(html);
        }
    });
}

//动态获取页码数
function page(){
    $.ajax({
        type: "GET",
        url: "/productpage",
        success: function (data) {   //服务器返回的数据data:page:5
            var html="";
            var count=Math.ceil(data.length/8);
            for(var i=1;i<=count;i++){
                html += `
                   <li><a href="#">${i}</a></li>
                `;
            }
            $("#plist ol.pager").html(html);
            $("#plist ol.pager").children().first().addClass("active");
        }
    });
}


//为每个商品添加添加购物车的请求
var uid =sessionStorage.getItem('loginUid');
$("#plist").on("click","a.addcart",function(e){
    e.preventDefault();
    var pid=$(this).attr("href");
    var u=uid;
    //$.ajax({
    //    type:"POST",
    //    url:"/addcart",
    //    data:{pid:pid,uid:u},
    //    success:function(data){
    //        alert("添加成功,该商品己购买:"+data[0].pcount);
    //        cartShow();
    //    },
    //    error:function(){
    //        alert("添加商品失败,请检查网络");
    //    }
    //});
    $.ajax({
        type: "POST",
        url: "/addcart",
        data: {pid: pid, uid: u},
        success: function (data) {
            if (data.code < 0) {
                alert("添加失败,原因" + data.msg);
            } else {
                alert("添加成功,该商品己购买:" + data[0].pcount);
                //cartShow();
            }
        },
        error: function (data) {
            alert("添加商品失败,请检查网络");
        }
    });
});

//为"去购物车结算"绑定事件
//1:获取按钮
$("#header").on('click',"#headcartbox",function(){
    location.href = "shoppingcart.html";
});
