/*jQuery mobile is required.
git page: https://github.com/Pashton/burhaniFlicks
License: You can use it the way you like, you may modify the code as well, however this license must be included.
Any damages this may cause, in any way, shape or form, the Author is free of the charges.
Created by Hasham Burhani.
*/
/*
Version: 0.2 - still a prototype. Use at your own risk.
*/

//BurhaniFlicks. global variables.
burhaniFlicks = {};

burhaniFlicks.startPosition; //position of object at start.
burhaniFlicks.lastPosition; //used in touchmove. maintains last pixel position of object.

startTracking = {
	position:0,
	time:0
};
endTracking = {
	position:0,
	time:0
};

burhaniFlicks.isSwipe; //used to see if user trigger a normal swipe (too quick for this lib)
//END
burhaniFlicks.startTime; //taken in touchstart.
burhaniFlicks.endTime; //taken in touchend.
burhaniFlicks.distance; //total distance travelled by move.
burhaniFlicks.velocity; //velocity over the whole run.
burhaniFlicks.prevTime; //Used in touchmove.
burhaniFlicks.varVelocity; //clean up later. should be local.
burhaniFlicks.velocityArr = []; //This stores the objects velocity as it moves.
burhaniFlicks.displacement; //This stores the pixels the object will move
burhaniFlicks.lastPositionOfPage;

/* PHYSICS LOTS OF HELP FROM LEO JWEDA */
var u_k = 0.3;
var g = 0.9;

//DATAMODEL

var pages = {
	'main' : {
			id			: 'main',
			content		: '_img/1.jpg',
			animation	: { id   : 'Stage-10-20',
							name : 'EDGE_7314-10-20' },
			link		: [ 'one-ten-ten', 'twenty-ten' ],
			zoom		: [
				{ id	: 'one-twenty-ten',
				source: 'img/one-twenty-ten' },
				{ id : 'one-twenty-ten',
				source : 'img/one-twenty-ten' }
			],
			rightNeighbour: 'one-ten-twenty',
			
			isAnimation: function() { if(this.animation!==undefined)return this.animation.length ? true : false; else return false;},
			hasZoom: function() { if(this.zoom!==undefined) return this.zoom.length ? true : false; else return false; }

		},
	'one-ten-ten' : {
			id			: 'one-ten-ten',
			content		: '#',
			animation	: { id   : 'Stage-10-20',
							name : 'EDGE_7314-10-20' },
			link		: [ 'one-ten-ten', 'twenty-ten' ],
			zoom		: [
				{ id	: 'one-twenty-ten',
				source: 'img/one-twenty-ten' },
				{ id : 'one-twenty-ten',
				source : 'img/one-twenty-ten' }
			],
			leftNeighbour: 'main',
			rightNeighbour: 'one-ten-twenty',
			
			isAnimation: function() { if(this.animation!==undefined)return this.animation.length ? true : false; else return false;},
			hasZoom: function() { if(this.zoom!==undefined) return this.zoom.length ? true : false; else return false; }

		},
		'one-ten-twenty' : {
			id			: 'one-ten-twenty',
			content		: '#',
			leftNeighbour: 'one-ten-ten',
			rightNeighbour: 'one-ten-thirty',

			isAnimation: function() { if(this.animation!==undefined)return this.animation.length ? true : false; else return false;},
			hasZoom: function() { if(this.zoom!==undefined) return this.zoom.length ? true : false; else return false; }
		},
		'one-ten-thirty' : {
			id			: 'one-ten-thirty',
			content		: '#',
			link		: [ 'one-ten-ten', 'twenty-ten' ],
			leftNeighbour: 'one-ten-twenty',
			rightNeighbour: 'one-ten-forty',

			isAnimation: function() { if(this.animation!==undefined)return this.animation.length ? true : false; else return false;},
			hasZoom: function() { if(this.zoom!==undefined) return this.zoom.length ? true : false; else return false; }

		},
		'one-ten-forty' : {
			id			: 'one-ten-forty',
			content		: '#',
			link		: [ 'one-ten-ten' ],
			zoom		: [
			{ id : 'one-twenty-ten',
			source : 'img/one-twenty-ten' },
				{ id : 'one-twenty-thirty',
			source : 'img/one-twenty-ten' }
			],
			leftNeighbour: 'one-ten-thirty',
			rightNeighbour: 'one-ten-fifty',

			isAnimation: function() { if(this.animation!==undefined)return this.animation.length ? true : false; else return false;},
			hasZoom: function() { if(this.zoom!==undefined) return this.zoom.length ? true : false; else return false; }

		},
		'one-ten-fifty' : {
			id			: 'one-ten-fifty',
			content		: '#',
			animation: { id   : 'Stage-10-20',
							name : 'EDGE_7314-10-20' },
			link : [ 'one-ten-ten', 'one-ten-forty', 'one-ten-twenty', 'one-ten-forty' ],
			leftNeighbour: 'one-ten-forty',
			rightNeighbour: 'end',

			isAnimation: function() { if(this.animation!==undefined)return this.animation.length ? true : false; else return false;},
			hasZoom: function() { if(this.zoom!==undefined) return this.zoom.length ? true : false; else return false; }

		}
	};
//END

var removePages = function(currId){
	console.log(currId);
	var leftNeighbour;
	var rightNeighbour;
	if(pages[currId].leftNeighbour !== undefined)
		leftNeighbour = pages[currId].leftNeighbour;
	if(pages[currId].rightNeighbour !== undefined)
		rightNeighbour = pages[currId].rightNeighbour;

	if(rightNeighbour===undefined && leftNeighbour!==undefined)
		$('body').children('div:[data-role=page]').not('#'+leftNeighbour+',#'+currId).remove();
	else if(rightNeighbour!==undefined && leftNeighbour===undefined)
		$('body').children('div:[data-role=page]').not('#'+rightNeighbour+',#'+currId).remove();
	else
		$('body').children('div:[data-role=page]').not('#'+leftNeighbour+' , #'+rightNeighbour+',#'+currId).remove();

};
var addPages = function(currId){
	var leftNeighbour;
	var rightNeighbour;
	if(pages[currId].leftNeighbour !== undefined)
		leftNeighbour = pages[currId].leftNeighbour;
	if(pages[currId].rightNeighbour !== undefined)
		rightNeighbour = pages[currId].rightNeighbour;
	var $this = $('#'+currId);
	console.log(pages[rightNeighbour]);

	burhaniFlicks.createPages(pages[currId]);
};


var preventDefaultScroll = function(e) {
		e.preventDefault();
		window.scroll(0,0);
		return false;
};

	// create listener to prevent scroll function
document.addEventListener('touchmove', preventDefaultScroll, false);

burhaniFlicks.createPages = function(Data)
{
	var $prevPage;
	var $nextPage;
	var $currentPage = $('.ui-page');
	var $body = $('.ui-body');

	if(Data.leftNeighbour)
	{
		console.log('grabbing left');
		$prevPage = ich.getPage(pages[Data.leftNeighbour]);
	}
	if(Data.rightNeighbour)
	{
		console.log('grabbing right');
		$nextPage = ich.getPage(pages[Data.rightNeighbour]);
		console.log($nextPage);
	}

	if($prevPage)
	{
		$body.prepend($prevPage);
	}
	if($nextPage)
	{
		console.log($nextPage);
		$('body').append($nextPage);
	}

	var $loader = $('.ui-loader').clone();
	$('.ui-loader').remove();
	$body.append($loader);

};
//Preload images on both sides.
//TODO: cleanup and make sure images that don't exist are not loaded!.
$(document).on('pageshow','.ui-page',function(){
	$(this).attr('style','');
	var $this = $(this);
	var currId = $this.attr('id');

	$('body').addClass('animating');
	removePages(currId);
	addPages(currId);
	$('body').removeClass('animating');

	//modified jquery library that eliminates flickers. this next line is needed.
	//Local variables.
	var $currentPage = $(this);
	var $nextPage = $currentPage.next();
	var $prevPage = $currentPage.prev();

	
	
	if($prevPage.attr('id') !== undefined)
	{
		$prevPage.css({
			left : '-1024px',
			position: 'absolute'
		});
		$prevPage.show();
	}
	if($nextPage.attr('id') !== undefined)
	{
		$nextPage.css({
			left : '1024px',
			position: 'absolute'
		});
		$nextPage.show();
	}
	console.log('Pages loaded');
//touch begins here.
}).on('touchstart','.ui-page',function(e){
		startTracking.position = e.originalEvent.touches[0].pageX;
		burhaniFlicks.isSwipe = true;
		startTracking.time = (new Date()).getTime();
		burhaniFlicks.prevTime = startTracking.time;
		burhaniFlicks.velocityArr = [];
//update variables on move.
}).on('touchmove','.ui-page',function(e){

	//keeps track of variable velocity.
	var currentPosition = e.originalEvent.touches[0].pageX;
	var getTime = (new Date()).getTime();
	burhaniFlicks.varVelocity = (burhaniFlicks.lastPosition - currentPosition)/(getTime -
	burhaniFlicks.prevTime);
	burhaniFlicks.velocityArr.push(burhaniFlicks.varVelocity);
	
	console.log('current velocity: ' + burhaniFlicks.velocityArr[burhaniFlicks.velocityArr.length -1]);

	//END variable velocity.
	burhaniFlicks.prevTime = getTime;
	burhaniFlicks.lastPosition = currentPosition;

	console.log('new position:'+burhaniFlicks.lastPosition);
	endTracking.time = burhaniFlicks.prevTime;
	endTracking.position = burhaniFlicks.lastPosition;

	$(this).trigger('drag');

//figure out what to do with touchend.
}).on('touchend','.ui-page',function(){
	//initialize global variables.
	var style;
	var currentTime = (new Date()).getTime();
	var difference = currentTime - endTracking.time;
	console.log(difference);
	console.log('current time: ' + currentTime +' end time: ' + endTracking.time);
	burhaniFlicks.isSwipe = false;
	var lastVelocity = burhaniFlicks.velocityArr[burhaniFlicks.velocityArr.length - 1];

	if(difference<40){
		console.log('detected flick');
		burhaniFlicks.isSwipe = true;
	}
	else
		console.log('detected hold');

	burhaniFlicks.distance = Math.abs(startTracking.position - burhaniFlicks.lastPosition);
	burhaniFlicks.velocity = burhaniFlicks.distance / (endTracking.time-startTracking.time);
	
	burhaniFlicks.displacement = Math.pow(lastVelocity,2)/(2*u_k*g);

	console.log('End velocity: ' + lastVelocity);
	console.log('Pixels to animate: '+burhaniFlicks.displacement);

	console.log(burhaniFlicks.velocity);
	console.log('duration: '+(new Date()).getTime());
	//involved pages.
	var $currentPage = $(this);
	var $nextPage = $currentPage.next();
	var $prevPage = $currentPage.prev();
	console.log('offset:'+burhaniFlicks.lastPosition);
	var positionOfPage = $(this).offset().left;
	var displacement;

	if(burhaniFlicks.isSwipe)
	{
		lastVelocity > 0 ? $currentPage.trigger('leftflick') : $currentPage.trigger('rightflick');
		return;
	}

	//Switch pages if we are past these points for the page itself and not the position of the touch.
	else if( positionOfPage < -512 || positionOfPage > 512 )
	{
		//Direction of movement.
		if(positionOfPage<0)
			displacement = -1024;
		else
			displacement = 1024;
		//END
		
		//if we are on the first page.
		if($currentPage.attr('id')===$.mobile.firstPage.attr('id'))
		{
			//we cannot move in the negative direction, snap back to place.
			console.log(burhaniFlicks.lastPosition);
			if(positionOfPage>0)
			{
				$(this).css({
				'-webkit-transform' : ''
				});
				$(this).next().css({
				'-webkit-transform' : ''
				});
				return; //leave method
			} //otherwise switch in positive direction.
			else
			{
				style = 'real-'+(200-burhaniFlicks.lastPositionOfPage);
				console.log(style);
				$.mobile.changePage($(this).next(), { transition: style, reverse: false});
				return; //leave method.
			}
		}
		else if($currentPage.attr('id')===$('div[data-role="page"]:last').attr('id')) //last page.
		{
			//we cannot move in the negative direction, snap back to place.
			if(positionOfPage<0)
			{
				$(this).css({
				'-webkit-transform' : ''
				});
				$(this).prev().css({
				'-webkit-transform' : ''
				});
				return; //leave method
			} //otherwise switch in positive direction.
			else
			{
				style = 'real'+burhaniFlicks.lastPositionOfPage;
				$.mobile.changePage($prevPage, { transition: style, reverse: false});
				return; //leave method.
			}
			console.log('we jumped out!');
		}
		else
		{
			if(positionOfPage>0)
			{
				style = 'real'+burhaniFlicks.lastPositionOfPage;
				console.log(style);
				$.mobile.changePage($(this).prev(), { transition: style, reverse: false});
				return;
			} //otherwise switch in positive direction.
			else
			{
				style = 'real-'+(200-burhaniFlicks.lastPositionOfPage);
				console.log(style);
				$.mobile.changePage($(this).next(), { transition: style, reverse: false});
				return; //leave method.
			}
		}
	}
	else
	{
		console.log('DO NOT MOVE');
		$(this).css({
		'-webkit-transform' : ''
		});
		$(this).next().css({
		'-webkit-transform' : ''
		});
		$(this).prev().css({
		'-webkit-transform' : ''
		});
	}
	//this function makes object follow drag.
}).on('drag','.ui-page',function(){

	var displacement = burhaniFlicks.lastPosition - startTracking.position;
	if($(this).attr('id')===$.mobile.firstPage.attr('id') && displacement>512)
		displacement = 510;

	if( $(this).attr('id') === $('div[data-role="page"]:last').attr('id') && displacement<-512)
		displacement = -510;

	$(this).css({
		'-webkit-transform' : 'translateX('+displacement+'px)'
	});
	$(this).next().css({
		'-webkit-transform' : 'translateX('+displacement+'px)'
	});
	$(this).prev().css({
		'-webkit-transform' : 'translateX('+displacement+'px)'
	});
	burhaniFlicks.lastPositionOfPage = $(this).offset().left;
	var positionPage = 100-Math.round(((burhaniFlicks.lastPositionOfPage)/1024)*100);
	burhaniFlicks.lastPositionOfPage = positionPage;
	console.log('position: '+burhaniFlicks.lastPositionOfPage);
	//if it's a simple flick - change page
	//TODO: take velocity and changepage according to velocity speed.
}).on('rightflick', '.ui-page', function(){
	if($(this).attr('id')!==$.mobile.firstPage.attr('id')){
		var style = 'real'+burhaniFlicks.lastPositionOfPage;
		console.log(style);
				$(this).css({
		'-webkit-transform' : ''
		});
		$(this).next().css({
		'-webkit-transform' : ''
		});
		$(this).prev().css({
		'-webkit-transform' : ''
		});
		$.mobile.changePage($(this).prev(), { transition: style, reverse: false});
	}
	else
	{
		$(this).css({
		'-webkit-transform' : ''
		});
		$(this).next().css({
		'-webkit-transform' : ''
		});
		$(this).prev().css({
		'-webkit-transform' : ''
		});
	}

//if it's a simple flick - change page
//TODO: take velocity and changepage according to velocity speed.
}).on('leftflick', '.ui-page', function(){
	if($(this).attr('id')!==$('div[data-role="page"]:last').attr('id')){
		var style = 'real-'+(200-burhaniFlicks.lastPositionOfPage);
		console.log(style);
				$(this).css({
		'-webkit-transform' : ''
		});
		$(this).next().css({
		'-webkit-transform' : ''
		});
		$(this).prev().css({
		'-webkit-transform' : ''
		});
		$.mobile.changePage($(this).next(), { transition: style, reverse: false});
	}
	else
	{
		$(this).css({
		'-webkit-transform' : ''
		});
		$(this).next().css({
		'-webkit-transform' : ''
		});
		$(this).prev().css({
		'-webkit-transform' : ''
		});
	}
});