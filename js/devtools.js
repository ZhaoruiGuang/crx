// 创建自定义面板，同一个插件可以创建多个自定义面板
// 几个参数依次为：panel标题、图标（其实设置了也没地方显示）、要加载的页面、加载成功后的回调
chrome.devtools.panels.create('自定义面板','../img/icon.png','../html/devtools_panels.html',function(){
	console.log('创建成功开发中面板成功')
})

chrome.devtools.panels.setOpenResourceHandler(function(e){
	alert('你在面板点击了一个有效资源链接')
})

// 创建自定义侧边栏(目前只能给 "Elements" 面板创建侧边栏)
chrome.devtools.panels.elements.createSidebarPane('自定义侧边栏',function(sidebar){
	sidebar.setPage('../html/devtools_sidebar.html'); // 指定加载某个页面
	// sidebar.setExpression('document.querySelectorAll("img")','All Images');  // 通过表达式来指定
	// sidebar.setObject({aaa: 111, bbb: 'Hello World!'}); // 直接设置显示某个对象
})