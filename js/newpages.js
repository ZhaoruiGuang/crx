// 自定义新标签页搜索功能
document.getElementById('input').onkeyup = function(e){
	console.log(e.keyCode)
	console.log(e.target.value)
	if(!e.target.value){
		return;
	}
	if(e.keyCode == 13){  // 回车
		window.location.href = 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(e.target.value);
	}
}