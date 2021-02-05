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


// 浏览器通知框
$('#notifyBtn').click(function(e){
	// 创建一个简单的文字通知：
	chrome.notifications.create(null, {
		type: 'basic',   // basic   image   list  progress
		iconUrl: '../img/icon.png',
		title: '插件通知',
		message: '这是一个插件通知弹框！'
	});
	
	chrome.extension.getBackgroundPage().consoleA();
})