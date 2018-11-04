function active(){
	$(this).addClass('active').css('opacity', 1);
}
function deActive(){
	$(this).removeClass('active');
}

function Controller(){

	var content = "";
	var self = this;
	self.scrollBarWidth = getScrollbarWidth() + 15;
	self.size = 0;
	self.pageWidth = null;

	self.init = function(_content){
        content = _content;
		self.pageWidth = $(window).width();
		// var numToAdd = Math.ceil( self.pageWidth / (self.scrollBarWidth*4) );
		self.append( 30 );
	}

	self.updateSize = function(){

		self.pageWidth = $(window).width();
		var lefttargetWidth = self.pageWidth - self.size * self.scrollBarWidth;

		if( lefttargetWidth >= 0 ){
			var tobeAdded = Math.ceil( lefttargetWidth / self.scrollBarWidth);
			self.append( tobeAdded );
		}

	};

	self.updateContent = (_content) => {
        $(".content").each((i, elem)=>{
            $(elem).append(_content);
		})
	};

	self.append = function( number ){
		for( var x in range(self.size, number + self.size) ){
			var item = new self.ScrollBar( content, self.pageWidth / number);
			item.appendTo( $('body') ).scrollTop( parseInt($(window).height()) * 1.5 );
		}
		self.size = $('.scrollBar').size();
	};

	self.onScroll = function( e ){
			var target = $(this);

			if( target.hasClass('active') ){

				var targetIndex = $(this).index();

				var targetTop = e.target.scrollTop;

				target.siblings().each(function(i){
					var offset = Math.abs( $(this).index() - targetIndex );
					var thisMap = offset.map(0, self.size, 1 , 2);
					$(this).delay( offset + 10 ).animate({'scrollTop': targetTop * thisMap + ( 2 * offset ), queue: false}, 1);
				});

			}

	}

	self.onMousein = function(){
		var target = $(this);
		var targetIndex = target.index();
		target.siblings().each(function(i){
			var siblIndex = $(this).index();
			var offset = Math.abs( siblIndex - targetIndex );
			var opacity = offset.map(0, self.size, .8 , 0);
			$(this).css({opacity: opacity});
		});

	}


	self.fnMove = function ( e ){
		$(this).animate({'scrollTop': 0, queue: false}, 500);
	}

	self.ScrollBar = function( content, width ) {
		return $('<div>')
						.addClass( "scrollBar" )
						.data({random:  Math.random()})
						.css({
							width: width,
							left: $('.scrollBar').size() * width
						})
						.hover(active, deActive)
						.mouseenter( self.onMousein )
						// .mousemove( self.fnMove )
						.mouseenter( self.fnMove  )
						.scroll( self.onScroll )
						.append( $('<div class="content">').html(content) );
	}

}





