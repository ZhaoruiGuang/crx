// document.body.style.backgroundColor = '#000'


// 引用扩展里的文件,通过chrome.extension.getURL()来获取扩展里文件的URL。可以像使用其它url一样使用这些URL
// var imgURL = chrome.extension.getURL("img/wallpaper.png");
// document.body.style.backgroundImage = 'url(' + imgURL + ')';

document.body.onclick = function(e){
	console.log('body click')
}