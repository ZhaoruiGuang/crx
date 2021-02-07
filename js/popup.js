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


// 和 background 交互, 调用插件 background.js 里的方法
// chrome.extension.getBackgroundPage().consoleA();
let bgFuncNum = chrome.extension.getBackgroundPage().consoleA();
console.log(bgFuncNum);

// 浏览器通知框
let progressNum = 0;
$('#notifyBtn').click(function(e){
	// 创建一个简单的文字通知：
	let notify = chrome.notifications.create(null, {
		// type,iconUrl,title,message 四个是必须的参数
		
		// type: 'basic',   // basic   image   list  progress
		// iconUrl: '../img/icon.png',
		// title: '插件通知',
		// message: '这是一个 basic 插件通知弹框！',
		// requireInteraction: true,  // 这样消息窗口就不会几秒后自动关闭了,会在底部显示一个 关闭 按钮,等人主动关闭
		// silent:false,  // 指示在显示通知时不应发出声音或振动, 默认为 false
		// isClickable:true,   // 是否响应点击事件
		// buttons:[
		// 	{			// 消息窗里的自定义按钮
		// 		title:'btn1',
		// 		iconUrl: '../img/icon.png',
		// 	},
		// 	{			// 消息窗里的自定义按钮
		// 		title:'btn2',
		// 	},
		// ],
		
		// type: 'image',   // basic   image   list  progress
		// iconUrl: '../img/icon.png',
		// title: '插件通知',
		// message: '这是一个 image 插件通知弹框！',
		// imageUrl: '../img/icon.png',
		
		// type: 'list',   // basic   image   list  progress
		// iconUrl: '../img/icon.png',
		// title: '插件通知',
		// message: '这是一个 list 插件通知弹框！',
		// // items 每一项只能包含 title 和 message ,不能添加 icons
		// items:[
		// 	{
		// 		title: 'item1',
		// 		message: '这是一个 list 通知 item1！'
		// 	},
		// 	{
		// 		title: 'item2',
		// 		message: '这是一个 list 通知 item2！'
		// 	},
		// 	{
		// 		title: 'item3',
		// 		message: '这是一个 list 通知 item3！'
		// 	}
		// ]
		
		type: 'progress',   // basic   image   list  progress
		iconUrl: '../img/icon.png',
		title: '插件通知',
		message: '这是一个 progress 插件通知弹框！',
		progress:0,
		requireInteraction: true,  // 这样消息窗口就不会几秒后自动关闭了,会在底部显示一个 关闭 按钮,等人主动关闭
		
		
	},function(){
		
		// progress 貌似不能多次更新,因为经尝试,setInterval 和 两个 setTimeout 的场景下,实际都只执行了一次 updata 
		// setTimeout(()=>{
		// 	chrome.notifications.update('123456789abcdef',{
		// 		progress:50,
		// 	},function(wasUpdated) {
		// 		console.log(wasUpdated)
		// 	});
		// },3000);
		
		// setTimeout(()=>{
		// 	chrome.notifications.update('123456789abcdef',{
		// 		progress:70,
		// 	},function(wasUpdated) {
		// 		console.log(wasUpdated)
		// 	});
		// },5000);
		
	});

	// 获取当前所有通知
	chrome.notifications.getAll(function(notifications) {
		console.log(notifications)
	})
	
	// 通知窗里的事件
	// 参数文档: https://developer.chrome.com/docs/extensions/reference/notifications/#type-NotificationOptions
	chrome.notifications.onClicked.addListener(function(notificationId){
		chrome.tabs.create({url: 'https://www.baidu.com/'});   // 打开新页面:chrome.tabs.create
	});
	chrome.notifications.onButtonClicked.addListener(function(notificationId,buttonIndex){
		console.log('btnClick: ' + buttonIndex)
	});
	chrome.notifications.onClosed.addListener(function(notificationId,isClosedByUser){
		console.log('isClosedByUser :' + isClosedByUser)
	});

})

// storage 的使用
// 保存数据
chrome.storage.sync.set({color: 'blue'}, function() {
	console.log('保存成功！');
});
// 读取数据，第一个参数是指定要读取的key以及设置默认值
chrome.storage.sync.get({color: 'red', age: 18}, function(items) {
	console.log(items.color, items.age);
});


// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeRequest.addListener(details => {
	console.log(details)
	// cancel 表示取消本次请求
	// return {cancel: true};
	
	
}, {urls: ["<all_urls>"]}, ["blocking"]);