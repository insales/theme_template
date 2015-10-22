// ================================================================================
//                                  SLIDER
// ================================================================================

$(function(){
  $( '.js-slider' ).owlCarousel({
    responsive: {
      0:    { items: 1 },
      480:  { items: 3, slideBy: 3 },
      640:  { items: 3, slideBy: 3 },
      800:  { items: 4, slideBy: 4 },
      1100: { items: 4, slideBy: 4 },
    },
  });

  $( '.js-slider--gallery' ).owlCarousel({
    responsive: {
      0:    { items: 1 },
      480:  { items: 1 },
      640:  { items: 1 },
      800:  { items: 3, slideBy: 3 },
      1100: { items: 3, slideBy: 3 },
    },
  });
});
