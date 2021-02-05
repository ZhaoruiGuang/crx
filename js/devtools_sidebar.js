$.ajax({
	url: 'https://www.aireadall.com/test',
	type:'get',
	success:function(res){
		console.log(res)
		$('.sidebarAjaxRes').html(res);
	},
	error:function(err){
		console.log(err)
	}
})