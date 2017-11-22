$(window).ready(function(){
	initialize();
	banLoop();
	naviAct();
});

	function banLoop(){
		var cw=$(window).width();
		var i_act=0;

		var t=setInterval(autoLoop,3000);
		
		// banTogg();
		function autoLoop(){
			$('.banner ul li').last().siblings().animate({left:-cw+'px'},500);
			$('.banner ul li').last().animate({left:-cw+'px'},500,banTogg);
			i_act=(i_act+1)%4;
		}
		function banTogg(){
			$('.banner ul li').first().appendTo($('.banner ul'));
			$('.banner ul li').css('left','0');
			$('.ban-btn span').removeClass('active');
			$('.ban-btn span').eq(i_act).addClass('active');
		}
	}
	
	function naviAct(){
		$('.btn-pull').first().click(function(){
			$('.canv').hide();
			$('.navi-auto').toggle();			
		});
		$('.buy').click(function(){
			$('.navi-auto').hide();
			$('.canv').toggle();			
		});
	}
	
	function initialize(){
		var cw=$(window).width();
		var ch=$(window).height();
		
		// console.log(cw);
		$('.fk').css('background-size',	cw+'px 572.14px');
		$('.banner ul li').css('width',	cw+'px');
		$('.banner ul li img').attr('width',cw+'px');
		
		$('.acar li').css({height:'115px',
							width:'125px',
							margin:'10px 25px'
			});
	}