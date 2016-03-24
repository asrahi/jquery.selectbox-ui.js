/*
 * jQuery Selectbox plugin 1.0
 *
 * Copyright, ASRAHI (http://asrahi.me)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * Date: 2016-03-17
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
		outClick: true
	}

	var public = {
		//생성자
		init : function(options){
			var opt = {};
			$.extend(opt, default_option, options);

			//wraping
			var $this = $(this).wrap('<div class="selectbox-ui-wrap"></div>');
			var $wrap = $this.parent();
			var $first = $this.find('li:first');
			var $option = $this.find('li');

			$this.hide();
			if( $this.data('label') ){
				$wrap.prepend( '<button type="button" class="selectbox-ui-btn">'+$this.data('label')+'</button>' );
			} else {
				$wrap.prepend( '<button type="button" class="selectbox-ui-btn">'+$first.html()+'</button>' );
			}
			$wrap.prepend('<input type="hidden" class="selectbox-ui-val" value="'+$first.data('value')+'/>');
			var $btn = $wrap.find('.selectbox-ui-btn');

			$btn.click(function(){
				$wrap.toggleClass('open');
				$this.slideToggle(opt.speed,function(){
					if( typeof opt.onOpen == 'function' ){ if( $(this).is('.open') ) opt.onOpen.apply(this,e); }
					if( typeof opt.onClose == 'function' ){ if( $(this).is(':not(.open)') ) opt.onOpen.apply(this,e); }
				});
				return false;
			});
			$option.click(function(e){
				$btn.html( $(this).html() );
				if( typeof opt.onChange == 'function' ) opt.onChange.apply(this,e);
				$btn.trigger('click');
				if(!opt.link) return false;
			});

			if(opt.outClick){
				$(document).on('click','body',function(e){
					if( !$this.has( e.target ).length ){
						$this.slideUp(opt.speed,function(){
							if( typeof opt.onOpen == 'function' ){ if( $(this).is('.open') ) opt.onOpen.apply(this,e); }
							if( typeof opt.onClose == 'function' ){ if( $(this).is(':not(.open)') ) opt.onOpen.apply(this,e); }
						});
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
