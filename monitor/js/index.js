// 登录页js

/**
 * 改变登录页主题
 * @param  {[type]} theme [description]
 * @return {[type]}       [description]
 */
function changeTheme(theme){
	// 更换ID属性，引导CSS变化
	$("body").attr('id' , theme);
	// 更换导航图片
	var count = 1;
	$("#navigation img").each(function(){
		this.src = 'images/' + theme + '/nav_' + count + '.png';
		count += 1;
	})
	// 更换输入框图片
	$('#search_box img')[0].src = 'images/' + theme + '/form-user.png';
}