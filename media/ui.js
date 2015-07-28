// ===========================================================
//                            UI
// ===========================================================

$(function(){
  $( '.js-panel-link' ).on( 'click', function(){
    $( 'body' ).css( 'overflow', 'hidden' );
    $( '.js-mobile_panel' ).show();
    $( '.overlay' ).show();
  });

  $( '.js-panel-close, .overlay' ).on( 'click', function(){
    $( '.js-mobile_panel' ).hide();
    $( '.overlay' ).hide();
    $( 'body' ).css( 'overflow', 'initial' );
  });

  $( 'select.js-styled' ).each( function(){
    $(this).wrap( '<div class="styled_select-wrapper"></div>' );
  });

  $( '.js-scroll_to_top' ).on( 'click', function(){
    $( 'body' ).animate({
      scrollTop: 0
    }, 400 );
  });

  var ajaxSearch = new InSales.Search();
  Events( 'onAjaxSearch' ).subscribe( function( $data ){
    console.log( $data );

    console.log( InSales.Render( $data, 'search', 'ajax' ) );
  });
})