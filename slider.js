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
			rightNeighbour: 'one-ten-ten',
			
			isAnimation: function() { if(this.animation!==undefined)return true; else return false;},
			hasZoom: function() { if(this.zoom!==undefined) return this.zoom.length ? true : false; else return false; }

		},
	'one-ten-ten' : {
			id			: 'one-ten-ten',
			content		: '#',
			animation	: { id   : 'Stage-10-20',
							name : 'EDGE_7314-10-20' },
			video	: { id   : 'Stage-10-20',
						name : 'EDGE_7314-10-20',
						src  : 'source',
						poster: 'poster' },
			link		: [ 'main', 'twenty-ten' ],
			zoom		: [
				{ id	: 'one-twenty-ten',
				source: 'img/one-twenty-ten' },
				{ id : 'one-twenty-ten',
				source : 'img/one-twenty-ten' }
			],
			leftNeighbour: 'main',
			rightNeighbour: 'one-ten-twenty',
			
			isAnimation: function() { if(this.animation!==undefined)return this.animation.length ? true : false; else return false;},
			isVideo: function() { if(this.video)return true; else return false;},
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

var slider = {};

//called before a 'jump', swipe should be called after.
slider.append = function(pageId)
{
	var pageData = pages[pageId];
	if(pageData)
	{
		var $newPage = slider.createPage(pageData);
		$('div:[data-role=page]:last').after($newPage);
	}
	else
		console.log('The requested page does not exist.');
};

//called when a swipe happens, it will update DOM to reflect new pages.
slider.swipe = function(currId)
{
	slider.removePages(currId);
	slider.addPages(currId);
};

//will remove all pages but currId and it's neighbours.
slider.removePages = function(currId)
{
	var $neededPages = $('#'+currId);

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
		$leftPage = createPage(leftPageData);
		if($('div:[data-role=page]:first') === $currentPage && $leftPage)
			$currentPage.before($leftPage);
	}
	if(pages[currId].rightNeighbour)
	{
		leftPageData = pages[rightNeighbour];
		$rightPage = createPage(rightPageData);
		if($('div:[data-role=page]:last') === $currentPage && $rightPage)
			$currentPage.after($rightPage);
	}
	
	
};

slider.createPage = function(pageData)
{
	return ich.getPage(pageData);
};
