// ======================================================================================
//                                         SLIDER
// ======================================================================================

$(function(){
  $( '.js-slider' ).owlCarousel({
    responsive: {
      0: { items: 1 },
      480: { items: 3 },
      800: { items: 4 }
    },
    slideBy: 'page',
  });

  $( '.js-slider-left' ).click( function(){
    $(this)
      .parents( '.slider' )
        .find( '.slider-container' )
          .trigger( 'prev.owl.carousel' );
  });

  $( '.js-slider-right' ).click( function(){
    $(this)
      .parents( '.slider' )
        .find( '.slider-container' )
          .trigger( 'next.owl.carousel' );
  });
});