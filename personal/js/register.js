//功能模块：监听登录按钮
//1:获取注册按钮
//2:绑定点击事件
$("#btn1").click(function(){
    var u=$("#uname").val();
    var p=$("#upwd").val();
    //2:验证用户名
    if(u==""){alert("用户名不能为空");return;}
    if(p==""){alert("请使用3-15位字母或数字的密码");return;}
    //5:发送AJAX一个请求 /register
    $.ajax({
        type:"POST",
        url:"register",
        data:{uname:u,upwd:p},
        success:function(data){
            //判断
            if(data.code===1){
                alert("注册成功，欢迎关注时光网,3秒后跳转登录页面...");
                setTimeout(function(){
                    location.href="login.html";
                },3000);
            }else{
                alert("注册失败");
            }
        }
    });
});
//创建变量
var from=document.forms[0],
    txtPwd=from.upwd,
    txtPhone=from.phones,
    checkbox=$('#check')[0],
    $code=$('#aa')[0],
    $reg=$('.dd'),
    p=[],t=0;
    //验证码
var pool=function(){
    var cw = 80;   //画布的总宽度
    var ch = 30;   //画布的总高度
    p=[];
    //修改画布的宽度和高度
    c9.width = cw;
    c9.height = ch;
    var ctx = c9.getContext('2d');
    /**1.绘制背景颜色——填充矩形**/
    ctx.fillStyle = rc(100, 255);
    ctx.fillRect(0, 0, cw, ch);
    /**2.循环绘制4个随机字符**/
    ctx.textBaseline = 'top';
    var pol = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    for (var i = 0; i < 4; i++) {
        var c = pol[rn(0, pol.length)];//一个随机字符
        var fs = rn(20, 30); //字体大小
        ctx.font = fs + 'px  SimHei';
        var fc = rc(50, 150); //字体颜色
        ctx.strokeStyle = fc;
        var deg = rn(-15, 35);//旋转角度
        var x = -fs / 2;      //每个字符左上角的坐标
        var y = -fs / 2;
        //绘制一个字符: 保存状态->平移->旋转->绘制->恢复状态
        ctx.save();
        ctx.translate(20*i+15, 15);
        ctx.rotate(deg*Math.PI/180);
        ctx.strokeText(c, x, y);
        ctx.restore();
        p.push(c);

    }
    /**3.绘制5条干扰线——直线路径**/
    for(var i=0; i<5; i++){
        ctx.beginPath();
        ctx.moveTo(rn(0,cw), rn(0, ch));
        ctx.lineTo(rn(0,cw), rn(0, ch));
        ctx.strokeStyle = rc(0, 255);
        ctx.stroke();
    }
//random number，返回指定范围内的随机整数
    function rn(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
//random color，返回指定范围内的随机颜色
    function rc(min, max) {
        var r = rn(min, max);
        var g = rn(min, max);
        var b = rn(min, max);
        return `rgb(${r}, ${g}, ${b})`;
    }
    return p;
};
//调用一次验证码
pool();
//点击刷新验证码
$reg.on('click',function(){
    pool();
});