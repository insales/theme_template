// ===================================================================================
//                                  COLLECTION
// ===================================================================================
$(function(){
  // FILTER
  $( '.filter-value_input, .filter-value_link, .filter-value_disable' ).click( function(e){
    if( $(this).is( 'a' ) ){
      e.preventDefault();

      $(this)
        .siblings( '.filter-value_input' )
          .prop( 'checked', true );
    };

    $(this)
      .parent( '.filter-value:first' )
        .find( '.js-filter-value_input' )
          .trigger( 'change' );
  });

  $('.js-filter-value_input').change( function(){
    if( $(this).parent( '.filter-value:first' ).hasClass( 'filter-value--current' ) ){
      $(this)
        .attr( 'disabled', 'disabled' )
        .removeClass( 'filter-value--current' );
    }else{
      $(this)
        .removeAttr( 'disabled' )
        .addClass( 'filter-value--current' );
    };

    $(this).parents('form:first:not(.mobile)').submit();
  });

  $('.js-filter-toggler').click(function(){
    $(this)
      .toggleClass( 'fa-plus' )
      .toggleClass( 'fa-minus' )
      .parents( '.filter-option' )
        .find('.filter-value_list')
          .toggle();
  });

  // SORT
  $('.js-sort_by').change( function(){
    $(this).parents( 'form:first' ).submit();
  });

});