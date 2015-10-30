// ======================================================================================
//                                              COMMENTS 
// ======================================================================================

$(function(){
  var anchor = document.location.hash;

  if( anchor == '#comments' || anchor == '#comment_form' || anchor == '#review_form' || anchor == '#reviewes' ){
    $( '.js-tub-review' )
      .trigger( 'click' );
    $( '.js-accordion-review' )
      .trigger( 'click' );
    $( window ).scrollTo( '.review_form', 400 );
  };

  $( '.js-review-toggle' ).click( function(e){
    e.preventDefault();
    $( '.js-review' ).toggle();
  });

  /* цепляем рейтинги */
  $( '.js-rating' ).barrating();

  $( '.js-rating-read_only' ).barrating({
    readonly: true,
  });

  /* вешаем проверку формы */
  $( '.js-review-submit' ).on( 'click', function( e ){
    e.preventDefault();

    var
      $form  = $(this).parents( 'form:first' ),
      errors = checkForm( $form );

    if( errors.length > 0 ){
      return;
    };

    $form.submit();
  });
});