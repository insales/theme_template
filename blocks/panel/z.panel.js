$( function(){
  // ui для панели
  $( '.js-panel-link' ).on( 'click', function(){
    var
      params = getParams( $(this) ),
      $unit  = $(this);

    // flag;
    params.panel = true;

    $( 'body' )
      .addClass( 'body--lock_scroll' )
      .append( '<div class="overlay" />');

    $( params.target ).show();

    setParams( $( '.overlay' ), params );

    window.setTimeout( function(){
      $unit
        .toggleClass( 'js-panel-close' );
    }, 200 );
  });

  $( document ).on( 'click touchstart', '.js-panel-close, .overlay', function( e ){
    e.preventDefault();
    var
      params = getParams( $( '.overlay' ) );

    if( params.panel ){
      $( params.target ).hide();
      $( '.overlay' ).remove();
      $( 'body' )
        .removeClass( 'body--lock_scroll' );

      $( '.js-panel-link' )
        .removeClass( 'js-panel-close' );
    }
  });
});
