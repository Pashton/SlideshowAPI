/*
Dynamic Slider Library.
Description: Dynamically adds and removes pages to the DOM. Pages are created using a templating system.
Required Libraries: jQuery, iCanHaz & Moustache
Concept and Algorithm Design: Hasham Burhani || Engineering and Coding: Andrew Cousineau & Hasham Burhani

Usage: Populate pages with all of your pages and call slider.swipe(pageID) in your swipe functions.
Don't forget to listen to 'animating' when you call slider. The addition and deletion takes time,
so while that is happening cancel all swipes.
*/

var pages = {
	'zero-ten-zero' : {
			id			: 'zero-ten-zero',
			content		: 'images/0-0/7452_ENG_0-0_HomeScreen_DF_Content_x9_y60.png',
			rightNeighbour: 'ten-ten',
			index:1,
			
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
		},
	'ten-ten' : {
			id			: 'ten-ten',
			content		: 'images/10-10/7452_ENG_10-10_DF_Content_x9_y60.png',
			leftNeighbour: 'zero-ten-zero',
			rightNeighbour: 'ten-ten-ten',
			index:2,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

		},
	'ten-ten-ten' : {
			id			: 'ten-ten-ten',
			content		: 'images/10-10-10/7452_ENG_10-10-10_DF_Content_x9_y60.png',
			leftNeighbour: 'ten-ten',
			rightNeighbour: 'ten-twenty',
			index:3,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
	},
	'ten-twenty' : {
			id			: 'ten-twenty',
			content		: 'images/10-20/7452_ENG_10-20_DF_Content_x9_y60.png',
			zoom		: [
			{ id : '10-20-10',
			source : 'images/10-20-10/7452_ENG_10-20-10_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'ten-ten-ten',
			rightNeighbour: 'ten-thirty',
			index:4,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
		},
	'ten-thirty' : {
			id			: 'ten-thirty',
			content		: 'images/10-30/7452_ENG_10-30_DF_Content_x9_y60.png',
			leftNeighbour: 'ten-twenty',
			rightNeighbour: 'twenty-ten',
			index:5,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'twenty-ten' : {
			id			: 'twenty-ten',
			content		: 'images/20-10/7452_ENG_20-10_DF_Content_x9_y60.png',
			leftNeighbour: 'ten-thirty',
			rightNeighbour: 'twenty-twenty',
			index:6,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'twenty-twenty' : {
			id			: 'twenty-twenty',
			content		: 'images/20-20/7452_ENG_20-20_DF_Content_x9_y60.png',
			zoom		: [
			{ id : '20-20-10',
			source : 'images/20-20-10/7452_ENG_20-20-10_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'twenty-ten',
			rightNeighbour: 'twenty-thirty',
			index:7,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'twenty-thirty' : {
			id			: 'twenty-thirty',
			content		: 'images/20-30/7452_ENG_20-30_DF_Content_x9_y60.png',
			zoom		: [
			{ id : '20-30-20',
			source : 'images/20-30-20/7452_ENG_20-30-20_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'twenty-twenty',
			rightNeighbour: 'twenty-thirty-ten',
			index:8,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'twenty-thirty-ten' : {
			id			: 'twenty-thirty-ten',
			content		: 'images/20-30-10/7452_ENG_20-30-10_DF_Content_x9_y60.png',
			leftNeighbour: 'twenty-thirty',
			rightNeighbour: 'twenty-forty',
			index:9,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
	},
	'twenty-forty' : {
			id			: 'twenty-forty',
			content		: 'images/20-40/7452_ENG_20-40_DF_Content_x9_y60.png',
			zoom		: [
			{ id : '20-40-10',
			source : 'images/20-40-10/7452_ENG_20-40-10_DF_Content_x9_y60.png' },
			{ id : '20-40-20',
			source : 'images/20-40-20/7452_ENG_20-40-10_DF_Content_x9_y60.png' },
			{ id : '20-40-30',
			source : 'images/20-40-30/7452_ENG_20-40-10_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'twenty-thirty-ten',
			rightNeighbour: 'thirty-ten',
			index:10,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'thirty-ten' : {
				id			: 'thirty-ten',
				content		: 'images/30-10/7452_ENG_30-10_DF_Content_x0_y0.png',
				leftNeighbour: 'twenty-forty',
				rightNeighbour:'thirty-twenty',
				index:11,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
		},
	'thirty-twenty' : {
			id			: 'thirty-twenty',
			content		: 'images/30-20/7452_ENG_30-20_DF_Content_x0_y0.png',
			link		: 'thirty-twenty-ten',
			zoom		: [
				{ id	: '30-20-20',
				source: 'images/30-20-20/7452_ENG_30-20-20_DF_Content_x0_y0.png' }
			],
			leftNeighbour: 'thirty-ten',
			rightNeighbour: 'thirty-twenty-ten',
			index:12,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

		},
	'thirty-twenty-ten': {
			id			: 'thirty-twenty-ten',
			content		: 'images/10-20/7452_ENG_10-20_DF_Content_x9_y60.png',
			zoom		: [
			{ id	: '30-20-10-10',
				source	: 'images/30-20-10-10/7452_ENG_30-20-10-10_DF_Content_x0_y0.png' }
			],
			leftNeighbour: 'thirty-twenty',
			rightNeighbour: 'thirty-thirty',
			index:13,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
	},
	'thirty-thirty' : {
			id			: 'thirty-thirty',
			content		: 'images/30-30/7452_ENG_30-30_DF_Content_x0_y0.png',
			zoom		: [
				{ id	: '30-30-10',
				source	: 'images/30-30-10/7452_ENG_30-30-10_DF_Content_x0_y0.png'}
			],
			leftNeighbour: 'thirty-twenty-ten',
			rightNeighbour: 'thirty-forty',
			index:14,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'thirty-forty' : {
			id			: 'thirty-forty',
			content		: 'images/30-40/7452_ENG_30-40_DF_Content_x0_y0.png',
			link		: [ 'thirty-forty-ten' ],
			zoom		: [
				{ id : '30-40-20',
				source : 'images/30-40-20/7452_ENG_30-40-20_DF_Content_x0_y0.png' }
			],
			leftNeighbour: 'thirty-thirty',
			rightNeighbour: 'thirty-forty-ten',
			index:15,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
	},
	'thirty-forty-ten' : {
			id			: 'thirty-forty-ten',
			content		: 'images/30-40-10/7452_ENG_30-40-10_DF_Content_x0_y0.png',
			zoom		: [
				{ id   : '30-40-10-10',
				source : 'images/30-40-10/7452_ENG_30-40-10_DF_Content_x0_y0.png' }
			],
			leftNeighbour: 'thirty-forty',
			rightNeighbour: 'thirty-fifty',
			index:16,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'thirty-fifty' : {
			id			: 'thirty-fifty',
			content		: 'images/30-50/7452_ENG_30-50_DF_Content_x0_y0.png',
			zoom		: [
				{ id	: '30-50-10',
				source	: 'images/30-50-10/7452_ENG_30-50-10_DF_Content_x0_y0.png' },
				{ id	: '30-50-20',
				source	: 'images/30-50-20/7452_ENG_30-50-20_DF_Content_x0_y0.png'},
				{ id	: '30-50',
				source	: 'images/30-50/7452_ENG_30-50_GraphExpanded_x624_y217.png' }
			],
			leftNeighbour: 'thirty-forty-ten',
			rightNeighbour: 'forty-ten',
			index:17,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'forty-ten' : {
			id			: 'forty-ten',
			content		: 'images/40-10/7452_ENG_40-10_DF_Content_x9_y60.png',
			zoom		: [
				{ id   : '40-10-10',
				source : 'images/40-10-10/7452_ENG_40-10-10_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'thirty-fifty',
			rightNeighbour: 'forty-twenty',
			index:18,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'forty-twenty' : {
			id			: 'forty-twenty',
			content		: 'images/40-20/7452_ENG_40-20_DF_Content_x9_y60.png',
			zoom		: [
				{ id   : '40-20-10',
				source : 'images/40-20-10/7452_ENG_40-20-10_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'forty-ten',
			rightNeighbour: 'forty-thirty',
			index:19,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'forty-thirty' : {
			id			: 'forty-thirty',
			content		: 'images/40-30/7452_ENG_40-30_DF_Content_x9_y60.png',
			zoom		: [
				{ id   : '40-30-10',
				source : 'images/40-30-10/7452_ENG_40-30-10_DF_Content_x9_y60.png' }],
			leftNeighbour: 'forty-twenty',
			rightNeighbour: 'forty-forty',
			index:20,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'forty-forty' : {
			id			: 'forty-forty',
			content		: 'images/40-40/7452_ENG_40-40_DF_Content_x9_y60.png',
			zoom		: [
				{ id   : '40-40-10',
				source : 'images/40-40-10/7452_ENG_40-40-10_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'forty-thirty',
			rightNeighbour: 'fifty-ten',
			index:21,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'fifty-ten' : {
			id			: 'fifty-ten',
			content		: 'images/50-10/7452_ENG_50-10_DF_Content_x9_y60.png',
			zoom		: [
				{ id   : '50-10-10',
				source : 'images/50-10-10/7452_ENG_50-10-10_DF_Content_x9_y60.png' },
				{ id   : '50-10-20',
				source : 'images/50-10-20/7452_ENG_50-10-20_DF_Content_x9_y60.png' },
				{ id   : '50-10-30',
				source : 'images/50-10-30/7452_ENG_50-10-30_DF_Content_x9_y60.png' }
			],
			leftNeighbour: 'forty-forty',
			rightNeighbour: 'fifty-twenty',
			index:22,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
	},
	'fifty-twenty' : {
		id			: 'fifty-twenty',
		content		: 'images/50-20/7452_ENG_50-20_DF_Content_x9_y60.png',
		zoom		: [
			{ id   : '50-20-10',
			source : 'images/50-20-10/7452_ENG_50-20-10_DF_Content_x9_y60.png' },
			{ id   : '50-20-20',
			source : 'images/50-20-20/7452_ENG_50-20-20_DF_Content_x9_y60.png' },
			{ id   : '50-20-30',
			source : 'images/50-20-30/7452_ENG_50-20-30_DF_Content_x9_y60.png' }
		],
		leftNeighbour: 'fifty-ten',
		rightNeighbour: 'fifty-thirty',
		index:23,
		isAnimation: function() { if(this.animation)return true; else return false;},
		isVideo: function() { if(this.video)return true; else return false;},
		hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'fifty-thirty' : {
		id			: 'fifty-thirty',
		content		: 'images/50-30/7452_ENG_50-30_DF_Content_x9_y60.png',
		zoom		: [
			{ id   : '50-30-10',
			source : 'images/50-30-10/7452_ENG_50-30-10_DF_Content_x9_y60.png' },
			{ id   : '50-30-20',
			source : 'images/50-30-20/7452_ENG_50-30-20_DF_Content_x9_y60.png' },
			{ id   : '50-30-30',
			source : 'images/50-30-30/7452_ENG_50-30-30_DF_Content_x9_y60.png' }
		],
		leftNeighbour: 'fifty-twenty',
		rightNeighbour: 'fifty-forty',
		index:24,
		isAnimation: function() { if(this.animation)return true; else return false;},
		isVideo: function() { if(this.video)return true; else return false;},
		hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'fifty-forty' : {
		id			: 'fifty-forty',
		content		: 'images/50-40/7452_ENG_50-40_DF_Content_x9_y60.png',
		link		: [ 'fifty-forty-ten' ],
		leftNeighbour: 'fifty-thirty',
		rightNeighbour: 'fifty-forty-ten',
		index:25,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'fifty-forty-ten' : {
		id			: 'fifty-forty-ten',
		content		: 'images/50-40-10/7452_ENG_50-40-10_DF_Content_x9_y60.png',
		leftNeighbour: 'fifty-forty',
		rightNeighbour: 'sixty-ten',
		index:26,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'sixty-ten' : {
		id			: 'sixty-ten',
		content		: 'images/60-10/7452_ENG_60-10_DF_Content_x9_y60.png',
		leftNeighbour: 'fifty-forty-ten',
		rightNeighbour: 'sixty-twenty',
		index:27,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},

	'sixty-twenty' : {
		id			: 'sixty-twenty',
		content		: 'images/60-20/7452_ENG_60-20_DF_Content_x9_y60.png',
		leftNeighbour: 'sixty-ten',
		rightNeighbour: 'sixty-thirty',
		index:28,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},

	'sixty-thirty' : {
		id			: 'sixty-thirty',
		content		: 'images/60-30/7452_ENG_60-30_DF_Content_x9_y60.png',
		leftNeighbour: 'sixty-twenty',
		rightNeighbour: 'sixty-forty',
		index:29,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},

	'sixty-forty' : {
		id			: 'sixty-forty',
		content		: 'images/60-40/7452_ENG_60-40_DF_Content_x9_y60.png',
		zoom		: [
		{ id : '60-40-10',
		source : 'images/60-40-10/7452_ENG_60-40-10_DF_Content_x9_y60.png' }
		],
		leftNeighbour: 'sixty-thirty',
		rightNeighbour: 'sixty-fifty',
		index:30,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},

	'sixty-fifty' : {
		id			: 'sixty-fifty',
		content		: 'images/60-50/7452_ENG_60-50_DF_Content_x9_y60.png',
		leftNeighbour: 'sixty-forty',
		rightNeighbour: 'sixty-sixty',
		index:31,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},

	'sixty-sixty' : {
		id			: 'sixty-sixty',
		content		: 'images/60-60/7452_ENG_60-60_DF_Content_x9_y60.png',
		leftNeighbour: 'sixty-fifty',
		rightNeighbour: 'sixty-seventy',
		index:32,
		isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},
	'sixty-seventy' : {
		id			: 'sixty-seventy',
		content		: 'images/60-70/7452_ENG_60-70_DF_Content_x9_y60.png',
		leftNeighbour: 'sixty-sixty',
		rightNeighbour: 'seventy-ten',
		index:33,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }

	},

	'seventy-ten' : {
		id			: 'seventy-ten',
		content		: 'images/70-10/7452_ENG_70_10_DF_Content_x9_y60.png',
		leftNeighbour: 'sixty-seventy',
		rightNeighbour: 'eighty-ten',
		index:34,
			isAnimation: function() { if(this.animation)return true; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
			hasZoom: function() { if(this.zoom) return true; else return false; }
		},

	'eighty-ten' : {
		id			: 'eighty-ten',
		content		: 'images/80-10/7452_ENG_80-10_DF_Content_x9_y60.png',
		leftNeighbour: 'seventy-ten',
		index:35,
		isAnimation: function() { if(this.animation)return true; else return false;},
		isVideo: function() { if(this.video)return true; else return false;},
		hasZoom: function() { if(this.zoom) return true; else return false; }
	},
	firstPage : 'zero-ten-zero'
};
var slider = {};

//called before a 'jump', swipe should be called after.
slider.insert = function(pageData, reverse)
{
	var $newPage = '';

	if (reverse === undefined)
		reverse = false;

	// Insert new page into the DOM based on it's position in the data structure
	if( ! reverse)
	{
		$newPage = slider.createPage(pageData);
		$('div:[data-role=page]:last').after($newPage);
	}
	else
	{
		$newPage = slider.createPage(pageData);
		$('div:[data-role=page]:first').before($newPage);
	}
};

//called when a swipe happens, it will update DOM to reflect new pages.
slider.swipe = function(currId)
{
	console.log('adding pages id: '+currId);
	console.log(pages[currId]);
	slider.removePages(currId);
	slider.addPages(currId);
};

//will remove all pages but currId and it's neighbours.
slider.removePages = function(currId)
{
	var $neededPages = $('#'+currId);
	console.log('removing pages');

	if (pages[currId].leftNeighbour)
		$neededPages.add('#'+pages[currId].leftNeighbour);

	if (pages[currId].rightNeighbour)
		$neededPages.add('#'+pages[currId].rightNeighbour);

	$('body')
		.children('[data-role=page]')
		.not($neededPages)
		.remove();
};

//Will add left and right neighbour if possible.
slider.addPages = function(currId)
{
	var leftPageData;
	var rightPageData;
	var leftNeighbour = pages[currId].leftNeighbour;
	var rightNeighbour = pages[currId].rightNeighbour;
	var $leftPage;
	var $rightPage;
	var $currentPage = $('#'+currId);

	if(pages[currId].leftNeighbour)
	{
		leftPageData = pages[leftNeighbour];
		$leftPage = slider.createPage(leftPageData);
		if($('div:[data-role=page]:first').attr('id') === $currentPage.attr('id') && $leftPage)
			$currentPage.before($leftPage);
	}
	if(pages[currId].rightNeighbour)
	{
		rightPageData = pages[rightNeighbour];
		$rightPage = slider.createPage(rightPageData);
		if($('div:[data-role=page]:last').attr('id')===$currentPage.attr('id') && $rightPage)
		{
			$('#'+currId).after($rightPage);
		}
			
	}
	
};

slider.createPage = function(pageData)
{
	if(pageData)
	{
		return ich.getPage(pageData);
	}
	else return undefined;
	
};

slider.changePage = function(pageId)
{
	var pageData = pages[pageId],
		currData = pages[$.mobile.activePage.attr('id')],
		reverse = false;
	
	// Insert new page into the DOM based on it's position in the data structure
	if(pageData && pageData.index > currData.index)
	{
		reverse = false;
	}
	else if (pageData && pageData.index < currData.index)
	{
		reverse = true;
	}
	else
		console.log('The requested page does not exist.');
	
	slider.insert(pageData, reverse);

	$.mobile.changePage($('#'+pageId), { transition: 'realslide', reverse: reverse });
	console.log(pageData.id);

};