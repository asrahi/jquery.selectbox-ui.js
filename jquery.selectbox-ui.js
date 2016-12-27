/*
 * jQuery Selectbox UI plugin
 *
 * @author ASRAHI (http://asrahi.me)
 * @license MIT
 * @date 2016-03-17
 * @version 1.2 객체 셀럭터 수정, 접근성을 위한 tabindex추가
 */
(function($){
	var default_option = {
		selectClass:'selected',
		speed: 100,
		effect: 'slide',
		onChange: null,
		onOpen: null,
		onClose: null,
		link: false,
		outClickClose: true,
		otherClickClose: true
	}

	var public = {
		//생성자
		init : function(options){
			var opt = {};
			$.extend(opt, default_option, options);

			//wraping
			var $this = $(this).addClass('selectbox-ui').wrap('<div class="selectbox-ui-wrap"></div>');
			var $wrap = $this.parent();
			var $first = $this.children().first();
			var $option = $this.children().attr('tabindex','0');

			$this.hide();
			if( $this.data('label') ){
				$wrap.prepend( '<button type="button" class="selectbox-ui-btn">'+$this.data('label')+'</button>' );
				$wrap.append('<input type="hidden" class="selectbox-ui-val" value=""/>');
			} else {
				$wrap.prepend( '<button type="button" class="selectbox-ui-btn">'+$first.html()+'</button>');
				$wrap.append('<input type="hidden" class="selectbox-ui-val" value="'+$first.data('value')+'/>');
				$this.data('value', $first.data('value'));
			}
			

			var $btn = $wrap.find('.selectbox-ui-btn');

			$btn.click(function(e){
				if( opt.otherClickClose ){
					$('.selectbox-ui').not($this).slideUp(opt.speed).parent().removeClass('open');
				}
				$wrap.toggleClass('open');
				$this.stop().slideToggle(opt.speed,function(){
					if( typeof opt.onOpen == 'function' ){ if( $(this).is('.open') ) opt.onOpen.apply(this,arguments); }
					if( typeof opt.onClose == 'function' ){ if( $(this).is(':not(.open)') ) opt.onOpen.apply(this,arguments); }
				});
				return false;
			});
			$option.click(function(e){
				if( $this.data('value') != $(this).data('value') ){
					$btn.html( $(this).html() );
					$this.data('value', $(this).data('value') );
					if( typeof opt.onChange == 'function' ) opt.onChange.apply(this,arguments);
				}
				$btn.trigger('click');
				if(!opt.link) return false;
			});

			if(opt.outClickClose){
				$(document).on('click','body',function(e){
					if( !$this.has( e.target ).length ){
						$this.stop().slideUp(opt.speed,function(){
							if( typeof opt.onOpen == 'function' ){ if( $(this).is('.open') ) opt.onOpen.apply(this,arguments); }
							if( typeof opt.onClose == 'function' ){ if( $(this).is(':not(.open)') ) opt.onOpen.apply(this,arguments); }
						});
						$wrap.removeClass('open');
					}
				});
			}

		},
		// public 함수 (option)을 받아 처리
		disabled : function(option){
		}
	};//END public

	var private = {

	};//END private

	$.fn.selectbox = function (method) {
		if (method && public[method]) {
			return public[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			var arg = arguments;
			return this.each(function(){
				return public.init.apply( this, arg);
			});
		} else {
			alert('No Find Method:: ' + method);
		}
	};//END plugin
})(jQuery);
