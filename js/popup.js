document.getElementById('btn').onclick = function(e){
	document.getElementById('name').innerHTML = document.getElementById('nameInput').value
}

$.ajax({
	url: 'https://www.aireadall.com/test',
	type:'get',
	success:function(res){
		console.log(res)
	},
	error:function(err){
		console.log(err)
	}
})

// 创建一个简单的文字通知：
var notification = webkitNotifications.createNotification(
  '48.png',  // icon url - can be relative
  'Hello!',  // notification title
  'Lorem ipsum...'  // notification body text
);

// // 或者创建一个 HTML 通知：
// var notification = webkitNotifications.createHTMLNotification(
//   '../html/notification.html'  // html url - can be relative
// );

// 显示通知
$('#notifyBtn').click(function(e){
	notification.show();
})