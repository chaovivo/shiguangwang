//动态页头加载
$("#header").load("header.html");
$("#foot").load("footer.html");

var uid =sessionStorage.getItem('loginUid');
//1:页面加载事件  生成购物车
$.ajax({
    type:"POST",
    url:"/shoppingcart",
    data:{uid:uid},
    success:function(data){
        console.log(data);
        var html="";
        for(var i=0;i<data.length;i++){
            var obj=data[i];
            html+=`
        <tr>
          <td>
          <input type="checkbox"/>
          <input type="hidden" value="1" />
          <div><img src="${obj.pic}" alt=""/></div>
          </td>
          <td><a href="">${obj.pname}</a></td>
          <td>${obj.price}</td>
          <td>
          <button class="${obj.cid}">-</button>
          <input type="text" value="${obj.pcount}"/>
          <button class="${obj.cid}">+</button>
          </td>
          <td><span>${obj.price*obj.pcount}</span></td>
          <td><a href="${obj.cid}" class='btn-del'>删除</a></td>
          </tr>`;
        }
        //保存
        $("#cart tbody").html(html);

    }
});

    //为删除按钮绑定事件监听
    //       实现购物车项目删除
    //1:获取删除按钮
    $("#cart tbody").on("click","a.btn-del", function(e) {
        e.preventDefault();
        //4:获取当前购物项id
        var cid = $(this).attr("href");
        var self = this;
        $.ajax({
            type:"GET",
            url: "/cartlistdel",
            data: {cid: cid},
            success: function (data) {
                if (data.code===1) {
                    alert("删除成功");
                    // a     td       tr
                    $(self).parent().parent().remove();
                } else {
                    alert("删除失败" + data.msg);
                }
            }
        });
        //7:将当前购物项编号 cid
        //8:如果删除成功  将当前元素a td tr 删除
    });
















