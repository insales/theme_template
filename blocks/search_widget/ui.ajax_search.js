$(function(){
  var ajaxSearch = new InSales.Search();

  Events( 'onAjaxSearch' ).subscribe( function( $data ){
    console.log( $data );

    console.log( InSales.Render( $data, 'search', 'ajax' ) );
  });

  // search_widget
  $( '.js-search_widget-wrapper' ).hide();

  $( document ).on( 'click', '.js-search_widget-toggler', function( e ){
    e.preventDefault();

    $( '.js-search_widget-wrapper' )
      .toggle();
  });
});