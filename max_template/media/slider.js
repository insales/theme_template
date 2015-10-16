// ================================================================================
//                                  SLIDER
// ================================================================================

$(function(){
  $( '.js-slider' ).owlCarousel({
    responsive: {
      0:    { items: 1 },
      480:  { items: 3 },
      640:  { items: 3 },
      800:  { items: 4 },
      1100: { items: 4 },
    },
    slideBy: 'page',
  });

  $( '.js-slider-left' ).on( 'click', function(){
    $(this)
      .parents( '.slider:first' )
        .find( '.slider-container' )
          .trigger( 'prev.owl.carousel' );
  });

  $( '.js-slider-right' ).on( 'click', function(){
    $(this)
      .parents( '.slider:first' )
        .find( '.slider-container' )
          .trigger( 'next.owl.carousel' );
  });
});