$.ajax({
	url: 'https://www.aireadall.com/test',
	type:'get',
	success:function(res){
		$('.panelsAjaxRes').html(res);
	},
	error:function(err){
		$('.panelsAjaxRes').html(err);
	}
})

// 获取当前审查页面的 id
$('#pageId').html(chrome.devtools.inspectedWindow.tabId);

$('.checkJquery').click(function(e){
	chrome.devtools.inspectedWindow.eval("jQuery.fn.jquery",function(res,isException){
		let html = '';
		if(isException){
			html = "当前页面未检测到 jquery";
		}else{
			html = "当前页面使用了 jquery, 版本是: " + res;
		};
		$('.checkJqueryRes').html(html);
	});
})

$('.openSource').click(function(e){
	chrome.devtools.inspectedWindow.eval("window.location.href", function(res, isException){
		chrome.devtools.panels.openResource(res, 20, function(){
			$('.openSourceRes').html(res)
		});
	});
})

$('.getSource').click(function(e){
	chrome.devtools.inspectedWindow.getResources(function(res){
		if(res&&res.length){
			let html = '';
			for(let i=0;i<res.length;i++){
				html += `<li>资源类型: ${res[i].type}, 资源地址: ${res[i].url}</li>`
			};
			$('.getSourceRes').html(html);
		}
	})
})