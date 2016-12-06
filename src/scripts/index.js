var Swiper = require('./components/swiper/swiper-3.3.1.min');
var swiperAnimate = require('./components/swiper/swiper.animate1.0.2.min');
var swiper = new Swiper('.swiper-container', {
	onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
		swiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
		swiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
	},
	onSlideChangeEnd: function(swiper) {
		swiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	}
})

var $ = require('zepto-modules/zepto');

require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/touch');

module.exports = $;
$("#dd").hide();
$(".swiper-container").show();

var IScroll = require('./components/iscroll/iscroll');

myScroll = new IScroll('#wrapper', {
	mouseWheel: true
});
document.addEventListener("touchmove", function(e) {
	e.preventDefault();
}, false);


$.post("http://2024499890.applinzi.com/php/getsign.php", {
	url: window.location.href
}, function(data) {

	pos = data.indexOf('}');
	dataStr = data.substring(0, pos + 1);

	objData = JSON.parse(dataStr);
	//	alert(objData.url);
	//	console.log(dataStr);

	wx.config({
		debug: true,
		appId: objData.appId,
		timestamp: objData.timestamp,
		nonceStr: objData.nonceStr,
		signature: objData.signature,
		jsApiList: [
			// 所有要调用的 API 都要加到这个列表中
			"scanQRCode", "chooseImage"
		]
	});

	wx.ready(function() {
		// 在这里调用 API

		$("#twocode").tap(function() {
			wx.scanQRCode({
				needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				success: function(res) {
					var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				}
			});
		});
		$("#photo").tap(function() {
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				}
			});
		});

	});

});

$("#enter").tap(function() {
	$("#dd").show();
	$(".swiper-container").hide();
	$.post('api/skill', {}, function(sk) {
	$("#scroller").append("<div id='dv_skill'><ul></ul></div>");
	for(var i = 0; i < sk.length; i++) {
		var str = "";
		str = "<li><img src='" + sk[i].img + "' /><span>" + sk[i].name + "</span></li>";
		$("#scroller #dv_skill ul").append(str);
	}
	myScroll.refresh();
});
});

$("#footer div").tap(function() {
	$("#footer div").css("color", "#333333");
	$(this).css("color", "red");

});

$("#skill").tap(function() {
	$("#scroller div").remove();
	$.post('api/skill', {}, function(sk) {
	$("#scroller").append("<div id='dv_skill'><ul></ul></div>");
	for(var i = 0; i < sk.length; i++) {
		var str = "";
		str = "<li><img src='" + sk[i].img + "' /><span>" + sk[i].name + "</span></li>";
		$("#scroller #dv_skill ul").append(str);
	}
	myScroll.refresh();
});
	
});
$("#project").tap(function() {
	$("#scroller div").remove();
	$.post('api/project', {}, function(sk) {
	$("#scroller").append("<div id='dv_project'></div>");

	for(var i = 0; i < sk.length; i++) {
		var str = "";
		str = "<ul><li><span>" + sk[i].name + "</span><a href='" + sk[i].url + "'><i class='iconfont'>&#xe67a;</i></a></li>" +
			"<li><img src='" + sk[i].image + "' /></li>" +
			"<li>" + sk[i].description + "</li>" +
			"<li>" + sk[i].tech + "</li></ul>";
		$("#scroller #dv_project").append(str);
	}
	setTimeout(function(){
   	myScroll.refresh();
   },300)
});

});
$("#work").tap(function() {
	$("#scroller div").remove();
	$.post('api/work', {}, function(sk) {
	$("#scroller").append("<div id='dv_work'><dl></dl></div>");
	for(var i = 0; i < sk.length; i++) {
		var str = "";
		str = "<dt>" + sk[i].title + "</dt>" +
			"<dd>" + sk[i].content + "</dd>";
		$("#scroller #dv_work dl").append(str);
	}
	$("#scroller #dv_work dl").append("<dt>曾在公司</dt><dd><img src='images/qtfm.jpg' /></dd><dd>公司官网：http://neo.qingting.fm/<dd>");
   setTimeout(function(){
   	myScroll.refresh();
   },300)
});

});



$("#my").tap(function() {
	$("#scroller div").remove();
	
	$("#scroller").append("<div id='dv_my'><ul><li><ul><li><img src='../images/qfj.jpg'/> </li><li>仇方娇</li><li> <button id='bt_twocode' class='iconfont'>&#xe607;</button> </li></ul></li><li><i class='iconfont'>&#xe628;</i><span> 电话：15563925585</span></li><li><i class='iconfont'>&#xe677;</i><span> QQ：2024499890</span></li><li><i class='iconfont'>&#xe65a;</i><span>微信号：Fancyqfj</span> </li><li><i class='iconfont'>&#xe61f;</i><span> 邮件：2024499890@qq.com</span></li></ul></div>");
	$("#bt_twocode").tap(function(){				
		$("#scroller").append("<div id='my_twocode_parent'><div id='my_twocode'><img src='../images/erweima.png' /></div></div>");				 		
		
		$("#my_twocode_parent").tap(function(){							
			$("#my_twocode_parent").remove();	 		
		});
	});
});

//$("#scroller").append("<dl><dt>"+++"</dl>");

////js的入口文件
////引入zepto
//var $ = require('./components/zepto-modules/_custom');

//var wx = require('./components/weixin/jweixin');
//require('./components/zepto-modules/ajax');
//module.exports = $;
//
//console.log(wx);
////引入IScroll
//var IScroll = require('./components/iscroll/iscroll.js');
//
////设置iscroll对象默认为hide
//$('#mainContent').hide();
//$(".swiper-container").hide();
//
//
//$('#enter').click(function() {
//      $('#mainContent').show();
//      $(".swiper-container").hide();
//
//      //需要进行post请求，然后请求/api/skill，并且将数据列表显示在iscroll里
//      $.post('http://1.13525442.applinzi.com/data/skill.php', {}, function(response) {
//      	console.log(response);
//          var html = "";
//          for (var i = 0; i < response.length; i++) {
//              html += "<li>" + response[i].category + "</li>";
//          }
//
//          $("#scroller ul").html(html);
//
//          //调用IScroll
//          myScroll = new IScroll('#wrapper', { mouseWheel: true });
//          document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
//      })
//  })
//  //引入swiper
//var Swiper = require('./components/swiper/swiper-3.3.1.min.js');
////引入swiper animate
//var SwiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');
//
//var mySwiper = new Swiper('.swiper-container', {
//  effect: 'cube',
//  onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
//      SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
//      SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
//  },
//  onSlideChangeEnd: function(swiper) {
//      SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
//  }
//})
//
//$("#footer div").tap(function() {
//  var apiTarget = $(this).attr('id');
//  $.post('/api/' + apiTarget, {}, function(response) {
//      var html = "";
//      for (var i = 0; i < response.length; i++) {
//          html += "<li>" + response[i].category + "</li>";
//      }
//      $("#scroller ul").html(html);
//  })
//})
//
//
//$("#scan").tap(function() {
//  $.post("http://13525442.applinzi.com/php/getsign.php", {
//      url: window.location.href
//  }, function(data) {
//      pos = data.indexOf('}');
//      dataStr = data.substring(0, pos + 1);
//      objData = JSON.parse(dataStr);
//      console.log(dataStr);
//      wx.config({
//          debug: true,
//          appId: objData.appId,
//          timestamp: objData.timestamp,
//          nonceStr: objData.nonceStr,
//          signature: objData.signature,
//          jsApiList: [
//              'scanQRCode', 'getLocation'
//              // 所有要调用的 API 都要加到这个列表中
//          ]
//      });
//
//      wx.ready(function() {
//
//          // 在这里调用 API
//          wx.scanQRCode({
//              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
//              scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
//              success: function(res) {
//                  var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
//              }
//          });
//
//      });
//
//  });
//
//})
//
//var interval = setInterval(function() {
//  if (document.readyState === 'complete') {
//      clearInterval(interval);
//      $('#preload').hide();
//      $(".swiper-container").show();
//      mySwiper.updateContainerSize();
//      mySwiper.updateSlidesSize();
//  } else {
//      $('#preload').show();
//  }
//}, 100);