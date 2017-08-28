//功能模块1：监听登录按钮
//1:获取登录按钮
//2:绑定点击事件
$("#btn2").click(function(){
	var u=$("#uname").val();
	var p=$("#upwd").val();
	//验证用户名和密码
	var reguname =/^[a-z0-9]{3,12}$/i;
	var regupwd =/^[a-z0-9]{3,8}$/i;
	//判断
	if(!reguname.test(u)){
		alert("用户名格式不正确");
		return;
	}
	if(!regupwd.test(p)){
		alert("密码格式不正确");
		return;
	}
	//发送AJAX请求
	$.ajax({
		type:"POST",
		url:"login",
		data:{uname:u,upwd:p},
		success:function(data){
			//判断
			if(data.code===1){
				alert("登录成功!3s后跳转到网站首页");
				//将用户uid/uname1保存 session会话
				sessionStorage['loginName']=u;
				sessionStorage['loginUid']=data.uid;
				location.href="zhuye.html";
			}else{
				alert("登录失败"+data.msg);
			}

		}
	});
});

