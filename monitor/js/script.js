
var POPBOX_HEIGHT = document.documentElement.clientHeight;
var POPBOX_WIDTH = document.documentElement.clientWidth;
var MAIN_CONTENT_WIDTH = 620;

/**
 * 显示大图
 * @param  {[type]} picpath [description]
 * @return {[type]}         [description]
 */
function showBigPic(picpath){
	// 先取得大图图片
	var $_img = $("<img src='" + picpath + "' />");
	$_img.load(function(){
		var height = $_img[0].naturalHeight, width = $_img[0].naturalWidth;
		// 先按高度压缩
		if(height > POPBOX_HEIGHT){
			width = width * POPBOX_HEIGHT / height
			height = POPBOX_HEIGHT;
		}
		// 检查宽度
		if(width > POPBOX_WIDTH){
			height = height * POPBOX_WIDTH / width
			width = POPBOX_WIDTH;
		}
		// 设置高度
		$_img.attr('height', height)
		$_img.attr('style', 'margin-top:' + ((POPBOX_HEIGHT - height) / 2 + document.documentElement.scrollTop) + 'px')

		$("#full_frame").html($_img).show()
	});
}

/**
 * 覆盖层的隐藏事件处理函数
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
function fullFrameHandler(evt){
	var self = this;
	if(self == evt.target){
		$(self).hide();
	}
	return true;
}

/**
 * 切换交互设计的风格
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function changeInterTheme(obj){
	// 判断当前的风格，并进行切换
	if(obj.innerHTML == "Grey Theme"){
		$(obj).siblings().each(function(){
			this.src = this.src.replace(/cai/g, 'grey');
		})
		$(obj).css('background-color', '#CA241C')
		obj.innerHTML = "Color Theme"
	}
	else {
		$(obj).siblings().each(function(){
			this.src = this.src.replace(/grey/g, 'cai');
		})
		$(obj).css('background-color', '#8D8671');
		obj.innerHTML = "Grey Theme"
	}
	return false;
}

/**
 * 移动下方箭头
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function animateNavArrow(obj){
	var left = $(obj).position().left;
	$("#footer_nav_arrow").stop().animate({"left": (left + 68) + "px"}, 800);
	$('#footer_nav li a').removeClass('current');
	$(obj).addClass('current');
}

/**
 * 切换左侧导航的高亮项
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function changeSideNavCurrennt(obj){
	$('#side_nav li a').removeClass('current');
	$(obj).addClass('current');
}

/**
 * 移动主内容框
 * @param  {[type]} index [description]
 * @return {[type]}     [description]
 */
function animateMainContent(index){
	var left = -((index - 1) * MAIN_CONTENT_WIDTH);
	$("#main_content_container").stop().animate({"left": left + "px"}, 800);
}


var CURDOC_INDEX = 0;
/**
 * 切换显示左右箭头
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
function toggleLRArrow(index) {
	index = index || CURDOC_INDEX;
	if(index < 1){
		$("#goleft").hide();
		$("#goright").hide();
	}
	else if(index == 1){
		$("#goleft").hide();
		$("#goright").show();
	}
	else if(index >= 10){
		$("#goleft").show();
		$("#goright").hide();
	}
	else {
		$("#goleft").show();
		$("#goright").show();
	}
}

/**
 * 切换主题
 * @param  {[type]} bgclass [description]
 * @return {[type]}         [description]
 */
function changebg(bgclass){
	$("#wrapper").attr('class', bgclass);
}


$(document).ready(function(){
	// 左侧导航栏的事件响应函数
	$('#navigation li a').on('click', function animationClick(evt){
		var id = $(this).attr('id');
		var index = parseInt(id.substring(id.indexOf('_')+1));
		animateNavArrow(this);
		changeSideNavCurrennt($("#side_nav li #" + id)[0]);
		animateMainContent(index);
		toggleLRArrow(-1);
		return false;
	});

	// 下部导航栏的事件响应函数
	$('#side_nav li a').on('click', function(){
		var id = $(this).attr('id');
		var index = parseInt(id.substring(id.indexOf('_')+1));
		animateNavArrow($("#navigation li #" + id)[0]);
		changeSideNavCurrennt(this);
		animateMainContent(index);
		return false;
	});

	// 网站信息导航的事件响应函数
	$('#side_extra_nav li a').on('click', function(){
		var id = $(this).attr('id');
		var index = parseInt(id.substring(id.lastIndexOf('_')+1)) + 5;
		if(index == 9){
			location.href = "realinter.html";
			return false;
		}

		animateMainContent(index);
		// 回到主页
		animateNavArrow($('#navigation #nav_1'));
		changeSideNavCurrennt($('#side_nav #nav_1'));
		return false;
	});

	// real部分的document部分的图片事件响应
	$('#document_content_box a').on('click', function(){
		var index = parseInt($(this).children('img').attr('id').substring(4));
		animateMainContent(index + 8);
		CURDOC_INDEX = index;
		toggleLRArrow();
	})

	// 左右按钮
	$("#goleft").on('click', function(){
		var index = CURDOC_INDEX + 7
		animateMainContent(index);
		CURDOC_INDEX -= 1;
		toggleLRArrow();
	});

	$("#goright").on('click', function(){
		var index = CURDOC_INDEX + 9
		animateMainContent(index);
		CURDOC_INDEX += 1;
		toggleLRArrow();
	});

	// 浮动层的事件绑定
	$('#full_frame').on('click', fullFrameHandler);
	// 如果有导航到那个页面，那么自动跳转
	nav_index = location.hash.indexOf('#h_')
	if(nav_index>-1){
		$("#navigation li #" + location.hash.substring(3)).click()
	}
});