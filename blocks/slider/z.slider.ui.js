// ===============================================================================
//                            SLIDER ARROWS & ETC
// ===============================================================================

$( document ).on( 'click', '.js-slider-left', function(){
  $(this)
    .parents( '.slider:first' )
      .find( '.slider-container' )
        .trigger( 'prev.owl.carousel' );
});

$( document ).on( 'click', '.js-slider-right', function(){
  $(this)
    .parents( '.slider:first' )
      .find( '.slider-container' )
        .trigger( 'next.owl.carousel' );
});
