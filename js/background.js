// 配合 manifest.json 里的 page_action 项,指定在访问某些特定网址时才显示插件图标,例如 baidu.com
chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有打开百度才显示pageAction
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'baidu.com'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

// 给地址栏插件图标加 tip ,最多四个英文或两个中文
chrome.browserAction.setBadgeText({text: 'zhao'});	// 文字
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});  // 文字颜色


// 向页面注入脚本(注入的脚本和页面里自带的 js 完全隔离,所以不必担心变量命名冲突;二者只仅可以共享页面的DOM)
chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('点击了图标')
	chrome.tabs.executeScript(
		null,
		{code:"document.body.style.backgroundColor='red'"},
	);
});

// 设置浏览器邮件菜单中的自定义选项
chrome.contextMenus.create({
	title: "测试右键菜单1",
	onclick: function(){
		alert('您点击了右键菜单1！');
	}
});
// 设置浏览器邮件菜单中的自定义选项
chrome.contextMenus.create({
	title: "测试右键菜单2",
	onclick: function(){
		// alert('您点击了右键菜单2！');
		
		// 向页面注入脚本
		chrome.tabs.executeScript(
			null,
			{
				// code:"document.body.style.backgroundColor='red'",   // 直接注入代码
				file: "insert.js"			// 注入一个 js 文件
			},
		);
	}
});

chrome.contextMenus.create({
	title: '使用度娘搜索：%s', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params)
	{
		// 注意不能使用location.href，因为location是属于background的window对象
		chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});   // 打开新页面:chrome.tabs.create
	}
});

// chrome.storage.set({
// 	name:'zhao'
// })