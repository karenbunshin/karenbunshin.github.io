(function( $ ) {

var windowWidth, s, $windw = $(window);
windowWidth = window.innerWidth;

if( windowWidth >= 768 ) {

    s = skrollr.init({

        forceHeight:false,
        smoothScrolling: false,
        render: function( data ) {
            // console.log( data.curTop );

        }
    });
}

/* turn off skrollr.js when on smallest screen */


$windw.resize( function() {
	windowWidth = window.innerWidth;

	if( windowWidth >= 768 ) {

		s = skrollr.init({

			forceHeight:false,
			smoothScrolling: false,
			render: function( data ) {
				// console.log( data.curTop );

			}
		});

		s.refresh( $('div.banner') );

	} else {
		s = skrollr.init();
		s.destroy();
	}

});

/* Quicksand */

var items = $('ul.skills li'),
        itemsByTags = {};

// Looping though all the li items:
items.each(function( i ) {
    var elem = $( this ),
        tags = elem.data('tags').split(',');

    // Adding a data-id attribute. Required by the Quicksand plugin:
    elem.attr('data-id',i);

    $.each( tags, function( key, value ) {

        // Removing extra whitespace:
        value = $.trim( value );

        if(!( value in itemsByTags )){
            // Create an empty array to hold this item:
            itemsByTags[value] = [];
        }

        // Each item is added to one array per tag:
        itemsByTags[value].push(elem);
    });
});

function createList(text,items){

    // This is a helper function that takes the
    // text of a menu button and array of li items

    // Creating an empty unordered list:
    var ul = $('<ul>',{'class':'hidden'});

    $.each(items,function(){
        // Creating a copy of each li item
        // and adding it to the list:

        $(this).clone().appendTo(ul);
    });

    ul.appendTo('div.container');

    // Creating a menu item. The unordered list is added
    // as a data parameter (available via .data('list')):

    var a = $( '<a>', {
        html: text,
        href:'#',
        data: { list : ul }
    }).appendTo('div.skills-menu');
}

// Creating the "Everything" option in the menu:
createList( 'All', items );

// Looping though the arrays in itemsByTags:
$.each(itemsByTags,function(k,v){
    createList(k,v);
});

var bg, skills = $('#skills');

$('div.skills-menu a').on( 'click', function( e ) {
    var link = $(this);	

    link.addClass('active').siblings().removeClass('active');

    // Using the Quicksand plugin to animate the li items.
    // It uses data('list') defined by our createList function:

    $('ul.skills').quicksand( link.data('list').find('li'),
    {
    	adjustWidth: false,
    	duration: 800,
    	easing: 'easeInOutQuad'

    });

    e.preventDefault();
});

// Selecting the first menu item by default:
$('div.skills-menu a:first').click();




/* Show scroll to top arrow */
var topLink = $('a.top-link'),
    $body= $('html, body');

$windw.scroll( function() {    
    $(this).scrollTop() > 200 ? topLink.fadeIn( 200 ) : topLink.fadeOut( 200 );
});

/* Scroll to Top */
topLink.on('click', function(e) {
    e.preventDefault();
    $body.animate({
        scrollTop: 0
    }, 300 );
});

/* Scroll to Section */
$('nav ul li a[href^="#"], div.call-to-action .container a').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);


        $body.stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing');

        // window.location.hash = target;
    });


})( jQuery );